import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {
  decryptShopifyToken,
  fetchShopifySnapshot,
  normalizeShopDomain,
  sanitizeShopifyError,
  verifyShopifyWebhookHmac,
} from '../_shared/shopify.ts';

type InstallationTokenRow = {
  website_id: string;
  shop_domain: string;
  access_token_ciphertext: string | null;
  access_token_iv: string | null;
};

const textResponse = (message: string, status = 200) =>
  new Response(message, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

Deno.serve(async (request) => {
  if (request.method !== 'POST') return textResponse('Method not allowed.', 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const apiSecret = Deno.env.get('SHOPIFY_API_SECRET');
  const tokenEncryptionKey = Deno.env.get('SHOPIFY_TOKEN_ENCRYPTION_KEY');
  if (!supabaseUrl || !serviceRoleKey || !apiSecret || !tokenEncryptionKey) {
    return textResponse('Webhook endpoint is not configured.', 500);
  }

  const rawBody = await request.text();
  const suppliedHmac = request.headers.get('x-shopify-hmac-sha256') || '';
  if (!(await verifyShopifyWebhookHmac(rawBody, suppliedHmac, apiSecret))) {
    return textResponse('Invalid webhook signature.', 401);
  }

  const webhookId = String(request.headers.get('x-shopify-webhook-id') || '').trim();
  const topic = String(request.headers.get('x-shopify-topic') || '').trim().toLowerCase();
  let shopDomain: string;
  try {
    shopDomain = normalizeShopDomain(request.headers.get('x-shopify-shop-domain'));
  } catch {
    return textResponse('Invalid shop domain.', 400);
  }
  if (!webhookId || !topic) return textResponse('Missing webhook metadata.', 400);

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error: ledgerError } = await db
    .from('shopify_webhook_deliveries')
    .insert({
      webhook_id: webhookId,
      shop_domain: shopDomain,
      topic,
      processing_status: 'PROCESSING',
      error_message: null,
      processed_at: null,
    });

  if (ledgerError) {
    const { data: claimedRetry, error: retryError } = await db
      .from('shopify_webhook_deliveries')
      .update({ processing_status: 'PROCESSING', error_message: null, processed_at: null })
      .eq('webhook_id', webhookId)
      .eq('processing_status', 'FAILED')
      .select('webhook_id')
      .maybeSingle();

    if (retryError || !claimedRetry) return textResponse('Webhook already accepted.');
  }

  try {
    const parsedBody = rawBody ? JSON.parse(rawBody) as Record<string, unknown> : {};

    if (topic === 'app/uninstalled') {
      const { error } = await db
        .from('shopify_installations')
        .update({
          connection_status: 'DISCONNECTED',
          access_token_ciphertext: null,
          access_token_iv: null,
          uninstalled_at: new Date().toISOString(),
          last_error: null,
        })
        .eq('shop_domain', shopDomain);
      if (error) throw error;
    } else if (topic === 'app/scopes_update') {
      const scopes = Array.isArray(parsedBody.current)
        ? parsedBody.current.map((value) => String(value)).filter(Boolean)
        : [];
      const { error } = await db
        .from('shopify_installations')
        .update({ granted_scopes: scopes })
        .eq('shop_domain', shopDomain);
      if (error) throw error;
    } else if (topic === 'customers/data_request' || topic === 'customers/redact') {
      // This app never requests or stores customer data, so there is nothing to return or erase.
    } else if (topic === 'shop/redact') {
      const { error } = await db
        .from('shopify_installations')
        .delete()
        .eq('shop_domain', shopDomain);
      if (error) throw error;
    } else if (['shop/update', 'domains/update', 'themes/publish'].includes(topic)) {
      const { data, error } = await db
        .from('shopify_installations')
        .select('website_id,shop_domain,access_token_ciphertext,access_token_iv')
        .eq('shop_domain', shopDomain)
        .maybeSingle();
      if (error) throw error;

      const installation = data as InstallationTokenRow | null;
      if (installation?.access_token_ciphertext && installation.access_token_iv) {
        const token = await decryptShopifyToken(
          installation.access_token_ciphertext,
          installation.access_token_iv,
          tokenEncryptionKey
        );
        const snapshot = await fetchShopifySnapshot(shopDomain, token);
        const { error: updateError } = await db
          .from('shopify_installations')
          .update({
            ...snapshot,
            connection_status: 'CONNECTED',
            last_synced_at: new Date().toISOString(),
            last_error: null,
          })
          .eq('website_id', installation.website_id);
        if (updateError) throw updateError;
      }
    }

    await db
      .from('shopify_webhook_deliveries')
      .update({ processing_status: 'PROCESSED', processed_at: new Date().toISOString(), error_message: null })
      .eq('webhook_id', webhookId);
    return textResponse('Webhook processed.');
  } catch (error) {
    const safeError = sanitizeShopifyError(error);
    console.error('Shopify webhook processing failed:', safeError);
    await db
      .from('shopify_webhook_deliveries')
      .update({ processing_status: 'FAILED', error_message: safeError })
      .eq('webhook_id', webhookId);
    return textResponse('Webhook processing failed.', 500);
  }
});
