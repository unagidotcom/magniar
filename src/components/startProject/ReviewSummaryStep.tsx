import React from 'react';
import { ProjectRequestFormData, StartProjectStep } from '../../types/startProject';
import {
  FileText,
  User,
  Building2,
  Layers,
  Compass,
  DollarSign,
  MessageSquare,
  Edit2,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Target,
} from 'lucide-react';

interface ReviewSummaryStepProps {
  formData: ProjectRequestFormData;
  onEditStep: (step: StartProjectStep) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submissionError?: string | null;
}

export const ReviewSummaryStep: React.FC<ReviewSummaryStepProps> = ({
  formData,
  onEditStep,
  onSubmit,
  isSubmitting = false,
  submissionError = null,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#B89A72] uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Step 08 / 08 — Review & Confirm</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Review your project brief
        </h2>
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Verify your details below. You can edit any section before sending your inquiry to Magniar's growth partners.
        </p>
      </div>

      {/* BRIEF SUMMARY CARDS */}
      <div className="space-y-5">
        {/* BLOCK 00: GOALS */}
        <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 font-heading text-base font-bold text-white">
              <Target className="w-4 h-4 text-[#B89A72]" />
              <span>01 / Primary Strategic Focus</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(0)}
              className="px-3 py-1.5 text-xs font-sans font-semibold text-[#B89A72] hover:text-white bg-[#B89A72]/10 hover:bg-[#B89A72]/20 border border-[#B89A72]/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="font-sans text-sm text-slate-300">
            <span className="text-slate-400 text-xs block font-medium">Selected Goal</span>
            <span className="text-white font-bold text-base">{formData.openingGoal}</span>
          </div>
        </div>

        {/* BLOCK 01: CONTACT */}
        <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 font-heading text-base font-bold text-white">
              <User className="w-4 h-4 text-[#B89A72]" />
              <span>02 / Contact Information</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="px-3 py-1.5 text-xs font-sans font-semibold text-[#B89A72] hover:text-white bg-[#B89A72]/10 hover:bg-[#B89A72]/20 border border-[#B89A72]/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-sm">
            <div>
              <span className="text-slate-400 text-xs block font-medium">Name</span>
              <span className="text-white font-bold">
                {formData.firstName} {formData.lastName}
              </span>
            </div>

            <div>
              <span className="text-slate-400 text-xs block font-medium">Work Email</span>
              <span className="text-[#B89A72] font-semibold">{formData.email}</span>
            </div>

            <div>
              <span className="text-slate-400 text-xs block font-medium">Role & Country</span>
              <span className="text-white">
                {formData.role} ({formData.country})
              </span>
            </div>
          </div>
        </div>

        {/* BLOCK 02: BUSINESS */}
        <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 font-heading text-base font-bold text-white">
              <Building2 className="w-4 h-4 text-[#B89A72]" />
              <span>03 / Business Details</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="px-3 py-1.5 text-xs font-sans font-semibold text-[#B89A72] hover:text-white bg-[#B89A72]/10 hover:bg-[#B89A72]/20 border border-[#B89A72]/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-sm">
            <div>
              <span className="text-slate-400 text-xs block font-medium">Company & Website</span>
              <span className="text-white font-bold block">{formData.companyName}</span>
              <a
                href={formData.website}
                target="_blank"
                rel="noreferrer"
                className="text-[#B89A72] hover:underline text-xs"
              >
                {formData.website}
              </a>
            </div>

            <div>
              <span className="text-slate-400 text-xs block font-medium">Industry & Model</span>
              <span className="text-white">
                {formData.industry} • {formData.businessModel}
              </span>
            </div>

            <div>
              <span className="text-slate-400 text-xs block font-medium">Market & Scale</span>
              <span className="text-white">
                {formData.primaryMarket} ({formData.businessSize})
              </span>
            </div>
          </div>
        </div>

        {/* BLOCK 03: CAPABILITIES */}
        <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 font-heading text-base font-bold text-white">
              <Layers className="w-4 h-4 text-[#B89A72]" />
              <span>04 / Capabilities & Support</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="px-3 py-1.5 text-xs font-sans font-semibold text-[#B89A72] hover:text-white bg-[#B89A72]/10 hover:bg-[#B89A72]/20 border border-[#B89A72]/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          {formData.isNotSureNeeds ? (
            <div className="p-3.5 bg-[#B89A72]/10 border border-[#B89A72]/30 rounded-lg font-sans text-sm text-[#B89A72] font-medium">
              <span>Strategic Diagnosis Requested ("Not Sure Yet" path selected)</span>
            </div>
          ) : (
            <div className="space-y-2.5 font-sans text-sm">
              {formData.performanceServices?.length > 0 && (
                <div>
                  <span className="text-slate-400 text-xs block font-medium">Performance Marketing:</span>
                  <span className="text-white font-medium">{formData.performanceServices.join(', ')}</span>
                </div>
              )}
              {formData.commercePlatforms?.length > 0 && (
                <div>
                  <span className="text-slate-400 text-xs block font-medium">Commerce Platforms:</span>
                  <span className="text-white font-medium">{formData.commercePlatforms.join(', ')}</span>
                </div>
              )}
              {formData.developmentServices?.length > 0 && (
                <div>
                  <span className="text-slate-400 text-xs block font-medium">Growth Tech & Development:</span>
                  <span className="text-white font-medium">{formData.developmentServices.join(', ')}</span>
                </div>
              )}
              {formData.intelligenceServices?.length > 0 && (
                <div>
                  <span className="text-slate-400 text-xs block font-medium">AI & Data Strategy:</span>
                  <span className="text-white font-medium">{formData.intelligenceServices.join(', ')}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BLOCK 04: CURRENT SETUP */}
        <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 font-heading text-base font-bold text-white">
              <Compass className="w-4 h-4 text-[#B89A72]" />
              <span>05 / Current Infrastructure & Bottlenecks</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="px-3 py-1.5 text-xs font-sans font-semibold text-[#B89A72] hover:text-white bg-[#B89A72]/10 hover:bg-[#B89A72]/20 border border-[#B89A72]/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 font-sans text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 text-xs block font-medium">Growth Team Setup</span>
                <span className="text-white font-medium">{formData.currentTeam}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block font-medium">Key Challenges</span>
                <span className="text-red-300 font-medium">
                  {formData.currentChallenges?.join(', ') || 'None specified'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-xs block font-medium mb-1">Current Situation Summary</span>
              <p className="font-sans text-sm text-slate-200 bg-[#050505] p-4 rounded-lg border border-white/10 leading-relaxed font-normal">
                {formData.tellUsMore || 'No details provided.'}
              </p>
            </div>
          </div>
        </div>

        {/* BLOCK 05: BUDGET & TIMING */}
        <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 font-heading text-base font-bold text-white">
              <DollarSign className="w-4 h-4 text-[#B89A72]" />
              <span>06 / Scope, Investment & Timeline</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="px-3 py-1.5 text-xs font-sans font-semibold text-[#B89A72] hover:text-white bg-[#B89A72]/10 hover:bg-[#B89A72]/20 border border-[#B89A72]/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-sm">
            <div>
              <span className="text-slate-400 text-xs block font-medium">Monthly Media Spend</span>
              <span className="text-[#B89A72] font-bold">{formData.monthlyMediaAdSpend}</span>
            </div>

            <div>
              <span className="text-slate-400 text-xs block font-medium">Project Budget</span>
              <span className="text-white font-bold">{formData.projectServiceBudget}</span>
            </div>

            <div>
              <span className="text-slate-400 text-xs block font-medium">Target Timeline</span>
              <span className="text-white font-bold">{formData.timeline}</span>
            </div>
          </div>
        </div>

        {/* BLOCK 06: ADDITIONAL DETAILS */}
        <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5 font-heading text-base font-bold text-white">
              <MessageSquare className="w-4 h-4 text-[#B89A72]" />
              <span>07 / Referral & Attachments</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(6)}
              className="px-3 py-1.5 text-xs font-sans font-semibold text-[#B89A72] hover:text-white bg-[#B89A72]/10 hover:bg-[#B89A72]/20 border border-[#B89A72]/30 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm">
            <div>
              <span className="text-slate-400 text-xs block font-medium">Referral Source</span>
              <span className="text-white font-medium">{formData.referralSource}</span>
            </div>

            <div>
              <span className="text-slate-400 text-xs block font-medium">Attached Brief</span>
              <span className="text-[#B89A72] font-medium">
                {formData.attachmentName || 'No file attached'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Statement */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3 font-sans text-xs sm:text-sm text-slate-300">
        <ShieldCheck className="w-5 h-5 text-[#B89A72] flex-shrink-0" />
        <span>Submitting initiates a direct evaluation with a Magniar lead partner. No financial commitment required.</span>
      </div>

      {submissionError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 font-sans text-sm text-rose-200">
          {submissionError}
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onEditStep(6)}
          disabled={isSubmitting}
          className="px-6 py-3.5 rounded-lg border border-white/15 bg-[#080A0D] hover:bg-white/10 text-slate-300 hover:text-white font-sans text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Step 7</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#B89A72] hover:bg-[#8F714D] text-white font-sans text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(184,154,114,0.4)] hover:shadow-[0_0_35px_rgba(184,154,114,0.6)] disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Submitting Brief...</span>
            </>
          ) : (
            <>
              <span>Submit Project Brief</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
