import React from 'react';
import { TechnicalLabel } from './TechnicalLabel';
import { MagniarButton } from './MagniarButton';
import { MessageSquare, Send } from 'lucide-react';

interface CTASectionProps {
  onStartProject?: () => void;
  onBookConversation?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onStartProject,
  onBookConversation,
}) => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#07090D] text-[#F5F7FA] border-t border-white/10 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <TechnicalLabel text="INITIATE ENGAGEMENT" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
              START A CONVERSATION
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            Ready to build <br />
            <span className="text-[#0099FF]">what's next?</span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Tell us where the business is today, where you want it to go, and what needs to change.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <MagniarButton
            variant="primary"
            size="xl"
            onClick={onStartProject}
            rightIcon={<Send className="w-4 h-4" />}
          >
            START A PROJECT
          </MagniarButton>

          <MagniarButton
            variant="secondary"
            size="xl"
            onClick={onBookConversation || onStartProject}
            rightIcon={<MessageSquare className="w-4 h-4" />}
          >
            BOOK A CONVERSATION
          </MagniarButton>
        </div>
      </div>
    </section>
  );
};
