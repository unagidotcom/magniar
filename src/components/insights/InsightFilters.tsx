import React from 'react';
import {
  InsightFilterState,
  InsightCategoryFilter,
  InsightContentTypeFilter,
} from '../../types/insights';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';

interface InsightFiltersProps {
  filterState: InsightFilterState;
  onFilterChange: (newState: InsightFilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export function InsightFilters({
  filterState,
  onFilterChange,
  onReset,
  totalResults,
}: InsightFiltersProps) {
  const categories: { id: InsightCategoryFilter; label: string }[] = [
    { id: 'all', label: 'ALL CATEGORIES' },
    { id: 'performance', label: 'PERFORMANCE' },
    { id: 'commerce', label: 'COMMERCE' },
    { id: 'development', label: 'DEVELOPMENT' },
    { id: 'intelligence', label: 'AI + INTELLIGENCE' },
    { id: 'strategy', label: 'STRATEGY' },
    { id: 'observations', label: 'OBSERVATIONS' },
  ];

  const contentTypes: { id: InsightContentTypeFilter; label: string }[] = [
    { id: 'all', label: 'ALL CONTENT TYPES' },
    { id: 'ARTICLE', label: 'ARTICLES' },
    { id: 'ANALYSIS', label: 'ANALYSES' },
    { id: 'GUIDE', label: 'GUIDES' },
    { id: 'PLAYBOOK', label: 'PLAYBOOKS' },
    { id: 'REPORT', label: 'REPORTS' },
    { id: 'FRAMEWORK', label: 'FRAMEWORKS' },
    { id: 'OBSERVATION', label: 'OBSERVATIONS' },
    { id: 'EXPERIMENT', label: 'EXPERIMENTS' },
    { id: 'OPINION', label: 'OPINIONS' },
  ];

  const hasActiveFilters =
    filterState.category !== 'all' ||
    filterState.contentType !== 'all' ||
    filterState.searchQuery.trim() !== '';

  return (
    <div className="bg-[#0A0C0F] border border-white/10 rounded-[2px] p-4 sm:p-6 space-y-4 font-mono text-xs text-[#F5F7FA]">
      {/* Search & Meta Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8D949E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filterState, searchQuery: e.target.value })
            }
            placeholder="SEARCH INSIGHTS, TOPICS, OR KEYWORDS..."
            className="w-full bg-[#050505] border border-white/15 focus:border-[#B89A72] text-[#F5F7FA] placeholder-[#5A626E] text-xs pl-9 pr-3 py-2.5 rounded-[2px] focus:outline-none transition-colors"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filterState, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D949E] hover:text-white text-[10px]"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Content Type Selector & Reset */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89A72]" />
            <span className="text-[10px] text-[#8D949E] uppercase">TYPE:</span>
            <select
              value={filterState.contentType}
              onChange={(e) =>
                onFilterChange({
                  ...filterState,
                  contentType: e.target.value as InsightContentTypeFilter,
                })
              }
              className="bg-[#050505] border border-white/15 text-white text-xs px-3 py-2 rounded-[2px] focus:outline-none focus:border-[#B89A72]"
            >
              {contentTypes.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="px-3 py-2 border border-white/10 hover:border-white/30 text-[#8D949E] hover:text-white text-xs rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET FILTERS</span>
            </button>
          )}

          <div className="text-[11px] text-[#8D949E] border-l border-white/10 pl-3">
            <span>SHOWING {totalResults} ARTICLES</span>
          </div>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] text-[#5A626E] uppercase tracking-wider whitespace-nowrap mr-1">
          PILLAR:
        </span>
        {categories.map((cat) => {
          const isActive = filterState.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() =>
                onFilterChange({ ...filterState, category: cat.id })
              }
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#B89A72] text-white font-semibold shadow-sm'
                  : 'bg-[#050505] text-[#8D949E] hover:text-white border border-white/10 hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
