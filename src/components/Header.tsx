import React from 'react';
import { Grid, Sparkles, Copy, Check, Terminal, FileText, Code2 } from 'lucide-react';
import { SectionTab } from '../types/design-system';

interface HeaderProps {
  activeTab: SectionTab;
  setActiveTab: (tab: SectionTab) => void;
  gridEnabled: boolean;
  setGridEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  gridDense: boolean;
  setGridDense: React.Dispatch<React.SetStateAction<boolean>>;
  copied: boolean;
  onCopyTokens: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  gridEnabled,
  setGridEnabled,
  gridDense,
  setGridDense,
  copied,
  onCopyTokens,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Chapter Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A0C0F] border border-white/10 group-hover:border-[#0099FF]/50 transition-colors">
              <span className="h-2 w-2 rounded-full bg-[#0099FF] animate-magniar-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">MAGNIAR</span>
                <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-[#8D949E] border border-white/5">
                  CHAPTER 01
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#5A626E] uppercase tracking-wider">
                DESIGN SYSTEM FOUNDATION SPECIFICATION
              </p>
            </div>
          </button>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Grid Overlay Toggle */}
          <button
            onClick={() => setGridEnabled(!gridEnabled)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs transition-all border ${
              gridEnabled
                ? 'bg-[#0099FF]/10 text-[#0099FF] border-[#0099FF]/40 shadow-[0_0_12px_rgba(0,153,255,0.2)]'
                : 'bg-[#0A0C0F] text-[#8D949E] border-white/10 hover:text-white hover:border-white/20'
            }`}
            title="Toggle Technical Grid Background Overlay"
          >
            <Grid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GRID</span>
            <span className="text-[10px] opacity-60">{gridEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Grid Density Toggle (When Grid is ON) */}
          {gridEnabled && (
            <button
              onClick={() => setGridDense(!gridDense)}
              className="hidden sm:flex items-center gap-1 rounded-md bg-[#0A0C0F] border border-white/10 px-2 py-1.5 font-mono text-[10px] text-[#8D949E] hover:text-white"
            >
              <span>{gridDense ? '20px' : '40px'}</span>
            </button>
          )}

          {/* Spec Document View Shortcut */}
          <button
            onClick={() => setActiveTab('full-spec')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs transition-all border ${
              activeTab === 'full-spec'
                ? 'bg-white/10 text-white border-white/30'
                : 'bg-[#0A0C0F] text-[#8D949E] border-white/10 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-[#0099FF]" />
            <span className="hidden md:inline">SPEC DOC</span>
          </button>

          {/* Token Exporter Shortcut */}
          <button
            onClick={() => setActiveTab('exporter')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs transition-all border ${
              activeTab === 'exporter'
                ? 'bg-white/10 text-white border-white/30'
                : 'bg-[#0A0C0F] text-[#8D949E] border-white/10 hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-[#0099FF]" />
            <span className="hidden md:inline">JSON TOKENS</span>
          </button>

          {/* Quick Copy Tokens Button */}
          <button
            onClick={onCopyTokens}
            className="flex items-center gap-1.5 rounded-md bg-[#0099FF] px-3 py-1.5 text-xs font-medium text-black transition-all hover:bg-[#33AFFF] active:scale-95 shadow-[0_0_15px_rgba(0,153,255,0.3)]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">COPY TOKENS</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
