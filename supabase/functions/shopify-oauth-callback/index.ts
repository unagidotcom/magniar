import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {
  encryptShopifyToken,
  fetchShopifySnapshot,
  normalizeShopDomain,
  sanitizeShopifyError,
  verifyShopifyOAuthHmac,
  verifyShopifyState,
} from '../_shared/shopify.ts';

const redirectResponse = (baseUrl: string, websiteId: string | null, result: 'connected' | 'error') => {
  const safeBase = baseUrl.replace(/\/$/, '');
  const path = websiteId ? `/admin/websites/${encodeURIComponent(websiteId)}` : '/admin/websites';
  return Response.redirect(`${safeBase}${path}?shopify=${result}`, 302);
};

Deno.serve(async (request) => {
  const adminUrl = Deno.env.get('MAGNIAR_ADMIN_URL') || 'https://magniar.com';
  let websiteId: string | null = null;

  if (request.method !== 'GET') {
    return redirectResponse(adminUrl, null, 'error');
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const apiKey = Deno.env.get('SHOPIFY_API_KEY');
    const apiSecret = Deno.env.get('SHOPIFY_API_SECRET');
    const tokenEncryptionKey = Deno.env.get('SHOPIFY_TOKEN_ENCRYPTION_KEY');
    if (!supabaseUrl || !serviceRoleKey || !apiKey || !apiSecret || !tokenEncryptionKey) {
      throw new Error('Shopify OAuth is not configured.');
    }

    const url = new URL(request.url);
    if (!(await verifyShopifyOAuthHmac(url, apiSecret))) {
      throw new Error('Shopify OAuth signature verification failed.');
    }

    const shop = normalizeShopDomain(url.searchParams.get('shop'));
    const code = String(url.searchParams.get('code') || '').trim();
    const stateValue = String(url.searchParams.get('state') || '').trim();
    if (!code || !stateValue) throw new Error('Shopify OAuth response is incomplete.');

    const state = await verifyShopifyState(stateValue, apiSecret);
    websiteId = state.website_id;
    if (state.shop !== shop) throw new Error('Shopify OAuth store does not match the request.');

    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: apiKey, client_secret: apiSecret, code }),
    });
    const tokenPayload = await tokenResponse.json().catch(() => ({})) as {
      access_token?: string;
      scope?: string;
    };
    if (!tokenResponse.ok || !tokenPayload.access_token) {
      throw new Error(`Shopify token exchange failed with HTTP ${tokenResponse.status}.`);
    }

    const db = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: website, error: websiteError } = await db
      .from('websites')
      .select('id, platform')
      .eq('id', websiteId)
      .maybeSingle();
    if (websiteError) throw websiteError;
    if (!website || !String(website.platform || '').toLowerCase().includes('shopify')) {
      throw new Error('The destination website is not a Shopify website.');
    }

    const snapshot = await fetchShopifySnapshot(shop, tokenPayload.access_token);
    const encryptedToken = await encryptShopifyToken(tokenPayload.access_token, tokenEncryptionKey);
    const now = new Date().toISOString();
    const grantedScopes = snapshot.granted_scopes.length
      ? snapshot.granted_scopes
      : String(tokenPayload.scope || '').split(',').map((scope) => scope.trim()).filter(Boolean);

    const { error: upsertError } = await db
      .from('shopify_installations')
      .upsert({
        website_id: websiteId,
        ...snapshot,
        granted_scopes: grantedScopes,
        access_token_ciphertext: encryptedToken.ciphertext,
        access_token_iv: encryptedToken.iv,
        connection_status: 'CONNECTED',
        installed_at: now,
        last_synced_at: now,
        last_error: null,
        uninstalled_at: null,
      }, { onConflict: 'website_id' });
    if (upsertError) throw upsertError;

    return redirectResponse(adminUrl, websiteId, 'connected');
  } catch (error) {
    console.error('Shopify OAuth callback failed:', sanitizeShopifyError(error));
    return redirectResponse(adminUrl, websiteId, 'error');
  }
});
