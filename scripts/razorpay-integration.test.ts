import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

const migration = read('supabase/migrations/202611150001_razorpay_invoice_payments.sql');
const adminFunction = read('supabase/functions/razorpay-payments/index.ts');
const webhookFunction = read('supabase/functions/razorpay-webhook/index.ts');
const invoiceService = read('src/services/invoiceService.ts');

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

console.log('Razorpay invoice integration security rules passed.');
