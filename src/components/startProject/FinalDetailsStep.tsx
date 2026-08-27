import React, { useState } from 'react';
import { ProjectRequestFormData } from '../../types/startProject';
import { REFERRAL_SOURCE_OPTIONS } from '../../data/startProjectData';
import { ArrowRight, FileUp, Paperclip, Check, MessageSquare, X, ChevronLeft } from 'lucide-react';

interface FinalDetailsStepProps {
  formData: ProjectRequestFormData;
  onChange: (fields: Partial<ProjectRequestFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FinalDetailsStep: React.FC<FinalDetailsStepProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleMockFileAdd = (fileName: string) => {
    onChange({ attachmentName: fileName });
  };

  const handleRemoveFile = () => {
    onChange({ attachmentName: '' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#B89A72] uppercase tracking-wider">
          <MessageSquare className="w-4 h-4" />
          <span>Step 07 / 08 — Final Context & Attachments</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Almost done — any additional details?
        </h2>
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Let us know how you heard about Magniar, and optionally attach an existing project brief, RFQ, or audit document.
        </p>
      </div>

      {/* Form Fields Container */}
      <div className="space-y-8 bg-[#080A0D] border border-white/10 p-6 sm:p-8 rounded-xl shadow-xl">
        {/* REFERRAL SOURCE */}
        <div className="space-y-3">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white">
            How did you hear about Magniar?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {REFERRAL_SOURCE_OPTIONS.map((src) => {
              const isSelected = formData.referralSource === src;

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => onChange({ referralSource: src })}
                  className={`px-4 py-3 rounded-lg border font-sans text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between font-medium ${
                    isSelected
                      ? 'bg-[#B89A72]/15 border-[#B89A72] text-white font-bold ring-1 ring-[#B89A72]'
                      : 'bg-[#050505] border-white/15 text-slate-300 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span>{src}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#B89A72]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ANYTHING ELSE WE SHOULD KNOW */}
        <div className="space-y-2.5">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white">
            Is there anything else we should know? (Optional)
          </label>
          <textarea
            rows={4}
            value={formData.anythingElse}
            onChange={(e) => onChange({ anythingElse: e.target.value })}
            placeholder="Share any key constraints, deadlines, technical stack details, or launch dates."
            className="w-full p-4 bg-[#050505] border border-white/15 rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#B89A72] focus:ring-1 focus:ring-[#B89A72] transition-all leading-relaxed"
          />
        </div>

        {/* MOCK FILE UPLOAD */}
        <div className="space-y-3">
          <label className="block font-sans text-sm sm:text-base font-semibold text-white flex items-center justify-between">
            <span>Attach relevant project brief or pitch deck (Optional)</span>
            <Paperclip className="w-4 h-4 text-slate-400" />
          </label>

          {formData.attachmentName ? (
            <div className="p-5 rounded-lg bg-[#050505] border border-[#B89A72]/50 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <FileUp className="w-6 h-6 text-[#B89A72]" />
                <div>
                  <p className="font-sans text-sm font-bold text-white">
                    {formData.attachmentName}
                  </p>
                  <p className="font-sans text-xs text-[#B89A72]">
                    Document attached and ready for partner review
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-2 text-slate-400 hover:text-white border border-white/15 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Remove attachment"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleMockFileAdd(e.dataTransfer.files[0].name);
                }
              }}
              className={`p-6 sm:p-8 rounded-xl border-2 border-dashed text-center transition-all ${
                dragActive
                  ? 'border-[#B89A72] bg-[#B89A72]/10'
                  : 'border-white/15 bg-[#050505] hover:border-white/30'
              }`}
            >
              <FileUp className="w-8 h-8 text-[#B89A72] mx-auto mb-3" />
              <p className="font-sans text-sm text-white font-bold mb-1">
                Drag and drop your brief or click below to attach
              </p>
              <p className="font-sans text-xs text-slate-400 mb-4">
                Accepts PDF, PPTX, DOCX, or ZIP (Max 25MB)
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMockFileAdd('magniar_project_brief_v1.pdf')}
                  className="px-3.5 py-1.5 rounded-md border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-sans text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  + Sample PDF Brief
                </button>
                <button
                  type="button"
                  onClick={() => handleMockFileAdd('growth_strategy_deck.pptx')}
                  className="px-3.5 py-1.5 rounded-md border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-sans text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  + Strategy Deck
                </button>
              </div>
            </div>
          )}
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
          <span>Review Project Brief</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
