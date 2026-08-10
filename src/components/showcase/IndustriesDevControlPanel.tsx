import React from 'react';
import { ViewportMode } from '../../types/navigation';
import { IndustryCategoryId } from '../../types/industries';
import { INDUSTRY_CATEGORIES } from '../../data/industriesData';
import { Monitor, Smartphone, Tablet, Sliders, Layers, RefreshCw } from 'lucide-react';

interface IndustriesDevControlPanelProps {
  currentViewport: ViewportMode;
  onViewportChange: (viewport: ViewportMode) => void;
  activeViewMode: 'homepage' | 'industries-page';
  onViewModeChange: (mode: 'homepage' | 'industries-page') => void;
  activeCategoryId?: IndustryCategoryId;
  onCategorySelect?: (id: IndustryCategoryId) => void;
}

export const IndustriesDevControlPanel: React.FC<IndustriesDevControlPanelProps> = ({
  currentViewport,
  onViewportChange,
  activeViewMode,
  onViewModeChange,
  activeCategoryId = 'ecommerce',
  onCategorySelect,
}) => {
  return (
    <div className="bg-[#0A0D12] border border-white/10 rounded-[2px] p-4 font-mono text-xs text-[#8D949E] space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-white font-bold">
          <Sliders className="w-4 h-4 text-[#0099FF]" />
          <span>CHAPTER 07 DIAGNOSTICS & CONTROL PANEL</span>
        </div>
        <span className="text-[10px] text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-2 py-0.5 rounded-[2px]">
          INDUSTRIES / BUSINESS TYPES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* VIEWPORT SELECTOR */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-[#5A626E] uppercase block">01 / SCREEN VIEWPORT SIMULATION</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onViewportChange('1440px')}
              className={`px-2.5 py-1 rounded-[2px] border text-[11px] cursor-pointer flex items-center gap-1 ${
                currentViewport === '1440px'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>1440px</span>
            </button>
            <button
              onClick={() => onViewportChange('1024px')}
              className={`px-2.5 py-1 rounded-[2px] border text-[11px] cursor-pointer flex items-center gap-1 ${
                currentViewport === '1024px'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>1024px</span>
            </button>
            <button
              onClick={() => onViewportChange('768px')}
              className={`px-2.5 py-1 rounded-[2px] border text-[11px] cursor-pointer flex items-center gap-1 ${
                currentViewport === '768px'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              <Tablet className="w-3 h-3" />
              <span>768px</span>
            </button>
            <button
              onClick={() => onViewportChange('390px')}
              className={`px-2.5 py-1 rounded-[2px] border text-[11px] cursor-pointer flex items-center gap-1 ${
                currentViewport === '390px'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>390px</span>
            </button>
          </div>
        </div>

        {/* PAGE VIEW SWITCHER */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-[#5A626E] uppercase block">02 / DISPLAY VIEW</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onViewModeChange('homepage')}
              className={`px-3 py-1 rounded-[2px] border text-[11px] cursor-pointer flex items-center gap-1.5 ${
                activeViewMode === 'homepage'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>HOMEPAGE SECTION</span>
            </button>

            <button
              onClick={() => onViewModeChange('industries-page')}
              className={`px-3 py-1 rounded-[2px] border text-[11px] cursor-pointer flex items-center gap-1.5 ${
                activeViewMode === 'industries-page'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>FULL /INDUSTRIES PAGE</span>
            </button>
          </div>
        </div>

        {/* QUICK ACTIVE INDUSTRY SELECTOR */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-[#5A626E] uppercase block">03 / ACTIVE INDUSTRY FOCUS</span>
          <select
            value={activeCategoryId}
            onChange={(e) => onCategorySelect && onCategorySelect(e.target.value as IndustryCategoryId)}
            className="w-full bg-[#050505] border border-white/10 text-white text-xs px-2.5 py-1 rounded-[2px] cursor-pointer focus:outline-none focus:border-[#0099FF]"
          >
            {INDUSTRY_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.numberLabel} — {cat.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
