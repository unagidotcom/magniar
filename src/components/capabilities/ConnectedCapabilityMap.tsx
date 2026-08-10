import React, { useState } from 'react';
import { CONNECTED_CAPABILITY_LOOP, BUSINESS_JOURNEY_EXAMPLE } from '../../data/capabilitiesData';
import { CapabilityPillarId } from '../../types/capabilities';
import { RefreshCw, Zap, ArrowRight, Activity, Cpu, ShieldCheck } from 'lucide-react';

interface ConnectedCapabilityMapProps {
  activePillar?: CapabilityPillarId;
  onSelectPillar?: (pillarId: CapabilityPillarId) => void;
}

export const ConnectedCapabilityMap: React.FC<ConnectedCapabilityMapProps> = ({
  activePillar = 'performance',
  onSelectPillar
}) => {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <div className="space-y-10 py-6">
      {/* SECTION HEADER */}
      <div className="p-6 rounded-[2px] bg-[#0A0D12] border border-white/10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-[#0099FF] font-bold tracking-widest flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#0099FF] animate-spin-slow" />
            07 / CONNECTED CAPABILITY MODEL
          </span>
          <span className="px-2 py-0.5 rounded bg-[#0099FF]/20 text-[#0099FF] text-[10px] font-semibold border border-[#0099FF]/40">
            SYSTEM LOOP ARCHITECTURE
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          GROWTH DOESN'T HAPPEN IN SILOS.
        </h3>
        <p className="text-xs text-[#8D949E] font-sans font-light leading-relaxed max-w-3xl">
          Individual growth channels fail when disconnected from storefront conversion and attribution pipelines. Magniar operates as a unified feedback system where performance ads drive conversion, storefront technology captures clean first-party data, and AI analytics optimizes ad budget allocation continuously.
        </p>
      </div>

      {/* VISUAL LOOP ARCHITECTURE DIAGRAM */}
      <div className="p-8 rounded-[2px] bg-[#05070A] border border-white/10 space-y-8 relative overflow-hidden">
        {/* Ambient Signal Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />

        <div className="relative z-10 space-y-6">
          <div className="font-mono text-xs text-[#5A626E] uppercase tracking-widest flex items-center justify-between border-b border-white/10 pb-3">
            <span>THE MAGNIAR RECURSIVE GROWTH LOOP</span>
            <span className="text-[#0099FF]">CONTINUOUS FEEDBACK ENGINE</span>
          </div>

          {/* Connected Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {CONNECTED_CAPABILITY_LOOP.map((step, idx) => {
              const isHovered = hoveredStep === step.id;
              const isActivePillar = activePillar === step.pillarId;

              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => onSelectPillar?.(step.pillarId)}
                  className={`
                    p-5 rounded-[2px] border transition-all cursor-pointer relative space-y-3
                    ${isHovered || isActivePillar
                      ? 'bg-[#0A0D12] border-[#0099FF] shadow-[0_0_20px_rgba(0,153,255,0.2)]'
                      : 'bg-[#030508] border-white/10 hover:border-white/30'
                    }
                  `}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="w-6 h-6 rounded-full bg-[#0099FF]/20 text-[#0099FF] flex items-center justify-center font-bold">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] text-[#8D949E] uppercase tracking-wider font-semibold">
                      {step.pillarId}
                    </span>
                  </div>

                  <h4 className="font-mono text-sm font-bold text-white tracking-wide">
                    {step.label}
                  </h4>

                  <p className="text-xs text-[#8D949E] font-sans font-light leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 space-y-1">
                    <div className="font-mono text-[9px] text-[#5A626E] uppercase tracking-widest">
                      SYSTEM OUTPUT SIGNAL:
                    </div>
                    <div className="font-mono text-xs text-[#0099FF] font-semibold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#0099FF]" />
                      <span>{step.outputSignal}</span>
                    </div>
                  </div>

                  {/* Flow Arrow to Next Step (Desktop) */}
                  {idx < CONNECTED_CAPABILITY_LOOP.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#0099FF]">
                      <ArrowRight className="w-5 h-5 bg-[#05070A] rounded-full border border-[#0099FF]/40 p-0.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* DEVELOPMENT FOUNDATION BASE BAR */}
          <div className="p-4 rounded-[2px] bg-[#0A0D12] border border-[#0099FF]/40 space-y-2 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-[#0099FF] font-bold tracking-widest uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0099FF]" />
                DEVELOPMENT & INFRASTRUCTURE FOUNDATION
              </span>
              <span className="text-[#8D949E] text-[10px]">SUPPORTS ALL 4 STAGES</span>
            </div>
            <p className="text-xs text-[#8D949E] font-sans font-light leading-relaxed">
              Custom web engineering, server-side tracking, API integrations, and marketing webhooks provide the reliable technical foundation that allows Performance, Commerce, and Intelligence to operate without friction.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 08: EXAMPLE BUSINESS JOURNEY */}
      <div className="p-6 sm:p-8 rounded-[2px] bg-[#07090D] border border-white/10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs border-b border-white/10 pb-3">
          <span className="text-white font-bold tracking-wider uppercase flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
            08 / EXAMPLE CONNECTED SYSTEM IN PRACTICE
          </span>
          <span className="text-[#0099FF]">{BUSINESS_JOURNEY_EXAMPLE.businessType}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="space-y-3">
            <div className="font-mono text-xs text-[#5A626E] uppercase tracking-wider font-semibold">
              THE BUSINESS CHALLENGE:
            </div>
            <p className="text-xs text-[#8D949E] leading-relaxed font-light bg-[#030508] p-4 rounded-[2px] border border-white/5">
              {BUSINESS_JOURNEY_EXAMPLE.challenge}
            </p>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-xs text-[#5A626E] uppercase tracking-wider font-semibold">
              INTEGRATED MAGNIAR SOLUTION STACK:
            </div>
            <ul className="space-y-2 text-xs text-[#F5F7FA] font-light">
              {BUSINESS_JOURNEY_EXAMPLE.componentsUsed.map((comp, i) => (
                <li key={i} className="flex items-start gap-2 bg-[#030508] p-2.5 rounded-[2px] border border-white/5">
                  <span className="text-[#0099FF] font-mono font-bold">0{i + 1}.</span>
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-[2px] bg-[#0A0D12] border border-[#0099FF]/30 font-mono text-xs space-y-1">
          <div className="text-[#0099FF] font-bold uppercase tracking-wider">
            SYSTEM OUTCOME:
          </div>
          <p className="text-xs text-[#8D949E] font-sans font-light leading-relaxed">
            {BUSINESS_JOURNEY_EXAMPLE.systemOutcome}
          </p>
        </div>
      </div>
    </div>
  );
};
