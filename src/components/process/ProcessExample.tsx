import React, { useState } from 'react';
import { REAL_EXAMPLE_JOURNEY } from '../../data/processData';
import { FileText, ArrowRight, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export const ProcessExample: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <div className="bg-[#0A0D12] border border-white/10 rounded-[2px] p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* CONCEPTUAL EXAMPLE WATERMARK STAMP */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-white/5 border border-white/10 rounded-[2px] font-mono text-[10px] text-[#8D949E] uppercase tracking-widest pointer-events-none">
        CONCEPTUAL CASE ILLUSTRATION
      </div>

      {/* HEADER */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-xs text-[#0099FF] font-semibold tracking-widest uppercase">
          <FileText className="w-3.5 h-3.5" />
          <span>IN ACTION: CASE ILLUSTRATION</span>
        </div>
        <h3 className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
          {REAL_EXAMPLE_JOURNEY.title}
        </h3>
        <div className="flex flex-wrap gap-3 font-mono text-xs text-[#8D949E] pt-1">
          <span className="px-2.5 py-1 bg-[#050505] border border-white/10 rounded-[2px] text-[#F5F7FA]">
            CLIENT PROFILE: {REAL_EXAMPLE_JOURNEY.clientType}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#8D949E] bg-[#050505] p-3 border border-white/10 rounded-[2px] leading-relaxed">
          <strong className="text-white font-mono">PRIMARY BOTTLENECK:</strong> {REAL_EXAMPLE_JOURNEY.challenge}
        </p>
      </div>

      {/* INTERACTIVE STAGE STEPPERS */}
      <div className="space-y-4">
        <div className="font-mono text-xs text-[#0099FF] font-bold tracking-widest uppercase">
          STEP-BY-STEP SYSTEM EXECUTION PATH:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {REAL_EXAMPLE_JOURNEY.steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;

            return (
              <button
                key={step.stageId}
                onClick={() => setActiveStepIndex(idx)}
                className={`
                  p-2.5 rounded-[2px] border text-left font-mono text-xs cursor-pointer transition-all duration-200
                  ${isActive
                    ? 'bg-[#0099FF] text-white font-bold border-[#0099FF] shadow-[0_0_15px_rgba(0,153,255,0.4)]'
                    : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white hover:border-white/20'
                  }
                `}
              >
                <div className="text-[10px] opacity-75">STEP 0{idx + 1}</div>
                <div className="font-bold truncate">{step.stageName.split('/')[1]?.trim()}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE STEP DETAILS DISPLAY */}
      {(() => {
        const step = REAL_EXAMPLE_JOURNEY.steps[activeStepIndex];
        return (
          <div className="bg-[#050505] border border-[#0099FF]/40 rounded-[2px] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-sm font-bold text-[#0099FF] tracking-wider">
                {step.stageName} — ACTION & OUTCOME
              </span>
              <span className="font-mono text-[10px] text-[#8D949E]">
                STAGE {activeStepIndex + 1} OF 8
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#8D949E] uppercase tracking-wider block">
                  SYSTEM DIAGNOSTIC & ACTION:
                </span>
                <p className="text-[#F5F7FA] leading-relaxed">
                  {step.action}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#0099FF] uppercase tracking-wider block">
                  VERIFIED OUTCOME:
                </span>
                <p className="text-[#F5F7FA] leading-relaxed font-semibold">
                  {step.outcome}
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* NO GUARANTEED RESULTS DISCLAIMER */}
      <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/10 rounded-[2px] text-[11px] text-[#8D949E] font-mono">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-semibold">METHODOLOGY NOTICE: </span>
          {REAL_EXAMPLE_JOURNEY.disclaimer}
        </div>
      </div>
    </div>
  );
};
