import React, { useState } from 'react';
import { MOTION_TOKENS } from '../../data/tokens';
import { MotionToken } from '../../types/design-system';
import { Activity, Play, ArrowRight, MousePointerClick } from 'lucide-react';

export const MotionInteractionsSection: React.FC = () => {
  const [activeAnim, setActiveAnim] = useState<string | null>(null);

  const triggerAnimation = (token: string) => {
    setActiveAnim(null);
    setTimeout(() => setActiveAnim(token), 10);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#0099FF] flex items-center gap-2">
          <span>05 / MOTION TIMING & INTERACTION PHYSICS</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          90% Clarity / 10% Motion Philosophy
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          Motion at Magniar communicates state changes, confirms user intent, or provides gentle ambient status pulses. Motion never exists for pure visual ornament or distracting scroll effects.
        </p>
      </div>

      {/* Interactive Motion Physics Tester Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOTION_TOKENS.map((token: MotionToken) => (
          <div
            key={token.token}
            className="rounded-xl border border-white/10 bg-[#0A0C0F] p-5 space-y-4 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#0099FF] font-semibold">{token.token}</span>
              <span className="text-[#8D949E]">{token.duration}</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white">{token.name}</h3>
              <p className="text-xs text-[#8D949E]">{token.usage}</p>
              <div className="font-mono text-[10px] text-[#5A626E]">
                EASING: {token.easing}
              </div>
            </div>

            {/* Interactive Test Stage */}
            <div className="pt-2">
              <div className="p-4 rounded-lg bg-[#050505] border border-white/10 relative h-20 flex items-center overflow-hidden">
                <div
                  className={`h-10 px-4 rounded bg-[#0099FF] text-black font-mono text-xs font-semibold flex items-center gap-2 transition-all ${
                    token.token === 'motion-micro'
                      ? 'duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]'
                      : token.token === 'motion-standard'
                      ? 'duration-300 ease-[cubic-bezier(0.2,0,0,1)]'
                      : token.token === 'motion-large'
                      ? 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
                      : 'animate-magniar-pulse'
                  } ${
                    activeAnim === token.token
                      ? 'translate-x-48 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                      : 'translate-x-0'
                  }`}
                >
                  <span>TEST SHIFT</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>

              <button
                onClick={() => triggerAnimation(token.token)}
                className="mt-3 w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-[#0099FF]/20 hover:text-[#0099FF] hover:border-[#0099FF]/40 transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>TRIGGER PHYSICS PREVIEW</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hover Behavior Rules Card */}
      <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-6 space-y-4">
        <div className="font-mono text-xs text-white font-medium flex items-center gap-2">
          <MousePointerClick className="h-4 w-4 text-[#0099FF]" />
          <span>MICRO-HOVER BEHAVIOR SPECIFICATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#8D949E]">
          <div className="p-4 rounded-lg bg-[#050505] border border-white/5 space-y-2">
            <span className="font-mono text-[#0099FF]">01 / BUTTON HOVER STATES</span>
            <p className="leading-relaxed">
              Brighten background surface by 10-15%, reveal vector arrow icon smoothly (shift 2px right), increase border contrast from 0.08 to 0.20 opacity.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#050505] border border-white/5 space-y-2">
            <span className="font-mono text-[#0099FF]">02 / CARD HOVER STATES</span>
            <p className="leading-relaxed">
              Border shifts from subtle white/0.08 to active blue rgba(0,153,255,0.4), subtle 2px vertical lift (-2px translateY), 0.15 opacity volumetric glow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
