import assert from 'node:assert/strict';
import { createHmac, randomBytes, webcrypto } from 'node:crypto';

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', { value: webcrypto });
}

const {
  createShopifyState,
  decryptShopifyToken,
  encryptShopifyToken,
  exchangeShopifyAuthorizationCode,
  normalizeShopDomain,
  refreshShopifyOfflineToken,
  shopifyTokenExpiry,
  shouldRefreshShopifyToken,
  verifyShopifyOAuthHmac,
  verifyShopifyState,
  verifyShopifyWebhookHmac,
} = await import('../supabase/functions/_shared/shopify.ts');

const secret = 'test-shopify-secret';

assert.equal(normalizeShopDomain('example-store'), 'example-store.myshopify.com');
assert.equal(normalizeShopDomain('HTTPS://Example-Store.myshopify.com/admin'), 'example-store.myshopify.com');
assert.throws(() => normalizeShopDomain('example-store.myshopify.com.attacker.test'));
assert.throws(() => normalizeShopDomain('127.0.0.1'));

const state = await createShopifyState({
  website_id: '123e4567-e89b-42d3-a456-426614174000',
  shop: 'example-store.myshopify.com',
  exp: 2_000,
  nonce: 'test-nonce',
}, secret);
const verifiedState = await verifyShopifyState(state, secret, 1_000);
assert.equal(verifiedState.shop, 'example-store.myshopify.com');
await assert.rejects(() => verifyShopifyState(`${state}x`, secret, 1_000));
await assert.rejects(() => verifyShopifyState(state, secret, 2_001));

const oauthUrl = new URL('https://example.test/callback');
oauthUrl.searchParams.set('code', 'authorization-code');
oauthUrl.searchParams.set('shop', 'example-store.myshopify.com');
oauthUrl.searchParams.set('state', 'signed-state');
oauthUrl.searchParams.set('timestamp', '1700000000');
const canonicalQuery = [...oauthUrl.searchParams.entries()]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([key, value]) => `${key}=${value}`)
  .join('&');
oauthUrl.searchParams.set('hmac', createHmac('sha256', secret).update(canonicalQuery).digest('hex'));
assert.equal(await verifyShopifyOAuthHmac(oauthUrl, secret), true);
oauthUrl.searchParams.set('code', 'tampered-code');
assert.equal(await verifyShopifyOAuthHmac(oauthUrl, secret), false);

const webhookBody = JSON.stringify({ id: 123, domain: 'example-store.myshopify.com' });
const webhookHmac = createHmac('sha256', secret).update(webhookBody).digest('base64');
assert.equal(await verifyShopifyWebhookHmac(webhookBody, webhookHmac, secret), true);
assert.equal(await verifyShopifyWebhookHmac(`${webhookBody} `, webhookHmac, secret), false);

const encryptionKey = randomBytes(32).toString('base64');
const encrypted = await encryptShopifyToken('shpat_test_token', encryptionKey);
assert.notEqual(encrypted.ciphertext, 'shpat_test_token');
assert.equal(await decryptShopifyToken(encrypted.ciphertext, encrypted.iv, encryptionKey), 'shpat_test_token');
await assert.rejects(() => decryptShopifyToken(`${encrypted.ciphertext.slice(0, -4)}AAAA`, encrypted.iv, encryptionKey));

const tokenRequests: Array<{ url: string; contentType: string | null; body: string }> = [];
const originalFetch = globalThis.fetch;
const tokenPayloads = [
  {
    access_token: 'shpat_access_1',
    refresh_token: 'shprt_refresh_1',
    scope: 'read_themes',
    expires_in: 3600,
    refresh_token_expires_in: 7776000,
  },
  {
    access_token: 'shpat_access_2',
    refresh_token: 'shprt_refresh_2',
    scope: 'read_themes',
    expires_in: 3600,
    refresh_token_expires_in: 7776000,
  },
];

globalThis.fetch = (async (input, init) => {
  const headers = new Headers(init?.headers);
  tokenRequests.push({
    url: String(input),
    contentType: headers.get('Content-Type'),
    body: String(init?.body || ''),
  });
  const payload = tokenPayloads[tokenRequests.length - 1];
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}) as typeof fetch;

try {
  const exchangedTokens = await exchangeShopifyAuthorizationCode({
    shop: 'example-store.myshopify.com',
    apiKey: 'test-client-id',
    apiSecret: 'test-client-secret',
    code: 'test-authorization-code',
  });
  assert.equal(exchangedTokens.refresh_token, 'shprt_refresh_1');
  assert.equal(tokenRequests[0].contentType, 'application/x-www-form-urlencoded');
  const exchangeBody = new URLSearchParams(tokenRequests[0].body);
  assert.equal(exchangeBody.get('code'), 'test-authorization-code');
  assert.equal(exchangeBody.get('expiring'), '1');
  assert.equal(exchangeBody.get('client_secret'), 'test-client-secret');

  const refreshedTokens = await refreshShopifyOfflineToken({
    shop: 'example-store.myshopify.com',
    apiKey: 'test-client-id',
    apiSecret: 'test-client-secret',
    refreshToken: 'shprt_refresh_1',
  });
  assert.equal(refreshedTokens.access_token, 'shpat_access_2');
  const refreshBody = new URLSearchParams(tokenRequests[1].body);
  assert.equal(refreshBody.get('grant_type'), 'refresh_token');
  assert.equal(refreshBody.get('refresh_token'), 'shprt_refresh_1');
} finally {
  globalThis.fetch = originalFetch;
}

const expiryOrigin = Date.parse('2026-10-25T00:00:00.000Z');
assert.equal(shopifyTokenExpiry(3600, expiryOrigin), '2026-10-25T01:00:00.000Z');
assert.equal(shouldRefreshShopifyToken('2026-10-25T00:04:59.000Z', expiryOrigin), true);
assert.equal(shouldRefreshShopifyToken('2026-10-25T00:05:01.000Z', expiryOrigin), false);

console.log('Shopify integration security tests passed.');
