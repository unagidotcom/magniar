import React, { useState } from 'react';
import { AdminModal } from '../AdminModal';
import { Prospect, LostReason } from '../../../types/prospects';
import { AlertTriangle, XCircle } from 'lucide-react';

interface LostReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect: Prospect;
  onConfirmLost: (prospect: Prospect, reason: LostReason, note: string) => void;
}

export const LostReasonModal: React.FC<LostReasonModalProps> = ({
  isOpen,
  onClose,
  prospect,
  onConfirmLost,
}) => {
  const [reason, setReason] = useState<LostReason>('PRICE');
  const [note, setNote] = useState('');

  const lostReasons: { key: LostReason; label: string; desc: string }[] = [
    { key: 'PRICE', label: 'PRICE', desc: 'Fees exceeded client budget expectations' },
    { key: 'TIMING', label: 'TIMING', desc: 'Project postponed to future quarter' },
    { key: 'NO_BUDGET', label: 'NO BUDGET', desc: 'Budget frozen or internal funding cancelled' },
    { key: 'CHOOSE_COMPETITOR', label: 'CHOSE COMPETITOR', desc: 'Selected another agency or internal hire' },
    { key: 'NOT_A_FIT', label: 'NOT A FIT', desc: 'Magniar should not pursue (below commercial minimums)' },
    { key: 'NO_RESPONSE', label: 'NO RESPONSE', desc: 'Prospect went cold after proposal/discovery' },
    { key: 'PROJECT_CANCELLED', label: 'PROJECT CANCELLED', desc: 'Strategic initiative scrapped internally' },
    { key: 'OTHER', label: 'OTHER', desc: 'Other custom reason' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmLost(prospect, reason, note);
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="MARK OPPORTUNITY AS LOST OR NOT A FIT"
      subtitle={`Update commercial status for prospect ${prospect.id} (${prospect.business_name}).`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] rounded-[2px] flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>
            Recording loss reasons helps Magniar Strategy refine qualification criteria and agency pricing models.
          </span>
        </div>

        <div>
          <label className="block text-white/70 mb-1 font-semibold">Select Primary Reason *</label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {lostReasons.map((r) => (
              <label
                key={r.key}
                className={`p-2.5 rounded-[2px] border flex items-center justify-between cursor-pointer transition-all ${
                  reason === r.key
                    ? 'bg-rose-500/10 border-rose-500/50 text-white'
                    : 'bg-[#050505] border-white/10 text-white/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="lost_reason"
                    value={r.key}
                    checked={reason === r.key}
                    onChange={() => setReason(r.key)}
                    className="accent-rose-500"
                  />
                  <div>
                    <span className="font-bold text-xs">{r.label}</span>
                    <p className="text-[10px] text-white/40">{r.desc}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white/70 mb-1">Internal Note / Context</label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add specific context on why the opportunity did not close..."
            className="w-full p-2 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-rose-500 resize-none text-xs"
          />
        </div>

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
            className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-[2px] shadow-lg shadow-rose-500/20 flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            <span>Confirm Status Update</span>
          </button>
        </div>
      </form>
    </AdminModal>
  );
};
