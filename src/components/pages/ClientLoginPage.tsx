import React from 'react';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { MagniarButton } from '../common/MagniarButton';
import { Lock, Clock, ShieldAlert, ArrowLeft } from 'lucide-react';

interface ClientLoginPageProps {
  onReturnHome?: () => void;
  onStartProject?: () => void;
  onContact?: () => void;
}

export const ClientLoginPage: React.FC<ClientLoginPageProps> = ({
  onReturnHome,
  onStartProject,
  onContact,
}) => {
  return (
    <div className="bg-[#050505] text-[#F5F7FA] font-sans min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-xl w-full bg-[#080B10] border border-white/10 p-8 sm:p-12 rounded-[2px] space-y-8 relative overflow-hidden shadow-2xl">
        {/* Decorative Grid Light */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#0099FF]" />
              <TechnicalLabel>CLIENT WORKSPACE / ACCESS</TechnicalLabel>
            </div>
            <span className="font-sans text-xs text-[#0099FF] bg-[#0099FF]/10 px-2.5 py-0.5 border border-[#0099FF]/30 rounded-[2px] font-semibold uppercase">
              CLOSED PREVIEW
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              CLIENT ACCESS
            </h1>
            <p className="text-lg text-[#0099FF] font-sans font-semibold">
              Client portal coming soon.
            </p>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              The Magniar Client Portal is currently undergoing private provisioning. Active client accounts, live campaign reports, and real-time deliverables are managed directly with your dedicated lead strategist.
            </p>
          </div>

          {/* Info Card */}
          <div className="p-5 bg-[#030508] border border-white/10 rounded-[2px] space-y-2 font-sans text-xs text-slate-300">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Clock className="w-4 h-4 text-[#0099FF]" />
              <span>ACTIVE CLIENT SUPPORT</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              If you are an active client needing immediate strategy updates, campaign changes, or billing statements, please reach out directly to your account executive or submit a note via contact.
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between">
            <button
              onClick={onReturnHome}
              className="px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#0099FF]" />
              <span>RETURN HOME</span>
            </button>

            <div className="flex gap-2">
              <MagniarButton variant="secondary" size="md" onClick={onContact}>
                CONTACT US
              </MagniarButton>
              <MagniarButton variant="primary" size="md" onClick={onStartProject}>
                START A PROJECT
              </MagniarButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
