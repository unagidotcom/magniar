import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarClock,
  Copy,
  Loader2,
  Mail,
  Pause,
  Play,
  RefreshCw,
  Repeat2,
  ShieldCheck,
  X,
} from 'lucide-react';
import { AdminEmptyState } from '../AdminEmptyState';
import { AdminErrorState } from '../AdminErrorState';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminSkeletonTable } from '../AdminSkeleton';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { clientService } from '../../../services/clientService';
import { Client } from '../../../types/clients';
import {
  BillingPeriod,
  cancelRecurringSubscription,
  createRecurringSubscription,
  listRecurringSubscriptions,
  pauseRecurringSubscription,
  RecurringSubscription,
  refreshRecurringSubscription,
  resumeRecurringSubscription,
} from '../../../services/recurringBillingService';

interface RecurringBillingPageProps {
  onNavigate?: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
  onLedgerChange?: () => void;
}

type FormState = {
  clientId: string;
  planName: string;
  serviceSummary: string;
  amount: string;
  currency: string;
  billingPeriod: BillingPeriod;
  intervalCount: string;
  totalCount: string;
  startDate: string;
  notifyCustomer: boolean;
  internalNotes: string;
};

const futureDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

const emptyForm = (): FormState => ({
  clientId: '',
  planName: 'Monthly Retainer',
  serviceSummary: '',
  amount: '',
  currency: 'INR',
  billingPeriod: 'MONTHLY',
  intervalCount: '1',
  totalCount: '12',
  startDate: futureDate(),
  notifyCustomer: false,
  internalNotes: '',
});

const terminalStatuses = new Set(['CANCELLED', 'COMPLETED', 'EXPIRED']);
const pausableStatuses = new Set(['ACTIVE', 'AUTHENTICATED', 'PENDING']);

export const RecurringBillingPage: React.FC<RecurringBillingPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
  onLedgerChange,
}) => {
  const [subscriptions, setSubscriptions] = useState<RecurringSubscription[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [scheduleAction, setScheduleAction] = useState<{
    kind: 'pause' | 'cancel';
    subscription: RecurringSubscription;
  } | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [subscriptionRows, clientRows] = await Promise.all([
        listRecurringSubscriptions(),
        clientService.getClients(),
      ]);
      setSubscriptions(simulatedState === 'empty' ? [] : subscriptionRows);
      setClients(clientRows);
    } catch (error: any) {
      console.error('Recurring billing load failed:', error);
      setLoadError(error?.message || 'Could not load recurring billing.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [simulatedState]);

  const clientNames = useMemo(
    () => new Map(clients.map((client) => [client.id, client.business_name])),
    [clients]
  );

  const activeCount = subscriptions.filter((row) => row.status === 'ACTIVE').length;
  const attentionCount = subscriptions.filter((row) => ['CREATED', 'PENDING', 'HALTED'].includes(row.status)).length;
  const activeCurrencies = new Set<string>(
    subscriptions.filter((row) => row.status === 'ACTIVE').map((row) => row.currency)
  );
  const metricCurrency: string = activeCurrencies.size === 1 ? ([...activeCurrencies][0] || 'INR') : 'INR';
  const monthlyCommittedCents = subscriptions
    .filter((row) => row.status === 'ACTIVE')
    .filter((row) => row.currency === metricCurrency)
    .reduce((sum, row) => {
      const divisor = Math.max(row.interval_count, 1);
      if (row.billing_period === 'WEEKLY') return sum + (row.amount_cents * 52) / 12 / divisor;
      if (row.billing_period === 'QUARTERLY') return sum + row.amount_cents / 3 / divisor;
      if (row.billing_period === 'YEARLY') return sum + row.amount_cents / 12 / divisor;
      return sum + row.amount_cents / divisor;
    }, 0);

  const formatMoney = (cents: number, currency: string) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format((cents || 0) / 100);

  const formatDate = (value?: string | null) => value
    ? new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Not scheduled';

  const frequencyLabel = (row: RecurringSubscription) =>
    row.interval_count === 1
      ? row.billing_period.toLowerCase()
      : `Every ${row.interval_count} ${row.billing_period.toLowerCase()}`;

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const amountCents = Math.round(Number(form.amount) * 100);
    const intervalCount = Number(form.intervalCount);
    const totalCount = Number(form.totalCount);
    if (!form.clientId || !form.planName.trim() || !form.serviceSummary.trim()) {
      onTriggerToast('error', 'Subscription Not Created', 'Client, plan name, and service summary are required.');
      return;
    }
    if (!Number.isFinite(amountCents) || amountCents < 100) {
      onTriggerToast('error', 'Subscription Not Created', 'Enter an amount of at least 1.00.');
      return;
    }
    if (form.notifyCustomer) {
      const client = clients.find((row) => row.id === form.clientId);
      const email = client?.contacts.find((contact) => contact.is_primary)?.email || client?.contacts[0]?.email;
      const confirmed = window.confirm(
        `Create this subscription and ask Razorpay to email the authorization link${email ? ` to ${email}` : ''}?`
      );
      if (!confirmed) return;
    }

    setIsSaving(true);
    try {
      const created = await createRecurringSubscription({
        clientId: form.clientId,
        planName: form.planName.trim(),
        serviceSummary: form.serviceSummary.trim(),
        amountCents,
        currency: form.currency,
        billingPeriod: form.billingPeriod,
        intervalCount,
        totalCount,
        startDate: form.startDate,
        notifyCustomer: form.notifyCustomer,
        internalNotes: form.internalNotes.trim(),
      });
      setSubscriptions((rows) => [created, ...rows]);
      setIsCreateOpen(false);
      setForm(emptyForm());
      onTriggerToast(
        'success',
        'Subscription Created',
        created.authorization_url
          ? 'The client authorization link is ready.'
          : 'The subscription was created in Razorpay.'
      );
    } catch (error: any) {
      console.error('Recurring subscription creation failed:', error);
      onTriggerToast('error', 'Subscription Not Created', error?.message || 'Could not create the subscription.');
    } finally {
      setIsSaving(false);
    }
  };

  const replaceSubscription = (updated: RecurringSubscription) => {
    setSubscriptions((rows) => rows.map((row) => (row.id === updated.id ? updated : row)));
  };

  const runAction = async (
    subscription: RecurringSubscription,
    action: 'refresh' | 'resume'
  ) => {
    setActionId(subscription.id);
    try {
      const updated = action === 'resume'
        ? await resumeRecurringSubscription(subscription.id)
        : await refreshRecurringSubscription(subscription.id);
      replaceSubscription(updated);
      onLedgerChange?.();
      onTriggerToast('success', action === 'resume' ? 'Subscription Resumed' : 'Subscription Refreshed');
    } catch (error: any) {
      console.error(`Subscription ${action} failed:`, error);
      onTriggerToast('error', 'Subscription Not Updated', error?.message || 'Could not update the subscription.');
    } finally {
      setActionId(null);
    }
  };

  const runScheduledAction = async (atCycleEnd: boolean) => {
    if (!scheduleAction) return;
    const { kind, subscription } = scheduleAction;
    setScheduleAction(null);
    setActionId(subscription.id);
    try {
      const updated = kind === 'pause'
        ? await pauseRecurringSubscription(subscription.id, atCycleEnd ? 'cycle_end' : 'now')
        : await cancelRecurringSubscription(subscription.id, atCycleEnd);
      replaceSubscription(updated);
      onLedgerChange?.();
      onTriggerToast(
        'success',
        kind === 'pause' ? 'Subscription Pause Scheduled' : 'Subscription Cancellation Scheduled',
        atCycleEnd ? 'The current billing cycle will finish first.' : 'The change was requested immediately.'
      );
    } catch (error: any) {
      console.error(`Subscription ${kind} failed:`, error);
      onTriggerToast('error', 'Subscription Not Updated', error?.message || 'Could not update the subscription.');
    } finally {
      setActionId(null);
    }
  };

  const copyAuthorizationLink = async (subscription: RecurringSubscription) => {
    if (!subscription.authorization_url) return;
    try {
      await navigator.clipboard.writeText(subscription.authorization_url);
      onTriggerToast('success', 'Authorization Link Copied', subscription.authorization_url);
    } catch (error) {
      console.error('Subscription authorization link copy failed:', error);
      onTriggerToast('error', 'Copy Failed', 'Open the Razorpay subscription from its provider dashboard.');
    }
  };

  if (simulatedState === 'skeleton' || (isLoading && subscriptions.length === 0)) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Recurring Billing"
          subtitle="Razorpay mandates, retainer cycles, and automatic invoice records."
          moduleCode="FIN-06 / RECURRING"
        />
        <AdminSkeletonTable />
      </div>
    );
  }

  if (simulatedState === 'error' || loadError) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Recurring Billing"
          subtitle="Razorpay mandates, retainer cycles, and automatic invoice records."
          moduleCode="FIN-06 / RECURRING"
        />
        <AdminErrorState title="Failed to load recurring billing" message={loadError || 'Recurring billing failed to load.'} onRetry={() => void loadData()} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-mono text-xs">
      <AdminPageHeader
        title="Recurring Billing"
        subtitle="Create client mandates and control every recurring billing lifecycle from Admin OS."
        moduleCode="FIN-06 / RECURRING"
        primaryActionLabel="New Subscription"
        onPrimaryAction={() => setIsCreateOpen(true)}
        onRefresh={() => void loadData()}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="border border-white/10 bg-[#0A0A0C] p-4 rounded-[2px]">
          <div className="text-[10px] uppercase tracking-wider text-white/40">Active mandates</div>
          <div className="mt-2 text-xl font-display text-white">{activeCount}</div>
        </div>
        <div className="border border-white/10 bg-[#0A0A0C] p-4 rounded-[2px]">
          <div className="text-[10px] uppercase tracking-wider text-white/40">Needs attention</div>
          <div className="mt-2 text-xl font-display text-amber-300">{attentionCount}</div>
        </div>
        <div className="border border-white/10 bg-[#0A0A0C] p-4 rounded-[2px]">
          <div className="text-[10px] uppercase tracking-wider text-white/40">Monthly committed</div>
          <div className="mt-2 text-xl font-display text-[#0099FF]">
            {activeCurrencies.size > 1 ? 'Multiple currencies' : formatMoney(monthlyCommittedCents, metricCurrency)}
          </div>
        </div>
      </div>

      {clients.length === 0 ? (
        <AdminEmptyState
          title="No Clients Available"
          description="Create a client record before setting up recurring billing."
          actionLabel="Open Clients Directory"
          onAction={() => onNavigate?.('clients')}
        />
      ) : subscriptions.length === 0 ? (
        <AdminEmptyState
          title="No Recurring Subscriptions"
          description="Create the first client retainer mandate from Admin OS."
          actionLabel="Create Subscription"
          onAction={() => setIsCreateOpen(true)}
        />
      ) : (
        <div className="border border-white/10 bg-[#0A0A0C] rounded-[2px] overflow-hidden min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1060px] text-left">
              <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Client / Plan</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Progress</th>
                  <th className="p-3.5">Next Charge</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {subscriptions.map((subscription) => {
                  const busy = actionId === subscription.id;
                  return (
                    <tr key={subscription.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 max-w-[260px]">
                        <div className="text-white font-medium truncate">{clientNames.get(subscription.client_id) || subscription.customer_name}</div>
                        <div className="text-[11px] text-white/45 truncate">{subscription.plan_name}</div>
                        <div className="text-[10px] text-white/25 truncate">{subscription.razorpay_subscription_id}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="text-white font-semibold">{formatMoney(subscription.amount_cents, subscription.currency)}</div>
                        <div className="text-[10px] text-white/40 capitalize">{frequencyLabel(subscription)}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="text-white/80">{subscription.paid_count} / {subscription.total_count} cycles</div>
                        {subscription.cancel_at_cycle_end && <div className="text-[10px] text-amber-300 mt-1">Ends after current cycle</div>}
                      </td>
                      <td className="p-3.5 text-white/60 whitespace-nowrap">{formatDate(subscription.charge_at || subscription.start_at)}</td>
                      <td className="p-3.5"><AdminStatusBadge status={subscription.status} /></td>
                      <td className="p-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          {subscription.authorization_url && subscription.status === 'CREATED' && (
                            <button type="button" onClick={() => void copyAuthorizationLink(subscription)} className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2px]" title="Copy authorization link">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button type="button" disabled={busy} onClick={() => void runAction(subscription, 'refresh')} className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 disabled:opacity-40 border border-white/10 rounded-[2px]" title="Refresh from Razorpay">
                            <RefreshCw className={`w-3.5 h-3.5 ${busy ? 'animate-spin' : ''}`} />
                          </button>
                          {pausableStatuses.has(subscription.status) && (
                            <button type="button" disabled={busy} onClick={() => setScheduleAction({ kind: 'pause', subscription })} className="p-2 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-40 border border-amber-500/20 rounded-[2px]" title="Pause subscription">
                              <Pause className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {subscription.status === 'PAUSED' && (
                            <button type="button" disabled={busy} onClick={() => void runAction(subscription, 'resume')} className="p-2 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-40 border border-emerald-500/20 rounded-[2px]" title="Resume subscription">
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {!terminalStatuses.has(subscription.status) && (
                            <button type="button" disabled={busy} onClick={() => setScheduleAction({ kind: 'cancel', subscription })} className="p-2 text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-40 border border-rose-500/20 rounded-[2px]" title="Cancel subscription">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <form onSubmit={handleCreate} className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0A0A0C] border border-white/15 rounded-[4px] shadow-2xl">
            <div className="sticky top-0 bg-[#0A0A0C] border-b border-white/10 px-5 py-4 flex items-center justify-between z-10">
              <div>
                <div className="text-white font-display font-semibold text-base">Create Recurring Subscription</div>
                <div className="text-[10px] text-white/40 mt-1">Razorpay Test Mode mandate setup</div>
              </div>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="p-2 text-white/50 hover:text-white" title="Close"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="md:col-span-2 space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Client</span>
                <select required value={form.clientId} onChange={(event) => setForm({ ...form, clientId: event.target.value })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]">
                  <option value="">Select client</option>
                  {clients.map((client) => <option key={client.id} value={client.id}>{client.business_name}</option>)}
                </select>
              </label>

              <label className="space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Plan name</span>
                <input required maxLength={120} value={form.planName} onChange={(event) => setForm({ ...form, planName: event.target.value })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Start date</span>
                <input required type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]" />
              </label>

              <label className="md:col-span-2 space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Service summary</span>
                <input required maxLength={500} value={form.serviceSummary} onChange={(event) => setForm({ ...form, serviceSummary: event.target.value })} placeholder="Ongoing marketing and growth retainer" className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]" />
              </label>

              <label className="space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Amount per cycle</span>
                <input required type="number" min="1" step="0.01" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Currency</span>
                <select value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]">
                  <option value="INR">INR</option><option value="USD">USD</option><option value="GBP">GBP</option><option value="EUR">EUR</option>
                </select>
              </label>

              <label className="space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Billing period</span>
                <select value={form.billingPeriod} onChange={(event) => setForm({ ...form, billingPeriod: event.target.value as BillingPeriod })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]">
                  <option value="WEEKLY">Weekly</option><option value="MONTHLY">Monthly</option><option value="QUARTERLY">Quarterly</option><option value="YEARLY">Yearly</option>
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Every</span>
                <input required type="number" min="1" max="12" value={form.intervalCount} onChange={(event) => setForm({ ...form, intervalCount: event.target.value })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Total billing cycles</span>
                <input required type="number" min="1" max="520" value={form.totalCount} onChange={(event) => setForm({ ...form, totalCount: event.target.value })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] uppercase text-white/45">Internal notes</span>
                <input maxLength={2000} value={form.internalNotes} onChange={(event) => setForm({ ...form, internalNotes: event.target.value })} className="w-full bg-black border border-white/15 text-white px-3 py-2.5 rounded-[2px] outline-none focus:border-[#0099FF]" />
              </label>

              <label className="md:col-span-2 flex items-start gap-3 border border-white/10 bg-white/[0.02] p-3 rounded-[2px] cursor-pointer">
                <input type="checkbox" checked={form.notifyCustomer} onChange={(event) => setForm({ ...form, notifyCustomer: event.target.checked })} className="mt-0.5" />
                <span>
                  <span className="flex items-center gap-1.5 text-white"><Mail className="w-3.5 h-3.5 text-[#0099FF]" /> Ask Razorpay to notify the client</span>
                  <span className="block text-[10px] text-white/40 mt-1">Off by default. When enabled, confirmation is required before creation.</span>
                </span>
              </label>
            </div>

            <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[10px] text-white/40"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Client mandate authorization is required.</div>
              <button type="submit" disabled={isSaving} className="px-4 py-2.5 bg-[#0099FF] hover:bg-[#0088EE] disabled:opacity-50 text-white rounded-[2px] inline-flex items-center gap-2">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Repeat2 className="w-4 h-4" />}
                Create Subscription
              </button>
            </div>
          </form>
        </div>
      )}

      {scheduleAction && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md bg-[#0A0A0C] border border-white/15 rounded-[4px] p-5 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-white font-display font-semibold text-base capitalize">{scheduleAction.kind} Subscription</div>
                <div className="text-[11px] text-white/45 mt-1">{scheduleAction.subscription.plan_name} for {clientNames.get(scheduleAction.subscription.client_id) || scheduleAction.subscription.customer_name}</div>
              </div>
              <button onClick={() => setScheduleAction(null)} className="text-white/50 hover:text-white" title="Close"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-white/60 leading-relaxed">Choose whether this takes effect immediately or after the current paid billing cycle finishes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button onClick={() => void runScheduledAction(true)} className="px-3 py-2.5 border border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-[2px] inline-flex items-center justify-center gap-2"><CalendarClock className="w-4 h-4" /> End of cycle</button>
              <button onClick={() => void runScheduledAction(false)} className="px-3 py-2.5 border border-rose-500/25 bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 rounded-[2px] inline-flex items-center justify-center gap-2"><X className="w-4 h-4" /> Immediately</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
