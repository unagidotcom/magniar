import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  WebsiteCheckHistoryOptions,
  WebsiteCheckIntervalMinutes,
  WebsiteCheckInvocationResult,
  WebsiteCheckRecord,
  WebsiteCheckSummary,
  WebsiteHistoryRange,
  WebsiteInput,
  WebsiteRecord,
  WebsiteStatus,
  WordPressSiteReport,
  WordPressTrackerKeyResult,
} from '../types/websites';

type WebsiteRow = {
  id: string;
  client_id: string;
  clients?: {
    id: string;
    business_name: string;
    logo_url?: string | null;
    website?: string | null;
  } | null;
  name: string;
  url: string;
  normalized_url: string;
  platform: string;
  hosting_provider?: string | null;
  monitoring_enabled: boolean;
  check_interval_minutes?: WebsiteCheckIntervalMinutes | null;
  current_status: WebsiteStatus;
  last_http_status_code?: number | null;
  last_response_time_ms?: number | null;
  last_checked_at?: string | null;
  wordpress_tracker_enabled?: boolean | null;
  wordpress_tracker_key_last_rotated_at?: string | null;
  wordpress_last_report_at?: string | null;
  internal_notes?: string | null;
  created_at: string;
  updated_at: string;
};

type WebsiteCheckRow = {
  id: string;
  website_id: string;
  checked_at: string;
  status: Exclude<WebsiteStatus, 'UNKNOWN'>;
  http_status_code: number | null;
  response_time_ms: number | null;
  error_message: string | null;
};

type WordPressSiteReportRow = {
  id: string;
  website_id: string;
  reported_at: string;
  site_url: string;
  wordpress_version?: string | null;
  wordpress_update_available?: boolean | null;
  php_version?: string | null;
  php_supported?: boolean | null;
  active_theme_name?: string | null;
  active_theme_version?: string | null;
  theme_updates_available?: number | null;
  plugin_count?: number | null;
  active_plugin_count?: number | null;
  inactive_plugin_count?: number | null;
  plugin_updates_available?: number | null;
  ssl_enabled?: boolean | null;
  admin_ssl_enabled?: boolean | null;
  search_engine_visible?: boolean | null;
  backup_detected?: boolean | null;
  backup_last_run_at?: string | null;
  health_status?: WordPressSiteReport['health_status'] | null;
  created_at: string;
};

const requireSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

const formatTimestamp = (value: string | null | undefined) => {
  if (!value) return undefined;
  return value.replace('T', ' ').substring(0, 16);
};

export const normalizeWebsiteUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error('Website URL is required.');
  }

  const withProtocol = /^[a-z][a-z\d+\-.]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new Error('Enter a valid website URL.');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Website URL must use HTTP or HTTPS.');
  }

  parsed.hash = '';
  parsed.hostname = parsed.hostname.toLowerCase();

  const normalized = parsed.href.replace(/\/$/, '');
  return normalized || parsed.origin;
};

const normalizeRow = (row: WebsiteRow): WebsiteRecord => ({
  id: row.id,
  client_id: row.client_id,
  client: row.clients
    ? {
        id: row.clients.id,
        business_name: row.clients.business_name,
        logo_url: row.clients.logo_url || undefined,
        website: row.clients.website || undefined,
      }
    : undefined,
  name: row.name,
  url: row.url,
  normalized_url: row.normalized_url,
  platform: row.platform,
  hosting_provider: row.hosting_provider || undefined,
  monitoring_enabled: row.monitoring_enabled,
  check_interval_minutes: row.check_interval_minutes || 10,
  current_status: row.current_status || 'UNKNOWN',
  last_http_status_code: row.last_http_status_code ?? undefined,
  last_response_time_ms: row.last_response_time_ms ?? undefined,
  last_checked_at: row.last_checked_at || undefined,
  wordpress_tracker_enabled: row.wordpress_tracker_enabled ?? false,
  wordpress_tracker_key_last_rotated_at: row.wordpress_tracker_key_last_rotated_at || undefined,
  wordpress_last_report_at: row.wordpress_last_report_at || undefined,
  internal_notes: row.internal_notes || undefined,
  created_at: formatTimestamp(row.created_at) || '',
  updated_at: formatTimestamp(row.updated_at) || '',
});

const normalizeCheckRow = (row: WebsiteCheckRow): WebsiteCheckRecord => ({
  id: row.id,
  website_id: row.website_id,
  checked_at: row.checked_at,
  status: row.status,
  http_status_code: row.http_status_code,
  response_time_ms: row.response_time_ms,
  error_message: row.error_message,
});

const normalizeWordPressReportRow = (row: WordPressSiteReportRow): WordPressSiteReport => ({
  id: row.id,
  website_id: row.website_id,
  reported_at: row.reported_at,
  site_url: row.site_url,
  wordpress_version: row.wordpress_version || undefined,
  wordpress_update_available: row.wordpress_update_available ?? null,
  php_version: row.php_version || undefined,
  php_supported: row.php_supported ?? null,
  active_theme_name: row.active_theme_name || undefined,
  active_theme_version: row.active_theme_version || undefined,
  theme_updates_available: row.theme_updates_available ?? 0,
  plugin_count: row.plugin_count ?? 0,
  active_plugin_count: row.active_plugin_count ?? 0,
  inactive_plugin_count: row.inactive_plugin_count ?? 0,
  plugin_updates_available: row.plugin_updates_available ?? 0,
  ssl_enabled: row.ssl_enabled ?? null,
  admin_ssl_enabled: row.admin_ssl_enabled ?? null,
  search_engine_visible: row.search_engine_visible ?? null,
  backup_detected: row.backup_detected ?? null,
  backup_last_run_at: row.backup_last_run_at || undefined,
  health_status: row.health_status || 'UNKNOWN',
  created_at: row.created_at,
});

const normalizeCheckInterval = (value: WebsiteInput['check_interval_minutes']) => {
  const allowed = [5, 10, 15, 30, 60];
  return allowed.includes(value) ? value : 10;
};

const rangeStartForHistory = (timeRange: WebsiteHistoryRange) => {
  const now = new Date();
  if (timeRange === '7D') now.setDate(now.getDate() - 7);
  else if (timeRange === '30D') now.setDate(now.getDate() - 30);
  else now.setHours(now.getHours() - 24);
  return now.toISOString();
};

const WEBSITE_SELECT = `
  id,
  client_id,
  name,
  url,
  normalized_url,
  platform,
  hosting_provider,
  monitoring_enabled,
  check_interval_minutes,
  current_status,
  last_http_status_code,
  last_response_time_ms,
  last_checked_at,
  wordpress_tracker_enabled,
  wordpress_tracker_key_last_rotated_at,
  wordpress_last_report_at,
  internal_notes,
  created_at,
  updated_at,
  clients(id, business_name, logo_url, website)
`;

const LEGACY_WEBSITE_SELECT = `
  id,
  client_id,
  name,
  url,
  normalized_url,
  platform,
  hosting_provider,
  monitoring_enabled,
  check_interval_minutes,
  current_status,
  last_http_status_code,
  last_response_time_ms,
  last_checked_at,
  internal_notes,
  created_at,
  updated_at,
  clients(id, business_name, logo_url, website)
`;

const WORDPRESS_REPORT_SELECT = `
  id,
  website_id,
  reported_at,
  site_url,
  wordpress_version,
  wordpress_update_available,
  php_version,
  php_supported,
  active_theme_name,
  active_theme_version,
  theme_updates_available,
  plugin_count,
  active_plugin_count,
  inactive_plugin_count,
  plugin_updates_available,
  ssl_enabled,
  admin_ssl_enabled,
  search_engine_visible,
  backup_detected,
  backup_last_run_at,
  health_status,
  created_at
`;

const isMissingTrackerSchemaError = (error: unknown) => {
  const message = String((error as { message?: string })?.message || error || '').toLowerCase();
  return (
    message.includes('wordpress_site_reports') ||
    message.includes('wordpress_tracker') ||
    message.includes('schema cache')
  );
};

const buildPayload = (input: WebsiteInput) => {
  if (!input.name.trim()) {
    throw new Error('Website name is required.');
  }

  if (!input.client_id) {
    throw new Error('Select an existing client.');
  }

  const normalizedUrl = normalizeWebsiteUrl(input.url);

  return {
    client_id: input.client_id,
    name: input.name.trim(),
    url: normalizedUrl,
    normalized_url: normalizedUrl,
    platform: input.platform || 'Auto Detect',
    hosting_provider: input.hosting_provider?.trim() || null,
    monitoring_enabled: input.monitoring_enabled,
    check_interval_minutes: normalizeCheckInterval(input.check_interval_minutes),
    internal_notes: input.internal_notes?.trim() || null,
  };
};

export async function listWebsites(): Promise<WebsiteRecord[]> {
  const db = requireSupabase();
  const result = await db
    .from('websites')
    .select(WEBSITE_SELECT)
    .order('created_at', { ascending: false });

  if (result.error && isMissingTrackerSchemaError(result.error)) {
    const fallback = await db
      .from('websites')
      .select(LEGACY_WEBSITE_SELECT)
      .order('created_at', { ascending: false });

    if (fallback.error) throw fallback.error;
    return ((fallback.data || []) as unknown as WebsiteRow[]).map(normalizeRow);
  }

  if (result.error) throw result.error;
  return ((result.data || []) as unknown as WebsiteRow[]).map(normalizeRow);
}

export async function getWebsiteById(id: string): Promise<WebsiteRecord | null> {
  const db = requireSupabase();
  const result = await db
    .from('websites')
    .select(WEBSITE_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (result.error && isMissingTrackerSchemaError(result.error)) {
    const fallback = await db
      .from('websites')
      .select(LEGACY_WEBSITE_SELECT)
      .eq('id', id)
      .maybeSingle();

    if (fallback.error) throw fallback.error;
    return fallback.data ? normalizeRow(fallback.data as unknown as WebsiteRow) : null;
  }

  if (result.error) throw result.error;
  return result.data ? normalizeRow(result.data as unknown as WebsiteRow) : null;
}

export async function listWebsiteChecks(
  websiteId: string,
  options: WebsiteCheckHistoryOptions
): Promise<WebsiteCheckRecord[]> {
  const db = requireSupabase();
  const limit = Math.min(Math.max(options.limit || 25, 1), 50);
  const offset = Math.max(options.offset || 0, 0);

  let query = db
    .from('website_checks')
    .select('id,website_id,checked_at,status,http_status_code,response_time_ms,error_message')
    .eq('website_id', websiteId)
    .gte('checked_at', rangeStartForHistory(options.timeRange))
    .order('checked_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (options.status !== 'ALL') {
    query = query.eq('status', options.status);
  }

  const { data, error } = await query;
  if (error) throw error;

  return ((data || []) as WebsiteCheckRow[]).map(normalizeCheckRow);
}

export async function getWebsiteCheckSummary(
  websiteId: string,
  timeRange: WebsiteHistoryRange
): Promise<WebsiteCheckSummary> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('website_checks')
    .select('id,website_id,checked_at,status,http_status_code,response_time_ms,error_message')
    .eq('website_id', websiteId)
    .gte('checked_at', rangeStartForHistory(timeRange))
    .order('checked_at', { ascending: false })
    .limit(500);

  if (error) throw error;

  const checks = ((data || []) as WebsiteCheckRow[]).map(normalizeCheckRow);
  const successful = checks.filter((check) => check.status === 'ONLINE').length;
  const failed = checks.filter((check) => check.status === 'DOWN' || check.status === 'ERROR').length;
  const responseTimes = checks
    .map((check) => check.response_time_ms)
    .filter((value): value is number => typeof value === 'number' && Number.isFinite(value));
  const averageResponse = responseTimes.length
    ? Math.round(responseTimes.reduce((total, value) => total + value, 0) / responseTimes.length)
    : null;

  const [lastSuccessfulCheck, lastFailure] = await Promise.all([
    getLatestWebsiteCheckByStatus(websiteId, ['ONLINE']),
    getLatestWebsiteCheckByStatus(websiteId, ['DOWN', 'ERROR']),
  ]);

  return {
    checks: checks.length,
    successful,
    failed,
    average_response_time_ms: averageResponse,
    uptime_percentage: checks.length ? Number(((successful / checks.length) * 100).toFixed(1)) : null,
    last_successful_check: lastSuccessfulCheck,
    last_failure: lastFailure,
  };
}

async function getLatestWebsiteCheckByStatus(
  websiteId: string,
  statuses: Array<Exclude<WebsiteStatus, 'UNKNOWN'>>
): Promise<WebsiteCheckRecord | null> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('website_checks')
    .select('id,website_id,checked_at,status,http_status_code,response_time_ms,error_message')
    .eq('website_id', websiteId)
    .in('status', statuses)
    .order('checked_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data ? normalizeCheckRow(data as WebsiteCheckRow) : null;
}

export async function createWebsite(input: WebsiteInput): Promise<WebsiteRecord> {
  const db = requireSupabase();
  const payload = buildPayload(input);

  const result = await db
    .from('websites')
    .insert({
      ...payload,
      current_status: 'UNKNOWN',
      last_http_status_code: null,
      last_response_time_ms: null,
      last_checked_at: null,
    })
    .select(WEBSITE_SELECT)
    .single();

  if (result.error && isMissingTrackerSchemaError(result.error)) {
    const fallback = await db
      .from('websites')
      .select(LEGACY_WEBSITE_SELECT)
      .eq('normalized_url', payload.normalized_url)
      .single();

    if (fallback.error) throw fallback.error;
    return normalizeRow(fallback.data as unknown as WebsiteRow);
  }

  if (result.error) throw result.error;
  return normalizeRow(result.data as unknown as WebsiteRow);
}

export async function updateWebsite(
  id: string,
  input: WebsiteInput
): Promise<WebsiteRecord> {
  const db = requireSupabase();
  const payload = buildPayload(input);

  const result = await db
    .from('websites')
    .update(payload)
    .eq('id', id)
    .select(WEBSITE_SELECT)
    .single();

  if (result.error && isMissingTrackerSchemaError(result.error)) {
    const fallback = await db
      .from('websites')
      .select(LEGACY_WEBSITE_SELECT)
      .eq('id', id)
      .single();

    if (fallback.error) throw fallback.error;
    return normalizeRow(fallback.data as unknown as WebsiteRow);
  }

  if (result.error) throw result.error;
  return normalizeRow(result.data as unknown as WebsiteRow);
}

export async function deleteWebsite(id: string): Promise<void> {
  const db = requireSupabase();
  const { error } = await db.from('websites').delete().eq('id', id);
  if (error) throw error;
}

export async function checkWebsiteNow(id: string): Promise<WebsiteCheckInvocationResult> {
  const db = requireSupabase();
  const { data, error } = await db.functions.invoke<WebsiteCheckInvocationResult>('check-websites', {
    body: { website_id: id },
  });

  if (error) throw error;
  if (!data) {
    throw new Error('Monitoring check returned no result.');
  }

  if (data.failures?.length) {
    throw new Error(data.failures[0]?.error || 'Monitoring check failed.');
  }

  return data;
}

export async function getLatestWordPressSiteReport(websiteId: string): Promise<WordPressSiteReport | null> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('wordpress_site_reports')
    .select(WORDPRESS_REPORT_SELECT)
    .eq('website_id', websiteId)
    .order('reported_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    if (isMissingTrackerSchemaError(error)) return null;
    throw error;
  }

  return data ? normalizeWordPressReportRow(data as WordPressSiteReportRow) : null;
}

export async function regenerateWordPressTrackerKey(websiteId: string): Promise<WordPressTrackerKeyResult> {
  const db = requireSupabase();
  const { data, error } = await db.rpc('regenerate_wordpress_tracker_key', {
    p_website_id: websiteId,
  });

  if (error) throw error;
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.tracker_key) {
    throw new Error('Tracker key was not returned.');
  }

  return result as WordPressTrackerKeyResult;
}

export function getWordPressReportEndpoint() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  return supabaseUrl ? `${supabaseUrl.replace(/\/$/, '')}/functions/v1/receive-wordpress-report` : '';
}
