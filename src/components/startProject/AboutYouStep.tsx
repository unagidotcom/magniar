import React from 'react';
import { ProjectRequestFormData, FormValidationErrors } from '../../types/startProject';
import { ROLE_OPTIONS } from '../../data/startProjectData';
import { ArrowRight, User, Mail, Phone, Globe, Shield, ChevronLeft } from 'lucide-react';

interface AboutYouStepProps {
  formData: ProjectRequestFormData;
  errors: FormValidationErrors;
  onChange: (fields: Partial<ProjectRequestFormData>) => void;
  onNext: () => void;
  onBack?: () => void;
}

export const AboutYouStep: React.FC<AboutYouStepProps> = ({
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
          <User className="w-4 h-4" />
          <span>Step 02 / 08 — Contact Information</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Who will we be working with?
        </h2>
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
          Provide your direct work contact details. We use this exclusively to communicate about your strategic discovery request.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6 bg-[#080A0D] border border-white/10 p-6 sm:p-8 rounded-xl shadow-xl">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200">
              First Name <span className="text-[#B89A72]">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              placeholder="e.g. Alexandra"
              className={`w-full px-4 py-3.5 bg-[#050505] border rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#B89A72] focus:ring-1 focus:ring-[#B89A72] transition-all ${
                errors.firstName ? 'border-red-500/80 bg-red-950/20' : 'border-white/15'
              }`}
            />
            {errors.firstName && (
              <p className="font-sans text-xs text-red-400 font-medium pt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200">
              Last Name <span className="text-[#B89A72]">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              placeholder="e.g. Vance"
              className={`w-full px-4 py-3.5 bg-[#050505] border rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#B89A72] focus:ring-1 focus:ring-[#B89A72] transition-all ${
                errors.lastName ? 'border-red-500/80 bg-red-950/20' : 'border-white/15'
              }`}
            />
            {errors.lastName && (
              <p className="font-sans text-xs text-red-400 font-medium pt-1">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200 flex items-center justify-between">
              <span>
                Work Email <span className="text-[#B89A72]">*</span>
              </span>
              <Mail className="w-4 h-4 text-slate-400" />
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="alexandra@company.com"
              className={`w-full px-4 py-3.5 bg-[#050505] border rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#B89A72] focus:ring-1 focus:ring-[#B89A72] transition-all ${
                errors.email ? 'border-red-500/80 bg-red-950/20' : 'border-white/15'
              }`}
            />
            {errors.email ? (
              <p className="font-sans text-xs text-red-400 font-medium pt-1">
                {errors.email}
              </p>
            ) : (
              <p className="font-sans text-xs text-slate-400">
                Please use your official company work email address.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200 flex items-center justify-between">
              <span>Direct Phone (Optional)</span>
              <Phone className="w-4 h-4 text-slate-400" />
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3.5 bg-[#050505] border border-white/15 rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#B89A72] focus:ring-1 focus:ring-[#B89A72] transition-all"
            />
            <p className="font-sans text-xs text-slate-400">
              Optional. Helpful for scheduling quick context syncs.
            </p>
          </div>
        </div>

        {/* Country & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200 flex items-center justify-between">
              <span>
                Country / Primary Region <span className="text-[#B89A72]">*</span>
              </span>
              <Globe className="w-4 h-4 text-slate-400" />
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => onChange({ country: e.target.value })}
              placeholder="e.g. United States, United Kingdom, Singapore"
              className="w-full px-4 py-3.5 bg-[#050505] border border-white/15 rounded-lg font-sans text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#B89A72] focus:ring-1 focus:ring-[#B89A72] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-sans text-sm font-semibold text-slate-200">
              Your Role in the Organization <span className="text-[#B89A72]">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => onChange({ role: e.target.value })}
              className="w-full px-4 py-3.5 bg-[#050505] border border-white/15 rounded-lg font-sans text-base text-white focus:outline-none focus:border-[#B89A72] focus:ring-1 focus:ring-[#B89A72] transition-all cursor-pointer"
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r} className="bg-[#080A0D] text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Security Privacy Reassurance */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3 font-sans text-xs sm:text-sm text-slate-300">
        <Shield className="w-4 h-4 text-[#B89A72] flex-shrink-0" />
        <span>Your contact details are strictly confidential and will never be shared or used for unsolicited marketing.</span>
      </div>

      {/* Navigation Actions */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3.5 rounded-lg border border-white/15 bg-[#080A0D] hover:bg-white/10 text-slate-300 hover:text-white font-sans text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-4 rounded-lg bg-[#B89A72] hover:bg-[#8F714D] text-white font-sans text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(184,154,114,0.35)] hover:shadow-[0_0_30px_rgba(184,154,114,0.5)]"
        >
          <span>Continue to Company Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
