import React from 'react';
import { ClientService } from '../../../types/clients';
import { Layers, CheckCircle2, PauseCircle, Clock, Sparkles } from 'lucide-react';

interface ClientServicesProps {
  services: ClientService[];
}

export const ClientServices: React.FC<ClientServicesProps> = ({ services }) => {
  const getServiceStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>ACTIVE</span>
          </span>
        );
      case 'PAUSED':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-semibold flex items-center gap-1">
            <PauseCircle className="w-3 h-3" />
            <span>PAUSED</span>
          </span>
        );
      case 'PLANNED':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 text-[10px] font-mono font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>PLANNED</span>
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-white/10 text-white/60 border border-white/20 text-[10px] font-mono font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-[#0A0A0C] p-4 border border-white/10 rounded-[2px] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-sm uppercase">ACTIVE MAGNIAR SERVICES</h3>
          <p className="text-white/40 text-[11px] mt-0.5">
            Capabilities and recurring service retainers active for this account.
          </p>
        </div>
        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-[2px] text-white/60 text-[10px]">
          {services.filter((s) => s.status === 'ACTIVE').length} ACTIVE SERVICES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-white text-sm">{srv.name}</h4>
                <p className="text-[10px] text-white/40 mt-0.5">
                  Started: <span className="text-white">{srv.started_at}</span>
                </p>
              </div>
              {getServiceStatusBadge(srv.status)}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
              <div>
                <span className="text-[9px] text-white/40 block uppercase">Assigned Team</span>
                <span className="text-white font-medium">{srv.owner}</span>
              </div>
              <div>
                <span className="text-[9px] text-white/40 block uppercase">Associated Engagements</span>
                <span className="text-[#0099FF] font-bold">{srv.associated_projects_count} Projects</span>
              </div>
            </div>

            {srv.monthly_fee_display && (
              <div className="p-2 bg-[#050505] border border-white/5 rounded-[2px] flex items-center justify-between text-[11px]">
                <span className="text-white/50">SERVICE RETAINER VALUE:</span>
                <span className="text-white font-bold">{srv.monthly_fee_display}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
