import React, { useState } from 'react';
import { INDUSTRY_CATEGORIES } from '../../data/industriesData';
import { IndustryCategoryId } from '../../types/industries';
import { MagniarButton } from '../common/MagniarButton';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { ArrowRight, CheckCircle2, Cpu } from 'lucide-react';

interface IndustriesSectionProps {
  onExploreFullIndustries?: () => void;
  onStartProject?: () => void;
  onSeeProcess?: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onExploreFullIndustries,
  onStartProject,
  onSeeProcess,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<IndustryCategoryId>('ecommerce');

  const selectedCategory =
    INDUSTRY_CATEGORIES.find((c) => c.id === activeCategoryId) || INDUSTRY_CATEGORIES[0];

  return (
    <section id="industries-section" className="w-full bg-[#050505] text-[#F5F7FA] py-24 sm:py-32 border-t border-white/10 font-sans relative overflow-hidden">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 relative z-10 space-y-16">
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <TechnicalLabel text="WHO WE WORK WITH" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
              <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
                INDUSTRIES & SECTORS
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Built around <br />
              <span className="text-[#0099FF]">the business.</span>
            </h2>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Different businesses have different growth constraints. Magniar adapts the combination of performance, commerce, development and intelligence around what your business actually needs.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 font-sans text-xs text-slate-300 shrink-0">
            <button
              onClick={onExploreFullIndustries}
              className="text-white hover:text-[#0099FF] cursor-pointer flex items-center gap-2 transition-colors font-semibold uppercase tracking-wider text-xs"
            >
              <span>EXPLORE ALL INDUSTRIES</span>
              <ArrowRight className="w-4 h-4 text-[#0099FF]" />
            </button>
          </div>
        </div>

        {/* CONDENSED INTERACTIVE ECOSYSTEM PREVIEW */}
        <div className="bg-[#080A0D] border border-white/10 rounded-[2px] p-8 lg:p-10 space-y-8">
          {/* Quick Selection Filter Tabs */}
          <div className="space-y-3">
            <span className="font-sans text-xs text-slate-400 tracking-wider uppercase block font-semibold">
              SELECT A BUSINESS TYPE TO SEE HOW OUR SYSTEM ADAPTS
            </span>

            <div className="flex flex-wrap items-center gap-3">
              {INDUSTRY_CATEGORIES.slice(0, 6).map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`
                      px-4 py-2.5 rounded-[2px] font-sans text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2 border select-none
                      ${
                        isActive
                          ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold shadow-[0_0_12px_rgba(0,153,255,0.3)]'
                          : 'bg-[#050505] text-slate-300 hover:text-white border-white/10'
                      }
                    `}
                  >
                    <span>{cat.title}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Solution Adaptation Matrix Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#050608] border border-white/10 p-8 rounded-[2px]">
            {/* Left: Business Context & Needs */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 font-sans text-xs text-[#0099FF] font-semibold uppercase">
                <Cpu className="w-4 h-4 text-[#0099FF]" />
                <span>TAILORED GROWTH SYSTEM</span>
              </div>

              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  {selectedCategory.title}
                </h3>
                <p className="text-sm text-slate-300 font-sans italic mt-2 leading-relaxed">
                  "{selectedCategory.tagline}"
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <span className="font-sans text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                  CORE GROWTH FOCUS AREAS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#F5F7FA]">
                  {selectedCategory.commonGrowthNeeds.slice(0, 4).map((need, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                      <CheckCircle2 className="w-4 h-4 text-[#0099FF] shrink-0" />
                      <span className="text-slate-200 font-medium truncate">{need}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Assembled Capabilities & Integrated Platforms */}
            <div className="lg:col-span-6 bg-[#0A0D12] border border-white/10 p-6 rounded-[2px] space-y-5">
              <div>
                <span className="font-sans text-xs text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                  PRIMARY CAPABILITY COMBINATION
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.primaryCapabilities.map((pillar) => (
                    <span
                      key={pillar}
                      className="font-heading text-xs px-3.5 py-1.5 rounded-[2px] border border-[#0099FF]/40 text-[#0099FF] bg-[#0099FF]/10 font-bold uppercase tracking-wider"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="font-sans text-xs text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                  INTEGRATED PLATFORMS & CHANNELS
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.platforms.map((p, i) => (
                    <span
                      key={i}
                      className="font-sans text-xs text-slate-300 bg-[#050505] border border-white/10 px-3 py-1.5 rounded-[2px] font-medium"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs font-sans text-slate-400">
                <span>METHODOLOGY: DISCOVER → SCALE</span>
                <span className="text-[#0099FF] font-semibold">CUSTOM TAILORED</span>
              </div>
            </div>
          </div>
        </div>

        {/* HOMEPAGE CLOSING STATEMENT & CTA BAR */}
        <div className="bg-[#0A0D12] border border-white/10 rounded-[2px] p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans text-xs text-[#0099FF] tracking-wider uppercase font-semibold">
              THE MAGNIAR APPROACH
            </span>
            <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your business doesn't fit a template. <br />
              <span className="text-slate-400 font-normal">Neither should your growth strategy.</span>
            </h3>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              Whether you are a DTC brand, B2B firm, or multi-marketplace seller, we assemble the exact architecture required for your unit economics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <MagniarButton
              variant="primary"
              size="lg"
              onClick={onStartProject}
            >
              TALK TO MAGNIAR →
            </MagniarButton>

            <MagniarButton
              variant="secondary"
              size="lg"
              onClick={onSeeProcess}
            >
              SEE OUR PROCESS
            </MagniarButton>
          </div>
        </div>
      </div>
    </section>
  );
};
