import React from 'react';
import { StartProjectStep } from '../../types/startProject';
import { ChevronLeft, Check } from 'lucide-react';

interface FormProgressProps {
  currentStep: StartProjectStep;
  totalSteps?: number;
  onStepClick?: (step: StartProjectStep) => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

const STEP_LABELS: { step: StartProjectStep; label: string; numberStr: string }[] = [
  { step: 0, label: 'Goals', numberStr: '01' },
  { step: 1, label: 'About You', numberStr: '02' },
  { step: 2, label: 'Business', numberStr: '03' },
  { step: 3, label: 'Capabilities', numberStr: '04' },
  { step: 4, label: 'Current Setup', numberStr: '05' },
  { step: 5, label: 'Scope & Timeline', numberStr: '06' },
  { step: 6, label: 'Final Details', numberStr: '07' },
  { step: 7, label: 'Review Brief', numberStr: '08' },
];

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  onStepClick,
  onBack,
  canGoBack = false,
}) => {
  if (currentStep === 8) {
    return (
      <div className="w-full bg-[#080A0D] border-b border-white/10 px-4 sm:px-6 py-3.5 font-sans text-xs sm:text-sm flex items-center justify-between text-[#B89A72]">
        <div className="flex items-center gap-2.5 max-w-[1440px] mx-auto w-full">
          <span className="w-2 h-2 rounded-full bg-[#B89A72] animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-white">Consultation Request Logged</span>
        </div>
      </div>
    );
  }

  const currentStepObj = STEP_LABELS.find((s) => s.step === currentStep) || STEP_LABELS[0];
  const progressPercent = Math.min(100, Math.max(0, ((currentStep + 1) / 8) * 100));

  return (
    <div className="w-full bg-[#080A0D]/90 backdrop-blur-md border-b border-white/10 sticky top-[72px] lg:top-[80px] z-30 shadow-lg transition-all">
      {/* Top Thin Progress Line */}
      <div className="w-full h-1 bg-white/5 relative overflow-hidden">
        <div
          className="h-full bg-[#B89A72] transition-all duration-300 ease-out shadow-[0_0_12px_#B89A72]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT: Step Counter & Back Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {canGoBack && (
              <button
                onClick={onBack}
                type="button"
                className="px-3 py-1.5 text-xs sm:text-sm font-sans font-medium text-slate-300 hover:text-white border border-white/15 rounded-md bg-white/[0.03] hover:bg-white/[0.08] transition-colors flex items-center gap-1 cursor-pointer"
                aria-label="Go back to previous step"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            <div className="flex items-center gap-2.5 font-sans">
              <span className="px-2.5 py-0.5 rounded-full bg-[#B89A72]/15 text-[#B89A72] text-xs font-bold border border-[#B89A72]/30">
                Step {currentStep + 1} of 8
              </span>
              <span className="font-heading font-bold text-white text-base sm:text-lg tracking-tight">
                {currentStepObj.label}
              </span>
            </div>
          </div>

          {/* RIGHT: Step Indicators (Desktop) */}
          <div className="hidden md:flex items-center gap-1.5 font-sans text-xs">
            {STEP_LABELS.map((item) => {
              const isActive = item.step === currentStep;
              const isPast = item.step < currentStep;

              return (
                <button
                  key={item.step}
                  onClick={() => onStepClick && isPast && onStepClick(item.step)}
                  disabled={!isPast && !isActive}
                  type="button"
                  className={`px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#B89A72] text-white font-bold shadow-[0_0_12px_rgba(184,154,114,0.4)]'
                      : isPast
                      ? 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 cursor-pointer'
                      : 'bg-transparent text-white/20 border border-transparent cursor-not-allowed'
                  }`}
                >
                  <span>{item.numberStr}.</span>
                  <span className="hidden lg:inline">{item.label}</span>
                  {isPast && <Check className="w-3 h-3 text-[#B89A72]" />}
                </button>
              );
            })}
          </div>

          {/* MOBILE STEP INDICATOR */}
          <div className="md:hidden font-sans text-xs text-slate-400">
            <span>{Math.round(progressPercent)}% complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

