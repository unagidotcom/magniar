import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {
  buildShopifyAuthorizationUrl,
  createShopifyState,
  decryptShopifyToken,
  fetchShopifySnapshot,
  normalizeShopDomain,
  sanitizeShopifyError,
} from '../_shared/shopify.ts';

type AdminRequest = {
  action?: unknown;
  website_id?: unknown;
  shop_domain?: unknown;
};

type InstallationRow = {
  website_id: string;
  shop_domain: string;
  shopify_shop_id: string | null;
  shop_name: string | null;
  primary_domain: string | null;
  plan_display_name: string | null;
  currency_code: string | null;
  iana_timezone: string | null;
  published_theme_id: string | null;
  published_theme_name: string | null;
  published_theme_updated_at: string | null;
  granted_scopes: string[];
  access_token_ciphertext: string | null;
  access_token_iv: string | null;
  connection_status: string;
  installed_at: string;
  last_synced_at: string | null;
  last_error: string | null;
  uninstalled_at: string | null;
  updated_at: string;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const isAdminMetadata = (metadata: Record<string, unknown> | null | undefined) => {
  const role = String(metadata?.role || '').toLowerCase();
  const isAdmin = metadata?.is_admin === true || String(metadata?.is_admin || '').toLowerCase() === 'true';
  return isAdmin || ['admin', 'administrator', 'super_admin', 'owner'].includes(role);
};

const requiredUuid = (value: unknown, field: string) => {
  const normalized = String(value || '').trim();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalized)) {
    throw new Error(`${field} is invalid.`);
  }
  return normalized;
};

const safeInstallation = (row: InstallationRow | null) => {
  if (!row) return null;
  const {
    access_token_ciphertext: _ciphertext,
    access_token_iv: _iv,
    ...safeFields
  } = row;
  return safeFields;
};

const installationSelect = `
  website_id,
  shop_domain,
  shopify_shop_id,
  shop_name,
  primary_domain,
  plan_display_name,
  currency_code,
  iana_timezone,
  published_theme_id,
  published_theme_name,
  published_theme_updated_at,
  granted_scopes,
  access_token_ciphertext,
  access_token_iv,
  connection_status,
  installed_at,
  last_synced_at,
  last_error,
  uninstalled_at,
  updated_at
`;

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Shopify integration is not configured.' }, 500);
  }

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const bearerToken = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!bearerToken) return jsonResponse({ error: 'Authentication required.' }, 401);

  const { data: authData, error: authError } = await db.auth.getUser(bearerToken);
  if (authError || !authData.user || !isAdminMetadata(authData.user.app_metadata)) {
    return jsonResponse({ error: 'Admin privileges required.' }, 403);
  }

  let body: AdminRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }

  try {
    const action = String(body.action || '').trim().toLowerCase();
    const websiteId = requiredUuid(body.website_id, 'website_id');

    const { data: website, error: websiteError } = await db
      .from('websites')
      .select('id, platform')
      .eq('id', websiteId)
      .maybeSingle();

    if (websiteError) throw websiteError;
    if (!website) return jsonResponse({ error: 'Website not found.' }, 404);
    if (!String(website.platform || '').toLowerCase().includes('shopify')) {
      return jsonResponse({ error: 'This website is not registered as a Shopify website.' }, 400);
    }

    if (action === 'status') {
      const { data, error } = await db
        .from('shopify_installations')
        .select(installationSelect)
        .eq('website_id', websiteId)
        .maybeSingle();
      if (error) throw error;
      return jsonResponse({ connection: safeInstallation(data as InstallationRow | null) });
    }

    if (action === 'connect') {
      const apiKey = Deno.env.get('SHOPIFY_API_KEY');
      const apiSecret = Deno.env.get('SHOPIFY_API_SECRET');
      if (!apiKey || !apiSecret) {
        return jsonResponse({ error: 'Shopify app credentials have not been configured.' }, 503);
      }

      const shop = normalizeShopDomain(body.shop_domain);
      const state = await createShopifyState({
        website_id: websiteId,
        shop,
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
        nonce: crypto.randomUUID(),
      }, apiSecret);
      const redirectUri = `${supabaseUrl.replace(/\/$/, '')}/functions/v1/shopify-oauth-callback`;

      return jsonResponse({
        authorize_url: buildShopifyAuthorizationUrl({ shop, apiKey, redirectUri, state }),
      });
    }

    if (action === 'sync') {
      const tokenEncryptionKey = Deno.env.get('SHOPIFY_TOKEN_ENCRYPTION_KEY');
      if (!tokenEncryptionKey) {
        return jsonResponse({ error: 'Shopify token encryption is not configured.' }, 503);
      }

      const { data, error } = await db
        .from('shopify_installations')
        .select(installationSelect)
        .eq('website_id', websiteId)
        .maybeSingle();
      if (error) throw error;

      const installation = data as InstallationRow | null;
      if (!installation?.access_token_ciphertext || !installation.access_token_iv) {
        return jsonResponse({ error: 'Connect this Shopify store before syncing.' }, 409);
      }

      try {
        const accessToken = await decryptShopifyToken(
          installation.access_token_ciphertext,
          installation.access_token_iv,
          tokenEncryptionKey
        );
        const snapshot = await fetchShopifySnapshot(installation.shop_domain, accessToken);
        const now = new Date().toISOString();
        const { data: updated, error: updateError } = await db
          .from('shopify_installations')
          .update({
            ...snapshot,
            connection_status: 'CONNECTED',
            last_synced_at: now,
            last_error: null,
            uninstalled_at: null,
          })
          .eq('website_id', websiteId)
          .select(installationSelect)
          .single();
        if (updateError) throw updateError;
        return jsonResponse({ connection: safeInstallation(updated as InstallationRow) });
      } catch (error) {
        const safeError = sanitizeShopifyError(error);
        const shouldReauthenticate = /401|403|unauth|access token|invalid api key/i.test(safeError);
        await db
          .from('shopify_installations')
          .update({
            connection_status: shouldReauthenticate ? 'REAUTH_REQUIRED' : 'ERROR',
            last_error: safeError,
          })
          .eq('website_id', websiteId);
        throw error;
      }
    }

    return jsonResponse({ error: 'Unsupported action.' }, 400);
  } catch (error) {
    console.error('Shopify admin request failed:', sanitizeShopifyError(error));
    return jsonResponse({ error: sanitizeShopifyError(error) }, 400);
  }
});
