import React, { useEffect, useMemo, useState } from 'react';
import { Download, FileText, RefreshCw, Send, X } from 'lucide-react';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { AdminEmptyState } from '../AdminEmptyState';
import { AdminErrorState } from '../AdminErrorState';
import { AdminSkeletonTable } from '../AdminSkeleton';
import { Client } from '../../../types/clients';
import { clientService } from '../../../services/clientService';
import {
  createInvoice,
  downloadInvoiceTemplate,
  Invoice,
  InvoiceStatus,
  listInvoices,
  updateInvoiceStatus,
} from '../../../services/invoiceService';

interface InvoicesPageProps {
  onNavigate?: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const InvoicesPage: React.FC<InvoicesPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [serviceSummary, setServiceSummary] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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
    setAmount('');
    setDueDate('');
    setNotes('');
  };

  const handleCreateInvoice = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedClient) {
      onTriggerToast('error', 'Invoice Not Created', 'Select a client before creating an invoice.');
      return;
    }

    setIsSaving(true);
    try {
      const created = await createInvoice({
        client: selectedClient,
        serviceSummary,
        amountCents: Math.round(Number(amount) * 100),
        dueDate,
        notes,
      });
      await loadData();
      resetForm();
      setModalOpen(false);
      onTriggerToast('success', 'Invoice Created', `Draft invoice ${created.invoice_number} is ready to download.`);
    } catch (err: any) {
      console.error('Invoice creation failed:', err);
      onTriggerToast('error', 'Invoice Not Created', err?.message || 'Could not create invoice.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async (invoice: Invoice) => {
    try {
      await downloadInvoiceTemplate(invoice);
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
      onTriggerToast('success', 'Invoice Updated', `${updated.invoice_number} marked ${status}.`);
    } catch (err: any) {
      console.error('Invoice status update failed:', err);
      onTriggerToast('error', 'Invoice Not Updated', err?.message || 'Could not update invoice status.');
    }
  };

  const formatMoney = (cents: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format((cents || 0) / 100);

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
        onPrimaryAction={() => setModalOpen(true)}
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
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Invoice</th>
                  <th className="p-3.5">Client</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Issued</th>
                  <th className="p-3.5">Due</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 text-[#0099FF] font-medium">{invoice.invoice_number}</td>
                    <td className="p-3.5">
                      <div className="text-white font-medium">{invoice.client_name}</div>
                      <div className="text-[11px] text-white/40">{invoice.client_email || 'No email stored'}</div>
                    </td>
                    <td className="p-3.5 text-white font-semibold">
                      {formatMoney(invoice.total_cents, invoice.currency)}
                    </td>
                    <td className="p-3.5 text-white/50">{invoice.issue_date}</td>
                    <td className="p-3.5 text-white/50">{invoice.due_date}</td>
                    <td className="p-3.5">
                      <AdminStatusBadge status={invoice.status} />
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => void handleDownload(invoice)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px]"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                        {invoice.status === 'DRAFT' && (
                          <button
                            onClick={() => void handleStatusUpdate(invoice.id, 'SENT')}
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px]"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Mark Sent</span>
                          </button>
                        )}
                        {invoice.status !== 'PAID' && invoice.status !== 'VOID' && (
                          <button
                            onClick={() => void handleStatusUpdate(invoice.id, 'PAID')}
                            className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-[2px] border border-emerald-500/20 inline-flex items-center gap-1 text-[11px]"
                          >
                            Paid
                          </button>
                        )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] w-full max-w-xl p-6 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0099FF]" />
                <h3 className="font-bold text-sm uppercase">Create Invoice Template</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
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

              <div className="grid grid-cols-2 gap-3">
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

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 disabled:opacity-50 text-white font-bold rounded-[2px] inline-flex items-center gap-2"
                >
                  {isSaving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
