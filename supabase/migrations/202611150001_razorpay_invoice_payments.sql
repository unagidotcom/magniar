alter table public.invoices
  add column if not exists payment_provider text,
  add column if not exists payment_link_id text,
  add column if not exists payment_link_url text,
  add column if not exists payment_link_status text,
  add column if not exists payment_link_expires_at timestamptz,
  add column if not exists amount_paid_cents integer not null default 0,
  add column if not exists paid_at timestamptz,
  add column if not exists provider_payment_id text,
  add column if not exists payment_method text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'invoices_payment_provider_check'
      and conrelid = 'public.invoices'::regclass
  ) then
    alter table public.invoices
      add constraint invoices_payment_provider_check
      check (payment_provider is null or payment_provider in ('RAZORPAY', 'MANUAL'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'invoices_payment_link_status_check'
      and conrelid = 'public.invoices'::regclass
  ) then
    alter table public.invoices
      add constraint invoices_payment_link_status_check
      check (
        payment_link_status is null
        or payment_link_status in ('CREATED', 'PAID', 'EXPIRED', 'CANCELLED', 'FAILED')
      );
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'invoices_amount_paid_cents_check'
      and conrelid = 'public.invoices'::regclass
  ) then
    alter table public.invoices
      add constraint invoices_amount_paid_cents_check
      check (amount_paid_cents >= 0);
  end if;
end;
$$;

create unique index if not exists invoices_payment_link_id_idx
  on public.invoices (payment_link_id)
  where payment_link_id is not null;

create index if not exists invoices_payment_link_status_idx
  on public.invoices (payment_link_status)
  where payment_link_status is not null;

create table if not exists public.invoice_payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete restrict,
  provider text not null default 'RAZORPAY'
    check (provider in ('RAZORPAY', 'MANUAL')),
  provider_payment_id text not null unique,
  provider_payment_link_id text,
  status text not null
    check (status in ('AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED')),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null,
  method text,
  paid_at timestamptz,
  provider_created_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invoice_payments_invoice_id_idx
  on public.invoice_payments (invoice_id, created_at desc);

create index if not exists invoice_payments_link_id_idx
  on public.invoice_payments (provider_payment_link_id)
  where provider_payment_link_id is not null;

drop trigger if exists invoice_payments_touch_updated_at on public.invoice_payments;
create trigger invoice_payments_touch_updated_at
before update on public.invoice_payments
for each row
execute function public.touch_updated_at();

create table if not exists public.razorpay_webhook_events (
  event_id text primary key,
  event_type text not null,
  processing_status text not null default 'RECEIVED'
    check (processing_status in ('RECEIVED', 'PROCESSED', 'IGNORED', 'FAILED')),
  invoice_id uuid references public.invoices(id) on delete set null,
  error_message text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists razorpay_webhook_events_received_at_idx
  on public.razorpay_webhook_events (received_at desc);

alter table public.invoice_payments enable row level security;
alter table public.razorpay_webhook_events enable row level security;

drop policy if exists "Admins can read invoice payments" on public.invoice_payments;
create policy "Admins can read invoice payments"
on public.invoice_payments
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can read Razorpay webhook events" on public.razorpay_webhook_events;
create policy "Admins can read Razorpay webhook events"
on public.razorpay_webhook_events
for select
to authenticated
using (public.is_admin());

revoke all on table public.invoice_payments from anon, authenticated;
revoke all on table public.razorpay_webhook_events from anon, authenticated;

grant select on table public.invoice_payments to authenticated;
grant select on table public.razorpay_webhook_events to authenticated;

do $$
begin
  if to_regclass('public.business_settings') is not null then
    alter table public.business_settings
      add column if not exists razorpay_payment_page_url text
        default 'https://razorpay.me/@magniarpay',
      add column if not exists razorpay_static_qr_url text
        default '/payments/magniar-razorpay-upi-qr.jpg';

    comment on column public.business_settings.razorpay_payment_page_url is
      'Fallback Razorpay page only. Invoice-specific links are created by the Razorpay Edge Function.';

    comment on column public.business_settings.razorpay_static_qr_url is
      'Fallback static UPI QR image. Payments made through it require manual reconciliation.';
  end if;
end;
$$;
