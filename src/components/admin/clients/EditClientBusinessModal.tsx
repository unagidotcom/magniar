import React, { useEffect, useState } from 'react';
import { Building2, Eye, EyeOff, Image as ImageIcon, X } from 'lucide-react';
import { Client } from '../../../types/clients';
import { ClientLogo } from '../../common/ClientLogo';

interface EditClientBusinessModalProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updates: Partial<Client>) => void | Promise<void>;
}

type BusinessForm = {
  business_name: string;
  industry: string;
  business_model: string;
  company_size: string;
  primary_market: string;
  markets_served: string;
  website: string;
  logo_url: string;
  description: string;
  primary_objective: string;
  account_owner: string;
  show_on_homepage: boolean;
  homepage_label: string;
  homepage_order: string;
};

const formFromClient = (client: Client): BusinessForm => ({
  business_name: client.business_name || '',
  industry: client.industry || '',
  business_model: client.business_model || '',
  company_size: client.company_size || '',
  primary_market: client.primary_market || '',
  markets_served: client.markets_served || '',
  website: client.website || '',
  logo_url: client.logo_url || '',
  description: client.description || '',
  primary_objective: client.primary_objective || '',
  account_owner: client.account_owner || '',
  show_on_homepage: client.show_on_homepage ?? true,
  homepage_label: client.homepage_label || '',
  homepage_order: String(client.homepage_order ?? 100),
});

const inputClassName =
  'w-full rounded-[3px] border border-white/10 bg-[#050505] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#0099FF]';
const labelClassName = 'mb-1.5 block text-[11px] font-bold uppercase text-white/45';

export const EditClientBusinessModal: React.FC<EditClientBusinessModalProps> = ({
  client,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<BusinessForm>(() => formFromClient(client));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setForm(formFromClient(client));
    setFormError(null);
  }, [client, isOpen]);

  if (!isOpen) return null;

  const updateField = <Key extends keyof BusinessForm>(key: Key, value: BusinessForm[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...form,
        homepage_order: Number(form.homepage_order || 100),
      });
      onClose();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Could not update the client profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[4px] border border-white/10 bg-[#0A0A0C] text-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0A0A0C]/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-[#0099FF]/30 bg-[#0099FF]/10 text-[#0099FF]">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold">Edit business and logo</h2>
              <p className="mt-0.5 text-xs text-white/45">{client.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close business editor"
            className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/10 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-5">
          <section className="grid gap-4 border-b border-white/10 pb-6 md:grid-cols-[210px_1fr]">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-[#0099FF]">
                <ImageIcon className="h-4 w-4" />
                Brand preview
              </div>
              <ClientLogo
                name={form.business_name || 'Client business'}
                logoUrl={form.logo_url}
                className="flex h-28 w-full items-center justify-center rounded-[4px] border border-white/10 bg-white px-5"
                imageClassName="max-h-16 max-w-full object-contain"
                fallbackClassName="w-full text-[#0B0D0F]"
              />
              <p className="mt-2 text-[11px] leading-5 text-white/40">
                A full-name wordmark is used automatically when the logo URL is empty or cannot load.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClassName}>Business name *</label>
                <input
                  required
                  value={form.business_name}
                  onChange={(event) => updateField('business_name', event.target.value)}
                  className={inputClassName}
                />
              </div>
              <div>
                <label className={labelClassName}>Direct logo URL</label>
                <input
                  type="text"
                  inputMode="url"
                  value={form.logo_url}
                  onChange={(event) => updateField('logo_url', event.target.value)}
                  placeholder="https://cdn.example.com/brand-logo.svg"
                  className={inputClassName}
                />
                <p className="mt-1.5 text-[11px] text-white/35">
                  Use a public PNG, SVG, WebP, JPEG, GIF, or image-delivery URL.
                </p>
              </div>
              <div>
                <label className={labelClassName}>Website URL</label>
                <input
                  type="text"
                  inputMode="url"
                  value={form.website}
                  onChange={(event) => updateField('website', event.target.value)}
                  placeholder="https://example.com"
                  className={inputClassName}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 border-b border-white/10 pb-6">
            <h3 className="text-xs font-bold uppercase text-[#0099FF]">Business profile</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelClassName}>Industry</label>
                <input value={form.industry} onChange={(event) => updateField('industry', event.target.value)} className={inputClassName} />
              </div>
              <div>
                <label className={labelClassName}>Business model</label>
                <input value={form.business_model} onChange={(event) => updateField('business_model', event.target.value)} className={inputClassName} />
              </div>
              <div>
                <label className={labelClassName}>Company size</label>
                <input value={form.company_size} onChange={(event) => updateField('company_size', event.target.value)} className={inputClassName} />
              </div>
              <div>
                <label className={labelClassName}>Primary market</label>
                <input value={form.primary_market} onChange={(event) => updateField('primary_market', event.target.value)} className={inputClassName} />
              </div>
              <div>
                <label className={labelClassName}>Markets served</label>
                <input value={form.markets_served} onChange={(event) => updateField('markets_served', event.target.value)} className={inputClassName} />
              </div>
              <div>
                <label className={labelClassName}>Account owner</label>
                <input value={form.account_owner} onChange={(event) => updateField('account_owner', event.target.value)} className={inputClassName} />
              </div>
            </div>
            <div>
              <label className={labelClassName}>Business description</label>
              <textarea rows={3} value={form.description} onChange={(event) => updateField('description', event.target.value)} className={inputClassName} />
            </div>
            <div>
              <label className={labelClassName}>Primary objective</label>
              <textarea rows={2} value={form.primary_objective} onChange={(event) => updateField('primary_objective', event.target.value)} className={inputClassName} />
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-start justify-between gap-4 rounded-[4px] border border-white/10 bg-[#050505] p-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  {form.show_on_homepage ? <Eye className="h-4 w-4 text-[#0099FF]" /> : <EyeOff className="h-4 w-4 text-white/40" />}
                  Homepage client showcase
                </div>
                <p className="mt-1 text-xs leading-5 text-white/40">
                  Publish this client in the “Trusted by growing brands” section.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.show_on_homepage}
                onClick={() => updateField('show_on_homepage', !form.show_on_homepage)}
                className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
                  form.show_on_homepage
                    ? 'border-[#0099FF] bg-[#0099FF]'
                    : 'border-white/15 bg-white/5'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white transition-transform ${
                    form.show_on_homepage ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_150px]">
              <div>
                <label className={labelClassName}>Homepage label</label>
                <input
                  value={form.homepage_label}
                  onChange={(event) => updateField('homepage_label', event.target.value)}
                  placeholder="DTC, SaaS, Hospitality..."
                  className={inputClassName}
                />
              </div>
              <div>
                <label className={labelClassName}>Display order</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.homepage_order}
                  onChange={(event) => updateField('homepage_order', event.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>
          </section>

          {formError && (
            <div className="rounded-[3px] border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {formError}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[3px] border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[3px] bg-[#0099FF] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0088E5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Saving changes...' : 'Save business details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
