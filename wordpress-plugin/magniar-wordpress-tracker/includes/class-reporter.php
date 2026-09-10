<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Reporter
{
    private const HTTP_TIMEOUT = 8;
    private const LOCK_TTL = 10 * MINUTE_IN_SECONDS;

    public function send_scheduled_report(): void
    {
        $this->send_report(false);
    }

    public function send_report(bool $manual = false): bool
    {
        $settings = Plugin::get_settings();

        if (empty($settings['enabled']) && !$manual) {
            return false;
        }

        if (!$this->has_required_settings($settings)) {
            Logger::error('Report skipped because tracker settings are incomplete.');
            return false;
        }

        if (!$this->acquire_lock()) {
            Logger::info('Report skipped because another tracker report is already running.');
            return false;
        }

        try {
            $payload = $this->build_payload($settings);
            $body = wp_json_encode($payload);

            if (!is_string($body) || $body === '') {
                Logger::error('Report skipped because the payload could not be encoded.');
                return false;
            }

            $response = wp_remote_post(
                (string) $settings['endpoint_url'],
                [
                    'timeout' => self::HTTP_TIMEOUT,
                    'redirection' => 2,
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                        'X-WordPress-Tracker-Key' => (string) $settings['tracker_key'],
                    ],
                    'body' => $body,
                ]
            );

            if (is_wp_error($response)) {
                Logger::error('Report request failed: ' . $response->get_error_message());
                return false;
            }

            $status_code = (int) wp_remote_retrieve_response_code($response);
            if ($status_code < 200 || $status_code >= 300) {
                Logger::error('Report request returned HTTP ' . $status_code . '.');
                return false;
            }

            Logger::info('WordPress tracker report sent successfully.');
            return true;
        } finally {
            delete_transient(MAGNIAR_WP_TRACKER_LOCK_KEY);
        }
    }

    private function has_required_settings(array $settings): bool
    {
        if (empty($settings['endpoint_url']) || empty($settings['website_id']) || empty($settings['tracker_key'])) {
            return false;
        }

        return is_string($settings['endpoint_url'])
            && strpos($settings['endpoint_url'], 'https://') === 0
            && is_string($settings['website_id'])
            && is_string($settings['tracker_key']);
    }

    private function acquire_lock(): bool
    {
        if (get_transient(MAGNIAR_WP_TRACKER_LOCK_KEY)) {
            return false;
        }

        set_transient(MAGNIAR_WP_TRACKER_LOCK_KEY, '1', self::LOCK_TTL);
        return true;
    }

    private function build_payload(array $settings): array
    {
        $plugin_counts = $this->collect_plugin_counts();
        $theme_data = $this->collect_theme_data();
        $core_update_available = $this->is_core_update_available();
        $php_supported = version_compare(PHP_VERSION, '8.0', '>=');
        $ssl_enabled = $this->is_https_site();
        $admin_ssl_enabled = force_ssl_admin() || $ssl_enabled;

        return [
            'website_id' => (string) $settings['website_id'],
            'site_url' => home_url('/'),
            'wordpress_version' => get_bloginfo('version'),
            'wordpress_update_available' => $core_update_available,
            'php_version' => PHP_VERSION,
            'php_supported' => $php_supported,
            'active_theme_name' => $theme_data['name'],
            'active_theme_version' => $theme_data['version'],
            'theme_updates_available' => $theme_data['updates_available'],
            'plugin_count' => $plugin_counts['total'],
            'active_plugin_count' => $plugin_counts['active'],
            'inactive_plugin_count' => $plugin_counts['inactive'],
            'plugin_updates_available' => $plugin_counts['updates_available'],
            'ssl_enabled' => $ssl_enabled,
            'admin_ssl_enabled' => $admin_ssl_enabled,
            'search_engine_visible' => get_option('blog_public') === '1',
            'backup_detected' => null,
            'backup_last_run_at' => null,
            'health_status' => $this->calculate_health_status(
                $core_update_available,
                $php_supported,
                $ssl_enabled,
                $admin_ssl_enabled,
                $plugin_counts['updates_available'],
                $theme_data['updates_available']
            ),
        ];
    }

    private function collect_plugin_counts(): array
    {
        if (!function_exists('get_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $plugins = function_exists('get_plugins') ? get_plugins() : [];
        $active_plugins = (array) get_option('active_plugins', []);
        $updates = get_site_transient('update_plugins');
        $update_count = 0;

        if (is_object($updates) && isset($updates->response) && is_array($updates->response)) {
            $update_count = count($updates->response);
        }

        $total = count($plugins);
        $active = count(array_intersect(array_keys($plugins), $active_plugins));

        return [
            'total' => $total,
            'active' => $active,
            'inactive' => max(0, $total - $active),
            'updates_available' => $update_count,
        ];
    }

    private function collect_theme_data(): array
    {
        $theme = wp_get_theme();
        $updates = get_site_transient('update_themes');
        $stylesheet = $theme->get_stylesheet();
        $updates_available = 0;

        if (is_object($updates) && isset($updates->response) && is_array($updates->response)) {
            $updates_available = isset($updates->response[$stylesheet]) ? 1 : 0;
        }

        return [
            'name' => $theme->exists() ? $theme->get('Name') : '',
            'version' => $theme->exists() ? $theme->get('Version') : '',
            'updates_available' => $updates_available,
        ];
    }

    private function is_core_update_available(): bool
    {
        $updates = get_site_transient('update_core');
        if (!is_object($updates) || empty($updates->updates) || !is_array($updates->updates)) {
            return false;
        }

        foreach ($updates->updates as $update) {
            if (is_object($update) && isset($update->response) && $update->response === 'upgrade') {
                return true;
            }
        }

        return false;
    }

    private function is_https_site(): bool
    {
        $scheme = wp_parse_url(home_url('/'), PHP_URL_SCHEME);
        return is_ssl() || $scheme === 'https';
    }

    private function calculate_health_status(
        bool $core_update_available,
        bool $php_supported,
        bool $ssl_enabled,
        bool $admin_ssl_enabled,
        int $plugin_updates_available,
        int $theme_updates_available
    ): string {
        if (!$php_supported || !$ssl_enabled || !$admin_ssl_enabled) {
            return 'CRITICAL';
        }

        if ($core_update_available || $plugin_updates_available > 0 || $theme_updates_available > 0) {
            return 'WARNING';
        }

        return 'GOOD';
    }
}
