import React from 'react';
import { InsightArticle } from '../../types/insights';
import { ArrowUpRight, Clock, Calendar, Tag, ShieldCheck } from 'lucide-react';

interface InsightCardProps {
  key?: React.Key;
  article: InsightArticle;
  onSelect: (slug: string) => void;
  layoutMode?: 'card' | 'horizontal_row' | 'featured_block';
  indexNumber?: string;
}

export function InsightCard({
  article,
  onSelect,
  layoutMode = 'card',
  indexNumber,
}: InsightCardProps) {
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

  if (layoutMode === 'horizontal_row') {
    return (
      <div
        onClick={() => onSelect(article.slug)}
        className="group p-5 sm:p-6 bg-[#0A0C0F] hover:bg-[#0E1116] border border-white/10 hover:border-[#B89A72]/40 rounded-[2px] transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
      >
        <div className="flex items-start gap-4 flex-1">
          {indexNumber && (
            <span className="font-mono text-base font-bold text-[#B89A72] pt-0.5">
              {indexNumber}
            </span>
          )}

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2 font-sans text-xs text-slate-400">
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#B89A72] rounded-[2px] font-semibold uppercase">
                {article.contentType}
              </span>
              <span>•</span>
              <span className="text-[#F5F7FA] font-semibold">
                {getCategoryLabel(article.category)}
              </span>
              <span>•</span>
              <span>{article.readTimeDisplay}</span>
              <span>•</span>
              <span>{article.publishedDateDisplay}</span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F7FA] group-hover:text-[#B89A72] transition-colors leading-snug">
              {article.title}
            </h3>

            <p className="text-sm text-slate-300 line-clamp-2 max-w-2xl leading-relaxed">
              {article.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center pt-2 md:pt-0">
          <span className="text-xs font-sans font-semibold tracking-wider text-slate-300 group-hover:text-white transition-colors flex items-center gap-1.5 uppercase">
            READ
            <ArrowUpRight className="w-4 h-4 text-[#B89A72] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(article.slug)}
      className="group p-6 bg-[#0A0C0F] hover:bg-[#0E1116] border border-white/10 hover:border-[#B89A72]/40 rounded-[2px] transition-all cursor-pointer flex flex-col justify-between space-y-5 relative overflow-hidden h-full"
    >
      <div className="space-y-4">
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-2 font-sans text-xs">
          <span className="px-2.5 py-0.5 bg-[#B89A72]/10 text-[#B89A72] border border-[#B89A72]/30 font-semibold rounded-[2px] uppercase">
            {article.contentType}
          </span>
          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {article.readTimeDisplay}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <span className="text-xs font-sans text-[#10B981] font-semibold uppercase tracking-wider block">
            {getCategoryLabel(article.category)}
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F5F7FA] group-hover:text-[#B89A72] transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
            {article.subtitle}
          </p>
        </div>
      </div>

      {/* Footer Details */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-slate-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-300">{article.publishedDateDisplay}</span>
        </div>

        <span className="text-[#B89A72] font-semibold tracking-wider flex items-center gap-1 group-hover:translate-x-0.5 transition-transform uppercase">
          READ →
        </span>
      </div>
    </div>
  );
}
