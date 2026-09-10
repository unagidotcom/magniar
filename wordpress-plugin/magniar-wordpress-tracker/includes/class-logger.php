<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Logger
{
    private const MAX_LOGS = 25;

    public static function info(string $message): void
    {
        self::write('info', $message);
    }

    public static function error(string $message): void
    {
        self::write('error', $message);
    }

    public static function clear(): void
    {
        delete_option(MAGNIAR_WP_TRACKER_LOG_OPTION);
    }

    public static function all(): array
    {
        $logs = get_option(MAGNIAR_WP_TRACKER_LOG_OPTION, []);
        return is_array($logs) ? $logs : [];
    }

    private static function write(string $level, string $message): void
    {
        $logs = self::all();
        $logs[] = [
            'time' => current_time('mysql'),
            'level' => sanitize_key($level),
            'message' => self::redact($message),
        ];

        $logs = array_slice($logs, -self::MAX_LOGS);
        update_option(MAGNIAR_WP_TRACKER_LOG_OPTION, $logs, 'no');
    }

    private static function redact(string $message): string
    {
        $message = sanitize_text_field($message);
        $patterns = [
            '/mgwp_[A-Za-z0-9\-_]+/',
            '/Bearer\s+[A-Za-z0-9\.\-_]+/i',
            '/key=([A-Za-z0-9\-_]+)/i',
            '/token=([A-Za-z0-9\.\-_]+)/i',
            '/password=([^&\s]+)/i',
        ];

        return preg_replace($patterns, '[redacted]', $message) ?: '[redacted]';
    }
}
