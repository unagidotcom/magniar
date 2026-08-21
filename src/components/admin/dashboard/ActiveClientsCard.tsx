import React from 'react';
import { Users, ArrowRight, ShieldCheck, AlertTriangle, AlertCircle, PauseCircle } from 'lucide-react';
import { ClientHealthItem } from '../../../services/dashboardService';

interface ActiveClientsCardProps {
  clients: ClientHealthItem[];
  onInspectClient: (client: ClientHealthItem) => void;
  onNavigateToClients: () => void;
}

export const ActiveClientsCard: React.FC<ActiveClientsCardProps> = ({
  clients,
  onInspectClient,
  onNavigateToClients,
}) => {
  const getHealthBadge = (status: ClientHealthItem['healthStatus']) => {
    switch (status) {
      case 'HEALTHY':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ● HEALTHY
          </span>
        );
      case 'ATTENTION':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            ● ATTENTION
          </span>
        );
      case 'AT_RISK':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            ● AT RISK
          </span>
        );
      case 'PAUSED':
        return (
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            ● PAUSED
          </span>
        );
    }
  };

  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#0099FF]" />
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            ACTIVE CLIENTS & ACCOUNT HEALTH
          </h3>
        </div>

        <button
          onClick={onNavigateToClients}
          className="text-xs font-mono text-[#0099FF] hover:underline flex items-center gap-1"
        >
          <span>View Directory</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="p-6 bg-[#050505] border border-white/5 rounded-[2px] text-xs font-mono text-white/50">
          No live client records yet.
        </div>
      ) : (
      <div className="space-y-2.5">
        {clients.map((cli) => (
          <div
            key={cli.id}
            onClick={() => onInspectClient(cli)}
            className="p-3.5 bg-[#050505] border border-white/5 hover:border-white/20 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors cursor-pointer group"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-semibold text-xs text-white group-hover:text-[#0099FF] transition-colors">
                  {cli.clientName}
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  ({cli.industry})
                </span>
              </div>
              <p className="font-mono text-[11px] text-white/60 truncate">
                Next: {cli.nextAction}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <div className="text-right font-mono">
                <div className="text-xs font-semibold text-emerald-400">
                  {cli.monthlyValue}
                </div>
                <div className="text-[10px] text-white/40">
                  {cli.activeProjects} Active Projects
                </div>
              </div>

              {getHealthBadge(cli.healthStatus)}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};
