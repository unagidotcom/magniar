import React, { useState } from 'react';
import { CAPABILITY_PILLARS, CONNECTED_CAPABILITY_LOOP } from '../../data/capabilitiesData';
import { CapabilityPillarId } from '../../types/capabilities';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { MagniarButton } from '../common/MagniarButton';
import { ArrowRight, ChevronRight, Layers } from 'lucide-react';

interface CapabilitiesSectionProps {
  onExploreFullCapabilities?: () => void;
  onSelectService?: (serviceId: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  onExploreFullCapabilities,
  onSelectService,
}) => {
  const [activePillarId, setActivePillarId] = useState<CapabilityPillarId>('performance');

  const activePillar = CAPABILITY_PILLARS.find((p) => p.id === activePillarId) || CAPABILITY_PILLARS[0];

  return (
    <section id="capabilities" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#050505] text-[#F5F7FA] border-t border-white/10 overflow-hidden">
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto space-y-16">
        
        {/* SECTION HEADER — Editorial Positioning */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <TechnicalLabel text="CAPABILITIES" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
              <span className="font-sans text-xs text-slate-400 font-semibold uppercase tracking-wider">
                INTEGRATED DISCIPLINES
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] uppercase">
              ONE PARTNER. <br />
              <span className="text-[#0099FF]">FOUR DISCIPLINES.</span>
            </h2>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Magniar brings performance marketing, commerce, development and intelligence together to build growth systems around the way your business actually works.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a href="#capabilities-full" onClick={onExploreFullCapabilities}>
              <MagniarButton variant="primary" size="lg">
                EXPLORE ALL CAPABILITIES →
              </MagniarButton>
            </a>
          </div>
        </div>

        {/* INTERACTIVE 4-PILLAR SYSTEM BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 5-COL: PILLAR SELECTOR SWITCHES */}
          <div className="lg:col-span-5 space-y-3">
            <div className="font-heading text-xs text-slate-400 uppercase tracking-wider pb-3 border-b border-white/10 flex justify-between font-semibold">
              <span>DISCIPLINE OVERVIEW</span>
              <span className="text-[#0099FF]">01 — 04</span>
            </div>

            {CAPABILITY_PILLARS.map((pillar) => {
              const isSelected = pillar.id === activePillarId;

              return (
                <div
                  key={pillar.id}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`Select ${pillar.title} capability pillar`}
                  onClick={() => setActivePillarId(pillar.id)}
                  onMouseEnter={() => setActivePillarId(pillar.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActivePillarId(pillar.id)}
                  className={`
                    p-6 rounded-[2px] border text-left transition-all cursor-pointer outline-none group relative overflow-hidden
                    ${isSelected
                      ? 'bg-[#0A0D12] border-[#0099FF] shadow-[0_0_24px_rgba(0,153,255,0.15)]'
                      : 'bg-[#05070A] border-white/10 hover:border-white/30 hover:bg-[#080B10]'
                    }
                  `}
                >
                  {/* Left Active Accent Indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0099FF]" />
                  )}

                  <div className="flex items-center justify-between font-sans text-xs mb-2">
                    <span className={`font-heading font-extrabold tracking-wider ${isSelected ? 'text-[#0099FF]' : 'text-slate-400 group-hover:text-white'}`}>
                      {pillar.numberLabel}
                    </span>
                    <span className={`text-xs font-semibold uppercase ${isSelected ? 'text-[#0099FF]' : 'text-slate-500'}`}>
                      {isSelected ? 'SELECTED' : 'VIEW DETAILS'}
                    </span>
                  </div>

                  <h3 className={`font-heading text-2xl font-bold tracking-tight mb-2 ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-300 font-sans font-normal line-clamp-2 leading-relaxed">
                    {pillar.tagline}
                  </p>

                  {/* Platforms Row summary */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 font-sans text-xs text-slate-400">
                    {pillar.platforms.slice(0, 4).map((plat) => (
                      <span key={plat} className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]/80" />
                        {plat}
                      </span>
                    ))}
                    {pillar.platforms.length > 4 && <span className="text-slate-400 font-medium">+{pillar.platforms.length - 4} more</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT 7-COL: ACTIVE PILLAR DEEP EXPLORER PANEL */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-[2px] bg-[#07090D] border border-white/10 space-y-8 relative overflow-hidden">
            {/* Subtle Active Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#0099FF]/10 blur-[100px] pointer-events-none" />

            {/* Active Pillar Header */}
            <div className="space-y-4 pb-6 border-b border-white/10 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-xs">
                <span className="text-[#0099FF] font-heading font-extrabold tracking-widest uppercase flex items-center gap-2 text-sm">
                  {activePillar.numberLabel} — {activePillar.title}
                </span>
                <span className="px-3 py-1 rounded-[2px] bg-[#0099FF]/10 text-[#0099FF] text-xs font-semibold border border-[#0099FF]/30 uppercase">
                  CORE DISCIPLINE
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {activePillar.statement}
              </h3>

              <p className="text-base text-slate-300 font-sans font-normal leading-relaxed">
                {activePillar.description}
              </p>
            </div>

            {/* Supported Platforms Tag Constellation */}
            <div className="space-y-3 relative z-10">
              <div className="font-sans text-xs text-slate-300 tracking-wider uppercase font-semibold">
                PLATFORMS & TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-2">
                {activePillar.platforms.map((plat) => (
                  <span
                    key={plat}
                    className="px-3.5 py-1.5 rounded-[2px] bg-[#050505] border border-white/10 text-xs font-sans text-slate-200 font-medium flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
                    {plat}
                  </span>
                ))}
              </div>
            </div>

            {/* Included Services List */}
            <div className="space-y-4 pt-2 relative z-10">
              <div className="font-sans text-xs text-slate-300 tracking-wider uppercase font-semibold">
                CAPABILITY SERVICES & MODULES
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activePillar.services.map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => onSelectService?.(svc.id)}
                    className="p-4 rounded-[2px] bg-[#030508] border border-white/10 hover:border-[#0099FF]/60 transition-all cursor-pointer group space-y-2"
                  >
                    <div className="flex items-center justify-between font-heading text-sm text-white group-hover:text-[#0099FF] font-bold">
                      <span>{svc.title}</span>
                      <ChevronRight className="w-4 h-4 text-[#0099FF] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-slate-300 font-sans font-normal leading-relaxed line-clamp-2">
                      {svc.oneLiner}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action Callout */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10 font-sans text-xs">
              <div className="text-slate-400 text-xs font-normal">
                Services are tailored and configured based on your specific growth objectives.
              </div>
              <a
                href="#capabilities-full"
                onClick={onExploreFullCapabilities}
                className="text-[#0099FF] hover:underline uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <span>EXPLORE ALL {activePillar.title} SERVICES</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

        {/* CONNECTED CAPABILITY MODEL INLINE SUMMARY LOOP */}
        <div className="p-8 rounded-[2px] bg-[#0A0D12] border border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-xs border-b border-white/10 pb-4">
            <span className="text-white font-heading font-bold tracking-wider uppercase flex items-center gap-2.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-[#0099FF]" />
              HOW THE FOUR DISCIPLINES CONNECT IN PRACTICE
            </span>
            <span className="text-slate-400 font-medium">INTEGRATED GROWTH ENGINE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONNECTED_CAPABILITY_LOOP.map((step) => (
              <div
                key={step.id}
                onClick={() => setActivePillarId(step.pillarId)}
                className={`p-5 rounded-[2px] bg-[#05070A] border transition-all cursor-pointer space-y-3 ${
                  activePillarId === step.pillarId
                    ? 'border-[#0099FF] shadow-[0_0_12px_rgba(0,153,255,0.2)]'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between text-[#0099FF] font-heading font-extrabold text-xs">
                  <span>{step.stepNumber}</span>
                  <span className="text-xs text-slate-400 font-sans font-semibold uppercase">{step.pillarId}</span>
                </div>
                <div className="font-heading text-base font-bold text-white tracking-wide">
                  {step.label}
                </div>
                <p className="text-xs text-slate-300 font-sans font-normal leading-relaxed">
                  {step.description}
                </p>
                <div className="pt-2 text-xs text-[#0099FF] font-sans font-semibold border-t border-white/10">
                  {step.outputSignal}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

