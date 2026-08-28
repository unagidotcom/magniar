import React, { useState } from 'react';
import { MagniarButton } from '../common/MagniarButton';
import { SignalIndicator } from '../common/SignalIndicator';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { ArrowIcon } from '../common/ArrowIcon';
import { ButtonVariant, ButtonState } from '../../types/navigation';
import { Sparkles, Layers, Sliders, Shield, Terminal } from 'lucide-react';

export const SharedUiPlayground: React.FC = () => {
  const [selectedState, setSelectedState] = useState<ButtonState>('rest');
  const [selectedVariant, setSelectedVariant] = useState<ButtonVariant>('primary');

  const statesList: { id: ButtonState; label: string }[] = [
    { id: 'rest', label: 'REST STATE' },
    { id: 'hover', label: 'HOVER STATE' },
    { id: 'active', label: 'ACTIVE STATE' },
    { id: 'focus', label: 'ACCESSIBLE FOCUS' },
    { id: 'disabled', label: 'DISABLED STATE' },
    { id: 'loading', label: 'LOADING STATE' },
  ];

  return (
    <div className="bg-[#0A0C0F] border border-white/10 rounded-[2px] p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#B89A72] tracking-widest uppercase mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>CHAPTER 02 — GLOBAL COMPONENT SPECIFICATION</span>
          </div>
          <h3 className="text-xl font-medium text-[#F5F7FA]">
            Global Button & Micro UI Component Playground
          </h3>
          <p className="text-xs text-[#8D949E] mt-1">
            Inspect the reusable interactive controls, signal indicators, arrow vectors, and technical labels.
          </p>
        </div>

        {/* State Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#050505] border border-white/10 rounded-[2px] font-mono text-[10px]">
          {statesList.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedState(st.id)}
              className={`px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer ${
                selectedState === st.id
                  ? 'bg-[#B89A72] text-white font-semibold'
                  : 'text-[#8D949E] hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Button Family Inspector */}
        <div className="lg:col-span-7 space-y-6">
          <div className="font-mono text-xs text-[#B89A72] tracking-wider uppercase font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>01 / GLOBAL BUTTON FAMILY (SIMULATED: {selectedState.toUpperCase()})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Button */}
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8D949E]">
                <span>PRIMARY CTA</span>
                <span className="text-[#B89A72]">HIGH CONTRAST</span>
              </div>
              <div className="py-2">
                <MagniarButton variant="primary" buttonState={selectedState} fullWidth>
                  START A PROJECT
                </MagniarButton>
              </div>
              <div className="text-[10px] text-[#5A626E] font-mono">
                Role: Main conversion trigger for starting client projects.
              </div>
            </div>

            {/* Secondary Button */}
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8D949E]">
                <span>SECONDARY CTA</span>
                <span>CHARCOAL + BLUE</span>
              </div>
              <div className="py-2">
                <MagniarButton variant="secondary" buttonState={selectedState} fullWidth>
                  EXPLORE CAPABILITIES
                </MagniarButton>
              </div>
              <div className="text-[10px] text-[#5A626E] font-mono">
                Role: Exploratory actions & roadmap requests.
              </div>
            </div>

            {/* Utility Button */}
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8D949E]">
                <span>UTILITY BUTTON</span>
                <span>OUTLINE / PORTAL</span>
              </div>
              <div className="py-2">
                <MagniarButton variant="utility" buttonState={selectedState} fullWidth>
                  CLIENT LOGIN
                </MagniarButton>
              </div>
              <div className="text-[10px] text-[#5A626E] font-mono">
                Role: Discrete entry point for client portal workspace.
              </div>
            </div>

            {/* Text Link Button */}
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8D949E]">
                <span>TEXT LINK CTA</span>
                <span>EDITORIAL LINK</span>
              </div>
              <div className="py-4 flex items-center justify-center">
                <MagniarButton variant="text" buttonState={selectedState}>
                  VIEW CASE STUDY
                </MagniarButton>
              </div>
              <div className="text-[10px] text-[#5A626E] font-mono">
                Role: In-text editorial links & directional redirects.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Micro Technical UI Elements */}
        <div className="lg:col-span-5 space-y-6">
          <div className="font-mono text-xs text-[#B89A72] tracking-wider uppercase font-semibold flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            <span>02 / TECHNICAL LABELS & SIGNAL MOTIFS</span>
          </div>

          <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-6">
            {/* Technical Labels */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-mono text-[#8D949E] uppercase">TECHNICAL LABELS</div>
              <div className="flex flex-wrap items-center gap-2">
                <TechnicalLabel variant="outline">01 / PERFORMANCE</TechnicalLabel>
                <TechnicalLabel variant="active">SYSTEM / ACTIVE</TechnicalLabel>
                <TechnicalLabel variant="ghost">GLOBAL DELIVERY</TechnicalLabel>
              </div>
            </div>

            {/* Signal Indicators */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <div className="text-[10px] font-mono text-[#8D949E] uppercase">SIGNAL INDICATOR FAMILY</div>
              <div className="space-y-2">
                <div className="p-2.5 bg-[#0A0C0F] border border-white/5 rounded-[2px] flex items-center justify-between">
                  <SignalIndicator label="SYSTEM / LIVE" size="md" />
                  <span className="font-mono text-[9px] text-[#5A626E]">DEFAULT PULSE</span>
                </div>
                <div className="p-2.5 bg-[#0A0C0F] border border-white/5 rounded-[2px] flex items-center justify-between">
                  <SignalIndicator label="ALL 4 PILLARS ONLINE" size="sm" />
                  <span className="font-mono text-[9px] text-[#5A626E]">COMPACT BADGE</span>
                </div>
              </div>
            </div>

            {/* Directional Arrow System */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <div className="text-[10px] font-mono text-[#8D949E] uppercase">DIRECTIONAL ARROW MOTIF</div>
              <div className="p-3 bg-[#0A0C0F] border border-white/5 rounded-[2px] flex items-center justify-between text-xs font-mono text-[#F5F7FA]">
                <span>STANDARD DIRECTIONAL RESPONSE</span>
                <div className="flex items-center gap-2 text-[#B89A72]">
                  <span>HOVER TEST</span>
                  <ArrowIcon size={16} className="translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
