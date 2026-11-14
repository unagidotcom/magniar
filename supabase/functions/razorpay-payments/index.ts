import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type AdminRequest = {
  action?: unknown;
  invoice_id?: unknown;
};

type InvoiceRow = {
  id: string;
  invoice_number: string;
  client_id: string | null;
  client_name: string;
  client_email: string | null;
  status: string;
  due_date: string;
  currency: string;
  total_cents: number;
  service_summary: string;
  payment_link_id: string | null;
  payment_link_url: string | null;
  payment_link_status: string | null;
};

type RazorpayPaymentLink = {
  id: string;
  short_url: string;
  status: string;
  amount: number;
  amount_paid: number;
  currency: string;
  expire_by?: number | null;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const isAdminMetadata = (metadata: Record<string, unknown> | null | undefined) => {
  const role = String(metadata?.role || '').toLowerCase();
  const isAdmin = metadata?.is_admin === true || String(metadata?.is_admin || '').toLowerCase() === 'true';
  return isAdmin || ['admin', 'administrator', 'super_admin', 'owner'].includes(role);
};

const requiredUuid = (value: unknown, field: string) => {
  const normalized = String(value || '').trim();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalized)) {
    throw new Error(`${field} is invalid.`);
  }
  return normalized;
};

const sanitizeError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error || 'Request failed.');
  return message.replace(/\s+/g, ' ').slice(0, 500);
};

const normalizeLinkStatus = (status: string) => {
  const normalized = status.toUpperCase();
  if (normalized === 'PAID') return 'PAID';
  if (normalized === 'EXPIRED') return 'EXPIRED';
  if (normalized === 'CANCELLED') return 'CANCELLED';
  return 'CREATED';
};

const buildExpiry = (dueDate: string) => {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const minimum = nowSeconds + 20 * 60;
  const maximum = nowSeconds + 180 * 24 * 60 * 60;
  const dueDateSeconds = Math.floor(new Date(`${dueDate}T23:59:59Z`).getTime() / 1000);
  const preferred = Number.isFinite(dueDateSeconds) && dueDateSeconds > minimum
    ? dueDateSeconds
    : nowSeconds + 7 * 24 * 60 * 60;
  return Math.min(Math.max(preferred, minimum), maximum);
};

const razorpayRequest = async <T>(
  path: string,
  options: RequestInit,
  keyId: string,
  keySecret: string
): Promise<T> => {
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...options,
    headers: {
      Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const providerMessage = payload?.error?.description || payload?.error?.reason;
    throw new Error(providerMessage || `Razorpay returned HTTP ${response.status}.`);
  }
  return payload as T;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
  const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'Database integration is not configured.' }, 500);
  }
  if (!razorpayKeyId || !razorpayKeySecret) {
    return jsonResponse({ error: 'Razorpay API credentials have not been configured.' }, 503);
  }

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const bearerToken = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!bearerToken) return jsonResponse({ error: 'Authentication required.' }, 401);

  const { data: authData, error: authError } = await db.auth.getUser(bearerToken);
  if (authError || !authData.user || !isAdminMetadata(authData.user.app_metadata)) {
    return jsonResponse({ error: 'Admin privileges required.' }, 403);
  }

  let body: AdminRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, 400);
  }

  try {
    const action = String(body.action || '').trim().toLowerCase();
    const invoiceId = requiredUuid(body.invoice_id, 'invoice_id');

    const { data, error } = await db
      .from('invoices')
      .select(`
        id,
        invoice_number,
        client_id,
        client_name,
        client_email,
        status,
        due_date,
        currency,
        total_cents,
        service_summary,
        payment_link_id,
        payment_link_url,
        payment_link_status
      `)
      .eq('id', invoiceId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return jsonResponse({ error: 'Invoice not found.' }, 404);
    const invoice = data as InvoiceRow;

    if (action === 'create_link') {
      if (invoice.status === 'PAID' || invoice.payment_link_status === 'PAID') {
        return jsonResponse({ error: 'This invoice is already paid.' }, 409);
      }
      if (['VOID', 'ARCHIVED'].includes(invoice.status)) {
        return jsonResponse({ error: 'Payment links cannot be created for void or archived invoices.' }, 409);
      }
      if (!Number.isInteger(invoice.total_cents) || invoice.total_cents <= 0) {
        return jsonResponse({ error: 'Invoice amount must be greater than zero.' }, 400);
      }
      if (invoice.payment_link_id && invoice.payment_link_url && invoice.payment_link_status === 'CREATED') {
        return jsonResponse({
          payment_link: {
            id: invoice.payment_link_id,
            short_url: invoice.payment_link_url,
            status: invoice.payment_link_status,
          },
          reused: true,
        });
      }

      const suffix = invoice.payment_link_id ? `-${Date.now().toString(36)}` : '';
      const referenceId = `${invoice.invoice_number}${suffix}`.slice(0, 40);
      const payload = {
        amount: invoice.total_cents,
        currency: invoice.currency.toUpperCase(),
        accept_partial: false,
        expire_by: buildExpiry(invoice.due_date),
        reference_id: referenceId,
        description: `${invoice.invoice_number}: ${invoice.service_summary}`.slice(0, 2048),
        customer: {
          name: invoice.client_name,
          ...(invoice.client_email ? { email: invoice.client_email } : {}),
        },
        notify: { email: false, sms: false },
        reminder_enable: false,
        notes: {
          invoice_id: invoice.id,
          invoice_number: invoice.invoice_number,
          client_id: invoice.client_id || '',
        },
      };

      const paymentLink = await razorpayRequest<RazorpayPaymentLink>(
        '/payment_links',
        { method: 'POST', body: JSON.stringify(payload) },
        razorpayKeyId,
        razorpayKeySecret
      );

      const linkStatus = normalizeLinkStatus(paymentLink.status);
      const { error: updateError } = await db
        .from('invoices')
        .update({
          payment_provider: 'RAZORPAY',
          payment_link_id: paymentLink.id,
          payment_link_url: paymentLink.short_url,
          payment_link_status: linkStatus,
          payment_link_expires_at: paymentLink.expire_by
            ? new Date(paymentLink.expire_by * 1000).toISOString()
            : null,
          amount_paid_cents: paymentLink.amount_paid || 0,
        })
        .eq('id', invoice.id);

      if (updateError) throw updateError;
      return jsonResponse({ payment_link: paymentLink, reused: false });
    }

    if (action === 'cancel_link') {
      if (!invoice.payment_link_id) {
        return jsonResponse({ error: 'This invoice does not have a Razorpay Payment Link.' }, 409);
      }
      if (invoice.payment_link_status === 'PAID' || invoice.status === 'PAID') {
        return jsonResponse({ error: 'A paid Payment Link cannot be cancelled.' }, 409);
      }

      const paymentLink = await razorpayRequest<RazorpayPaymentLink>(
        `/payment_links/${encodeURIComponent(invoice.payment_link_id)}/cancel`,
        { method: 'POST' },
        razorpayKeyId,
        razorpayKeySecret
      );

      const { error: updateError } = await db
        .from('invoices')
        .update({ payment_link_status: 'CANCELLED' })
        .eq('id', invoice.id);
      if (updateError) throw updateError;

      return jsonResponse({ payment_link: paymentLink });
    }

    if (action === 'send_email') {
      if (!invoice.payment_link_id || !invoice.payment_link_url) {
        return jsonResponse({ error: 'Create a Razorpay Payment Link before sending it.' }, 409);
      }
      if (!invoice.client_email) {
        return jsonResponse({ error: 'This invoice does not have a client email address.' }, 409);
      }
      if (invoice.payment_link_status !== 'CREATED') {
        return jsonResponse({ error: 'Only an active Payment Link can be emailed.' }, 409);
      }

      const notification = await razorpayRequest<{ success: boolean }>(
        `/payment_links/${encodeURIComponent(invoice.payment_link_id)}/notify_by/email`,
        { method: 'POST' },
        razorpayKeyId,
        razorpayKeySecret
      );
      return jsonResponse({ notification });
    }

    return jsonResponse({ error: 'Unsupported action.' }, 400);
  } catch (error) {
    console.error('Razorpay payment operation failed:', error);
    return jsonResponse({ error: sanitizeError(error) }, 500);
  }
});
