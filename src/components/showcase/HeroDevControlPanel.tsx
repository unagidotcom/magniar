import React from 'react';
import { Sliders, Zap, MousePointer, ShieldAlert, Layers, Activity, Eye, RefreshCw } from 'lucide-react';
import { HeroInteractionConfig, DensityLevel, SignalActivityLevel } from '../../types/heroInteraction';
import { ViewportMode } from '../../types/navigation';

interface HeroDevControlPanelProps {
  config: HeroInteractionConfig;
  onConfigChange: (newConfig: Partial<HeroInteractionConfig>) => void;
  currentViewport: ViewportMode;
  onViewportChange: (viewport: ViewportMode) => void;
  onReset: () => void;
  className?: string;
}

export const HeroDevControlPanel: React.FC<HeroDevControlPanelProps> = ({
  config,
  onConfigChange,
  currentViewport,
  onViewportChange,
  onReset,
  className = '',
}) => {
  const presets = [
    { id: 'IDLE_1440', label: 'A. 1440px Idle', viewport: '1440px' as ViewportMode, density: 'MEDIUM' as DensityLevel, signal: 'MEDIUM' as SignalActivityLevel, cursor: true, reduced: false, motion: true },
    { id: 'CURSOR_NEAR', label: 'B. Cursor Proximity', viewport: '1440px' as ViewportMode, density: 'MEDIUM' as DensityLevel, signal: 'HIGH' as SignalActivityLevel, cursor: true, reduced: false, motion: true },
    { id: 'NODE_HOVER', label: 'C. Node Hover (Google)', viewport: '1440px' as ViewportMode, density: 'HIGH' as DensityLevel, signal: 'HIGH' as SignalActivityLevel, cursor: true, reduced: false, motion: true },
    { id: 'CATEGORY_FOCUS', label: 'D. Category Focus', viewport: '1440px' as ViewportMode, density: 'MEDIUM' as DensityLevel, signal: 'HIGH' as SignalActivityLevel, cursor: true, reduced: false, motion: true },
    { id: 'ACTIVE_SIGNAL', label: 'E. Active Signal Flow', viewport: '1440px' as ViewportMode, density: 'HIGH' as DensityLevel, signal: 'HIGH' as SignalActivityLevel, cursor: true, reduced: false, motion: true },
    { id: 'REDUCED_MOTION', label: 'F. Reduced Motion', viewport: '1440px' as ViewportMode, density: 'MEDIUM' as DensityLevel, signal: 'LOW' as SignalActivityLevel, cursor: false, reduced: true, motion: false },
    { id: 'LAPTOP_1024', label: 'G. 1024px Laptop', viewport: '1024px' as ViewportMode, density: 'MEDIUM' as DensityLevel, signal: 'MEDIUM' as SignalActivityLevel, cursor: true, reduced: false, motion: true },
    { id: 'TABLET_768', label: 'H. 768px Tablet', viewport: '768px' as ViewportMode, density: 'LOW' as DensityLevel, signal: 'LOW' as SignalActivityLevel, cursor: false, reduced: false, motion: true },
    { id: 'MOBILE_390', label: 'I. 390px Mobile', viewport: '390px' as ViewportMode, density: 'LOW' as DensityLevel, signal: 'LOW' as SignalActivityLevel, cursor: false, reduced: false, motion: true },
    { id: 'MOBILE_TAP', label: 'J. Mobile Tap Focus', viewport: '390px' as ViewportMode, density: 'LOW' as DensityLevel, signal: 'MEDIUM' as SignalActivityLevel, cursor: false, reduced: false, motion: true },
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    onViewportChange(preset.viewport);
    onConfigChange({
      density: preset.density,
      signalActivity: preset.signal,
      cursorResponse: preset.cursor,
      reducedMotion: preset.reduced,
      motionActive: preset.motion,
      simulatedPreset: preset.id,
    });
  };

  return (
    <div className={`p-4 sm:p-5 rounded-[2px] bg-[#0A0D12] border border-[#0099FF]/40 space-y-4 font-mono text-xs shadow-2xl ${className}`}>
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#0099FF]" />
          <span className="font-bold text-[#F5F7FA] tracking-wider uppercase text-[11px]">
            CHAPTER 04 HERO MOTION & INTERACTION CONTROL PANEL
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#0099FF]/20 text-[#0099FF] text-[10px] font-semibold border border-[#0099FF]/40 uppercase">
          INTERNAL PROTOTYPE ONLY
        </span>
      </div>

      {/* Toggles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
        
        {/* Motion Active */}
        <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1.5">
          <div className="text-[10px] text-[#8D949E] uppercase flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#0099FF]" />
            <span>SYSTEM MOTION</span>
          </div>
          <button
            onClick={() => onConfigChange({ motionActive: !config.motionActive })}
            className={`w-full py-1 text-[10px] rounded border font-semibold transition-colors cursor-pointer ${
              config.motionActive
                ? 'bg-[#0099FF]/20 border-[#0099FF] text-[#0099FF]'
                : 'bg-black/40 border-white/10 text-[#5A626E]'
            }`}
          >
            {config.motionActive ? 'ACTIVE (ON)' : 'PAUSED (OFF)'}
          </button>
        </div>

        {/* Reduced Motion Mode */}
        <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1.5">
          <div className="text-[10px] text-[#8D949E] uppercase flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-[#0099FF]" />
            <span>REDUCED MOTION</span>
          </div>
          <button
            onClick={() => onConfigChange({ reducedMotion: !config.reducedMotion })}
            className={`w-full py-1 text-[10px] rounded border font-semibold transition-colors cursor-pointer ${
              config.reducedMotion
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-black/40 border-white/10 text-[#8D949E]'
            }`}
          >
            {config.reducedMotion ? 'ENABLED (STATIC)' : 'NORMAL'}
          </button>
        </div>

        {/* Cursor Response */}
        <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1.5">
          <div className="text-[10px] text-[#8D949E] uppercase flex items-center gap-1">
            <MousePointer className="w-3 h-3 text-[#0099FF]" />
            <span>CURSOR PROXIMITY</span>
          </div>
          <button
            onClick={() => onConfigChange({ cursorResponse: !config.cursorResponse })}
            className={`w-full py-1 text-[10px] rounded border font-semibold transition-colors cursor-pointer ${
              config.cursorResponse
                ? 'bg-[#0099FF]/20 border-[#0099FF] text-[#0099FF]'
                : 'bg-black/40 border-white/10 text-[#5A626E]'
            }`}
          >
            {config.cursorResponse ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        {/* Network Density Level */}
        <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1.5">
          <div className="text-[10px] text-[#8D949E] uppercase flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#0099FF]" />
            <span>NETWORK DENSITY</span>
          </div>
          <div className="flex gap-1">
            {(['LOW', 'MEDIUM', 'HIGH'] as DensityLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onConfigChange({ density: lvl })}
                className={`flex-1 py-1 text-[9px] rounded border font-semibold cursor-pointer ${
                  config.density === lvl
                    ? 'bg-[#0099FF] border-[#0099FF] text-white'
                    : 'bg-black/40 border-white/10 text-[#8D949E] hover:text-white'
                }`}
              >
                {lvl[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Signal Activity Level */}
        <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1.5">
          <div className="text-[10px] text-[#8D949E] uppercase flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#0099FF]" />
            <span>SIGNAL ACTIVITY</span>
          </div>
          <div className="flex gap-1">
            {(['LOW', 'MEDIUM', 'HIGH'] as SignalActivityLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onConfigChange({ signalActivity: lvl })}
                className={`flex-1 py-1 text-[9px] rounded border font-semibold cursor-pointer ${
                  config.signalActivity === lvl
                    ? 'bg-[#0099FF] border-[#0099FF] text-white'
                    : 'bg-black/40 border-white/10 text-[#8D949E] hover:text-white'
                }`}
              >
                {lvl[0]}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Preset Trigger Quick Selectors */}
      <div className="pt-2 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[#8D949E]">
          <span className="flex items-center gap-1.5 uppercase font-semibold text-[#F5F7FA]">
            <Eye className="w-3.5 h-3.5 text-[#0099FF]" />
            CHAPTER 04 REQUIRED VISUAL REVIEW PRESETS
          </span>
          <button
            onClick={onReset}
            className="text-[10px] text-[#0099FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            RESET TO DEFAULT
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {presets.map((p) => {
            const isSelected = config.simulatedPreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                className={`px-2.5 py-1.5 rounded-[2px] border text-left text-[10px] transition-all cursor-pointer font-medium truncate ${
                  isSelected
                    ? 'bg-[#0099FF] text-white border-[#0099FF] shadow-[0_0_12px_rgba(0,153,255,0.4)]'
                    : 'bg-[#05070A] text-[#8D949E] border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
