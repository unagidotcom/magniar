import React from 'react';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { MagniarButton } from '../common/MagniarButton';
import { ShieldCheck, Lock, FileText, ArrowRight } from 'lucide-react';

interface PrivacyPageProps {
  onReturnHome?: () => void;
  onContact?: () => void;
  onStartProject?: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-medium">
              LAST UPDATED: 2026
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            PRIVACY POLICY
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed font-normal">
            Magniar ("Magniar", "we", "us", or "our") is committed to protecting your privacy and maintaining the confidentiality of information provided to us through our website and agency services.
          </p>
        </div>

        {/* Notice Badge */}
        <div className="p-5 bg-[#0A0D12] border border-[#0099FF]/30 rounded-[2px] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#0099FF] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed font-sans">
            <span className="text-white font-heading uppercase font-bold block mb-0.5">
              LEGAL NOTICE & DISCLOSURE
            </span>
            This privacy policy is presented for public informational purposes. Full client service agreements and NDA terms are executed separately during project onboarding.
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-8 font-normal text-base leading-relaxed text-slate-300">
          <section className="space-y-3">
            <h2 className="text-xl font-heading text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#0099FF]">01 /</span> INFORMATION WE COLLECT
            </h2>
            <p>
              When you interact with our website, submit a project inquiry, or engage our marketing and development services, we may collect the following categories of information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Contact data (name, work email, telephone, company name, website URL).</li>
              <li>Project scope data (marketing budgets, business model, timeline, channel goals).</li>
              <li>Technical usage data (IP address, browser type, referrer URLs, page interactions via analytics).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#0099FF]">02 /</span> HOW WE USE YOUR INFORMATION
            </h2>
            <p>
              Information collected is strictly utilized to evaluate prospective client fits, fulfill agency proposals, execute agreed client deliverables, and optimize website performance. We do not sell or rent personal or corporate data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#0099FF]">03 /</span> DATA SECURITY & PROTECTION
            </h2>
            <p>
              Magniar implements modern, technical, and administrative security measures to protect client details against unauthorized access, loss, or alteration. Access to client data is strictly restricted to authorized agency personnel.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading text-white font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-[#0099FF]">04 /</span> YOUR RIGHTS & INQUIRIES
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal contact data submitted through our public website.
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
