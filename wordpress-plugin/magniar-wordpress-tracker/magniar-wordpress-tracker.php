<?php
/**
 * Plugin Name: Magniar WordPress Tracker
 * Description: Sends safe WordPress operational health reports to the Magniar Admin OS.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Magniar & Co
 * Text Domain: magniar-wordpress-tracker
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI: https://magniar.com/wordpress-tracker
 */

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

const MAGNIAR_WP_TRACKER_VERSION = '1.0.0';
const MAGNIAR_WP_TRACKER_FILE = __FILE__;
const MAGNIAR_WP_TRACKER_DIR = __DIR__;
const MAGNIAR_WP_TRACKER_OPTION = 'magniar_wp_tracker_settings';
const MAGNIAR_WP_TRACKER_LOG_OPTION = 'magniar_wp_tracker_logs';
const MAGNIAR_WP_TRACKER_CRON_HOOK = 'magniar_wp_tracker_daily_report';
const MAGNIAR_WP_TRACKER_LOCK_KEY = 'magniar_wp_tracker_report_lock';
const MAGNIAR_WP_TRACKER_STATE_OPTION = 'magniar_wp_tracker_state';
const MAGNIAR_WP_TRACKER_VERSION_OPTION = 'magniar_wp_tracker_version';
const MAGNIAR_WP_TRACKER_ENDPOINT = 'https://smgvuxpemrglntzvchwi.supabase.co/functions/v1/receive-wordpress-report';

// Keep newer syntax in the includes so an unsupported host can fail gracefully.
if (version_compare(PHP_VERSION, '7.4', '<') || version_compare((string) get_bloginfo('version'), '6.0', '<')) {
    add_action('admin_notices', static function () {
        if (current_user_can('activate_plugins')) {
            echo '<div class="notice notice-error"><p>' . esc_html__('Magniar Tracker requires WordPress 6.0 and PHP 7.4 or newer.', 'magniar-wordpress-tracker') . '</p></div>';
        }
    });
    return;
}

require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-plugin.php';
require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-settings-page.php';
require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-reporter.php';
require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-logger.php';
require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-report-lock.php';
require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-diagnostics.php';

function plugin(): Plugin
{
    static $plugin = null;

    if (!$plugin instanceof Plugin) {
        $plugin = new Plugin();
    }

    return $plugin;
}

register_activation_hook(MAGNIAR_WP_TRACKER_FILE, [Plugin::class, 'activate']);
register_deactivation_hook(MAGNIAR_WP_TRACKER_FILE, [Plugin::class, 'deactivate']);

add_action('plugins_loaded', static function (): void {
    plugin()->init();
});
