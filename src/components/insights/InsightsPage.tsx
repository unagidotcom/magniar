import React, { useState, useMemo } from 'react';
import { INSIGHTS_ARTICLES_DATA } from '../../data/insightsData';
import { InsightFilterState, InsightArticle } from '../../types/insights';
import { FeaturedInsight } from './FeaturedInsight';
import { InsightCard } from './InsightCard';
import { InsightFilters } from './InsightFilters';
import { NewsletterSignup } from './NewsletterSignup';
import { Terminal, ShieldCheck, ArrowRight, Layers, RotateCcw, Sparkles, BookOpen } from 'lucide-react';

interface InsightsPageProps {
  onSelectArticle: (slug: string) => void;
  onStartProject: () => void;
  onExploreCapabilities: () => void;
}

const DEFAULT_FILTER_STATE: InsightFilterState = {
  category: 'all',
  contentType: 'all',
  searchQuery: '',
};

export function InsightsPage({
  onSelectArticle,
  onStartProject,
  onExploreCapabilities,
}: InsightsPageProps) {
  const [filterState, setFilterState] = useState<InsightFilterState>(DEFAULT_FILTER_STATE);

  const featuredArticle = useMemo(() => {
    return INSIGHTS_ARTICLES_DATA.find((a) => a.featured) || INSIGHTS_ARTICLES_DATA[0];
  }, []);

  const filteredArticles = useMemo(() => {
    return INSIGHTS_ARTICLES_DATA.filter((art) => {
      // Category Filter
      if (filterState.category !== 'all' && art.category !== filterState.category) {
        return false;
      }

      // Content Type Filter
      if (filterState.contentType !== 'all' && art.contentType !== filterState.contentType) {
        return false;
      }

      // Search Query Filter
      if (filterState.searchQuery.trim() !== '') {
        const query = filterState.searchQuery.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(query);
        const matchSubtitle = art.subtitle.toLowerCase().includes(query);
        const matchExcerpt = art.excerpt.toLowerCase().includes(query);
        const matchTags = art.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchTitle && !matchSubtitle && !matchExcerpt && !matchTags) {
          return false;
        }
      }

      return true;
    });
  }, [filterState]);

  const handleResetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Page Hero Header */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#B89A72]/10 border border-[#B89A72]/30 text-[#B89A72] text-xs font-mono font-semibold rounded-[2px] uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              MAGNIAR INTELLIGENCE & KNOWLEDGE SYSTEM
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F7FA]">
            MAGNIAR INTELLIGENCE. <br />
            <span className="text-[#8D949E] font-normal">THINKING ABOUT THE SYSTEMS BEHIND GROWTH.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#8D949E] max-w-3xl leading-relaxed">
            Performance marketing, commerce, development, AI, and growth strategy — connected through practical thinking, empirical observations, and engineering rigor.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#8D949E]">
            <span className="flex items-center gap-1.5 text-[#10B981]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              PROTOTYPE VERIFIED DATA SPECIFICATION
            </span>
            <span>•</span>
            <span>SHOWING {filteredArticles.length} OF {INSIGHTS_ARTICLES_DATA.length} EDITORIAL PIECES</span>
          </div>
        </div>

        {/* Featured Insight Block */}
        {filterState.category === 'all' &&
          filterState.contentType === 'all' &&
          filterState.searchQuery === '' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8D949E]">
                <Sparkles className="w-3.5 h-3.5 text-[#B89A72]" />
                <span className="text-[#F5F7FA] font-bold uppercase tracking-wider">
                  FEATURED DISPATCH
                </span>
              </div>
              <FeaturedInsight
                article={featuredArticle}
                onSelect={onSelectArticle}
              />
            </div>
          )}

        {/* Interactive Filters Bar */}
        <InsightFilters
          filterState={filterState}
          onFilterChange={setFilterState}
          onReset={handleResetFilters}
          totalResults={filteredArticles.length}
        />

        {/* Articles List / Grid */}
        {filteredArticles.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#8D949E] border-b border-white/10 pb-2">
              <span className="text-[#F5F7FA] font-bold uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#B89A72]" />
                EDITORIAL INDEX ({filteredArticles.length})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art, idx) => (
                <InsightCard
                  key={art.id}
                  article={art}
                  onSelect={onSelectArticle}
                  layoutMode="card"
                />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-4">
            <Layers className="w-10 h-10 text-[#B89A72] mx-auto" />
            <h3 className="text-xl font-bold text-[#F5F7FA] font-mono">
              NO EDITORIAL PIECES MATCH YOUR FILTER SELECTION
            </h3>
            <p className="text-xs font-mono text-[#8D949E] max-w-md mx-auto">
              Try adjusting your pillar category, content type, or search keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#B89A72] text-white text-xs font-mono font-semibold rounded-[2px] inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET FILTERS</span>
            </button>
          </div>
        )}

        {/* Topic Exploration Chips */}
        <div className="p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-3 font-mono text-xs">
          <span className="text-[#5A626E] text-[10px] uppercase block font-bold tracking-wider">
            TOPIC EXPLORATION INDEX
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              'Meta Ads',
              'Google Ads',
              'Shopify & Shopify Plus',
              'Server-Side CAPI',
              'Attribution & GTM',
              'AI Strategy & LLMs',
              'Unit Economics & CAC',
              'Conversion Rate Optimization',
              'TikTok Shop & Marketplaces',
              'Growth Architecture',
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setFilterState({ ...filterState, searchQuery: topic })}
                className="px-3 py-1 bg-[#050505] hover:bg-[#0E1116] border border-white/10 hover:border-[#B89A72]/40 text-[#8D949E] hover:text-white rounded-[2px] text-xs transition-colors cursor-pointer"
              >
                #{topic}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletter Component */}
        <NewsletterSignup />

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 bg-[#0A0C0F] border border-white/10 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#F5F7FA]">
              HAVE A GROWTH PROBLEM YOU WANT TO THINK THROUGH?
            </h3>
            <p className="text-xs font-mono text-[#8D949E]">
              Tell us where growth is constrained, what you are building, and what you want to achieve.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartProject}
              className="px-6 py-3 bg-[#B89A72] hover:bg-[#8F714D] text-white font-mono text-xs font-semibold rounded-[2px] transition-all cursor-pointer uppercase tracking-wider"
            >
              START A PROJECT →
            </button>
            <button
              onClick={onExploreCapabilities}
              className="px-6 py-3 border border-white/10 text-[#8D949E] hover:text-white font-mono text-xs rounded-[2px] transition-all cursor-pointer uppercase tracking-wider"
            >
              EXPLORE CAPABILITIES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
