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
};

type RazorpayWebhook = {
  event?: string;
  payload?: {
    payment_link?: { entity?: ProviderEntity };
    payment?: { entity?: ProviderEntity };
  };
};

type InvoiceRow = {
  id: string;
  total_cents: number;
  currency: string;
  status: string;
  payment_link_status: string | null;
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

  if (eventInsertError?.code === '23505') {
    return jsonResponse({ ok: true, duplicate: true });
  }
  if (eventInsertError) {
    console.error('Razorpay webhook event registration failed:', eventInsertError);
    return jsonResponse({ error: 'Could not register webhook event.' }, 500);
  }

  try {
    const paymentLink = body.payload?.payment_link?.entity || null;
    const payment = body.payload?.payment?.entity || null;
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
      await db
        .from('razorpay_webhook_events')
        .update({ processing_status: 'IGNORED', processed_at: new Date().toISOString() })
        .eq('event_id', eventId);
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
            metadata: {
              event_id: eventId,
              event_type: eventType,
            },
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
      const { error } = await db
        .from('invoices')
        .update({ payment_link_status: 'EXPIRED' })
        .eq('id', invoice.id);
      if (error) throw error;
    } else if (cancelledEvent && invoice.status !== 'PAID') {
      const { error } = await db
        .from('invoices')
        .update({ payment_link_status: 'CANCELLED' })
        .eq('id', invoice.id);
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
        processing_status: paidEvent || expiredEvent || cancelledEvent || paymentFailedEvent
          ? 'PROCESSED'
          : 'IGNORED',
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
      .update({
        processing_status: 'FAILED',
        error_message: message.replace(/\s+/g, ' ').slice(0, 500),
        processed_at: new Date().toISOString(),
      })
      .eq('event_id', eventId);
    return jsonResponse({ error: 'Webhook processing failed.' }, 500);
  }
});
