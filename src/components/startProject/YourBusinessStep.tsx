import React from 'react';
import { ProjectRequestFormData, FormValidationErrors } from '../../types/startProject';
import {
  INDUSTRY_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
  BUSINESS_SCALE_OPTIONS,
} from '../../data/startProjectData';
import { ArrowRight, Building2, Globe, TrendingUp, ChevronLeft } from 'lucide-react';

interface YourBusinessStepProps {
  formData: ProjectRequestFormData;
  errors: FormValidationErrors;
  onChange: (fields: Partial<ProjectRequestFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const YourBusinessStep: React.FC<YourBusinessStepProps> = ({
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
        <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#0099FF] uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>Step 03 / 08 — Business Context</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Tell us about your company
        </h2>
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Help us understand your business, industry category, and scale so we can match you with senior strategists in your space.
        </p>
      </div>

      {/* Form Fields Container */}
      <div className="space-y-6 bg-[#080A0D] border border-white/10 p-6 sm:p-8 rounded-xl shadow-xl">
        {/* Company Name & Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200">
              Company Name <span className="text-[#0099FF]">*</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => onChange({ companyName: e.target.value })}
              placeholder="e.g. Solaris Apparel Co."
              className={`w-full px-4 py-3.5 bg-[#050505] border rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all ${
                errors.companyName ? 'border-red-500/80 bg-red-950/20' : 'border-white/15'
              }`}
            />
            {errors.companyName && (
              <p className="font-sans text-xs text-red-400 font-medium pt-1">
                {errors.companyName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200 flex items-center justify-between">
              <span>
                Website URL <span className="text-[#0099FF]">*</span>
              </span>
              <Globe className="w-4 h-4 text-slate-400" />
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => onChange({ website: e.target.value })}
              placeholder="https://solarisapparel.com"
              className={`w-full px-4 py-3.5 bg-[#050505] border rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all ${
                errors.website ? 'border-red-500/80 bg-red-950/20' : 'border-white/15'
              }`}
            />
            {errors.website ? (
              <p className="font-sans text-xs text-red-400 font-medium pt-1">
                {errors.website}
              </p>
            ) : (
              <p className="font-sans text-xs text-slate-400">
                Your primary active storefront or website URL.
              </p>
            )}
          </div>
        </div>

        {/* Industry & Business Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200">
              Industry Category <span className="text-[#0099FF]">*</span>
            </label>
            <select
              value={formData.industry}
              onChange={(e) => onChange({ industry: e.target.value })}
              className="w-full px-4 py-3.5 bg-[#050505] border border-white/15 rounded-lg font-sans text-base text-white focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all cursor-pointer"
            >
              {INDUSTRY_OPTIONS.map((ind) => (
                <option key={ind} value={ind} className="bg-[#080A0D] text-white">
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200">
              Business Model <span className="text-[#0099FF]">*</span>
            </label>
            <select
              value={formData.businessModel}
              onChange={(e) => onChange({ businessModel: e.target.value })}
              className="w-full px-4 py-3.5 bg-[#050505] border border-white/15 rounded-lg font-sans text-base text-white focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all cursor-pointer"
            >
              {BUSINESS_MODEL_OPTIONS.map((m) => (
                <option key={m} value={m} className="bg-[#080A0D] text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Market & Expansion Market */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200">
              Primary Market Region
            </label>
            <input
              type="text"
              value={formData.primaryMarket}
              onChange={(e) => onChange({ primaryMarket: e.target.value })}
              placeholder="e.g. North America, Global, Europe"
              className="w-full px-4 py-3.5 bg-[#050505] border border-white/15 rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200">
              Target Expansion Market (Optional)
            </label>
            <input
              type="text"
              value={formData.targetMarket || ''}
              onChange={(e) => onChange({ targetMarket: e.target.value })}
              placeholder="e.g. United Kingdom, Australia, Japan"
              className="w-full px-4 py-3.5 bg-[#050505] border border-white/15 rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all"
            />
          </div>
        </div>

        {/* Business Scale / Revenue Scale */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="block font-sans text-sm font-semibold text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0099FF]" />
              <span>Approximate Annual Revenue Scale</span>
            </label>
            <span className="font-sans text-xs text-slate-400">Optional</span>
          </div>

          <p className="font-sans text-xs text-slate-400">
            This helps us route your inquiry to growth leaders who specialize in your specific business stage.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {BUSINESS_SCALE_OPTIONS.map((scale) => {
              const isSelected = formData.businessSize === scale;

              return (
                <button
                  key={scale}
                  type="button"
                  onClick={() => onChange({ businessSize: scale })}
                  className={`px-4 py-3 rounded-lg border font-sans text-xs sm:text-sm text-center transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-[#0099FF]/15 border-[#0099FF] text-white font-bold ring-1 ring-[#0099FF] shadow-[0_0_15px_rgba(0,153,255,0.2)]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  {scale}
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
          <span>Continue to Capabilities</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
