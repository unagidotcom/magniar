import React, { useState, useMemo } from 'react';
import { CASE_STUDIES_DATA } from '../../data/workData';
import { WorkFilterState, CaseStudy } from '../../types/work';
import { WorkCard } from './WorkCard';
import { WorkFilters } from './WorkFilters';
import { Terminal, ShieldCheck, ArrowRight, Layers, RotateCcw } from 'lucide-react';

interface WorkPageProps {
  onSelectCaseStudy: (slug: string) => void;
  onStartProject: () => void;
  onSeeHowWeWork: () => void;
}

const DEFAULT_FILTER_STATE: WorkFilterState = {
  industry: 'all',
  businessModel: 'all',
  capability: 'all',
  service: 'all',
  platform: 'all',
  budgetRange: 'all',
  status: 'all',
  geography: 'all',
  searchQuery: '',
};

export function WorkPage({
  onSelectCaseStudy,
  onStartProject,
  onSeeHowWeWork,
}: WorkPageProps) {
  const [filterState, setFilterState] = useState<WorkFilterState>(DEFAULT_FILTER_STATE);

  // Filter Logic
  const filteredCaseStudies = useMemo(() => {
    return CASE_STUDIES_DATA.filter((cs) => {
      // Industry
      if (filterState.industry !== 'all' && cs.industryId !== filterState.industry) {
        return false;
      }

      // Capability
      if (
        filterState.capability !== 'all' &&
        !cs.capabilities.includes(filterState.capability as any)
      ) {
        return false;
      }

      // Platform
      if (
        filterState.platform !== 'all' &&
        !cs.platforms.some((p) => p.toLowerCase() === filterState.platform.toLowerCase())
      ) {
        return false;
      }

      // Budget Range
      if (filterState.budgetRange !== 'all' && cs.mediaBudgetDisplay !== filterState.budgetRange) {
        return false;
      }

      // Status
      if (filterState.status !== 'all' && cs.status !== filterState.status) {
        return false;
      }

      // Search Query
      if (filterState.searchQuery.trim() !== '') {
        const query = filterState.searchQuery.toLowerCase();
        const matchTitle = cs.title.toLowerCase().includes(query);
        const matchClient = cs.clientName.toLowerCase().includes(query);
        const matchSubtitle = cs.subtitle.toLowerCase().includes(query);
        const matchChallenge = cs.challenge.toLowerCase().includes(query);
        const matchServices = cs.servicesUsed.some((s) => s.toLowerCase().includes(query));

        if (!matchTitle && !matchClient && !matchSubtitle && !matchChallenge && !matchServices) {
          return false;
        }
      }

      return true;
    });
  }, [filterState]);

  const handleResetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto space-y-10">
        {/* Page Hero Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#B89A72]/10 border border-[#B89A72]/30 text-[#B89A72] text-xs font-mono font-semibold rounded-[2px] uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              WORK & CASE STUDIES INDEX
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F7FA]">
            VERIFIED WORK. <br />
            <span className="text-[#8D949E] font-normal">REAL CASE STUDIES ONLY.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#8D949E] max-w-3xl leading-relaxed">
            Verified client work will appear here once real case studies are published from the Admin OS.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#8D949E]">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              REAL CASE STUDIES ONLY
            </span>
            <span>•</span>
            <span>SHOWING {filteredCaseStudies.length} OF {CASE_STUDIES_DATA.length} CASE STUDIES</span>
          </div>
        </div>

        {/* Interactive Filter Bar */}
        <WorkFilters
          filterState={filterState}
          onFilterChange={setFilterState}
          onReset={handleResetFilters}
          totalResults={filteredCaseStudies.length}
        />

        {/* Case Study Grid */}
        {filteredCaseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((cs, idx) => (
              <WorkCard
                key={cs.id}
                caseStudy={cs}
                onSelect={onSelectCaseStudy}
                featuredLayout={idx === 0 && filteredCaseStudies.length >= 3}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-4">
            <Layers className="w-10 h-10 text-[#B89A72] mx-auto" />
            <h3 className="text-xl font-bold text-[#F5F7FA] font-mono">
              NO PUBLISHED CASE STUDIES YET
            </h3>
            <p className="text-xs font-mono text-[#8D949E] max-w-md mx-auto">
              Real client work will appear here once it is added and published through the Admin OS.
            </p>
            {CASE_STUDIES_DATA.length > 0 && (
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#B89A72] text-white text-xs font-mono font-semibold rounded-[2px] inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET ALL FILTERS</span>
              </button>
            )}
          </div>
        )}

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 bg-[#0A0C0F] border border-white/10 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#F5F7FA]">READY TO BUILD YOUR CASE STUDY?</h3>
            <p className="text-xs font-mono text-[#8D949E]">
              Tell us what you're building, where growth is constrained, and what you want to achieve.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartProject}
              className="px-6 py-3 bg-[#B89A72] hover:bg-[#8F714D] text-white font-mono text-xs font-semibold rounded-[2px] transition-all cursor-pointer"
            >
              START A PROJECT →
            </button>
            <button
              onClick={onSeeHowWeWork}
              className="px-6 py-3 border border-white/10 text-[#8D949E] hover:text-white font-mono text-xs rounded-[2px] transition-all cursor-pointer"
            >
              SEE PROCESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
