import React, { useState } from 'react';
import {
  Compass,
  ArrowLeft,
  Edit,
  Layers,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  FileText,
  User,
  Users,
  Target,
  BarChart3,
  Radio,
  DollarSign,
  Zap,
  TrendingUp,
  Shield,
  Briefcase,
  ExternalLink,
  Plus,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Copy,
  Archive,
  Check,
  X,
  HelpCircle,
} from 'lucide-react';
import {
  Strategy,
  StrategyStatus,
  StrategyHealth,
  StrategyObjective,
  StrategyChannelItem,
  StrategyExperiment,
  StrategyRecommendation,
} from '../../../types/strategies';
import { strategyService } from '../../../services/strategyService';
import { StrategyNewVersionModal } from './StrategyNewVersionModal';
import { ChannelDetailModal } from './ChannelDetailModal';
import { StrategyDesignReview } from './StrategyDesignReview';

interface StrategyDetailProps {
  strategyId: string;
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
  onNavigateToClient?: (clientId: string) => void;
  onTriggerToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const StrategyDetail: React.FC<StrategyDetailProps> = ({
  strategyId,
  onBack,
  onNavigateToProject,
  onNavigateToClient,
  onTriggerToast,
}) => {
  const [strategy, setStrategy] = useState<Strategy | undefined>(() =>
    strategyService.getStrategy(strategyId)
  );

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedChannel, setSelectedChannel] = useState<StrategyChannelItem | null>(null);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState<boolean>(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState<boolean>(false);
  const [showMoreActions, setShowMoreActions] = useState<boolean>(false);

  // Quick form states for inline additions
  const [newObjectiveTitle, setNewObjectiveTitle] = useState('');
  const [showAddObjective, setShowAddObjective] = useState(false);

  const [newNoteText, setNewNoteText] = useState('');

  if (!strategy) {
    return (
      <div className="p-8 text-center space-y-4 bg-[#0A0A0A] border border-white/10 rounded-lg">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h3 className="text-lg font-bold text-white uppercase font-display">
          WE COULDN'T LOAD THIS STRATEGY.
        </h3>
        <p className="text-xs text-white/60 font-mono">
          Strategy ID ({strategyId}) could not be found or has been removed.
        </p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#0099FF] text-black font-semibold rounded text-xs font-mono uppercase"
        >
          RETURN TO STRATEGIES
        </button>
      </div>
    );
  }

  const handleCreateVersion = (summary: string) => {
    const updated = strategyService.createStrategyVersion(strategy.id, summary);
    if (updated) {
      setStrategy({ ...updated });
      if (onTriggerToast) onTriggerToast(`Published new strategy version ${updated.version}`, 'success');
    }
  };

  const handleSubmitForReview = () => {
    const updated = strategyService.submitStrategyForReview(strategy.id);
    if (updated) {
      setStrategy({ ...updated });
      if (onTriggerToast) onTriggerToast('Strategy submitted for internal review.', 'info');
    }
  };

  const handleApprove = () => {
    const updated = strategyService.approveStrategy(strategy.id);
    if (updated) {
      setStrategy({ ...updated });
      if (onTriggerToast) onTriggerToast('Strategy approved successfully.', 'success');
    }
  };

  const handleArchive = () => {
    const updated = strategyService.archiveStrategy(strategy.id);
    if (updated) {
      setStrategy({ ...updated });
      if (onTriggerToast) onTriggerToast('Strategy archived.', 'info');
    }
  };

  const handleDuplicate = () => {
    const duplicated = strategyService.duplicateStrategy(strategy.id);
    if (duplicated) {
      if (onTriggerToast) onTriggerToast(`Duplicated strategy as ${duplicated.id}`, 'success');
    }
  };

  const handleAddObjectiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjectiveTitle.trim()) return;

    const updated = strategyService.addObjective(strategy.id, {
      number: String(strategy.objectives.length + 1).padStart(2, '0'),
      name: newObjectiveTitle.trim(),
      description: 'New strategic objective defined during review.',
      priority: 'HIGH',
      status: 'IN PROGRESS',
      owner: strategy.strategy_lead,
      measurement_target: {
        metric_name: 'Target Metric',
        target_value: 'To be defined',
        status: 'NOT CONNECTED',
      },
    });

    if (updated) {
      setStrategy({ ...updated });
      setNewObjectiveTitle('');
      setShowAddObjective(false);
      if (onTriggerToast) onTriggerToast('Objective added.', 'success');
    }
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const updated = strategyService.addNote(strategy.id, newNoteText.trim(), 'Kaelen Voss');
    if (updated) {
      setStrategy({ ...updated });
      setNewNoteText('');
      if (onTriggerToast) onTriggerToast('Internal note saved.', 'success');
    }
  };

  const handleRecommendationStatusChange = (recId: string, newStatus: 'APPROVED' | 'REJECTED') => {
    const updatedRecs = strategy.recommendations.map((r) =>
      r.id === recId ? { ...r, status: newStatus } : r
    );
    const updated = strategyService.updateStrategy(strategy.id, { recommendations: updatedRecs });
    if (updated) {
      setStrategy({ ...updated });
      if (onTriggerToast) onTriggerToast(`Recommendation marked as ${newStatus}.`, 'info');
    }
  };

  const getHealthBadge = (health: StrategyHealth) => {
    switch (health) {
      case 'ON TRACK':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ON TRACK</span>;
      case 'ATTENTION':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">ATTENTION</span>;
      case 'AT RISK':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">AT RISK</span>;
      case 'BLOCKED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">BLOCKED</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: StrategyStatus) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30">ACTIVE</span>;
      case 'APPROVED':
        return <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">APPROVED</span>;
      case 'IN REVIEW':
      case 'CLIENT REVIEW':
        return <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">{status}</span>;
      case 'DRAFT':
        return <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-white/10 text-white/70 border border-white/20">DRAFT</span>;
      case 'PAUSED':
        return <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">PAUSED</span>;
      case 'SUPERSEDED':
      case 'ARCHIVED':
        return <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-white/5 text-white/40 border border-white/10">{status}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-6 space-y-4">
        {/* Navigation / Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white/70 hover:text-white transition-colors"
              title="Back to Strategies"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-white/50">
              <span className="hover:text-white cursor-pointer" onClick={onBack}>
                STRATEGIES
              </span>
              <span>/</span>
              <span className="text-[#0099FF] font-bold">{strategy.id}</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVersionModalOpen(true)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono uppercase text-white flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>NEW VERSION</span>
            </button>

            {strategy.status === 'DRAFT' && (
              <button
                onClick={handleSubmitForReview}
                className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded text-xs font-mono uppercase text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT FOR REVIEW</span>
              </button>
            )}

            {strategy.status === 'IN REVIEW' && (
              <button
                onClick={handleApprove}
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded text-xs font-mono uppercase text-emerald-300 font-bold flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>APPROVE STRATEGY</span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowMoreActions(!showMoreActions)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono uppercase text-white transition-colors"
              >
                MORE ▾
              </button>
              {showMoreActions && (
                <div className="absolute right-0 mt-1 w-44 bg-[#121212] border border-white/10 rounded shadow-xl py-1 z-20 font-mono text-xs">
                  <button
                    onClick={() => {
                      setShowMoreActions(false);
                      handleDuplicate();
                    }}
                    className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#0099FF]" />
                    <span>DUPLICATE</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMoreActions(false);
                      handleArchive();
                    }}
                    className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>ARCHIVE</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Header Title Block */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-2 py-0.5 rounded font-bold">
                {strategy.id}
              </span>
              {getStatusBadge(strategy.status)}
              {getHealthBadge(strategy.health)}
              <span className="font-mono text-xs text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                VERSION {strategy.version} {strategy.is_current && '(CURRENT)'}
              </span>
              <span className="font-mono text-xs text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                TYPE: {strategy.strategy_type}
              </span>
            </div>

            <h1 className="font-display font-bold text-2xl lg:text-3xl text-white tracking-wide uppercase">
              {strategy.name}
            </h1>

            {/* Subtitle Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/70">
              <div className="flex items-center gap-1.5">
                <span className="text-white/40">CLIENT:</span>
                <span className="text-white font-semibold">{strategy.client_business_name}</span>
                {onNavigateToClient && (
                  <button
                    onClick={() => onNavigateToClient(strategy.client_id)}
                    className="text-[#0099FF] hover:underline flex items-center gap-0.5 ml-1"
                  >
                    <span>[ VIEW CLIENT → ]</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-white/40">PROJECT:</span>
                <span className="text-white font-semibold">{strategy.project_name}</span>
                {onNavigateToProject && (
                  <button
                    onClick={() => onNavigateToProject(strategy.project_id)}
                    className="text-[#0099FF] hover:underline flex items-center gap-0.5 ml-1"
                  >
                    <span>[ VIEW PROJECT → ]</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout: Left Detailed Tabs/Sections + Right Sidebar Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (3 Spans) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-white/10 overflow-x-auto pb-1 text-xs font-mono uppercase">
            {[
              { id: 'overview', label: 'Overview & Context' },
              { id: 'objectives', label: `Objectives (${strategy.objectives.length})` },
              { id: 'audience', label: 'Audience & Positioning' },
              { id: 'channels', label: `Channels & Budget (${strategy.channels.length})` },
              { id: 'system', label: 'Acquisition & Creative' },
              { id: 'experiments', label: `Experiments (${strategy.experiments.length})` },
              { id: 'recommendations', label: `Roadmap & Recs (${strategy.recommendations.length})` },
              { id: 'measurement', label: 'Measurement & History' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 whitespace-nowrap rounded-t border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#0099FF] text-[#0099FF] bg-[#0099FF]/10'
                    : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW & BUSINESS CONTEXT */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Executive Strategic Summary */}
              <div className="p-6 bg-[#0E0E0E] border border-[#0099FF]/30 rounded-lg space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#0099FF]/10 text-[#0099FF] font-mono text-[9px] px-2 py-0.5 border-b border-l border-[#0099FF]/30 font-bold uppercase">
                  WRITTEN BY STRATEGIST
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#0099FF]" />
                  <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase">
                    EXECUTIVE STRATEGIC SUMMARY
                  </h3>
                </div>
                <p className="text-white/90 text-sm leading-relaxed font-sans">
                  {strategy.executive_summary}
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-white/50 border-t border-white/5">
                  <span>STRATEGY LEAD: {strategy.strategy_lead}</span>
                  <span>•</span>
                  <span>DESCRIPTION: {strategy.description}</span>
                </div>
              </div>

              {/* Business Context */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0099FF]" />
                  BUSINESS CONTEXT
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#111111] border border-white/5 rounded text-xs font-mono">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">BUSINESS MODEL</span>
                    <span className="text-white font-semibold">{strategy.business_context.business_model}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">INDUSTRY</span>
                    <span className="text-white font-semibold">{strategy.business_context.industry}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">PRIMARY MARKET</span>
                    <span className="text-white font-semibold">{strategy.business_context.primary_market}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase">CURRENCY</span>
                    <span className="text-[#0099FF] font-semibold">{strategy.business_context.currency}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-[#111111] border border-white/5 rounded space-y-1">
                    <span className="font-mono text-[10px] text-white/40 uppercase block">CURRENT STATE</span>
                    <p className="text-white/80 leading-relaxed">{strategy.business_context.current_situation}</p>
                  </div>

                  <div className="p-4 bg-[#111111] border border-amber-500/20 rounded space-y-1">
                    <span className="font-mono text-[10px] text-amber-400 uppercase block">PRIMARY STRATEGIC PROBLEM</span>
                    <p className="text-white/80 leading-relaxed">{strategy.business_context.strategic_problem}</p>
                  </div>

                  <div className="p-4 bg-[#111111] border border-[#0099FF]/20 rounded space-y-1">
                    <span className="font-mono text-[10px] text-[#0099FF] uppercase block">PRIMARY STRATEGIC OPPORTUNITY</span>
                    <p className="text-white/80 leading-relaxed">{strategy.business_context.strategic_opportunity}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OBJECTIVES */}
          {activeTab === 'objectives' && (
            <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#0099FF]" />
                  STRATEGIC OBJECTIVES
                </h3>
                <button
                  onClick={() => setShowAddObjective(!showAddObjective)}
                  className="px-3 py-1 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 border border-[#0099FF]/30 text-[#0099FF] rounded text-xs font-mono uppercase flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD OBJECTIVE</span>
                </button>
              </div>

              {showAddObjective && (
                <form onSubmit={handleAddObjectiveSubmit} className="p-4 bg-[#121212] border border-[#0099FF]/30 rounded space-y-3">
                  <span className="text-xs font-mono uppercase text-[#0099FF] block font-bold">ADD STRATEGIC OBJECTIVE</span>
                  <input
                    type="text"
                    value={newObjectiveTitle}
                    onChange={(e) => setNewObjectiveTitle(e.target.value)}
                    placeholder="e.g. Expand Meta CBO scaling ad spend by 25%..."
                    className="w-full bg-[#181818] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddObjective(false)}
                      className="px-3 py-1 text-xs font-mono text-white/60 hover:text-white"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={!newObjectiveTitle.trim()}
                      className="px-3 py-1 bg-[#0099FF] text-black text-xs font-mono font-bold rounded"
                    >
                      SAVE OBJECTIVE
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {strategy.objectives.map((obj) => (
                  <div
                    key={obj.id}
                    className="p-4 bg-[#111111] border border-white/10 rounded space-y-3 hover:border-[#0099FF]/30 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded">
                          {obj.number}
                        </span>
                        <h4 className="font-bold text-white text-sm">{obj.name}</h4>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70">
                          PRIORITY: {obj.priority}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded">
                          {obj.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-white/80 leading-relaxed">{obj.description}</p>

                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/60">
                      <div>OWNER: {obj.owner}</div>
                      <div className="flex items-center gap-2">
                        <span>MEASUREMENT TARGET:</span>
                        <span className="text-white font-semibold">{obj.measurement_target.metric_name} ({obj.measurement_target.target_value})</span>
                        <span className="text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded">
                          {obj.measurement_target.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AUDIENCE & POSITIONING */}
          {activeTab === 'audience' && (
            <div className="space-y-6">
              {/* Audience Strategy */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#0099FF]" />
                  AUDIENCE STRATEGY
                </h3>

                <div className="p-4 bg-[#111111] border border-white/10 rounded space-y-3">
                  <span className="font-mono text-xs text-[#0099FF] uppercase font-bold block">
                    PRIMARY AUDIENCE: {strategy.audience.primary_audience.name}
                  </span>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono text-white/70 bg-[#161616] p-3 rounded">
                    <div><span className="text-white/40 block text-[10px]">AGE RANGE</span>{strategy.audience.primary_audience.age_range}</div>
                    <div><span className="text-white/40 block text-[10px]">GEOGRAPHY</span>{strategy.audience.primary_audience.geography}</div>
                    <div><span className="text-white/40 block text-[10px]">BUYING INTENT</span>{strategy.audience.primary_audience.buying_intent}</div>
                    <div><span className="text-white/40 block text-[10px]">INTERESTS</span>{strategy.audience.primary_audience.interests}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#161616] rounded space-y-1">
                      <span className="font-mono text-[10px] text-white/40 uppercase block">PAIN POINTS & NEEDS</span>
                      <p className="text-white/80">{strategy.audience.primary_audience.pain_points}</p>
                    </div>
                    <div className="p-3 bg-[#161616] rounded space-y-1">
                      <span className="font-mono text-[10px] text-white/40 uppercase block">MOTIVATIONS & USE CASE</span>
                      <p className="text-white/80">{strategy.audience.primary_audience.motivations}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#111111] border border-white/5 rounded space-y-2">
                    <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block">PRIMARY MOTIVATORS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {strategy.audience.primary_motivators.map((m, i) => (
                        <span key={i} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#111111] border border-white/5 rounded space-y-2">
                    <span className="font-mono text-[10px] text-amber-400 uppercase font-bold block">PRIMARY OBJECTIONS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {strategy.audience.primary_objections.map((o, i) => (
                        <span key={i} className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-mono">
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Positioning Strategy & Competitors */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#0099FF]" />
                  POSITIONING & COMPETITIVE LANDSCAPE
                </h3>

                <div className="p-4 bg-[#111111] border border-[#0099FF]/20 rounded space-y-2 text-xs">
                  <span className="font-mono text-[10px] text-[#0099FF] uppercase font-bold block">CORE VALUE PROPOSITION</span>
                  <p className="text-white font-semibold text-sm">{strategy.positioning.core_value_proposition}</p>
                  <p className="text-white/60 font-mono text-[11px]">BRAND PROMISE: {strategy.positioning.brand_promise}</p>
                </div>

                {/* Competitors Table */}
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase text-white/50 block">COMPETITIVE LANDSCAPE</span>
                  <div className="overflow-x-auto border border-white/10 rounded">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#121212] text-white/50 border-b border-white/10 uppercase text-[10px]">
                        <tr>
                          <th className="p-2.5">COMPETITOR</th>
                          <th className="p-2.5">CATEGORY</th>
                          <th className="p-2.5">STRENGTH</th>
                          <th className="p-2.5">WEAKNESS</th>
                          <th className="p-2.5">STRATEGIC IMPLICATION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/80">
                        {strategy.positioning.competitors.map((comp) => (
                          <tr key={comp.id} className="hover:bg-white/5">
                            <td className="p-2.5 font-bold text-white">{comp.name}</td>
                            <td className="p-2.5 text-white/60">{comp.category}</td>
                            <td className="p-2.5 text-emerald-300/80">{comp.strength}</td>
                            <td className="p-2.5 text-rose-300/80">{comp.weakness}</td>
                            <td className="p-2.5 text-[#0099FF]">{comp.strategic_implication}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CHANNELS & MEDIA BUDGET */}
          {activeTab === 'channels' && (
            <div className="space-y-6">
              {/* Media Budget Allocation Banner */}
              <div className="p-6 bg-[#0E0E0E] border border-white/10 rounded-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#0099FF]" />
                    <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase">
                      CLIENT MEDIA BUDGET STRATEGY
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded uppercase font-bold">
                    DEMO DATA — CLIENT MEDIA SPEND
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 bg-[#141414] border border-white/5 rounded">
                    <span className="text-white/40 block text-[10px] uppercase">ESTIMATED MEDIA SPEND</span>
                    <span className="text-white text-sm font-bold">{strategy.budget.client_media_spend_range}</span>
                  </div>
                  <div className="p-3 bg-[#141414] border border-white/5 rounded">
                    <span className="text-white/40 block text-[10px] uppercase">BUDGET FLEXIBILITY</span>
                    <span className="text-[#0099FF] text-sm font-bold">{strategy.budget.flexibility}</span>
                  </div>
                  <div className="p-3 bg-[#141414] border border-white/5 rounded">
                    <span className="text-white/40 block text-[10px] uppercase">CURRENCY</span>
                    <span className="text-white text-sm font-bold">{strategy.budget.currency}</span>
                  </div>
                </div>

                <p className="text-xs text-white/50 font-mono italic">
                  * {strategy.budget.note}
                </p>

                {/* Allocation Visual Bar */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-white/60 block">CHANNEL ALLOCATION %</span>
                  <div className="h-4 w-full bg-white/5 rounded overflow-hidden flex">
                    {strategy.channels.map((ch, idx) => {
                      const colors = ['bg-[#0099FF]', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500'];
                      return (
                        <div
                          key={ch.id}
                          style={{ width: `${ch.budget_allocation_pct}%` }}
                          className={`${colors[idx % colors.length]} h-full transition-all duration-300`}
                          title={`${ch.channel_name}: ${ch.budget_allocation_pct}%`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Channels Grid */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#0099FF]" />
                    CHANNEL STRATEGY UNITS
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strategy.channels.map((chan) => (
                    <div
                      key={chan.id}
                      onClick={() => {
                        setSelectedChannel(chan);
                        setIsChannelModalOpen(true);
                      }}
                      className="p-4 bg-[#111111] border border-white/10 rounded-lg space-y-3 cursor-pointer hover:border-[#0099FF] transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm group-hover:text-[#0099FF] transition-colors">
                          {chan.channel_name}
                        </h4>
                        <span className="font-mono text-xs font-bold text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded">
                          {chan.budget_allocation_pct}%
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/70 rounded">
                          {chan.role}
                        </span>
                        <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded">
                          {chan.priority}
                        </span>
                      </div>

                      <p className="text-xs text-white/80 line-clamp-2">{chan.objective}</p>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
                        <span>OWNER: {chan.owner}</span>
                        <span className="text-[#0099FF] group-hover:underline">VIEW DETAIL →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ACQUISITION SYSTEM & CREATIVE */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              {/* Funnel Flow */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0099FF]" />
                  ACQUISITION FUNNEL ARCHITECTURE
                </h3>

                <div className="space-y-3">
                  {strategy.funnel.map((stage, idx) => (
                    <div key={idx} className="p-4 bg-[#111111] border border-white/10 rounded flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 md:w-1/4">
                        <span className="font-mono text-[10px] text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded font-bold uppercase">
                          STAGE 0{idx + 1} — {stage.stage}
                        </span>
                        <p className="text-xs font-bold text-white mt-1">{stage.message}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono md:w-3/4 bg-[#161616] p-3 rounded">
                        <div><span className="text-white/40 block text-[9px]">OFFER</span>{stage.offer}</div>
                        <div><span className="text-white/40 block text-[9px]">CREATIVE</span>{stage.creative}</div>
                        <div><span className="text-white/40 block text-[9px]">MEASUREMENT</span>{stage.measurement}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Creative Strategy Angles */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#0099FF]" />
                  CREATIVE STRATEGY & ANGLES
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strategy.creative.angles.map((ang) => (
                    <div key={ang.id} className="p-3 bg-[#111111] border border-white/5 rounded space-y-1">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-[#0099FF] font-bold bg-[#0099FF]/10 px-1.5 py-0.5 rounded">{ang.number}</span>
                        <span className="font-bold text-white">{ang.title}</span>
                      </div>
                      <p className="text-xs text-white/70">{ang.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EXPERIMENTS */}
          {activeTab === 'experiments' && (
            <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0099FF]" />
                  EXPERIMENTATION ROADMAP
                </h3>
              </div>

              <div className="space-y-3">
                {strategy.experiments.map((exp) => (
                  <div key={exp.id} className="p-4 bg-[#111111] border border-white/10 rounded space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="font-bold text-white text-sm">{exp.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#0099FF]/10 text-[#0099FF] rounded border border-[#0099FF]/30">{exp.priority}</span>
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/30">{exp.status}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#161616] rounded space-y-1 text-xs">
                      <span className="font-mono text-[10px] text-amber-400 uppercase block">HYPOTHESIS</span>
                      <p className="text-white/90 leading-relaxed">{exp.hypothesis}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/50 pt-1">
                      <span>CHANNEL: {exp.channel}</span>
                      <span>OWNER: {exp.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ROADMAP & RECOMMENDATIONS */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              {/* Recommendations */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0099FF]" />
                  STRATEGIC RECOMMENDATIONS
                </h3>

                <div className="space-y-3">
                  {strategy.recommendations.map((rec) => (
                    <div key={rec.id} className="p-4 bg-[#111111] border border-white/10 rounded space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-white text-sm">{rec.title}</h4>
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/70 rounded">EFFORT: {rec.effort}</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">{rec.status}</span>
                        </div>
                      </div>

                      <p className="text-xs text-white/80">{rec.description}</p>

                      <div className="p-3 bg-[#161616] rounded text-xs space-y-1">
                        <span className="font-mono text-[10px] text-[#0099FF] uppercase block">REASON & EXPECTED IMPACT</span>
                        <p className="text-white/80">{rec.reason} → <span className="text-emerald-300">{rec.expected_impact}</span></p>
                      </div>

                      {rec.status === 'PROPOSED' && (
                        <div className="flex justify-end gap-2 pt-1 font-mono text-xs">
                          <button
                            onClick={() => handleRecommendationStatusChange(rec.id, 'REJECTED')}
                            className="px-3 py-1 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 rounded"
                          >
                            REJECT
                          </button>
                          <button
                            onClick={() => handleRecommendationStatusChange(rec.id, 'APPROVED')}
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 rounded font-bold"
                          >
                            APPROVE RECOMMENDATION
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Roadmap Phases */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#0099FF]" />
                  STRATEGIC ROADMAP PHASES
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {strategy.roadmap.map((phase, idx) => (
                    <div key={idx} className="p-4 bg-[#111111] border border-white/10 rounded space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#0099FF] font-bold">{phase.phase_number} — {phase.title}</span>
                        <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/60">{phase.status}</span>
                      </div>
                      <p className="text-xs text-white/80">{phase.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: MEASUREMENT & HISTORY */}
          {activeTab === 'measurement' && (
            <div className="space-y-6">
              {/* Measurement Framework Table */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#0099FF]" />
                  MEASUREMENT FRAMEWORK (TARGETS)
                </h3>

                <div className="overflow-x-auto border border-white/10 rounded">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#121212] text-white/50 border-b border-white/10 uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">METRIC</th>
                        <th className="p-2.5">TYPE</th>
                        <th className="p-2.5">TARGET</th>
                        <th className="p-2.5">SOURCE</th>
                        <th className="p-2.5">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/80">
                      {strategy.measurement_framework.map((ms) => (
                        <tr key={ms.id}>
                          <td className="p-2.5 font-bold text-white">{ms.metric}</td>
                          <td className="p-2.5 text-white/60">{ms.type}</td>
                          <td className="p-2.5 text-emerald-300 font-bold">{ms.target}</td>
                          <td className="p-2.5 text-white/60">{ms.source}</td>
                          <td className="p-2.5">
                            <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded text-[10px]">
                              {ms.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Version History Table */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0099FF]" />
                  STRATEGY VERSION HISTORY
                </h3>

                <div className="overflow-x-auto border border-white/10 rounded">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#121212] text-white/50 border-b border-white/10 uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">VERSION</th>
                        <th className="p-2.5">DATE</th>
                        <th className="p-2.5">AUTHOR</th>
                        <th className="p-2.5">SUMMARY</th>
                        <th className="p-2.5">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white/80">
                      {strategy.version_history.map((ver, idx) => (
                        <tr key={idx} className={ver.is_current ? 'bg-[#0099FF]/10' : ''}>
                          <td className="p-2.5 font-bold text-white">
                            {ver.version} {ver.is_current && <span className="text-[#0099FF] text-[10px] ml-1">(CURRENT)</span>}
                          </td>
                          <td className="p-2.5 text-white/60">{ver.date}</td>
                          <td className="p-2.5 text-white/80">{ver.author}</td>
                          <td className="p-2.5 text-white/70">{ver.summary}</td>
                          <td className="p-2.5 text-emerald-300">{ver.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Internal Strategy Notes & Activity */}
              <div className="p-6 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
                <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#0099FF]" />
                  INTERNAL STRATEGY NOTES (INTERNAL ONLY)
                </h3>

                <form onSubmit={handleAddNoteSubmit} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add an internal note or context for the strategy team..."
                    className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newNoteText.trim()}
                      className="px-3 py-1 bg-[#0099FF] text-black font-mono text-xs font-bold rounded"
                    >
                      SAVE NOTE
                    </button>
                  </div>
                </form>

                <div className="space-y-2 pt-2">
                  {strategy.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-[#111111] border border-white/5 rounded text-xs space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-white/40">
                        <span>{note.author}</span>
                        <span>{note.created_at}</span>
                      </div>
                      <p className="text-white/80">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Strategy Engine Placeholder (Section 85) */}
          <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-lg flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white/40" />
              <span className="text-white/60">AI STRATEGY ENGINE</span>
            </div>
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/40 rounded text-[10px]">
              COMING LATER
            </span>
          </div>

          {/* CHAPTER 19 ARCHITECTURAL DESIGN REVIEW COMPONENT */}
          <StrategyDesignReview />
        </div>

        {/* Right Rail (1 Span) */}
        <div className="space-y-6">
          {/* Health & Review Meta Box */}
          <div className="p-5 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-4">
            <h4 className="font-mono text-xs text-white/50 uppercase font-bold tracking-wider">
              STRATEGY CONTROL RAIL
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-white/40 block text-[10px] uppercase">STRATEGY HEALTH</span>
                <div className="mt-1">{getHealthBadge(strategy.health)}</div>
              </div>

              <div>
                <span className="text-white/40 block text-[10px] uppercase">STATUS</span>
                <div className="mt-1">{getStatusBadge(strategy.status)}</div>
              </div>

              <div>
                <span className="text-white/40 block text-[10px] uppercase">NEXT STRATEGY REVIEW</span>
                <span className="text-white font-bold block mt-0.5">{strategy.next_review_date}</span>
              </div>

              <div>
                <span className="text-white/40 block text-[10px] uppercase">STRATEGY LEAD</span>
                <span className="text-white font-bold block mt-0.5">{strategy.strategy_lead}</span>
              </div>

              <div>
                <span className="text-white/40 block text-[10px] uppercase">APPROVAL STATUS</span>
                <span className="text-emerald-400 font-bold block mt-0.5">{strategy.approval.status}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-5 bg-[#0A0A0A] border border-white/10 rounded-lg space-y-3">
            <h4 className="font-mono text-xs text-white/50 uppercase font-bold tracking-wider">
              ASSOCIATED ENTITIES
            </h4>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 bg-[#111111] rounded border border-white/5 space-y-1">
                <span className="text-white/40 text-[10px] block">CLIENT</span>
                <span className="text-white font-bold block">{strategy.client_business_name}</span>
                {onNavigateToClient && (
                  <button
                    onClick={() => onNavigateToClient(strategy.client_id)}
                    className="text-[#0099FF] text-[10px] hover:underline block mt-1"
                  >
                    VIEW CLIENT PROFILE →
                  </button>
                )}
              </div>

              <div className="p-3 bg-[#111111] rounded border border-white/5 space-y-1">
                <span className="text-white/40 text-[10px] block">PROJECT</span>
                <span className="text-white font-bold block">{strategy.project_name}</span>
                {onNavigateToProject && (
                  <button
                    onClick={() => onNavigateToProject(strategy.project_id)}
                    className="text-[#0099FF] text-[10px] hover:underline block mt-1"
                  >
                    VIEW PROJECT WORKSPACE →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ChannelDetailModal
        channel={selectedChannel}
        isOpen={isChannelModalOpen}
        onClose={() => {
          setIsChannelModalOpen(false);
          setSelectedChannel(null);
        }}
      />

      <StrategyNewVersionModal
        strategy={strategy}
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        onCreateVersion={handleCreateVersion}
      />
    </div>
  );
};
