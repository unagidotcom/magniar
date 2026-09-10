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
    }

    public function register_menu(): void
    {
        add_options_page(
            __('Magniar Tracker', 'magniar-wordpress-tracker'),
            __('Magniar Tracker', 'magniar-wordpress-tracker'),
            'manage_options',
            self::PAGE_SLUG,
            [$this, 'render']
        );
    }

    public function register_settings(): void
    {
        register_setting(
            self::SETTINGS_GROUP,
            MAGNIAR_WP_TRACKER_OPTION,
            [
                'type' => 'array',
                'sanitize_callback' => [$this, 'sanitize_settings'],
                'default' => Plugin::default_settings(),
            ]
        );
    }

    public function sanitize_settings($value): array
    {
        $value = is_array($value) ? $value : [];
        $endpoint = isset($value['endpoint_url']) ? esc_url_raw((string) $value['endpoint_url']) : '';
        $website_id = isset($value['website_id']) ? sanitize_text_field((string) $value['website_id']) : '';
        $tracker_key = isset($value['tracker_key']) ? sanitize_text_field((string) $value['tracker_key']) : '';

        if ($endpoint && !wp_http_validate_url($endpoint)) {
            add_settings_error(
                MAGNIAR_WP_TRACKER_OPTION,
                'magniar_wp_tracker_invalid_endpoint',
                __('Enter a valid HTTPS tracker endpoint.', 'magniar-wordpress-tracker')
            );
            $endpoint = '';
        }

        if ($endpoint && strpos($endpoint, 'https://') !== 0) {
            add_settings_error(
                MAGNIAR_WP_TRACKER_OPTION,
                'magniar_wp_tracker_endpoint_https',
                __('The tracker endpoint must use HTTPS.', 'magniar-wordpress-tracker')
            );
            $endpoint = '';
        }

        return [
            'enabled' => !empty($value['enabled']),
            'endpoint_url' => $endpoint,
            'website_id' => $website_id,
            'tracker_key' => $tracker_key,
        ];
    }

    public function enqueue_assets(string $hook_suffix): void
    {
        if ($hook_suffix !== 'settings_page_' . self::PAGE_SLUG) {
            return;
        }

        wp_enqueue_style(
            'magniar-wp-tracker-admin',
            plugins_url('assets/admin/settings.css', MAGNIAR_WP_TRACKER_FILE),
            [],
            MAGNIAR_WP_TRACKER_VERSION
        );
    }

    public function handle_test_report(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('You do not have permission to manage Magniar Tracker.', 'magniar-wordpress-tracker'));
        }

        check_admin_referer('magniar_wp_tracker_test_report');

        $reporter = new Reporter();
        $result = $reporter->send_report(true);
        $redirect_url = add_query_arg(
            [
                'page' => self::PAGE_SLUG,
                'magniar_tracker_notice' => $result ? 'test_success' : 'test_failed',
            ],
            admin_url('options-general.php')
        );

        wp_safe_redirect($redirect_url);
        exit;
    }

    public function handle_clear_logs(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('You do not have permission to manage Magniar Tracker.', 'magniar-wordpress-tracker'));
        }

        check_admin_referer('magniar_wp_tracker_clear_logs');
        Logger::clear();

        wp_safe_redirect(add_query_arg('page', self::PAGE_SLUG, admin_url('options-general.php')));
        exit;
    }

    public function render(): void
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        $settings = Plugin::get_settings();
        $logs = Logger::all();
        $notice = isset($_GET['magniar_tracker_notice']) ? sanitize_key((string) $_GET['magniar_tracker_notice']) : '';

        ?>
        <div class="wrap magniar-wp-tracker-admin">
            <h1><?php echo esc_html__('Magniar WordPress Tracker', 'magniar-wordpress-tracker'); ?></h1>

            <?php if ($notice === 'test_success') : ?>
                <div class="notice notice-success is-dismissible">
                    <p><?php echo esc_html__('Test report sent successfully.', 'magniar-wordpress-tracker'); ?></p>
                </div>
            <?php elseif ($notice === 'test_failed') : ?>
                <div class="notice notice-error is-dismissible">
                    <p><?php echo esc_html__('Test report failed. Review the tracker settings and logs below.', 'magniar-wordpress-tracker'); ?></p>
                </div>
            <?php endif; ?>

            <div class="magniar-wp-tracker-admin__panel">
                <form method="post" action="options.php">
                    <?php settings_fields(self::SETTINGS_GROUP); ?>

                    <table class="form-table" role="presentation">
                        <tr>
                            <th scope="row">
                                <label for="magniar_wp_tracker_enabled"><?php echo esc_html__('Enable tracker', 'magniar-wordpress-tracker'); ?></label>
                            </th>
                            <td>
                                <label>
                                    <input
                                        id="magniar_wp_tracker_enabled"
                                        type="checkbox"
                                        name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[enabled]"
                                        value="1"
                                        <?php checked(!empty($settings['enabled'])); ?>
                                    />
                                    <?php echo esc_html__('Send one safe daily report to Magniar Admin OS.', 'magniar-wordpress-tracker'); ?>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="magniar_wp_tracker_endpoint_url"><?php echo esc_html__('Tracker endpoint', 'magniar-wordpress-tracker'); ?></label>
                            </th>
                            <td>
                                <input
                                    id="magniar_wp_tracker_endpoint_url"
                                    class="regular-text code"
                                    type="url"
                                    name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[endpoint_url]"
                                    value="<?php echo esc_attr((string) $settings['endpoint_url']); ?>"
                                    placeholder="https://example.supabase.co/functions/v1/receive-wordpress-report"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="magniar_wp_tracker_website_id"><?php echo esc_html__('Website ID', 'magniar-wordpress-tracker'); ?></label>
                            </th>
                            <td>
                                <input
                                    id="magniar_wp_tracker_website_id"
                                    class="regular-text code"
                                    type="text"
                                    name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[website_id]"
                                    value="<?php echo esc_attr((string) $settings['website_id']); ?>"
                                    autocomplete="off"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="magniar_wp_tracker_tracker_key"><?php echo esc_html__('Tracker key', 'magniar-wordpress-tracker'); ?></label>
                            </th>
                            <td>
                                <input
                                    id="magniar_wp_tracker_tracker_key"
                                    class="regular-text code"
                                    type="password"
                                    name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[tracker_key]"
                                    value="<?php echo esc_attr((string) $settings['tracker_key']); ?>"
                                    autocomplete="new-password"
                                />
                            </td>
                        </tr>
                    </table>

                    <?php submit_button(__('Save Settings', 'magniar-wordpress-tracker')); ?>
                </form>
            </div>

            <div class="magniar-wp-tracker-admin__actions">
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <input type="hidden" name="action" value="magniar_wp_tracker_test_report" />
                    <?php wp_nonce_field('magniar_wp_tracker_test_report'); ?>
                    <?php submit_button(__('Send Test Report', 'magniar-wordpress-tracker'), 'secondary', 'submit', false); ?>
                </form>

                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <input type="hidden" name="action" value="magniar_wp_tracker_clear_logs" />
                    <?php wp_nonce_field('magniar_wp_tracker_clear_logs'); ?>
                    <?php submit_button(__('Clear Logs', 'magniar-wordpress-tracker'), 'secondary', 'submit', false); ?>
                </form>
            </div>

            <div class="magniar-wp-tracker-admin__panel">
                <h2><?php echo esc_html__('Recent Plugin Logs', 'magniar-wordpress-tracker'); ?></h2>
                <?php if (!$logs) : ?>
                    <p><?php echo esc_html__('No logs yet.', 'magniar-wordpress-tracker'); ?></p>
                <?php else : ?>
                    <ul class="magniar-wp-tracker-admin__logs">
                        <?php foreach (array_reverse($logs) as $log) : ?>
                            <li>
                                <strong><?php echo esc_html((string) ($log['time'] ?? '')); ?></strong>
                                <span><?php echo esc_html(strtoupper((string) ($log['level'] ?? 'info'))); ?></span>
                                <?php echo esc_html((string) ($log['message'] ?? '')); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
