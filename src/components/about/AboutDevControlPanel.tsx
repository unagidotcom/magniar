import React from 'react';
import { ViewportMode } from '../../types/navigation';
import { Monitor, Tablet, Smartphone, Sparkles, Navigation } from 'lucide-react';

interface AboutDevControlPanelProps {
  currentViewport: ViewportMode;
  onViewportChange: (vp: ViewportMode) => void;
  activeViewMode: 'homepage' | 'about' | 'start-project';
  onViewModeChange: (mode: 'homepage' | 'about' | 'start-project') => void;
  onJumpToSection?: (sectionId: string) => void;
}

export const AboutDevControlPanel: React.FC<AboutDevControlPanelProps> = ({
  currentViewport,
  onViewportChange,
  activeViewMode,
  onViewModeChange,
  onJumpToSection,
}) => {
  const sections = [
    { id: 'about-hero', label: '01 Hero' },
    { id: 'core-idea', label: '02 Core Idea' },
    { id: 'magniar-model', label: '03 Model Diagram' },
    { id: 'why-magniar', label: '04 Why Magniar' },
    { id: 'how-we-think', label: '05 How We Think' },
    { id: 'target-market', label: '06 Audience' },
    { id: 'platform-matrix', label: '07 Platforms' },
    { id: 'mktg-dev', label: '08 Mktg + Dev' },
    { id: 'ai-strategy', label: '09 AI Strategy' },
    { id: 'compact-process', label: '10 Process' },
    { id: 'people', label: '11 People' },
    { id: 'values', label: '12 Values' },
    { id: 'differentiators', label: '13 Differentiators' },
    { id: 'connections', label: '14 Connections' },
  ];

  return (
    <div className="bg-[#0A0D12] border-b border-white/10 p-3 text-xs font-mono text-[#8D949E] flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[#B89A72] font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          CH 11 ABOUT DEV CONTROL
        </span>
        <span className="text-white/20">|</span>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-[#050505] p-1 border border-white/10 rounded-[2px]">
          <button
            onClick={() => onViewportChange('1440px')}
            className={`px-2 py-0.5 rounded-[2px] transition-colors ${
              currentViewport === '1440px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
            }`}
          >
            <Monitor className="w-3 h-3 inline mr-1" />
            1440
          </button>
          <button
            onClick={() => onViewportChange('1280px')}
            className={`px-2 py-0.5 rounded-[2px] transition-colors ${
              currentViewport === '1280px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
            }`}
          >
            1280
          </button>
          <button
            onClick={() => onViewportChange('1024px')}
            className={`px-2 py-0.5 rounded-[2px] transition-colors ${
              currentViewport === '1024px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
            }`}
          >
            1024
          </button>
          <button
            onClick={() => onViewportChange('768px')}
            className={`px-2 py-0.5 rounded-[2px] transition-colors ${
              currentViewport === '768px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
            }`}
          >
            <Tablet className="w-3 h-3 inline mr-1" />
            768
          </button>
          <button
            onClick={() => onViewportChange('390px')}
            className={`px-2 py-0.5 rounded-[2px] transition-colors ${
              currentViewport === '390px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
            }`}
          >
            <Smartphone className="w-3 h-3 inline mr-1" />
            390
          </button>
        </div>
      </div>

      {/* Quick Jump Section Links */}
      <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5 scrollbar-none">
        <span className="text-white/40 flex items-center gap-1 shrink-0">
          <Navigation className="w-3 h-3 text-[#B89A72]" /> JUMP:
        </span>
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => {
              if (onJumpToSection) onJumpToSection(sec.id);
              const el = document.getElementById(sec.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-2 py-0.5 bg-white/5 border border-white/10 hover:border-[#B89A72] hover:text-white transition-colors shrink-0 text-[10px]"
          >
            {sec.label}
          </button>
        ))}
      </div>
    </div>
  );
};
