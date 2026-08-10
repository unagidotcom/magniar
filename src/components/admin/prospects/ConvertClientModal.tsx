import React from 'react';
import { AdminModal } from '../AdminModal';
import { Prospect } from '../../../types/prospects';
import { UserCheck, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

interface ConvertClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospect: Prospect;
  onConfirmConvert: (prospect: Prospect) => void;
}

export const ConvertClientModal: React.FC<ConvertClientModalProps> = ({
  isOpen,
  onClose,
  prospect,
  onConfirmConvert,
}) => {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="CONVERT PROSPECT TO CLIENT?"
      subtitle="Transition commercial prospect into an active paying client record."
      maxWidth="max-w-lg"
    >
      <div className="space-y-5 font-mono text-xs">
        <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-display font-semibold text-white text-sm">
                {prospect.business_name}
              </div>
              <div className="text-[11px] text-white/50">{prospect.contact_name} ({prospect.email})</div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed text-[11px]">
            This action will create an official Client record in the Magniar Clients Directory while preserving complete operational lineage:
          </p>

          {/* Lineage Diagram */}
          <div className="p-3 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
            <span className="text-[10px] text-white/40 uppercase block">DATA LINEAGE RECORD</span>
            <div className="flex items-center gap-2 text-[11px] text-white/80">
              <span className="text-[#0099FF]">{prospect.source_request_code || 'MG-REQ-INTAKE'}</span>
              <ArrowRight className="w-3 h-3 text-white/30" />
              <span className="text-[#0099FF] font-bold">{prospect.id}</span>
              <ArrowRight className="w-3 h-3 text-white/30" />
              <span className="text-emerald-400 font-bold">MG-CL-2026-008</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] rounded-[2px] flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
          <span>
            Stage will update to <strong className="text-emerald-400">WON (100%)</strong>. Client ID <strong className="font-mono">MG-CL-2026-008</strong> will be registered for project activation.
          </span>
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
            type="button"
            onClick={() => {
              onConfirmConvert(prospect);
              onClose();
            }}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-[2px] shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>CONVERT TO CLIENT</span>
          </button>
        </div>
      </div>
    </AdminModal>
  );
};
