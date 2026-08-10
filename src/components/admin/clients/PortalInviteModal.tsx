import React from 'react';
import { X, ShieldCheck, Mail, Send } from 'lucide-react';

interface PortalInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmInvite: () => void;
  clientBusinessName: string;
  primaryContactEmail?: string;
}

export const PortalInviteModal: React.FC<PortalInviteModalProps> = ({
  isOpen,
  onClose,
  onConfirmInvite,
  clientBusinessName,
  primaryContactEmail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0A0A0C] border border-[#0099FF]/40 rounded-[2px] w-full max-w-md p-6 space-y-5 font-mono text-xs text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
            <h3 className="font-bold text-sm text-white uppercase">CLIENT PORTAL INVITATION</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-white/80 leading-relaxed text-xs">
            Send client portal invitation to <strong className="text-white">{clientBusinessName}</strong>.
          </p>

          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1.5 text-xs">
            <div className="text-[10px] text-white/40 uppercase font-semibold">Recipient Email:</div>
            <div className="text-[#0099FF] font-bold flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{primaryContactEmail || 'primary.contact@example.com'}</span>
            </div>
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] text-[11px] text-white/60 space-y-1">
            <span className="text-white font-semibold block">Portal Scope:</span>
            <p>
              The client will receive secure portal access to view approved project milestones, active strategy roadmaps, live reporting dashboards, and invoice statements.
            </p>
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
            onClick={() => {
              onConfirmInvite();
              onClose();
            }}
            className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 text-white font-bold rounded-[2px] flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Portal Invite</span>
          </button>
        </div>
      </div>
    </div>
  );
};
