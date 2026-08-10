import React, { useState, useEffect } from 'react';
import { INSIGHTS_ARTICLES_DATA } from '../../data/insightsData';
import { CASE_STUDIES_DATA } from '../../data/workData';
import { InsightArticle } from '../../types/insights';
import { InsightCard } from './InsightCard';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Share2,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  BookOpen,
  Terminal,
  ShieldCheck,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
  onBackToInsights: () => void;
  onSelectArticle: (slug: string) => void;
  onStartProject: () => void;
  onExploreCapabilities: () => void;
  onSelectCaseStudy?: (slug: string) => void;
}

export function ArticleDetailPage({
  slug,
  onBackToInsights,
  onSelectArticle,
  onStartProject,
  onExploreCapabilities,
  onSelectCaseStudy,
}: ArticleDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const article =
    INSIGHTS_ARTICLES_DATA.find((a) => a.slug === slug) ||
    INSIGHTS_ARTICLES_DATA[0];

  // Related articles (matching category or content type, excluding current)
  const relatedArticles = INSIGHTS_ARTICLES_DATA.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.contentType === article.contentType)
  ).slice(0, 3);

  // Related Case Study match
  const relatedCaseStudy = article.relatedCaseStudySlug
    ? CASE_STUDIES_DATA.find((cs) => cs.slug === article.relatedCaseStudySlug)
    : null;

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans relative pb-20">
      {/* Reading Progress Top Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#0099FF] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <button
            onClick={onBackToInsights}
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8D949E] hover:text-[#0099FF] transition-colors cursor-pointer uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO MAGNIAR INTELLIGENCE INDEX</span>
          </button>

          <div className="flex items-center gap-3 font-mono text-xs text-[#8D949E]">
            <span className="text-[#10B981] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              VERIFIED EDITORIAL DISPATCH
            </span>
            <span>•</span>
            <button
              onClick={handleCopyLink}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'LINK COPIED' : 'SHARE'}</span>
            </button>
          </div>
        </div>

        {/* Article Hero Header */}
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] font-mono text-xs font-semibold rounded-[2px] uppercase tracking-wider">
              {article.contentType}
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 text-[#10B981] font-mono text-xs font-semibold rounded-[2px] uppercase tracking-wider">
              {getCategoryLabel(article.category)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA] font-sans leading-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#8D949E] font-sans leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author & Meta Row */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8D949E]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0099FF]/20 border border-[#0099FF]/40 flex items-center justify-center font-bold text-[#0099FF]">
                M
              </div>
              <div>
                <span className="text-[#F5F7FA] font-bold block">
                  {article.author.name}
                </span>
                <span className="text-[10px] text-[#5A626E]">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#5A626E]" />
                {article.readTimeDisplay}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#5A626E]" />
                {article.publishedDateDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* Key Takeaways Box (Scannable Executive Summary) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="bg-[#0A0C0F] border border-[#0099FF]/30 rounded-[2px] p-6 sm:p-8 space-y-4 max-w-4xl relative overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0099FF] uppercase tracking-wider border-b border-white/10 pb-3">
              <Sparkles className="w-4 h-4 text-[#0099FF]" />
              <span>KEY TAKEAWAYS — EXECUTIVE SUMMARY</span>
            </div>

            <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#F5F7FA]">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] mt-2 shrink-0" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content Layout with Sticky Table of Contents Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Reading Column (Constrained Width for Optimal Ergonomics) */}
          <article className="lg:col-span-8 space-y-12 max-w-[720px] font-sans text-sm sm:text-base leading-relaxed text-[#D0D5DD]">
            {article.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="space-y-6 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] font-sans border-b border-white/10 pb-3 tracking-tight">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#8D949E] leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Callout Quote */}
                {sec.calloutQuote && (
                  <blockquote className="my-6 p-6 bg-[#0A0C0F] border-l-2 border-[#0099FF] text-[#F5F7FA] italic font-serif text-base sm:text-lg leading-relaxed rounded-r-[2px]">
                    "{sec.calloutQuote}"
                  </blockquote>
                )}

                {/* Data Callout */}
                {sec.dataCallout && (
                  <div className="my-6 p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-2 font-mono text-xs">
                    <span className="text-[#0099FF] font-bold block uppercase tracking-wider">
                      {sec.dataCallout.label}
                    </span>
                    <span className="text-3xl font-bold text-[#F5F7FA] block">
                      {sec.dataCallout.metric}
                    </span>
                    <p className="text-xs text-[#8D949E] leading-relaxed">
                      {sec.dataCallout.description}
                    </p>
                  </div>
                )}

                {/* Visual Graphic Grid */}
                {sec.visualGraphic && (
                  <div className="my-6 p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-4 font-mono text-xs">
                    <span className="text-[#F5F7FA] font-bold uppercase tracking-wider block border-b border-white/10 pb-2">
                      {sec.visualGraphic.title}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {sec.visualGraphic.dataPoints.map((dp, dpIdx) => (
                        <div
                          key={dpIdx}
                          className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1"
                        >
                          <span className="text-[10px] text-[#8D949E] block">
                            {dp.label}
                          </span>
                          <span className="text-sm font-bold text-[#0099FF] block">
                            {dp.value}
                          </span>
                          {dp.badge && (
                            <span className="inline-block text-[9px] px-1.5 py-0.5 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 rounded-[2px]">
                              {dp.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Block */}
                {sec.codeBlock && (
                  <div className="my-6 rounded-[2px] overflow-hidden border border-white/15 bg-[#050505] font-mono text-xs">
                    <div className="bg-[#0A0C0F] px-4 py-2 border-b border-white/10 text-[10px] text-[#8D949E] flex items-center justify-between">
                      <span className="text-[#0099FF] font-semibold">
                        {sec.codeBlock.language.toUpperCase()} ENGINE CODE
                      </span>
                      <span>UTF-8 SPECIFICATION</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-[#F5F7FA] leading-relaxed">
                      <code>{sec.codeBlock.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}

            {/* Contextual Case Study Link Card */}
            {relatedCaseStudy && (
              <div className="p-6 bg-[#0A0C0F] border border-[#0099FF]/40 rounded-[2px] space-y-3 font-mono text-xs my-8">
                <div className="flex items-center gap-2 text-[#0099FF] font-bold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>CONNECTED PROOF OF WORK / CASE STUDY</span>
                </div>
                <h4 className="text-base font-bold text-[#F5F7FA] font-sans">
                  {relatedCaseStudy.title}
                </h4>
                <p className="text-xs text-[#8D949E] font-sans">
                  {relatedCaseStudy.subtitle}
                </p>
                <button
                  onClick={() =>
                    onSelectCaseStudy
                      ? onSelectCaseStudy(relatedCaseStudy.slug)
                      : alert(`Navigating to Case Study: ${relatedCaseStudy.slug}`)
                  }
                  className="px-4 py-2 bg-[#0099FF] text-white font-mono text-xs font-semibold rounded-[2px] inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>VIEW CASE STUDY EXECUTION →</span>
                </button>
              </div>
            )}

            {/* Article Tags */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="text-[#5A626E] text-[10px] uppercase block font-bold">
                ARTICLE TAXONOMY TAGS:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[#0A0C0F] border border-white/10 text-[#8D949E] rounded-[2px] text-[11px]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Configurable Article CTA */}
            <div className="p-8 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-4 my-8">
              <h3 className="text-xl font-bold text-[#F5F7FA] font-sans">
                {article.ctaConfig?.title || 'READY TO BUILD YOUR GROWTH ARCHITECTURE?'}
              </h3>
              <p className="text-xs font-mono text-[#8D949E]">
                Talk directly with Magniar strategy and engineering leads. Zero sales scripts.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onStartProject}
                  className="px-6 py-3 bg-[#0099FF] hover:bg-[#0088EE] text-white font-mono text-xs font-semibold rounded-[2px] transition-all cursor-pointer uppercase tracking-wider"
                >
                  {article.ctaConfig?.buttonText || 'START A PROJECT →'}
                </button>
                <button
                  onClick={onExploreCapabilities}
                  className="px-6 py-3 border border-white/10 text-[#8D949E] hover:text-white font-mono text-xs rounded-[2px] transition-all cursor-pointer uppercase tracking-wider"
                >
                  EXPLORE CAPABILITIES
                </button>
              </div>
            </div>
          </article>

          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6 hidden lg:block font-mono text-xs">
            <div className="p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-4">
              <span className="text-[#5A626E] text-[10px] uppercase block font-bold tracking-wider border-b border-white/10 pb-2">
                TABLE OF CONTENTS
              </span>
              <nav className="space-y-2">
                {article.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-[#8D949E] hover:text-[#0099FF] transition-colors line-clamp-1 text-xs py-1"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Connected Capability Link */}
            {article.capabilityId && (
              <div className="p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-3">
                <span className="text-[#10B981] text-[10px] uppercase block font-bold tracking-wider">
                  RELATED CAPABILITY PILLAR
                </span>
                <p className="text-xs text-[#F5F7FA] font-sans font-bold uppercase">
                  {article.capabilityId} MARKETING & ENGINEERING
                </p>
                <button
                  onClick={onExploreCapabilities}
                  className="text-xs text-[#0099FF] hover:text-white transition-colors block cursor-pointer"
                >
                  EXPLORE CAPABILITY DETAILS →
                </button>
              </div>
            )}
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between font-mono text-xs text-[#8D949E]">
              <span className="text-[#F5F7FA] font-bold uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0099FF]" />
                WHAT TO READ NEXT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relArt) => (
                <InsightCard
                  key={relArt.id}
                  article={relArt}
                  onSelect={onSelectArticle}
                  layoutMode="card"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
