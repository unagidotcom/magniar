import React from 'react';
import { Client } from '../../../types/clients';
import { ChevronRight, Clock, Building2, User, Layers } from 'lucide-react';

interface ClientCardProps {
  client: Client;
  onOpenClient: (client: Client) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onOpenClient }) => {
  const primaryContact = client.contacts.find((c) => c.is_primary) || client.contacts[0];
  const activeProjectsCount = client.projects.filter(
    (p) => p.status === 'ACTIVE' || p.status === 'IN_PROGRESS'
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
            ACTIVE
          </span>
        );
      case 'ONBOARDING':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 text-[10px] font-mono font-semibold">
            ONBOARDING
          </span>
        );
      case 'ATTENTION':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-semibold">
            ATTENTION
          </span>
        );
      case 'PAUSED':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-white/10 text-white/60 border border-white/20 text-[10px] font-mono font-semibold">
            PAUSED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-white/5 text-white/50 border border-white/10 text-[10px] font-mono font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onOpenClient(client)}
      className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-3 cursor-pointer hover:border-[#0099FF]/50 transition-colors"
    >
      {/* Top row: ID, Badge, Status */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#0099FF] bg-[#0099FF]/10 px-1.5 py-0.5 rounded-[2px] border border-[#0099FF]/20 font-bold">
            {client.id}
          </span>
          <span className="text-[10px] text-white/40 uppercase">{client.industry}</span>
        </div>
        <div>{getStatusBadge(client.status)}</div>
      </div>

      {/* Business & Primary Contact */}
      <div>
        <h3 className="text-base font-bold text-white hover:text-[#0099FF] transition-colors">
          {client.business_name}
        </h3>
        {primaryContact && (
          <p className="text-xs text-white/60 mt-0.5">
            {primaryContact.name} ({primaryContact.role})
          </p>
        )}
      </div>

      {/* Services chips */}
      <div className="flex flex-wrap gap-1">
        {client.services.map((srv) => (
          <span
            key={srv.id}
            className="px-1.5 py-0.5 bg-white/5 text-white/70 border border-white/10 rounded-[2px] text-[10px]"
          >
            {srv.name}
          </span>
        ))}
      </div>

      {/* Account Owner & Active Projects */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
        <div>
          <span className="text-white/40 block text-[9px] uppercase">Owner:</span>
          <span className="text-white font-medium">{client.account_owner}</span>
        </div>
        <div>
          <span className="text-white/40 block text-[9px] uppercase">Active Projects:</span>
          <span className="text-[#0099FF] font-bold">{activeProjectsCount} Projects</span>
        </div>
      </div>

      {/* Next Action */}
      <div className="p-2.5 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
        <div className="text-[9px] text-white/40 uppercase font-semibold">NEXT ACTION:</div>
        <div className="text-white text-xs font-medium">{client.next_action.title}</div>
        <div className="text-[10px] text-white/50 flex items-center gap-1">
          <Clock className="w-3 h-3 text-white/30" />
          <span>Due: {client.next_action.due_date}</span>
        </div>
      </div>

      {/* View Button */}
      <div className="pt-1 flex items-center justify-end text-[#0099FF] font-bold text-xs gap-1">
        <span>View Client 360° Record</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};
