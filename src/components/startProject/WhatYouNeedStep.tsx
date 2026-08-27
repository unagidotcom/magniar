import React, { useState } from 'react';
import { ProjectRequestFormData } from '../../types/startProject';
import {
  PERFORMANCE_SERVICES_LIST,
  COMMERCE_PLATFORMS_LIST,
  DEVELOPMENT_SERVICES_LIST,
  INTELLIGENCE_SERVICES_LIST,
} from '../../data/startProjectData';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Check,
  HelpCircle,
  BarChart2,
  ShoppingBag,
  Code2,
  Cpu,
  ChevronLeft,
} from 'lucide-react';

interface WhatYouNeedStepProps {
  formData: ProjectRequestFormData;
  onChange: (fields: Partial<ProjectRequestFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const WhatYouNeedStep: React.FC<WhatYouNeedStepProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  // Accordion state for expandable service groups
  const [openGroups, setOpenGroups] = useState<{
    performance: boolean;
    commerce: boolean;
    development: boolean;
    intelligence: boolean;
  }>({
    performance: true,
    commerce: true,
    development: true,
    intelligence: true,
  });

  const toggleGroup = (group: 'performance' | 'commerce' | 'development' | 'intelligence') => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleArrayItem = (key: keyof ProjectRequestFormData, item: string) => {
    const currentList = (formData[key] as string[]) || [];
    const exists = currentList.includes(item);
    const updated = exists
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];

    onChange({ [key]: updated, isNotSureNeeds: false });
  };

  const handleToggleNotSure = () => {
    const nextVal = !formData.isNotSureNeeds;
    if (nextVal) {
      onChange({
        isNotSureNeeds: true,
      });
    } else {
      onChange({ isNotSureNeeds: false });
    }
  };

  const totalSelectedCount =
    (formData.performanceServices?.length || 0) +
    (formData.commercePlatforms?.length || 0) +
    (formData.developmentServices?.length || 0) +
    (formData.intelligenceServices?.length || 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#B89A72] uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Step 04 / 08 — Capabilities & Support</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Where do you need strategic or technical support?
        </h2>
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Select any channels or services you would like Magniar to evaluate or manage. You can choose multiple options across categories, or select "I'm not sure yet".
        </p>
      </div>

      {/* NOT SURE YET SPECIAL OPTION */}
      <div className="bg-[#080A0D] border border-white/10 p-5 rounded-xl space-y-3 shadow-xl">
        <button
          type="button"
          onClick={handleToggleNotSure}
          className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-lg border transition-all cursor-pointer ${
            formData.isNotSureNeeds
              ? 'bg-[#B89A72]/15 border-[#B89A72] text-white ring-1 ring-[#B89A72] shadow-[0_0_20px_rgba(184,154,114,0.2)]'
              : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <HelpCircle className={`w-5 h-5 flex-shrink-0 ${formData.isNotSureNeeds ? 'text-[#B89A72]' : 'text-slate-400'}`} />
            <div className="text-left font-sans text-sm sm:text-base font-semibold">
              <span>I'm not sure which specific services I need yet — help me diagnose</span>
            </div>
          </div>
          <div
            className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
              formData.isNotSureNeeds
                ? 'bg-[#B89A72] border-[#B89A72] text-white'
                : 'border-white/20'
            }`}
          >
            {formData.isNotSureNeeds && <Check className="w-4 h-4" />}
          </div>
        </button>

        {/* Reassurance Box */}
        {formData.isNotSureNeeds && (
          <div className="p-4 rounded-lg bg-[#B89A72]/10 border border-[#B89A72]/30 font-sans text-sm text-slate-200 space-y-1.5 animate-fadeIn">
            <div className="font-sans text-xs font-bold text-[#B89A72] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>We'll help you map the right solution</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-normal text-xs sm:text-sm">
              No problem at all. You don't need to know the technical breakdown in advance. Tell us about your goals and current setup in the following steps, and our strategy leads will recommend the ideal scope.
            </p>
          </div>
        )}
      </div>

      {/* EXPANDABLE CATEGORY GROUPS */}
      <div className="space-y-4">
        {/* GROUP 01: PERFORMANCE */}
        <div className="bg-[#080A0D] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <button
            type="button"
            onClick={() => toggleGroup('performance')}
            className="w-full px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <BarChart2 className="w-5 h-5 text-[#B89A72]" />
              <span className="font-heading font-bold text-base sm:text-lg text-white">
                Performance Marketing & Paid Media
              </span>
              <span className="font-sans text-xs font-semibold text-[#B89A72] bg-[#B89A72]/15 px-2.5 py-0.5 rounded-full border border-[#B89A72]/30">
                {formData.performanceServices?.length || 0} Selected
              </span>
            </div>
            {openGroups.performance ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openGroups.performance && (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-[#050505]">
              {PERFORMANCE_SERVICES_LIST.map((svc) => {
                const isSelected = formData.performanceServices?.includes(svc);
                return (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleArrayItem('performanceServices', svc)}
                    className={`px-4 py-3 rounded-lg border font-sans text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between gap-2 font-medium ${
                      isSelected
                        ? 'bg-[#B89A72]/15 border-[#B89A72] text-white font-bold ring-1 ring-[#B89A72]'
                        : 'bg-[#080A0D] border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span>{svc}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#B89A72] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* GROUP 02: COMMERCE */}
        <div className="bg-[#080A0D] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <button
            type="button"
            onClick={() => toggleGroup('commerce')}
            className="w-full px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <ShoppingBag className="w-5 h-5 text-[#B89A72]" />
              <span className="font-heading font-bold text-base sm:text-lg text-white">
                Digital Commerce & Marketplaces
              </span>
              <span className="font-sans text-xs font-semibold text-[#B89A72] bg-[#B89A72]/15 px-2.5 py-0.5 rounded-full border border-[#B89A72]/30">
                {formData.commercePlatforms?.length || 0} Selected
              </span>
            </div>
            {openGroups.commerce ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openGroups.commerce && (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-[#050505]">
              {COMMERCE_PLATFORMS_LIST.map((platform) => {
                const isSelected = formData.commercePlatforms?.includes(platform);
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => toggleArrayItem('commercePlatforms', platform)}
                    className={`px-4 py-3 rounded-lg border font-sans text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between gap-2 font-medium ${
                      isSelected
                        ? 'bg-[#B89A72]/15 border-[#B89A72] text-white font-bold ring-1 ring-[#B89A72]'
                        : 'bg-[#080A0D] border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span>{platform}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#B89A72] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* GROUP 03: DEVELOPMENT */}
        <div className="bg-[#080A0D] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <button
            type="button"
            onClick={() => toggleGroup('development')}
            className="w-full px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <Code2 className="w-5 h-5 text-[#B89A72]" />
              <span className="font-heading font-bold text-base sm:text-lg text-white">
                Growth Technology & Systems Engineering
              </span>
              <span className="font-sans text-xs font-semibold text-[#B89A72] bg-[#B89A72]/15 px-2.5 py-0.5 rounded-full border border-[#B89A72]/30">
                {formData.developmentServices?.length || 0} Selected
              </span>
            </div>
            {openGroups.development ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openGroups.development && (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-[#050505]">
              {DEVELOPMENT_SERVICES_LIST.map((dev) => {
                const isSelected = formData.developmentServices?.includes(dev);
                return (
                  <button
                    key={dev}
                    type="button"
                    onClick={() => toggleArrayItem('developmentServices', dev)}
                    className={`px-4 py-3 rounded-lg border font-sans text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between gap-2 font-medium ${
                      isSelected
                        ? 'bg-[#B89A72]/15 border-[#B89A72] text-white font-bold ring-1 ring-[#B89A72]'
                        : 'bg-[#080A0D] border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span>{dev}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#B89A72] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* GROUP 04: INTELLIGENCE */}
        <div className="bg-[#080A0D] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <button
            type="button"
            onClick={() => toggleGroup('intelligence')}
            className="w-full px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <Cpu className="w-5 h-5 text-[#B89A72]" />
              <span className="font-heading font-bold text-base sm:text-lg text-white">
                AI Strategy & Data Intelligence
              </span>
              <span className="font-sans text-xs font-semibold text-[#B89A72] bg-[#B89A72]/15 px-2.5 py-0.5 rounded-full border border-[#B89A72]/30">
                {formData.intelligenceServices?.length || 0} Selected
              </span>
            </div>
            {openGroups.intelligence ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {openGroups.intelligence && (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-[#050505]">
              {INTELLIGENCE_SERVICES_LIST.map((intel) => {
                const isSelected = formData.intelligenceServices?.includes(intel);
                return (
                  <button
                    key={intel}
                    type="button"
                    onClick={() => toggleArrayItem('intelligenceServices', intel)}
                    className={`px-4 py-3 rounded-lg border font-sans text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between gap-2 font-medium ${
                      isSelected
                        ? 'bg-[#B89A72]/15 border-[#B89A72] text-white font-bold ring-1 ring-[#B89A72]'
                        : 'bg-[#080A0D] border-white/10 text-slate-300 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span>{intel}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#B89A72] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Selected Total Badge */}
      <div className="font-sans text-sm text-slate-400 flex items-center justify-between border-t border-white/10 pt-4">
        <span>Selected services:</span>
        <span className="text-[#B89A72] font-bold">
          {formData.isNotSureNeeds ? 'Strategic Diagnosis Requested' : `${totalSelectedCount} items selected`}
        </span>
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
          <span>Continue to Current Setup</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
