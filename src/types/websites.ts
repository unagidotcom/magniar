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

export interface WebsiteCheckInvocationResult {
  checked: number;
  skipped: number;
  results: WebsiteCheckResult[];
  failures: Array<{
    website_id: string;
    error: string;
  }>;
}
