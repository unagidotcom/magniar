import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type HealthStatus = 'UNKNOWN' | 'GOOD' | 'WARNING' | 'CRITICAL';

type WebsiteTrackerRow = {
  id: string;
  normalized_url: string | null;
  wordpress_tracker_enabled: boolean | null;
  wordpress_tracker_key_hash: string | null;
};

type WordPressReportBody = {
  website_id?: unknown;
  tracker_key?: unknown;
  site_url?: unknown;
  wordpress_version?: unknown;
  wordpress_update_available?: unknown;
  php_version?: unknown;
  php_supported?: unknown;
  active_theme_name?: unknown;
  active_theme_version?: unknown;
  theme_updates_available?: unknown;
  plugin_count?: unknown;
  active_plugin_count?: unknown;
  inactive_plugin_count?: unknown;
  plugin_updates_available?: unknown;
  ssl_enabled?: unknown;
  admin_ssl_enabled?: unknown;
  search_engine_visible?: unknown;
  backup_detected?: unknown;
  backup_last_run_at?: unknown;
  health_status?: unknown;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-wordpress-tracker-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const sanitizeError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error || 'Request failed');
  return message.replace(/\s+/g, ' ').slice(0, 300);
};

const textOrNull = (value: unknown, maxLength = 160) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().replace(/\s+/g, ' ');
  return trimmed ? trimmed.slice(0, maxLength) : null;
};

const requiredText = (value: unknown, fieldName: string, maxLength = 500) => {
  const normalized = textOrNull(value, maxLength);
  if (!normalized) throw new Error(`${fieldName} is required.`);
  return normalized;
};

const boolOrNull = (value: unknown) => (typeof value === 'boolean' ? value : null);

const intOrZero = (value: unknown) => {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 0) return 0;
  return Math.floor(numberValue);
};

const timestampOrNull = (value: unknown) => {
  if (typeof value !== 'string' || !value.trim()) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

const healthStatusOrDefault = (value: unknown): HealthStatus => {
  const normalized = String(value || '').toUpperCase();
  if (['GOOD', 'WARNING', 'CRITICAL', 'UNKNOWN'].includes(normalized)) {
    return normalized as HealthStatus;
  }
  return 'UNKNOWN';
};

const hostFor = (value: string | null | undefined) => {
  try {
    return new URL(String(value || '')).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
};

const isExpectedSiteUrl = (reportedUrl: string, websiteUrl: string | null) => {
  const reportedHost = hostFor(reportedUrl);
  const expectedHost = hostFor(websiteUrl);
  return Boolean(reportedHost && expectedHost && reportedHost === expectedHost);
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'WordPress tracker endpoint is not configured.' }, 500);
  }

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  let body: WordPressReportBody;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }

  try {
    const websiteId = requiredText(body.website_id, 'website_id', 80);
    const trackerKey = textOrNull(body.tracker_key, 120) || textOrNull(request.headers.get('x-wordpress-tracker-key'), 120);
    if (!trackerKey) {
      return jsonResponse({ error: 'Tracker key is required.' }, 401);
    }

    const siteUrl = requiredText(body.site_url, 'site_url', 500);

    const { data: website, error: websiteError } = await db
      .from('websites')
      .select('id, normalized_url, wordpress_tracker_enabled, wordpress_tracker_key_hash')
      .eq('id', websiteId)
      .maybeSingle();

    if (websiteError) throw websiteError;
    if (!website) {
      return jsonResponse({ error: 'Website tracker is not registered.' }, 404);
    }

    const tracker = website as WebsiteTrackerRow;
    if (!tracker.wordpress_tracker_enabled || !tracker.wordpress_tracker_key_hash) {
      return jsonResponse({ error: 'WordPress tracker is not enabled for this website.' }, 403);
    }

    const { data: hashedKey, error: hashError } = await db.rpc('hash_wordpress_tracker_key', {
      p_tracker_key: trackerKey,
    });

    if (hashError) throw hashError;
    if (hashedKey !== tracker.wordpress_tracker_key_hash) {
      return jsonResponse({ error: 'Invalid tracker key.' }, 403);
    }

    if (!isExpectedSiteUrl(siteUrl, tracker.normalized_url)) {
      return jsonResponse({ error: 'Reported site URL does not match this website record.' }, 400);
    }

    const reportedAt = new Date().toISOString();
    const safeReportData = {
      site_url: siteUrl,
      wordpress_version: textOrNull(body.wordpress_version, 80),
      wordpress_update_available: boolOrNull(body.wordpress_update_available),
      php_version: textOrNull(body.php_version, 80),
      php_supported: boolOrNull(body.php_supported),
      active_theme_name: textOrNull(body.active_theme_name, 160),
      active_theme_version: textOrNull(body.active_theme_version, 80),
      theme_updates_available: intOrZero(body.theme_updates_available),
      plugin_count: intOrZero(body.plugin_count),
      active_plugin_count: intOrZero(body.active_plugin_count),
      inactive_plugin_count: intOrZero(body.inactive_plugin_count),
      plugin_updates_available: intOrZero(body.plugin_updates_available),
      ssl_enabled: boolOrNull(body.ssl_enabled),
      admin_ssl_enabled: boolOrNull(body.admin_ssl_enabled),
      search_engine_visible: boolOrNull(body.search_engine_visible),
      backup_detected: boolOrNull(body.backup_detected),
      backup_last_run_at: timestampOrNull(body.backup_last_run_at),
      health_status: healthStatusOrDefault(body.health_status),
    };
    const reportPayload = {
      website_id: websiteId,
      reported_at: reportedAt,
      ...safeReportData,
      raw_report_data: safeReportData,
    };

    const { data: report, error: insertError } = await db
      .from('wordpress_site_reports')
      .insert(reportPayload)
      .select('id, reported_at, health_status')
      .single();

    if (insertError) throw insertError;

    const { error: updateError } = await db
      .from('websites')
      .update({
        wordpress_last_report_at: reportedAt,
      })
      .eq('id', websiteId);

    if (updateError) throw updateError;

    return jsonResponse({
      success: true,
      report,
    });
  } catch (error) {
    return jsonResponse({ error: sanitizeError(error) }, 400);
  }
});
