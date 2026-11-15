import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type ProviderEntity = Record<string, unknown> & {
  id?: string;
  status?: string;
  amount?: number;
  amount_paid?: number;
  currency?: string;
  method?: string;
  created_at?: number;
  paid_at?: number;
  notes?: Record<string, unknown>;
  payment_link_id?: string;
  subscription_id?: string;
  plan_id?: string;
  start_at?: number;
  charge_at?: number;
  current_start?: number;
  current_end?: number;
  ended_at?: number;
  paid_count?: number;
  remaining_count?: number;
  total_count?: number;
  quantity?: number;
  has_scheduled_changes?: boolean;
  change_scheduled_at?: number;
};

type RazorpayWebhook = {
  event?: string;
  payload?: {
    payment_link?: { entity?: ProviderEntity };
    payment?: { entity?: ProviderEntity };
    subscription?: { entity?: ProviderEntity };
  };
};

type InvoiceRow = {
  id: string;
  total_cents: number;
  currency: string;
  status: string;
  payment_link_status: string | null;
};

type SubscriptionRow = {
  id: string;
  client_id: string;
  customer_name: string;
  customer_email: string | null;
  plan_name: string;
  service_summary: string;
  amount_cents: number;
  currency: string;
  quantity: number;
  status: string;
  paid_count: number;
  total_count: number;
  charge_at: string | null;
  current_start: string | null;
  current_end: string | null;
  ended_at: string | null;
  cancel_at_cycle_end: boolean;
  provider_data: Record<string, unknown>;
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const bytesToHex = (bytes: ArrayBuffer) =>
  Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

const hmacHex = async (secret: string, message: string) => {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return bytesToHex(await crypto.subtle.sign('HMAC', key, encoder.encode(message)));
};

const secureEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
};

const digestEventId = async (rawBody: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawBody));
  return `sha256_${bytesToHex(digest)}`;
};

const asString = (value: unknown) => String(value || '').trim();

const unixTimestamp = (value: unknown) => {
  const timestamp = Number(value);
  return Number.isFinite(timestamp) && timestamp > 0
    ? new Date(timestamp * 1000).toISOString()
    : null;
};

const providerSubscriptionStatus = (eventType: string, entity: ProviderEntity | null) => {
  if (eventType === 'subscription.authenticated') return 'AUTHENTICATED';
  if (eventType === 'subscription.activated' || eventType === 'subscription.resumed' || eventType === 'subscription.charged') return 'ACTIVE';
  if (eventType === 'subscription.pending' || eventType === 'payment.failed') return 'PENDING';
  if (eventType === 'subscription.halted') return 'HALTED';
  if (eventType === 'subscription.paused') return 'PAUSED';
  if (eventType === 'subscription.cancelled') return 'CANCELLED';
  if (eventType === 'subscription.completed') return 'COMPLETED';

  const status = asString(entity?.status).toUpperCase();
  if (['CREATED', 'AUTHENTICATED', 'ACTIVE', 'PENDING', 'PAUSED', 'HALTED', 'CANCELLED', 'COMPLETED', 'EXPIRED'].includes(status)) {
    return status;
  }
  return 'CREATED';
};

const servicePeriod = (currentStart: string | null, currentEnd: string | null) => {
  if (!currentStart && !currentEnd) return 'Recurring service cycle';
  const format = (value: string | null) => value
    ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
    : 'Open';
  return `${format(currentStart)} - ${format(currentEnd)}`;
};

Deno.serve(async (request) => {
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
  if (!supabaseUrl || !serviceRoleKey || !webhookSecret) {
    return jsonResponse({ error: 'Webhook integration is not configured.' }, 503);
  }

  const rawBody = await request.text();
  const signature = asString(request.headers.get('X-Razorpay-Signature')).toLowerCase();
  if (!signature) return jsonResponse({ error: 'Missing webhook signature.' }, 401);

  const expectedSignature = await hmacHex(webhookSecret, rawBody);
  if (!secureEqual(expectedSignature, signature)) {
    return jsonResponse({ error: 'Invalid webhook signature.' }, 401);
  }

  let body: RazorpayWebhook;
  try {
    body = JSON.parse(rawBody) as RazorpayWebhook;
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload.' }, 400);
  }

  const eventType = asString(body.event);
  if (!eventType) return jsonResponse({ error: 'Webhook event type is missing.' }, 400);

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const eventId = asString(request.headers.get('x-razorpay-event-id')) || await digestEventId(rawBody);

  const { error: eventInsertError } = await db
    .from('razorpay_webhook_events')
    .insert({ event_id: eventId, event_type: eventType, processing_status: 'RECEIVED' });

  if (eventInsertError?.code === '23505') return jsonResponse({ ok: true, duplicate: true });
  if (eventInsertError) {
    console.error('Razorpay webhook event registration failed:', eventInsertError);
    return jsonResponse({ error: 'Could not register webhook event.' }, 500);
  }

  try {
    const paymentLink = body.payload?.payment_link?.entity || null;
    const payment = body.payload?.payment?.entity || null;
    const providerSubscription = body.payload?.subscription?.entity || null;
    const razorpaySubscriptionId = asString(providerSubscription?.id || payment?.subscription_id);

    let localSubscription: SubscriptionRow | null = null;
    if (razorpaySubscriptionId) {
      const { data, error } = await db
        .from('recurring_subscriptions')
        .select('id, client_id, customer_name, customer_email, plan_name, service_summary, amount_cents, currency, quantity, status, paid_count, total_count, charge_at, current_start, current_end, ended_at, cancel_at_cycle_end, provider_data')
        .eq('razorpay_subscription_id', razorpaySubscriptionId)
        .maybeSingle();
      if (error) throw error;
      localSubscription = data as SubscriptionRow | null;
    }

    if (localSubscription && (eventType.startsWith('subscription.') || eventType === 'payment.failed')) {
      const currentStart = providerSubscription
        ? unixTimestamp(providerSubscription.current_start)
        : localSubscription.current_start;
      const currentEnd = providerSubscription
        ? unixTimestamp(providerSubscription.current_end)
        : localSubscription.current_end;
      const paidCount = Number(providerSubscription?.paid_count ?? localSubscription.paid_count);
      const remainingCount = Number(providerSubscription?.remaining_count ?? Math.max(localSubscription.total_count - paidCount, 0));
      let invoiceId: string | null = null;

      if (eventType === 'subscription.charged') {
        const paymentId = asString(payment?.id);
        if (!paymentId) throw new Error('Subscription charge did not include a payment id.');
        const expectedAmount = localSubscription.amount_cents * localSubscription.quantity;
        const amountPaid = Number(payment?.amount || 0);
        const currency = asString(payment?.currency).toUpperCase();
        if (amountPaid !== expectedAmount || currency !== localSubscription.currency.toUpperCase()) {
          throw new Error('Subscription charge amount or currency does not match the configured retainer.');
        }

        const { data: existingInvoice, error: existingInvoiceError } = await db
          .from('invoices')
          .select('id')
          .eq('provider_payment_id', paymentId)
          .maybeSingle();
        if (existingInvoiceError) throw existingInvoiceError;
        invoiceId = existingInvoice?.id || null;

        const paidAt = unixTimestamp(payment?.created_at) || new Date().toISOString();
        if (!invoiceId) {
          const cycle = paidCount > 0 ? paidCount : localSubscription.paid_count + 1;
          const { data: insertedInvoice, error: invoiceInsertError } = await db
            .from('invoices')
            .insert({
              client_id: localSubscription.client_id,
              client_name: localSubscription.customer_name,
              client_email: localSubscription.customer_email,
              status: 'PAID',
              issue_date: paidAt.slice(0, 10),
              due_date: paidAt.slice(0, 10),
              currency,
              subtotal_cents: amountPaid,
              tax_cents: 0,
              service_summary: localSubscription.service_summary,
              line_items: [{
                description: localSubscription.service_summary,
                quantity: localSubscription.quantity,
                unit_amount_cents: localSubscription.amount_cents,
                service_period: servicePeriod(currentStart, currentEnd),
              }],
              notes: `Automatically generated from recurring plan: ${localSubscription.plan_name}.`,
              sent_at: paidAt,
              payment_provider: 'RAZORPAY',
              amount_paid_cents: amountPaid,
              paid_at: paidAt,
              provider_payment_id: paymentId,
              payment_method: asString(payment?.method) || null,
              subscription_id: localSubscription.id,
              subscription_cycle: cycle,
            })
            .select('id')
            .single();

          if (invoiceInsertError?.code === '23505') {
            const { data: racedInvoice, error: racedInvoiceError } = await db
              .from('invoices')
              .select('id')
              .eq('provider_payment_id', paymentId)
              .single();
            if (racedInvoiceError) throw racedInvoiceError;
            invoiceId = racedInvoice.id;
          } else if (invoiceInsertError) {
            throw invoiceInsertError;
          } else {
            invoiceId = insertedInvoice.id;
          }
        }

        const { error: paymentError } = await db
          .from('invoice_payments')
          .upsert({
            invoice_id: invoiceId,
            subscription_id: localSubscription.id,
            provider: 'RAZORPAY',
            provider_payment_id: paymentId,
            provider_payment_link_id: null,
            status: 'CAPTURED',
            amount_cents: amountPaid,
            currency,
            method: asString(payment?.method) || null,
            paid_at: paidAt,
            provider_created_at: unixTimestamp(payment?.created_at),
            metadata: { event_id: eventId, event_type: eventType, razorpay_subscription_id: razorpaySubscriptionId },
          }, { onConflict: 'provider_payment_id' });
        if (paymentError) throw paymentError;
      }

      const status = providerSubscriptionStatus(eventType, providerSubscription);
      const { error: subscriptionUpdateError } = await db
        .from('recurring_subscriptions')
        .update({
          status,
          paid_count: paidCount,
          remaining_count: remainingCount,
          charge_at: providerSubscription
            ? unixTimestamp(providerSubscription.charge_at)
            : localSubscription.charge_at,
          current_start: currentStart,
          current_end: currentEnd,
          ended_at: providerSubscription
            ? unixTimestamp(providerSubscription.ended_at)
            : localSubscription.ended_at,
          cancel_at_cycle_end: providerSubscription
            ? providerSubscription.has_scheduled_changes === true
            : localSubscription.cancel_at_cycle_end,
          provider_data: providerSubscription
            ? {
                provider_status: providerSubscription.status || null,
                provider_plan_id: providerSubscription.plan_id || null,
                has_scheduled_changes: providerSubscription.has_scheduled_changes === true,
                change_scheduled_at: providerSubscription.change_scheduled_at || null,
              }
            : localSubscription.provider_data,
          last_event_at: new Date().toISOString(),
        })
        .eq('id', localSubscription.id);
      if (subscriptionUpdateError) throw subscriptionUpdateError;

      await db
        .from('razorpay_webhook_events')
        .update({ processing_status: 'PROCESSED', subscription_id: localSubscription.id, invoice_id: invoiceId, processed_at: new Date().toISOString() })
        .eq('event_id', eventId);

      return jsonResponse({ ok: true });
    }

    const paymentLinkId = asString(paymentLink?.id || payment?.payment_link_id);
    const invoiceIdFromNotes = asString(paymentLink?.notes?.invoice_id || payment?.notes?.invoice_id);
    let invoice: InvoiceRow | null = null;

    if (paymentLinkId) {
      const { data, error } = await db
        .from('invoices')
        .select('id, total_cents, currency, status, payment_link_status')
        .eq('payment_link_id', paymentLinkId)
        .maybeSingle();
      if (error) throw error;
      invoice = data as InvoiceRow | null;
    }

    if (!invoice && invoiceIdFromNotes) {
      const { data, error } = await db
        .from('invoices')
        .select('id, total_cents, currency, status, payment_link_status')
        .eq('id', invoiceIdFromNotes)
        .maybeSingle();
      if (error) throw error;
      invoice = data as InvoiceRow | null;
    }

    if (!invoice) {
      await db.from('razorpay_webhook_events').update({ processing_status: 'IGNORED', processed_at: new Date().toISOString() }).eq('event_id', eventId);
      return jsonResponse({ ok: true, ignored: true });
    }

    const paidEvent = eventType === 'payment_link.paid' || eventType === 'payment.captured';
    const expiredEvent = eventType === 'payment_link.expired';
    const cancelledEvent = eventType === 'payment_link.cancelled';
    const paymentFailedEvent = eventType === 'payment.failed';

    if (paidEvent) {
      const amountPaid = Number(payment?.amount || paymentLink?.amount_paid || paymentLink?.amount || 0);
      const currency = asString(payment?.currency || paymentLink?.currency).toUpperCase();
      if (amountPaid < invoice.total_cents || currency !== invoice.currency.toUpperCase()) {
        throw new Error('Captured payment amount or currency does not match the invoice.');
      }

      const paymentId = asString(payment?.id);
      const paidAt = unixTimestamp(payment?.created_at || paymentLink?.paid_at) || new Date().toISOString();
      if (paymentId) {
        const { error: paymentError } = await db
          .from('invoice_payments')
          .upsert({
            invoice_id: invoice.id,
            provider: 'RAZORPAY',
            provider_payment_id: paymentId,
            provider_payment_link_id: paymentLinkId || null,
            status: 'CAPTURED',
            amount_cents: amountPaid,
            currency,
            method: asString(payment?.method) || null,
            paid_at: paidAt,
            provider_created_at: unixTimestamp(payment?.created_at),
            metadata: { event_id: eventId, event_type: eventType },
          }, { onConflict: 'provider_payment_id' });
        if (paymentError) throw paymentError;
      }

      const { error: invoiceUpdateError } = await db
        .from('invoices')
        .update({
          status: 'PAID',
          payment_provider: 'RAZORPAY',
          payment_link_status: 'PAID',
          amount_paid_cents: amountPaid,
          paid_at: paidAt,
          provider_payment_id: paymentId || null,
          payment_method: asString(payment?.method) || null,
        })
        .eq('id', invoice.id);
      if (invoiceUpdateError) throw invoiceUpdateError;
    } else if (expiredEvent && invoice.status !== 'PAID') {
      const { error } = await db.from('invoices').update({ payment_link_status: 'EXPIRED' }).eq('id', invoice.id);
      if (error) throw error;
    } else if (cancelledEvent && invoice.status !== 'PAID') {
      const { error } = await db.from('invoices').update({ payment_link_status: 'CANCELLED' }).eq('id', invoice.id);
      if (error) throw error;
    } else if (paymentFailedEvent && payment?.id && Number(payment.amount) > 0) {
      const { error } = await db
        .from('invoice_payments')
        .upsert({
          invoice_id: invoice.id,
          provider: 'RAZORPAY',
          provider_payment_id: asString(payment.id),
          provider_payment_link_id: paymentLinkId || null,
          status: 'FAILED',
          amount_cents: Number(payment.amount),
          currency: asString(payment.currency || invoice.currency).toUpperCase(),
          method: asString(payment.method) || null,
          provider_created_at: unixTimestamp(payment.created_at),
          metadata: { event_id: eventId, event_type: eventType },
        }, { onConflict: 'provider_payment_id' });
      if (error) throw error;
    }

    await db
      .from('razorpay_webhook_events')
      .update({
        processing_status: paidEvent || expiredEvent || cancelledEvent || paymentFailedEvent ? 'PROCESSED' : 'IGNORED',
        invoice_id: invoice.id,
        processed_at: new Date().toISOString(),
      })
      .eq('event_id', eventId);

    return jsonResponse({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error || 'Processing failed.');
    console.error('Razorpay webhook processing failed:', message);
    await db
      .from('razorpay_webhook_events')
      .update({ processing_status: 'FAILED', error_message: message.replace(/\s+/g, ' ').slice(0, 500), processed_at: new Date().toISOString() })
      .eq('event_id', eventId);
    return jsonResponse({ error: 'Webhook processing failed.' }, 500);
  }
});
