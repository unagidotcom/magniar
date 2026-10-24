alter table public.shopify_installations
  add column if not exists refresh_token_ciphertext text,
  add column if not exists refresh_token_iv text,
  add column if not exists access_token_expires_at timestamptz,
  add column if not exists refresh_token_expires_at timestamptz;

alter table public.shopify_installations
  drop constraint if exists shopify_refresh_token_pair_check;

alter table public.shopify_installations
  add constraint shopify_refresh_token_pair_check check (
    (refresh_token_ciphertext is null and refresh_token_iv is null)
    or (refresh_token_ciphertext is not null and refresh_token_iv is not null)
  );

comment on column public.shopify_installations.refresh_token_ciphertext is
  'AES-256-GCM encrypted Shopify rotating offline refresh token.';

comment on column public.shopify_installations.access_token_expires_at is
  'Expiry reported by Shopify for the current offline access token.';

comment on column public.shopify_installations.refresh_token_expires_at is
  'Expiry reported by Shopify for the current rotating refresh token.';
