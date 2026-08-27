import React, { useState } from 'react';
import { MagniarButton } from '../common/MagniarButton';
import { ButtonState } from '../../types/navigation';
import { Terminal, Sparkles, Layers, Zap, Activity, Cpu } from 'lucide-react';

export const HeroDesignReview: React.FC = () => {
  const [primaryBtnState, setPrimaryBtnState] = useState<ButtonState>('rest');
  const [secondaryBtnState, setSecondaryBtnState] = useState<ButtonState>('rest');
  const [simulatedState, setSimulatedState] = useState<string>('IDLE');

  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      {/* Chapter 04 Revision Review Header */}
      <div className="p-6 rounded-[2px] bg-[#0A0D12] border border-[#B89A72]/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-[#B89A72] font-bold tracking-widest flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#B89A72]" />
            CHAPTER 04 REVISION — INTERACTIVE GROWTH NETWORK SPECIFICATION
          </span>
          <span className="px-2 py-0.5 rounded bg-[#B89A72]/20 text-[#B89A72] text-[10px] font-semibold border border-[#B89A72]/40">
            STATUS: REVISION COMPLETE
          </span>
        </div>
        <p className="text-xs text-[#8D949E] leading-relaxed font-sans">
          The right-side hero has been completely purged of SaaS dashboard elements (rectangular card boxes, status badges, fake version numbers like Metagraph v4.0, or software controls). In its place is an editorial, lightweight Interactive Growth Network connecting Magniar's core agency disciplines (Performance, Commerce, Development, Intelligence) across key platforms via thin vector paths and subtle signal pulses.
        </p>
      </div>

      {/* Interactive Button & Motion State Inspector */}
      <div className="p-6 rounded-[2px] bg-[#07090D] border border-white/10 space-y-6">
        <div className="font-mono text-xs text-[#B89A72] tracking-wider uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B89A72]" />
          <span>HERO INTERACTION & MOTION STATE INSPECTOR</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Primary CTA Inspector */}
          <div className="p-4 rounded-[2px] bg-[#030508] border border-white/10 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#F5F7FA]">
              <span>PRIMARY CTA: START A PROJECT →</span>
              <span className="text-[#B89A72] uppercase font-bold">{primaryBtnState}</span>
            </div>

            <div className="py-4 flex justify-center border border-white/5 rounded bg-[#050505]">
              <MagniarButton variant="primary" buttonState={primaryBtnState} size="md">
                START A PROJECT →
              </MagniarButton>
            </div>

            <div className="flex gap-2">
              {(['rest', 'hover', 'active', 'focus'] as ButtonState[]).map((state) => (
                <button
                  key={state}
                  onClick={() => setPrimaryBtnState(state)}
                  className={`px-2.5 py-1 font-mono text-[10px] uppercase rounded-[2px] border cursor-pointer ${
                    primaryBtnState === state
                      ? 'bg-[#B89A72] text-white border-[#B89A72]'
                      : 'bg-[#0A0D12] text-[#8D949E] border-white/10 hover:text-white'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Link Inspector */}
          <div className="p-4 rounded-[2px] bg-[#030508] border border-white/10 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#F5F7FA]">
              <span>SECONDARY CTA: EXPLORE CAPABILITIES →</span>
              <span className="text-[#B89A72] uppercase font-bold">{secondaryBtnState}</span>
            </div>

            <div className="py-4 flex justify-center border border-white/5 rounded bg-[#050505]">
              <a
                href="#capabilities"
                className={`font-mono text-xs tracking-widest uppercase flex items-center gap-2 transition-all ${
                  secondaryBtnState === 'hover' ? 'text-[#B89A72] translate-x-1 font-bold' : 'text-[#8D949E]'
                } ${secondaryBtnState === 'active' ? 'text-white' : ''} ${
                  secondaryBtnState === 'focus' ? 'ring-2 ring-[#B89A72] px-2 py-1' : ''
                }`}
              >
                <span>EXPLORE CAPABILITIES</span>
                <span>→</span>
              </a>
            </div>

            <div className="flex gap-2">
              {(['rest', 'hover', 'active', 'focus'] as ButtonState[]).map((state) => (
                <button
                  key={state}
                  onClick={() => setSecondaryBtnState(state)}
                  className={`px-2.5 py-1 font-mono text-[10px] uppercase rounded-[2px] border cursor-pointer ${
                    secondaryBtnState === state
                      ? 'bg-[#B89A72] text-white border-[#B89A72]'
                      : 'bg-[#0A0D12] text-[#8D949E] border-white/10 hover:text-white'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Network State Simulator Buttons */}
        <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
          <div className="text-[#8D949E] uppercase tracking-wider font-semibold">
            SIMULATED NETWORK INTERACTION STATE: <span className="text-[#B89A72]">{simulatedState}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'IDLE', label: '1. Idle State' },
              { id: 'PROXIMITY', label: '2. Cursor Proximity' },
              { id: 'NODE_HOVER', label: '3. Node Hover (Google)' },
              { id: 'CATEGORY_FOCUS', label: '4. Performance Focus' },
              { id: 'COMMERCE_FOCUS', label: '5. Commerce Focus' },
              { id: 'INTELLIGENCE_FOCUS', label: '6. Intelligence Focus' },
              { id: 'MOBILE_TAP', label: '7. Mobile Tap Focus' },
              { id: 'REDUCED_MOTION', label: '8. Reduced Motion' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSimulatedState(st.id)}
                className={`px-3 py-2 rounded-[2px] border text-left text-[11px] font-medium transition-all cursor-pointer ${
                  simulatedState === st.id
                    ? 'bg-[#B89A72] text-white border-[#B89A72] font-bold shadow-[0_0_12px_rgba(184,154,114,0.4)]'
                    : 'bg-[#030508] text-[#8D949E] border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 8 Mandatory Design Review Questions & Answers */}
      <div className="space-y-6">
        <div className="font-mono text-xs text-[#F5F7FA] tracking-wider uppercase border-b border-white/10 pb-2 flex items-center justify-between">
          <span>CHAPTER 04 REVISION DESIGN REVIEW — 8 MANDATORY RESPONSES</span>
          <span className="text-[#B89A72]">VERIFIED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: '01',
              q: 'Why the visual no longer looks like SaaS',
              a: 'All rectangular UI containers, fake application frames, version labels (Metagraph v4.0), SaaS status badges (STATUS: ACTIVE), and software metrics (ROAS/CPA) have been removed. The visual now consists purely of simple typographic labels, dots, and thin vector connecting lines.'
            },
            {
              num: '02',
              q: 'How the network communicates Magniar agency model',
              a: 'The central Magniar landmark connects four primary discipline categories (Performance, Commerce, Development, Intelligence) and their supporting platforms (Google, Meta, TikTok, Shopify, Amazon, AI, etc.), visually demonstrating how Magniar links strategy, execution, and growth.'
            },
            {
              num: '03',
              q: 'How interaction works',
              a: 'When pointer approaches, a soft electric blue radial signal tracks cursor proximity. Hovering a node highlights the platform and its connection line to Magniar while showing an inline technical role label. Hovering or tapping a category focuses associated platforms while dimming non-related elements.'
            },
            {
              num: '04',
              q: 'How categories relate to platforms',
              a: 'Hierarchy is established through typographic weight: Categories (PERFORMANCE, COMMERCE, DEVELOPMENT, INTELLIGENCE) are bold, tracked landmarks. Platforms (Google, Meta, Shopify, Amazon, Web, AI) sit as child nodes branching from their respective parent category.'
            },
            {
              num: '05',
              q: 'How the blue signal is used',
              a: 'Electric blue (#B89A72) is strictly reserved as "the signal". It illuminates active nodes, focused vector paths, and travelling pulse particles during interactions, keeping 85%+ of the network in calm, neutral whites and grays.'
            },
            {
              num: '06',
              q: 'How the visual remains restrained',
              a: 'Visual density was reduced by 35%. No heavy neon fog, purple gradients, glassmorphic blur windows, or 3D spheres were added. Abundant negative space ensures the hero headline "BUILD WHAT GROWS." remains dominant.'
            },
            {
              num: '07',
              q: 'How mobile works',
              a: 'On 390px/768px viewports, the network simplifies into a vertical growth pipeline (INTELLIGENCE → PERFORMANCE → MAGNIAR → COMMERCE → DEVELOPMENT). Touch interactions use simple tap-to-focus category triggers without complex drag physics.'
            },
            {
              num: '08',
              q: 'How performance is protected',
              a: 'Built with hardware-accelerated CSS transforms (translate3d), pure SVG paths, lightweight DOM nodes, throttled mouse move handlers, and full prefers-reduced-motion fallback support. Zero heavy 3D canvas dependencies.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-[2px] bg-[#07090D] border border-white/10 space-y-2">
              <div className="font-mono text-xs text-[#B89A72] font-bold">
                {item.num} / {item.q}
              </div>
              <p className="text-xs text-[#8D949E] leading-relaxed font-sans">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Component Architecture Summary */}
      <div className="p-6 rounded-[2px] bg-[#0A0D12] border border-white/10 space-y-4">
        <div className="font-mono text-xs text-[#F5F7FA] font-bold tracking-wider uppercase flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#B89A72]" />
          <span>CHAPTER 04 REVISED NETWORK COMPONENT ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
          <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1">
            <div className="text-[#B89A72] font-bold">GrowthSystemVisual</div>
            <div className="text-[10px] text-[#8D949E]">Root network graph canvas</div>
          </div>

          <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1">
            <div className="text-[#B89A72] font-bold">CategoryHub</div>
            <div className="text-[10px] text-[#8D949E]">Primary discipline node</div>
          </div>

          <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1">
            <div className="text-[#B89A72] font-bold">PlatformNode</div>
            <div className="text-[10px] text-[#8D949E]">Dot & text capability node</div>
          </div>

          <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1">
            <div className="text-[#B89A72] font-bold">SignalPulse</div>
            <div className="text-[10px] text-[#8D949E]">SVG vector pulse animator</div>
          </div>
        </div>
      </div>
    </div>
  );
};
