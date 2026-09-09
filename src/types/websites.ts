export type WebsiteStatus = 'UNKNOWN' | 'ONLINE' | 'DOWN' | 'ERROR';

export type WebsitePlatform =
  | 'Auto Detect'
  | 'HTML / Static'
  | 'WordPress'
  | 'Shopify'
  | 'Custom'
  | 'Other';

export type WebsiteCheckIntervalMinutes = 5 | 10 | 15 | 30 | 60;

export interface WebsiteClientSummary {
  id: string;
  business_name: string;
  logo_url?: string;
  website?: string;
}

export interface WebsiteRecord {
  id: string;
  client_id: string;
  client?: WebsiteClientSummary;
  name: string;
  url: string;
  normalized_url: string;
  platform: WebsitePlatform | string;
  hosting_provider?: string;
  monitoring_enabled: boolean;
  check_interval_minutes: WebsiteCheckIntervalMinutes;
  current_status: WebsiteStatus;
  last_http_status_code?: number;
  last_response_time_ms?: number;
  last_checked_at?: string;
  wordpress_tracker_enabled?: boolean;
  wordpress_tracker_key_last_rotated_at?: string;
  wordpress_last_report_at?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WebsiteInput {
  client_id: string;
  name: string;
  url: string;
  platform: WebsitePlatform | string;
  hosting_provider?: string;
  monitoring_enabled: boolean;
  check_interval_minutes: WebsiteCheckIntervalMinutes;
  internal_notes?: string;
}

export interface WebsiteCheckResult {
  website_id: string;
  checked_at: string;
  status: Exclude<WebsiteStatus, 'UNKNOWN'>;
  http_status_code: number | null;
  response_time_ms: number | null;
  error_message: string | null;
}

export type WebsiteHistoryStatusFilter = 'ALL' | 'ONLINE' | 'DOWN' | 'ERROR';

export type WebsiteHistoryRange = '24H' | '7D' | '30D';

export interface WebsiteCheckRecord extends WebsiteCheckResult {
  id: string;
}

export interface WebsiteCheckHistoryOptions {
  timeRange: WebsiteHistoryRange;
  status: WebsiteHistoryStatusFilter;
  limit?: number;
  offset?: number;
}

export interface WebsiteCheckSummary {
  checks: number;
  successful: number;
  failed: number;
  average_response_time_ms: number | null;
  uptime_percentage: number | null;
  last_successful_check: WebsiteCheckRecord | null;
  last_failure: WebsiteCheckRecord | null;
}

export type WordPressHealthStatus = 'UNKNOWN' | 'GOOD' | 'WARNING' | 'CRITICAL';

export interface WordPressSiteReport {
  id: string;
  website_id: string;
  reported_at: string;
  site_url: string;
  wordpress_version?: string;
  wordpress_update_available?: boolean | null;
  php_version?: string;
  php_supported?: boolean | null;
  active_theme_name?: string;
  active_theme_version?: string;
  theme_updates_available: number;
  plugin_count: number;
  active_plugin_count: number;
  inactive_plugin_count: number;
  plugin_updates_available: number;
  ssl_enabled?: boolean | null;
  admin_ssl_enabled?: boolean | null;
  search_engine_visible?: boolean | null;
  backup_detected?: boolean | null;
  backup_last_run_at?: string;
  health_status: WordPressHealthStatus;
  created_at: string;
}

export interface WordPressTrackerKeyResult {
  website_id: string;
  tracker_key: string;
  rotated_at: string;
}

export interface WebsiteCheckInvocationResult {
  success?: boolean;
  total?: number;
  checked: number;
  skipped: number;
  online?: number;
  failed?: number;
  results: WebsiteCheckResult[];
  failures: Array<{
    website_id: string;
    error: string;
  }>;
}
