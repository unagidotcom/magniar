import React, { useEffect, useMemo, useState } from 'react';
import { Copy, CreditCard, Download, Edit, FileText, RefreshCw, Send, Trash2, X } from 'lucide-react';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { AdminEmptyState } from '../AdminEmptyState';
import { AdminErrorState } from '../AdminErrorState';
import { AdminSkeletonTable } from '../AdminSkeleton';
import { Client } from '../../../types/clients';
import { clientService } from '../../../services/clientService';
import {
  BusinessSettings,
  defaultBusinessSettings,
  getBusinessSettings,
} from '../../../services/businessSettingsService';
import {
  cancelRazorpayPaymentLink,
  createInvoice,
  createRazorpayPaymentLink,
  deleteInvoice,
  downloadInvoiceTemplate,
  Invoice,
  InvoiceStatus,
  listInvoices,
  sendRazorpayPaymentLinkEmail,
  updateInvoice,
  updateInvoiceStatus,
} from '../../../services/invoiceService';

interface InvoicesPageProps {
  onNavigate?: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
  onLedgerChange?: () => void;
}

export const InvoicesPage: React.FC<InvoicesPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
  onLedgerChange,
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(defaultBusinessSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [serviceSummary, setServiceSummary] = useState('');
  const [servicePeriod, setServicePeriod] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatus>('DRAFT');
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [paymentActionInvoiceId, setPaymentActionInvoiceId] = useState<string | null>(null);

  const selectedClient = useMemo(
    () => clients.find((client) => client.id === clientId),
    [clients, clientId]
  );

  const loadData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const [invoiceRows, clientRows] = await Promise.all([
        listInvoices(),
        clientService.getClients(),
      ]);
      getBusinessSettings()
        .then(setBusinessSettings)
        .catch((err) => {
          console.error('Invoice business settings load failed:', err);
          setBusinessSettings(defaultBusinessSettings);
        });
      setInvoices(invoiceRows);
      setClients(clientRows);
      if (!clientId && clientRows[0]) {
        setClientId(clientRows[0].id);
      }
    } catch (err: any) {
      console.error('Invoice ledger load failed:', err);
      setLoadError(err?.message || 'Failed to load invoices.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const resetForm = () => {
    setServiceSummary('');
    setServicePeriod('');
    setAmount('');
    setCurrency(businessSettings.default_currency || 'USD');
    setDueDate('');
    setNotes('');
    setInvoiceStatus('DRAFT');
    setEditingInvoice(null);
  };

  const openNewInvoiceModal = () => {
    resetForm();
    if (!clientId && clients[0]) {
      setClientId(clients[0].id);
    }
    setModalOpen(true);
  };

  const openEditInvoiceModal = (invoice: Invoice) => {
    if (invoice.payment_link_status === 'CREATED') {
      onTriggerToast(
        'info',
        'Active Payment Link',
        'Cancel the Razorpay Payment Link before changing this invoice.'
      );
      return;
    }
    setEditingInvoice(invoice);
    setClientId(invoice.client_id || clients.find((client) => client.business_name === invoice.client_name)?.id || '');
    setServiceSummary(invoice.service_summary);
    setServicePeriod(invoice.line_items[0]?.service_period || '');
    setAmount(String((invoice.subtotal_cents || 0) / 100));
    setCurrency(invoice.currency || businessSettings.default_currency || 'USD');
    setDueDate(invoice.due_date);
    setNotes(invoice.notes || '');
    setInvoiceStatus(invoice.status);
    setModalOpen(true);
  };

  const handleSaveInvoice = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedClient && !editingInvoice) {
      onTriggerToast('error', 'Invoice Not Created', 'Select a client before creating an invoice.');
      return;
    }

    setIsSaving(true);
    try {
      const amountCents = Math.round(Number(amount) * 100);
      const saved = editingInvoice
        ? await updateInvoice(editingInvoice.id, {
            client: selectedClient,
            serviceSummary,
            amountCents,
            dueDate,
            notes,
            status: invoiceStatus,
            currency,
            servicePeriod,
          })
        : await createInvoice({
            client: selectedClient as Client,
            serviceSummary,
            amountCents,
            dueDate,
            notes,
            currency,
            servicePeriod,
          });
      await loadData();
      onLedgerChange?.();
      resetForm();
      setModalOpen(false);
      onTriggerToast(
        'success',
        editingInvoice ? 'Invoice Updated' : 'Invoice Created',
        `${saved.invoice_number} is ready.`
      );
    } catch (err: any) {
      console.error('Invoice save failed:', err);
      onTriggerToast('error', 'Invoice Not Saved', err?.message || 'Could not save invoice.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async (invoice: Invoice) => {
    try {
      await downloadInvoiceTemplate(invoice, businessSettings);
      await loadData();
      onTriggerToast('success', 'Invoice Downloaded', `${invoice.invoice_number} downloaded as an HTML template.`);
    } catch (err: any) {
      console.error('Invoice download failed:', err);
      onTriggerToast('error', 'Download Failed', err?.message || 'Could not download invoice template.');
    }
  };

  const handleStatusUpdate = async (invoiceId: string, status: InvoiceStatus) => {
    try {
      const updated = await updateInvoiceStatus(invoiceId, status);
      await loadData();
      onLedgerChange?.();
      onTriggerToast('success', 'Invoice Updated', `${updated.invoice_number} marked ${status}.`);
    } catch (err: any) {
      console.error('Invoice status update failed:', err);
      onTriggerToast('error', 'Invoice Not Updated', err?.message || 'Could not update invoice status.');
    }
  };

  const handleCreatePaymentLink = async (invoice: Invoice) => {
    setPaymentActionInvoiceId(invoice.id);
    try {
      const updated = await createRazorpayPaymentLink(invoice.id);
      await loadData();
      onTriggerToast(
        'success',
        'Payment Link Created',
        updated.payment_link_url || `${updated.invoice_number} is ready for payment.`
      );
    } catch (err: any) {
      console.error('Razorpay Payment Link creation failed:', err);
      onTriggerToast('error', 'Payment Link Not Created', err?.message || 'Could not create the payment link.');
    } finally {
      setPaymentActionInvoiceId(null);
    }
  };

  const handleEmailPaymentLink = async (invoice: Invoice) => {
    const confirmed = window.confirm(`Email the payment link for ${invoice.invoice_number} to ${invoice.client_email}?`);
    if (!confirmed) return;

    setPaymentActionInvoiceId(invoice.id);
    try {
      await sendRazorpayPaymentLinkEmail(invoice.id);
      onTriggerToast('success', 'Payment Link Emailed', `Razorpay sent the link to ${invoice.client_email}.`);
    } catch (err: any) {
      console.error('Razorpay Payment Link email failed:', err);
      onTriggerToast('error', 'Payment Link Not Emailed', err?.message || 'Could not email the payment link.');
    } finally {
      setPaymentActionInvoiceId(null);
    }
  };

  const handleCopyPaymentLink = async (invoice: Invoice) => {
    if (!invoice.payment_link_url) return;
    try {
      await navigator.clipboard.writeText(invoice.payment_link_url);
      onTriggerToast('success', 'Payment Link Copied', invoice.payment_link_url);
    } catch (err) {
      console.error('Payment Link copy failed:', err);
      onTriggerToast('error', 'Copy Failed', 'Copy the payment link from the downloaded invoice instead.');
    }
  };

  const handleCancelPaymentLink = async (invoice: Invoice) => {
    const confirmed = window.confirm(`Cancel the Razorpay Payment Link for ${invoice.invoice_number}?`);
    if (!confirmed) return;

    setPaymentActionInvoiceId(invoice.id);
    try {
      await cancelRazorpayPaymentLink(invoice.id);
      await loadData();
      onTriggerToast('success', 'Payment Link Cancelled', `${invoice.invoice_number} can no longer be paid using that link.`);
    } catch (err: any) {
      console.error('Razorpay Payment Link cancellation failed:', err);
      onTriggerToast('error', 'Payment Link Not Cancelled', err?.message || 'Could not cancel the payment link.');
    } finally {
      setPaymentActionInvoiceId(null);
    }
  };

  const handleDeleteInvoice = async (invoice: Invoice) => {
    const confirmed = window.confirm(`Delete invoice ${invoice.invoice_number}? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteInvoice(invoice.id);
      setInvoices((current) => current.filter((row) => row.id !== invoice.id));
      await loadData();
      onLedgerChange?.();
      onTriggerToast('success', 'Invoice Deleted', `${invoice.invoice_number} was removed.`);
    } catch (err: any) {
      console.error('Invoice deletion failed:', err);
      onTriggerToast('error', 'Invoice Not Deleted', err?.message || 'Could not delete invoice.');
    }
  };

  const formatMoney = (cents: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format((cents || 0) / 100);

  const displayStatus = (status: InvoiceStatus) => (status === 'SENT' ? 'UNPAID' : status);

  if (simulatedState === 'skeleton' || (isLoading && !invoices.length)) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Invoices & Billing"
          subtitle="Create invoice templates, track status, and download client-ready billing files."
          moduleCode="FIN-05 / INVOICES"
        />
        <AdminSkeletonTable />
      </div>
    );
  }

  if (simulatedState === 'error' || loadError) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Invoices & Billing"
          subtitle="Create invoice templates, track status, and download client-ready billing files."
          moduleCode="FIN-05 / INVOICES"
        />
        <AdminErrorState
          title="Failed to load invoices"
          message={loadError || 'Invoice ledger failed to load.'}
          onRetry={() => void loadData()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-mono text-xs">
      <AdminPageHeader
        title="Invoices & Billing"
        subtitle="Create invoice templates, track status, and download client-ready billing files."
        moduleCode="FIN-05 / INVOICES"
        primaryActionLabel="+ New Invoice"
        onPrimaryAction={openNewInvoiceModal}
        onRefresh={() => void loadData()}
      />

      {clients.length === 0 ? (
        <AdminEmptyState
          title="No Clients Available"
          description="Create a client record before generating invoices."
          actionLabel="Open Clients Directory"
          onAction={() => onNavigate?.('clients')}
        />
      ) : invoices.length === 0 ? (
        <AdminEmptyState
          title="No Invoices Created"
          description="The invoice ledger is empty."
          actionLabel="+ Create First Invoice"
          onAction={openNewInvoiceModal}
        />
      ) : (
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left font-mono text-xs">
              <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Invoice</th>
                  <th className="p-3.5">Client</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Issued</th>
                  <th className="p-3.5">Due</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 text-[#0099FF] font-medium whitespace-nowrap">{invoice.invoice_number}</td>
                    <td className="p-3.5 max-w-[220px]">
                      <div className="text-white font-medium truncate">{invoice.client_name}</div>
                      <div className="text-[11px] text-white/40 truncate">{invoice.client_email || 'No email stored'}</div>
                    </td>
                    <td className="p-3.5 text-white font-semibold whitespace-nowrap">
                      {formatMoney(invoice.total_cents, invoice.currency)}
                    </td>
                    <td className="p-3.5 text-white/50 whitespace-nowrap">{invoice.issue_date}</td>
                    <td className="p-3.5 text-white/50 whitespace-nowrap">{invoice.due_date}</td>
                    <td className="p-3.5 min-w-[180px]">
                      {invoice.payment_link_status === 'CREATED' && invoice.payment_link_url ? (
                        <div className="space-y-2">
                          <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                            Secure link active
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => void handleCopyPaymentLink(invoice)}
                              className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px] whitespace-nowrap"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              Copy
                            </button>
                            {invoice.client_email && (
                              <button
                                type="button"
                                disabled={paymentActionInvoiceId === invoice.id}
                                onClick={() => void handleEmailPaymentLink(invoice)}
                                className="p-1.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 disabled:opacity-50 text-[#0099FF] rounded-[2px] border border-[#0099FF]/20 inline-flex items-center gap-1 text-[11px] whitespace-nowrap"
                              >
                                <Send className="w-3.5 h-3.5" />
                                Email
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={paymentActionInvoiceId === invoice.id}
                              onClick={() => void handleCancelPaymentLink(invoice)}
                              className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-50 text-rose-300 rounded-[2px] border border-rose-500/20 text-[11px] whitespace-nowrap"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : invoice.payment_link_status === 'PAID' ? (
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                          Razorpay paid
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={
                            paymentActionInvoiceId === invoice.id ||
                            invoice.status === 'PAID' ||
                            invoice.status === 'VOID' ||
                            invoice.status === 'ARCHIVED'
                          }
                          onClick={() => void handleCreatePaymentLink(invoice)}
                          className="p-1.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 disabled:opacity-40 text-[#0099FF] rounded-[2px] border border-[#0099FF]/20 inline-flex items-center gap-1 text-[11px] whitespace-nowrap"
                        >
                          {paymentActionInvoiceId === invoice.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <CreditCard className="w-3.5 h-3.5" />
                          )}
                          Create Link
                        </button>
                      )}
                    </td>
                    <td className="p-3.5">
                      <AdminStatusBadge status={displayStatus(invoice.status)} />
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditInvoiceModal(invoice)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px] whitespace-nowrap"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => void handleDownload(invoice)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px] whitespace-nowrap"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                        {invoice.status === 'DRAFT' && (
                          <button
                            onClick={() => void handleStatusUpdate(invoice.id, 'SENT')}
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px] whitespace-nowrap"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Mark Unpaid</span>
                          </button>
                        )}
                        {invoice.status !== 'PAID' && invoice.status !== 'VOID' && invoice.status !== 'ARCHIVED' && (
                          <button
                            onClick={() => void handleStatusUpdate(invoice.id, 'PAID')}
                            className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-[2px] border border-emerald-500/20 inline-flex items-center gap-1 text-[11px] whitespace-nowrap"
                          >
                            Paid
                          </button>
                        )}
                        {invoice.status === 'PAID' && (
                          <button
                            onClick={() => void handleStatusUpdate(invoice.id, 'SENT')}
                            className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-[2px] border border-amber-500/20 inline-flex items-center gap-1 text-[11px] whitespace-nowrap"
                          >
                            Unpaid
                          </button>
                        )}
                        <button
                          onClick={() => void handleDeleteInvoice(invoice)}
                          className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-[2px] border border-rose-500/20 inline-flex items-center gap-1 text-[11px]"
                          title={`Delete ${invoice.invoice_number}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] w-full max-w-xl max-h-[calc(100vh-2rem)] overflow-y-auto p-5 sm:p-6 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0099FF]" />
                <h3 className="font-bold text-sm uppercase">
                  {editingInvoice ? 'Edit Invoice Template' : 'Create Invoice Template'}
                </h3>
              </div>
              <button onClick={() => { setModalOpen(false); resetForm(); }} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="space-y-4">
              {editingInvoice && (
                <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between gap-3">
                  <span className="text-white/40 uppercase">Invoice Number</span>
                  <span className="text-[#0099FF] font-bold">{editingInvoice.invoice_number}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Client</label>
                <select
                  value={clientId}
                  onChange={(event) => setClientId(event.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                  required
                >
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.business_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Service Summary</label>
                <input
                  type="text"
                  value={serviceSummary}
                  onChange={(event) => setServiceSummary(event.target.value)}
                  placeholder="Monthly growth services retainer"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Service Period</label>
                <input
                  type="text"
                  value={servicePeriod}
                  onChange={(event) => setServicePeriod(event.target.value)}
                  placeholder="July 2026 or 1-31 July 2026"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-white/40 uppercase mb-1">Amount</label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="5000"
                    className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-white/40 uppercase mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                    required
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-white/40 uppercase mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                    required
                  />
                </div>
              </div>

              {editingInvoice && (
                <div>
                  <label className="block text-[10px] text-white/40 uppercase mb-1">Status</label>
                  <select
                    value={invoiceStatus}
                    onChange={(event) => setInvoiceStatus(event.target.value as InvoiceStatus)}
                    className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="SENT">SENT</option>
                    <option value="UNPAID">UNPAID</option>
                    <option value="PAID">PAID</option>
                    <option value="OVERDUE">OVERDUE</option>
                    <option value="VOID">VOID</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Payment instructions or client-specific notes."
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); resetForm(); }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 disabled:opacity-50 text-white font-bold rounded-[2px] inline-flex items-center justify-center gap-2"
                >
                  {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  {editingInvoice ? 'Save Invoice' : 'Create Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
