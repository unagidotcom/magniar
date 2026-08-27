import React from 'react';
import { Sparkles, Layers, ShieldCheck, ArrowRight, Zap, Target, LineChart, Globe } from 'lucide-react';
import { SectionTab } from '../../types/design-system';

interface OverviewSectionProps {
  setActiveTab: (tab: SectionTab) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Chapter Header */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A0C0F] p-6 sm:p-10">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <span className="font-mono text-9xl font-bold tracking-tighter text-white">01</span>
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B89A72]/30 bg-[#B89A72]/10 px-3 py-1 text-xs font-mono text-[#B89A72]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72] animate-magniar-pulse" />
            <span>CHAPTER 01 / DESIGN FOUNDATION PHASE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            Magniar Visual System & Foundation Architecture
          </h1>

          <p className="text-lg text-[#8D949E] leading-relaxed">
            This design foundation establishes the precise visual DNA, color roles, typography scale, spacing grid, motion physics, and component rules that govern the entire Magniar product ecosystem across public marketing, client growth portal, and internal admin operating system.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('colors')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#B89A72] px-4 py-2.5 text-xs font-medium text-black transition-all hover:bg-[#C8AA82]"
            >
              <span>EXPLORE COLOR SYSTEM</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveTab('full-spec')}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-all hover:bg-white/10"
            >
              <span>READ 20-PART SPECIFICATION</span>
            </button>
          </div>
        </div>
      </div>

      {/* Brand Personality Pillars */}
      <div>
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-[#5A626E] flex items-center gap-2">
          <span>01 / BRAND ARCHETYPE FUSION</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-6 hover:border-[#B89A72]/30 transition-colors group">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#B89A72] border border-white/5 group-hover:scale-105 transition-transform">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-medium text-white mb-1">Premium Technology</h3>
            <p className="text-xs text-[#8D949E] leading-relaxed">
              Engineering clarity, precision micro-typography, high contrast depth, and disciplined technical structure.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-6 hover:border-[#B89A72]/30 transition-colors group">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#B89A72] border border-white/5 group-hover:scale-105 transition-transform">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-base font-medium text-white mb-1">Growth Consultancy</h3>
            <p className="text-xs text-[#8D949E] leading-relaxed">
              Strategic authority, clean editorial typography, confident statements, and proof-driven clarity.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-6 hover:border-[#B89A72]/30 transition-colors group">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-[#B89A72] border border-white/5 group-hover:scale-105 transition-transform">
              <LineChart className="h-5 w-5" />
            </div>
            <h3 className="text-base font-medium text-white mb-1">Performance Intelligence</h3>
            <p className="text-xs text-[#8D949E] leading-relaxed">
              Real-time metric signals, analytical visualizations, sparklines, and status indicators.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Connected Product Ecosystem Experiences */}
      <div>
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-[#5A626E] flex items-center gap-2">
          <span>02 / THREE CONNECTED PRODUCT TIERS</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-6 space-y-6">
          <p className="text-xs text-[#8D949E]">
            Magniar is built as a single cohesive ecosystem where the same visual language connects the public presence, client portal, and internal operations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#050505] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#B89A72]">01 / PUBLIC WEBSITE</span>
                <Globe className="h-4 w-4 text-[#8D949E]" />
              </div>
              <h4 className="text-sm font-medium text-white">Sophisticated Growth Company</h4>
              <p className="text-xs text-[#8D949E] leading-relaxed">
                Establishes authority, presents capabilities, case studies, and engineered growth services.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#050505] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#B89A72]">02 / CLIENT PORTAL</span>
                <Layers className="h-4 w-4 text-[#8D949E]" />
              </div>
              <h4 className="text-sm font-medium text-white">Growth Command Center</h4>
              <p className="text-xs text-[#8D949E] leading-relaxed">
                Client-facing private dashboard monitoring campaigns, spend, attribution, and live ROI metrics.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#050505] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#B89A72]">03 / ADMIN SYSTEM</span>
                <ShieldCheck className="h-4 w-4 text-[#8D949E]" />
              </div>
              <h4 className="text-sm font-medium text-white">Magniar Operating System</h4>
              <p className="text-xs text-[#8D949E] leading-relaxed">
                Internal execution engine for account managers, media buyers, engineers, and AI workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Design Directive Banner */}
      <div className="rounded-xl border border-[#B89A72]/30 bg-[#B89A72]/5 p-6 font-mono text-xs text-[#8D949E] space-y-2">
        <div className="flex items-center gap-2 text-white font-medium text-sm">
          <span className="w-2 h-2 rounded-full bg-[#B89A72] animate-magniar-pulse" />
          <span>PRIMARY DESIGN PRINCIPLE</span>
        </div>
        <p className="text-white/90 leading-relaxed font-sans text-sm">
          "Magniar understands growth as a system."
        </p>
        <p className="text-[#8D949E] text-xs">
          Every visual decision must serve comprehension, authority, trust, or visual hierarchy. Flashy gimmicks, giant purple AI blobs, and decorative noise are strictly forbidden.
        </p>
      </div>
    </div>
  );
};
