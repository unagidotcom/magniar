import React from 'react';
import { TechnicalLabel } from './TechnicalLabel';
import { ShieldCheck, Lock } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#030508] text-[#F5F7FA] border-t border-white/10 relative">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <TechnicalLabel text="CLIENT TRUST & CONFIDENTIALITY" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
              AUTHENTICITY COMMITMENT
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
            CONFIDENTIALITY & <span className="text-[#0099FF]">AUTHENTICITY.</span>
          </h2>
        </div>

        {/* Clean Honest Placeholder Card (No Fake Testimonials) */}
        <div className="p-8 sm:p-12 bg-[#080B10] border border-white/10 rounded-[2px] max-w-4xl space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 font-sans text-xs">
            <div className="flex items-center gap-2 text-[#0099FF] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
              <span>STRICT AUTHENTICITY GUARANTEE</span>
            </div>
            <span className="text-slate-400 font-medium hidden sm:inline">VERIFIED PARTICIPATION ONLY</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
              VERIFIED CLIENT ENDORSEMENTS
            </h3>
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl font-sans font-normal">
              We adhere strictly to non-disclosure agreements and client confidentiality. Public endorsements, verified client quotes, and executive video interviews are published selectively as NDA waivers are approved.
            </p>
          </div>

          <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] flex items-center gap-3 font-sans text-xs text-slate-300">
            <Lock className="w-4 h-4 text-[#0099FF] shrink-0" />
            <span>Full case study metrics and strategy reviews are shared during discovery calls under mutual NDA.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

