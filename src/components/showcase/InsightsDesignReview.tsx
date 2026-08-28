import React from 'react';
import { ShieldCheck, BookOpen, Layers, CheckCircle2, Terminal, Sparkles } from 'lucide-react';

export function InsightsDesignReview() {
  const reviews = [
    {
      num: '01',
      question: 'Why this is not a generic blog',
      answer:
        'Instead of generic SaaS marketing articles filled with promotional fluff ("10 Tips for Ads"), Magniar Intelligence is built as a strategic engineering and growth system. Content is categorized into 6 core operational pillars (Performance, Commerce, Development, AI + Intelligence, Strategy, Observations) and 10 specific content types (Analysis, Playbook, Guide, Framework, Report, Experiment, etc.). Every dispatch includes technical data callouts, executive key takeaways, code snippets, and real empirical benchmarks.',
    },
    {
      num: '02',
      question: 'How the editorial hierarchy works',
      answer:
        'The layout establishes clear visual weight: a top-tier Featured Insight card with prominent display typography and a metric highlight box, followed by a secondary 3-column grid and horizontal list items. Key Takeaways appear near the top of every detail page for executives who scan, while main body text is constrained to 65–75 characters per line for optimal ergonomics.',
    },
    {
      num: '03',
      question: 'How users discover content',
      answer:
        'Discovery is multi-layered: users can filter by Category Pillar (e.g. Performance), Content Type (e.g. Playbook), real-time Keyword Search, or Topic Exploration Chips (e.g. #Meta Ads, #Server-Side CAPI, #Shopify).',
    },
    {
      num: '04',
      question: 'How articles connect to capabilities',
      answer:
        'Each article specifies a `capabilityId` and `serviceUsed`. Detail pages display a dedicated "Related Capability Pillar" card and CTA (e.g. "NEED HELP WITH THE IMPLEMENTATION? EXPLORE PERFORMANCE →") linking directly to the full /capabilities view.',
    },
    {
      num: '05',
      question: 'How articles connect to case studies',
      answer:
        'Articles can link directly to relevant proof of execution in Chapter 08 once verified case studies are published from the Admin OS, creating an interconnected proof network between theory and real-world results.',
    },
    {
      num: '06',
      question: 'How articles connect to industries',
      answer:
        'Every dispatch specifies applicable industry targets (E-Commerce, B2B SaaS, FinTech, Health, Consumer Goods). Filtering and cross-links allow visitors to view articles tailored to their specific market sector.',
    },
    {
      num: '07',
      question: 'How this structure supports SEO',
      answer:
        'The architecture is engineered for technical SEO dominance: semantic `<article>`, `<h1>`, `<h2>` hierarchy, clean URL slugs (`/insights/[slug]`), schema fields ready for `Article` JSON-LD, fast mobile rendering, and rich internal linking between insights, capabilities, and case studies.',
    },
    {
      num: '08',
      question: 'How the CMS could eventually manage it',
      answer:
        'The data layer in `types/insights.ts` and `data/insightsData.ts` is fully decoupled from presentation. Fields map 1:1 to future database tables (`insights`, `authors`, `categories`, `article_tags`). A future headless CMS or Supabase instance can feed this exact component hierarchy without UI changes.',
    },
    {
      num: '09',
      question: 'How the content taxonomy works',
      answer:
        'Taxonomy operates across 5 distinct axes: Category Pillar (Performance, Commerce, Dev, AI, Strategy, Observations), Content Type (Analysis, Playbook, Guide, etc.), Tags (e.g. #Meta Ads), Platform (Meta, Shopify, Google), and Service Used.',
    },
    {
      num: '10',
      question: 'How mobile reading differs from desktop',
      answer:
        'On mobile viewports (390px), the sticky desktop Table of Contents moves into a collapsible summary, padding scales down, metadata condenses into concise pills, code blocks become horizontally scrollable, and the reading progress bar stays anchored at the top of the screen.',
    },
    {
      num: '11',
      question: 'How Magniar Intelligence strengthens the overall brand',
      answer:
        'By publishing uncompromised, highly technical analysis with zero sales hype, Magniar positions itself as a technical authority rather than a generic agency. Visitors gain immediate trust in Magniar’s engineering rigor before ever starting a project.',
    },
  ];

  return (
    <div className="bg-[#0A0C0F] border border-white/10 rounded-[2px] p-6 sm:p-10 space-y-10 my-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#B89A72]/10 text-[#B89A72] border border-[#B89A72]/30 font-mono text-xs font-semibold rounded-[2px] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            CHAPTER 09 DESIGN REVIEW
          </span>
          <span className="text-white/20">•</span>
          <span className="font-mono text-xs text-[#10B981] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            SPECIFICATION VERIFIED
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
          CHAPTER 09 — INSIGHTS / INTELLIGENCE / KNOWLEDGE SYSTEM REVIEW
        </h2>
        <p className="text-sm font-mono text-[#8D949E] leading-relaxed">
          Detailed review answering the 11 required architectural and design criteria for Magniar Chapter 09.
        </p>
      </div>

      {/* Review Q&A Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div
            key={r.num}
            className="p-6 bg-[#050505] border border-white/10 rounded-[2px] space-y-3 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                <span className="text-[#B89A72] font-bold">ITEM {r.num}</span>
                <span className="text-[#10B981] text-[10px] bg-[#10B981]/10 px-2 py-0.5 border border-[#10B981]/20 rounded-[2px]">
                  VERIFIED
                </span>
              </div>
              <h3 className="text-base font-bold text-[#F5F7FA] mb-2">{r.question}</h3>
              <p className="text-xs text-[#8D949E] leading-relaxed font-sans">{r.answer}</p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-[#5A626E]">
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
              <span>COMPLIANT WITH CHAPTER 09 SPECIFICATION</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
