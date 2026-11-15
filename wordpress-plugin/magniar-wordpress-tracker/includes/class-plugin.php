<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Plugin
{
    public function init(): void
    {
        if (is_admin()) {
            (new Settings_Page())->init();
            add_action('admin_init', [self::class, 'upgrade']);
            add_filter('plugin_action_links_' . plugin_basename(MAGNIAR_WP_TRACKER_FILE), [self::class, 'action_links']);
        }
        add_action(MAGNIAR_WP_TRACKER_CRON_HOOK, [new Reporter(), 'send_scheduled_report']);
        add_action('update_option_' . MAGNIAR_WP_TRACKER_OPTION, [self::class, 'settings_changed'], 10, 2);
    }

    public static function activate(bool $network_wide = false): void
    {
        if ($network_wide) {
            wp_die(esc_html__('Activate Magniar Tracker separately on each site. Network activation is not supported.', 'magniar-wordpress-tracker'));
        }
        add_option(MAGNIAR_WP_TRACKER_OPTION, self::default_settings(), '', false);
        self::upgrade();
    }

    public static function upgrade(): void
    {
        if (get_option(MAGNIAR_WP_TRACKER_VERSION_OPTION) !== MAGNIAR_WP_TRACKER_VERSION) {
            $settings = self::get_settings();
            // Old installations must consent again before transmitting after this upgrade.
            if (!$settings['connected_site_url']) {
                $settings['enabled'] = false;
            }
            update_option(MAGNIAR_WP_TRACKER_OPTION, $settings, false);
            update_option(MAGNIAR_WP_TRACKER_VERSION_OPTION, MAGNIAR_WP_TRACKER_VERSION, false);
            delete_transient(MAGNIAR_WP_TRACKER_LOCK_KEY);
        }
        self::schedule_daily_report();
    }

    public static function deactivate(): void
    {
        wp_clear_scheduled_hook(MAGNIAR_WP_TRACKER_CRON_HOOK);
        delete_transient(MAGNIAR_WP_TRACKER_LOCK_KEY);
        // An in-flight atomic lock expires rather than allowing a second sender.
    }

    public static function default_settings(): array
    {
        return [
            'enabled' => false,
            'endpoint_url' => MAGNIAR_WP_TRACKER_ENDPOINT,
            'website_id' => '',
            'tracker_key' => '',
            'connected_site_url' => '',
            'delete_on_uninstall' => false,
        ];
    }

    public static function get_settings(): array
    {
        $saved = get_option(MAGNIAR_WP_TRACKER_OPTION, []);
        $settings = self::default_settings();
        foreach ($settings as $key => $default) {
            if (!is_array($saved) || !array_key_exists($key, $saved)) {
                continue;
            }
            $settings[$key] = is_bool($default)
                ? in_array($saved[$key], [true, 1, '1'], true)
                : (is_string($saved[$key]) ? $saved[$key] : $default);
        }
        return $settings;
    }

    public static function valid_endpoint(string $url): bool
    {
        // No arbitrary hosts, credentials, ports, queries, or alternate function paths.
        return (bool) preg_match('~\Ahttps://[a-z0-9]{20}\.supabase\.co/functions/v1/receive-wordpress-report\z~D', $url);
    }

    public static function valid_id(string $value): bool
    {
        return (bool) preg_match('/\A[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\z/iD', $value);
    }

    public static function valid_key(string $value): bool
    {
        return (bool) preg_match('/\Amgwp_[A-Za-z0-9_-]{43}\z/D', $value);
    }

    public static function is_configured(array $settings): bool
    {
        return self::valid_endpoint($settings['endpoint_url'])
            && self::valid_id($settings['website_id'])
            && self::valid_key($settings['tracker_key']);
    }

    public static function settings_changed($old, $new): void
    {
        if (is_array($old) && is_array($new)) {
            foreach (['endpoint_url', 'website_id', 'tracker_key', 'connected_site_url'] as $key) {
                if (($old[$key] ?? '') !== ($new[$key] ?? '')) {
                    delete_option(MAGNIAR_WP_TRACKER_STATE_OPTION);
                    Logger::clear();
                    break;
                }
            }
        }
        self::schedule_daily_report();
    }

    public static function schedule_daily_report(): void
    {
        $settings = self::get_settings();
        if (!$settings['enabled'] || !self::is_configured($settings) || $settings['connected_site_url'] !== home_url('/')) {
            if (wp_next_scheduled(MAGNIAR_WP_TRACKER_CRON_HOOK)) {
                wp_clear_scheduled_hook(MAGNIAR_WP_TRACKER_CRON_HOOK);
            }
            return;
        }
        if (!wp_next_scheduled(MAGNIAR_WP_TRACKER_CRON_HOOK)) {
            // Spread initial reports across the day; WP-Cron runs on the next visit after due time.
            $result = wp_schedule_event(time() + wp_rand(5 * MINUTE_IN_SECONDS, DAY_IN_SECONDS), 'daily', MAGNIAR_WP_TRACKER_CRON_HOOK, [], true);
            if (is_wp_error($result)) {
                Logger::record('schedule_failed');
            }
        }
    }

    public static function action_links(array $links): array
    {
        array_unshift($links, '<a href="' . esc_url(admin_url('options-general.php?page=magniar-wordpress-tracker')) . '">' . esc_html__('Settings', 'magniar-wordpress-tracker') . '</a>');
        return $links;
    }
}
