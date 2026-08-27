import React from 'react';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { MagniarButton } from '../common/MagniarButton';
import { FileText, Shield } from 'lucide-react';

interface TermsPageProps {
  onReturnHome?: () => void;
  onContact?: () => void;
  onStartProject?: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onReturnHome,
  onContact,
  onStartProject,
}) => {
  return (
    <div className="bg-[#050505] text-[#F5F7FA] font-sans min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-12 space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <TechnicalLabel>LEGAL / SPECIFICATION</TechnicalLabel>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-medium">
              LAST UPDATED: 2026
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            TERMS OF SERVICE
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed font-normal">
            By accessing or using the website and agency services operated by Magniar, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </div>

        {/* Notice Badge */}
        <div className="p-5 bg-[#0A0D12] border border-white/10 rounded-[2px] flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#B89A72] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed font-sans">
            <span className="text-white font-heading uppercase font-bold block mb-0.5">
              SERVICE AGREEMENT TERMS
            </span>
            Specific scope of work (SOW), performance metrics, media budget approvals, and billing milestones are defined in formal client contracts executed separately prior to campaign launch.
          </div>
        </div>

        {/* Terms Content Sections */}
        <div className="space-y-8 font-normal text-base leading-relaxed text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-heading text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#B89A72]">01 /</span> USE OF WEBSITE & INTELLECTUAL PROPERTY
            </h2>
            <p>
              All materials on this website, including proprietary marketing frameworks, visual designs, case studies, code, and trade branding, are the intellectual property of Magniar. Unauthorised copying, scraping, or reproduction is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#B89A72]">02 /</span> AGENCY ENGAGEMENTS
            </h2>
            <p>
              Magniar provides marketing, web development, e-commerce, and AI strategy services under structured retainer or project-based agreements. Advice and estimations presented on this site are illustrative and do not constitute a binding guarantee of specific commercial performance without formal contractual execution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#B89A72]">03 /</span> LIMITATION OF LIABILITY
            </h2>
            <p>
              Magniar shall not be held liable for indirect, incidental, or consequential damages arising from website unavailability, third-party platform downtime (e.g., ad platform or e-commerce host outages), or unverified external decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#B89A72]">04 /</span> GOVERNING LAW
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws without regard to conflict of law principles.
            </p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
          <button
            onClick={onReturnHome}
            className="text-xs font-sans font-semibold text-slate-300 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
          >
            ← BACK TO HOMEPAGE
          </button>

          <div className="flex gap-3">
            <MagniarButton variant="secondary" size="md" onClick={onContact}>
              CONTACT MAGNIAR
            </MagniarButton>
            <MagniarButton variant="primary" size="md" onClick={onStartProject}>
              START A PROJECT
            </MagniarButton>
          </div>
        </div>
      </div>
    </div>
  );
};
