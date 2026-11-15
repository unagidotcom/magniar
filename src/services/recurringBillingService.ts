import { isSupabaseConfigured, supabase } from '../lib/supabase';

export type RecurringSubscriptionStatus =
  | 'CREATED'
  | 'AUTHENTICATED'
  | 'ACTIVE'
  | 'PENDING'
  | 'PAUSED'
  | 'HALTED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'EXPIRED';

export type BillingPeriod = 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

export interface RecurringSubscription {
  id: string;
  client_id: string;
  provider: 'RAZORPAY';
  razorpay_plan_id: string;
  razorpay_subscription_id: string;
  plan_name: string;
  service_summary: string;
  amount_cents: number;
  currency: string;
  billing_period: BillingPeriod;
  interval_count: number;
  quantity: number;
  total_count: number;
  paid_count: number;
  remaining_count: number;
  status: RecurringSubscriptionStatus;
  authorization_url?: string | null;
  customer_name: string;
  customer_email?: string | null;
  customer_phone?: string | null;
  customer_notified: boolean;
  start_at?: string | null;
  charge_at?: string | null;
  current_start?: string | null;
  current_end?: string | null;
  ended_at?: string | null;
  cancel_at_cycle_end: boolean;
  internal_notes?: string | null;
  last_event_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateRecurringSubscriptionInput {
  clientId: string;
  planName: string;
  serviceSummary: string;
  amountCents: number;
  currency: string;
  billingPeriod: BillingPeriod;
  intervalCount: number;
  totalCount: number;
  startDate?: string;
  notifyCustomer: boolean;
  internalNotes?: string;
}

type SubscriptionFunctionResponse = {
  subscription?: RecurringSubscription;
  error?: string;
};

const requireSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

const functionErrorMessage = async (error: any, fallback: string) => {
  try {
    const payload = await error?.context?.json?.();
    return payload?.error || error?.message || fallback;
  } catch {
    return error?.message || fallback;
  }
};

const invokeSubscriptionFunction = async (
  body: Record<string, unknown>,
  fallback: string
): Promise<RecurringSubscription> => {
  const db = requireSupabase();
  const { data, error } = await db.functions.invoke<SubscriptionFunctionResponse>('razorpay-subscriptions', {
    body,
  });
  if (error) throw new Error(await functionErrorMessage(error, fallback));
  if (!data?.subscription) throw new Error(data?.error || fallback);
  return data.subscription;
};

export async function listRecurringSubscriptions(): Promise<RecurringSubscription[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('recurring_subscriptions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []) as RecurringSubscription[];
}

export async function createRecurringSubscription(
  input: CreateRecurringSubscriptionInput
): Promise<RecurringSubscription> {
  return invokeSubscriptionFunction(
    {
      action: 'create',
      client_id: input.clientId,
      plan_name: input.planName,
      service_summary: input.serviceSummary,
      amount_cents: input.amountCents,
      currency: input.currency,
      billing_period: input.billingPeriod,
      interval_count: input.intervalCount,
      total_count: input.totalCount,
      start_date: input.startDate || null,
      notify_customer: input.notifyCustomer,
      internal_notes: input.internalNotes || null,
    },
    'Could not create the recurring subscription.'
  );
}

export async function refreshRecurringSubscription(id: string): Promise<RecurringSubscription> {
  return invokeSubscriptionFunction(
    { action: 'refresh', subscription_id: id },
    'Could not refresh the subscription.'
  );
}

export async function pauseRecurringSubscription(
  id: string,
  pauseAt: 'now' | 'cycle_end' = 'now'
): Promise<RecurringSubscription> {
  return invokeSubscriptionFunction(
    { action: 'pause', subscription_id: id, pause_at: pauseAt },
    'Could not pause the subscription.'
  );
}

export async function resumeRecurringSubscription(id: string): Promise<RecurringSubscription> {
  return invokeSubscriptionFunction(
    { action: 'resume', subscription_id: id },
    'Could not resume the subscription.'
  );
}

export async function cancelRecurringSubscription(
  id: string,
  atCycleEnd: boolean
): Promise<RecurringSubscription> {
  return invokeSubscriptionFunction(
    { action: 'cancel', subscription_id: id, cancel_at_cycle_end: atCycleEnd },
    'Could not cancel the subscription.'
  );
}
