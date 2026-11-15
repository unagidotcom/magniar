<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Reporter
{
    public function send_scheduled_report(): void
    {
        $this->send_report(false);
    }

    public static function state(): array
    {
        $state = get_option(MAGNIAR_WP_TRACKER_STATE_OPTION, []);
        return is_array($state) ? $state : [];
    }

    public function send_report(bool $manual = false): string
    {
        $settings = Plugin::get_settings();
        if (!$settings['enabled']) {
            return 'paused';
        }
        if (!Plugin::is_configured($settings)) {
            return 'configuration';
        }
        if ($settings['connected_site_url'] !== home_url('/')) {
            return 'site_changed';
        }
        $lock = new Report_Lock();
        if (!$lock->acquire()) {
            return 'busy';
        }
        try {
            $state = self::state();
            $last_attempt = (int) ($state['last_attempt'] ?? 0);
            if (time() - $last_attempt < ($manual ? MINUTE_IN_SECONDS : 23 * HOUR_IN_SECONDS)) {
                return 'cooldown';
            }
            $state['last_attempt'] = time();
            $state['last_result'] = 'diagnostics_failed';
            update_option(MAGNIAR_WP_TRACKER_STATE_OPTION, $state, false);
            $payload = (new Diagnostics())->collect($settings['website_id']);
            $body = wp_json_encode($payload);
            if (!is_string($body) || strlen($body) > 16384) {
                return $this->finish('diagnostics_failed', $state);
            }
            $state['snapshot'] = $payload;
            $response = wp_safe_remote_post($settings['endpoint_url'], [
                'timeout' => 8,
                'redirection' => 0,
                'sslverify' => true,
                'reject_unsafe_urls' => true,
                'limit_response_size' => 8192,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                    'X-WordPress-Tracker-Key' => $settings['tracker_key'],
                ],
                'body' => $body,
                'cookies' => [],
            ]);
            if (is_wp_error($response)) {
                return $this->finish('network', $state);
            }
            $status = (int) wp_remote_retrieve_response_code($response);
            if ($status !== 200 && $status !== 201) {
                $codes = [400 => 'site_mismatch', 401 => 'authorization', 403 => 'authorization', 429 => 'rate_limited'];
                return $this->finish($codes[$status] ?? 'remote_error', $state, $status);
            }
            $decoded = json_decode(wp_remote_retrieve_body($response), true, 8);
            $report = is_array($decoded) && isset($decoded['report']) && is_array($decoded['report']) ? $decoded['report'] : [];
            if (!is_array($decoded) || ($decoded['success'] ?? null) !== true
                || !isset($report['id'], $report['reported_at'], $report['health_status'])
                || !is_string($report['id']) || !Plugin::valid_id($report['id'])
                || !is_string($report['reported_at']) || strlen($report['reported_at']) > 40
                || !preg_match('/\A\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})\z/D', $report['reported_at'])
                || strtotime($report['reported_at']) === false
                || !in_array($report['health_status'], ['GOOD', 'WARNING', 'CRITICAL', 'UNKNOWN'], true)) {
                return $this->finish('invalid_response', $state, $status);
            }
            $state['last_success'] = time();
            $state['report_id'] = $report['id'];
            $state['reported_at'] = $report['reported_at'];
            return $this->finish('success', $state, $status);
        } catch (\Throwable $error) {
            // Third-party hooks or transport failures must not escape into WP-Cron/admin output.
            return $this->finish('diagnostics_failed', self::state());
        } finally {
            $lock->release();
        }
    }

    private function finish(string $code, array $state, int $status = 0): string
    {
        $state['last_result'] = $code;
        $state['http_status'] = $status;
        update_option(MAGNIAR_WP_TRACKER_STATE_OPTION, $state, false);
        Logger::record($code, $status);
        return $code;
    }
}
