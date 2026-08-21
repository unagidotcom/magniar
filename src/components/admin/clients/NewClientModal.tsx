import React, { useState } from 'react';
import { Client, ClientStatus } from '../../../types/clients';
import { X, Building2, UserPlus, Layers } from 'lucide-react';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clientData: Partial<Client>) => void | Promise<void>;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('E-COMMERCE');
  const [businessModel, setBusinessModel] = useState('DTC');
  const [companySize, setCompanySize] = useState('10-50 employees');
  const [primaryMarket, setPrimaryMarket] = useState('North America');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('Founder');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [accountOwner, setAccountOwner] = useState('Growth Team');
  const [status, setStatus] = useState<ClientStatus>('ONBOARDING');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !contactName.trim() || !contactEmail.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        business_name: businessName,
        industry,
        business_model: businessModel,
        company_size: companySize,
        primary_market: primaryMarket,
        website: website || '',
        logo_url: logoUrl || '',
        account_owner: accountOwner,
        status,
        description,
        primary_objective: objective,
        contacts: [
          {
            id: `cnt-${Date.now()}`,
            name: contactName,
            role: contactRole,
            email: contactEmail,
            phone: contactPhone,
            is_primary: true,
          },
        ],
      });

      onClose();
    } catch (err) {
      console.error('New client form submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-mono text-xs text-white">
      <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0099FF]" />
            <h3 className="font-bold text-sm text-white uppercase">REGISTER NEW CLIENT ACCOUNT</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Info */}
          <div className="space-y-3">
            <h4 className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">
              01 — BUSINESS IDENTITY
            </h4>
            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Business Name *</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Acme Brands Co."
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="E-COMMERCE">E-COMMERCE</option>
                  <option value="HEALTHCARE">HEALTHCARE</option>
                  <option value="FINTECH">FINTECH</option>
                  <option value="MANUFACTURING">MANUFACTURING</option>
                  <option value="RETAIL">RETAIL</option>
                  <option value="PROFESSIONAL SERVICES">PROFESSIONAL SERVICES</option>
                  <option value="SaaS">SaaS</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Business Model</label>
                <select
                  value={businessModel}
                  onChange={(e) => setBusinessModel(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="DTC">DTC</option>
                  <option value="B2B">B2B</option>
                  <option value="HYBRID">HYBRID</option>
                  <option value="MARKETPLACE">MARKETPLACE</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Initial Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ClientStatus)}
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="ONBOARDING">ONBOARDING</option>
                  <option value="ACTIVE">ACTIVE</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Website URL</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://client-domain.com"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Logo URL</label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://client-domain.com/logo.png"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Magniar Account Owner</label>
                <input
                  type="text"
                  value={accountOwner}
                  onChange={(e) => setAccountOwner(e.target.value)}
                  placeholder="e.g. Kaelen Voss / Growth Team"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>
          </div>

          {/* Primary Contact */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">
              02 — PRIMARY CLIENT CONTACT
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Sarah Lin"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Contact Role</label>
                <input
                  type="text"
                  value={contactRole}
                  onChange={(e) => setContactRole(e.target.value)}
                  placeholder="e.g. Founder & CEO"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. sarah@client.com"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase mb-1">Phone</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+1 (555) 019-0000"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
                />
              </div>
            </div>
          </div>

          {/* Description & Objective */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Business Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of business operations..."
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">Primary Growth Objective</label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="e.g. Scale cross-channel performance media & Shopify conversion funnel"
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 disabled:opacity-50 text-white font-bold rounded-[2px]"
            >
              {isSubmitting ? 'Saving...' : 'Register Client Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
