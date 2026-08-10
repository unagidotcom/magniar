import React from 'react';
import { ProjectRequestFormData, GrowthGoalOpeningOption } from '../../types/startProject';
import { OPENING_GOAL_OPTIONS } from '../../data/startProjectData';
import { ArrowRight, Target, CheckCircle2 } from 'lucide-react';

interface OpeningGoalStepProps {
  formData: ProjectRequestFormData;
  onChange: (fields: Partial<ProjectRequestFormData>) => void;
  onNext: () => void;
}

export const OpeningGoalStep: React.FC<OpeningGoalStepProps> = ({
  formData,
  onChange,
  onNext,
}) => {
  const selectedGoal = formData.openingGoal || 'REVENUE';

  const handleSelect = (goalId: GrowthGoalOpeningOption) => {
    onChange({ openingGoal: goalId });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#0099FF] uppercase tracking-wider">
          <Target className="w-4 h-4" />
          <span>Step 01 / 08 — Strategic Focus</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          What is your primary focus today?
        </h2>
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Select the focus area that best matches your immediate goals. We'll tailor our strategy and recommendations accordingly.
        </p>
      </div>

      {/* Grid of Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPENING_GOAL_OPTIONS.map((option) => {
          const isSelected = selectedGoal === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`p-6 sm:p-7 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 ${
                isSelected
                  ? 'bg-[#0099FF]/10 border-[#0099FF] ring-1 ring-[#0099FF] shadow-[0_0_25px_rgba(0,153,255,0.18)]'
                  : 'bg-[#080A0D] border-white/10 hover:border-white/30 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-heading font-bold text-lg sm:text-xl text-white">
                  {option.label}
                </span>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${
                    isSelected
                      ? 'bg-[#0099FF] border-[#0099FF] text-white'
                      : 'border-white/20 bg-white/5 text-transparent'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs sm:text-sm text-slate-400">
          Select your goal to proceed
        </p>

        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#0099FF] hover:bg-[#0088EE] text-white font-sans text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,153,255,0.35)] hover:shadow-[0_0_30px_rgba(0,153,255,0.5)]"
        >
          <span>Continue to Your Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
