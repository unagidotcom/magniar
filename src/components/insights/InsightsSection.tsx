import React from 'react';
import { INSIGHTS_ARTICLES_DATA } from '../../data/insightsData';
import { FeaturedInsight } from './FeaturedInsight';
import { InsightCard } from './InsightCard';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { ArrowRight, BookOpen } from 'lucide-react';
import { MagniarButton } from '../common/MagniarButton';

interface InsightsSectionProps {
  onExploreFullInsights: () => void;
  onSelectArticle: (slug: string) => void;
}

export function InsightsSection({
  onExploreFullInsights,
  onSelectArticle,
}: InsightsSectionProps) {
  const featuredArticle = INSIGHTS_ARTICLES_DATA.find((a) => a.featured) || INSIGHTS_ARTICLES_DATA[0];
  const secondaryArticles = INSIGHTS_ARTICLES_DATA.filter((a) => a.id !== featuredArticle.id).slice(0, 3);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#050505] text-[#F5F7FA] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <TechnicalLabel text="STRATEGIC INSIGHTS" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
              <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
                MAGNIAR INTELLIGENCE
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Magniar intelligence. <br />
              <span className="text-[#0099FF]">What we're thinking about.</span>
            </h2>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              Practical thinking on growth, marketing, commerce, technology and AI — connected through systems engineering and real-world execution.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <MagniarButton variant="primary" size="lg" onClick={onExploreFullInsights}>
              EXPLORE ALL INSIGHTS →
            </MagniarButton>
          </div>
        </div>

        {/* Featured Article Block */}
        <FeaturedInsight
          article={featuredArticle}
          onSelect={onSelectArticle}
        />

        {/* Secondary Pieces (3 Editorial Rows / Cards) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between font-sans text-xs text-slate-300 border-b border-white/10 pb-3">
            <span className="text-white font-heading font-bold uppercase tracking-wider flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-[#0099FF]" />
              RECENT EDITORIAL DISPATCHES
            </span>
            <span className="text-slate-400 font-medium">SHOWING 3 OF {INSIGHTS_ARTICLES_DATA.length} ARTICLES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryArticles.map((art) => (
              <InsightCard
                key={art.id}
                article={art}
                onSelect={onSelectArticle}
                layoutMode="card"
              />
            ))}
          </div>
        </div>

        {/* Bottom Section Link */}
        <div className="pt-4 text-center">
          <button
            onClick={onExploreFullInsights}
            className="inline-flex items-center gap-2 font-sans text-xs text-[#0099FF] hover:text-white transition-colors cursor-pointer tracking-wider uppercase font-semibold border-b border-[#0099FF]/40 pb-1"
          >
            <span>EXPLORE MAGNIAR INTELLIGENCE INDEX →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
