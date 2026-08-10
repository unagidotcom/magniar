import React, { useState } from 'react';
import { PROCESS_STAGES } from '../../data/processData';
import { ProcessStageId } from '../../types/process';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { MagniarButton } from '../common/MagniarButton';
import { ArrowRight, RefreshCw, PackageCheck } from 'lucide-react';

interface ProcessSectionProps {
  onExploreFullProcess?: () => void;
  onStartProject?: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  onExploreFullProcess,
  onStartProject,
}) => {
  const [activeStageId, setActiveStageId] = useState<ProcessStageId>('discover');

  const activeStage = PROCESS_STAGES.find((s) => s.id === activeStageId) || PROCESS_STAGES[0];

  return (
    <section id="process" className="py-24 sm:py-32 bg-[#050505] text-[#F5F7FA] relative border-b border-white/10 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0099FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 space-y-16 relative z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <TechnicalLabel text="METHODOLOGY & PROCESS" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
              <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
                ITERATIVE GROWTH METHODOLOGY
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
              FROM DIAGNOSIS TO <br />
              <span className="text-[#0099FF]">COMPOUNDING GROWTH.</span>
            </h2>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              We start by understanding the business, identify where growth is constrained, build the right systems, launch with discipline, and continuously optimize around real data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <MagniarButton variant="primary" size="lg" onClick={onExploreFullProcess}>
              SEE HOW WE WORK →
            </MagniarButton>
          </div>
        </div>

        {/* 8-STAGE HORIZONTAL SELECTOR TRACK */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-sans text-xs text-slate-300">
            <span className="text-[#0099FF] font-heading font-bold uppercase tracking-wider text-sm">8-STAGE GROWTH METHODOLOGY</span>
            <span className="hidden sm:inline font-medium">Click any stage to explore details</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PROCESS_STAGES.map((stage) => {
              const isActive = stage.id === activeStageId;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`
                    p-4 rounded-[2px] border text-left transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[96px] relative
                    ${isActive
                      ? 'bg-[#0099FF]/15 border-[#0099FF] text-white font-bold shadow-[0_0_15px_rgba(0,153,255,0.25)]'
                      : 'bg-[#0A0D12] border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                    }
                  `}
                >
                  <div>
                    <div className={`font-heading text-xs font-bold ${isActive ? 'text-[#0099FF]' : 'text-slate-400'}`}>
                      {stage.number}
                    </div>
                    <div className="font-heading text-sm font-bold tracking-wide mt-1 truncate">
                      {stage.name}
                    </div>
                  </div>

                  <div className="text-[11px] font-sans text-slate-400 uppercase tracking-tight truncate mt-2 font-medium">
                    {stage.output.split(' ')[0]}...
                  </div>

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0099FF]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE STAGE PREVIEW CARD */}
        <div className="bg-[#0A0D12] border border-[#0099FF]/40 rounded-[2px] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0099FF]">{activeStage.number}</span>
              <span className="text-white/20">/</span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {activeStage.name}
              </h3>
              <span className="font-sans text-xs text-[#0099FF] font-semibold tracking-wider uppercase px-2.5 py-1 bg-[#0099FF]/10 rounded border border-[#0099FF]/30">
                {activeStage.tagline}
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-normal">
              {activeStage.fullDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              {activeStage.includes.slice(0, 3).map((inc, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#050505] border border-white/10 rounded-[2px] text-xs font-sans text-slate-300 font-medium">
                  ✓ {inc}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#050505] border border-white/10 rounded-[2px] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-sans text-xs text-[#0099FF] font-bold tracking-wider uppercase">
                <PackageCheck className="w-4 h-4 text-[#0099FF]" />
                <span>STAGE DELIVERABLE</span>
              </div>
              <div className="font-heading text-base font-bold text-white leading-snug">
                {activeStage.output}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-sans text-xs">
              <span className="text-slate-400 font-medium">CONTINUOUS LOOP</span>
              <button
                onClick={onExploreFullProcess}
                className="text-[#0099FF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>FULL STAGE DETAILS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* FEEDBACK LOOP CONCEPT BANNER */}
        <div className="p-6 bg-[#0A0D12] border border-white/10 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-[#0099FF] animate-spin [animation-duration:10s]" />
            <span className="text-slate-200 font-medium text-sm">
              Growth is a continuous loop: scaling insights feed directly back into discovery.
            </span>
          </div>

          <button
            onClick={onExploreFullProcess}
            className="text-[#0099FF] font-semibold hover:underline shrink-0 cursor-pointer text-xs uppercase tracking-wider"
          >
            EXPLORE FULL METHODOLOGY →
          </button>
        </div>
      </div>
    </section>
  );
};

