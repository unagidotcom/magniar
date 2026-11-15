<?php
/**
 * Plugin settings screen. Variables are prepared by Settings_Page::render().
 */
namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="wrap magniar-wp-tracker-admin">
    <div class="magniar-wp-tracker-admin__heading">
        <div><h1><?php esc_html_e('Magniar Tracker', 'magniar-wordpress-tracker'); ?></h1>
        <p><?php echo esc_html(home_url('/')); ?></p></div>
        <span class="magniar-wp-tracker-admin__status"><?php echo esc_html($status); ?></span>
    </div>
    <?php settings_errors(MAGNIAR_WP_TRACKER_OPTION); ?>
    <?php if (is_string($notice) && $notice !== '') : ?>
        <div class="notice <?php echo $notice === 'success' ? 'notice-success' : 'notice-warning'; ?>"><p><?php echo esc_html(Logger::message($notice)); ?></p></div>
    <?php endif; ?>
    <?php if ($settings['enabled'] && $settings['connected_site_url'] !== home_url('/')) : ?>
        <div class="notice notice-warning"><p><?php echo esc_html(Logger::message('site_changed')); ?></p></div>
    <?php endif; ?>
    <?php if ($settings['enabled'] && defined('DISABLE_WP_CRON') && DISABLE_WP_CRON) : ?>
        <div class="notice notice-warning"><p><?php esc_html_e('WP-Cron is disabled. Daily reporting needs your host to run WordPress scheduled events. Manual reports are still available.', 'magniar-wordpress-tracker'); ?></p></div>
    <?php endif; ?>
    <?php if ($settings['enabled'] && (!$next || $next < time() - DAY_IN_SECONDS)) : ?>
        <div class="notice notice-warning"><p><?php esc_html_e('The reporting schedule is missing or overdue. Save settings and check WordPress scheduled events with your host.', 'magniar-wordpress-tracker'); ?></p></div>
    <?php endif; ?>

    <dl class="magniar-wp-tracker-admin__summary">
        <div><dt><?php esc_html_e('Last attempt', 'magniar-wordpress-tracker'); ?></dt><dd><?php echo esc_html($this->date_label($state['last_attempt'] ?? null)); ?></dd></div>
        <div><dt><?php esc_html_e('Last accepted report', 'magniar-wordpress-tracker'); ?></dt><dd><?php echo esc_html($this->date_label($state['last_success'] ?? null)); ?></dd></div>
        <div><dt><?php esc_html_e('Next daily report', 'magniar-wordpress-tracker'); ?></dt><dd><?php echo esc_html($this->date_label($next)); ?></dd></div>
    </dl>

    <section class="magniar-wp-tracker-admin__section">
        <h2><?php esc_html_e('Connection', 'magniar-wordpress-tracker'); ?></h2>
        <form method="post" action="options.php">
            <?php settings_fields(self::SETTINGS_GROUP); ?>
            <table class="form-table" role="presentation">
                <tr><th scope="row"><label for="magniar_wp_tracker_endpoint_url"><?php esc_html_e('Tracker endpoint', 'magniar-wordpress-tracker'); ?></label></th>
                    <td><input id="magniar_wp_tracker_endpoint_url" class="regular-text code" type="url" name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[endpoint_url]" value="<?php echo esc_attr($settings['endpoint_url']); ?>" required maxlength="200" /></td></tr>
                <tr><th scope="row"><label for="magniar_wp_tracker_website_id"><?php esc_html_e('Website ID', 'magniar-wordpress-tracker'); ?></label></th>
                    <td><input id="magniar_wp_tracker_website_id" class="regular-text code" type="text" name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[website_id]" value="<?php echo esc_attr($settings['website_id']); ?>" autocomplete="off" maxlength="36" /></td></tr>
                <tr><th scope="row"><label for="magniar_wp_tracker_tracker_key"><?php esc_html_e('Tracker key', 'magniar-wordpress-tracker'); ?></label></th>
                    <td><input id="magniar_wp_tracker_tracker_key" class="regular-text code" type="password" name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[tracker_key]" value="" autocomplete="new-password" maxlength="48" aria-describedby="magniar_wp_tracker_key_help" />
                    <p id="magniar_wp_tracker_key_help" class="description"><?php echo esc_html($settings['tracker_key'] ? __('Key saved. Leave blank to keep it, or paste a new key to replace it.', 'magniar-wordpress-tracker') : __('Generate a key in Magniar Admin > Websites > your website > WordPress Tracker.', 'magniar-wordpress-tracker')); ?></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Reporting', 'magniar-wordpress-tracker'); ?></th>
                    <td><label for="magniar_wp_tracker_enabled"><input id="magniar_wp_tracker_enabled" type="checkbox" name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[enabled]" value="1" <?php checked($settings['enabled']); ?> />
                    <?php esc_html_e('Allow daily health reports to Magniar', 'magniar-wordpress-tracker'); ?></label>
                    <p class="description"><?php esc_html_e('Includes this site address, software versions, update counts, HTTPS status, and search visibility. No visitor, customer, order, or user records are collected. Manual reports send the same data.', 'magniar-wordpress-tracker'); ?></p></td></tr>
                <tr><th scope="row"><?php esc_html_e('Uninstall', 'magniar-wordpress-tracker'); ?></th>
                    <td><label for="magniar_wp_tracker_cleanup"><input id="magniar_wp_tracker_cleanup" type="checkbox" name="<?php echo esc_attr(MAGNIAR_WP_TRACKER_OPTION); ?>[delete_on_uninstall]" value="1" <?php checked($settings['delete_on_uninstall']); ?> />
                    <?php esc_html_e('Remove local tracker settings and reports when deleting this plugin', 'magniar-wordpress-tracker'); ?></label></td></tr>
            </table>
            <?php submit_button(__('Save settings', 'magniar-wordpress-tracker')); ?>
        </form>
        <div class="magniar-wp-tracker-admin__actions">
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="magniar_wp_tracker_test_report" />
                <?php wp_nonce_field('magniar_wp_tracker_test_report'); ?>
                <button type="submit" class="button button-secondary" <?php disabled(!$settings['enabled'] || !Plugin::is_configured($settings)); ?>><?php esc_html_e('Send test report', 'magniar-wordpress-tracker'); ?></button>
            </form>
        </div>
        <p class="description"><?php esc_html_e('Daily reports run when WordPress processes scheduled events, which may be delayed on low-traffic sites. Times use your WordPress timezone.', 'magniar-wordpress-tracker'); ?></p>
    </section>

    <section class="magniar-wp-tracker-admin__section">
        <h2><?php esc_html_e('Latest diagnostic snapshot', 'magniar-wordpress-tracker'); ?></h2>
        <?php if (!$snapshot) : ?>
            <p><?php esc_html_e('No diagnostics collected yet.', 'magniar-wordpress-tracker'); ?></p>
        <?php else : ?>
            <p><?php esc_html_e('Collected during the last report attempt. Update counts use WordPress cached checks; missing or stale checks are not proof that software is up to date. Backup detection means a recognized backup plugin is active, not that a backup succeeded.', 'magniar-wordpress-tracker'); ?></p>
            <div class="magniar-wp-tracker-admin__table-wrap">
                <table class="widefat striped"><thead><tr><th><?php esc_html_e('Diagnostic', 'magniar-wordpress-tracker'); ?></th><th><?php esc_html_e('Value', 'magniar-wordpress-tracker'); ?></th></tr></thead><tbody>
                <?php
                $labels = [
                    'wordpress_version' => __('WordPress version', 'magniar-wordpress-tracker'),
                    'wordpress_update_available' => __('WordPress update available', 'magniar-wordpress-tracker'),
                    'php_version' => __('PHP version', 'magniar-wordpress-tracker'),
                    'php_supported' => __('PHP security support', 'magniar-wordpress-tracker'),
                    'active_theme_name' => __('Active theme', 'magniar-wordpress-tracker'),
                    'active_theme_version' => __('Theme version', 'magniar-wordpress-tracker'),
                    'theme_updates_available' => __('Installed theme updates', 'magniar-wordpress-tracker'),
                    'plugin_count' => __('Installed plugins', 'magniar-wordpress-tracker'),
                    'active_plugin_count' => __('Active plugins', 'magniar-wordpress-tracker'),
                    'inactive_plugin_count' => __('Inactive plugins', 'magniar-wordpress-tracker'),
                    'plugin_updates_available' => __('Plugin updates', 'magniar-wordpress-tracker'),
                    'ssl_enabled' => __('Site uses HTTPS', 'magniar-wordpress-tracker'),
                    'admin_ssl_enabled' => __('Admin uses HTTPS', 'magniar-wordpress-tracker'),
                    'search_engine_visible' => __('Search indexing allowed', 'magniar-wordpress-tracker'),
                    'backup_detected' => __('Backup plugin detected', 'magniar-wordpress-tracker'),
                    'backup_last_run_at' => __('Last verified backup', 'magniar-wordpress-tracker'),
                    'health_status' => __('Overall health', 'magniar-wordpress-tracker'),
                ];
                foreach ($labels as $key => $label) :
                    $value = $snapshot[$key] ?? null;
                    $display = is_bool($value) ? ($value ? __('Yes', 'magniar-wordpress-tracker') : __('No', 'magniar-wordpress-tracker'))
                        : (is_scalar($value) && $value !== '' ? (string) $value : __('Unknown', 'magniar-wordpress-tracker'));
                    ?>
                    <tr><td><?php echo esc_html($label); ?></td><td><?php echo esc_html($display); ?></td></tr>
                <?php endforeach; ?>
                </tbody></table>
            </div>
        <?php endif; ?>
    </section>

    <section class="magniar-wp-tracker-admin__section">
        <div class="magniar-wp-tracker-admin__heading"><h2><?php esc_html_e('Recent activity', 'magniar-wordpress-tracker'); ?></h2>
            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="magniar_wp_tracker_clear_logs" />
                <?php wp_nonce_field('magniar_wp_tracker_clear_logs'); ?>
                <button type="submit" class="button"><?php esc_html_e('Clear logs', 'magniar-wordpress-tracker'); ?></button>
            </form>
        </div>
        <?php if (!$logs) : ?>
            <p><?php esc_html_e('No recent activity.', 'magniar-wordpress-tracker'); ?></p>
        <?php else : ?>
            <ul class="magniar-wp-tracker-admin__logs">
                <?php foreach (array_reverse($logs) as $log) : ?>
                    <li><time><?php echo esc_html($this->date_label($log['time'])); ?></time>
                    <span><?php echo esc_html(Logger::message($log['code'])); ?>
                    <?php if (!empty($log['http_status']) && is_numeric($log['http_status'])) { echo ' (HTTP ' . esc_html((string) (int) $log['http_status']) . ')'; } ?></span></li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </section>
    <details class="magniar-wp-tracker-admin__section">
        <summary><?php esc_html_e('Disconnect this website', 'magniar-wordpress-tracker'); ?></summary>
        <p><?php esc_html_e('Stops future reports and removes the saved key and local snapshot. A report already in progress may finish. Reports already stored in Magniar remain there; disable tracking or rotate the key in Magniar to revoke access.', 'magniar-wordpress-tracker'); ?></p>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <input type="hidden" name="action" value="magniar_wp_tracker_disconnect" />
            <?php wp_nonce_field('magniar_wp_tracker_disconnect'); ?>
            <button type="submit" class="button"><?php esc_html_e('Disconnect and remove key', 'magniar-wordpress-tracker'); ?></button>
        </form>
    </details>
</div>
