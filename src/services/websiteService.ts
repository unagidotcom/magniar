import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { WebsiteInput, WebsiteRecord, WebsiteStatus } from '../types/websites';

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
  current_status: WebsiteStatus;
  last_http_status_code?: number | null;
  last_response_time_ms?: number | null;
  last_checked_at?: string | null;
  created_at: string;
  updated_at: string;
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
  current_status: row.current_status || 'UNKNOWN',
  last_http_status_code: row.last_http_status_code || undefined,
  last_response_time_ms: row.last_response_time_ms || undefined,
  last_checked_at: formatTimestamp(row.last_checked_at),
  created_at: formatTimestamp(row.created_at) || '',
  updated_at: formatTimestamp(row.updated_at) || '',
});

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
    platform: input.platform || 'Other',
    hosting_provider: input.hosting_provider?.trim() || null,
    monitoring_enabled: input.monitoring_enabled,
  };
};

export async function listWebsites(): Promise<WebsiteRecord[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('websites')
    .select('*, clients(id, business_name, logo_url, website)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return ((data || []) as WebsiteRow[]).map(normalizeRow);
}

export async function createWebsite(input: WebsiteInput): Promise<WebsiteRecord> {
  const db = requireSupabase();
  const payload = buildPayload(input);

  const { data, error } = await db
    .from('websites')
    .insert({
      ...payload,
      current_status: 'UNKNOWN',
      last_http_status_code: null,
      last_response_time_ms: null,
      last_checked_at: null,
    })
    .select('*, clients(id, business_name, logo_url, website)')
    .single();

  if (error) throw error;
  return normalizeRow(data as WebsiteRow);
}

export async function updateWebsite(
  id: string,
  input: WebsiteInput
): Promise<WebsiteRecord> {
  const db = requireSupabase();
  const payload = buildPayload(input);

  const { data, error } = await db
    .from('websites')
    .update(payload)
    .eq('id', id)
    .select('*, clients(id, business_name, logo_url, website)')
    .single();

  if (error) throw error;
  return normalizeRow(data as WebsiteRow);
}

export async function deleteWebsite(id: string): Promise<void> {
  const db = requireSupabase();
  const { error } = await db.from('websites').delete().eq('id', id);
  if (error) throw error;
}
