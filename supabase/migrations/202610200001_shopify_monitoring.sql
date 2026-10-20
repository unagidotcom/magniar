create table if not exists public.shopify_installations (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null unique references public.websites(id) on delete cascade,
  shop_domain text not null unique check (
    shop_domain ~ '^[a-z0-9][a-z0-9-]*\.myshopify\.com$'
  ),
  shopify_shop_id text,
  shop_name text,
  primary_domain text,
  plan_display_name text,
  currency_code text,
  iana_timezone text,
  published_theme_id text,
  published_theme_name text,
  published_theme_updated_at timestamptz,
  granted_scopes text[] not null default '{}'::text[],
  access_token_ciphertext text,
  access_token_iv text,
  connection_status text not null default 'CONNECTED'
    check (connection_status in ('CONNECTED', 'REAUTH_REQUIRED', 'DISCONNECTED', 'ERROR')),
  installed_at timestamptz not null default now(),
  last_synced_at timestamptz,
  last_error text,
  uninstalled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint shopify_token_pair_check check (
    (access_token_ciphertext is null and access_token_iv is null)
    or (access_token_ciphertext is not null and access_token_iv is not null)
  )
);

create index if not exists shopify_installations_status_idx
  on public.shopify_installations (connection_status);

create index if not exists shopify_installations_last_synced_idx
  on public.shopify_installations (last_synced_at desc);

drop trigger if exists shopify_installations_touch_updated_at
  on public.shopify_installations;
create trigger shopify_installations_touch_updated_at
before update on public.shopify_installations
for each row
execute function public.touch_updated_at();

alter table public.shopify_installations enable row level security;

revoke all on table public.shopify_installations from public, anon, authenticated;

create table if not exists public.shopify_webhook_deliveries (
  webhook_id text primary key,
  shop_domain text not null,
  topic text not null,
  processing_status text not null default 'PROCESSING'
    check (processing_status in ('PROCESSING', 'PROCESSED', 'FAILED')),
  error_message text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists shopify_webhook_deliveries_received_idx
  on public.shopify_webhook_deliveries (received_at desc);

alter table public.shopify_webhook_deliveries enable row level security;

revoke all on table public.shopify_webhook_deliveries from public, anon, authenticated;

comment on table public.shopify_installations is
  'Server-managed Shopify app installations. Encrypted access tokens are never exposed to browser clients.';

comment on table public.shopify_webhook_deliveries is
  'Idempotency ledger for verified Shopify webhook deliveries.';
