import React from 'react';
import { Code2, Megaphone, Zap } from 'lucide-react';

export const MarketingDevelopmentSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#080B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
            [ 07 — THE HYBRID ENGINE ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase leading-tight">
            THE HYBRID <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B89A72] to-[#B89A72]">
              MARKETING & DEVELOPMENT ADVANTAGE.
            </span>
          </h2>
          <p className="text-base text-[#8D949E] leading-relaxed">
            Most agencies pick one side: media buying OR custom code development. Magniar bridges the gap so ad budget is backed by high-speed technical code, and code is designed for measurable ROI.
          </p>
        </div>

        {/* DUAL CARDS: SIDE A vs SIDE B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SIDE A: MARKETING WITHOUT TECHNICAL BLIND SPOT */}
          <div className="p-8 bg-[#050505] border border-white/15 relative space-y-6 hover:border-[#B89A72]/50 transition-colors">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span className="text-[#B89A72] font-bold flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#B89A72]" />
                SIDE A / PERFORMANCE
              </span>
              <span className="text-[#8D949E]">ACQUISITION REALITY</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white uppercase font-mono leading-tight">
                MARKETING WITHOUT <br />
                <span className="text-[#B89A72]">THE TECHNICAL BLIND SPOT.</span>
              </h3>
              <p className="text-sm text-[#8D949E] leading-relaxed">
                Traditional ad agencies treat web infrastructure as someone else's problem. When conversion rates drop, they simply tell you to buy more traffic.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs text-[#F5F7FA]">
              <span className="text-[#8D949E] uppercase block mb-2 font-bold">
                WE ENGINEER WHAT AD ACCOUNTS DEPEND ON:
              </span>
              <div className="p-2.5 bg-[#0A0D12] border border-white/10 flex items-center justify-between">
                <span>01 / SERVER-SIDE GTM CONTAINERS</span>
                <span className="text-[#B89A72] font-bold">100% CAPI MATCH</span>
              </div>
              <div className="p-2.5 bg-[#0A0D12] border border-white/10 flex items-center justify-between">
                <span>02 / DYNAMIC SUB-1 SECOND LANDING PAGES</span>
                <span className="text-[#B89A72] font-bold">&lt;800ms LOAD</span>
              </div>
              <div className="p-2.5 bg-[#0A0D12] border border-white/10 flex items-center justify-between">
                <span>03 / PRODUCT FEED SYNCHRONIZATION</span>
                <span className="text-[#B89A72] font-bold">REAL-TIME STOCK</span>
              </div>
            </div>
          </div>

          {/* SIDE B: DEVELOPMENT WITHOUT GROWTH BLIND SPOT */}
          <div className="p-8 bg-[#050505] border border-white/15 relative space-y-6 hover:border-[#B89A72]/50 transition-colors">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span className="text-[#B89A72] font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#B89A72]" />
                SIDE B / ENGINEERING
              </span>
              <span className="text-[#8D949E]">INFRASTRUCTURE REALITY</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white uppercase font-mono leading-tight">
                DEVELOPMENT WITHOUT <br />
                <span className="text-[#B89A72]">THE GROWTH BLIND SPOT.</span>
              </h3>
              <p className="text-sm text-[#8D949E] leading-relaxed">
                Software developers often write beautiful code without understanding ad attribution, customer acquisition economics, or checkout conversion funnels.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs text-[#F5F7FA]">
              <span className="text-[#8D949E] uppercase block mb-2 font-bold">
                WE BUILD CODE THAT UNDERSTANDS ECONOMICS:
              </span>
              <div className="p-2.5 bg-[#0A0D12] border border-white/10 flex items-center justify-between">
                <span>01 / HIGH-CONVERTING CHECKOUT ARCHITECTURE</span>
                <span className="text-[#B89A72] font-bold">+18% CONVERSION</span>
              </div>
              <div className="p-2.5 bg-[#0A0D12] border border-white/10 flex items-center justify-between">
                <span>02 / MULTI-TOUCH ATTRIBUTION DATA LAYER</span>
                <span className="text-[#B89A72] font-bold">FIRST-PARTY</span>
              </div>
              <div className="p-2.5 bg-[#0A0D12] border border-white/10 flex items-center justify-between">
                <span>03 / BEHAVIORAL FUNNEL AUTOMATION</span>
                <span className="text-[#B89A72] font-bold">TRIGGERS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 p-6 bg-[#B89A72]/10 border border-[#B89A72]/30 flex items-center gap-4 font-mono text-xs text-[#F5F7FA]">
          <Zap className="w-5 h-5 text-[#B89A72] shrink-0" />
          <span>
            RESULT: Your ad spend and technical codebase evolve under one unified engineering standard—saving months of contractor coordination and eliminating data leaks.
          </span>
        </div>
      </div>
    </section>
  );
};
