import React, { useState } from 'react';
import { X, PauseCircle, AlertTriangle, Calendar } from 'lucide-react';

interface CampaignPauseModalProps {
  isOpen: boolean;
  campaignId: string;
  campaignName: string;
  onClose: () => void;
  onConfirm: (reason: string, expectedResumeDate?: string) => void;
}

export const CampaignPauseModal: React.FC<CampaignPauseModalProps> = ({
  isOpen,
  campaignId,
  campaignName,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState<string>('Client hold on creative review or budget adjustment.');
  const [resumeDate, setResumeDate] = useState<string>('2026-08-25');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirm(reason, resumeDate || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono animate-fadeIn">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-sm w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-[2px]">
              <PauseCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                PAUSE CAMPAIGN OPERATION
              </span>
              <h3 className="text-sm font-bold text-white uppercase">{campaignName}</h3>
              <p className="text-[10px] text-white/50">{campaignId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-sm flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              Pausing will set campaign status to PAUSED and trigger an administrative health alert. Please state the pause reason for team alignment.
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
              PAUSE REASON (REQUIRED)
            </label>
            <textarea
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-[#111111] border border-white/10 rounded-sm p-3 text-xs text-white focus:border-amber-500 outline-none"
              placeholder="State clear operational reason..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
              EXPECTED RESUME DATE (OPTIONAL)
            </label>
            <div className="relative">
              <input
                type="date"
                value={resumeDate}
                onChange={(e) => setResumeDate(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 text-xs font-bold text-white/70 hover:text-white rounded-sm"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold rounded-sm"
            >
              CONFIRM CAMPAIGN PAUSE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
