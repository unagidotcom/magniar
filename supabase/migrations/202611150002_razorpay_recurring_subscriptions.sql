create table if not exists public.recurring_subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id text not null references public.clients(id) on delete restrict,
  provider text not null default 'RAZORPAY'
    check (provider = 'RAZORPAY'),
  razorpay_plan_id text not null,
  razorpay_subscription_id text not null unique,
  plan_name text not null,
  service_summary text not null,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  billing_period text not null
    check (billing_period in ('WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY')),
  interval_count integer not null default 1
    check (interval_count between 1 and 12),
  quantity integer not null default 1
    check (quantity between 1 and 1000),
  total_count integer not null
    check (total_count between 1 and 520),
  paid_count integer not null default 0
    check (paid_count >= 0),
  remaining_count integer not null default 0
    check (remaining_count >= 0),
  status text not null default 'CREATED'
    check (
      status in (
        'CREATED',
        'AUTHENTICATED',
        'ACTIVE',
        'PENDING',
        'PAUSED',
        'HALTED',
        'CANCELLED',
        'COMPLETED',
        'EXPIRED'
      )
    ),
  authorization_url text,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  customer_notified boolean not null default false,
  start_at timestamptz,
  charge_at timestamptz,
  current_start timestamptz,
  current_end timestamptz,
  ended_at timestamptz,
  cancel_at_cycle_end boolean not null default false,
  internal_notes text,
  provider_data jsonb not null default '{}'::jsonb,
  last_event_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists recurring_subscriptions_client_id_idx
  on public.recurring_subscriptions (client_id, created_at desc);

create index if not exists recurring_subscriptions_status_idx
  on public.recurring_subscriptions (status, charge_at);

create index if not exists recurring_subscriptions_plan_lookup_idx
  on public.recurring_subscriptions (
    plan_name,
    amount_cents,
    currency,
    billing_period,
    interval_count,
    created_at desc
  );

drop trigger if exists recurring_subscriptions_touch_updated_at on public.recurring_subscriptions;
create trigger recurring_subscriptions_touch_updated_at
before update on public.recurring_subscriptions
for each row
execute function public.touch_updated_at();

alter table public.invoices
  add column if not exists subscription_id uuid
    references public.recurring_subscriptions(id) on delete restrict,
  add column if not exists subscription_cycle integer;

create index if not exists invoices_subscription_id_idx
  on public.invoices (subscription_id, issue_date desc)
  where subscription_id is not null;

create unique index if not exists invoices_provider_payment_id_idx
  on public.invoices (provider_payment_id)
  where provider_payment_id is not null;

alter table public.invoice_payments
  add column if not exists subscription_id uuid
    references public.recurring_subscriptions(id) on delete restrict;

create index if not exists invoice_payments_subscription_id_idx
  on public.invoice_payments (subscription_id, created_at desc)
  where subscription_id is not null;

alter table public.razorpay_webhook_events
  add column if not exists subscription_id uuid
    references public.recurring_subscriptions(id) on delete set null;

create index if not exists razorpay_webhook_events_subscription_id_idx
  on public.razorpay_webhook_events (subscription_id, received_at desc)
  where subscription_id is not null;

alter table public.recurring_subscriptions enable row level security;

drop policy if exists "Admins can read recurring subscriptions" on public.recurring_subscriptions;
create policy "Admins can read recurring subscriptions"
on public.recurring_subscriptions
for select
to authenticated
using (public.is_admin());

revoke all on table public.recurring_subscriptions from anon, authenticated;
grant select on table public.recurring_subscriptions to authenticated;

comment on table public.recurring_subscriptions is
  'Admin-managed Razorpay subscription state. Mutations are restricted to verified Edge Functions.';

comment on column public.recurring_subscriptions.authorization_url is
  'Razorpay-hosted mandate authorization link. It does not contain Magniar API credentials.';
