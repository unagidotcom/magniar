<?php
/**
 * Plugin Name: Magniar WordPress Tracker
 * Description: Sends safe WordPress operational health reports to the Magniar Admin OS.
 * Version: 0.1.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Magniar & Co
 * Text Domain: magniar-wordpress-tracker
 */

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

const MAGNIAR_WP_TRACKER_VERSION = '0.1.0';
const MAGNIAR_WP_TRACKER_FILE = __FILE__;
const MAGNIAR_WP_TRACKER_DIR = __DIR__;
const MAGNIAR_WP_TRACKER_OPTION = 'magniar_wp_tracker_settings';
const MAGNIAR_WP_TRACKER_LOG_OPTION = 'magniar_wp_tracker_logs';
const MAGNIAR_WP_TRACKER_CRON_HOOK = 'magniar_wp_tracker_daily_report';
const MAGNIAR_WP_TRACKER_LOCK_KEY = 'magniar_wp_tracker_report_lock';

require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-plugin.php';
require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-settings-page.php';
require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-reporter.php';
require_once MAGNIAR_WP_TRACKER_DIR . '/includes/class-logger.php';

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
