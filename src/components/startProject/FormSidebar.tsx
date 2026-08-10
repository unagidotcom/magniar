import React from 'react';
import { ShieldCheck, Clock, CheckCircle2, Lock } from 'lucide-react';

interface FormSidebarProps {
  currentStep: number;
}

export const FormSidebar: React.FC<FormSidebarProps> = ({ currentStep }) => {
  return (
    <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-5">
      {/* WHAT HAPPENS NEXT PANEL */}
      <div className="bg-[#080A0D] border border-white/10 p-6 rounded-xl space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5 font-sans text-sm font-bold text-white tracking-wide">
            <Clock className="w-4 h-4 text-[#0099FF]" />
            <span>Consultation Process</span>
          </div>
          <span className="font-sans text-[11px] font-semibold text-[#0099FF] bg-[#0099FF]/10 px-2.5 py-1 rounded-full border border-[#0099FF]/25">
            4-Step Guide
          </span>
        </div>

        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          Every inquiry is personally reviewed by a Magniar partner. Here is how we evaluate fit and build custom growth solutions:
        </p>

        {/* 4-Step Sequence List */}
        <div className="space-y-3 font-sans text-xs">
          {/* Step 01 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="font-bold text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded text-xs flex-shrink-0">
              01
            </span>
            <div className="space-y-0.5">
              <h4 className="font-semibold text-white text-xs sm:text-sm">Context & Model Review</h4>
              <p className="text-slate-400 text-xs leading-normal">
                We analyze your business model, current channels, and category positioning.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="font-bold text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded text-xs flex-shrink-0">
              02
            </span>
            <div className="space-y-0.5">
              <h4 className="font-semibold text-white text-xs sm:text-sm">Direct Partner Outreach</h4>
              <p className="text-slate-400 text-xs leading-normal">
                We reach out directly to clarify objectives or request account benchmarks.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="font-bold text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded text-xs flex-shrink-0">
              03
            </span>
            <div className="space-y-0.5">
              <h4 className="font-semibold text-white text-xs sm:text-sm">Strategic Discovery Call</h4>
              <p className="text-slate-400 text-xs leading-normal">
                An executive deep dive into your unit economics, tech stack, and growth levers.
              </p>
            </div>
          </div>

          {/* Step 04 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="font-bold text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded text-xs flex-shrink-0">
              04
            </span>
            <div className="space-y-0.5">
              <h4 className="font-semibold text-white text-xs sm:text-sm">Growth Proposal</h4>
              <p className="text-slate-400 text-xs leading-normal">
                A custom proposal detailing team scope, execution timeline, and expected ROI.
              </p>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs font-sans text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-[#0099FF] flex-shrink-0" />
          <span>No automated sales pitch. Direct partner attention.</span>
        </div>
      </div>

      {/* PRIVACY & DATA SECURITY CARD */}
      <div className="bg-[#080A0D] border border-white/10 p-5 rounded-xl space-y-2.5 font-sans text-xs">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Lock className="w-4 h-4 text-[#0099FF]" />
          <span>Data Privacy & Confidentiality</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-xs">
          Your metrics, brand data, and strategy details are held strictly confidential and never shared with third parties.
        </p>
      </div>
    </aside>
  );
};

