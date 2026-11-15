<?php
/**
 * Only plugin-owned per-site data is eligible for cleanup.
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

$magniar_tracker_cleanup = static function () {
    wp_clear_scheduled_hook('magniar_wp_tracker_daily_report');
    delete_transient('magniar_wp_tracker_report_lock');
    delete_option('magniar_wp_tracker_report_lock');
    $settings = get_option('magniar_wp_tracker_settings', []);
    if (is_array($settings) && !empty($settings['delete_on_uninstall'])) {
        foreach (['magniar_wp_tracker_settings', 'magniar_wp_tracker_logs', 'magniar_wp_tracker_state', 'magniar_wp_tracker_version'] as $option) {
            delete_option($option);
        }
    }
};

if (is_multisite()) {
    $magniar_tracker_offset = 0;
    do {
        $magniar_tracker_sites = get_sites(['fields' => 'ids', 'number' => 100, 'offset' => $magniar_tracker_offset]);
        foreach ($magniar_tracker_sites as $magniar_tracker_site_id) {
            switch_to_blog((int) $magniar_tracker_site_id);
            $magniar_tracker_cleanup();
            restore_current_blog();
        }
        $magniar_tracker_offset += 100;
    } while (count($magniar_tracker_sites) === 100);
} else {
    $magniar_tracker_cleanup();
}
unset($magniar_tracker_cleanup, $magniar_tracker_offset, $magniar_tracker_sites, $magniar_tracker_site_id);
