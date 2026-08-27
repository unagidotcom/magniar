import React from 'react';
import { ProjectRequestFormData } from '../../types/startProject';
import { CheckCircle2, ArrowRight, BookOpen, Clock, Copy, Check } from 'lucide-react';

interface SubmissionSuccessStepProps {
  formData: ProjectRequestFormData;
  requestId: string;
  onReturnHome: () => void;
  onExploreInsights: () => void;
  onResetForm: () => void;
}

export const SubmissionSuccessStep: React.FC<SubmissionSuccessStepProps> = ({
  formData,
  requestId,
  onReturnHome,
  onExploreInsights,
  onResetForm,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-fadeIn max-w-3xl mx-auto py-6">
      {/* Top Success Icon & Badge */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#B89A72]/10 border border-[#B89A72] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(184,154,114,0.3)]">
          <CheckCircle2 className="w-8 h-8 text-[#B89A72]" />
        </div>

        <div className="space-y-2">
          <span className="font-sans text-xs font-semibold text-[#B89A72] tracking-wider uppercase">
            Consultation Request Submitted
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We have received your brief.
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-lg mx-auto leading-relaxed">
            Your inquiry has been routed to Magniar's growth partners. We will review your context and reach out directly with next steps.
          </p>
        </div>
      </div>

      {/* REQUEST REFERENCE CARD */}
      <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <span className="font-sans text-xs text-slate-400 font-medium block">
            Reference Request ID
          </span>
          <span className="font-mono text-2xl font-bold text-[#B89A72] tracking-widest">
            {requestId}
          </span>
          <p className="font-sans text-xs text-slate-400">
            Recorded for {formData.companyName || 'your company'} ({formData.email})
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyId}
          className="px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#B89A72]" />
              <span>Copy Reference ID</span>
            </>
          )}
        </button>
      </div>

      {/* WHAT HAPPENS NEXT SEQUENCE */}
      <div className="bg-[#080A0D] border border-white/10 p-6 sm:p-8 rounded-xl space-y-6 shadow-xl">
        <div className="flex items-center gap-2 font-heading text-lg font-bold text-white border-b border-white/10 pb-4">
          <Clock className="w-5 h-5 text-[#B89A72]" />
          <span>What happens next</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm">
          {/* 01 */}
          <div className="p-5 rounded-lg bg-[#050505] border border-white/10 space-y-1.5">
            <span className="text-[#B89A72] font-bold text-xs block">Step 01 / Strategic Review</span>
            <h4 className="font-bold text-white">Internal Partner Evaluation</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Our growth leads evaluate your market category, current tech stack, and goals to determine team fit.
            </p>
          </div>

          {/* 02 */}
          <div className="p-5 rounded-lg bg-[#050505] border border-white/10 space-y-1.5">
            <span className="text-[#B89A72] font-bold text-xs block">Step 02 / Direct Contact</span>
            <h4 className="font-bold text-white">Email Consultation Sync</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              We connect directly via email within 24 hours to clarify any specific questions or request context.
            </p>
          </div>

          {/* 03 */}
          <div className="p-5 rounded-lg bg-[#050505] border border-white/10 space-y-1.5">
            <span className="text-[#B89A72] font-bold text-xs block">Step 03 / Discovery Session</span>
            <h4 className="font-bold text-white">Partner Working Session</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              If there is a mutual fit, we host a 30-minute discovery call to map growth levers and constraints.
            </p>
          </div>

          {/* 04 */}
          <div className="p-5 rounded-lg bg-[#050505] border border-white/10 space-y-1.5">
            <span className="text-[#B89A72] font-bold text-xs block">Step 04 / Tailored Proposal</span>
            <h4 className="font-bold text-white">Growth Roadmap & Scope</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              We present a tailored engagement roadmap, team structure, and recommended milestones.
            </p>
          </div>
        </div>
      </div>

      {/* CTA ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onReturnHome}
          className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#B89A72] hover:bg-[#8F714D] text-white font-sans text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(184,154,114,0.35)]"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onExploreInsights}
          className="w-full sm:w-auto px-6 py-4 rounded-lg border border-white/15 bg-[#080A0D] hover:bg-white/10 text-white font-sans text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#B89A72]" />
          <span>Explore Insights</span>
        </button>

        <button
          type="button"
          onClick={onResetForm}
          className="w-full sm:w-auto px-4 py-4 text-xs font-sans text-slate-400 hover:text-white transition-colors cursor-pointer text-center"
        >
          Submit another request
        </button>
      </div>
    </div>
  );
};
