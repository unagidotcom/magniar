<?php

declare(strict_types=1);

namespace Magniar\WordPressTracker;

if (!defined('ABSPATH')) {
    exit;
}

final class Report_Lock
{
    private string $value = '';

    public function acquire(): bool
    {
        $existing = get_option(MAGNIAR_WP_TRACKER_LOCK_KEY, '');
        if (is_string($existing) && $existing !== '' && (int) $existing < time()) {
            $this->remove_if_owned($existing);
        }
        $this->value = (time() + 5 * MINUTE_IN_SECONDS) . ':' . wp_generate_uuid4();
        // The unique option_name index makes acquisition atomic across workers/object caches.
        return add_option(MAGNIAR_WP_TRACKER_LOCK_KEY, $this->value, '', false);
    }

    public function release(): void
    {
        $this->remove_if_owned($this->value);
    }

    private function remove_if_owned(string $value): void
    {
        global $wpdb;
        $deleted = $wpdb->query($wpdb->prepare(
            "DELETE FROM {$wpdb->options} WHERE option_name = %s AND option_value = %s",
            MAGNIAR_WP_TRACKER_LOCK_KEY,
            $value
        ));
        if ($deleted) {
            wp_cache_delete(MAGNIAR_WP_TRACKER_LOCK_KEY, 'options');
        }
    }
}
