<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Settings_Page
{
    private const PAGE_SLUG = 'magniar-wordpress-tracker';
    private const SETTINGS_GROUP = 'magniar_wp_tracker_settings_group';

    public function init(): void
    {
        add_action('admin_menu', [$this, 'register_menu']);
        add_action('admin_init', [$this, 'register_settings']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('admin_post_magniar_wp_tracker_test_report', [$this, 'handle_test_report']);
        add_action('admin_post_magniar_wp_tracker_clear_logs', [$this, 'handle_clear_logs']);
        add_action('admin_post_magniar_wp_tracker_disconnect', [$this, 'handle_disconnect']);
    }

    public function register_menu(): void
    {
        add_options_page(__('Magniar Tracker', 'magniar-wordpress-tracker'), __('Magniar Tracker', 'magniar-wordpress-tracker'), 'manage_options', self::PAGE_SLUG, [$this, 'render']);
    }

    public function register_settings(): void
    {
        register_setting(self::SETTINGS_GROUP, MAGNIAR_WP_TRACKER_OPTION, [
            'type' => 'array',
            'sanitize_callback' => [$this, 'sanitize_settings'],
            'default' => Plugin::default_settings(),
            'show_in_rest' => false,
        ]);
    }

    public function sanitize_settings($value): array
    {
        $old = Plugin::get_settings();
        if (!current_user_can('manage_options') || !is_array($value)) {
            return $old;
        }
        foreach (['endpoint_url', 'website_id', 'tracker_key', 'enabled', 'delete_on_uninstall'] as $field) {
            if (isset($value[$field]) && !is_scalar($value[$field])) {
                return $this->invalid($old);
            }
        }
        $endpoint = trim((string) ($value['endpoint_url'] ?? $old['endpoint_url']));
        $id = strtolower(trim((string) ($value['website_id'] ?? $old['website_id'])));
        $key_input = trim((string) ($value['tracker_key'] ?? ''));
        $key = $key_input === '' ? $old['tracker_key'] : $key_input;
        $enabled = isset($value['enabled']) && in_array($value['enabled'], ['1', 1, true], true);
        if (!Plugin::valid_endpoint($endpoint)
            || ($id !== '' && !Plugin::valid_id($id))
            || ($key !== '' && !Plugin::valid_key($key))
            || ($enabled && ($id === '' || $key === ''))) {
            return $this->invalid($old);
        }
        // A saved credential must not silently follow a new destination or website record.
        if ($old['tracker_key'] !== '' && $key_input === ''
            && ($endpoint !== $old['endpoint_url'] || $id !== $old['website_id'])) {
            return $this->invalid($old, __('Enter the tracker key again when changing the endpoint or website ID.', 'magniar-wordpress-tracker'));
        }
        return [
            'enabled' => $enabled,
            'endpoint_url' => $endpoint,
            'website_id' => $id,
            'tracker_key' => $key,
            'connected_site_url' => home_url('/'),
            'delete_on_uninstall' => isset($value['delete_on_uninstall']) && in_array($value['delete_on_uninstall'], ['1', 1, true], true),
        ];
    }

    private function invalid(array $old, string $message = ''): array
    {
        add_settings_error(MAGNIAR_WP_TRACKER_OPTION, 'magniar_wp_tracker_invalid', $message ?: __('Settings were not changed. Use the endpoint, website UUID, and mgwp_ key from Magniar.', 'magniar-wordpress-tracker'));
        return $old;
    }

    public function enqueue_assets(string $hook_suffix): void
    {
        if ($hook_suffix === 'settings_page_' . self::PAGE_SLUG && current_user_can('manage_options')) {
            wp_enqueue_style('magniar-wp-tracker-admin', plugins_url('assets/admin/settings.css', MAGNIAR_WP_TRACKER_FILE), [], MAGNIAR_WP_TRACKER_VERSION);
        }
    }

    private function authorize(string $action): void
    {
        if (!current_user_can('manage_options') || ($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
            wp_die(esc_html__('You do not have permission to perform this action.', 'magniar-wordpress-tracker'), '', ['response' => 403]);
        }
        check_admin_referer($action);
    }

    public function handle_test_report(): void
    {
        $this->authorize('magniar_wp_tracker_test_report');
        $result = (new Reporter())->send_report(true);
        set_transient('magniar_wp_tracker_notice_' . get_current_user_id(), $result, MINUTE_IN_SECONDS);
        $this->redirect();
    }

    public function handle_clear_logs(): void
    {
        $this->authorize('magniar_wp_tracker_clear_logs');
        Logger::clear();
        $this->redirect();
    }

    public function handle_disconnect(): void
    {
        $this->authorize('magniar_wp_tracker_disconnect');
        $settings = Plugin::get_settings();
        $settings['enabled'] = false;
        $settings['website_id'] = '';
        $settings['tracker_key'] = '';
        $settings['connected_site_url'] = '';
        // The Settings API intentionally preserves blank secrets during normal saves.
        // Remove that sanitizer for this explicit, authorized credential deletion only.
        remove_filter('sanitize_option_' . MAGNIAR_WP_TRACKER_OPTION, [$this, 'sanitize_settings']);
        update_option(MAGNIAR_WP_TRACKER_OPTION, $settings, false);
        delete_option(MAGNIAR_WP_TRACKER_STATE_OPTION);
        Logger::clear();
        $this->redirect();
    }

    private function redirect(): void
    {
        wp_safe_redirect(add_query_arg('page', self::PAGE_SLUG, admin_url('options-general.php')));
        exit;
    }

    private function date_label($timestamp): string
    {
        return is_numeric($timestamp) && (int) $timestamp > 0
            ? wp_date('M j, Y H:i', (int) $timestamp)
            : __('Not yet', 'magniar-wordpress-tracker');
    }

    public function render(): void
    {
        if (!current_user_can('manage_options')) {
            return;
        }
        $settings = Plugin::get_settings();
        $state = Reporter::state();
        $logs = Logger::all();
        $next = wp_next_scheduled(MAGNIAR_WP_TRACKER_CRON_HOOK);
        $notice_key = 'magniar_wp_tracker_notice_' . get_current_user_id();
        $notice = get_transient($notice_key);
        delete_transient($notice_key);
        $status = !$settings['enabled'] ? __('Paused', 'magniar-wordpress-tracker')
            : (($state['last_result'] ?? '') === 'success' ? __('Connected', 'magniar-wordpress-tracker')
                : (empty($state['last_attempt']) ? __('Awaiting first report', 'magniar-wordpress-tracker') : __('Needs attention', 'magniar-wordpress-tracker')));
        $snapshot = isset($state['snapshot']) && is_array($state['snapshot']) ? $state['snapshot'] : [];
        require MAGNIAR_WP_TRACKER_DIR . '/includes/admin-view.php';
    }
}
