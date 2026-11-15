<?php

use Magniar\WordPressTracker\Plugin;
use Magniar\WordPressTracker\Reporter;
use Magniar\WordPressTracker\Settings_Page;
use Magniar\WordPressTracker\Report_Lock;
use Magniar\WordPressTracker\Diagnostics;
use Magniar\WordPressTracker\Logger;

require '/wordpress/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/plugin.php';
require_once ABSPATH . 'wp-admin/includes/template.php';

$checks = [];
function magniar_test($condition, $message) {
    global $checks;
    if (!$condition) {
        throw new RuntimeException($message);
    }
    $checks[] = $message;
}

try {
wp_set_current_user(1);
$option = 'magniar_wp_tracker_settings';
$state_option = 'magniar_wp_tracker_state';
$cron = 'magniar_wp_tracker_daily_report';
$lock_key = 'magniar_wp_tracker_report_lock';
$endpoint = Magniar\WordPressTracker\MAGNIAR_WP_TRACKER_ENDPOINT;
$key = 'mgwp_' . str_repeat('T', 43); // Synthetic credential, never accepted by the live receiver.
$id = '11111111-1111-4111-8111-111111111111';
$page = new Settings_Page();
$reporter = new Reporter();
$baseline = ['blogname' => get_option('blogname'), 'permalink_structure' => get_option('permalink_structure')];
magniar_test(class_exists(Plugin::class), 'Plugin loads in real WordPress');
magniar_test(!Plugin::get_settings()['enabled'], 'Activation requires explicit reporting opt-in');
magniar_test(!wp_next_scheduled($cron), 'No cron job before opt-in');
magniar_test($reporter->send_report(true) === 'paused', 'Manual reports also require opt-in');

$valid = ['endpoint_url' => $endpoint, 'website_id' => $id, 'tracker_key' => $key, 'enabled' => '1'];
$sanitized = $page->sanitize_settings($valid);
update_option($option, $sanitized, false);
magniar_test(Plugin::is_configured(Plugin::get_settings()), 'Valid connection accepted');
magniar_test(wp_get_schedule($cron) === 'daily', 'Daily reporting scheduled');
for ($i = 0; $i < 5; $i++) { Plugin::schedule_daily_report(); }
$events = 0;
foreach (_get_cron_array() as $hooks) { $events += isset($hooks[$cron]) ? count($hooks[$cron]) : 0; }
magniar_test($events === 1, 'Repeated setup does not duplicate scheduled events');
$kept = $page->sanitize_settings(array_merge($valid, ['tracker_key' => '']));
magniar_test($kept['tracker_key'] === $key, 'Blank key preserves existing credential');
foreach (['https://127.0.0.1/x', 'http://example.com', 'https://example.com/x', $endpoint . '?token=x', $endpoint . '#x', str_replace('.supabase.co', '.supabase.co.evil.example', $endpoint)] as $url) {
    magniar_test($page->sanitize_settings(array_merge($valid, ['endpoint_url' => $url])) === Plugin::get_settings(), 'Unsafe endpoint rejected: ' . $url);
}
magniar_test($page->sanitize_settings(array_merge($valid, ['website_id' => 'invalid'])) === Plugin::get_settings(), 'Invalid website ID rejected');
magniar_test($page->sanitize_settings(array_merge($valid, ['tracker_key' => 'not-a-tracker-key'])) === Plugin::get_settings(), 'Other API keys rejected');
magniar_test($page->sanitize_settings(array_merge($valid, ['tracker_key' => ['malformed']])) === Plugin::get_settings(), 'Array input rejected without PHP warnings');
magniar_test($page->sanitize_settings(array_merge($valid, ['tracker_key' => '', 'website_id' => '22222222-2222-4222-8222-222222222222'])) === Plugin::get_settings(), 'Saved key cannot silently move to another website');
$subscriber = wp_create_user('magniar-test-subscriber', wp_generate_password(32));
wp_set_current_user($subscriber);
magniar_test($page->sanitize_settings($valid) === Plugin::get_settings(), 'Non-admin cannot change settings');
ob_start(); $page->render(); $unauthorized_html = ob_get_clean();
magniar_test($unauthorized_html === '', 'Non-admin cannot view diagnostic settings');
wp_set_current_user(1);

$a = new Report_Lock(); $b = new Report_Lock();
magniar_test($a->acquire() && !$b->acquire(), 'Concurrent lock acquisition has a single winner');
$b->release();
magniar_test(get_option($lock_key) !== false, 'Losing worker cannot remove active lock');
$a->release();
magniar_test($b->acquire(), 'Owner can release lock for next worker');
$b->release();
add_option($lock_key, (time() - 1) . ':expired', '', false);
magniar_test($a->acquire(), 'Expired lock recovers');
$a->release();

$captured = [];
$response_status = 200;
$response_body = ['success' => true, 'report' => ['id' => $id, 'reported_at' => gmdate('Y-m-d\TH:i:s\Z'), 'health_status' => 'GOOD']];
$transport_error = false;
$transport_throw = false;
$mock = static function ($pre, $args, $url) use (&$captured, &$response_status, &$response_body, &$transport_error, &$transport_throw, $endpoint) {
    if ($url !== $endpoint) { return $pre; }
    $captured[] = $args;
    if ($transport_throw) { throw new RuntimeException('Third-party transport exception with private information'); }
    if ($transport_error) { return new WP_Error('http_request_failed', 'Sensitive URL, header, path, and token must never be logged'); }
    return ['headers' => [], 'body' => is_array($response_body) ? wp_json_encode($response_body) : $response_body, 'response' => ['code' => $response_status, 'message' => 'Test response'], 'cookies' => []];
};
add_filter('pre_http_request', $mock, 10, 3);
magniar_test($reporter->send_report(true) === 'success', 'Confirmed receiver response records success');
$request = $captured[0];
$payload = json_decode($request['body'], true);
magniar_test($request['redirection'] === 0 && $request['sslverify'] === true && $request['reject_unsafe_urls'] === true, 'HTTPS verification and SSRF checks enabled; redirects disabled');
magniar_test($request['timeout'] === 8 && $request['limit_response_size'] === 8192, 'Transport has bounded timeout and response size');
magniar_test($request['headers']['X-WordPress-Tracker-Key'] === $key && strpos($request['body'], $key) === false, 'Credential goes only in authentication header');
$fields = ['website_id', 'site_url', 'wordpress_version', 'wordpress_update_available', 'php_version', 'php_supported', 'active_theme_name', 'active_theme_version', 'theme_updates_available', 'plugin_count', 'active_plugin_count', 'inactive_plugin_count', 'plugin_updates_available', 'ssl_enabled', 'admin_ssl_enabled', 'search_engine_visible', 'backup_detected', 'backup_last_run_at', 'health_status'];
magniar_test(array_keys($payload) === $fields, 'Report uses only the existing receiver field contract');
magniar_test($payload['active_plugin_count'] + $payload['inactive_plugin_count'] === $payload['plugin_count'], 'Plugin counts are consistent');
magniar_test($payload['backup_last_run_at'] === null, 'No invented backup success timestamp');
magniar_test(!empty(Reporter::state()['last_success']), 'Accepted report time persisted');
magniar_test($reporter->send_report(true) === 'cooldown' && count($captured) === 1, 'Repeated clicks do not duplicate reports');
magniar_test($reporter->send_report(false) === 'cooldown', 'Scheduled job respects recent report');

$last_success = Reporter::state()['last_success'];
$cases = [
    [403, [], 'authorization'], [400, [], 'site_mismatch'], [429, [], 'rate_limited'],
    [500, [], 'remote_error'], [302, [], 'remote_error'], [200, '<html>Login page</html>', 'invalid_response'],
    [200, ['success' => true], 'invalid_response'], [204, '', 'remote_error'],
    [200, ['success' => true, 'report' => ['id' => $id, 'reported_at' => 'tomorrow', 'health_status' => 'GOOD']], 'invalid_response'],
];
foreach ($cases as [$response_status, $response_body, $expected]) {
    $state = Reporter::state(); $state['last_attempt'] = time() - 61; update_option($state_option, $state, false);
    magniar_test($reporter->send_report(true) === $expected, 'Failed/unconfirmed HTTP ' . $response_status . ' reports ' . $expected);
    magniar_test(Reporter::state()['last_success'] === $last_success, 'Failed report cannot advance last success');
    magniar_test(get_option($lock_key) === false, 'Failed report releases its lock');
}
$transport_error = true;
$state = Reporter::state(); $state['last_attempt'] = time() - 61; update_option($state_option, $state, false);
magniar_test($reporter->send_report(true) === 'network', 'Timeout/error returns controlled failure');
$transport_error = false; $transport_throw = true;
$state = Reporter::state(); $state['last_attempt'] = time() - 61; update_option($state_option, $state, false);
magniar_test($reporter->send_report(true) === 'diagnostics_failed', 'Third-party exception does not escape');
magniar_test(get_option($lock_key) === false, 'Exception releases report lock');
magniar_test(strpos(wp_json_encode(Logger::all()), 'Sensitive') === false && strpos(wp_json_encode(Logger::all()), $key) === false, 'Logs omit raw transport errors and credentials');
remove_filter('pre_http_request', $mock, 10);

$clone = Plugin::get_settings(); $clone['connected_site_url'] = 'https://original.example/'; update_option($option, $clone, false);
magniar_test($reporter->send_report(true) === 'site_changed', 'Cloned site cannot transmit automatically');
update_option($option, $sanitized, false);
for ($i = 0; $i < 40; $i++) { Logger::record('network'); }
magniar_test(count(Logger::all()) === 25, 'Logs limited to 25 entries');
update_option('magniar_wp_tracker_logs', [['time' => time() - 8 * DAY_IN_SECONDS, 'code' => 'network']], false);
magniar_test(Logger::all() === [], 'Logs older than seven days not retained when rewritten');
Logger::clear();
magniar_test(get_option('magniar_wp_tracker_logs') === false, 'Clear logs removes only tracker logs');
magniar_test(Diagnostics::php_supported('7.4.33') === false && Diagnostics::php_supported('8.0.30') === false, 'Unsupported legacy PHP versions flagged');
magniar_test(Diagnostics::php_supported('8.2.1', strtotime('2027-01-01 UTC')) === false, 'PHP support flag expires on security deadline');
magniar_test(Diagnostics::php_supported('9.0.0') === null, 'Future PHP versions remain unknown');
delete_site_transient('update_core'); delete_site_transient('update_plugins'); delete_site_transient('update_themes');
$diagnostic = (new Diagnostics())->collect($id);
magniar_test($diagnostic['wordpress_update_available'] === null && $diagnostic['health_status'] !== 'GOOD', 'Missing update caches cannot imply healthy/up-to-date');
set_site_transient('update_core', (object) ['last_checked' => time(), 'updates' => [(object) ['response' => 'latest']]]);
set_site_transient('update_plugins', (object) ['last_checked' => time()]);
set_site_transient('update_themes', (object) ['last_checked' => time()]);
$real_home = get_option('home'); $real_siteurl = get_option('siteurl');
$secure_home = static function () { return 'https://magniar-test.example/'; };
$secure_admin = static function () { return 'https://magniar-test.example/wp-admin/'; };
add_filter('home_url', $secure_home); add_filter('admin_url', $secure_admin);
$diagnostic = (new Diagnostics())->collect($id);
magniar_test($diagnostic['health_status'] === (Diagnostics::php_supported(PHP_VERSION) === false ? 'CRITICAL' : 'UNKNOWN'), 'Incomplete update caches on HTTPS cannot imply healthy');
remove_filter('home_url', $secure_home); remove_filter('admin_url', $secure_admin);

$page->enqueue_assets('index.php');
magniar_test(!wp_style_is('magniar-wp-tracker-admin', 'enqueued'), 'Plugin styles absent from unrelated admin pages');
$page->enqueue_assets('settings_page_magniar-wordpress-tracker');
magniar_test(wp_style_is('magniar-wp-tracker-admin', 'enqueued'), 'Styles load only on plugin screen');
ob_start(); $page->render(); $html = ob_get_clean();
magniar_test(strpos($html, $key) === false, 'Saved key never appears in settings HTML');
magniar_test(strpos($html, 'name="_wpnonce"') !== false, 'Action forms include WordPress nonces');

global $wpdb;
$rows = $wpdb->get_results("SELECT option_name, autoload FROM {$wpdb->options} WHERE option_name IN ('magniar_wp_tracker_settings', 'magniar_wp_tracker_state', 'magniar_wp_tracker_logs', 'magniar_wp_tracker_version')", ARRAY_A);
foreach ($rows as $row) { magniar_test(in_array($row['autoload'], ['no', 'off', 'auto-off'], true), $row['option_name'] . ' does not autoload'); }
Plugin::deactivate();
magniar_test(!wp_next_scheduled($cron) && Plugin::get_settings()['tracker_key'] === $key, 'Deactivation removes job but preserves configuration');
Plugin::activate();
magniar_test((bool) wp_next_scheduled($cron), 'Reactivation restores one daily job');
delete_option('magniar_wp_tracker_version');
$legacy = $valid; $legacy['enabled'] = true; update_option($option, $legacy, false);
Plugin::upgrade();
magniar_test(!Plugin::get_settings()['enabled'] && Plugin::get_settings()['tracker_key'] === $key, 'Upgrade preserves legacy credentials and requires consent');
$settings = $sanitized; $settings['delete_on_uninstall'] = true; update_option($option, $settings, false);
add_option('magniar_test_foreign_option', 'preserve');
define('WP_UNINSTALL_PLUGIN', 'magniar-wordpress-tracker/magniar-wordpress-tracker.php');
require WP_PLUGIN_DIR . '/magniar-wordpress-tracker/uninstall.php';
magniar_test(get_option($option) === false && get_option($state_option) === false && !wp_next_scheduled($cron), 'Opted-in uninstall cleans tracker data and jobs');
magniar_test(get_option('magniar_test_foreign_option') === 'preserve', 'Uninstall preserves unrelated data');
foreach ($baseline as $name => $value) { magniar_test(get_option($name) === $value, 'Core option unchanged: ' . $name); }
echo wp_json_encode(['passed' => count($checks), 'checks' => $checks, 'wordpress' => get_bloginfo('version'), 'php' => PHP_VERSION, 'peak_memory_mb' => round(memory_get_peak_usage(true) / 1048576, 1)]);
} catch (Throwable $error) {
    echo wp_json_encode(['failed' => $error->getMessage(), 'line' => $error->getLine(), 'checks' => $checks]);
}
