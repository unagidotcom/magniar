import React from 'react';
import { ProcessStage, ProcessStageId } from '../../types/process';
import { PROCESS_STAGES } from '../../data/processData';
import { RefreshCw, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface GrowthLoopCanvasProps {
  activeStageId: ProcessStageId;
  onSelectStage: (id: ProcessStageId) => void;
  motionActive?: boolean;
}

export const GrowthLoopCanvas: React.FC<GrowthLoopCanvasProps> = ({
  activeStageId,
  onSelectStage,
  motionActive = true,
}) => {
  const activeIndex = PROCESS_STAGES.findIndex((s) => s.id === activeStageId);

  return (
    <div className="w-full bg-[#080B10] border border-white/10 rounded-[2px] p-4 sm:p-6 lg:p-8 space-y-6 relative overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#0099FF_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* CANVAS HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0099FF] shadow-[0_0_10px_#0099FF] animate-pulse" />
          <span className="font-mono text-xs font-bold text-[#F5F7FA] tracking-widest uppercase">
            ITERATIVE GROWTH SYSTEM CANVAS
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="text-[11px] font-mono text-[#8D949E] hidden sm:inline">
            CONTINUOUS FEEDBACK LOOP ENGINE
          </span>
        </div>

        {/* LOOP BADGE */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded-[2px] font-mono text-[10px] text-[#0099FF] font-semibold">
          <RefreshCw className={`w-3 h-3 ${motionActive ? 'animate-spin [animation-duration:8s]' : ''}`} />
          <span>NON-LINEAR CONTINUOUS LOOP</span>
        </div>
      </div>

      {/* STAGE TRACKER GRID (8 STAGES) */}
      <div className="relative z-10 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
          {PROCESS_STAGES.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            const isPast = idx < activeIndex;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id)}
                className={`
                  relative p-3 sm:p-3.5 rounded-[2px] border text-left transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[90px] sm:min-h-[110px]
                  ${isActive
                    ? 'bg-[#0099FF]/15 border-[#0099FF] shadow-[0_0_20px_rgba(0,153,255,0.25)] text-white font-semibold transform -translate-y-0.5'
                    : isPast
                    ? 'bg-[#050505]/80 border-white/15 text-[#F5F7FA] hover:border-white/30'
                    : 'bg-[#050505]/40 border-white/5 text-[#8D949E] hover:text-[#F5F7FA] hover:border-white/20'
                  }
                `}
                aria-selected={isActive}
              >
                {/* Active Stage Signal Indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF] animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF] absolute" />
                  </div>
                )}

                <div>
                  <div className={`font-mono text-[10px] font-bold tracking-widest ${isActive ? 'text-[#0099FF]' : 'text-[#8D949E]'}`}>
                    {stage.number}
                  </div>
                  <div className={`font-mono text-xs font-bold tracking-wider mt-1 ${isActive ? 'text-white' : 'text-[#F5F7FA]'}`}>
                    {stage.name}
                  </div>
                </div>

                <div className="mt-2 text-[9px] font-mono uppercase tracking-tight text-[#8D949E] line-clamp-1 group-hover:text-white transition-colors">
                  {stage.tagline}
                </div>

                {/* Progress bar line underneath */}
                <div className="w-full bg-white/5 h-[2px] rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isActive ? 'bg-[#0099FF] w-full' : isPast ? 'bg-white/40 w-full' : 'bg-transparent w-0'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* FEEDBACK LOOP CONTINUATION LINE GRAPHIC */}
        <div className="pt-3 pb-1 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8D949E]">
          <div className="flex items-center gap-2">
            <span className="text-[#0099FF] font-bold">LOOP FEEDBACK VECTOR:</span>
            <span>08 / SCALE</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0099FF]" />
            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[2px] text-[#F5F7FA]">
              Feeds new data into 01 / DISCOVER
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[#8D949E]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" /> Active Stage
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" /> Sequence Direction
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
