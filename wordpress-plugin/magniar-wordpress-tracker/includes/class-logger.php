<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Logger
{
    public static function message(string $code): string
    {
        $messages = [
            'success' => __('Report accepted by Magniar.', 'magniar-wordpress-tracker'),
            'paused' => __('Reporting is paused. Enable reporting and save to send data.', 'magniar-wordpress-tracker'),
            'configuration' => __('Enter a valid website ID, tracker key, and Magniar endpoint.', 'magniar-wordpress-tracker'),
            'site_changed' => __('This site address has changed. Review the connection and save settings before sending.', 'magniar-wordpress-tracker'),
            'busy' => __('Another report is running. Try again shortly.', 'magniar-wordpress-tracker'),
            'cooldown' => __('Please wait one minute between manual reports.', 'magniar-wordpress-tracker'),
            'network' => __('Connection failed or timed out. Check outbound HTTPS access and try again.', 'magniar-wordpress-tracker'),
            'authorization' => __('The key was rejected or tracking is disabled in Magniar. Generate a new key for this website.', 'magniar-wordpress-tracker'),
            'site_mismatch' => __('Magniar rejected the report. Check that the website record matches this site address.', 'magniar-wordpress-tracker'),
            'rate_limited' => __('Magniar is busy. Try a manual report later; the next daily report remains scheduled.', 'magniar-wordpress-tracker'),
            'remote_error' => __('Magniar could not accept the report. Check the endpoint and try again later.', 'magniar-wordpress-tracker'),
            'invalid_response' => __('The server did not confirm a saved report. The report is not marked as successful.', 'magniar-wordpress-tracker'),
            'diagnostics_failed' => __('Diagnostics could not complete. No successful report was recorded.', 'magniar-wordpress-tracker'),
            'schedule_failed' => __('WordPress could not schedule reporting. Save settings again and check WP-Cron.', 'magniar-wordpress-tracker'),
        ];
        return $messages[$code] ?? __('Tracker operation could not complete.', 'magniar-wordpress-tracker');
    }

    public static function record(string $code, int $http_status = 0): void
    {
        $logs = self::all();
        // Fixed event identifiers only: no raw exception, HTTP response, or credential text.
        $logs[] = ['time' => time(), 'code' => sanitize_key($code), 'http_status' => max(0, min(599, $http_status))];
        update_option(MAGNIAR_WP_TRACKER_LOG_OPTION, array_slice($logs, -25), false);
    }

    public static function clear(): void
    {
        delete_option(MAGNIAR_WP_TRACKER_LOG_OPTION);
    }

    public static function all(): array
    {
        $logs = get_option(MAGNIAR_WP_TRACKER_LOG_OPTION, []);
        if (!is_array($logs)) {
            return [];
        }
        return array_values(array_filter(array_slice($logs, -25), static function ($entry): bool {
            return is_array($entry) && isset($entry['time'], $entry['code'])
                && is_int($entry['time']) && is_string($entry['code'])
                && $entry['time'] >= time() - 7 * DAY_IN_SECONDS;
        }));
    }
}
