import React from 'react';
import { StartProjectStep } from '../../types/startProject';
import { ViewportMode } from '../../types/navigation';
import {
  Monitor,
  Smartphone,
  Tablet,
  CheckSquare,
  RefreshCw,
  Sliders,
  AlertTriangle,
  Play,
} from 'lucide-react';

interface StartProjectDevControlPanelProps {
  currentStep: StartProjectStep;
  onStepChange: (step: StartProjectStep) => void;
  currentViewport: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  onPrefillSampleData: () => void;
  onResetData: () => void;
  onTriggerValidationTest: () => void;
  activeViewMode: 'form' | 'ch10-review';
  onViewModeChange: (mode: 'form' | 'ch10-review') => void;
}

export const StartProjectDevControlPanel: React.FC<StartProjectDevControlPanelProps> = ({
  currentStep,
  onStepChange,
  currentViewport,
  onViewportChange,
  onPrefillSampleData,
  onResetData,
  onTriggerValidationTest,
  activeViewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-[#0A0C0F] border border-[#B89A72]/40 rounded-[2px] p-4 font-mono text-xs text-[#F5F7FA] space-y-3 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B89A72] animate-pulse" />
          <span className="font-bold text-[#B89A72] tracking-widest uppercase text-[11px]">
            DEV CONTROL PANEL — CHAPTER 10 / START A PROJECT
          </span>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewModeChange('form')}
            className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer text-[11px] ${
              activeViewMode === 'form'
                ? 'bg-[#B89A72] text-white font-bold'
                : 'bg-white/5 text-[#8D949E] hover:text-white border border-white/10'
            }`}
          >
            LIVE /START-A-PROJECT
          </button>
          <button
            onClick={() => onViewModeChange('ch10-review')}
            className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer text-[11px] ${
              activeViewMode === 'ch10-review'
                ? 'bg-[#B89A72] text-white font-bold'
                : 'bg-white/5 text-[#8D949E] hover:text-white border border-white/10'
            }`}
          >
            CH 10 DESIGN REVIEW
          </button>
        </div>
      </div>

      {/* Row 2: Step Jumper & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Step Jumper */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[10px] text-[#8D949E] uppercase mr-1">JUMP TO STEP:</span>
          {([0, 1, 2, 3, 4, 5, 6, 7, 8] as StartProjectStep[]).map((st) => {
            const labels = ['00', '01', '02', '03', '04', '05', '06', '07', '08 (DONE)'];
            const isActive = currentStep === st;

            return (
              <button
                key={st}
                onClick={() => onStepChange(st)}
                className={`px-2 py-1 rounded-[2px] border text-[10px] cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#B89A72] border-[#B89A72] text-white font-bold'
                    : 'bg-black/40 border-white/10 text-[#8D949E] hover:text-white'
                }`}
              >
                {labels[st]}
              </button>
            );
          })}
        </div>

        {/* Quick Test Utilities */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onPrefillSampleData}
            className="px-2.5 py-1 rounded-[2px] bg-[#B89A72]/20 text-[#B89A72] border border-[#B89A72]/40 hover:bg-[#B89A72]/30 font-bold text-[10px] cursor-pointer flex items-center gap-1"
          >
            <CheckSquare className="w-3 h-3" />
            <span>PREFILL SAMPLE BRIEF</span>
          </button>

          <button
            onClick={onTriggerValidationTest}
            className="px-2.5 py-1 rounded-[2px] bg-red-950/40 text-red-300 border border-red-500/40 hover:bg-red-900/40 text-[10px] cursor-pointer flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" />
            <span>TEST VALIDATION ERRORS</span>
          </button>

          <button
            onClick={onResetData}
            className="px-2 py-1 rounded-[2px] bg-white/5 text-[#8D949E] border border-white/10 hover:text-white text-[10px] cursor-pointer flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>RESET FORM</span>
          </button>
        </div>
      </div>

      {/* Row 3: Viewport Simulator */}
      <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px]">
        <div className="flex items-center gap-2">
          <span className="text-[#8D949E]">SIMULATED VIEWPORT:</span>
          {(['1440px', '1280px', '1024px', '768px', '390px'] as ViewportMode[]).map((v) => (
            <button
              key={v}
              onClick={() => onViewportChange(v)}
              className={`px-2 py-0.5 rounded-[2px] border ${
                currentViewport === v
                  ? 'border-[#B89A72] text-[#B89A72] font-bold bg-[#B89A72]/10'
                  : 'border-white/10 text-[#8D949E] hover:text-white'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <span className="text-[#8D949E]">CHAPTER 10 PROTOCOL ACTIVE</span>
      </div>
    </div>
  );
};
