import React from 'react';
import { Client } from '../../../types/clients';
import { Building2, Globe, Calendar, User, ShieldCheck, Clock, ExternalLink, Layers, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';

interface ClientOverviewProps {
  client: Client;
  onOpenSourceRequest?: (requestCode: string) => void;
  onOpenSourceProspect?: (prospectId: string) => void;
}

export const ClientOverview: React.FC<ClientOverviewProps> = ({
  client,
  onOpenSourceRequest,
  onOpenSourceProspect,
}) => {
  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'HEALTHY':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ACCOUNT HEALTH: HEALTHY</span>
          </div>
        );
      case 'ATTENTION':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>ACCOUNT HEALTH: ATTENTION REQUIRED</span>
          </div>
        );
      case 'AT_RISK':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>ACCOUNT HEALTH: AT RISK</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-white/10 border border-white/20 text-white/60 font-bold text-xs">
            <span>ACCOUNT HEALTH: {health}</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Banner: Account Health & Next Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Health Panel */}
        <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center justify-between">
            {getHealthBadge(client.health)}
            <span className="text-[10px] text-white/40 uppercase">Operational Status</span>
          </div>

          {client.health_reason ? (
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-[2px] text-amber-300 text-xs">
              <strong className="block uppercase text-[10px] text-amber-400">Attention Reason:</strong>
              {client.health_reason}
            </div>
          ) : (
            <p className="text-white/60 text-xs">
              Account operating smoothly. All assigned services and active projects are progressing on schedule.
            </p>
          )}

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/50">
            <span>Client Since: <strong className="text-white">{client.client_since}</strong></span>
            <span>Account Owner: <strong className="text-white">{client.account_owner}</strong></span>
          </div>
        </div>

        {/* Next Action Card */}
        <div className="p-4 bg-[#0A0A0C] border border-[#0099FF]/30 rounded-[2px] space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#0099FF]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded-[2px] uppercase">
              NEXT ACCOUNT MILESTONE
            </span>
            <span className="text-[10px] text-white/40 flex items-center gap-1">
              <Clock className="w-3 h-3 text-white/30" />
              Due: {client.next_action.due_date}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">{client.next_action.title}</h4>
            <p className="text-white/50 text-xs mt-1">
              Assigned Owner: <span className="text-white font-medium">{client.next_action.owner}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Business Context & Origin Lineage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Business Profile & Primary Objective */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0099FF]" />
              <span>COMMERCIAL BUSINESS PROFILE</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-white/40 block uppercase">Industry</span>
                <span className="text-white font-bold">{client.industry}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase">Business Model</span>
                <span className="text-white font-bold">{client.business_model}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase">Company Size</span>
                <span className="text-white">{client.company_size}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase">Primary Market</span>
                <span className="text-white">{client.primary_market}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase">Markets Served</span>
                <span className="text-white">{client.markets_served}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase">Website</span>
                <a
                  href={client.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0099FF] hover:underline flex items-center gap-1 font-mono truncate"
                >
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="text-[10px] text-white/40 uppercase font-semibold block">Business Overview:</span>
              <p className="text-white/80 leading-relaxed text-xs">{client.description}</p>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="text-[10px] text-white/40 uppercase font-semibold block">Primary Growth Objective:</span>
              <p className="text-white/80 leading-relaxed text-xs">{client.primary_objective}</p>
            </div>
          </div>

          {/* Platform Stack */}
          <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0099FF]" />
              <span>CONNECTED PLATFORM STACK</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {client.platforms.map((plat) => (
                <div
                  key={plat.name}
                  className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{plat.name}</div>
                    <div className="text-[9px] text-white/40 uppercase">{plat.category}</div>
                  </div>
                  {plat.status === 'CONNECTED' ? (
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-[2px] text-[9px] font-bold">
                      CONNECTED
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-[2px] text-[9px] font-bold">
                      PENDING
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Lineage & Ownership */}
        <div className="space-y-6">
          {/* Data Lineage Box */}
          <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0099FF]" />
              <span>CRM ORIGIN LINEAGE</span>
            </h3>

            <div className="space-y-3 text-xs">
              {/* Client ID */}
              <div className="p-2.5 bg-[#050505] border border-white/10 rounded-[2px] space-y-0.5">
                <span className="text-[9px] text-white/40 uppercase block">ACTIVE CLIENT RECORD</span>
                <span className="text-[#0099FF] font-bold text-sm">{client.id}</span>
              </div>

              {/* Source Prospect */}
              <div className="p-2.5 bg-[#050505] border border-white/10 rounded-[2px] space-y-0.5">
                <span className="text-[9px] text-white/40 uppercase block">SOURCE PROSPECT RECORD</span>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{client.source_prospect_id || 'N/A'}</span>
                  {client.source_prospect_id && onOpenSourceProspect && (
                    <button
                      onClick={() => onOpenSourceProspect(client.source_prospect_id!)}
                      className="text-[#0099FF] hover:underline text-[10px]"
                    >
                      View Prospect →
                    </button>
                  )}
                </div>
              </div>

              {/* Source Request */}
              <div className="p-2.5 bg-[#050505] border border-white/10 rounded-[2px] space-y-0.5">
                <span className="text-[9px] text-white/40 uppercase block">ORIGINAL SOURCE REQUEST</span>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{client.source_request_id || 'N/A'}</span>
                  {client.source_request_id && onOpenSourceRequest && (
                    <button
                      onClick={() => onOpenSourceRequest(client.source_request_id!)}
                      className="text-[#0099FF] hover:underline text-[10px]"
                    >
                      View Request →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Ownership & Team */}
          <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              MAGNIAR ACCOUNT TEAM
            </h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-white/40 block uppercase">Primary Account Owner:</span>
                <span className="text-white font-bold text-sm">{client.account_owner}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block uppercase">Assigned Service Units:</span>
                <span className="text-white/80">
                  Performance Media • Commerce Development • Strategy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
