import React, { useState } from 'react';
import { X, Plus, AlertCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Campaign, CampaignChannel, CampaignType, CampaignObjective, CampaignPriority } from '../../../types/campaigns';
import { MOCK_CLIENTS } from '../../../data/mockClientsData';
import { MOCK_PROJECTS } from '../../../data/mockProjectsData';
import { MOCK_STRATEGIES } from '../../../data/mockStrategiesData';

interface CampaignCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaignData: Partial<Campaign>) => void;
}

export const CampaignCreationModal: React.FC<CampaignCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string>('CLI-2026-001');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('PRJ-2026-001');
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>('MG-STR-2026-001');

  const [name, setName] = useState<string>('');
  const [channel, setChannel] = useState<CampaignChannel>('META ADS');
  const [campaignType, setCampaignType] = useState<CampaignType>('PROSPECTING');
  const [objective, setObjective] = useState<CampaignObjective>('CONVERSIONS');
  const [priority, setPriority] = useState<CampaignPriority>('HIGH');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('$15,000 / mo');
  const [dailyBudget, setDailyBudget] = useState<string>('$500 / day');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>('2026-09-30');
  const [strategicRole, setStrategicRole] = useState<string>('Primary prospecting vehicle targeting cold audiences across North America.');
  const [objectiveDesc, setObjectiveDesc] = useState<string>('Drive net-new customer acquisitions via video creative angles and lookalike seed lists.');
  const [owner, setOwner] = useState<string>('Marcus Vance');

  if (!isOpen) return null;

  // Filter projects based on selected client
  const availableProjects = MOCK_PROJECTS.filter((p) => p.client_id === selectedClientId);
  // Filter strategies based on selected project
  const availableStrategies = MOCK_STRATEGIES.filter((s) => s.project_id === selectedProjectId);

  const handleClientChange = (cId: string) => {
    setSelectedClientId(cId);
    const firstProj = MOCK_PROJECTS.find((p) => p.client_id === cId);
    if (firstProj) {
      setSelectedProjectId(firstProj.id);
      const firstStrat = MOCK_STRATEGIES.find((s) => s.project_id === firstProj.id);
      if (firstStrat) setSelectedStrategyId(firstStrat.id);
    }
  };

  const handleProjectChange = (pId: string) => {
    setSelectedProjectId(pId);
    const firstStrat = MOCK_STRATEGIES.find((s) => s.project_id === pId);
    if (firstStrat) setSelectedStrategyId(firstStrat.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const clientObj = MOCK_CLIENTS.find((c) => c.id === selectedClientId);
    const projObj = MOCK_PROJECTS.find((p) => p.id === selectedProjectId);
    const stratObj = MOCK_STRATEGIES.find((s) => s.id === selectedStrategyId);

    const newCampaignData: Partial<Campaign> = {
      name: name.toUpperCase(),
      client_id: selectedClientId,
      client_business_name: clientObj?.business_name || 'Northstar Commerce',
      project_id: selectedProjectId,
      project_name: projObj?.name || 'Q3 Paid Acquisition System',
      strategy_id: selectedStrategyId,
      strategy_name: stratObj?.name || 'Q3 Growth Acquisition Strategy',
      channel,
      campaign_type: campaignType,
      objective,
      priority,
      status: 'PLANNED',
      health: 'ON TRACK',
      health_reason: 'Campaign planned and ready for checklist verification.',
      current_phase: 'PLANNING',
      start_date: startDate,
      end_date: endDate,
      strategic_role: strategicRole,
      campaign_objective_description: objectiveDesc,
      budget: {
        type: 'MONTHLY',
        monthly_amount: monthlyBudget,
        daily_amount: dailyBudget,
        currency: 'USD',
        pacing: 'EVEN',
        budget_owner: 'Magniar Performance Media Team',
        project_media_budget_context: `${monthlyBudget} Project Media Spend`,
        strategy_allocation_context: 'Strategy Allocated',
        channel_allocation_context: 'Channel Allocation',
      },
      team: {
        campaign_owner: owner,
        strategy_lead: 'Alexander Wright',
        performance_lead: 'Elena Rostova',
        creative_lead: 'Sophia Chen',
        contributors: [],
        reviewers: ['Alexander Wright'],
        client_stakeholders: ['Sarah Jenkins'],
      },
    };

    onSubmit(newCampaignData);
    onClose();
  };

  const channels: CampaignChannel[] = [
    'META ADS',
    'GOOGLE ADS',
    'TIKTOK ADS',
    'LINKEDIN ADS',
    'NATIVE ADS',
    'GOOGLE SHOPPING',
    'SEO',
    'EMAIL',
    'ORGANIC SOCIAL',
    'AFFILIATE',
    'INFLUENCER',
    'MARKETPLACE',
    'DIRECT',
    'CUSTOM',
  ];

  const types: CampaignType[] = [
    'PROSPECTING',
    'RETARGETING',
    'CONVERSION',
    'LEAD GENERATION',
    'BRAND',
    'AWARENESS',
    'REMARKETING',
    'PRODUCT LAUNCH',
    'CATALOG',
    'SHOPPING',
    'EXPERIMENT',
    'CUSTOM',
  ];

  const objectives: CampaignObjective[] = [
    'AWARENESS',
    'TRAFFIC',
    'ENGAGEMENT',
    'LEADS',
    'CONVERSIONS',
    'SALES',
    'APP INSTALLS',
    'CATALOG SALES',
    'RETENTION',
    'CUSTOM',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono animate-fadeIn">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-sm w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A0A0A] z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] rounded-[2px]">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0099FF] uppercase tracking-wider">
                  CAMPAIGN EXECUTION ENGINE
                </span>
                <span className="text-[10px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded-[2px]">
                  STRICT HIERARCHY
                </span>
              </div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                CREATE NEW OPERATIONAL CAMPAIGN
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1">
          {/* Strict Hierarchy Context Banner */}
          <div className="p-4 bg-[#050505] border border-[#0099FF]/30 rounded-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0099FF] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              OPERATIONAL RELATIONSHIP REQUIREMENT
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">
              Campaigns must belong to an approved Strategy within an active Project. Standalone or unlinked campaigns are strictly disallowed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {/* Select Client */}
              <div>
                <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  1. CLIENT (REQUIRED)
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => handleClientChange(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
                >
                  {MOCK_CLIENTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.business_name} ({c.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Project */}
              <div>
                <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  2. PROJECT (REQUIRED)
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => handleProjectChange(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
                >
                  {availableProjects.length > 0 ? (
                    availableProjects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id})
                      </option>
                    ))
                  ) : (
                    <option value="">No active projects found</option>
                  )}
                </select>
              </div>

              {/* Select Strategy */}
              <div>
                <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  3. STRATEGY (REQUIRED)
                </label>
                <select
                  value={selectedStrategyId}
                  onChange={(e) => setSelectedStrategyId(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
                >
                  {availableStrategies.length > 0 ? (
                    availableStrategies.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.id})
                      </option>
                    ))
                  ) : (
                    <option value="">No strategies available</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                CAMPAIGN NAME *
              </label>
              <input
                type="text"
                required
                placeholder="E.G. Q3 — PROSPECTING CORE META"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white placeholder-white/20 focus:border-[#0099FF] outline-none font-bold tracking-wide"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                CHANNEL *
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as CampaignChannel)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
              >
                {channels.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                CAMPAIGN TYPE *
              </label>
              <select
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value as CampaignType)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                PRIMARY OBJECTIVE *
              </label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value as CampaignObjective)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
              >
                {objectives.map((obj) => (
                  <option key={obj} value={obj}>
                    {obj}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                CAMPAIGN PRIORITY
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as CampaignPriority)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
              >
                <option value="LOW">LOW</option>
                <option value="NORMAL">NORMAL</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                MONTHLY MEDIA SPEND (DEMO DATA)
              </label>
              <input
                type="text"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                DAILY PACING ALLOCATION
              </label>
              <input
                type="text"
                value={dailyBudget}
                onChange={(e) => setDailyBudget(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                START DATE
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                END DATE
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:border-[#0099FF] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                STRATEGIC ROLE & ALIGNMENT
              </label>
              <textarea
                rows={2}
                value={strategicRole}
                onChange={(e) => setStrategicRole(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm p-3 text-xs text-white focus:border-[#0099FF] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                OBJECTIVE DESCRIPTION & SCOPE
              </label>
              <textarea
                rows={2}
                value={objectiveDesc}
                onChange={(e) => setObjectiveDesc(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 rounded-sm p-3 text-xs text-white focus:border-[#0099FF] outline-none"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 text-xs font-bold text-white/70 hover:text-white rounded-sm transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0099FF] hover:bg-[#0088EE] text-white text-xs font-bold rounded-sm flex items-center gap-2 transition-colors shadow-lg shadow-[#0099FF]/20"
            >
              INITIALIZE CAMPAIGN ENTITY
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
