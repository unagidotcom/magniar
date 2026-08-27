import React from 'react';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface WhyMagniarExistsProps {
  onStartProject?: () => void;
}

export const WhyMagniarExistsSection: React.FC<WhyMagniarExistsProps> = ({
  onStartProject,
}) => {
  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#080B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
            [ 03 — WHY MAGNIAR EXISTS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase leading-tight">
            THE PROBLEM WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89A72] via-white to-[#B89A72]">
              FRAGMENTED GROWTH STACKS.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#8D949E] leading-relaxed">
            Small and mid-sized businesses are forced to manage disconnected vendor silos. One agency manages ads. A web contractor builds the site. A freelancer configures analytics. A separate team handles marketplace feeds—and AI is bolted on somewhere as an afterthought.
          </p>
        </div>

        {/* COMPARISON GRID: FRAGMENTED vs CONNECTED */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* LEFT: THE FRAGMENTED MODEL */}
          <div className="p-6 sm:p-8 bg-[#050505] border border-red-500/30 relative">
            <div className="flex items-center justify-between pb-4 border-b border-red-500/20 mb-6 font-mono text-xs">
              <span className="text-red-400 font-bold flex items-center gap-2 uppercase">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                TRADITIONAL FRAGMENTED MODEL
              </span>
              <span className="text-red-400/70">HIGH FRICTION & DATA LOSS</span>
            </div>

            {/* Disconnected Stack Visual */}
            <div className="space-y-3 font-mono text-xs mb-8">
              <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-200 flex justify-between">
                <span>01 / AD AGENCY</span>
                <span className="text-red-400">Manages Ads in Silo</span>
              </div>
              <div className="text-center text-red-500/50 text-xs">↓ Data Gap / Lost Attribution</div>

              <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-200 flex justify-between">
                <span>02 / WEB DEV CONTRACTOR</span>
                <span className="text-red-400">Builds Site without Growth Focus</span>
              </div>
              <div className="text-center text-red-500/50 text-xs">↓ API Mismatch / Slow Conversion</div>

              <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-200 flex justify-between">
                <span>03 / FREELANCE ANALYST</span>
                <span className="text-red-400">Inaccurate Client-Side Tracking</span>
              </div>
              <div className="text-center text-red-500/50 text-xs">↓ Unaligned Incentives</div>

              <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-200 flex justify-between">
                <span>04 / SEPARATE AI TOOL</span>
                <span className="text-red-400">Unconnected Buzzword Plugin</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[#8D949E] font-mono border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-red-400">✕</span>
                <span>Finger-pointing when CAC rises or conversions drop</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">✕</span>
                <span>Inaccurate ad platform reporting due to client-side cookie loss</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">✕</span>
                <span>Wasted ad budget directed into slow, non-converting landing pages</span>
              </li>
            </ul>
          </div>

          {/* RIGHT: THE MAGNIAR UNIFIED MODEL */}
          <div className="p-6 sm:p-8 bg-[#050505] border border-[#B89A72] relative shadow-[0_0_30px_rgba(184,154,114,0.1)]">
            <div className="flex items-center justify-between pb-4 border-b border-[#B89A72]/30 mb-6 font-mono text-xs">
              <span className="text-[#B89A72] font-bold flex items-center gap-2 uppercase">
                <CheckCircle className="w-4 h-4 text-[#B89A72]" />
                MAGNIAR CONNECTED MODEL
              </span>
              <span className="text-[#B89A72]">UNIFIED OPERATING SYSTEM</span>
            </div>

            {/* Connected Stack Visual */}
            <div className="p-5 bg-[#B89A72]/10 border border-[#B89A72]/40 space-y-3 font-mono text-xs mb-8">
              <div className="flex items-center justify-between font-bold text-white">
                <span>PERFORMANCE + COMMERCE + TECH + AI</span>
                <span className="text-[#B89A72]">CONNECTED</span>
              </div>

              <div className="p-3 bg-[#050505] border border-white/10 text-[#F5F7FA] space-y-1">
                <div className="flex justify-between font-bold text-[#B89A72]">
                  <span>REAL-TIME DATA FEEDBACK LOOP</span>
                  <span>100% ALIGNED</span>
                </div>
                <p className="text-[11px] text-[#8D949E]">
                  Ad targeting feeds server analytics ➔ Server analytics trains ad algorithms ➔ Custom storefront optimizes conversion ➔ AI automates creative iteration.
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[#F5F7FA] font-mono border-t border-white/10 pt-4">
              <li className="flex items-center gap-2">
                <span className="text-[#B89A72]">✓</span>
                <span>Single partner accountable for complete end-to-end unit economics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#B89A72]">✓</span>
                <span>First-party server GTM tracking ensures precision attribution</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#B89A72]">✓</span>
                <span>Technical engineers optimized specifically for growth & speed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="p-6 bg-[#050505] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <span className="text-[#8D949E] text-center sm:text-left">
            MAGNIAR EXISTS TO ELIMINATE SYSTEM FRAGMENTATION AND UNIFY YOUR GROWTH ENGINE.
          </span>
          <button
            onClick={onStartProject}
            className="px-5 py-3 bg-[#B89A72] text-white font-bold uppercase tracking-wider hover:bg-[#8F714D] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>CONNECT YOUR STACK</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
