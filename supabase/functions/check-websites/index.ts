import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type WebsiteStatus = 'ONLINE' | 'DOWN' | 'ERROR';

type WebsiteRow = {
  id: string;
  url: string | null;
  normalized_url: string | null;
  monitoring_enabled: boolean;
  check_interval_minutes: number | null;
  last_checked_at: string | null;
};

type CheckResult = {
  website_id: string;
  checked_at: string;
  status: WebsiteStatus;
  http_status_code: number | null;
  response_time_ms: number | null;
  error_message: string | null;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-monitoring-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const CHECK_TIMEOUT_MS = 10_000;
const DEFAULT_BATCH_LIMIT = 25;
const MAX_BATCH_LIMIT = 50;

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });

const isAdminMetadata = (metadata: Record<string, unknown> | null | undefined) => {
  const role = String(metadata?.role || '').toLowerCase();
  const isAdmin = metadata?.is_admin === true || String(metadata?.is_admin || '').toLowerCase() === 'true';

  return isAdmin || ['admin', 'administrator', 'super_admin', 'owner'].includes(role);
};

const sanitizeError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error || 'Request failed');
  return message.replace(/\s+/g, ' ').slice(0, 500);
};

const isPrivateHostname = (hostname: string) => {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) {
    return true;
  }

  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const octets = ipv4.slice(1).map(Number);
    if (octets.some((octet) => octet < 0 || octet > 255)) return true;
    const [a, b] = octets;
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }

  return (
    host === '::1' ||
    host.startsWith('fc') ||
    host.startsWith('fd') ||
    host.startsWith('fe80:')
  );
};

const normalizeHttpsUrl = (value: string | null | undefined) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) throw new Error('Website URL is missing.');

  const withProtocol = /^[a-z][a-z\d+\-.]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  const parsed = new URL(withProtocol);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Website URL must use HTTP or HTTPS.');
  }

  if (isPrivateHostname(parsed.hostname)) {
    throw new Error('Private or local network URLs cannot be monitored.');
  }

  parsed.protocol = 'https:';
  parsed.hash = '';
  parsed.hostname = parsed.hostname.toLowerCase();

  return parsed.href.replace(/\/$/, '') || parsed.origin;
};

const isDue = (website: WebsiteRow, now: Date) => {
  if (!website.monitoring_enabled) return false;
  if (!website.last_checked_at) return true;

  const intervalMinutes = website.check_interval_minutes || 10;
  const lastChecked = new Date(website.last_checked_at);
  if (Number.isNaN(lastChecked.getTime())) return true;

  return lastChecked.getTime() + intervalMinutes * 60_000 <= now.getTime();
};

const checkWebsite = async (website: WebsiteRow): Promise<CheckResult> => {
  const checkedAt = new Date().toISOString();
  let targetUrl: string;

  try {
    targetUrl = normalizeHttpsUrl(website.normalized_url || website.url);
  } catch (error) {
    return {
      website_id: website.id,
      checked_at: checkedAt,
      status: 'DOWN',
      http_status_code: null,
      response_time_ms: null,
      error_message: sanitizeError(error),
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);
  const startedAt = performance.now();

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Magniar-Monitor/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const responseTimeMs = Math.max(0, Math.round(performance.now() - startedAt));
    const status: WebsiteStatus = response.status >= 500 ? 'ERROR' : 'ONLINE';

    return {
      website_id: website.id,
      checked_at: checkedAt,
      status,
      http_status_code: response.status,
      response_time_ms: responseTimeMs,
      error_message: status === 'ERROR' ? `HTTP ${response.status}` : null,
    };
  } catch (error) {
    return {
      website_id: website.id,
      checked_at: checkedAt,
      status: 'DOWN',
      http_status_code: null,
      response_time_ms: null,
      error_message: sanitizeError(error),
    };
  } finally {
    clearTimeout(timeout);
  }
};

const loadWebsites = async (
  db: ReturnType<typeof createClient>,
  websiteId: string | null,
  limit: number
) => {
  let query = db
    .from('websites')
    .select('id,url,normalized_url,monitoring_enabled,check_interval_minutes,last_checked_at')
    .eq('monitoring_enabled', true)
    .order('last_checked_at', { ascending: true, nullsFirst: true })
    .limit(Math.min(Math.max(limit, 1), MAX_BATCH_LIMIT));

  if (websiteId) {
    query = query.eq('id', websiteId).limit(1);
  }

  const { data, error } = await query;
  if (error) throw error;

  const rows = (data || []) as WebsiteRow[];
  if (websiteId) return rows;

  const now = new Date();
  return rows.filter((website) => isDue(website, now));
};

const persistResult = async (db: ReturnType<typeof createClient>, result: CheckResult) => {
  const { error: insertError } = await db.from('website_checks').insert(result);
  if (insertError) throw insertError;

  const { error: updateError } = await db
    .from('websites')
    .update({
      current_status: result.status,
      last_http_status_code: result.http_status_code,
      last_response_time_ms: result.response_time_ms,
      last_checked_at: result.checked_at,
    })
    .eq('id', result.website_id);

  if (updateError) throw updateError;
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
  const cronSecret = Deno.env.get('MONITORING_CRON_SECRET');

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Monitoring function is not configured.' }, 500);
  }

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const authorization = request.headers.get('Authorization') || '';
  const bearerToken = authorization.replace(/^Bearer\s+/i, '').trim();
  const providedCronSecret = request.headers.get('x-monitoring-secret') || '';
  const isScheduledRun = Boolean(cronSecret && providedCronSecret === cronSecret);

  if (!isScheduledRun) {
    if (!bearerToken) {
      return jsonResponse({ error: 'Authentication required.' }, 401);
    }

    const { data, error } = await db.auth.getUser(bearerToken);
    if (error || !data.user || !isAdminMetadata(data.user.app_metadata)) {
      return jsonResponse({ error: 'Admin privileges required.' }, 403);
    }
  }

  let body: { website_id?: string; limit?: number } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const websiteId = typeof body.website_id === 'string' && body.website_id.trim()
    ? body.website_id.trim()
    : null;
  const limit = Number.isFinite(body.limit) ? Number(body.limit) : DEFAULT_BATCH_LIMIT;

  try {
    const websites = await loadWebsites(db, websiteId, limit);
    const results: CheckResult[] = [];
    const failures: Array<{ website_id: string; error: string }> = [];

    for (const website of websites) {
      try {
        const result = await checkWebsite(website);
        await persistResult(db, result);
        results.push(result);
      } catch (error) {
        failures.push({
          website_id: website.id,
          error: sanitizeError(error),
        });
      }
    }

    return jsonResponse({
      checked: results.length,
      skipped: websiteId && websites.length === 0 ? 1 : 0,
      results,
      failures,
    });
  } catch (error) {
    return jsonResponse({ error: sanitizeError(error) }, 500);
  }
});
