import React from 'react';
import { ViewportMode } from '../../types/navigation';
import { CapabilityPillarId } from '../../types/capabilities';
import { Monitor, Smartphone, Tablet, Sliders, RefreshCcw, Eye, Layers } from 'lucide-react';

interface CapabilitiesDevControlPanelProps {
  currentViewport: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  activeViewMode: 'homepage' | 'capabilities-page';
  onViewModeChange: (mode: 'homepage' | 'capabilities-page') => void;
  activePillarFilter: CapabilityPillarId | 'all';
  onPillarFilterChange: (pillar: CapabilityPillarId | 'all') => void;
}

export const CapabilitiesDevControlPanel: React.FC<CapabilitiesDevControlPanelProps> = ({
  currentViewport,
  onViewportChange,
  activeViewMode,
  onViewModeChange,
  activePillarFilter,
  onPillarFilterChange,
}) => {
  return (
    <div className="p-4 rounded-[2px] bg-[#0A0D12] border border-[#0099FF]/40 text-xs font-mono space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-[#0099FF] font-bold tracking-wider">
          <Sliders className="w-4 h-4 text-[#0099FF]" />
          <span>CHAPTER 05 CAPABILITIES DEV & VIEW CONTROL PANEL</span>
        </div>
        <div className="text-[10px] text-[#8D949E]">
          PROTOTYPE INSPECTION TOOL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* VIEW MODE TOGGLE */}
        <div className="space-y-1.5">
          <div className="text-[#8D949E] text-[10px] uppercase font-semibold">
            CANVAS VIEW MODE:
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onViewModeChange('homepage')}
              className={`flex-1 py-1.5 px-2 rounded-[2px] border text-[11px] font-bold cursor-pointer transition-all ${
                activeViewMode === 'homepage'
                  ? 'bg-[#0099FF] text-white border-[#0099FF]'
                  : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              HOMEPAGE (INC. CAPABILITIES)
            </button>
            <button
              onClick={() => onViewModeChange('capabilities-page')}
              className={`flex-1 py-1.5 px-2 rounded-[2px] border text-[11px] font-bold cursor-pointer transition-all ${
                activeViewMode === 'capabilities-page'
                  ? 'bg-[#0099FF] text-white border-[#0099FF]'
                  : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              FULL /CAPABILITIES PAGE
            </button>
          </div>
        </div>

        {/* VIEWPORT SIMULATOR PRESETS */}
        <div className="space-y-1.5">
          <div className="text-[#8D949E] text-[10px] uppercase font-semibold">
            VIEWPORT BREAKPOINT:
          </div>
          <div className="flex gap-1.5">
            {[
              { id: '1440px', label: '1440px' },
              { id: '1280px', label: '1280px' },
              { id: '1024px', label: '1024px' },
              { id: '768px', label: '768px' },
              { id: '390px', label: '390px' },
            ].map((vp) => (
              <button
                key={vp.id}
                onClick={() => onViewportChange(vp.id as ViewportMode)}
                className={`py-1 px-2 rounded-[2px] border text-[10px] cursor-pointer ${
                  currentViewport === vp.id
                    ? 'bg-[#0099FF] text-white border-[#0099FF] font-bold'
                    : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
                }`}
              >
                {vp.label}
              </button>
            ))}
          </div>
        </div>

        {/* PILLAR QUICK FILTER */}
        <div className="space-y-1.5">
          <div className="text-[#8D949E] text-[10px] uppercase font-semibold">
            ACTIVE PILLAR FILTER:
          </div>
          <div className="flex gap-1">
            {['all', 'performance', 'commerce', 'development', 'intelligence'].map((p) => (
              <button
                key={p}
                onClick={() => onPillarFilterChange(p as CapabilityPillarId | 'all')}
                className={`py-1 px-2 rounded-[2px] border text-[10px] uppercase cursor-pointer ${
                  activePillarFilter === p
                    ? 'bg-[#0099FF] text-white border-[#0099FF] font-bold'
                    : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
                }`}
              >
                {p === 'all' ? 'ALL' : p.slice(0, 4)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
