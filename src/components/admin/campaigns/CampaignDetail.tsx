import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Layers,
  Users,
  Compass,
  Link,
  Plus,
  Play,
  Pause,
  Copy,
  Archive,
  Edit,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Target,
  Sparkles,
  Database,
  BarChart2,
  FileText,
  Clock,
  Shield,
  CheckSquare,
  Globe,
  Radio,
  Cpu,
  Zap,
} from 'lucide-react';
import { Campaign, LaunchChecklistItem, CampaignAdGroup, CampaignAd } from '../../../types/campaigns';
import { campaignService } from '../../../services/campaignService';
import { AdminStatusBadge } from '../AdminStatusBadge';

interface CampaignDetailProps {
  campaign: Campaign;
  onBack: () => void;
  onUpdateCampaign: (updated: Campaign) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  onOpenPauseModal: () => void;
}

export const CampaignDetail: React.FC<CampaignDetailProps> = ({
  campaign,
  onBack,
  onUpdateCampaign,
  onTriggerToast,
  onOpenPauseModal,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'OVERVIEW'
    | 'AUDIENCE'
    | 'BUDGET'
    | 'AD_GROUPS'
    | 'CREATIVE_MATRIX'
    | 'LANDING_PAGE'
    | 'EXPERIMENTS'
    | 'PERFORMANCE'
    | 'CHECKLIST'
    | 'ACTIVITY'
  >('OVERVIEW');

  const [newNoteText, setNewNoteText] = useState<string>('');
  const [showAddAdGroup, setShowAddAdGroup] = useState<boolean>(false);
  const [newAdGroupName, setNewAdGroupName] = useState<string>('');
  const [newAdGroupAudience, setNewAdGroupAudience] = useState<string>('');

  const [showAddAd, setShowAddAd] = useState<boolean>(false);
  const [newAdName, setNewAdName] = useState<string>('');
  const [newAdAngle, setNewAdAngle] = useState<string>('PROBLEM / SOLUTION');

  // Handle Note Submission
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const updated = campaignService.addNote(campaign.id, newNoteText, 'Marcus Vance');
    if (updated) {
      onUpdateCampaign(updated);
      setNewNoteText('');
      onTriggerToast('success', 'Note Added', 'Internal campaign note logged.');
    }
  };

  // Handle Checklist Status Toggle
  const handleToggleChecklist = (itemId: string, currentStatus: LaunchChecklistItem['status']) => {
    const nextStatus: LaunchChecklistItem['status'] =
      currentStatus === 'CHECKED' ? 'PENDING' : 'CHECKED';
    const updated = campaignService.updateChecklist(campaign.id, itemId, nextStatus);
    if (updated) {
      onUpdateCampaign(updated);
      onTriggerToast('info', 'Checklist Updated', 'Launch gate item state updated.');
    }
  };

  // Handle Add Ad Group
  const handleAddAdGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdGroupName.trim()) return;
    const updated = campaignService.addAdGroup(campaign.id, {
      name: newAdGroupName,
      audience_name: newAdGroupAudience || 'Broad Prospecting Segment',
      placement: 'AUTOMATIC',
      optimization_event: 'PURCHASE',
      budget_allocation: '$200 / day',
    });
    if (updated) {
      onUpdateCampaign(updated);
      setNewAdGroupName('');
      setNewAdGroupAudience('');
      setShowAddAdGroup(false);
      onTriggerToast('success', 'Ad Group Created', 'New ad group segment added to campaign.');
    }
  };

  // Handle Add Ad
  const handleAddAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdName.trim()) return;
    const updated = campaignService.addAd(campaign.id, {
      name: newAdName,
      angle: newAdAngle as any,
      creative_type: 'VIDEO',
      cta: 'SHOP NOW',
      status: 'DRAFT',
    });
    if (updated) {
      onUpdateCampaign(updated);
      setNewAdName('');
      setShowAddAd(false);
      onTriggerToast('success', 'Creative Ad Created', 'New ad creative added in draft state.');
    }
  };

  // Duplicate Campaign
  const handleDuplicate = () => {
    const duplicated = campaignService.duplicateCampaign(campaign.id);
    if (duplicated) {
      onTriggerToast('success', 'Campaign Duplicated', `Created copy: ${duplicated.id}`);
    }
  };

  // Archive Campaign
  const handleArchive = () => {
    const archived = campaignService.archiveCampaign(campaign.id);
    if (archived) {
      onUpdateCampaign(archived);
      onTriggerToast('info', 'Campaign Archived', 'Campaign moved to archived status.');
    }
  };

  // Resume Campaign
  const handleResume = () => {
    const resumed = campaignService.resumeCampaign(campaign.id);
    if (resumed) {
      onUpdateCampaign(resumed);
      onTriggerToast('success', 'Campaign Resumed', 'Campaign transitioned to ACTIVE.');
    }
  };

  return (
    <div className="space-[#0A0A0A] text-white font-mono space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0099FF] hover:text-[#0088EE] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO CAMPAIGNS DIRECTORY
        </button>

        {/* Relationship Hierarchy Breadcrumb */}
        <div className="p-3 bg-[#0A0A0A] border border-white/10 rounded-sm flex items-center flex-wrap gap-2 text-xs text-white/70">
          <span className="font-bold text-white uppercase">{campaign.client_business_name}</span>
          <span className="text-white/30">/</span>
          <span className="text-white/80">{campaign.project_name}</span>
          <span className="text-white/30">/</span>
          <span className="text-[#0099FF] font-semibold">{campaign.strategy_name}</span>
          <span className="text-white/30">/</span>
          <span className="bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 px-2 py-0.5 rounded-[2px] font-bold text-[10px]">
            {campaign.channel}
          </span>
          <span className="text-white/30">/</span>
          <span className="text-white font-bold">{campaign.id}</span>
        </div>

        {/* Main Title & Action Bar */}
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center flex-wrap gap-2">
                <span className="font-mono text-xs text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-2 py-0.5 rounded-[2px] font-bold">
                  {campaign.id}
                </span>
                <AdminStatusBadge status={campaign.status} />
                <span className="text-[10px] bg-white/10 text-white/80 border border-white/20 px-2 py-0.5 rounded-[2px] font-bold uppercase">
                  {campaign.campaign_type}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-[2px] font-bold uppercase border ${
                    campaign.health === 'ON TRACK'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : campaign.health === 'ATTENTION'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  HEALTH: {campaign.health}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase">
                {campaign.name}
              </h1>
              <p className="text-xs text-white/60 leading-relaxed max-w-3xl">
                {campaign.campaign_objective_description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center flex-wrap gap-2 shrink-0">
              {campaign.status === 'PAUSED' ? (
                <button
                  onClick={handleResume}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-sm flex items-center gap-2 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  RESUME CAMPAIGN
                </button>
              ) : (
                <button
                  onClick={onOpenPauseModal}
                  className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-sm flex items-center gap-2 transition-colors"
                >
                  <Pause className="w-3.5 h-3.5" />
                  PAUSE CAMPAIGN
                </button>
              )}

              <button
                onClick={handleDuplicate}
                className="px-3.5 py-2 bg-[#111111] border border-white/10 hover:border-white/30 text-white text-xs font-bold rounded-sm flex items-center gap-2 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-white/60" />
                DUPLICATE
              </button>

              <button
                onClick={handleArchive}
                className="px-3 py-2 bg-[#111111] border border-white/10 hover:border-rose-500/40 text-white/70 hover:text-rose-400 text-xs font-bold rounded-sm flex items-center gap-2 transition-colors"
              >
                <Archive className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Prominent Next Action Banner */}
          <div className="p-4 bg-[#050505] border border-[#0099FF]/30 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#0099FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#0099FF] font-bold uppercase tracking-wider block">
                  PROMINENT NEXT ACTION
                </span>
                <p className="text-xs font-bold text-white">{campaign.next_action.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/60 shrink-0">
              <div>
                <span className="text-[10px] text-white/40 uppercase block">OWNER</span>
                <span className="font-bold text-white">{campaign.next_action.owner}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase block">DUE DATE</span>
                <span className="font-bold text-[#0099FF]">{campaign.next_action.due_date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10 flex items-center overflow-x-auto gap-1 bg-[#050505] p-1 rounded-sm">
        {[
          { id: 'OVERVIEW', label: 'OVERVIEW & STRATEGY' },
          { id: 'AUDIENCE', label: 'AUDIENCE & TARGETING' },
          { id: 'BUDGET', label: 'BUDGET & PACING' },
          { id: 'AD_GROUPS', label: `AD GROUPS (${campaign.ad_groups.length})` },
          { id: 'CREATIVE_MATRIX', label: `CREATIVE MATRIX (${campaign.creative_matrix.length})` },
          { id: 'LANDING_PAGE', label: 'LANDING PAGE & UTM' },
          { id: 'EXPERIMENTS', label: `EXPERIMENTS (${campaign.experiments.length})` },
          { id: 'CHECKLIST', label: 'LAUNCH CHECKLIST' },
          { id: 'PERFORMANCE', label: 'PERFORMANCE DATA' },
          { id: 'ACTIVITY', label: 'TIMELINE & NOTES' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-bold whitespace-nowrap rounded-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-[#0099FF] text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}

      {/* 01. OVERVIEW & STRATEGY */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Strategic Role & Alignment */}
            <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0099FF]" />
                STRATEGIC ROLE & OBJECTIVE LINK
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-white/50 text-[10px] block uppercase">STRATEGIC ROLE</span>
                  <p className="text-white leading-relaxed mt-0.5">{campaign.strategic_role}</p>
                </div>
                <div>
                  <span className="text-white/50 text-[10px] block uppercase">STRATEGY OBJECTIVE LINK</span>
                  <p className="text-[#0099FF] font-bold mt-0.5">{campaign.strategic_objective_link}</p>
                </div>
                <div>
                  <span className="text-white/50 text-[10px] block uppercase">PARENT STRATEGY ENTITY</span>
                  <p className="text-white font-bold mt-0.5">
                    {campaign.strategy_name} ({campaign.strategy_id})
                  </p>
                </div>
              </div>
            </div>

            {/* Campaign Timeline & Phases */}
            <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0099FF]" />
                CAMPAIGN TIMELINE & OPERATIONAL PHASE
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#050505] p-4 border border-white/10 rounded-sm text-xs">
                <div>
                  <span className="text-white/40 text-[10px] block uppercase">CURRENT PHASE</span>
                  <span className="text-[#0099FF] font-bold uppercase">{campaign.current_phase}</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] block uppercase">START DATE</span>
                  <span className="text-white font-bold">{campaign.start_date}</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] block uppercase">END DATE</span>
                  <span className="text-white font-bold">{campaign.end_date}</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] block uppercase">NEXT REVIEW</span>
                  <span className="text-white font-bold">{campaign.next_review_date}</span>
                </div>
              </div>
            </div>

            {/* Blockers & Issues */}
            {campaign.blockers.length > 0 && (
              <div className="bg-[#0A0A0A] border border-rose-500/30 p-5 rounded-sm space-y-3">
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  ACTIVE OPERATIONAL BLOCKERS ({campaign.blockers.length})
                </h3>
                <div className="space-y-2">
                  {campaign.blockers.map((b) => (
                    <div key={b.id} className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-sm text-xs space-y-1">
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded-[2px] uppercase">
                        {b.category}
                      </span>
                      <p className="text-rose-200 mt-1">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Team & Relationship Map */}
          <div className="space-y-6">
            {/* Team Roles */}
            <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0099FF]" />
                CAMPAIGN TEAM & GOVERNANCE
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">CAMPAIGN OWNER</span>
                  <span className="font-bold text-white">{campaign.team.campaign_owner}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">STRATEGY LEAD</span>
                  <span className="font-bold text-white">{campaign.team.strategy_lead}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">PERFORMANCE LEAD</span>
                  <span className="font-bold text-white">{campaign.team.performance_lead}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">CREATIVE LEAD</span>
                  <span className="font-bold text-white">{campaign.team.creative_lead}</span>
                </div>
                <div>
                  <span className="text-white/50 text-[10px] block uppercase mb-1">CLIENT STAKEHOLDERS</span>
                  <div className="flex flex-wrap gap-1">
                    {campaign.team.client_stakeholders.map((s) => (
                      <span key={s} className="bg-white/5 text-white/80 text-[10px] px-2 py-0.5 rounded-[2px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Relationship Tree */}
            <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0099FF]" />
                RELATIONSHIP HIERARCHY TREE
              </h3>
              <div className="space-y-2 text-[11px] font-mono bg-[#050505] p-3 border border-white/5 rounded-sm">
                <div className="text-white/60">CLIENT: <span className="text-white font-bold">{campaign.client_business_name}</span></div>
                <div className="pl-3 text-white/60">└─ PROJECT: <span className="text-white font-bold">{campaign.project_name}</span></div>
                <div className="pl-6 text-white/60">└─ STRATEGY: <span className="text-[#0099FF] font-bold">{campaign.strategy_name}</span></div>
                <div className="pl-9 text-white/60">└─ CHANNEL: <span className="text-white font-bold">{campaign.channel}</span></div>
                <div className="pl-12 text-[#0099FF] font-bold">└─ CAMPAIGN: {campaign.id}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 02. AUDIENCE & TARGETING */}
      {activeTab === 'AUDIENCE' && (
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] text-[#0099FF] font-bold uppercase tracking-wider block">
                AUDIENCE ARCHITECTURE
              </span>
              <h3 className="text-sm font-bold text-white uppercase">{campaign.audience.name}</h3>
            </div>
            <span className="text-xs bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 px-2.5 py-1 rounded-[2px] font-bold uppercase">
              TYPE: {campaign.audience.type}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white/50 text-[10px] block uppercase">GEOGRAPHY / MARKET</span>
                <p className="text-white font-bold mt-0.5">{campaign.audience.geography}</p>
              </div>
              <div>
                <span className="text-white/50 text-[10px] block uppercase">BUYING INTENT LEVEL</span>
                <p className="text-white font-bold mt-0.5">{campaign.audience.intent_level}</p>
              </div>
              {campaign.audience.notes && (
                <div>
                  <span className="text-white/50 text-[10px] block uppercase">AUDIENCE CONFIGURATION NOTES</span>
                  <p className="text-white/80 leading-relaxed mt-0.5">{campaign.audience.notes}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-3">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                AUDIENCE EXCLUSIONS ({campaign.audience.exclusions.length})
              </span>
              <ul className="space-y-1 text-xs text-white/80">
                {campaign.audience.exclusions.map((ex, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0"></span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 03. BUDGET & PACING */}
      {activeTab === 'BUDGET' && (
        <div className="space-y-6">
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#0099FF] font-bold uppercase tracking-wider">
                    MEDIA SPEND ALLOCATION
                  </span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded-[2px] font-bold">
                    DEMO DATA
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white uppercase">{campaign.budget.monthly_amount}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/40 block uppercase">DAILY PACING</span>
                <span className="text-sm font-bold text-[#0099FF]">{campaign.budget.daily_amount}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-1 text-xs">
                <span className="text-white/40 text-[10px] uppercase block">PROJECT MEDIA BUDGET</span>
                <span className="font-bold text-white">{campaign.budget.project_media_budget_context}</span>
              </div>
              <div className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-1 text-xs">
                <span className="text-white/40 text-[10px] uppercase block">STRATEGY ALLOCATION</span>
                <span className="font-bold text-white">{campaign.budget.strategy_allocation_context}</span>
              </div>
              <div className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-1 text-xs">
                <span className="text-white/40 text-[10px] uppercase block">PACING MODE</span>
                <span className="font-bold text-[#0099FF]">{campaign.budget.pacing}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 04. AD GROUPS & ADS */}
      {activeTab === 'AD_GROUPS' && (
        <div className="space-y-6">
          <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                AD GROUPS / AD SETS ({campaign.ad_groups.length})
              </h3>
              <button
                onClick={() => setShowAddAdGroup(!showAddAdGroup)}
                className="px-3 py-1.5 bg-[#0099FF] text-white text-xs font-bold rounded-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                NEW AD GROUP
              </button>
            </div>

            {showAddAdGroup && (
              <form onSubmit={handleAddAdGroupSubmit} className="p-4 bg-[#050505] border border-[#0099FF]/30 rounded-sm space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ad Group Name"
                    value={newAdGroupName}
                    onChange={(e) => setNewAdGroupName(e.target.value)}
                    className="bg-[#111111] border border-white/10 rounded-sm p-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Audience Target Segment"
                    value={newAdGroupAudience}
                    onChange={(e) => setNewAdGroupAudience(e.target.value)}
                    className="bg-[#111111] border border-white/10 rounded-sm p-2 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAdGroup(false)}
                    className="px-3 py-1 text-xs border border-white/10 text-white/70"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-3 py-1 text-xs bg-[#0099FF] text-white font-bold">
                    Save Ad Group
                  </button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#050505] text-white/50 text-[10px] uppercase">
                    <th className="p-3">ID</th>
                    <th className="p-3">NAME</th>
                    <th className="p-3">AUDIENCE</th>
                    <th className="p-3">PLACEMENT</th>
                    <th className="p-3">EVENT</th>
                    <th className="p-3">BUDGET</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {campaign.ad_groups.map((ag) => (
                    <tr key={ag.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-mono text-[#0099FF]">{ag.id}</td>
                      <td className="p-3 font-bold text-white">{ag.name}</td>
                      <td className="p-3 text-white/80">{ag.audience_name}</td>
                      <td className="p-3 text-white/70">{ag.placement}</td>
                      <td className="p-3 text-white/70">{ag.optimization_event}</td>
                      <td className="p-3 text-white/80">{ag.budget_allocation}</td>
                      <td className="p-3">
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-[2px] font-bold">
                          {ag.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ads & Creative Sub-Section */}
          <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                ADS & CREATIVES ({campaign.ads.length})
              </h3>
              <button
                onClick={() => setShowAddAd(!showAddAd)}
                className="px-3 py-1.5 bg-[#0099FF] text-white text-xs font-bold rounded-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                ADD AD CREATIVE
              </button>
            </div>

            {showAddAd && (
              <form onSubmit={handleAddAdSubmit} className="p-4 bg-[#050505] border border-[#0099FF]/30 rounded-sm space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ad Creative Name"
                    value={newAdName}
                    onChange={(e) => setNewAdName(e.target.value)}
                    className="bg-[#111111] border border-white/10 rounded-sm p-2 text-xs text-white"
                  />
                  <select
                    value={newAdAngle}
                    onChange={(e) => setNewAdAngle(e.target.value)}
                    className="bg-[#111111] border border-white/10 rounded-sm p-2 text-xs text-white"
                  >
                    <option value="PROBLEM / SOLUTION">PROBLEM / SOLUTION</option>
                    <option value="PRODUCT DEMO">PRODUCT DEMO</option>
                    <option value="SOCIAL PROOF">SOCIAL PROOF</option>
                    <option value="FOUNDER">FOUNDER</option>
                    <option value="UGC">UGC</option>
                    <option value="OFFER">OFFER</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAd(false)}
                    className="px-3 py-1 text-xs border border-white/10 text-white/70"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-3 py-1 text-xs bg-[#0099FF] text-white font-bold">
                    Save Ad
                  </button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#050505] text-white/50 text-[10px] uppercase">
                    <th className="p-3">ID</th>
                    <th className="p-3">AD NAME</th>
                    <th className="p-3">CREATIVE TYPE</th>
                    <th className="p-3">ANGLE</th>
                    <th className="p-3">CTA</th>
                    <th className="p-3">REVIEW STATE</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {campaign.ads.map((ad) => (
                    <tr key={ad.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-mono text-[#0099FF]">{ad.id}</td>
                      <td className="p-3 font-bold text-white">{ad.name}</td>
                      <td className="p-3 text-white/70">{ad.creative_type}</td>
                      <td className="p-3 text-white/80">{ad.angle}</td>
                      <td className="p-3 font-bold text-[#0099FF]">{ad.cta}</td>
                      <td className="p-3">
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-[2px] font-bold">
                          {ad.review_status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] bg-white/10 text-white/80 border border-white/20 px-2 py-0.5 rounded-[2px] font-bold">
                          {ad.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 05. CREATIVE MATRIX */}
      {activeTab === 'CREATIVE_MATRIX' && (
        <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] text-[#0099FF] font-bold uppercase tracking-wider block">
                STRATEGIC CREATIVE ANGLE MATRIX
              </span>
              <h3 className="text-sm font-bold text-white uppercase">MESSAGING & FORMAT VARIATIONS</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#050505] text-white/50 text-[10px] uppercase">
                  <th className="p-3">ANGLE</th>
                  <th className="p-3">FORMAT</th>
                  <th className="p-3">TARGET AUDIENCE</th>
                  <th className="p-3">HOOK / OPENER</th>
                  <th className="p-3">OFFER</th>
                  <th className="p-3">CTA</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {campaign.creative_matrix.map((cm, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="p-3 font-bold text-[#0099FF]">{cm.angle}</td>
                    <td className="p-3 text-white/80">{cm.format}</td>
                    <td className="p-3 text-white/70">{cm.audience}</td>
                    <td className="p-3 text-white font-medium">{cm.hook}</td>
                    <td className="p-3 text-white/80">{cm.offer}</td>
                    <td className="p-3 text-white font-bold">{cm.cta}</td>
                    <td className="p-3">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-[2px] font-bold">
                        {cm.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 06. LANDING PAGE & UTM */}
      {activeTab === 'LANDING_PAGE' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Landing Page Quality Checks */}
          <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#0099FF]" />
              LANDING PAGE AUDIT & QUALITY CHECKS
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white/40 text-[10px] block uppercase">DESTINATION URL</span>
                <a
                  href={campaign.landing_page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0099FF] font-bold hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  {campaign.landing_page.url}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-white/40 text-[10px] block uppercase">QUALITY VERIFICATION CHECKS</span>
                {Object.entries(campaign.landing_page.quality_checks).map(([key, val]) => (
                  <div key={key} className="p-2.5 bg-[#050505] border border-white/5 rounded-sm flex items-center justify-between">
                    <span className="text-white/80 capitalize">{key.replace('_', ' ')}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-[2px] font-bold border ${
                        val === 'PASS'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : val === 'NEEDS ATTENTION'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-white/10 text-white/60 border-white/20'
                      }`}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* UTM Tracking Configuration */}
          <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#0099FF]" />
              UTM TRACKING & CONVERSION VERIFICATION
            </h3>

            <div className="space-y-2 text-xs bg-[#050505] p-3 border border-white/5 rounded-sm font-mono">
              <div><span className="text-white/40">utm_source:</span> <span className="text-white font-bold">{campaign.tracking.utm_source}</span></div>
              <div><span className="text-white/40">utm_medium:</span> <span className="text-white font-bold">{campaign.tracking.utm_medium}</span></div>
              <div><span className="text-white/40">utm_campaign:</span> <span className="text-white font-bold">{campaign.tracking.utm_campaign}</span></div>
              <div><span className="text-white/40">utm_content:</span> <span className="text-white font-bold">{campaign.tracking.utm_content}</span></div>
              <div><span className="text-white/40">utm_term:</span> <span className="text-white font-bold">{campaign.tracking.utm_term}</span></div>
            </div>

            <div className="p-3 bg-[#050505] border border-white/10 rounded-sm space-y-1 text-xs">
              <span className="text-white/40 text-[10px] block uppercase">PIXEL / CAPI VERIFICATION</span>
              <p className="text-emerald-400 font-bold">{campaign.tracking.pixel_capi_status}</p>
            </div>
          </div>
        </div>
      )}

      {/* 07. EXPERIMENTS */}
      {activeTab === 'EXPERIMENTS' && (
        <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            A/B EXPERIMENTATION ENGINE ({campaign.experiments.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaign.experiments.map((exp) => (
              <div key={exp.id} className="p-4 bg-[#050505] border border-white/10 rounded-sm space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#0099FF] font-bold">{exp.id}</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-[2px] font-bold">
                    {exp.status}
                  </span>
                </div>
                <h4 className="font-bold text-white">{exp.name}</h4>
                <p className="text-white/70 italic">"{exp.hypothesis}"</p>
                <div className="pt-2 border-t border-white/5 space-y-1 text-[11px]">
                  <div><span className="text-white/40">VARIABLE:</span> {exp.variable}</div>
                  <div><span className="text-white/40">CONTROL:</span> {exp.control_group}</div>
                  <div><span className="text-white/40">VARIANT:</span> {exp.variant_group}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 08. LAUNCH CHECKLIST */}
      {activeTab === 'CHECKLIST' && (
        <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#0099FF]" />
            GO-LIVE LAUNCH CHECKLIST & GATES
          </h3>

          <div className="space-y-2">
            {campaign.checklist.map((chk) => (
              <div
                key={chk.id}
                onClick={() => handleToggleChecklist(chk.id, chk.status)}
                className="p-3 bg-[#050505] border border-white/10 rounded-sm flex items-center justify-between hover:bg-white/[0.02] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                      chk.status === 'CHECKED'
                        ? 'bg-[#0099FF] border-[#0099FF] text-white'
                        : 'border-white/30 bg-transparent'
                    }`}
                  >
                    {chk.status === 'CHECKED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-xs font-medium ${chk.status === 'CHECKED' ? 'text-white line-through opacity-70' : 'text-white'}`}>
                    {chk.title}
                  </span>
                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-[2px] font-bold border ${
                    chk.status === 'CHECKED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : chk.status === 'BLOCKED'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {chk.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 09. PERFORMANCE DATA */}
      {activeTab === 'PERFORMANCE' && (
        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-sm text-center space-y-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
            <Radio className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              PERFORMANCE DATA SOURCES NOT CONNECTED
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              No live ad platform API connectors (Meta Marketing API, Google Ads API) are configured for this environment. In compliance with Chapter 20 data integrity rules, fake KPI metrics are strictly prohibited.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onTriggerToast('info', 'Connect Data Source', 'Ad platform OAuth connectors wizard initiated.')}
              className="px-5 py-2.5 bg-[#0099FF] hover:bg-[#0088EE] text-white text-xs font-bold rounded-sm inline-flex items-center gap-2 transition-colors"
            >
              CONFIGURE DATA SOURCES →
            </button>
          </div>
        </div>
      )}

      {/* 10. ACTIVITY & NOTES */}
      {activeTab === 'ACTIVITY' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes Log */}
          <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0099FF]" />
              INTERNAL CAMPAIGN NOTES
            </h3>

            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={2}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log internal note..."
                className="w-full bg-[#050505] border border-white/10 rounded-sm p-2.5 text-xs text-white focus:border-[#0099FF] outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#0099FF] text-white text-xs font-bold rounded-sm ml-auto block"
              >
                LOG NOTE
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {campaign.notes.map((n) => (
                <div key={n.id} className="p-3 bg-[#050505] border border-white/5 rounded-sm text-xs space-y-1">
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span className="font-bold text-white">{n.author}</span>
                    <span>{n.created_at}</span>
                  </div>
                  <p className="text-white/80">{n.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-sm space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0099FF]" />
              OPERATIONAL ACTIVITY LOG
            </h3>

            <div className="space-y-3">
              {campaign.activities.map((act) => (
                <div key={act.id} className="p-3 bg-[#050505] border border-white/5 rounded-sm text-xs space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-[#0099FF]">{act.title}</span>
                    <span className="text-white/40">{act.timestamp}</span>
                  </div>
                  <p className="text-white/80">{act.description}</p>
                  <span className="text-[10px] text-white/40 block">Author: {act.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
