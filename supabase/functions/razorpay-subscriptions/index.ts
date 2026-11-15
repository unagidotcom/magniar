import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type AdminRequest = {
  action?: unknown;
  subscription_id?: unknown;
  client_id?: unknown;
  plan_name?: unknown;
  service_summary?: unknown;
  amount_cents?: unknown;
  currency?: unknown;
  billing_period?: unknown;
  interval_count?: unknown;
  total_count?: unknown;
  start_date?: unknown;
  notify_customer?: unknown;
  internal_notes?: unknown;
  pause_at?: unknown;
  cancel_at_cycle_end?: unknown;
};

type ClientContact = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  is_primary?: unknown;
};

type ClientRow = {
  id: string;
  business_name: string;
  contacts: ClientContact[] | null;
};

type SubscriptionRow = {
  id: string;
  razorpay_subscription_id: string;
  status: string;
};

type RazorpayPlan = {
  id: string;
};

type RazorpaySubscription = {
  id: string;
  plan_id: string;
  status: string;
  short_url?: string | null;
  customer_id?: string | null;
  start_at?: number | null;
  charge_at?: number | null;
  current_start?: number | null;
  current_end?: number | null;
  ended_at?: number | null;
  paid_count?: number;
  remaining_count?: number;
  total_count?: number;
  quantity?: number;
  has_scheduled_changes?: boolean;
  change_scheduled_at?: number | null;
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

const asString = (value: unknown) => String(value || '').trim();

const requiredString = (value: unknown, field: string, maximum = 200) => {
  const normalized = asString(value);
  if (!normalized) throw new Error(`${field} is required.`);
  if (normalized.length > maximum) throw new Error(`${field} is too long.`);
  return normalized;
};

const requiredUuid = (value: unknown, field: string) => {
  const normalized = asString(value);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalized)) {
    throw new Error(`${field} is invalid.`);
  }
  return normalized;
};

const requiredInteger = (value: unknown, field: string, minimum: number, maximum: number) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new Error(`${field} must be between ${minimum} and ${maximum}.`);
  }
  return parsed;
};

const sanitizeError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error || 'Request failed.');
  return message.replace(/\s+/g, ' ').slice(0, 500);
};

const isAdminMetadata = (metadata: Record<string, unknown> | null | undefined) => {
  const role = asString(metadata?.role).toLowerCase();
  const isAdmin = metadata?.is_admin === true || asString(metadata?.is_admin).toLowerCase() === 'true';
  return isAdmin || ['admin', 'administrator', 'super_admin', 'owner'].includes(role);
};

const unixTimestamp = (value: unknown) => {
  const timestamp = Number(value);
  return Number.isFinite(timestamp) && timestamp > 0
    ? new Date(timestamp * 1000).toISOString()
    : null;
};

const normalizeStatus = (value: unknown) => {
  const status = asString(value).toUpperCase();
  if (status === 'AUTHENTICATED') return 'AUTHENTICATED';
  if (status === 'ACTIVE') return 'ACTIVE';
  if (status === 'PENDING') return 'PENDING';
  if (status === 'PAUSED') return 'PAUSED';
  if (status === 'HALTED') return 'HALTED';
  if (status === 'CANCELLED') return 'CANCELLED';
  if (status === 'COMPLETED') return 'COMPLETED';
  if (status === 'EXPIRED') return 'EXPIRED';
  return 'CREATED';
};

const providerSnapshot = (subscription: RazorpaySubscription) => ({
  provider_status: subscription.status,
  provider_plan_id: subscription.plan_id,
  provider_customer_id: subscription.customer_id || null,
  has_scheduled_changes: subscription.has_scheduled_changes === true,
  change_scheduled_at: subscription.change_scheduled_at || null,
});

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
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const providerMessage = asString(body?.error?.description || body?.error?.reason);
    throw new Error(providerMessage || `Razorpay returned HTTP ${response.status}.`);
  }
  return body as T;
};

const primaryContact = (contacts: ClientContact[] | null) => {
  const rows = Array.isArray(contacts) ? contacts : [];
  return rows.find((contact) => contact?.is_primary === true) || rows[0] || null;
};

const startTimestamp = (value: unknown) => {
  const input = asString(value);
  if (!input) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) throw new Error('Start date is invalid.');
  const timestamp = Math.floor(new Date(`${input}T12:00:00Z`).getTime() / 1000);
  if (!Number.isFinite(timestamp) || timestamp < Math.floor(Date.now() / 1000) + 10 * 60) {
    throw new Error('Start date must be in the future.');
  }
  return timestamp;
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
  const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
  if (!supabaseUrl || !serviceRoleKey || !razorpayKeyId || !razorpayKeySecret) {
    return jsonResponse({ error: 'Recurring billing is not configured.' }, 503);
  }

  const authorization = request.headers.get('Authorization') || '';
  const bearerToken = authorization.replace(/^Bearer\s+/i, '').trim();
  if (!bearerToken) return jsonResponse({ error: 'Missing authorization header.' }, 401);

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: authData, error: authError } = await db.auth.getUser(bearerToken);
  if (authError || !authData.user) return jsonResponse({ error: 'Invalid session.' }, 401);
  if (!isAdminMetadata(authData.user.app_metadata)) {
    return jsonResponse({ error: 'Administrator access is required.' }, 403);
  }

  let body: AdminRequest;
  try {
    body = await request.json() as AdminRequest;
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload.' }, 400);
  }

  try {
    const action = asString(body.action).toLowerCase();

    if (action === 'create') {
      const clientId = requiredString(body.client_id, 'Client', 120);
      const planName = requiredString(body.plan_name, 'Plan name', 120);
      const serviceSummary = requiredString(body.service_summary, 'Service summary', 500);
      const amountCents = requiredInteger(body.amount_cents, 'Amount', 100, 4294967295);
      const currency = requiredString(body.currency, 'Currency', 3).toUpperCase();
      if (!/^[A-Z]{3}$/.test(currency)) throw new Error('Currency must be a three-letter ISO code.');
      const billingPeriod = requiredString(body.billing_period, 'Billing period', 12).toUpperCase();
      if (!['WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'].includes(billingPeriod)) {
        throw new Error('Billing period is not supported.');
      }
      const intervalCount = requiredInteger(body.interval_count ?? 1, 'Interval', 1, 12);
      const totalCount = requiredInteger(body.total_count, 'Billing cycles', 1, 520);
      const startAt = startTimestamp(body.start_date);
      const notifyCustomer = body.notify_customer === true;
      const internalNotes = asString(body.internal_notes).slice(0, 2000) || null;

      const { data: clientData, error: clientError } = await db
        .from('clients')
        .select('id, business_name, contacts')
        .eq('id', clientId)
        .maybeSingle();
      if (clientError) throw clientError;
      if (!clientData) return jsonResponse({ error: 'Client was not found.' }, 404);
      const client = clientData as ClientRow;
      const contact = primaryContact(client.contacts);
      const customerEmail = asString(contact?.email) || null;
      const customerPhone = asString(contact?.phone) || null;
      const customerName = client.business_name;
      if (notifyCustomer && !customerEmail && !customerPhone) {
        throw new Error('The client needs an email address or phone number before Razorpay can notify them.');
      }

      const { data: reusablePlan } = await db
        .from('recurring_subscriptions')
        .select('razorpay_plan_id')
        .eq('plan_name', planName)
        .eq('amount_cents', amountCents)
        .eq('currency', currency)
        .eq('billing_period', billingPeriod)
        .eq('interval_count', intervalCount)
        .eq('service_summary', serviceSummary)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      let razorpayPlanId = asString(reusablePlan?.razorpay_plan_id);
      if (!razorpayPlanId) {
        const plan = await razorpayRequest<RazorpayPlan>(
          '/plans',
          {
            method: 'POST',
            body: JSON.stringify({
              period: billingPeriod.toLowerCase(),
              interval: intervalCount,
              item: {
                name: planName,
                amount: amountCents,
                currency,
                description: serviceSummary,
              },
              notes: { source: 'MAGNIAR_ADMIN_OS' },
            }),
          },
          razorpayKeyId,
          razorpayKeySecret
        );
        razorpayPlanId = plan.id;
      }

      const notes = {
        magniar_client_id: client.id,
        magniar_plan_name: planName,
      };
      const subscriptionPayload: Record<string, unknown> = {
        plan_id: razorpayPlanId,
        total_count: totalCount,
        quantity: 1,
        customer_notify: notifyCustomer ? 1 : 0,
        notes,
      };
      if (startAt) subscriptionPayload.start_at = startAt;
      if (notifyCustomer) {
        subscriptionPayload.notify_info = {
          ...(customerEmail ? { notify_email: customerEmail } : {}),
          ...(customerPhone ? { notify_phone: customerPhone } : {}),
        };
      }

      const subscription = await razorpayRequest<RazorpaySubscription>(
        '/subscriptions',
        { method: 'POST', body: JSON.stringify(subscriptionPayload) },
        razorpayKeyId,
        razorpayKeySecret
      );

      const { data: inserted, error: insertError } = await db
        .from('recurring_subscriptions')
        .insert({
          client_id: client.id,
          razorpay_plan_id: razorpayPlanId,
          razorpay_subscription_id: subscription.id,
          plan_name: planName,
          service_summary: serviceSummary,
          amount_cents: amountCents,
          currency,
          billing_period: billingPeriod,
          interval_count: intervalCount,
          total_count: totalCount,
          quantity: subscription.quantity || 1,
          paid_count: subscription.paid_count || 0,
          remaining_count: subscription.remaining_count ?? totalCount,
          status: normalizeStatus(subscription.status),
          authorization_url: subscription.short_url || null,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_notified: notifyCustomer,
          start_at: unixTimestamp(subscription.start_at || startAt),
          charge_at: unixTimestamp(subscription.charge_at),
          current_start: unixTimestamp(subscription.current_start),
          current_end: unixTimestamp(subscription.current_end),
          ended_at: unixTimestamp(subscription.ended_at),
          internal_notes: internalNotes,
          provider_data: providerSnapshot(subscription),
          created_by: authData.user.id,
        })
        .select('*')
        .single();

      if (insertError) {
        await razorpayRequest(
          `/subscriptions/${encodeURIComponent(subscription.id)}/cancel`,
          { method: 'POST', body: JSON.stringify({ cancel_at_cycle_end: 0 }) },
          razorpayKeyId,
          razorpayKeySecret
        ).catch((cleanupError) => console.error('Untracked subscription cleanup failed:', cleanupError));
        throw insertError;
      }

      return jsonResponse({ subscription: inserted });
    }

    const localSubscriptionId = requiredUuid(body.subscription_id, 'Subscription');
    const { data: rowData, error: rowError } = await db
      .from('recurring_subscriptions')
      .select('id, razorpay_subscription_id, status')
      .eq('id', localSubscriptionId)
      .maybeSingle();
    if (rowError) throw rowError;
    if (!rowData) return jsonResponse({ error: 'Subscription was not found.' }, 404);
    const row = rowData as SubscriptionRow;

    let subscription: RazorpaySubscription;
    if (action === 'pause') {
      if (!['ACTIVE', 'AUTHENTICATED', 'PENDING'].includes(row.status)) {
        return jsonResponse({ error: 'Only an active subscription can be paused.' }, 409);
      }
      const pauseAt = asString(body.pause_at).toLowerCase() === 'cycle_end' ? 'cycle_end' : 'now';
      subscription = await razorpayRequest<RazorpaySubscription>(
        `/subscriptions/${encodeURIComponent(row.razorpay_subscription_id)}/pause`,
        { method: 'POST', body: JSON.stringify({ pause_at: pauseAt }) },
        razorpayKeyId,
        razorpayKeySecret
      );
    } else if (action === 'resume') {
      if (row.status !== 'PAUSED') return jsonResponse({ error: 'Only a paused subscription can be resumed.' }, 409);
      subscription = await razorpayRequest<RazorpaySubscription>(
        `/subscriptions/${encodeURIComponent(row.razorpay_subscription_id)}/resume`,
        { method: 'POST', body: JSON.stringify({ resume_at: 'now' }) },
        razorpayKeyId,
        razorpayKeySecret
      );
    } else if (action === 'cancel') {
      if (['CANCELLED', 'COMPLETED', 'EXPIRED'].includes(row.status)) {
        return jsonResponse({ error: 'This subscription has already ended.' }, 409);
      }
      const cancelAtCycleEnd = body.cancel_at_cycle_end === true;
      subscription = await razorpayRequest<RazorpaySubscription>(
        `/subscriptions/${encodeURIComponent(row.razorpay_subscription_id)}/cancel`,
        { method: 'POST', body: JSON.stringify({ cancel_at_cycle_end: cancelAtCycleEnd ? 1 : 0 }) },
        razorpayKeyId,
        razorpayKeySecret
      );
    } else if (action === 'refresh') {
      subscription = await razorpayRequest<RazorpaySubscription>(
        `/subscriptions/${encodeURIComponent(row.razorpay_subscription_id)}`,
        { method: 'GET' },
        razorpayKeyId,
        razorpayKeySecret
      );
    } else {
      return jsonResponse({ error: 'Unsupported action.' }, 400);
    }

    const cancelAtCycleEnd = action === 'cancel' && body.cancel_at_cycle_end === true;
    const { data: updated, error: updateError } = await db
      .from('recurring_subscriptions')
      .update({
        status: normalizeStatus(subscription.status),
        authorization_url: subscription.short_url || null,
        paid_count: subscription.paid_count || 0,
        remaining_count: subscription.remaining_count || 0,
        start_at: unixTimestamp(subscription.start_at),
        charge_at: unixTimestamp(subscription.charge_at),
        current_start: unixTimestamp(subscription.current_start),
        current_end: unixTimestamp(subscription.current_end),
        ended_at: unixTimestamp(subscription.ended_at),
        cancel_at_cycle_end: cancelAtCycleEnd || subscription.has_scheduled_changes === true,
        provider_data: providerSnapshot(subscription),
      })
      .eq('id', row.id)
      .select('*')
      .single();
    if (updateError) throw updateError;

    return jsonResponse({ subscription: updated });
  } catch (error) {
    console.error('Razorpay subscription operation failed:', error);
    return jsonResponse({ error: sanitizeError(error) }, 500);
  }
});
