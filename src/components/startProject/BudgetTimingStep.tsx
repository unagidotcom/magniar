import React from 'react';
import { ProjectRequestFormData, FormValidationErrors } from '../../types/startProject';
import {
  MONTHLY_AD_SPEND_OPTIONS,
  PROJECT_BUDGET_OPTIONS,
  TIMING_OPTIONS,
  ENGAGEMENT_TYPE_OPTIONS,
} from '../../data/startProjectData';
import { ArrowRight, DollarSign, Clock, Briefcase, Info, ChevronLeft } from 'lucide-react';

interface BudgetTimingStepProps {
  formData: ProjectRequestFormData;
  errors: FormValidationErrors;
  onChange: (fields: Partial<ProjectRequestFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BudgetTimingStep: React.FC<BudgetTimingStepProps> = ({
  formData,
  errors,
  onChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#B89A72] uppercase tracking-wider">
          <DollarSign className="w-4 h-4" />
          <span>Step 06 / 08 — Scope & Timeline</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          What is your scope and timeline?
        </h2>
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Indicate your planned ad spend and project investment timeframe. This allows us to align team capacity and resources.
        </p>
      </div>

      {/* Helpful Distinction Callout */}
      <div className="p-5 rounded-xl bg-[#080A0D] border border-white/10 flex items-start gap-3.5 shadow-lg">
        <Info className="w-5 h-5 text-[#B89A72] flex-shrink-0 mt-0.5" />
        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="text-white font-semibold">Good to know:</span> Media ad spend is paid directly to platforms like Google, Meta, or TikTok. Service budget represents Magniar strategy, management, and engineering scope.
        </p>
      </div>

      {/* Form Fields Container */}
      <div className="space-y-8 bg-[#080A0D] border border-white/10 p-6 sm:p-8 rounded-xl shadow-xl">
        {/* 01: MONTHLY AD SPEND */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block font-sans text-sm sm:text-base font-semibold text-white">
              Estimated Monthly Paid Media Spend
            </label>
            <span className="font-sans text-xs text-[#B89A72] font-medium">Paid to ad networks</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MONTHLY_AD_SPEND_OPTIONS.map((spend) => {
              const isSelected = formData.monthlyMediaAdSpend === spend;

              return (
                <button
                  key={spend}
                  type="button"
                  onClick={() => onChange({ monthlyMediaAdSpend: spend })}
                  className={`px-4 py-3.5 rounded-lg border font-sans text-xs sm:text-sm text-center transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-[#B89A72]/15 border-[#B89A72] text-white font-bold ring-1 ring-[#B89A72] shadow-[0_0_15px_rgba(184,154,114,0.2)]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  {spend}
                </button>
              );
            })}
          </div>
        </div>

        {/* 02: PROJECT / SERVICE BUDGET */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block font-sans text-sm sm:text-base font-semibold text-white">
              Estimated Magniar Service Budget
            </label>
            <span className="font-sans text-xs text-slate-400">Strategy & Execution</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PROJECT_BUDGET_OPTIONS.map((projB) => {
              const isSelected = formData.projectServiceBudget === projB;

              return (
                <button
                  key={projB}
                  type="button"
                  onClick={() => onChange({ projectServiceBudget: projB })}
                  className={`px-4 py-3.5 rounded-lg border font-sans text-xs sm:text-sm text-center transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-[#B89A72]/15 border-[#B89A72] text-white font-bold ring-1 ring-[#B89A72] shadow-[0_0_15px_rgba(184,154,114,0.2)]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  {projB}
                </button>
              );
            })}
          </div>
        </div>

        {/* 03: TIMING / START DATE */}
        <div className="space-y-3">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white flex items-center justify-between">
            <span>When are you looking to get started? <span className="text-[#B89A72]">*</span></span>
            <Clock className="w-4 h-4 text-[#B89A72]" />
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TIMING_OPTIONS.map((timeOpt) => {
              const isSelected = formData.timeline === timeOpt;

              return (
                <button
                  key={timeOpt}
                  type="button"
                  onClick={() => onChange({ timeline: timeOpt })}
                  className={`px-4 py-3.5 rounded-lg border font-sans text-xs sm:text-sm text-center transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-[#B89A72] border-[#B89A72] text-white font-bold shadow-[0_0_15px_rgba(184,154,114,0.35)]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  {timeOpt}
                </button>
              );
            })}
          </div>
        </div>

        {/* 04: ENGAGEMENT TYPE */}
        <div className="space-y-3">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white flex items-center justify-between">
            <span>Preferred engagement model</span>
            <Briefcase className="w-4 h-4 text-slate-400" />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ENGAGEMENT_TYPE_OPTIONS.map((eng) => {
              const isSelected = formData.engagementType === eng;

              return (
                <button
                  key={eng}
                  type="button"
                  onClick={() => onChange({ engagementType: eng })}
                  className={`p-4 rounded-lg border font-sans text-xs sm:text-sm text-left transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-[#B89A72]/15 border-[#B89A72] text-white font-bold ring-1 ring-[#B89A72]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  {eng}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3.5 rounded-lg border border-white/15 bg-[#080A0D] hover:bg-white/10 text-slate-300 hover:text-white font-sans text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-4 rounded-lg bg-[#B89A72] hover:bg-[#8F714D] text-white font-sans text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(184,154,114,0.35)] hover:shadow-[0_0_30px_rgba(184,154,114,0.5)]"
        >
          <span>Continue to Final Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
