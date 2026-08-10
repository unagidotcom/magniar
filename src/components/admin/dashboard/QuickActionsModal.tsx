import React, { useState } from 'react';
import { Plus, Check, X, Building, Briefcase, FileText, Send } from 'lucide-react';
import { AdminModal } from '../AdminModal';

interface QuickActionsModalProps {
  actionType: 'NEW_REQUEST' | 'NEW_CLIENT' | 'NEW_PROJECT' | 'CREATE_INVOICE' | null;
  onClose: () => void;
  onSubmit: (title: string, message: string) => void;
}

export const QuickActionsModal: React.FC<QuickActionsModalProps> = ({
  actionType,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    amount: '',
    notes: '',
  });

  if (!actionType) return null;

  const getTitle = () => {
    switch (actionType) {
      case 'NEW_REQUEST':
        return '+ CREATE NEW INTAKE REQUEST';
      case 'NEW_CLIENT':
        return '+ REGISTER NEW CLIENT ACCOUNT';
      case 'NEW_PROJECT':
        return '+ LAUNCH NEW ENGINEERING PROJECT';
      case 'CREATE_INVOICE':
        return '+ ISSUE COMMERCIAL INVOICE';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entityName = formData.company || formData.name || 'Demo Entity';
    onSubmit(
      `Created ${actionType.replace('_', ' ')}`,
      `Successfully registered record for ${entityName}.`
    );
    onClose();
  };

  return (
    <AdminModal
      isOpen={!!actionType}
      onClose={onClose}
      title={getTitle()}
      subtitle="Prototype Operational Form (Simulated Frontend Input)"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="space-y-1.5">
          <label className="text-white/60 uppercase text-[10px]">
            Company / Entity Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Northstar Commerce Inc."
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 bg-[#050505] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-white/60 uppercase text-[10px]">
            Primary Contact / Lead Partner
          </label>
          <input
            type="text"
            placeholder="e.g. Sarah Jenkins (VP Growth)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-[#050505] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]"
          />
        </div>

        {(actionType === 'NEW_REQUEST' || actionType === 'CREATE_INVOICE') && (
          <div className="space-y-1.5">
            <label className="text-white/60 uppercase text-[10px]">
              {actionType === 'CREATE_INVOICE' ? 'Invoice Amount ($)' : 'Estimated Monthly Budget ($)'}
            </label>
            <input
              type="text"
              placeholder="$45,000.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 bg-[#050505] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-[#0099FF]"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-white/60 uppercase text-[10px]">
            Operational Notes / Summary
          </label>
          <textarea
            rows={3}
            placeholder="Specify engagement scope, deliverables, or initial SLA targets..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 bg-[#050505] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-[#0099FF] resize-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-[#0099FF] hover:bg-[#0088EE] text-white font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Entry</span>
          </button>
        </div>
      </form>
    </AdminModal>
  );
};
