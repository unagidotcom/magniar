import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

const migration = read('supabase/migrations/202611150001_razorpay_invoice_payments.sql');
const adminFunction = read('supabase/functions/razorpay-payments/index.ts');
const webhookFunction = read('supabase/functions/razorpay-webhook/index.ts');
const invoiceService = read('src/services/invoiceService.ts');
const subscriptionMigration = read('supabase/migrations/202611150002_razorpay_recurring_subscriptions.sql');
const subscriptionFunction = read('supabase/functions/razorpay-subscriptions/index.ts');
const subscriptionService = read('src/services/recurringBillingService.ts');
const subscriptionPage = read('src/components/admin/subscriptions/RecurringBillingPage.tsx');
const adminShell = read('src/components/admin/AdminShell.tsx');

assert.match(migration, /alter table public\.invoices[\s\S]*payment_link_id text/);
assert.match(migration, /create table if not exists public\.invoice_payments/);
assert.match(migration, /create table if not exists public\.razorpay_webhook_events/);
assert.match(migration, /alter table public\.invoice_payments enable row level security/);
assert.match(migration, /revoke all on table public\.invoice_payments from anon, authenticated/);
assert.doesNotMatch(migration, /grant (insert|update|delete)[^;]*invoice_payments to authenticated/i);

assert.match(adminFunction, /db\.auth\.getUser\(bearerToken\)/);
assert.match(adminFunction, /isAdminMetadata\(authData\.user\.app_metadata\)/);
assert.match(adminFunction, /accept_partial: false/);
assert.match(adminFunction, /invoice\.total_cents/);
assert.match(adminFunction, /notify: \{ email: false, sms: false \}/);
assert.match(adminFunction, /reminder_enable: false/);
assert.match(adminFunction, /notify_by\/email/);
assert.doesNotMatch(adminFunction, /body\.send_email/);
assert.doesNotMatch(invoiceService, /RAZORPAY_KEY_SECRET|RAZORPAY_WEBHOOK_SECRET/);

const signatureCheckIndex = webhookFunction.indexOf('secureEqual(expectedSignature, signature)');
const parseIndex = webhookFunction.indexOf('JSON.parse(rawBody)');
assert.ok(signatureCheckIndex >= 0 && parseIndex > signatureCheckIndex, 'Webhook body must be verified before parsing.');
assert.match(webhookFunction, /x-razorpay-event-id/);
assert.match(webhookFunction, /payment_link\.paid/);
assert.match(webhookFunction, /amountPaid < invoice\.total_cents/);
assert.match(webhookFunction, /currency !== invoice\.currency\.toUpperCase\(\)/);

assert.match(invoiceService, /QRCode\.toDataURL\(paymentUrl/);
assert.match(invoiceService, /Cancel the active Razorpay Payment Link before deleting this invoice/);

assert.match(subscriptionMigration, /create table if not exists public\.recurring_subscriptions/);
assert.match(subscriptionMigration, /references public\.clients\(id\) on delete restrict/);
assert.match(subscriptionMigration, /alter table public\.recurring_subscriptions enable row level security/);
assert.match(subscriptionMigration, /using \(public\.is_admin\(\)\)/);
assert.match(subscriptionMigration, /revoke all on table public\.recurring_subscriptions from anon, authenticated/);
assert.match(subscriptionMigration, /grant select on table public\.recurring_subscriptions to authenticated/);
assert.doesNotMatch(subscriptionMigration, /grant (insert|update|delete)[^;]*recurring_subscriptions to authenticated/i);
assert.match(subscriptionMigration, /invoices_provider_payment_id_idx/);

assert.match(subscriptionFunction, /db\.auth\.getUser\(bearerToken\)/);
assert.match(subscriptionFunction, /isAdminMetadata\(authData\.user\.app_metadata\)/);
assert.match(subscriptionFunction, /customer_notify: notifyCustomer \? 1 : 0/);
assert.match(subscriptionFunction, /\/subscriptions\/\$\{encodeURIComponent\(row\.razorpay_subscription_id\)\}\/pause/);
assert.match(subscriptionFunction, /\/subscriptions\/\$\{encodeURIComponent\(row\.razorpay_subscription_id\)\}\/resume/);
assert.match(subscriptionFunction, /cancel_at_cycle_end/);
assert.doesNotMatch(subscriptionService, /RAZORPAY_KEY_SECRET|SUPABASE_SERVICE_ROLE_KEY/);

assert.match(webhookFunction, /subscription\.charged/);
assert.match(webhookFunction, /recurring_subscriptions/);
assert.match(webhookFunction, /provider_payment_id.*paymentId/s);
assert.match(webhookFunction, /subscription_id: localSubscription\.id/);
assert.match(subscriptionPage, /notifyCustomer: false/);
assert.match(subscriptionPage, /cancelRecurringSubscription/);
assert.match(adminShell, /currentRoute === 'subscriptions'/);

console.log('Razorpay invoice integration security rules passed.');
