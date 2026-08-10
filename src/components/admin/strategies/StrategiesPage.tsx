import React, { useState } from 'react';
import {
  Compass,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  AlertCircle,
  BarChart2,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Strategy, StrategyStatus, StrategyType } from '../../../types/strategies';
import { strategyService } from '../../../services/strategyService';
import { StrategyCreationModal } from './StrategyCreationModal';
import { StrategyDetail } from './StrategyDetail';
import { StrategyDesignReview } from './StrategyDesignReview';

interface StrategiesPageProps {
  onNavigate?: (route: string) => void;
  onNavigateToProject?: (projectId: string) => void;
  onNavigateToClient?: (clientId: string) => void;
  onTriggerToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
  simulatedState?: any;
}

export const StrategiesPage: React.FC<StrategiesPageProps> = ({
  onNavigate,
  onNavigateToProject,
  onNavigateToClient,
  onTriggerToast,
}) => {
  const [strategies, setStrategies] = useState<Strategy[]>(() => strategyService.getStrategies());
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  // Filtered strategies
  const filteredStrategies = strategies.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.client_business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.strategy_lead.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || s.strategy_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate Metrics
  const activeCount = strategies.filter((s) => s.status === 'ACTIVE').length;
  const inReviewCount = strategies.filter((s) => s.status === 'IN REVIEW' || s.status === 'CLIENT REVIEW').length;
  const draftCount = strategies.filter((s) => s.status === 'DRAFT').length;
  const archivedCount = strategies.filter((s) => s.status === 'ARCHIVED' || s.status === 'SUPERSEDED').length;

  const handleCreateStrategy = (newStrategyData: any) => {
    const created = strategyService.createStrategy(newStrategyData);
    setStrategies([...strategyService.getStrategies()]);
    if (onTriggerToast) onTriggerToast(`Created strategy ${created.id}: ${created.name}`, 'success');
    setSelectedStrategyId(created.id);
  };

  const getStatusBadge = (status: StrategyStatus) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30">ACTIVE</span>;
      case 'APPROVED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">APPROVED</span>;
      case 'IN REVIEW':
      case 'CLIENT REVIEW':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">{status}</span>;
      case 'DRAFT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-white/70 border border-white/20">DRAFT</span>;
      case 'PAUSED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">PAUSED</span>;
      case 'SUPERSEDED':
      case 'ARCHIVED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 text-white/40 border border-white/10">{status}</span>;
      default:
        return null;
    }
  };

  // Render detail view if selected
  if (selectedStrategyId) {
    return (
      <StrategyDetail
        strategyId={selectedStrategyId}
        onBack={() => setSelectedStrategyId(null)}
        onNavigateToProject={onNavigateToProject}
        onNavigateToClient={onNavigateToClient}
        onTriggerToast={onTriggerToast}
      />
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-[#0099FF]" />
              <h1 className="font-display font-bold text-2xl text-white tracking-wide uppercase">
                STRATEGIES
              </h1>
            </div>
            <p className="text-xs text-white/60 font-mono">
              Plan, document and manage strategic direction across active Magniar engagements.
            </p>
          </div>

          <button
            onClick={() => setIsCreationModalOpen(true)}
            className="px-4 py-2 bg-[#0099FF] text-black font-mono text-xs font-bold rounded uppercase hover:bg-[#0099FF]/90 transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ NEW STRATEGY</span>
          </button>
        </div>

        {/* Compact Summary Metrics (Section 05) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 font-mono">
          <div className="p-3 bg-[#111111] border border-white/5 rounded">
            <span className="text-white/40 text-[10px] uppercase block">ACTIVE STRATEGIES</span>
            <span className="text-white text-lg font-bold">{activeCount}</span>
          </div>

          <div className="p-3 bg-[#111111] border border-white/5 rounded">
            <span className="text-white/40 text-[10px] uppercase block">IN REVIEW</span>
            <span className="text-amber-400 text-lg font-bold">{inReviewCount}</span>
          </div>

          <div className="p-3 bg-[#111111] border border-white/5 rounded">
            <span className="text-white/40 text-[10px] uppercase block">DRAFTS</span>
            <span className="text-white/80 text-lg font-bold">{draftCount}</span>
          </div>

          <div className="p-3 bg-[#111111] border border-white/5 rounded">
            <span className="text-white/40 text-[10px] uppercase block">ARCHIVED / HISTORICAL</span>
            <span className="text-white/50 text-lg font-bold">{archivedCount}</span>
          </div>
        </div>
      </div>

      {/* Search & Filters Controls */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search strategy, client, project, lead..."
            className="w-full bg-[#141414] border border-white/10 rounded pl-9 pr-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#0099FF]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-white/40 uppercase text-[10px]">STATUS:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#141414] border border-white/10 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-[#0099FF]"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="APPROVED">APPROVED</option>
              <option value="IN REVIEW">IN REVIEW</option>
              <option value="DRAFT">DRAFT</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-white/40 uppercase text-[10px]">TYPE:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#141414] border border-white/10 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-[#0099FF]"
            >
              <option value="ALL">ALL TYPES</option>
              <option value="PERFORMANCE MARKETING">PERFORMANCE MARKETING</option>
              <option value="GROWTH">GROWTH</option>
              <option value="B2B">B2B</option>
              <option value="ECOMMERCE">ECOMMERCE</option>
              <option value="CRO">CRO</option>
            </select>
          </div>
        </div>
      </div>

      {/* Strategy Table */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden">
        {filteredStrategies.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <Compass className="w-12 h-12 text-white/20 mx-auto" />
            <h3 className="font-display font-bold text-white text-base uppercase">
              NO STRATEGIES YET
            </h3>
            <p className="text-xs text-white/50 font-mono max-w-md mx-auto">
              Create a strategy to establish strategic direction and tactical roadmap for an active project.
            </p>
            <button
              onClick={() => setIsCreationModalOpen(true)}
              className="px-4 py-2 bg-[#0099FF] text-black font-mono text-xs font-bold rounded uppercase hover:bg-[#0099FF]/90 transition-colors"
            >
              + NEW STRATEGY
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0F0F0F] text-white/50 border-b border-white/10 uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">STRATEGY</th>
                  <th className="p-3.5">CLIENT</th>
                  <th className="p-3.5">PROJECT</th>
                  <th className="p-3.5">TYPE</th>
                  <th className="p-3.5">OWNER</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5">VERSION</th>
                  <th className="p-3.5">LAST UPDATED</th>
                  <th className="p-3.5">NEXT REVIEW</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {filteredStrategies.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStrategyId(s.id)}
                    className="hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-white group-hover:text-[#0099FF] transition-colors">
                        {s.name}
                      </div>
                      <span className="text-[10px] text-[#0099FF]">{s.id}</span>
                    </td>
                    <td className="p-3.5 text-white/90 font-medium">{s.client_business_name}</td>
                    <td className="p-3.5 text-white/70">{s.project_name}</td>
                    <td className="p-3.5 text-white/60">{s.strategy_type}</td>
                    <td className="p-3.5 text-white/80">{s.strategy_lead}</td>
                    <td className="p-3.5">{getStatusBadge(s.status)}</td>
                    <td className="p-3.5 text-white font-bold">{s.version}</td>
                    <td className="p-3.5 text-white/50">{s.last_updated}</td>
                    <td className="p-3.5 text-[#0099FF]">{s.next_review_date}</td>
                    <td className="p-3.5 text-right">
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#0099FF] inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CHAPTER 19 DESIGN REVIEW COMPONENT */}
      <StrategyDesignReview />

      {/* Strategy Creation Modal */}
      <StrategyCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onCreate={handleCreateStrategy}
        onTriggerToast={onTriggerToast}
      />
    </div>
  );
};
