import React, { useState, useEffect } from 'react';
import { Prospect, ProspectStage, LostReason, ProspectPriority } from '../../../types/prospects';
import { prospectService } from '../../../services/prospectService';
import { ProspectPipeline } from './ProspectPipeline';
import { ProspectTable } from './ProspectTable';
import { ProspectCard } from './ProspectCard';
import { ProspectDetail } from './ProspectDetail';
import { AddProspectModal } from './AddProspectModal';
import { ConvertClientModal } from './ConvertClientModal';
import { LostReasonModal } from './LostReasonModal';
import { AddNoteModal } from './AddNoteModal';
import { Chapter16DesignReview } from './Chapter16DesignReview';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminSkeletonTable } from '../AdminSkeleton';
import { AdminEmptyState } from '../AdminEmptyState';
import { AdminErrorState } from '../AdminErrorState';
import { Search, Filter, Plus, Download, RefreshCw, Layers, ShieldCheck, X } from 'lucide-react';

interface ProspectsPageProps {
  onNavigate?: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const ProspectsPage: React.FC<ProspectsPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
}) => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  
  // Filtering states
  const [activeStageFilter, setActiveStageFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [ownerFilter, setOwnerFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [convertModalProspect, setConvertModalProspect] = useState<Prospect | null>(null);
  const [lostModalProspect, setLostModalProspect] = useState<Prospect | null>(null);
  const [noteModalTarget, setNoteModalTarget] = useState<{ id: string; name: string } | null>(null);

  // Load data on mount / refresh
  const refreshData = () => {
    const list = prospectService.getProspects();
    setProspects(list);
    if (selectedProspect) {
      const updated = list.find((p) => p.id === selectedProspect.id);
      if (updated) setSelectedProspect(updated);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (simulatedState === 'skeleton') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <div className="h-10 bg-white/10 rounded w-1/3 animate-pulse" />
        <AdminSkeletonTable />
      </div>
    );
  }

  if (simulatedState === 'empty') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Prospects CRM Pipeline"
          subtitle="Active prospective clients undergoing discovery, scoping, and proposal negotiation."
          moduleCode="CRM-02 / PROSPECTS"
          primaryActionLabel="+ Add Prospect"
          onPrimaryAction={() => setAddModalOpen(true)}
        />
        <AdminEmptyState
          title="No Commercial Prospects Registered"
          description="There are currently no active qualified prospects in the pipeline."
          actionLabel="+ Add First Prospect"
          onAction={() => setAddModalOpen(true)}
        />
        <AddProspectModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={(data) => {
            const created = prospectService.createProspect(data);
            refreshData();
            onTriggerToast('success', 'Prospect Created', `Registered ${created.id} into CRM pipeline.`);
          }}
        />
      </div>
    );
  }

  if (simulatedState === 'error') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300 font-mono">
        <AdminPageHeader
          title="Prospects CRM Pipeline"
          subtitle="Active prospective clients undergoing discovery, scoping, and proposal negotiation."
          moduleCode="CRM-02 / PROSPECTS"
        />
        <AdminErrorState
          title="Failed to sync Prospects CRM dataset"
          message="Server returned status code 500 (CRM Pipeline Ledger Connection Timeout)."
          onRetry={() => {
            refreshData();
            onTriggerToast('info', 'Retrying Fetch', 'Re-syncing prospect ledger state...');
          }}
        />
      </div>
    );
  }

  // Stage counts for pipeline bar
  const stageCounts: Record<ProspectStage, number> = {
    QUALIFIED: prospects.filter((p) => p.stage === 'QUALIFIED').length,
    DISCOVERY: prospects.filter((p) => p.stage === 'DISCOVERY').length,
    PROPOSAL: prospects.filter((p) => p.stage === 'PROPOSAL').length,
    NEGOTIATION: prospects.filter((p) => p.stage === 'NEGOTIATION').length,
    WON: prospects.filter((p) => p.stage === 'WON').length,
    LOST: prospects.filter((p) => p.stage === 'LOST').length,
    NOT_A_FIT: prospects.filter((p) => p.stage === 'NOT_A_FIT').length,
  };

  // Unique owners for filter dropdown
  const uniqueOwners = Array.from(new Set(prospects.map((p) => p.owner))).filter(Boolean);

  // Filtered prospects
  const filteredProspects = prospects.filter((p) => {
    // Stage filter
    if (activeStageFilter !== 'ALL' && p.stage !== activeStageFilter) return false;

    // Owner filter
    if (ownerFilter !== 'ALL' && p.owner !== ownerFilter) return false;

    // Priority filter
    if (priorityFilter !== 'ALL' && p.priority !== priorityFilter) return false;

    // Search term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = p.business_name.toLowerCase().includes(q);
      const matchContact = p.contact_name.toLowerCase().includes(q);
      const matchEmail = p.email.toLowerCase().includes(q);
      const matchId = p.id.toLowerCase().includes(q);
      const matchRequest = p.source_request_code?.toLowerCase().includes(q) ?? false;
      const matchServices = p.services.some((s) => s.toLowerCase().includes(q));

      return matchName || matchContact || matchEmail || matchId || matchRequest || matchServices;
    }

    return true;
  });

  // Handlers
  const handleUpdateStage = (prospectId: string, stage: ProspectStage) => {
    prospectService.updateStage(prospectId, stage);
    refreshData();
  };

  const handleConfirmConvert = (prospect: Prospect) => {
    const res = prospectService.convertToClient(prospect.id);
    if (res) {
      refreshData();
      onTriggerToast(
        'success',
        'CLIENT CONVERTED!',
        `Converted ${prospect.business_name} to Client record ${res.clientId}.`
      );
    }
  };

  const handleConfirmLost = (prospect: Prospect, reason: LostReason, note: string) => {
    prospectService.markLost(prospect.id, reason, note);
    refreshData();
    onTriggerToast(
      'info',
      'Status Updated',
      `Marked ${prospect.business_name} as ${reason === 'NOT_A_FIT' ? 'NOT A FIT' : 'LOST'}.`
    );
  };

  const handleSaveNote = (noteText: string, visibility: 'INTERNAL' | 'PUBLIC') => {
    if (noteModalTarget) {
      prospectService.addNote(noteModalTarget.id, noteText, 'Kaelen Voss', visibility);
      refreshData();
      onTriggerToast('success', 'Note Logged', `Appended note to ${noteModalTarget.id} timeline.`);
    }
  };

  const handleToggleTask = (prospectId: string, taskId: string) => {
    prospectService.toggleTask(prospectId, taskId);
    refreshData();
    onTriggerToast('info', 'Task Updated', 'Action item status updated.');
  };

  const handleOpenSourceRequest = (requestCode: string) => {
    if (onNavigate) {
      onNavigate('requests');
      onTriggerToast('info', 'Navigated to Request', `Opened source request ${requestCode}`);
    } else {
      onTriggerToast('info', 'Source Request Link', `Linked Request Code: ${requestCode}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-mono">
      {/* Chapter 16 Design Review Collapsible Documentation */}
      <Chapter16DesignReview />

      {/* Main Detail View or List View */}
      {selectedProspect ? (
        <ProspectDetail
          prospect={selectedProspect}
          onBack={() => setSelectedProspect(null)}
          onOpenSourceRequest={handleOpenSourceRequest}
          onUpdateStage={handleUpdateStage}
          onConvertClient={(p) => setConvertModalProspect(p)}
          onMarkLost={(p) => setLostModalProspect(p)}
          onAddNote={(id) => {
            const p = prospects.find((item) => item.id === id);
            setNoteModalTarget({ id, name: p?.business_name || id });
          }}
          onToggleTask={handleToggleTask}
          onTriggerToast={onTriggerToast}
        />
      ) : (
        <div className="space-y-6">
          {/* Module Header */}
          <AdminPageHeader
            title="Prospects CRM Pipeline"
            subtitle="Qualified commercial opportunities undergoing discovery, scoping, proposal negotiation, and MSA execution."
            moduleCode="CRM-02 / PROSPECTS"
            primaryActionLabel="+ Add Prospect"
            onPrimaryAction={() => setAddModalOpen(true)}
            secondaryActionLabel="Export CRM CSV"
            onSecondaryAction={() => {
              onTriggerToast('success', 'CRM Export Completed', 'Downloaded prospects_pipeline_export.csv');
            }}
          />

          {/* Pipeline Stage Summary Bar */}
          <ProspectPipeline
            stageCounts={stageCounts}
            activeStageFilter={activeStageFilter}
            onSelectStage={(st) => setActiveStageFilter(st)}
          />

          {/* Filters & Search Control Bar */}
          <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex items-center gap-3 bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search prospects by company, contact, email, ID..."
                className="w-full bg-transparent font-mono text-xs text-white focus:outline-none placeholder:text-white/30"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-white/40 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Select Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Owner Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/40 uppercase">Owner:</span>
                <select
                  value={ownerFilter}
                  onChange={(e) => setOwnerFilter(e.target.value)}
                  className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] p-2 focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="ALL">All Owners</option>
                  {uniqueOwners.map((own) => (
                    <option key={own} value={own}>
                      {own}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-white/40 uppercase">Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] p-2 focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="HIGH">HIGH</option>
                  <option value="NORMAL">NORMAL</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>

              {/* Clear All Filters Button */}
              {(activeStageFilter !== 'ALL' || ownerFilter !== 'ALL' || priorityFilter !== 'ALL' || searchTerm !== '') && (
                <button
                  onClick={() => {
                    setActiveStageFilter('ALL');
                    setOwnerFilter('ALL');
                    setPriorityFilter('ALL');
                    setSearchTerm('');
                  }}
                  className="px-2.5 py-2 bg-white/5 hover:bg-white/10 text-[#0099FF] rounded-[2px] border border-white/10 text-[11px]"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Active Record Counter */}
          <div className="flex items-center justify-between text-xs text-white/50 px-1">
            <span>
              Showing <strong className="text-white">{filteredProspects.length}</strong> of{' '}
              <strong className="text-white">{prospects.length}</strong> prospects
              {activeStageFilter !== 'ALL' && ` in [${activeStageFilter}] stage`}
            </span>

            <button
              onClick={() => {
                refreshData();
                onTriggerToast('info', 'Refreshed Pipeline', 'Synced latest prospect dataset.');
              }}
              className="hover:text-white flex items-center gap-1 text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh</span>
            </button>
          </div>

          {/* List Views: Responsive Table for Desktop, Cards for Mobile */}
          {filteredProspects.length === 0 ? (
            <AdminEmptyState
              title="No Prospects Match Filter Criteria"
              description="Try clearing your search query or selecting a different pipeline stage filter."
              actionLabel="Clear All Filters"
              onAction={() => {
                setActiveStageFilter('ALL');
                setOwnerFilter('ALL');
                setPriorityFilter('ALL');
                setSearchTerm('');
              }}
            />
          ) : (
            <>
              {/* Desktop View Table (hidden on small screens) */}
              <div className="hidden md:block">
                <ProspectTable
                  prospects={filteredProspects}
                  onOpenProspect={(pro) => setSelectedProspect(pro)}
                  onOpenSourceRequest={handleOpenSourceRequest}
                />
              </div>

              {/* Mobile View Cards (hidden on medium & larger screens) */}
              <div className="block md:hidden space-y-3">
                {filteredProspects.map((pro) => (
                  <ProspectCard
                    key={pro.id}
                    prospect={pro}
                    onOpenProspect={(p) => setSelectedProspect(p)}
                    onOpenSourceRequest={handleOpenSourceRequest}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Modals */}
      <AddProspectModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={(data) => {
          const created = prospectService.createProspect(data);
          refreshData();
          onTriggerToast('success', 'PROSPECT CREATED', `Added ${created.business_name} (${created.id}) to CRM.`);
        }}
      />

      {convertModalProspect && (
        <ConvertClientModal
          isOpen={!!convertModalProspect}
          onClose={() => setConvertModalProspect(null)}
          prospect={convertModalProspect}
          onConfirmConvert={handleConfirmConvert}
        />
      )}

      {lostModalProspect && (
        <LostReasonModal
          isOpen={!!lostModalProspect}
          onClose={() => setLostModalProspect(null)}
          prospect={lostModalProspect}
          onConfirmLost={handleConfirmLost}
        />
      )}

      {noteModalTarget && (
        <AddNoteModal
          isOpen={!!noteModalTarget}
          onClose={() => setNoteModalTarget(null)}
          prospectId={noteModalTarget.id}
          businessName={noteModalTarget.name}
          onSaveNote={handleSaveNote}
        />
      )}
    </div>
  );
};
