import React, { useState } from 'react';
import { Client } from '../../../types/clients';
import { PortalInviteModal } from './PortalInviteModal';
import { ShieldCheck, Mail, Send, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';

interface ClientPortalPreviewProps {
  client: Client;
  onConfirmInvite: () => void;
}

export const ClientPortalPreview: React.FC<ClientPortalPreviewProps> = ({ client, onConfirmInvite }) => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const primaryContact = client.contacts.find((c) => c.is_primary) || client.contacts[0];

  const getPortalStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-[2px] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PORTAL ACCESS: ACTIVE</span>
          </span>
        );
      case 'INVITED':
        return (
          <span className="px-2.5 py-1 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 font-bold text-xs rounded-[2px] flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            <span>PORTAL INVITATION ISSUED</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-white/10 text-white/60 border border-white/20 font-bold text-xs rounded-[2px] flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            <span>PORTAL ACCESS: NOT INVITED</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-sm uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
              <span>CLIENT PORTAL INTEGRATION</span>
            </h3>
            <p className="text-white/40 text-[11px]">
              Client-facing portal controls for shared strategy roadmaps, reporting, and invoices.
            </p>
          </div>
          <div>{getPortalStatusBadge(client.portal_status)}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left info */}
          <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
            <h4 className="text-xs font-bold text-white uppercase">PORTAL PERMISSIONS & ACCESS</h4>
            <ul className="space-y-2 text-[11px] text-white/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
                <span>Approved project milestones & deliverable roadmaps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
                <span>Monthly performance reports & KPI analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
                <span>Client-visible strategy briefs & document downloads</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Client-visible invoice statements & payment status</span>
              </li>
            </ul>

            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-[2px] text-[10px] text-rose-300">
              <strong>SECURITY GUARDRAIL:</strong> Internal notes, private margin calculations, and internal team comments are strictly hidden from the client portal.
            </div>
          </div>

          {/* Right action */}
          <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase">INVITATION MANAGEMENT</h4>
              {client.portal_invited_at ? (
                <p className="text-[#0099FF] text-xs">
                  Invitation issued on <strong className="text-white">{client.portal_invited_at}</strong> to primary contact <span className="text-white">{primaryContact?.email}</span>.
                </p>
              ) : (
                <p className="text-white/60 text-xs">
                  This client has not been invited to the client portal yet.
                </p>
              )}
            </div>

            <button
              onClick={() => setInviteModalOpen(true)}
              className="w-full py-2.5 bg-[#0099FF] hover:bg-[#0099FF]/80 text-white font-bold rounded-[2px] flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{client.portal_status === 'NOT_INVITED' ? 'Send Client Portal Invite' : 'Re-send Portal Invitation'}</span>
            </button>
          </div>
        </div>
      </div>

      <PortalInviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onConfirmInvite={onConfirmInvite}
        clientBusinessName={client.business_name}
        primaryContactEmail={primaryContact?.email}
      />
    </div>
  );
};
