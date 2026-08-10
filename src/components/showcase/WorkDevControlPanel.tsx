import React from 'react';
import { ViewportMode } from '../../types/navigation';
import { CASE_STUDIES_DATA } from '../../data/workData';
import { Monitor, Smartphone, Tablet, Sliders, Globe, Layers, BookOpen, Settings2 } from 'lucide-react';

interface WorkDevControlPanelProps {
  currentViewport: ViewportMode;
  onViewportChange: (viewport: ViewportMode) => void;
  activeViewMode: 'homepage' | 'work-page' | 'work-detail';
  onViewModeChange: (mode: 'homepage' | 'work-page' | 'work-detail') => void;
  activeSlug: string;
  onSlugChange: (slug: string) => void;
}

export function WorkDevControlPanel({
  currentViewport,
  onViewportChange,
  activeViewMode,
  onViewModeChange,
  activeSlug,
  onSlugChange,
}: WorkDevControlPanelProps) {
  const viewports: { mode: ViewportMode; label: string; icon: any }[] = [
    { mode: '1440px', label: '1440px Desktop', icon: Monitor },
    { mode: '1280px', label: '1280px Laptop', icon: Monitor },
    { mode: '1024px', label: '1024px Tablet', icon: Tablet },
    { mode: '768px', label: '768px Mobile L', icon: Smartphone },
    { mode: '390px', label: '390px Mobile S', icon: Smartphone },
  ];

  return (
    <div className="bg-[#0A0C0F] border border-[#0099FF]/40 rounded-[2px] p-4 font-mono text-xs text-[#F5F7FA] space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-[#0099FF]" />
          <span className="font-bold text-[#F5F7FA] uppercase tracking-wider text-[11px]">
            CHAPTER 08 — WORK / CASE STUDY DEV CONTROL PANEL
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-[2px] border border-[#10B981]/30">
          <span>SPECIFICATION: VERIFIED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* View Mode Switcher */}
        <div>
          <label className="text-[#5A626E] text-[10px] uppercase block mb-1.5 font-bold">
            VIEW MODE
          </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => onViewModeChange('homepage')}
              className={`px-2.5 py-1.5 rounded-[2px] border text-[11px] cursor-pointer ${
                activeViewMode === 'homepage'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              HOMEPAGE SECTION
            </button>
            <button
              onClick={() => onViewModeChange('work-page')}
              className={`px-2.5 py-1.5 rounded-[2px] border text-[11px] cursor-pointer ${
                activeViewMode === 'work-page'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              /WORK INDEX
            </button>
            <button
              onClick={() => onViewModeChange('work-detail')}
              className={`px-2.5 py-1.5 rounded-[2px] border text-[11px] cursor-pointer ${
                activeViewMode === 'work-detail'
                  ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                  : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              DETAIL VIEW
            </button>
          </div>
        </div>

        {/* Viewport Selector */}
        <div>
          <label className="text-[#5A626E] text-[10px] uppercase block mb-1.5 font-bold">
            VIEWPORT SIMULATOR
          </label>
          <div className="flex flex-wrap gap-1">
            {viewports.map((vp) => {
              const Icon = vp.icon;
              return (
                <button
                  key={vp.mode}
                  onClick={() => onViewportChange(vp.mode)}
                  className={`px-2 py-1.5 rounded-[2px] border text-[10px] flex items-center gap-1 cursor-pointer ${
                    currentViewport === vp.mode
                      ? 'bg-[#0099FF] text-white border-[#0099FF] font-semibold'
                      : 'bg-[#050505] text-[#8D949E] border-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{vp.mode}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Case Study Selector (for Detail View) */}
        <div>
          <label className="text-[#5A626E] text-[10px] uppercase block mb-1.5 font-bold">
            CASE STUDY RECORD SELECTOR
          </label>
          <select
            value={activeSlug}
            onChange={(e) => {
              onSlugChange(e.target.value);
              onViewModeChange('work-detail');
            }}
            className="w-full bg-[#050505] border border-white/10 text-white text-xs py-1.5 px-2 rounded-[2px] focus:outline-none focus:border-[#0099FF]"
          >
            {CASE_STUDIES_DATA.map((cs) => (
              <option key={cs.id} value={cs.slug}>
                {cs.clientName} ({cs.businessModel})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
