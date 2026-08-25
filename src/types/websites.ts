export type WebsiteStatus = 'UNKNOWN' | 'ONLINE' | 'DOWN' | 'ERROR';

export type WebsitePlatform =
  | 'HTML / Static'
  | 'WordPress'
  | 'Shopify'
  | 'Webflow'
  | 'React'
  | 'Next.js'
  | 'Vercel'
  | 'Other';

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
  current_status: WebsiteStatus;
  last_http_status_code?: number;
  last_response_time_ms?: number;
  last_checked_at?: string;
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
}
