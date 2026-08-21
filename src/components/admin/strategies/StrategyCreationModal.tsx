import React, { useEffect, useState } from 'react';
import { X, Search, Compass, AlertCircle } from 'lucide-react';
import { StrategyType, BusinessModel } from '../../../types/strategies';
import { Client } from '../../../types/clients';
import { projectService } from '../../../services/projectService';
import { clientService } from '../../../services/clientService';

interface StrategyCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (strategyData: any) => void;
  onTriggerToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const StrategyCreationModal: React.FC<StrategyCreationModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onTriggerToast,
}) => {
  const projects = projectService.getProjects();
  const [clients, setClients] = useState<Client[]>([]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [strategyName, setStrategyName] = useState<string>('');
  const [strategyType, setStrategyType] = useState<StrategyType>('PERFORMANCE MARKETING');
  const [strategyLead, setStrategyLead] = useState<string>('Kaelen Voss (Growth Lead)');
  const [nextReviewDate, setNextReviewDate] = useState<string>('Aug 30, 2026');
  const [description, setDescription] = useState<string>('');
  const [executiveSummary, setExecutiveSummary] = useState<string>('');
  const [businessModel, setBusinessModel] = useState<BusinessModel>('Ecommerce');
  const [strategicProblem, setStrategicProblem] = useState<string>('');
  const [strategicOpportunity, setStrategicOpportunity] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    clientService
      .getClients()
      .then(setClients)
      .catch((err) => {
        console.error('Strategy client options load failed:', err);
        setClients([]);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const selectedClient = selectedProject
    ? clients.find((c) => c.id === selectedProject.client_id)
    : undefined;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProjectId || !selectedProject) {
      if (onTriggerToast) onTriggerToast('A Strategy must be linked to an active Project.', 'error');
      return;
    }

    if (!strategyName.trim()) {
      if (onTriggerToast) onTriggerToast('Strategy name is required.', 'error');
      return;
    }

    const newStrategyData = {
      name: strategyName.trim(),
      strategy_type: strategyType,
      project_id: selectedProject.id,
      project_name: selectedProject.name,
      client_id: selectedProject.client_id,
      client_business_name: selectedProject.client_business_name,
      strategy_lead: strategyLead,
      next_review_date: nextReviewDate,
      description: description.trim() || 'New strategic growth plan.',
      executive_summary: executiveSummary.trim() || 'Executive summary outlining strategic direction and target goals.',
      business_context: {
        business_model: businessModel,
        industry: selectedClient?.industry || 'General Industry',
        primary_market: 'North America',
        secondary_markets: [],
        countries: ['USA'],
        languages: ['English'],
        currency: 'USD',
        product_service: selectedClient?.business_name || 'Client Products',
        business_maturity: 'Growth Stage',
        growth_stage: 'Scaling',
        current_situation: 'Current acquisition channels operating with moderate efficiency.',
        strategic_problem: strategicProblem.trim() || 'Core acquisition scaling challenge requiring structured creative testing.',
        strategic_opportunity: strategicOpportunity.trim() || 'Expand high-intent acquisition through multi-channel scaling.',
      },
    };

    onCreate(newStrategyData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg w-full max-w-2xl my-8 overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#0099FF]" />
            <h2 className="font-display font-bold text-white text-lg tracking-wide uppercase">
              CREATE NEW STRATEGY
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Step 1: Link to Project */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
              LINK TO PROJECT <span className="text-[#0099FF]">*</span>
            </label>
            {projects.length === 0 ? (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>NO PROJECTS AVAILABLE. CREATE A PROJECT FIRST.</span>
              </div>
            ) : (
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
              >
                <option value="">-- Select Active Project --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} — {p.name} ({p.client_business_name})
                  </option>
                ))}
              </select>
            )}

            {selectedProject && (
              <div className="p-3 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded text-xs text-white/80 space-y-1 mt-2">
                <div className="flex justify-between">
                  <span className="text-white/50 font-mono">CLIENT:</span>
                  <span className="font-semibold text-white">{selectedProject.client_business_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 font-mono">PROJECT ID:</span>
                  <span className="font-mono text-[#0099FF]">{selectedProject.id}</span>
                </div>
              </div>
            )}
          </div>

          {/* Strategy Name & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
                STRATEGY NAME <span className="text-[#0099FF]">*</span>
              </label>
              <input
                type="text"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
                placeholder="e.g. Q3 Growth Acquisition Strategy"
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
                STRATEGY TYPE
              </label>
              <select
                value={strategyType}
                onChange={(e) => setStrategyType(e.target.value as StrategyType)}
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
              >
                <option value="GROWTH">GROWTH</option>
                <option value="PERFORMANCE MARKETING">PERFORMANCE MARKETING</option>
                <option value="ECOMMERCE">ECOMMERCE</option>
                <option value="CRO">CRO</option>
                <option value="SEO">SEO</option>
                <option value="DEVELOPMENT">DEVELOPMENT</option>
                <option value="AI STRATEGY">AI STRATEGY</option>
                <option value="MARKETPLACE">MARKETPLACE</option>
                <option value="B2B">B2B</option>
                <option value="BRAND">BRAND</option>
                <option value="CUSTOM">CUSTOM</option>
              </select>
            </div>
          </div>

          {/* Lead & Review Date & Business Model */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
                STRATEGY LEAD
              </label>
              <input
                type="text"
                value={strategyLead}
                onChange={(e) => setStrategyLead(e.target.value)}
                placeholder="e.g. Kaelen Voss"
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
                BUSINESS MODEL
              </label>
              <select
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value as BusinessModel)}
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
              >
                <option value="Ecommerce">Ecommerce</option>
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
                <option value="SaaS">SaaS</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Local">Local</option>
                <option value="Professional Services">Professional Services</option>
                <option value="D2C">D2C</option>
                <option value="Subscription">Subscription</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
                NEXT REVIEW DATE
              </label>
              <input
                type="text"
                value={nextReviewDate}
                onChange={(e) => setNextReviewDate(e.target.value)}
                placeholder="e.g. Aug 30, 2026"
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
              />
            </div>
          </div>

          {/* Description & Executive Summary */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
              DESCRIPTION
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-level summary of strategic objectives..."
              className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
              EXECUTIVE STRATEGIC SUMMARY
            </label>
            <textarea
              rows={3}
              value={executiveSummary}
              onChange={(e) => setExecutiveSummary(e.target.value)}
              placeholder="Written by strategist outlining target acquisition phase, creative strategy, and key metrics..."
              className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
            />
          </div>

          {/* Strategic Problem & Opportunity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
                PRIMARY STRATEGIC PROBLEM
              </label>
              <textarea
                rows={2}
                value={strategicProblem}
                onChange={(e) => setStrategicProblem(e.target.value)}
                placeholder="Core problem statement..."
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
                PRIMARY OPPORTUNITY
              </label>
              <textarea
                rows={2}
                value={strategicOpportunity}
                onChange={(e) => setStrategicOpportunity(e.target.value)}
                placeholder="Core strategic opportunity..."
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 rounded text-xs font-mono uppercase text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!selectedProjectId || !strategyName.trim()}
              className="px-5 py-2 bg-[#0099FF] text-black font-semibold rounded text-xs font-mono uppercase hover:bg-[#0099FF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CREATE STRATEGY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
