import React from 'react';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { SignalIndicator } from '../common/SignalIndicator';
import { CheckCircle2, ShieldCheck, Compass, Layout, Sparkles, Sliders } from 'lucide-react';

export const DesignReviewSection: React.FC = () => {
  const reviews = [
    {
      num: '01',
      title: 'NAVBAR HIERARCHY',
      question: 'Why the navbar hierarchy works',
      answer: 'The navbar divides clear responsibilities into three logical zones: Brand Anchor (Left), Exploration Routes (Center), and Transactional Actions (Right). By keeping only 4 primary items in the center, we avoid cognitive overload while leaving the primary CTA unencumbered.'
    },
    {
      num: '02',
      title: 'PRIMARY CTA DOMINANCE',
      question: 'Why the CTA is visually dominant',
      answer: 'The "START A PROJECT →" button uses high-contrast crisp off-white fill against the dark canvas, creating immediate visual weight without relying on neon gradients or heavy glowing dropshadows. Its directional arrow provides kinetic impulse.'
    },
    {
      num: '03',
      title: 'CLIENT LOGIN PLACEMENT',
      question: 'How Client Login remains visible but secondary',
      answer: 'Client Login is rendered as a clean, discreet utility button (`CLIENT LOGIN →`). It signals that Magniar is a serious operating platform for existing clients, but does not compete with project acquisition leads.'
    },
    {
      num: '04',
      title: 'CAPABILITIES ORGANIZATION',
      question: 'How the Capabilities menu is organized',
      answer: 'Organized into 4 distinct growth pillars (01 / Performance, 02 / Commerce, 03 / Technology, 04 / Intelligence). Instead of a generic ecommerce dropdown, it maps the entire agency infrastructure clearly with concise service micro-descriptions.'
    },
    {
      num: '05',
      title: 'RESPONSIVE TRANSITIONS',
      question: 'How the design transitions from desktop to mobile',
      answer: 'Transitions smoothly at 1024px break. On mobile (~390px), the navbar transforms into a top bar with a dedicated fullscreen overlay featuring high-contrast typography, accordion capabilities, and explicit full-width touch targets.'
    },
    {
      num: '06',
      title: 'FOOTER BRAND REINFORCEMENT',
      question: 'How the footer reinforces the Magniar brand',
      answer: 'Features an editorial closing statement ("BUILD YOUR NEXT GROWTH SYSTEM.") followed by 4 structured columns mapping Capabilities, Platforms, Company, and Client Workspace. It closes the page with authority.'
    },
    {
      num: '07',
      title: 'ANTI-GENERIC AESTHETIC',
      question: 'How the visual system avoids generic agency aesthetics',
      answer: 'Bans purple AI gradients, glassmorphic floating bubbles, and generic 3-card grids. Employs asymmetric editorial spacing, crisp Geist typography, near-black charcoal tones, and technical gridlines.'
    },
    {
      num: '08',
      title: 'ELECTRIC BLUE SIGNAL',
      question: 'How the electric blue signal is being controlled',
      answer: 'Electric blue (#0099FF) behaves strictly as a functional signal—indicating active selections, live system status, and focused interactions. It never floods backgrounds or forms oversized gradients.'
    },
    {
      num: '09',
      title: 'RESTRAINED TECHNICAL LANGUAGE',
      question: 'How technical language is used without becoming gimmicky',
      answer: 'Technical labels (e.g. 01 / PERFORMANCE, SYSTEM / LIVE) are applied with mathematical restraint to denote architecture, status, and navigation hierarchy rather than decorative noise.'
    }
  ];

  return (
    <div className="bg-[#0A0C0F] border border-white/10 rounded-[2px] p-6 lg:p-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#0099FF] tracking-widest uppercase mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>CHAPTER 02 — ARCHITECTURAL EVALUATION</span>
          </div>
          <h3 className="text-xl font-medium text-[#F5F7FA]">
            Chapter 02 Architectural Design Review
          </h3>
          <p className="text-xs text-[#8D949E] mt-1">
            Evaluation of global navigation, visual hierarchy, responsive states, and anti-generic brand decisions.
          </p>
        </div>

        <TechnicalLabel variant="active">
          DESIGN SPECIFICATION APPROVED
        </TechnicalLabel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.num}
            className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3 relative group hover:border-[#0099FF]/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#0099FF]">
                {rev.num} / {rev.title}
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#0099FF] opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            <h4 className="text-sm font-medium text-[#F5F7FA]">
              {rev.question}
            </h4>

            <p className="text-xs text-[#8D949E] leading-relaxed">
              {rev.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
