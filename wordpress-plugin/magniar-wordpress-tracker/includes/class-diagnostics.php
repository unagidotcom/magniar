<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Diagnostics
{
    public function collect(string $website_id): array
    {
        if (!function_exists('get_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        $plugins = get_plugins();
        $active = get_option('active_plugins', []);
        $active = is_array($active) ? $active : [];
        if (is_multisite()) {
            $network = get_site_option('active_sitewide_plugins', []);
            $active = array_merge($active, is_array($network) ? array_keys($network) : []);
        }
        $active = array_values(array_intersect(array_keys($plugins), array_unique($active)));
        $plugin_updates = get_site_transient('update_plugins');
        $theme_updates = get_site_transient('update_themes');
        $core_updates = get_site_transient('update_core');
        $theme = wp_get_theme();
        $core_available = null;
        if ($this->fresh($core_updates) && isset($core_updates->updates) && is_array($core_updates->updates)) {
            foreach ($core_updates->updates as $update) {
                if (is_object($update) && isset($update->response)) {
                    if ($update->response === 'upgrade') {
                        $core_available = true;
                        break;
                    }
                    if ($update->response === 'latest') {
                        $core_available = false;
                    }
                }
            }
        }
        $plugins_known = $this->fresh($plugin_updates) && isset($plugin_updates->response) && is_array($plugin_updates->response);
        $themes_known = $this->fresh($theme_updates) && isset($theme_updates->response) && is_array($theme_updates->response);
        $plugin_count = $plugins_known
            ? count(array_intersect(array_keys($plugins), array_keys($plugin_updates->response))) : 0;
        $theme_count = $themes_known
            ? count(array_intersect(array_keys(wp_get_themes()), array_keys($theme_updates->response))) : 0;
        $php_supported = self::php_supported(PHP_VERSION);
        $site_url = home_url('/');
        $ssl = wp_parse_url($site_url, PHP_URL_SCHEME) === 'https';
        $admin_ssl = wp_parse_url(admin_url(), PHP_URL_SCHEME) === 'https';
        $update_data_known = $core_available !== null && $plugins_known && $themes_known;
        $health = 'GOOD';
        if (!$ssl || !$admin_ssl || $php_supported === false) {
            $health = 'CRITICAL';
        } elseif ($core_available || $plugin_count > 0 || $theme_count > 0) {
            $health = 'WARNING';
        } elseif (!$update_data_known || $php_supported === null) {
            $health = 'UNKNOWN';
        }

        // Presence is not evidence of a successful backup. No vendor internals or logs are read.
        $backup_plugins = ['updraftplus/updraftplus.php', 'backwpup/backwpup.php', 'duplicator/duplicator.php', 'wpvivid-backuprestore/wpvivid-backuprestore.php', 'backupwordpress/backupwordpress.php'];
        return [
            'website_id' => $website_id,
            'site_url' => $site_url,
            'wordpress_version' => sanitize_text_field(get_bloginfo('version')),
            'wordpress_update_available' => $core_available,
            'php_version' => PHP_VERSION,
            'php_supported' => $php_supported,
            'active_theme_name' => $theme->exists() ? sanitize_text_field($theme->get('Name')) : '',
            'active_theme_version' => $theme->exists() ? sanitize_text_field($theme->get('Version')) : '',
            'theme_updates_available' => $theme_count,
            'plugin_count' => count($plugins),
            'active_plugin_count' => count($active),
            'inactive_plugin_count' => max(0, count($plugins) - count($active)),
            'plugin_updates_available' => $plugin_count,
            'ssl_enabled' => $ssl,
            'admin_ssl_enabled' => $admin_ssl,
            'search_engine_visible' => (string) get_option('blog_public') === '1',
            'backup_detected' => array_intersect($backup_plugins, $active) ? true : null,
            'backup_last_run_at' => null,
            'health_status' => $health,
        ];
    }

    public static function php_supported(string $version, ?int $timestamp = null): ?bool
    {
        // Security support deadlines, not just a minimum version. Unknown future branches stay unknown.
        // Source: https://www.php.net/supported-versions.php (reviewed 2026-09-13).
        $deadlines = ['8.2' => '2026-12-31', '8.3' => '2027-12-31', '8.4' => '2028-12-31', '8.5' => '2029-12-31'];
        if (version_compare($version, '8.2', '<')) {
            return false;
        }
        $branch = implode('.', array_slice(explode('.', $version), 0, 2));
        return isset($deadlines[$branch])
            ? ($timestamp ?? time()) <= strtotime($deadlines[$branch] . ' 23:59:59 UTC')
            : null;
    }

    private function fresh($updates): bool
    {
        return is_object($updates) && isset($updates->last_checked) && is_numeric($updates->last_checked)
            && (int) $updates->last_checked >= time() - 7 * DAY_IN_SECONDS
            && (int) $updates->last_checked <= time() + 5 * MINUTE_IN_SECONDS;
    }
}
