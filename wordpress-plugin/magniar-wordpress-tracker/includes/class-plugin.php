<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Plugin
{
    private Settings_Page $settings_page;
    private Reporter $reporter;

    public function __construct()
    {
        $this->settings_page = new Settings_Page();
        $this->reporter = new Reporter();
    }

    public function init(): void
    {
        if (is_admin()) {
            $this->settings_page->init();
        }

        add_action(MAGNIAR_WP_TRACKER_CRON_HOOK, [$this->reporter, 'send_scheduled_report']);
    }

    public static function activate(): void
    {
        $settings = get_option(MAGNIAR_WP_TRACKER_OPTION);
        if (!is_array($settings)) {
            add_option(MAGNIAR_WP_TRACKER_OPTION, self::default_settings(), '', 'no');
        }

        self::schedule_daily_report();
    }

    public static function deactivate(): void
    {
        wp_clear_scheduled_hook(MAGNIAR_WP_TRACKER_CRON_HOOK);
        delete_transient(MAGNIAR_WP_TRACKER_LOCK_KEY);
    }

    public static function default_settings(): array
    {
        return [
            'enabled' => false,
            'endpoint_url' => '',
            'website_id' => '',
            'tracker_key' => '',
        ];
    }

    public static function get_settings(): array
    {
        $settings = get_option(MAGNIAR_WP_TRACKER_OPTION, []);
        if (!is_array($settings)) {
            $settings = [];
        }

        return wp_parse_args($settings, self::default_settings());
    }

    public static function schedule_daily_report(): void
    {
        if (wp_next_scheduled(MAGNIAR_WP_TRACKER_CRON_HOOK)) {
            return;
        }

        $start_time = strtotime('tomorrow 03:15:00');
        if (!$start_time) {
            $start_time = time() + DAY_IN_SECONDS;
        }

        wp_schedule_event($start_time, 'daily', MAGNIAR_WP_TRACKER_CRON_HOOK);
    }
}
