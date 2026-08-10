import React from 'react';
import { Client } from '../../../types/clients';
import { Building2, ExternalLink, ArrowUpRight, ShieldCheck, Clock, Users, ChevronRight } from 'lucide-react';

interface ClientTableProps {
  clients: Client[];
  onOpenClient: (client: Client) => void;
  onOpenSourceRequest?: (requestCode: string) => void;
  onOpenSourceProspect?: (prospectId: string) => void;
}

export const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  onOpenClient,
  onOpenSourceRequest,
  onOpenSourceProspect,
}) => {
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
      case 'OFFBOARDING':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-semibold">
            OFFBOARDING
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
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-x-auto font-mono text-xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02] text-white/40 uppercase text-[10px] tracking-wider">
            <th className="py-3 px-4 font-semibold">CLIENT</th>
            <th className="py-3 px-4 font-semibold">INDUSTRY</th>
            <th className="py-3 px-4 font-semibold">BUSINESS MODEL</th>
            <th className="py-3 px-4 font-semibold">SERVICES</th>
            <th className="py-3 px-4 font-semibold">ACCOUNT OWNER</th>
            <th className="py-3 px-4 font-semibold">PROJECTS</th>
            <th className="py-3 px-4 font-semibold">RELATIONSHIP</th>
            <th className="py-3 px-4 font-semibold">NEXT ACTION</th>
            <th className="py-3 px-4 font-semibold text-right">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {clients.map((client) => {
            const primaryContact = client.contacts.find((c) => c.is_primary) || client.contacts[0];
            const activeProjectsCount = client.projects.filter((p) => p.status === 'ACTIVE' || p.status === 'IN_PROGRESS').length;

            return (
              <tr
                key={client.id}
                onClick={() => onOpenClient(client)}
                className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
              >
                {/* CLIENT */}
                <td className="py-3.5 px-4 font-mono">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#0099FF] bg-[#0099FF]/10 px-1.5 py-0.5 rounded-[2px] border border-[#0099FF]/20 font-bold">
                        {client.id}
                      </span>
                      {client.source_prospect_id && (
                        <span className="text-[9px] text-white/40 hover:text-white/80" title={`Converted from ${client.source_prospect_id}`}>
                          ← {client.source_prospect_id}
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-white text-sm group-hover:text-[#0099FF] transition-colors flex items-center gap-1.5">
                      <span>{client.business_name}</span>
                    </div>
                    {primaryContact && (
                      <div className="text-[11px] text-white/50">
                        {primaryContact.name} • <span className="text-white/40">{primaryContact.role}</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* INDUSTRY */}
                <td className="py-3.5 px-4">
                  <span className="text-white/80 font-medium">{client.industry}</span>
                </td>

                {/* BUSINESS MODEL */}
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 bg-white/5 text-white/70 border border-white/10 rounded-[2px] text-[10px] uppercase">
                    {client.business_model}
                  </span>
                </td>

                {/* SERVICES */}
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {client.services.slice(0, 2).map((srv) => (
                      <span
                        key={srv.id}
                        className="px-1.5 py-0.5 bg-white/5 text-white/80 border border-white/10 rounded-[2px] text-[10px] truncate max-w-[130px]"
                      >
                        {srv.name}
                      </span>
                    ))}
                    {client.services.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-white/10 text-white/50 rounded-[2px] text-[9px]">
                        +{client.services.length - 2} more
                      </span>
                    )}
                  </div>
                </td>

                {/* ACCOUNT OWNER */}
                <td className="py-3.5 px-4 text-white/80 font-medium">
                  {client.account_owner}
                </td>

                {/* PROJECTS */}
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] text-[10px] font-bold">
                    {activeProjectsCount} ACTIVE
                  </span>
                </td>

                {/* RELATIONSHIP STATUS */}
                <td className="py-3.5 px-4">
                  {getStatusBadge(client.status)}
                </td>

                {/* NEXT ACTION */}
                <td className="py-3.5 px-4">
                  <div className="space-y-0.5 max-w-xs">
                    <div className="text-white text-[11px] truncate font-medium">
                      {client.next_action.title}
                    </div>
                    <div className="text-[10px] text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/30" />
                      <span>{client.next_action.due_date}</span>
                    </div>
                  </div>
                </td>

                {/* ACTION */}
                <td className="py-3.5 px-4 text-right">
                  <span className="text-[#0099FF] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 text-[11px] font-bold">
                    <span>360° Record</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
