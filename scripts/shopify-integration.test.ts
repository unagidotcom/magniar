import assert from 'node:assert/strict';
import { createHmac, randomBytes, webcrypto } from 'node:crypto';

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', { value: webcrypto });
}

const {
  createShopifyState,
  decryptShopifyToken,
  encryptShopifyToken,
  normalizeShopDomain,
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

console.log('Shopify integration security tests passed.');
