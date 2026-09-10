<?php
/**
 * Uninstall handler for Magniar WordPress Tracker.
 *
 * Settings and logs are intentionally preserved by default so uninstalling the
 * plugin does not unexpectedly remove administrator-owned configuration.
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

wp_clear_scheduled_hook('magniar_wp_tracker_daily_report');
delete_transient('magniar_wp_tracker_report_lock');
