import React from 'react';
import { InsightArticle } from '../../types/insights';
import { ArrowUpRight, Clock, Calendar, Sparkles, BookOpen, Layers } from 'lucide-react';

interface FeaturedInsightProps {
  article: InsightArticle;
  onSelect: (slug: string) => void;
}

export function FeaturedInsight({ article, onSelect }: FeaturedInsightProps) {
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'performance':
        return 'PERFORMANCE';
      case 'commerce':
        return 'COMMERCE';
      case 'development':
        return 'DEVELOPMENT';
      case 'intelligence':
        return 'AI + INTELLIGENCE';
      case 'strategy':
        return 'STRATEGY';
      case 'observations':
        return 'OBSERVATIONS';
      default:
        return cat.toUpperCase();
    }
  };

  return (
    <div
      onClick={() => onSelect(article.slug)}
      className="group relative bg-[#0A0C0F] hover:bg-[#0E1116] border border-white/15 hover:border-[#0099FF]/50 rounded-[2px] p-6 sm:p-10 transition-all cursor-pointer overflow-hidden shadow-2xl space-y-6"
    >
      {/* Background Accent Subtle Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0099FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Badge & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#0099FF] text-white font-mono text-xs font-bold rounded-[2px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            FEATURED {article.contentType}
          </span>
          <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-[#10B981] font-mono text-xs font-semibold rounded-[2px]">
            {getCategoryLabel(article.category)}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#8D949E]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#5A626E]" />
            {article.readTimeDisplay}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#5A626E]" />
            {article.publishedDateDisplay}
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F7FA] group-hover:text-[#0099FF] transition-colors leading-tight font-sans">
            {article.title}
          </h2>

          <p className="text-sm sm:text-base text-[#8D949E] leading-relaxed max-w-2xl">
            {article.subtitle}
          </p>

          <p className="text-xs text-[#5A626E] font-mono line-clamp-2">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <span className="px-5 py-2.5 bg-[#0099FF] hover:bg-[#0088EE] text-white font-mono text-xs font-semibold rounded-[2px] transition-all inline-flex items-center gap-2">
              <span>READ ANALYSIS</span>
              <ArrowUpRight className="w-4 h-4" />
            </span>

            {article.author && (
              <span className="text-xs font-mono text-[#8D949E] pl-3 border-l border-white/10">
                BY {article.author.name.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Abstract Graphic / Key Metric Graphic */}
        <div className="lg:col-span-4 bg-[#050505] border border-white/10 rounded-[2px] p-5 space-y-3 font-mono text-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-[#8D949E] border-b border-white/10 pb-2">
            <span className="text-[#0099FF] font-semibold flex items-center gap-1">
              <Layers className="w-3 h-3" />
              KEY TAKEAWAY HIGHLIGHT
            </span>
            <span>01 / 04</span>
          </div>

          <p className="text-xs text-[#F5F7FA] leading-relaxed font-sans font-medium">
            "{article.keyTakeaways[0] || article.subtitle}"
          </p>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#5A626E]">
            <span>MAGNIAR INTELLIGENCE DISPATCH</span>
            <span className="text-[#10B981]">VERIFIED DATA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
