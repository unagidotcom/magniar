import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StartProjectHeroProps {
  onStartForm?: () => void;
  currentStep?: number;
}

export const StartProjectHero: React.FC<StartProjectHeroProps> = ({
  onStartForm,
  currentStep = 0,
}) => {
  return (
    <section className="relative w-full pt-10 sm:pt-14 pb-10 lg:pb-14 border-b border-white/10 bg-[#050505] overflow-hidden">
      {/* Background Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#B89A72]/10 border border-[#B89A72]/30 font-sans text-xs font-semibold text-[#B89A72] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A72]" />
            <span>STRATEGIC CONSULTATION & INTAKE</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
              LET'S FIGURE OUT <br />
              <span className="text-[#B89A72] drop-shadow-[0_0_25px_rgba(184,154,114,0.35)]">
                WHAT GROWTH LOOKS LIKE.
              </span>
            </h1>
          </div>

          {/* Editorial Supporting Copy */}
          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
            Tell us where your business stands today, what you want to achieve, and where you need support. You don't need to have everything pre-figured — we'll map out the path together.
          </p>

          {/* Trust callout pills */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-sans text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B89A72]" />
              <span>Strict Data Confidentiality</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B89A72]" />
              <span>Direct Partner Evaluation</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div>
              <span>No Pressure Sales Pitch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

