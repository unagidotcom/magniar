import React from 'react';
import { ProjectRequestFormData, FormValidationErrors } from '../../types/startProject';
import {
  TEAM_MANAGEMENT_OPTIONS,
  CHALLENGE_SUGGESTIONS_LIST,
  GOALS_SUGGESTIONS_LIST,
} from '../../data/startProjectData';
import { ArrowRight, Compass, Check, AlertCircle, FileText, Target, ChevronLeft } from 'lucide-react';

interface WhereYouAreStepProps {
  formData: ProjectRequestFormData;
  errors: FormValidationErrors;
  onChange: (fields: Partial<ProjectRequestFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PLATFORM_OPTIONS = [
  'Shopify',
  'WooCommerce',
  'Amazon',
  'Walmart',
  'TikTok Shop',
  'Custom website',
  'Google Ads',
  'Meta Ads',
  'TikTok Ads',
  'LinkedIn Ads',
  'Klaviyo / Email',
  'Other',
];

export const WhereYouAreStep: React.FC<WhereYouAreStepProps> = ({
  formData,
  errors,
  onChange,
  onNext,
  onBack,
}) => {
  const toggleArrayItem = (key: keyof ProjectRequestFormData, item: string) => {
    const currentList = (formData[key] as string[]) || [];
    const exists = currentList.includes(item);
    const updated = exists
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];

    onChange({ [key]: updated });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#0099FF] uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Step 05 / 08 — Current Infrastructure</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          What does your current setup look like?
        </h2>
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Share context on your tech stack, growth management model, and current hurdles so we understand your starting point.
        </p>
      </div>

      {/* Form Section Container */}
      <div className="space-y-8 bg-[#080A0D] border border-white/10 p-6 sm:p-8 rounded-xl shadow-xl">
        {/* CURRENT PLATFORMS & CHANNELS */}
        <div className="space-y-3">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white">
            Which platforms or channels are you currently using?
          </label>
          <div className="flex flex-wrap gap-2.5">
            {PLATFORM_OPTIONS.map((plat) => {
              const isSelected = formData.currentPlatforms?.includes(plat);

              return (
                <button
                  key={plat}
                  type="button"
                  onClick={() => toggleArrayItem('currentPlatforms', plat)}
                  className={`px-4 py-2.5 rounded-lg border font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#0099FF]/15 border-[#0099FF] text-white font-bold ring-1 ring-[#0099FF]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span>{plat}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#0099FF]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* TEAM MANAGEMENT SETUP */}
        <div className="space-y-3">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white">
            Who currently handles your growth and marketing?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {TEAM_MANAGEMENT_OPTIONS.map((teamOpt) => {
              const isSelected = formData.currentTeam === teamOpt;

              return (
                <button
                  key={teamOpt}
                  type="button"
                  onClick={() => onChange({ currentTeam: teamOpt })}
                  className={`p-4 rounded-lg border text-left font-sans text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between font-medium ${
                    isSelected
                      ? 'bg-[#0099FF]/15 border-[#0099FF] text-white font-bold ring-1 ring-[#0099FF] shadow-[0_0_15px_rgba(0,153,255,0.2)]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span>{teamOpt}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#0099FF]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* CURRENT CHALLENGES */}
        <div className="space-y-3">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white">
            What are the biggest bottlenecks holding you back?
          </label>
          <div className="flex flex-wrap gap-2.5">
            {CHALLENGE_SUGGESTIONS_LIST.map((ch) => {
              const isSelected = formData.currentChallenges?.includes(ch);

              return (
                <button
                  key={ch}
                  type="button"
                  onClick={() => toggleArrayItem('currentChallenges', ch)}
                  className={`px-4 py-2.5 rounded-lg border font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-red-500/15 border-red-500/60 text-red-200 font-bold'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span>{ch}</span>
                  {isSelected && <Check className="w-4 h-4 text-red-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* TELL US MORE (TEXTAREA) */}
        <div className="space-y-2.5">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white flex items-center justify-between">
            <span>
              Tell us a bit about your current situation <span className="text-[#0099FF]">*</span>
            </span>
            <FileText className="w-4 h-4 text-slate-400" />
          </label>
          <textarea
            rows={4}
            value={formData.tellUsMore}
            onChange={(e) => onChange({ tellUsMore: e.target.value })}
            placeholder="What is happening today, and what would you like to change? (e.g., CAC has escalated, tracking is broken after iOS updates, or scaling requires custom engineering)."
            className={`w-full p-4 bg-[#050505] border rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all leading-relaxed ${
              errors.tellUsMore ? 'border-red-500/80 bg-red-950/20' : 'border-white/15'
            }`}
          />
          {errors.tellUsMore ? (
            <p className="font-sans text-xs text-red-400 font-medium pt-1">
              {errors.tellUsMore}
            </p>
          ) : (
            <p className="font-sans text-xs text-slate-400">
              Provide a brief summary of what you are aiming to transform or solve.
            </p>
          )}
        </div>

        {/* PRIMARY GOALS / SUCCESS OUTCOMES */}
        <div className="space-y-3 pt-2">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white flex items-center justify-between">
            <span>What does ideal success look like for this engagement?</span>
            <Target className="w-4 h-4 text-[#0099FF]" />
          </label>
          <div className="flex flex-wrap gap-2.5">
            {GOALS_SUGGESTIONS_LIST.map((goal) => {
              const isSelected = formData.primaryGoals?.includes(goal);

              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleArrayItem('primaryGoals', goal)}
                  className={`px-4 py-2.5 rounded-lg border font-sans text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#0099FF]/15 border-[#0099FF] text-white font-bold ring-1 ring-[#0099FF]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span>{goal}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#0099FF]" />}
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
          className="px-8 py-4 rounded-lg bg-[#0099FF] hover:bg-[#0088EE] text-white font-sans text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,153,255,0.35)] hover:shadow-[0_0_30px_rgba(0,153,255,0.5)]"
        >
          <span>Continue to Scope & Timeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
