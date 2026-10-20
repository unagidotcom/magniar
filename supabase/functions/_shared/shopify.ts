export const SHOPIFY_API_VERSION = '2026-10';
export const SHOPIFY_SCOPES = ['read_themes'] as const;

export type ShopifyStatePayload = {
  website_id: string;
  shop: string;
  exp: number;
  nonce: string;
};

export type ShopifyStoreSnapshot = {
  shopify_shop_id: string;
  shop_name: string;
  shop_domain: string;
  primary_domain: string | null;
  plan_display_name: string | null;
  currency_code: string | null;
  iana_timezone: string | null;
  published_theme_id: string | null;
  published_theme_name: string | null;
  published_theme_updated_at: string | null;
  granted_scopes: string[];
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const bytesToBase64 = (bytes: Uint8Array) => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const base64ToBytes = (value: string) => {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const base64UrlEncode = (bytes: Uint8Array) =>
  bytesToBase64(bytes).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '');

const base64UrlDecode = (value: string) => {
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return base64ToBytes(padded);
};

const hmacBytes = async (secret: string, value: string) => {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
};

const constantTimeEqual = (left: Uint8Array, right: Uint8Array) => {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index];
  }
  return difference === 0;
};

export const normalizeShopDomain = (value: unknown) => {
  let normalized = String(value || '').trim().toLowerCase();
  normalized = normalized.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!normalized.endsWith('.myshopify.com') && /^[a-z0-9][a-z0-9-]*$/.test(normalized)) {
    normalized = `${normalized}.myshopify.com`;
  }
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(normalized)) {
    throw new Error('Enter the permanent store domain ending in .myshopify.com.');
  }
  return normalized;
};

export const createShopifyState = async (
  payload: ShopifyStatePayload,
  secret: string
) => {
  const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const signature = base64UrlEncode(await hmacBytes(secret, encodedPayload));
  return `${encodedPayload}.${signature}`;
};

export const verifyShopifyState = async (
  state: string,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000)
) => {
  const [encodedPayload, encodedSignature, extra] = state.split('.');
  if (!encodedPayload || !encodedSignature || extra) throw new Error('Invalid OAuth state.');

  const expected = await hmacBytes(secret, encodedPayload);
  const supplied = base64UrlDecode(encodedSignature);
  if (!constantTimeEqual(expected, supplied)) throw new Error('Invalid OAuth state signature.');

  const payload = JSON.parse(decoder.decode(base64UrlDecode(encodedPayload))) as ShopifyStatePayload;
  if (!payload.website_id || !payload.shop || !payload.nonce || payload.exp < nowSeconds) {
    throw new Error('OAuth state has expired.');
  }
  payload.shop = normalizeShopDomain(payload.shop);
  return payload;
};

export const buildShopifyAuthorizationUrl = (options: {
  shop: string;
  apiKey: string;
  redirectUri: string;
  state: string;
}) => {
  const shop = normalizeShopDomain(options.shop);
  const url = new URL(`https://${shop}/admin/oauth/authorize`);
  url.searchParams.set('client_id', options.apiKey);
  url.searchParams.set('scope', SHOPIFY_SCOPES.join(','));
  url.searchParams.set('redirect_uri', options.redirectUri);
  url.searchParams.set('state', options.state);
  return url.toString();
};

export const verifyShopifyOAuthHmac = async (url: URL, secret: string) => {
  const suppliedHex = url.searchParams.get('hmac') || '';
  if (!/^[a-f0-9]{64}$/i.test(suppliedHex)) return false;

  const pairs = [...url.searchParams.entries()]
    .filter(([key]) => key !== 'hmac' && key !== 'signature')
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const expected = await hmacBytes(secret, pairs);
  const supplied = Uint8Array.from(suppliedHex.match(/.{2}/g) || [], (part) => parseInt(part, 16));
  return constantTimeEqual(expected, supplied);
};

export const verifyShopifyWebhookHmac = async (
  rawBody: string,
  suppliedBase64: string,
  secret: string
) => {
  if (!suppliedBase64) return false;
  const expected = await hmacBytes(secret, rawBody);
  let supplied: Uint8Array;
  try {
    supplied = base64ToBytes(suppliedBase64);
  } catch {
    return false;
  }
  return constantTimeEqual(expected, supplied);
};

const encryptionKey = async (base64Key: string, usage: KeyUsage[]) => {
  let raw: Uint8Array;
  try {
    raw = base64ToBytes(base64Key);
  } catch {
    throw new Error('Invalid Shopify token encryption key.');
  }
  if (raw.length !== 32) throw new Error('Shopify token encryption key must contain 32 bytes.');
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, usage);
};

export const encryptShopifyToken = async (token: string, base64Key: string) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await encryptionKey(base64Key, ['encrypt']);
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(token)
  ));
  return {
    ciphertext: bytesToBase64(ciphertext),
    iv: bytesToBase64(iv),
  };
};

export const decryptShopifyToken = async (
  ciphertext: string,
  iv: string,
  base64Key: string
) => {
  const key = await encryptionKey(base64Key, ['decrypt']);
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToBytes(iv) },
    key,
    base64ToBytes(ciphertext)
  );
  return decoder.decode(plaintext);
};

export const fetchShopifySnapshot = async (
  shopDomain: string,
  accessToken: string
): Promise<ShopifyStoreSnapshot> => {
  const shop = normalizeShopDomain(shopDomain);
  const response = await fetch(`https://${shop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({
      query: `query MagniarShopHealth {
        shop {
          id
          name
          myshopifyDomain
          currencyCode
          ianaTimezone
          plan { displayName }
          primaryDomain { host }
        }
        themes(first: 1, roles: [MAIN]) {
          nodes { id name updatedAt }
        }
        currentAppInstallation {
          accessScopes { handle }
        }
      }`,
    }),
  });

  const payload = await response.json().catch(() => ({})) as {
    data?: {
      shop?: {
        id?: string;
        name?: string;
        myshopifyDomain?: string;
        currencyCode?: string;
        ianaTimezone?: string;
        plan?: { displayName?: string };
        primaryDomain?: { host?: string };
      };
      themes?: { nodes?: Array<{ id?: string; name?: string; updatedAt?: string }> };
      currentAppInstallation?: { accessScopes?: Array<{ handle?: string }> };
    };
    errors?: Array<{ message?: string }>;
  };

  if (!response.ok || payload.errors?.length || !payload.data?.shop?.id) {
    const message = payload.errors?.map((error) => error.message).filter(Boolean).join('; ');
    throw new Error(message || `Shopify Admin API returned HTTP ${response.status}.`);
  }

  const shopData = payload.data.shop;
  const theme = payload.data.themes?.nodes?.[0];
  return {
    shopify_shop_id: shopData.id || '',
    shop_name: shopData.name || shop,
    shop_domain: normalizeShopDomain(shopData.myshopifyDomain || shop),
    primary_domain: shopData.primaryDomain?.host || null,
    plan_display_name: shopData.plan?.displayName || null,
    currency_code: shopData.currencyCode || null,
    iana_timezone: shopData.ianaTimezone || null,
    published_theme_id: theme?.id || null,
    published_theme_name: theme?.name || null,
    published_theme_updated_at: theme?.updatedAt || null,
    granted_scopes: (payload.data.currentAppInstallation?.accessScopes || [])
      .map((scope) => scope.handle || '')
      .filter(Boolean),
  };
};

export const sanitizeShopifyError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error || 'Shopify request failed.');
  return message.replace(/shpat_[A-Za-z0-9_-]+/g, '[redacted]').replace(/\s+/g, ' ').slice(0, 500);
};
