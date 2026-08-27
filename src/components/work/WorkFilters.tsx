import React, { useState } from 'react';
import { WorkFilterState, CaseStudyStatus } from '../../types/work';
import { CapabilityPillarId } from '../../types/capabilities';
import { IndustryCategoryId } from '../../types/industries';
import { Filter, X, RotateCcw, Search, ChevronDown, Check } from 'lucide-react';

interface WorkFiltersProps {
  filterState: WorkFilterState;
  onFilterChange: (newState: WorkFilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export function WorkFilters({ filterState, onFilterChange, onReset, totalResults }: WorkFiltersProps) {
  const [isExpandedMobile, setIsExpandedMobile] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const activeFilterCount = Object.entries(filterState).filter(
    ([key, value]) => key !== 'searchQuery' && value !== 'all'
  ).length;

  const handleSelect = (key: keyof WorkFilterState, value: string) => {
    onFilterChange({
      ...filterState,
      [key]: value,
    });
  };

  const industries: { id: IndustryCategoryId | 'all'; label: string }[] = [
    { id: 'all', label: 'All Industries' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'retail', label: 'Retail & Brands' },
    { id: 'b2b', label: 'B2B & Enterprise' },
    { id: 'saas-technology', label: 'Tech & SaaS' },
    { id: 'professional-services', label: 'Professional Services' },
    { id: 'dtc-consumer', label: 'Consumer Goods & DTC' },
  ];

  const capabilities: { id: CapabilityPillarId | 'all'; label: string }[] = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'performance', label: 'Performance Marketing' },
    { id: 'commerce', label: 'Commerce Infrastructure' },
    { id: 'development', label: 'Custom Web Dev' },
    { id: 'intelligence', label: 'AI & Data Intelligence' },
  ];

  const platforms = [
    'all',
    'Meta',
    'Google',
    'Shopify',
    'Amazon',
    'LinkedIn',
    'TikTok',
    'Klaviyo',
  ];

  const budgets = [
    'all',
    '$5K–$10K / month',
    '$10K–$25K / month',
    '$25K–$50K / month',
    '$50K+ / month',
  ];

  const statuses: { id: CaseStudyStatus | 'all'; label: string }[] = [
    { id: 'all', label: 'All Statuses' },
    { id: 'ACTIVE_CLIENT', label: 'Active Client' },
    { id: 'ONGOING', label: 'Ongoing Engagement' },
    { id: 'COMPLETED', label: 'Completed Project' },
    { id: 'SELECTED_PROJECT', label: 'Selected Showcase' },
  ];

  return (
    <div className="bg-[#0A0C0F] border border-white/10 rounded-[2px] p-4 sm:p-5 mb-8">
      {/* Search and Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D949E]" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={(e) => onFilterChange({ ...filterState, searchQuery: e.target.value })}
            placeholder="Search by client, capability, platform, objective..."
            className="w-full bg-[#050505] border border-white/10 text-white placeholder-[#5A626E] text-xs font-mono pl-10 pr-4 py-2.5 rounded-[2px] focus:outline-none focus:border-[#B89A72]"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filterState, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D949E] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Quick Dropdown Triggers */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Industry Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'industry' ? null : 'industry')}
              className={`px-3 py-2 text-xs font-mono rounded-[2px] border flex items-center gap-1.5 transition-colors ${
                filterState.industry !== 'all'
                  ? 'border-[#B89A72] text-[#B89A72] bg-[#B89A72]/10'
                  : 'border-white/10 text-[#8D949E] hover:text-white bg-[#050505]'
              }`}
            >
              <span>
                {filterState.industry === 'all'
                  ? 'INDUSTRY'
                  : industries.find((i) => i.id === filterState.industry)?.label}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-current" />
            </button>

            {activeDropdown === 'industry' && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0D1015] border border-white/10 rounded-[2px] shadow-xl z-50 py-1 font-mono text-xs">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => {
                      handleSelect('industry', ind.id);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-[#B89A72]/20 flex items-center justify-between text-[#8D949E] hover:text-white"
                  >
                    <span>{ind.label}</span>
                    {filterState.industry === ind.id && <Check className="w-3.5 h-3.5 text-[#B89A72]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Capability Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'capability' ? null : 'capability')}
              className={`px-3 py-2 text-xs font-mono rounded-[2px] border flex items-center gap-1.5 transition-colors ${
                filterState.capability !== 'all'
                  ? 'border-[#B89A72] text-[#B89A72] bg-[#B89A72]/10'
                  : 'border-white/10 text-[#8D949E] hover:text-white bg-[#050505]'
              }`}
            >
              <span>
                {filterState.capability === 'all'
                  ? 'CAPABILITY'
                  : capabilities.find((c) => c.id === filterState.capability)?.label}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-current" />
            </button>

            {activeDropdown === 'capability' && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0D1015] border border-white/10 rounded-[2px] shadow-xl z-50 py-1 font-mono text-xs">
                {capabilities.map((cap) => (
                  <button
                    key={cap.id}
                    onClick={() => {
                      handleSelect('capability', cap.id);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-[#B89A72]/20 flex items-center justify-between text-[#8D949E] hover:text-white"
                  >
                    <span>{cap.label}</span>
                    {filterState.capability === cap.id && <Check className="w-3.5 h-3.5 text-[#B89A72]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Platform Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'platform' ? null : 'platform')}
              className={`px-3 py-2 text-xs font-mono rounded-[2px] border flex items-center gap-1.5 transition-colors ${
                filterState.platform !== 'all'
                  ? 'border-[#B89A72] text-[#B89A72] bg-[#B89A72]/10'
                  : 'border-white/10 text-[#8D949E] hover:text-white bg-[#050505]'
              }`}
            >
              <span>{filterState.platform === 'all' ? 'PLATFORM' : filterState.platform}</span>
              <ChevronDown className="w-3.5 h-3.5 text-current" />
            </button>

            {activeDropdown === 'platform' && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-[#0D1015] border border-white/10 rounded-[2px] shadow-xl z-50 py-1 font-mono text-xs">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      handleSelect('platform', p);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-[#B89A72]/20 flex items-center justify-between text-[#8D949E] hover:text-white"
                  >
                    <span>{p === 'all' ? 'All Platforms' : p}</span>
                    {filterState.platform === p && <Check className="w-3.5 h-3.5 text-[#B89A72]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Budget Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'budget' ? null : 'budget')}
              className={`px-3 py-2 text-xs font-mono rounded-[2px] border flex items-center gap-1.5 transition-colors ${
                filterState.budgetRange !== 'all'
                  ? 'border-[#B89A72] text-[#B89A72] bg-[#B89A72]/10'
                  : 'border-white/10 text-[#8D949E] hover:text-white bg-[#050505]'
              }`}
            >
              <span>{filterState.budgetRange === 'all' ? 'BUDGET' : filterState.budgetRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-current" />
            </button>

            {activeDropdown === 'budget' && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#0D1015] border border-white/10 rounded-[2px] shadow-xl z-50 py-1 font-mono text-xs">
                {budgets.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      handleSelect('budgetRange', b);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-[#B89A72]/20 flex items-center justify-between text-[#8D949E] hover:text-white"
                  >
                    <span>{b === 'all' ? 'All Budgets' : b}</span>
                    {filterState.budgetRange === b && <Check className="w-3.5 h-3.5 text-[#B89A72]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle & Reset Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpandedMobile(!isExpandedMobile)}
            className="lg:hidden px-3 py-2 text-xs font-mono rounded-[2px] border border-white/10 bg-[#050505] text-[#8D949E] hover:text-white flex items-center gap-2"
          >
            <Filter className="w-3.5 h-3.5 text-[#B89A72]" />
            <span>FILTERS</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#B89A72] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={onReset}
              className="px-3 py-2 text-xs font-mono rounded-[2px] border border-white/10 bg-white/5 text-[#8D949E] hover:text-white hover:border-white/20 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-[#B89A72]" />
              <span>RESET ({activeFilterCount})</span>
            </button>
          )}

          <div className="hidden sm:block text-xs font-mono text-[#5A626E] border-l border-white/10 pl-3">
            <span>SHOWING <strong className="text-[#B89A72]">{totalResults}</strong> CASE STUDIES</span>
          </div>
        </div>
      </div>

      {/* Expanded Mobile & Multi-Dimension Filter Panel */}
      {isExpandedMobile && (
        <div className="mt-4 pt-4 border-t border-white/10 lg:hidden space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#8D949E] block mb-1">INDUSTRY</label>
              <select
                value={filterState.industry}
                onChange={(e) => handleSelect('industry', e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white py-2 px-3 rounded-[2px]"
              >
                {industries.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#8D949E] block mb-1">CAPABILITY</label>
              <select
                value={filterState.capability}
                onChange={(e) => handleSelect('capability', e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white py-2 px-3 rounded-[2px]"
              >
                {capabilities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#8D949E] block mb-1">PLATFORM</label>
              <select
                value={filterState.platform}
                onChange={(e) => handleSelect('platform', e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white py-2 px-3 rounded-[2px]"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p === 'all' ? 'All Platforms' : p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#8D949E] block mb-1">MEDIA BUDGET</label>
              <select
                value={filterState.budgetRange}
                onChange={(e) => handleSelect('budgetRange', e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white py-2 px-3 rounded-[2px]"
              >
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b === 'all' ? 'All Budgets' : b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#8D949E] block mb-1">ENGAGEMENT STATUS</label>
              <select
                value={filterState.status}
                onChange={(e) => handleSelect('status', e.target.value)}
                className="w-full bg-[#050505] border border-white/10 text-white py-2 px-3 rounded-[2px]"
              >
                {statuses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsExpandedMobile(false)}
              className="px-4 py-2 bg-[#B89A72] text-white font-semibold rounded-[2px]"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
