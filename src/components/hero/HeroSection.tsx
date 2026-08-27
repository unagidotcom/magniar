import React from 'react';
import { MagniarButton } from '../common/MagniarButton';
import { GrowthSystemVisual } from './GrowthSystemVisual';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { ArrowRight, ArrowDown, Globe, Sparkles } from 'lucide-react';
import { HeroInteractionConfig } from '../../types/heroInteraction';

interface HeroSectionProps {
  interactionConfig?: HeroInteractionConfig;
  onInteractionConfigChange?: (newConfig: Partial<HeroInteractionConfig>) => void;
  onStartProject?: () => void;
  onExploreCapabilities?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  interactionConfig = {
    motionActive: true,
    reducedMotion: false,
    density: 'MEDIUM',
    signalActivity: 'MEDIUM',
    cursorResponse: true,
    simulatedPreset: 'NONE',
  },
  onInteractionConfigChange,
  onStartProject,
  onExploreCapabilities,
}) => {
  return (
    <section className="relative min-h-[calc(100vh-84px)] flex flex-col justify-between pt-6 pb-10 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#050505] text-[#F5F7FA]">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30" />

      {/* Subtle Restrained Ambient Depth Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#B89A72]/5 blur-[120px] pointer-events-none" />

      {/* Main Asymmetric Hero Content Grid */}
      <div className="relative z-10 my-auto w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN — TECHNICAL LABEL, HEADLINE, SUPPORTING COPY, CTAs (~52-58% on desktop) */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-7 max-w-xl xl:max-w-2xl">
          
          {/* Technical Label */}
          <div className="flex items-center gap-3">
            <TechnicalLabel>01 / GROWTH SYSTEMS</TechnicalLabel>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
            <span className="hidden sm:inline-block font-sans text-xs text-slate-400 tracking-wider uppercase font-medium">
              AGENCY & GROWTH PARTNER
            </span>
          </div>

          {/* Primary Dominant Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] select-none">
            Marketing, development, <br />
            and <span className="text-[#B89A72]">AI strategy</span> for growth.
          </h1>

          {/* Supporting Positioning Statement */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl">
            Magniar helps ambitious businesses build, market and scale digital systems across acquisition, ecommerce, technology and AI.
          </p>

          {/* Hero CTAs Group */}
          <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8">
            {/* Primary CTA */}
            <a href="#start" onClick={onStartProject}>
              <MagniarButton variant="primary" size="lg">
                START A PROJECT →
              </MagniarButton>
            </a>

            {/* Secondary CTA */}
            <a
              href="#work"
              onClick={onExploreCapabilities}
              className="group font-sans text-sm font-semibold text-slate-300 hover:text-[#B89A72] transition-colors tracking-wide uppercase flex items-center gap-2 py-2 cursor-pointer"
            >
              <span>SEE OUR WORK</span>
              <ArrowRight className="w-4 h-4 text-[#B89A72] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Quick Technical Platform Anchor Badges */}
          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs text-slate-400">
            <span className="text-slate-400 font-medium">STACK & PLATFORMS:</span>
            <span className="text-[#F5F7FA] font-medium">GOOGLE</span>
            <span className="text-white/20">•</span>
            <span className="text-[#F5F7FA] font-medium">META</span>
            <span className="text-white/20">•</span>
            <span className="text-[#F5F7FA] font-medium">TIKTOK</span>
            <span className="text-white/20">•</span>
            <span className="text-[#F5F7FA] font-medium">SHOPIFY</span>
            <span className="text-white/20">•</span>
            <span className="text-[#F5F7FA] font-medium">AMAZON</span>
            <span className="text-white/20">•</span>
            <span className="text-[#B89A72] font-semibold">AI STRATEGY</span>
          </div>
        </div>

        {/* RIGHT COLUMN — GROWTH NETWORK VISUAL (42-48% on desktop, Open Architectural Network) */}
        <div className="lg:col-span-6 xl:col-span-6 w-full">
          <GrowthSystemVisual
            config={interactionConfig}
            onConfigChange={onInteractionConfigChange}
          />
        </div>
      </div>

      {/* Hero Lower Platform & System Signal Strip */}
      <div className="relative z-10 pt-8 mt-8 border-t border-white/10 w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-white font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
            <span>MARKETING × DEVELOPMENT × AI</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="text-slate-300 font-normal">
            Built for businesses that want more than disconnected services.
          </div>
        </div>

        {/* Continuation Scroll Signal */}
        <a
          href="#capabilities"
          className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-semibold uppercase tracking-wider"
        >
          <span>EXPLORE SYSTEM</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#B89A72] group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};
