import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Layers,
  Radio,
  ArrowUpDown,
  AlertTriangle,
  Play,
  Pause,
  Copy,
  Archive,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Campaign, CampaignStatus, CampaignChannel, CampaignHealth } from '../../../types/campaigns';
import { campaignService } from '../../../services/campaignService';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { CampaignCreationModal } from './CampaignCreationModal';
import { CampaignPauseModal } from './CampaignPauseModal';
import { CampaignDetail } from './CampaignDetail';
import { CampaignDesignReview } from './CampaignDesignReview';

interface CampaignsPageProps {
  onNavigate: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const CampaignsPage: React.FC<CampaignsPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [channelFilter, setChannelFilter] = useState<string>('ALL');
  const [healthFilter, setHealthFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Modals
  const [isCreationModalOpen, setIsCreationModalOpen] = useState<boolean>(false);
  const [pauseModalCampaign, setPauseModalCampaign] = useState<Campaign | null>(null);

  // Load Campaigns
  const refreshCampaigns = () => {
    setCampaigns(campaignService.getCampaigns());
  };

  useEffect(() => {
    refreshCampaigns();
  }, []);

  // Handle Campaign Creation
  const handleCreateCampaign = (newCampaignData: Partial<Campaign>) => {
    const created = campaignService.createCampaign(newCampaignData);
    refreshCampaigns();
    onTriggerToast('success', 'Campaign Created', `New campaign ${created.id} initialized.`);
  };

  // Handle Campaign Update
  const handleUpdateCampaign = (updated: Campaign) => {
    refreshCampaigns();
  };

  // Handle Pause Confirm
  const handleConfirmPause = (reason: string, expectedResumeDate?: string) => {
    if (!pauseModalCampaign) return;
    const updated = campaignService.pauseCampaign(pauseModalCampaign.id, reason, expectedResumeDate);
    if (updated) {
      refreshCampaigns();
      onTriggerToast('info', 'Campaign Paused', `${pauseModalCampaign.id} operation paused.`);
    }
  };

  // Filter Logic
  const filteredCampaigns = campaigns.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (channelFilter !== 'ALL' && c.channel !== channelFilter) return false;
    if (healthFilter !== 'ALL' && c.health !== healthFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchId = c.id.toLowerCase().includes(q);
      const matchClient = c.client_business_name.toLowerCase().includes(q);
      const matchStrategy = c.strategy_name.toLowerCase().includes(q);
      const matchChannel = c.channel.toLowerCase().includes(q);
      const matchOwner = c.team.campaign_owner.toLowerCase().includes(q);
      return matchName || matchId || matchClient || matchStrategy || matchChannel || matchOwner;
    }

    return true;
  });

  // Calculate Summary Metrics
  const activeCount = campaigns.filter((c) => c.status === 'ACTIVE').length;
  const inReviewCount = campaigns.filter((c) => c.status === 'IN REVIEW' || c.status === 'PLANNED').length;
  const pausedCount = campaigns.filter((c) => c.status === 'PAUSED').length;
  const totalCampaigns = campaigns.length;

  // Selected Campaign Detail View
  const activeCampaign = selectedCampaignId
    ? campaigns.find((c) => c.id === selectedCampaignId)
    : null;

  if (activeCampaign) {
    return (
      <CampaignDetail
        campaign={activeCampaign}
        onBack={() => setSelectedCampaignId(null)}
        onUpdateCampaign={handleUpdateCampaign}
        onTriggerToast={onTriggerToast}
        onOpenPauseModal={() => setPauseModalCampaign(activeCampaign)}
      />
    );
  }

  return (
    <div className="space-y-8 font-mono antialiased text-white">
      {/* Admin Header */}
      <AdminPageHeader
        title="CAMPAIGN & CHANNEL OPERATIONS"
        subtext="Operational execution layer turning approved strategies into multi-channel marketing campaigns."
        actions={
          <button
            onClick={() => setIsCreationModalOpen(true)}
            className="px-4 py-2.5 bg-[#0099FF] hover:bg-[#0088EE] text-white text-xs font-bold rounded-sm flex items-center gap-2 transition-colors shadow-lg shadow-[#0099FF]/20"
          >
            <Plus className="w-4 h-4" />
            NEW CAMPAIGN
          </button>
        }
      />

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase">
            <span>ACTIVE CAMPAIGNS</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{activeCount}</div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase">LIVE EXECUTION</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase">
            <span>PLANNED / IN REVIEW</span>
            <Clock className="w-4 h-4 text-[#0099FF]" />
          </div>
          <div className="text-2xl font-bold text-white">{inReviewCount}</div>
          <span className="text-[10px] text-[#0099FF] font-bold uppercase">LAUNCH PREPARATION</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase">
            <span>PAUSED / ATTENTION</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{pausedCount}</div>
          <span className="text-[10px] text-amber-400 font-bold uppercase">OPERATIONAL HOLD</span>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase">
            <span>TOTAL CAMPAIGNS</span>
            <Radio className="w-4 h-4 text-[#0099FF]" />
          </div>
          <div className="text-2xl font-bold text-white">{totalCampaigns}</div>
          <span className="text-[10px] text-white/50 uppercase">ALL REGIONAL ENTITIES</span>
        </div>
      </div>

      {/* Channel Directory Preview Chips */}
      <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span className="font-bold uppercase tracking-wider text-white">OPERATIONAL CHANNELS</span>
          <span className="text-[10px] text-[#0099FF] font-bold">CLICK TO FILTER BY CHANNEL</span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {[
            'ALL',
            'META ADS',
            'GOOGLE ADS',
            'TIKTOK ADS',
            'LINKEDIN ADS',
            'GOOGLE SHOPPING',
          ].map((ch) => {
            const count =
              ch === 'ALL'
                ? campaigns.length
                : campaigns.filter((c) => c.channel === ch).length;

            return (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-colors flex items-center gap-2 ${
                  channelFilter === ch
                    ? 'bg-[#0099FF] text-white border-[#0099FF]'
                    : 'bg-[#050505] text-white/70 border-white/10 hover:border-white/30'
                }`}
              >
                <span>{ch}</span>
                <span className="bg-black/30 px-1.5 py-0.5 rounded-[2px] text-[10px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="SEARCH CAMPAIGNS, CLIENTS, STRATEGIES, CHANNELS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-sm pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#0099FF] outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
          >
            <option value="ALL">STATUS: ALL</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PLANNED">PLANNED</option>
            <option value="IN REVIEW">IN REVIEW</option>
            <option value="PAUSED">PAUSED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>

          <select
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value)}
            className="bg-[#050505] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none hidden lg:block"
          >
            <option value="ALL">HEALTH: ALL</option>
            <option value="ON TRACK">ON TRACK</option>
            <option value="ATTENTION">ATTENTION</option>
            <option value="AT RISK">AT RISK</option>
            <option value="BLOCKED">BLOCKED</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-white/10 p-1 rounded-sm bg-[#050505] self-end md:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-sm transition-colors ${
              viewMode === 'table' ? 'bg-[#0099FF] text-white' : 'text-white/40 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded-sm transition-colors ${
              viewMode === 'cards' ? 'bg-[#0099FF] text-white' : 'text-white/40 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Campaign List / Table */}
      {filteredCampaigns.length === 0 ? (
        <div className="p-12 bg-[#0A0A0A] border border-white/10 rounded-sm text-center space-y-3">
          <Filter className="w-8 h-8 text-white/20 mx-auto" />
          <h3 className="text-sm font-bold text-white uppercase">NO CAMPAIGNS FOUND</h3>
          <p className="text-xs text-white/50 max-w-sm mx-auto">
            No active campaigns match your search criteria. Try resetting filters or create a new campaign.
          </p>
        </div>
      ) : viewMode === 'table' ? (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#050505] text-white/50 text-[10px] uppercase">
                  <th className="p-3.5">CAMPAIGN ID / NAME</th>
                  <th className="p-3.5">CLIENT & PROJECT</th>
                  <th className="p-3.5">CHANNEL</th>
                  <th className="p-3.5">TYPE & OBJECTIVE</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5">HEALTH</th>
                  <th className="p-3.5">
                    MEDIA SPEND{' '}
                    <span className="text-[8px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 py-0.2 rounded-[2px]">
                      DEMO
                    </span>
                  </th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCampaigns.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCampaignId(c.id)}
                    className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="p-3.5 space-y-0.5">
                      <span className="font-mono text-[#0099FF] text-[11px] font-bold block">
                        {c.id}
                      </span>
                      <span className="font-bold text-white group-hover:text-[#0099FF] transition-colors block">
                        {c.name}
                      </span>
                    </td>

                    <td className="p-3.5 space-y-0.5">
                      <span className="text-white font-bold block">{c.client_business_name}</span>
                      <span className="text-white/50 text-[10px] block">{c.project_name}</span>
                    </td>

                    <td className="p-3.5">
                      <span className="bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 px-2 py-0.5 rounded-[2px] font-bold text-[10px]">
                        {c.channel}
                      </span>
                    </td>

                    <td className="p-3.5 space-y-0.5 text-white/80">
                      <span className="text-[10px] font-bold uppercase block">{c.campaign_type}</span>
                      <span className="text-white/50 text-[10px] block">{c.objective}</span>
                    </td>

                    <td className="p-3.5">
                      <AdminStatusBadge status={c.status} />
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-[2px] font-bold uppercase border ${
                          c.health === 'ON TRACK'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : c.health === 'ATTENTION'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {c.health}
                      </span>
                    </td>

                    <td className="p-3.5 text-white font-bold">{c.budget.monthly_amount}</td>

                    <td className="p-3.5 text-right">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#0099FF] inline-block transition-colors" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCampaignId(c.id)}
              className="bg-[#0A0A0A] border border-white/10 hover:border-[#0099FF]/50 p-5 rounded-sm space-y-4 cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#0099FF] text-xs font-bold">{c.id}</span>
                <AdminStatusBadge status={c.status} />
              </div>

              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-[#0099FF] transition-colors uppercase">
                  {c.name}
                </h3>
                <span className="text-white/50 text-[10px] block uppercase mt-0.5">
                  {c.client_business_name} • {c.project_name}
                </span>
              </div>

              <div className="p-3 bg-[#050505] border border-white/5 rounded-sm space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/40 text-[10px] uppercase">CHANNEL:</span>
                  <span className="text-[#0099FF] font-bold text-[10px]">{c.channel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 text-[10px] uppercase">MEDIA BUDGET:</span>
                  <span className="text-white font-bold">{c.budget.monthly_amount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <span className="text-white/50 text-[10px]">OWNER: {c.team.campaign_owner}</span>
                <span className="text-[#0099FF] font-bold text-[10px] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  VIEW 360 →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chapter 20 Design Review */}
      <CampaignDesignReview />

      {/* Creation Modal */}
      <CampaignCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onSubmit={handleCreateCampaign}
      />

      {/* Pause Modal */}
      {pauseModalCampaign && (
        <CampaignPauseModal
          isOpen={true}
          campaignId={pauseModalCampaign.id}
          campaignName={pauseModalCampaign.name}
          onClose={() => setPauseModalCampaign(null)}
          onConfirm={handleConfirmPause}
        />
      )}
    </div>
  );
};
