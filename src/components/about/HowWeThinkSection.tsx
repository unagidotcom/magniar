import React from 'react';
import { THINKING_PRINCIPLES } from '../../data/aboutData';
import { Target, Compass } from 'lucide-react';

export const HowWeThinkSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
            [ 04 — HOW WE THINK ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase leading-tight">
            OPERATING PRINCIPLES <br />
            <span className="text-[#B89A72]">FOR HIGH-STAKES GROWTH</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8D949E] leading-relaxed">
            We don’t rely on agency dogma, vanity dashboard metrics, or trendy jargon. We operate by six non-negotiable principles.
          </p>
        </div>

        {/* 6 OPERATING PRINCIPLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {THINKING_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-6 bg-[#0A0D12] border border-white/10 hover:border-[#B89A72]/50 transition-colors group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#B89A72] font-bold">{principle.number} / PRINCIPLE</span>
                  <Compass className="w-4 h-4 text-white/20 group-hover:text-[#B89A72] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase group-hover:text-[#B89A72] transition-colors">
                  {principle.title}
                </h3>
                <p className="text-xs font-mono text-[#B89A72] uppercase tracking-wider">
                  {principle.subtitle}
                </p>
                <p className="text-xs text-[#8D949E] leading-relaxed pt-2 border-t border-white/5">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 10: MAJOR EDITORIAL STATEMENT "BUSINESS FIRST" */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#0A0D12] to-[#050505] border border-white/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Target className="w-64 h-64 text-[#B89A72]" />
          </div>

          <div className="max-w-4xl space-y-6 relative z-10">
            <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
              [ BUSINESS-FIRST METHODOLOGY ]
            </span>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase leading-tight tracking-tight">
              WE DON'T START WITH THE CHANNEL. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B89A72] to-[#B89A72]">
                WE START WITH THE BUSINESS.
              </span>
            </h3>

            <p className="text-base sm:text-lg text-[#8D949E] leading-relaxed">
              The right solution may involve Google Ads, Meta, TikTok Shop, a custom high-speed landing page, server-side tracking, an Amazon marketplace launch, or AI workflow automation. The business problem determines the growth system—not the other way around.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 font-mono text-xs">
              <div className="p-3 bg-[#050505] border border-white/10">
                <span className="text-[#B89A72] font-bold block mb-0.5">01 DIAGNOSE</span>
                <span className="text-[#8D949E]">Margins & Supply</span>
              </div>
              <div className="p-3 bg-[#050505] border border-white/10">
                <span className="text-[#B89A72] font-bold block mb-0.5">02 SELECT</span>
                <span className="text-[#8D949E]">Channels & Tech</span>
              </div>
              <div className="p-3 bg-[#050505] border border-white/10">
                <span className="text-[#B89A72] font-bold block mb-0.5">03 ENGINEER</span>
                <span className="text-[#8D949E]">System & Funnel</span>
              </div>
              <div className="p-3 bg-[#050505] border border-white/10">
                <span className="text-[#B89A72] font-bold block mb-0.5">04 SCALE</span>
                <span className="text-[#8D949E]">Net Profit & LTV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
