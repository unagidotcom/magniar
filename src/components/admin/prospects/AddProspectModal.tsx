import React, { useState } from 'react';
import { AdminModal } from '../AdminModal';
import { ProspectStage, ProspectPriority, LeadSource } from '../../../types/prospects';

interface AddProspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prospectData: any) => void;
}

export const AddProspectModal: React.FC<AddProspectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // Form State
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactTitle, setContactTitle] = useState('CMO / Marketing Lead');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('E-COMMERCE');
  const [businessModel, setBusinessModel] = useState('DTC');
  
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Meta Ads',
    'Google Ads',
  ]);
  const [customService, setCustomService] = useState('');

  const [mediaBudget, setMediaBudget] = useState('$30,000 / month');
  const [serviceFee, setServiceFee] = useState('$6,000 / month');
  const [projectFee, setProjectFee] = useState('$10,000');
  const [estimatedMonthlyValue, setEstimatedMonthlyValue] = useState('$6,000 / month');
  const [estimatedContractValue, setEstimatedContractValue] = useState('$72,000');
  
  const [stage, setStage] = useState<ProspectStage>('QUALIFIED');
  const [priority, setPriority] = useState<ProspectPriority>('HIGH');
  const [owner, setOwner] = useState('Kaelen Voss');
  const [leadSource, setLeadSource] = useState<LeadSource>('WEBSITE');
  const [nextActionTitle, setNextActionTitle] = useState('Schedule Discovery Call');
  const [nextActionDueDate, setNextActionDueDate] = useState('Next Tuesday @ 10:00 AM');
  const [notes, setNotes] = useState('');

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableServices = [
    'Meta Ads',
    'Google Ads',
    'TikTok Ads',
    'LinkedIn Ads',
    'Shopify Optimization',
    'SEO',
    'CRO',
    'AI Strategy',
    'Analytics',
    'Amazon',
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const addCustomService = () => {
    if (customService.trim() && !selectedServices.includes(customService.trim())) {
      setSelectedServices([...selectedServices, customService.trim()]);
      setCustomService('');
    }
  };

  const handleValidationAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!owner.trim()) newErrors.owner = 'Owner assignment is required';
    if (selectedServices.length === 0) newErrors.services = 'At least 1 service required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      business_name: businessName,
      contact_name: contactName,
      contact_title: contactTitle,
      email,
      phone,
      website: website ? (website.startsWith('http') ? website : `https://${website}`) : '',
      industry,
      business_model: businessModel,
      services: selectedServices,
      stage,
      priority,
      owner,
      lead_source: leadSource,
      opportunity: {
        media_budget: mediaBudget,
        service_fee: serviceFee,
        project_fee: projectFee,
        estimated_monthly_value: estimatedMonthlyValue,
        estimated_monthly_value_num: parseInt(estimatedMonthlyValue.replace(/[^0-9]/g, '')) || 5000,
        estimated_contract_value: estimatedContractValue,
        estimated_contract_value_num: parseInt(estimatedContractValue.replace(/[^0-9]/g, '')) || 60000,
        currency: 'USD ($)',
        probability: stage === 'QUALIFIED' ? 25 : stage === 'DISCOVERY' ? 40 : 65,
        expected_close_date: '2026-09-15',
      },
      next_action: {
        id: `act-${Date.now()}`,
        title: nextActionTitle,
        due_date: nextActionDueDate,
        owner,
        completed: false,
      },
      internal_notes: notes,
    });

    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Qualified Prospect"
      subtitle="Register an opportunity into the Magniar Prospects CRM pipeline."
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleValidationAndSubmit} className="space-y-6 text-xs font-mono">
        {/* GROUP 1: BUSINESS */}
        <div className="space-y-3 p-4 bg-[#050505] border border-white/10 rounded-[2px]">
          <span className="font-mono text-[10px] text-[#0099FF] uppercase tracking-widest font-bold block">
            01 — BUSINESS INFORMATION
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 mb-1">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className={`w-full p-2 bg-[#0A0A0C] border ${
                  errors.businessName ? 'border-rose-500' : 'border-white/10'
                } rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]`}
              />
              {errors.businessName && <span className="text-[10px] text-rose-400">{errors.businessName}</span>}
            </div>

            <div>
              <label className="block text-white/70 mb-1">Website URL</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. acme.com"
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>

            <div>
              <label className="block text-white/70 mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              >
                <option value="E-COMMERCE">E-COMMERCE</option>
                <option value="SAAS">SAAS</option>
                <option value="B2B">B2B</option>
                <option value="HEALTHCARE">HEALTHCARE</option>
                <option value="PROFESSIONAL SERVICES">PROFESSIONAL SERVICES</option>
                <option value="RETAIL">RETAIL</option>
                <option value="MANUFACTURING">MANUFACTURING</option>
                <option value="FINANCE">FINANCE</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div>
              <label className="block text-white/70 mb-1">Business Model</label>
              <select
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              >
                <option value="DTC">DTC</option>
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
                <option value="MARKETPLACE">MARKETPLACE</option>
                <option value="SUBSCRIPTION">SUBSCRIPTION</option>
                <option value="SERVICE">SERVICE</option>
                <option value="HYBRID">HYBRID</option>
              </select>
            </div>
          </div>
        </div>

        {/* GROUP 2: CONTACT */}
        <div className="space-y-3 p-4 bg-[#050505] border border-white/10 rounded-[2px]">
          <span className="font-mono text-[10px] text-[#0099FF] uppercase tracking-widest font-bold block">
            02 — PRIMARY CONTACT
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 mb-1">Contact Name *</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Maya Chen"
                className={`w-full p-2 bg-[#0A0A0C] border ${
                  errors.contactName ? 'border-rose-500' : 'border-white/10'
                } rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]`}
              />
              {errors.contactName && <span className="text-[10px] text-rose-400">{errors.contactName}</span>}
            </div>

            <div>
              <label className="block text-white/70 mb-1">Job Title</label>
              <input
                type="text"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                placeholder="e.g. Chief Marketing Officer"
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>

            <div>
              <label className="block text-white/70 mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@example.com"
                className={`w-full p-2 bg-[#0A0A0C] border ${
                  errors.email ? 'border-rose-500' : 'border-white/10'
                } rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]`}
              />
              {errors.email && <span className="text-[10px] text-rose-400">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-white/70 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>
          </div>
        </div>

        {/* GROUP 3: OPPORTUNITY FINANCIALS */}
        <div className="space-y-3 p-4 bg-[#050505] border border-white/10 rounded-[2px]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#0099FF] uppercase tracking-widest font-bold">
              03 — COMMERCIAL OPPORTUNITY MODEL
            </span>
            <span className="font-mono text-[9px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
              DEMO VALUES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-white/70 mb-1">Advertising Media Budget</label>
              <input
                type="text"
                value={mediaBudget}
                onChange={(e) => setMediaBudget(e.target.value)}
                placeholder="$30,000 / mo"
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              />
              <span className="text-[9px] text-white/40 block mt-0.5">Separate from Magniar fee</span>
            </div>

            <div>
              <label className="block text-white/70 mb-1">Est. Magniar Service Fee</label>
              <input
                type="text"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                placeholder="$6,000 / mo"
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white/70 mb-1">Est. Contract Value</label>
              <input
                type="text"
                value={estimatedContractValue}
                onChange={(e) => setEstimatedContractValue(e.target.value)}
                placeholder="$72,000"
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-emerald-400 font-bold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* GROUP 4: SERVICES */}
        <div className="space-y-3 p-4 bg-[#050505] border border-white/10 rounded-[2px]">
          <span className="font-mono text-[10px] text-[#0099FF] uppercase tracking-widest font-bold block">
            04 — SERVICES OF INTEREST *
          </span>

          <div className="flex flex-wrap gap-1.5">
            {availableServices.map((srv) => {
              const active = selectedServices.includes(srv);
              return (
                <button
                  type="button"
                  key={srv}
                  onClick={() => toggleService(srv)}
                  className={`px-2.5 py-1 rounded-[2px] border text-[11px] transition-all ${
                    active
                      ? 'bg-[#0099FF]/20 border-[#0099FF] text-white font-semibold'
                      : 'bg-[#0A0A0C] border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {srv}
                </button>
              );
            })}
          </div>
          {errors.services && <span className="text-[10px] text-rose-400 block">{errors.services}</span>}

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              placeholder="Add custom service..."
              className="p-1.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white text-[11px] focus:outline-none"
            />
            <button
              type="button"
              onClick={addCustomService}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-[2px] border border-white/10 text-[11px]"
            >
              + Add
            </button>
          </div>
        </div>

        {/* GROUP 5: STAGE & OWNER */}
        <div className="space-y-3 p-4 bg-[#050505] border border-white/10 rounded-[2px]">
          <span className="font-mono text-[10px] text-[#0099FF] uppercase tracking-widest font-bold block">
            05 — WORKFLOW & OWNERSHIP
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-white/70 mb-1">Initial Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as ProspectStage)}
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              >
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="DISCOVERY">DISCOVERY</option>
                <option value="PROPOSAL">PROPOSAL</option>
                <option value="NEGOTIATION">NEGOTIATION</option>
              </select>
            </div>

            <div>
              <label className="block text-white/70 mb-1">Assigned Owner *</label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              >
                <option value="Kaelen Voss">Kaelen Voss (Super Admin)</option>
                <option value="Devon Thorne">Devon Thorne (Strategy Partner)</option>
                <option value="Strategy Team">Strategy Team</option>
                <option value="Media Buying">Media Buying Team</option>
                <option value="Commerce Team">Commerce Team</option>
                <option value="Development">Development Team</option>
              </select>
            </div>

            <div>
              <label className="block text-white/70 mb-1">Lead Source</label>
              <select
                value={leadSource}
                onChange={(e) => setLeadSource(e.target.value as LeadSource)}
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              >
                <option value="WEBSITE">WEBSITE</option>
                <option value="REFERRAL">REFERRAL</option>
                <option value="OUTBOUND">OUTBOUND</option>
                <option value="LINKEDIN">LINKEDIN</option>
                <option value="PARTNER">PARTNER</option>
                <option value="EXISTING_CLIENT">EXISTING CLIENT</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>
        </div>

        {/* GROUP 6: NEXT ACTION & NOTES */}
        <div className="space-y-3 p-4 bg-[#050505] border border-white/10 rounded-[2px]">
          <span className="font-mono text-[10px] text-[#0099FF] uppercase tracking-widest font-bold block">
            06 — NEXT IMMEDIATE ACTION & NOTES
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 mb-1">Next Action Title</label>
              <input
                type="text"
                value={nextActionTitle}
                onChange={(e) => setNextActionTitle(e.target.value)}
                placeholder="Schedule discovery call"
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white/70 mb-1">Due Date / Time</label>
              <input
                type="text"
                value={nextActionDueDate}
                onChange={(e) => setNextActionDueDate(e.target.value)}
                placeholder="Next Tuesday @ 10:00 AM"
                className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 mb-1">Internal Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Private qualification context or strategy notes..."
              className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white font-semibold rounded-[2px] shadow-lg shadow-[#0099FF]/20"
          >
            Create Prospect Record
          </button>
        </div>
      </form>
    </AdminModal>
  );
};
