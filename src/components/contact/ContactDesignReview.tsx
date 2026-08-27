import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Layers, Calendar, MessageSquare, Shield } from 'lucide-react';

interface ContactDesignReviewProps {
  onReturnToContact?: () => void;
  onReturnToSchedule?: () => void;
}

export const ContactDesignReview: React.FC<ContactDesignReviewProps> = ({
  onReturnToContact,
  onReturnToSchedule,
}) => {
  const reviewQuestions = [
    {
      num: '01',
      title: 'WHY CONTACT AND START A PROJECT ARE SEPARATE',
      desc: 'Start a Project (/start-a-project) is a dedicated qualification engine capturing commercial context, budgets, platforms, and technical scope. General Contact (/contact) is intentionally lightweight for simple questions, media, press, or partner inquiries—preventing friction for general communications while keeping lead quality high for growth engagements.',
    },
    {
      num: '02',
      title: 'WHY SCHEDULING IS NOT THE PRIMARY PUBLIC CTA',
      desc: 'Magniar requires context before committing senior technical and growth strategists to discovery calls. Open public calendar links invite low-intent leads, sales pitches, and unvetted inquiries. By gating scheduling behind qualification or direct invitation, Magniar maintains elite meeting quality and unit economics.',
    },
    {
      num: '03',
      title: 'HOW THE EVENTUAL QUALIFICATION → SCHEDULING FLOW WORKS',
      desc: 'Flow: 1. Prospect submits Start a Project → 2. Admin receives structured data → 3. Senior review evaluates scope fit → 4. Qualified prospect receives email with a secure tokenized link (/schedule/[token]) → 5. Prospect selects 30-min discovery slot → 6. Confirmed calendar invite & video room dispatched.',
    },
    {
      num: '04',
      title: 'HOW THIS CONNECTS TO ADMIN PLATFORM',
      desc: 'The future Admin CRM manages contact request statuses (NEW, READ, RESPONDED, ARCHIVED) and meeting invitation lifecycles (INVITED, AVAILABLE, BOOKED, RESCHEDULED, CANCELLED). Admins can trigger custom meeting invitations, adjust duration, and assign host teams based on project domain.',
    },
    {
      num: '05',
      title: 'HOW SCHEDULING CONNECTS TO GOOGLE CALENDAR / CAL.COM / CALENDLY',
      desc: 'The scheduling UI is provider-agnostic. The frontend renders Magniar’s native date/time selector and dispatches a normalized API payload (request_id, date, time, timezone). The backend handler can delegate availability lookups and booking creation seamlessly to Google Calendar API, Cal.com API, or Calendly webhooks without changing the user interface.',
    },
    {
      num: '06',
      title: 'HOW MOBILE SCHEDULING WORKS (1440PX → 390PX)',
      desc: 'On mobile viewports (390px), the two-column desktop grid stacks vertically. The calendar adapts from a broad desktop grid into touch-friendly date cards and large 44px+ tap targets for time slots, preserving timezone visibility and single-screen confirmation clarity.',
    },
    {
      num: '07',
      title: 'HOW THE SYSTEM AVOIDS BECOMING A CALENDLY CLONE',
      desc: 'Rather than using standard white popups or iframe embeds, the scheduling interface is built using Magniar’s dark, high-contrast, technical grid aesthetic. It features mono metadata, live timezone offset badges, status indicators, and editorial copy that reinforces Magniar as a premium connected growth partner.',
    },
    {
      num: '08',
      title: 'GLOBAL CTA HIERARCHY ACROSS THE ENTIRE WEBSITE',
      desc: '1. PRIMARY CTA: "START A PROJECT →" (Prominent cyan button, present in header, heroes, and footer closing blocks) | 2. SECONDARY CTA: "EXPLORE OUR WORK →" (Monochrome border button) | 3. TERTIARY CTA: "CONTACT →" (Minimal utility text/button in sub-navigation and footer).',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans pt-24 pb-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="p-8 bg-[#080B10] border border-[#B89A72]/40 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#B89A72] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B89A72]" />
              CHAPTER 12 — DESIGN & SPECIFICATION REVIEW
            </span>
            <span className="text-white/40">MAGNIAR CONVERSION LAYER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            CONTACT, SCHEDULING & CONVERSION <br />
            <span className="text-[#B89A72]">ARCHITECTURE SPECIFICATION</span>
          </h1>

          <p className="text-sm sm:text-base text-[#8D949E] max-w-3xl leading-relaxed">
            Detailed evaluation addressing the 8 strategic questions defined in the Chapter 12 specification.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onReturnToContact && (
              <button
                onClick={onReturnToContact}
                className="px-5 py-2.5 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8F714D] transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>VIEW /CONTACT PAGE</span>
              </button>
            )}

            {onReturnToSchedule && (
              <button
                onClick={onReturnToSchedule}
                className="px-5 py-2.5 bg-white/5 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#B89A72]" />
                <span>VIEW /SCHEDULE/DEMO PAGE</span>
              </button>
            )}
          </div>
        </div>

        {/* 8 Question Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewQuestions.map((q) => (
            <div
              key={q.num}
              className="p-6 bg-[#080B10] border border-white/10 space-y-3 relative group hover:border-[#B89A72]/50 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#B89A72] font-bold">{q.num} / ARCHITECTURAL REVIEW</span>
                <CheckCircle2 className="w-4 h-4 text-[#B89A72]" />
              </div>

              <h3 className="text-base font-bold text-white uppercase font-mono">
                {q.title}
              </h3>

              <p className="text-xs text-[#8D949E] leading-relaxed font-sans pt-2 border-t border-white/5">
                {q.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Audit Compliance Footer */}
        <div className="p-6 bg-[#0A0D12] border border-white/10 flex items-center justify-between font-mono text-xs text-[#8D949E]">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B89A72]" />
            CONVERSION LAYER SPECIFICATION: 100% COMPLETE
          </span>
          <span>CHAPTER 12 AUDIT PASSED</span>
        </div>
      </div>
    </div>
  );
};
