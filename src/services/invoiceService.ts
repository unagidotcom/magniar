import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Client } from '../types/clients';
import { BusinessSettings, defaultBusinessSettings } from './businessSettingsService';

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'UNPAID' | 'PAID' | 'OVERDUE' | 'VOID' | 'ARCHIVED';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unit_amount_cents: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_id?: string | null;
  client_name: string;
  client_email?: string | null;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  currency: string;
  subtotal_cents: number;
  tax_cents: number;
  total_cents: number;
  service_summary: string;
  line_items: InvoiceLineItem[];
  notes?: string | null;
  sent_at?: string | null;
  downloaded_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateInvoiceInput {
  client: Client;
  serviceSummary: string;
  amountCents: number;
  dueDate: string;
  notes?: string;
  currency?: string;
}

export interface UpdateInvoiceInput {
  client?: Client;
  serviceSummary: string;
  amountCents: number;
  dueDate: string;
  notes?: string;
  status: InvoiceStatus;
  currency?: string;
}

const requireSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

const primaryEmailForClient = (client: Client) =>
  client.contacts.find((contact) => contact.is_primary)?.email || client.contacts[0]?.email || null;

export async function listInvoices(): Promise<Invoice[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as Invoice[];
}

export async function createInvoice(input: CreateInvoiceInput): Promise<Invoice> {
  if (!input.serviceSummary.trim()) {
    throw new Error('Invoice service summary is required.');
  }

  if (!Number.isFinite(input.amountCents) || input.amountCents <= 0) {
    throw new Error('Invoice amount must be greater than zero.');
  }

  const lineItems: InvoiceLineItem[] = [
    {
      description: input.serviceSummary.trim(),
      quantity: 1,
      unit_amount_cents: Math.round(input.amountCents),
    },
  ];

  const db = requireSupabase();
  const { data, error } = await db
    .from('invoices')
    .insert({
      client_id: input.client.id,
      client_name: input.client.business_name,
      client_email: primaryEmailForClient(input.client),
      due_date: input.dueDate,
      currency: input.currency || 'USD',
      subtotal_cents: Math.round(input.amountCents),
      service_summary: input.serviceSummary.trim(),
      line_items: lineItems,
      notes: input.notes?.trim() || null,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as Invoice;
}

export async function updateInvoiceStatus(
  invoiceId: string,
  status: InvoiceStatus
): Promise<Invoice> {
  const db = requireSupabase();
  const patch: Record<string, unknown> = { status };

  if (status === 'SENT') {
    patch.sent_at = new Date().toISOString();
  }

  if (status === 'UNPAID' || status === 'DRAFT') {
    patch.sent_at = null;
  }

  const { data, error } = await db
    .from('invoices')
    .update(patch)
    .eq('id', invoiceId)
    .select('*')
    .single();

  if (error) throw error;
  return data as Invoice;
}

export async function updateInvoice(
  invoiceId: string,
  input: UpdateInvoiceInput
): Promise<Invoice> {
  if (!input.serviceSummary.trim()) {
    throw new Error('Invoice service summary is required.');
  }

  if (!Number.isFinite(input.amountCents) || input.amountCents <= 0) {
    throw new Error('Invoice amount must be greater than zero.');
  }

  const lineItems: InvoiceLineItem[] = [
    {
      description: input.serviceSummary.trim(),
      quantity: 1,
      unit_amount_cents: Math.round(input.amountCents),
    },
  ];

  const patch: Record<string, unknown> = {
    due_date: input.dueDate,
    currency: input.currency || 'USD',
    subtotal_cents: Math.round(input.amountCents),
    service_summary: input.serviceSummary.trim(),
    line_items: lineItems,
    notes: input.notes?.trim() || null,
    status: input.status,
  };

  if (input.client) {
    patch.client_id = input.client.id;
    patch.client_name = input.client.business_name;
    patch.client_email = primaryEmailForClient(input.client);
  }

  if (input.status === 'SENT') {
    patch.sent_at = new Date().toISOString();
  }

  if (input.status === 'UNPAID' || input.status === 'DRAFT') {
    patch.sent_at = null;
  }

  const db = requireSupabase();
  const { data, error } = await db
    .from('invoices')
    .update(patch)
    .eq('id', invoiceId)
    .select('*')
    .single();

  if (error) throw error;
  return data as Invoice;
}

export async function deleteInvoice(invoiceId: string): Promise<void> {
  const db = requireSupabase();
  const { error } = await db
    .from('invoices')
    .delete()
    .eq('id', invoiceId);

  if (error) throw error;
}

export async function markInvoiceDownloaded(invoiceId: string): Promise<void> {
  const db = requireSupabase();
  const { error } = await db
    .from('invoices')
    .update({ downloaded_at: new Date().toISOString() })
    .eq('id', invoiceId);

  if (error) throw error;
}

const formatMoney = (cents: number, currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format((cents || 0) / 100);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const compactLines = (lines: Array<string | null | undefined>) =>
  lines.map((line) => line?.trim()).filter(Boolean) as string[];

export function buildInvoiceTemplate(
  invoice: Invoice,
  businessSettings: BusinessSettings = defaultBusinessSettings
): string {
  const rows = invoice.line_items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.description)}</td>
          <td>${item.quantity}</td>
          <td>${formatMoney(item.unit_amount_cents, invoice.currency)}</td>
          <td>${formatMoney(item.quantity * item.unit_amount_cents, invoice.currency)}</td>
        </tr>`
    )
    .join('');
  const businessName =
    businessSettings.legal_name.trim() ||
    businessSettings.display_name.trim() ||
    'Magniar';
  const businessContact = compactLines([
    businessSettings.email,
    businessSettings.phone,
    businessSettings.website,
  ]);
  const businessAddress = compactLines([
    businessSettings.address_line_1,
    businessSettings.address_line_2,
    compactLines([businessSettings.city, businessSettings.region, businessSettings.postal_code]).join(', '),
    businessSettings.country,
  ]);
  const taxLine =
    businessSettings.tax_id_label && businessSettings.tax_id_value
      ? `${businessSettings.tax_id_label}: ${businessSettings.tax_id_value}`
      : '';

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(invoice.invoice_number)}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #111827; margin: 48px; }
    header { display: flex; justify-content: space-between; gap: 24px; border-bottom: 1px solid #d1d5db; padding-bottom: 24px; }
    h1 { letter-spacing: 0.08em; margin: 0; }
    .muted { color: #6b7280; font-size: 13px; }
    .line { margin-top: 4px; }
    .block { margin-top: 28px; }
    table { border-collapse: collapse; width: 100%; margin-top: 16px; }
    th, td { border-bottom: 1px solid #e5e7eb; padding: 12px; text-align: left; }
    th { font-size: 12px; text-transform: uppercase; color: #6b7280; }
    .total { text-align: right; font-size: 22px; font-weight: 700; margin-top: 20px; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>${escapeHtml(businessName)}</h1>
      ${businessSettings.display_name && businessSettings.display_name !== businessName ? `<div class="muted">${escapeHtml(businessSettings.display_name)}</div>` : ''}
      ${businessContact.map((line) => `<div class="muted line">${escapeHtml(line)}</div>`).join('')}
      ${businessAddress.map((line) => `<div class="muted line">${escapeHtml(line)}</div>`).join('')}
      ${taxLine ? `<div class="muted line">${escapeHtml(taxLine)}</div>` : ''}
    </div>
    <div>
      <strong>${escapeHtml(invoice.invoice_number)}</strong><br />
      <span class="muted">Issued: ${escapeHtml(invoice.issue_date)}</span><br />
      <span class="muted">Due: ${escapeHtml(invoice.due_date)}</span>
    </div>
  </header>

  <section class="block">
    <div class="muted">Bill To</div>
    <strong>${escapeHtml(invoice.client_name)}</strong><br />
    ${invoice.client_email ? `<span>${escapeHtml(invoice.client_email)}</span>` : ''}
  </section>

  <section class="block">
    <div class="muted">Services</div>
    <p>${escapeHtml(invoice.service_summary)}</p>
    <table>
      <thead>
        <tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="total">Total ${formatMoney(invoice.total_cents, invoice.currency)}</div>
  </section>

  ${invoice.notes ? `<section class="block"><div class="muted">Notes</div><p>${escapeHtml(invoice.notes)}</p></section>` : ''}
  ${businessSettings.payment_instructions ? `<section class="block"><div class="muted">Payment Instructions</div><p>${escapeHtml(businessSettings.payment_instructions)}</p></section>` : ''}
  ${businessSettings.invoice_footer ? `<section class="block"><p class="muted">${escapeHtml(businessSettings.invoice_footer)}</p></section>` : ''}
</body>
</html>`;
}

export async function downloadInvoiceTemplate(
  invoice: Invoice,
  businessSettings?: BusinessSettings
): Promise<void> {
  const html = buildInvoiceTemplate(invoice, businessSettings);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${invoice.invoice_number}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  await markInvoiceDownloaded(invoice.id);
}
