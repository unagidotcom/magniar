import React from 'react';
import { ShieldCheck, Cpu, ArrowDownRight, Activity } from 'lucide-react';

interface AboutHeroProps {
  onStartProject?: () => void;
  onExploreModel?: () => void;
}

export const AboutHero: React.FC<AboutHeroProps> = ({
  onStartProject,
  onExploreModel,
}) => {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 border-b border-white/10 overflow-hidden bg-[#050505]">
      {/* Background Technical Sub-grid & Coordinate Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle Glowing Signal Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B89A72]/40 to-transparent pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Breadcrumb & Metadata Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#B89A72]/10 text-[#B89A72] border border-[#B89A72]/30 rounded-[2px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72] animate-ping" />
              05 / ABOUT MAGNIAR
            </span>
            <span className="text-[#8D949E] hidden sm:inline">•</span>
            <span className="text-[#8D949E] hidden sm:inline">CONNECTING MARKETING + TECH + COMMERCE + AI</span>
          </div>

          <div className="flex items-center gap-4 text-[#8D949E]">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#B89A72]" />
              SYSTEM STATUS: OPERATIONAL
            </span>
            <span className="hidden md:inline">LATENCY: &lt;12ms</span>
          </div>
        </div>

        {/* Hero Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Typography Column */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
                [ AGENCY PHILOSOPHY & OPERATING MODEL ]
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#F5F7FA] uppercase leading-[1.05]">
                WE BUILD THE SYSTEMS <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F7FA] to-[#B89A72]">
                  BEHIND GROWTH.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-xl text-[#8D949E] font-normal leading-relaxed max-w-3xl">
              Magniar combines performance marketing, commerce, development and AI strategy to help ambitious businesses build, acquire and scale.
            </p>

            {/* Factual Value Pillars Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono text-xs text-[#8D949E]">
              <div>
                <span className="block text-[#F5F7FA] font-bold">PERFORMANCE</span>
                <span className="text-[11px] text-[#8D949E]">Paid Acquisition</span>
              </div>
              <div>
                <span className="block text-[#F5F7FA] font-bold">COMMERCE</span>
                <span className="text-[11px] text-[#8D949E]">Storefronts & Feeds</span>
              </div>
              <div>
                <span className="block text-[#F5F7FA] font-bold">DEVELOPMENT</span>
                <span className="text-[11px] text-[#8D949E]">Tracking & Systems</span>
              </div>
              <div>
                <span className="block text-[#F5F7FA] font-bold">INTELLIGENCE</span>
                <span className="text-[11px] text-[#8D949E]">AI & Data Workflows</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartProject}
                className="px-6 py-3.5 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8F714D] transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>START A PROJECT</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreModel}
                className="px-6 py-3.5 bg-white/5 border border-white/15 text-[#F5F7FA] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
              >
                EXPLORE THE MODEL
              </button>
            </div>
          </div>

          {/* Right Column: Restrained Technical System Visual */}
          <div className="lg:col-span-4 border border-white/15 bg-[#0A0D12] p-6 relative group overflow-hidden">
            {/* Top Bar Signal */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span className="text-[#8D949E] flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#B89A72]" />
                UNIFIED GROWTH ENGINE
              </span>
              <span className="text-[#B89A72] font-semibold">MAGNIAR v4.2</span>
            </div>

            {/* Interactive Signal Flow Diagram Mockup */}
            <div className="py-6 space-y-4 font-mono text-xs">
              <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[#8D949E] text-[10px] block">ACQUISITION</span>
                  <span className="text-white font-semibold">Paid Traffic & Search</span>
                </div>
                <span className="text-[#B89A72] text-[11px] font-bold">INPUT</span>
              </div>

              <div className="flex justify-center my-1 text-white/30">
                ↓
              </div>

              <div className="p-3 bg-[#B89A72]/10 border border-[#B89A72]/30 flex items-center justify-between">
                <div>
                  <span className="text-[#B89A72] text-[10px] block">CONVERSION & COMMERCE</span>
                  <span className="text-white font-semibold">High-Speed Storefronts</span>
                </div>
                <span className="text-[#B89A72] text-[11px] font-bold">SYSTEM</span>
              </div>

              <div className="flex justify-center my-1 text-white/30">
                ↓
              </div>

              <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[#8D949E] text-[10px] block">INTELLIGENCE</span>
                  <span className="text-white font-semibold">Server GTM + AI Decisioning</span>
                </div>
                <span className="text-[#B89A72] text-[11px] font-bold">OUTPUT</span>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#8D949E]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89A72]" />
                NO FRAGMENTED SILOS
              </span>
              <span>100% CONNECTED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
