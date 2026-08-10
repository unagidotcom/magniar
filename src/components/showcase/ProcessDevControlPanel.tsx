import React from 'react';
import { ViewportMode } from '../../types/navigation';
import { ProcessStageId } from '../../types/process';
import { Sliders, RefreshCw, Smartphone, Monitor } from 'lucide-react';

interface ProcessDevControlPanelProps {
  currentViewport: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  activeViewMode: 'homepage' | 'process-page';
  onViewModeChange: (mode: 'homepage' | 'process-page') => void;
  activeStageId: ProcessStageId;
  onStageSelect: (id: ProcessStageId) => void;
  motionActive: boolean;
  onMotionToggle: () => void;
}

export const ProcessDevControlPanel: React.FC<ProcessDevControlPanelProps> = ({
  currentViewport,
  onViewportChange,
  activeViewMode,
  onViewModeChange,
  activeStageId,
  onStageSelect,
  motionActive,
  onMotionToggle,
}) => {
  return (
    <div className="p-4 rounded-[2px] bg-[#0A0D12] border border-[#0099FF]/40 text-xs font-mono space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-[#0099FF] font-bold tracking-wider">
          <Sliders className="w-4 h-4 text-[#0099FF]" />
          <span>CHAPTER 06 PROCESS DEV & CONTROL PANEL</span>
        </div>
        <div className="text-[10px] text-[#8D949E]">
          PROTOTYPE INSPECTION TOOL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* VIEW MODE TOGGLE */}
        <div className="space-y-1.5">
          <div className="text-[#8D949E] text-[10px] uppercase font-semibold">
            CANVAS VIEW MODE:
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onViewModeChange('homepage')}
              className={`flex-1 py-1.5 px-2 rounded-[2px] border text-[10px] font-bold cursor-pointer transition-all ${
                activeViewMode === 'homepage'
                  ? 'bg-[#0099FF] text-white border-[#0099FF]'
                  : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              HOMEPAGE (INC. PROCESS)
            </button>
            <button
              onClick={() => onViewModeChange('process-page')}
              className={`flex-1 py-1.5 px-2 rounded-[2px] border text-[10px] font-bold cursor-pointer transition-all ${
                activeViewMode === 'process-page'
                  ? 'bg-[#0099FF] text-white border-[#0099FF]'
                  : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              FULL /PROCESS PAGE
            </button>
          </div>
        </div>

        {/* VIEWPORT BREAKPOINTS */}
        <div className="space-y-1.5">
          <div className="text-[#8D949E] text-[10px] uppercase font-semibold">
            VIEWPORT BREAKPOINT:
          </div>
          <div className="flex gap-1.5">
            {[
              { id: '1440px', label: '1440' },
              { id: '1280px', label: '1280' },
              { id: '1024px', label: '1024' },
              { id: '768px', label: '768' },
              { id: '390px', label: '390' },
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

        {/* STAGE SELECTOR */}
        <div className="space-y-1.5">
          <div className="text-[#8D949E] text-[10px] uppercase font-semibold">
            ACTIVE STAGE QUICK SELECT:
          </div>
          <div className="flex flex-wrap gap-1">
            {['discover', 'diagnose', 'strategize', 'build', 'launch', 'measure', 'optimize', 'scale'].map((stg) => (
              <button
                key={stg}
                onClick={() => onStageSelect(stg as ProcessStageId)}
                className={`py-1 px-1.5 rounded-[2px] border text-[9px] uppercase cursor-pointer ${
                  activeStageId === stg
                    ? 'bg-[#0099FF] text-white border-[#0099FF] font-bold'
                    : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
                }`}
              >
                {stg.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* MOTION CONTROLS */}
        <div className="space-y-1.5">
          <div className="text-[#8D949E] text-[10px] uppercase font-semibold">
            LOOP SIGNAL MOTION:
          </div>
          <button
            onClick={onMotionToggle}
            className={`w-full py-1.5 px-2 rounded-[2px] border text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              motionActive
                ? 'bg-[#0099FF]/20 text-[#0099FF] border-[#0099FF]'
                : 'bg-[#050505] text-[#8D949E] border-white/10'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${motionActive ? 'animate-spin [animation-duration:6s]' : ''}`} />
            <span>{motionActive ? 'MOTION ACTIVE (LOOP ON)' : 'REDUCED MOTION (STATIC)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
