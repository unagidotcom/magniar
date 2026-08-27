import React from 'react';
import { CASE_STUDIES_DATA } from '../../data/workData';
import { INSIGHTS_ARTICLES_DATA } from '../../data/insightsData';
import { DISCIPLINE_NODES } from '../../data/aboutData';
import { ArrowUpRight, ArrowRight, Layers, BookOpen, Briefcase } from 'lucide-react';

interface AboutConnectionsProps {
  onSelectCaseStudy?: (slug: string) => void;
  onSelectArticle?: (slug: string) => void;
  onExploreWork?: () => void;
  onExploreInsights?: () => void;
  onExploreCapabilities?: () => void;
}

export const AboutConnectionsSection: React.FC<AboutConnectionsProps> = ({
  onSelectCaseStudy,
  onSelectArticle,
  onExploreWork,
  onExploreInsights,
  onExploreCapabilities,
}) => {
  const featuredCaseStudies = CASE_STUDIES_DATA.slice(0, 2);
  const featuredArticles = INSIGHTS_ARTICLES_DATA.slice(0, 2);

  return (
    <div className="space-y-0">
      {featuredCaseStudies.length > 0 && (
        /* 1. SELECTED WORK CONNECTION (SECTION 26) */
        <section className="py-20 sm:py-28 border-b border-white/10 bg-[#080B10] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block mb-2 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#B89A72]" />
                  [ 13 — PROOF OF PERFORMANCE ]
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase">
                  SEE THE SYSTEM <span className="text-[#B89A72]">IN PRACTICE</span>
                </h2>
              </div>

              <button
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer self-start md:self-auto"
              >
                <span>VIEW ALL CASE STUDIES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredCaseStudies.map((cs) => (
                <div
                  key={cs.id}
                  onClick={() => onSelectCaseStudy && onSelectCaseStudy(cs.slug)}
                  className="p-6 sm:p-8 bg-[#050505] border border-white/10 hover:border-[#B89A72]/50 transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs text-[#8D949E]">
                      <span className="text-[#B89A72] font-bold">{cs.clientName}</span>
                      <span>{cs.geography}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white uppercase group-hover:text-[#B89A72] transition-colors leading-tight">
                      {cs.title}
                    </h3>

                    <p className="text-xs text-[#8D949E] line-clamp-3 leading-relaxed">
                      {cs.subtitle}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-[#8D949E] uppercase">{cs.engagementType}</span>
                    <span className="text-[#B89A72] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      CASE STUDY <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. INSIGHTS CONNECTION (SECTION 27) */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block mb-2 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#B89A72]" />
                [ 14 — MAGNIAR INTELLIGENCE ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase">
                WHAT WE'RE <span className="text-[#B89A72]">THINKING ABOUT</span>
              </h2>
            </div>

            <button
              onClick={onExploreInsights}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer self-start md:self-auto"
            >
              <span>EXPLORE INTELLIGENCE DESK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle && onSelectArticle(art.slug)}
                className="p-6 sm:p-8 bg-[#080B10] border border-white/10 hover:border-[#B89A72]/50 transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-2 py-0.5 bg-[#B89A72]/10 text-[#B89A72] border border-[#B89A72]/30 uppercase font-bold">
                      {art.contentType}
                    </span>
                    <span className="text-[#8D949E]">{art.readTimeDisplay}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white uppercase group-hover:text-[#B89A72] transition-colors leading-tight">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#8D949E] line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#8D949E]">{art.publishedDateDisplay}</span>
                  <span className="text-[#B89A72] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    READ INSIGHT <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITY CONNECTION (SECTION 28) */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-[#080B10] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#B89A72]" />
                [ 15 — CAPABILITY MATRIX ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase">
                WHAT WE <span className="text-[#B89A72]">BUILD</span>
              </h2>
            </div>

            <button
              onClick={onExploreCapabilities}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8F714D] transition-all cursor-pointer self-start md:self-auto"
            >
              <span>EXPLORE ALL CAPABILITIES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DISCIPLINE_NODES.map((d) => (
              <div
                key={d.id}
                onClick={onExploreCapabilities}
                className="p-6 bg-[#050505] border border-white/10 hover:border-[#B89A72]/50 transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs text-[#B89A72] font-bold block">{d.numberLabel}</span>
                  <h3 className="text-lg font-bold text-white uppercase group-hover:text-[#B89A72] transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-xs text-[#8D949E] leading-relaxed">
                    {d.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-[#B89A72]">
                  <span>INSPECT SERVICE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
