import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Activity, Zap, CheckCircle2 } from 'lucide-react';

export const DataVizLanguageSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#0099FF] flex items-center gap-2">
          <span>06 / DATA VISUALIZATION LANGUAGE</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Analytical Storytelling & Data Visual Primitives
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          Data is a core pillar of the Magniar visual DNA. Visualization primitives balance analytical clarity with restrained storytelling—never cluttering the public presence while empowering the client portal with actionable metric depth.
        </p>
      </div>

      {/* KPI Card Visual Primitives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: Attributed Revenue */}
        <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-5 space-y-3 relative overflow-hidden group hover:border-[#0099FF]/40 transition-colors">
          <div className="flex items-center justify-between text-xs font-mono text-[#8D949E]">
            <span>ATTRIBUTED REVENUE</span>
            <span className="text-[#0099FF] flex items-center gap-1 font-semibold">
              <TrendingUp className="h-3.5 w-3.5" /> +18.4%
            </span>
          </div>

          <div className="text-3xl font-bold tracking-tight text-white font-mono">
            $124,820.00
          </div>

          {/* SVG Sparkline */}
          <div className="h-10 w-full pt-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
              <defs>
                <linearGradient id="sparkline-grad-1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0099FF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0099FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 30 Q 30 10, 60 25 T 120 15 T 180 5 L 200 12 L 200 40 L 0 40 Z"
                fill="url(#sparkline-grad-1)"
              />
              <path
                d="M0 30 Q 30 10, 60 25 T 120 15 T 180 5 L 200 12"
                fill="none"
                stroke="#0099FF"
                strokeWidth="2"
              />
              <circle cx="200" cy="12" r="3" fill="#0099FF" className="animate-magniar-pulse" />
            </svg>
          </div>

          <div className="font-mono text-[10px] text-[#5A626E] flex justify-between border-t border-white/5 pt-2">
            <span>SHOPIFY + META ADS</span>
            <span>LIVE SIGNAL</span>
          </div>
        </div>

        {/* KPI 2: Blended ROAS Target */}
        <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-5 space-y-3 relative overflow-hidden group hover:border-[#0099FF]/40 transition-colors">
          <div className="flex items-center justify-between text-xs font-mono text-[#8D949E]">
            <span>BLENDED ROAS TARGET</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="h-3.5 w-3.5" /> 4.82x
            </span>
          </div>

          <div className="text-3xl font-bold tracking-tight text-white font-mono">
            4.82<span className="text-lg text-[#8D949E] font-normal">x Target 3.5x</span>
          </div>

          {/* Progress Bar Visual */}
          <div className="space-y-1 pt-2">
            <div className="h-1.5 w-full bg-[#050505] rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-[#0099FF] rounded-full w-[82%]" />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-[#5A626E]">
              <span>MIN: 2.0x</span>
              <span className="text-[#0099FF]">TARGET EXCEEDED (+37%)</span>
            </div>
          </div>

          <div className="font-mono text-[10px] text-[#5A626E] flex justify-between border-t border-white/5 pt-2">
            <span>NORMALIZED ATTRIBUTION</span>
            <span>30-DAY WINDOW</span>
          </div>
        </div>

        {/* KPI 3: System Pipeline Status */}
        <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-5 space-y-3 relative overflow-hidden group hover:border-[#0099FF]/40 transition-colors">
          <div className="flex items-center justify-between text-xs font-mono text-[#8D949E]">
            <span>PIPELINE HEALTH</span>
            <span className="text-[#0099FF] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0099FF] animate-magniar-pulse" />
              ● ACTIVE
            </span>
          </div>

          <div className="text-2xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
            14 Accounts <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-normal">Syncing</span>
          </div>

          {/* Mini Activity Monitor Line */}
          <div className="grid grid-cols-7 gap-1 pt-2">
            {[80, 95, 60, 100, 85, 90, 100].map((val, idx) => (
              <div key={idx} className="h-8 bg-[#050505] rounded border border-white/5 p-0.5 flex items-end">
                <div 
                  className="w-full bg-[#0099FF] rounded-sm transition-all"
                  style={{ height: `${val}%`, opacity: idx === 6 ? 1 : 0.5 + (idx * 0.08) }}
                />
              </div>
            ))}
          </div>

          <div className="font-mono text-[10px] text-[#5A626E] flex justify-between border-t border-white/5 pt-2">
            <span>META / GOOGLE / TIKTOK</span>
            <span>0 ERRORS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
