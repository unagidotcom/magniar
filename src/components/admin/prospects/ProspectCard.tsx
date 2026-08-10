import React from 'react';
import { Prospect } from '../../../types/prospects';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { Eye, Clock, ArrowRight, UserCheck } from 'lucide-react';

interface ProspectCardProps {
  prospect: Prospect;
  onOpen: (prospect: Prospect) => void;
  onQuickStageChange?: (prospect: Prospect, newStage: any) => void;
}

export const ProspectCard: React.FC<ProspectCardProps> = ({ prospect, onOpen }) => {
  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3 hover:border-white/20 transition-all">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-[#0099FF] font-bold">
              {prospect.id}
            </span>
            <AdminStatusBadge status={prospect.stage} />
          </div>
          <h4 className="font-display font-semibold text-white text-sm">
            {prospect.business_name}
          </h4>
        </div>

        <button
          onClick={() => onOpen(prospect)}
          className="p-1.5 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10 shrink-0 text-[11px] flex items-center gap-1 font-mono"
        >
          <span>Open</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#0099FF]" />
        </button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 border-t border-white/5 text-white/70">
        <div>
          <span className="text-[10px] text-white/40 block">CONTACT</span>
          <span className="text-white">{prospect.contact_name}</span>
        </div>
        <div>
          <span className="text-[10px] text-white/40 block">TYPE</span>
          <span>{prospect.industry} / {prospect.business_model}</span>
        </div>
        <div>
          <span className="text-[10px] text-white/40 block">EST. MONTHLY</span>
          <span className="text-emerald-400 font-bold">{prospect.opportunity.estimated_monthly_value}</span>
        </div>
        <div>
          <span className="text-[10px] text-white/40 block">OWNER</span>
          <span className="flex items-center gap-1 text-white/90">
            <UserCheck className="w-3 h-3 text-[#0099FF]" />
            {prospect.owner}
          </span>
        </div>
      </div>

      {/* Services Chips */}
      <div className="flex flex-wrap gap-1 pt-1">
        {prospect.services.slice(0, 3).map((s) => (
          <span
            key={s}
            className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 text-white/70 border border-white/10 rounded-[2px]"
          >
            {s}
          </span>
        ))}
        {prospect.services.length > 3 && (
          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 text-white/40 border border-white/10 rounded-[2px]">
            +{prospect.services.length - 3}
          </span>
        )}
      </div>

      {/* Next Action Bar */}
      <div className="p-2 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-amber-300 truncate">
          <Clock className="w-3 h-3 shrink-0" />
          <span className="truncate">{prospect.next_action.title}</span>
        </div>
        <span className="text-white/40 shrink-0">{prospect.next_action.due_date}</span>
      </div>
    </div>
  );
};
