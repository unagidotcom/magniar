import React, { useState } from 'react';
import { Client, ClientContact } from '../../../types/clients';
import { ClientOverview } from './ClientOverview';
import { ClientProjectsPreview } from './ClientProjectsPreview';
import { ClientServices } from './ClientServices';
import { ClientContacts } from './ClientContacts';
import { ClientDocuments } from './ClientDocuments';
import { ClientActivityTimeline } from './ClientActivityTimeline';
import { ClientNotes } from './ClientNotes';
import { ClientPortalPreview } from './ClientPortalPreview';
import { PauseClientModal } from './PauseClientModal';
import { ArchiveClientModal } from './ArchiveClientModal';
import { ArrowLeft, Building2, UserPlus, Briefcase, ShieldCheck, PauseCircle, Archive, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface ClientDetailProps {
  client: Client;
  onBack: () => void;
  onUpdateStatus: (id: string, status: any, reason?: string) => void;
  onAddContact: (clientId: string, contact: Omit<ClientContact, 'id'>) => void;
  onAddNote: (clientId: string, text: string) => void;
  onInvitePortal: (clientId: string) => void;
  onOpenSourceRequest?: (requestCode: string) => void;
  onOpenSourceProspect?: (prospectId: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

type TabType = 'OVERVIEW' | 'PROJECTS' | 'SERVICES' | 'CONTACTS' | 'DOCUMENTS' | 'ACTIVITY' | 'NOTES' | 'PORTAL';

export const ClientDetail: React.FC<ClientDetailProps> = ({
  client,
  onBack,
  onUpdateStatus,
  onAddContact,
  onAddNote,
  onInvitePortal,
  onOpenSourceRequest,
  onOpenSourceProspect,
  onTriggerToast,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('OVERVIEW');
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);

  const primaryContact = client.contacts.find((c) => c.is_primary) || client.contacts[0];

  const handlePauseConfirm = (reason: string) => {
    onUpdateStatus(client.id, 'PAUSED', reason);
    onTriggerToast('info', 'Client Paused', `${client.business_name} set to PAUSED status.`);
  };

  const handleArchiveConfirm = () => {
    onUpdateStatus(client.id, 'ARCHIVED');
    onTriggerToast('info', 'Client Archived', `${client.business_name} moved to archived directory.`);
  };

  const handleConfirmInvite = () => {
    onInvitePortal(client.id);
    onTriggerToast('success', 'Portal Invite Sent', `Invitation sent to ${primaryContact?.email || 'primary contact'}.`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2.5 py-1 rounded-[2px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
            ACTIVE CLIENT
          </span>
        );
      case 'ONBOARDING':
        return (
          <span className="px-2.5 py-1 rounded-[2px] bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 text-xs font-mono font-bold">
            ONBOARDING
          </span>
        );
      case 'ATTENTION':
        return (
          <span className="px-2.5 py-1 rounded-[2px] bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
            ATTENTION
          </span>
        );
      case 'PAUSED':
        return (
          <span className="px-2.5 py-1 rounded-[2px] bg-white/10 text-white/60 border border-white/20 text-xs font-mono font-bold">
            PAUSED
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="px-2.5 py-1 rounded-[2px] bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
            ARCHIVED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-[2px] bg-white/5 text-white/50 border border-white/10 text-xs font-mono font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Clients Directory</span>
        </button>

        {/* Client Record Header Box */}
        <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded-[2px] border border-[#0099FF]/30">
                  {client.id}
                </span>
                {getStatusBadge(client.status)}
                {client.source_prospect_id && (
                  <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-[2px] border border-white/10">
                    Source Prospect: {client.source_prospect_id}
                  </span>
                )}
                {client.source_request_id && (
                  <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-[2px] border border-white/10">
                    Source Request: {client.source_request_id}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-white tracking-tight">{client.business_name}</h1>

              <div className="flex items-center gap-4 text-xs text-white/60 flex-wrap">
                <span>Industry: <strong className="text-white">{client.industry}</strong></span>
                <span>•</span>
                <span>Model: <strong className="text-white">{client.business_model}</strong></span>
                <span>•</span>
                <span>Owner: <strong className="text-white">{client.account_owner}</strong></span>
                <span>•</span>
                <span>Client Since: <strong className="text-white">{client.client_since}</strong></span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('CONTACTS')}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[2px] flex items-center gap-1.5 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>+ Contact</span>
              </button>

              <button
                onClick={() => setActiveTab('PORTAL')}
                className="px-3 py-2 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 border border-[#0099FF]/30 text-[#0099FF] rounded-[2px] flex items-center gap-1.5 transition-colors font-bold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Portal Setup</span>
              </button>

              {client.status !== 'PAUSED' && (
                <button
                  onClick={() => setPauseModalOpen(true)}
                  className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-[2px] flex items-center gap-1.5 transition-colors"
                >
                  <PauseCircle className="w-3.5 h-3.5" />
                  <span>Pause Account</span>
                </button>
              )}

              {client.status !== 'ARCHIVED' && (
                <button
                  onClick={() => setArchiveModalOpen(true)}
                  className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-[2px] flex items-center gap-1.5 transition-colors"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 border-b border-white/10 overflow-x-auto pb-0">
        {[
          { id: 'OVERVIEW', label: 'OVERVIEW' },
          { id: 'PROJECTS', label: `PROJECTS (${client.projects.length})` },
          { id: 'SERVICES', label: `SERVICES (${client.services.length})` },
          { id: 'CONTACTS', label: `CONTACTS (${client.contacts.length})` },
          { id: 'DOCUMENTS', label: `DOCUMENTS (${client.documents.length})` },
          { id: 'ACTIVITY', label: `ACTIVITY (${client.activities.length})` },
          { id: 'NOTES', label: `NOTES (${client.notes.length})` },
          { id: 'PORTAL', label: 'PORTAL ACCESS' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-2.5 font-bold uppercase text-xs transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#0099FF] text-[#0099FF] bg-white/[0.02]'
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.01]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="pt-2">
        {activeTab === 'OVERVIEW' && (
          <ClientOverview
            client={client}
            onOpenSourceRequest={onOpenSourceRequest}
            onOpenSourceProspect={onOpenSourceProspect}
          />
        )}

        {activeTab === 'PROJECTS' && (
          <ClientProjectsPreview projects={client.projects} />
        )}

        {activeTab === 'SERVICES' && (
          <ClientServices services={client.services} />
        )}

        {activeTab === 'CONTACTS' && (
          <ClientContacts
            contacts={client.contacts}
            onAddContact={(contact) => onAddContact(client.id, contact)}
          />
        )}

        {activeTab === 'DOCUMENTS' && (
          <ClientDocuments documents={client.documents} onTriggerToast={onTriggerToast} />
        )}

        {activeTab === 'ACTIVITY' && (
          <ClientActivityTimeline activities={client.activities} />
        )}

        {activeTab === 'NOTES' && (
          <ClientNotes
            notes={client.notes}
            onAddNote={(text) => onAddNote(client.id, text)}
          />
        )}

        {activeTab === 'PORTAL' && (
          <ClientPortalPreview
            client={client}
            onConfirmInvite={handleConfirmInvite}
          />
        )}
      </div>

      {/* Modals */}
      <PauseClientModal
        isOpen={pauseModalOpen}
        onClose={() => setPauseModalOpen(false)}
        onConfirmPause={handlePauseConfirm}
        clientBusinessName={client.business_name}
      />

      <ArchiveClientModal
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        onConfirmArchive={handleArchiveConfirm}
        clientBusinessName={client.business_name}
      />
    </div>
  );
};
