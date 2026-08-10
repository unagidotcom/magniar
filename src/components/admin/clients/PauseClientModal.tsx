import React, { useState } from 'react';
import { X, PauseCircle, AlertTriangle } from 'lucide-react';

interface PauseClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPause: (reason: string) => void;
  clientBusinessName: string;
}

export const PauseClientModal: React.FC<PauseClientModalProps> = ({
  isOpen,
  onClose,
  onConfirmPause,
  clientBusinessName,
}) => {
  const [reasonType, setReasonType] = useState<string>('CLIENT_REQUEST');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const fullReason = `${reasonType}${notes ? `: ${notes}` : ''}`;
    onConfirmPause(fullReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-mono text-xs text-white">
      <div className="bg-[#0A0A0C] border border-amber-500/40 rounded-[2px] w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <PauseCircle className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white uppercase">PAUSE CLIENT ACCOUNT</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-white/80 leading-relaxed">
            Specify the operational reason for pausing <strong className="text-white">{clientBusinessName}</strong>.
          </p>

          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Pause Reason Category *</label>
            <select
              value={reasonType}
              onChange={(e) => setReasonType(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2.5 text-white focus:outline-none focus:border-amber-400"
            >
              <option value="CLIENT_REQUEST">Client Requested Temporary Pause</option>
              <option value="TEMPORARY_RELOCATION">Client Business Relocation / Seasonal Restructure</option>
              <option value="BILLING_ISSUE">Billing or Payment Statement Hold</option>
              <option value="PROJECT_PAUSED">Active Projects Temporarily Suspended</option>
              <option value="OTHER">Other Operational Reason</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-white/40 uppercase mb-1">Additional Internal Context</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Expected re-activation date, campaign hold instructions..."
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-[2px]"
          >
            Confirm Account Pause
          </button>
        </div>
      </div>
    </div>
  );
};
