import React from 'react';
import { CaseStudy } from '../../types/work';
import { CASE_STUDIES_DATA } from '../../data/workData';
import { WorkCard } from './WorkCard';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Layers,
  ShieldCheck,
  DollarSign,
  Activity,
  CheckCircle2,
  Calendar,
  Clock,
  Briefcase,
  Quote,
  Terminal,
  ExternalLink,
} from 'lucide-react';

interface CaseStudyDetailPageProps {
  slug: string;
  onBackToWork: () => void;
  onSelectCaseStudy: (slug: string) => void;
  onStartProject: () => void;
  onExploreCapabilities: () => void;
}

export function CaseStudyDetailPage({
  slug,
  onBackToWork,
  onSelectCaseStudy,
  onStartProject,
  onExploreCapabilities,
}: CaseStudyDetailPageProps) {
  const caseStudy = CASE_STUDIES_DATA.find((c) => c.slug === slug) || CASE_STUDIES_DATA[0];

  // Calculate prev / next
  const currentIndex = CASE_STUDIES_DATA.findIndex((c) => c.slug === caseStudy.slug);
  const prevCaseStudy =
    CASE_STUDIES_DATA[(currentIndex - 1 + CASE_STUDIES_DATA.length) % CASE_STUDIES_DATA.length];
  const nextCaseStudy = CASE_STUDIES_DATA[(currentIndex + 1) % CASE_STUDIES_DATA.length];

  // Related work (matching industry or capability)
  const relatedWork = CASE_STUDIES_DATA.filter(
    (c) =>
      c.id !== caseStudy.id &&
      (c.industryId === caseStudy.industryId ||
        c.capabilities.some((cap) => caseStudy.capabilities.includes(cap)))
  ).slice(0, 2);

  const getStatusColor = (status: CaseStudy['status']) => {
    switch (status) {
      case 'ACTIVE_CLIENT':
      case 'ONGOING':
        return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30';
      case 'COMPLETED':
        return 'bg-[#0099FF]/10 text-[#0099FF] border-[#0099FF]/30';
      case 'SELECTED_PROJECT':
        return 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30';
      case 'PAST_CLIENT':
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30';
      default:
        return 'bg-white/5 text-[#8D949E] border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans">
      {/* Top Navigation & Breadcrumbs */}
      <div className="border-b border-white/10 bg-[#0A0C0F] sticky top-0 z-40 px-4 sm:px-6 py-4">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#8D949E]">
            <button
              onClick={onBackToWork}
              className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>WORK</span>
            </button>
            <span>/</span>
            <span className="text-white font-semibold">
              {caseStudy.isConfidential ? 'CONFIDENTIAL CLIENT' : caseStudy.clientName}
            </span>
            <span>/</span>
            <span className="text-[#0099FF] truncate max-w-[200px] sm:max-w-none">
              {caseStudy.slug}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-[2px] border border-[#10B981]/30 text-[10px] uppercase flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              PROTOTYPE SPECIFICATION
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#0A0C0F] to-[#050505]">
        <div className="max-w-[1280px] mx-auto space-y-8">
          {/* Status & Geography Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-[2px] font-mono text-xs text-[#0099FF] uppercase tracking-wider font-semibold">
                {caseStudy.businessModel}
              </span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-xs text-[#8D949E] flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#0099FF]" />
                {caseStudy.geography}
              </span>
            </div>

            <span
              className={`font-mono text-xs px-3 py-1 rounded-[2px] border font-semibold uppercase tracking-wider flex items-center gap-1.5 ${getStatusColor(
                caseStudy.status
              )}`}
            >
              <Activity className="w-3 h-3 animate-pulse" />
              STATUS: {caseStudy.status}
            </span>
          </div>

          {/* Title and Short Descriptor */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA] leading-tight">
              {caseStudy.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#8D949E] leading-relaxed">
              {caseStudy.subtitle}
            </p>
          </div>

          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] font-mono text-xs">
            <div>
              <span className="text-[#5A626E] block text-[10px] uppercase mb-1">CLIENT</span>
              <span className="text-white font-semibold">
                {caseStudy.isConfidential ? 'Confidential Client' : caseStudy.clientName}
              </span>
            </div>

            <div>
              <span className="text-[#5A626E] block text-[10px] uppercase mb-1">MEDIA BUDGET</span>
              <span className="text-[#0099FF] font-semibold flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                {caseStudy.mediaBudgetDisplay}
              </span>
            </div>

            <div>
              <span className="text-[#5A626E] block text-[10px] uppercase mb-1">ENGAGEMENT</span>
              <span className="text-[#F5F7FA] block truncate">{caseStudy.engagementType}</span>
            </div>

            <div>
              <span className="text-[#5A626E] block text-[10px] uppercase mb-1">DURATION</span>
              <span className="text-[#F5F7FA] block">{caseStudy.duration}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto space-y-16">
        {/* Prototype Mock Data Notice Banner */}
        <div className="p-4 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded-[2px] flex items-start gap-3 text-xs font-mono">
          <Terminal className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
          <div className="space-y-1 text-[#8D949E]">
            <span className="text-[#F5F7FA] font-bold block uppercase">
              PROTOTYPE NOTICE: MOCK CLIENT DATA FOR DEMONSTRATION
            </span>
            <p>
              In accordance with Magniar specification guidelines, real client results are never fabricated. All metrics on this page are explicitly tagged as prototype mock data. When deployed, real client data is securely managed through the Magniar Admin Panel.
            </p>
          </div>
        </div>

        {/* Section 01: About the Business */}
        <section className="space-y-4 border-b border-white/10 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0099FF] uppercase tracking-widest">
            <span>01</span>
            <span>//</span>
            <span>ABOUT THE BUSINESS</span>
          </div>
          <h2 className="text-2xl font-bold text-[#F5F7FA]">Client Profile & Context</h2>
          <p className="text-base text-[#8D949E] leading-relaxed max-w-4xl">
            {caseStudy.clientBio}
          </p>
        </section>

        {/* Section 02 & 03: Challenge & Objective Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b border-white/10 pb-12">
          {/* Challenge */}
          <div className="p-8 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#EF4444] uppercase tracking-widest">
              <span>02</span>
              <span>//</span>
              <span>THE CHALLENGE</span>
            </div>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Business & Technical Bottleneck</h3>
            <p className="text-sm text-[#8D949E] leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Objective */}
          <div className="p-8 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] uppercase tracking-widest">
              <span>03</span>
              <span>//</span>
              <span>THE OBJECTIVE</span>
            </div>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Scope & Target Outcomes</h3>
            <p className="text-sm text-[#8D949E] leading-relaxed">
              {caseStudy.objective}
            </p>
          </div>
        </section>

        {/* Section 04: The Magniar Approach */}
        <section className="space-y-8 border-b border-white/10 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0099FF] uppercase tracking-widest">
            <span>04</span>
            <span>//</span>
            <span>THE MAGNIAR APPROACH</span>
          </div>
          <h2 className="text-2xl font-bold text-[#F5F7FA]">Strategic Roadmap & Execution Sequence</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.strategySteps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-3 relative"
              >
                <span className="text-3xl font-mono font-bold text-[#0099FF]/40 block">
                  {step.stepNumber}
                </span>
                <h4 className="text-base font-bold text-[#F5F7FA]">{step.title}</h4>
                <p className="text-xs text-[#8D949E] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 05: What We Built / Services & Platforms */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-white/10 pb-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#0099FF] uppercase tracking-widest">
              <span>05</span>
              <span>//</span>
              <span>EXECUTION & WHAT WE BUILT</span>
            </div>
            <h2 className="text-2xl font-bold text-[#F5F7FA]">Systems, Assets & Technical Deliverables</h2>

            <ul className="space-y-3 font-mono text-xs">
              {caseStudy.executionItems.map((item, idx) => (
                <li
                  key={idx}
                  className="p-3.5 bg-[#0A0C0F] border border-white/10 rounded-[2px] text-[#F5F7FA] flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0099FF] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-6">
              <div>
                <span className="text-xs font-mono text-[#5A626E] uppercase block mb-3">
                  SERVICES UTILIZED
                </span>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.servicesUsed.map((svc) => (
                    <button
                      key={svc}
                      onClick={onExploreCapabilities}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 hover:border-[#0099FF]/50 rounded-[2px] font-mono text-xs text-[#F5F7FA] hover:text-[#0099FF] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{svc}</span>
                      <ExternalLink className="w-3 h-3 text-[#5A626E]" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-[#5A626E] uppercase block mb-3">
                  PLATFORM ECOSYSTEM
                </span>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.platforms.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] font-mono text-xs font-semibold"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Results & Metrics */}
        <section className="space-y-8 border-b border-white/10 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#0099FF] uppercase tracking-widest">
              <span>06</span>
              <span>//</span>
              <span>RESULTS & IMPACT</span>
            </div>

            <span className="font-mono text-xs text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-[2px] border border-[#10B981]/30">
              [ PROTOTYPE METRICS — DEMO DATA ]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.results.map((res, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-2 relative overflow-hidden"
              >
                <span className="font-mono text-[10px] text-[#8D949E] uppercase tracking-wider block">
                  {res.category}
                </span>
                <span className="text-3xl font-mono font-bold text-[#0099FF] block">
                  {res.metric}
                </span>
                <span className="text-xs font-bold text-[#F5F7FA] block">{res.label}</span>
                <p className="text-[11px] text-[#8D949E] leading-relaxed pt-2 border-t border-white/10">
                  {res.note}
                </p>
              </div>
            ))}
          </div>

          {/* Before vs After Comparison */}
          {caseStudy.beforeAfter && caseStudy.beforeAfter.length > 0 && (
            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-bold font-mono text-[#F5F7FA] uppercase">
                BEFORE VS AFTER TRANSFORMATION
              </h3>

              <div className="border border-white/10 rounded-[2px] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 bg-[#0A0C0F] border-b border-white/10 p-3 font-mono text-xs text-[#5A626E] font-bold uppercase hidden md:grid">
                  <div>DIMENSION</div>
                  <div>BEFORE MAGNIAR</div>
                  <div>AFTER MAGNIAR</div>
                </div>

                {caseStudy.beforeAfter.map((ba, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-3 p-4 border-b border-white/5 last:border-0 gap-3 font-mono text-xs"
                  >
                    <div className="text-[#0099FF] font-semibold">{ba.dimension}</div>
                    <div className="text-[#8D949E] bg-white/5 p-2 rounded-[2px]">
                      <span className="text-[#EF4444] text-[10px] uppercase block font-bold mb-1">
                        BEFORE
                      </span>
                      {ba.before}
                    </div>
                    <div className="text-[#F5F7FA] bg-[#0099FF]/10 border border-[#0099FF]/20 p-2 rounded-[2px]">
                      <span className="text-[#10B981] text-[10px] uppercase block font-bold mb-1">
                        AFTER
                      </span>
                      {ba.after}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Section 07: Client Quote / Testimonial */}
        {caseStudy.testimonial && (
          <section className="p-8 sm:p-12 bg-[#0A0C0F] border border-white/10 rounded-[2px] relative overflow-hidden space-y-6">
            <Quote className="w-10 h-10 text-[#0099FF]/30 absolute top-6 right-6" />

            <p className="text-lg sm:text-xl text-[#F5F7FA] italic leading-relaxed max-w-3xl">
              "{caseStudy.testimonial.quote}"
            </p>

            <div className="font-mono text-xs">
              <span className="text-[#0099FF] font-bold block">
                {caseStudy.testimonial.authorName}
              </span>
              <span className="text-[#8D949E]">
                {caseStudy.testimonial.authorRole}, {caseStudy.testimonial.companyName}
              </span>
            </div>
          </section>
        )}

        {/* Section 08: Related Work */}
        {relatedWork.length > 0 && (
          <section className="space-y-6 border-b border-white/10 pb-12">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#F5F7FA] font-mono">RELATED WORK</h3>
              <button
                onClick={onBackToWork}
                className="text-xs font-mono text-[#0099FF] hover:underline"
              >
                VIEW ALL CASE STUDIES →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedWork.map((rw) => (
                <WorkCard key={rw.id} caseStudy={rw} onSelect={onSelectCaseStudy} />
              ))}
            </div>
          </section>
        )}

        {/* Section 09: Next / Prev Case Study Navigation */}
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#0A0C0F] border border-white/10 rounded-[2px] font-mono text-xs">
          <button
            onClick={() => onSelectCaseStudy(prevCaseStudy.slug)}
            className="w-full sm:w-auto p-3 hover:bg-white/5 rounded-[2px] text-left transition-colors cursor-pointer group"
          >
            <span className="text-[#5A626E] text-[10px] uppercase block mb-1">
              ← PREVIOUS CASE STUDY
            </span>
            <span className="text-white font-bold group-hover:text-[#0099FF] transition-colors block">
              {prevCaseStudy.clientName}
            </span>
          </button>

          <button
            onClick={onBackToWork}
            className="px-4 py-2 border border-white/10 hover:border-[#0099FF] text-[#8D949E] hover:text-white rounded-[2px] text-xs font-mono"
          >
            ALL WORK INDEX
          </button>

          <button
            onClick={() => onSelectCaseStudy(nextCaseStudy.slug)}
            className="w-full sm:w-auto p-3 hover:bg-white/5 rounded-[2px] text-right transition-colors cursor-pointer group"
          >
            <span className="text-[#5A626E] text-[10px] uppercase block mb-1">
              NEXT CASE STUDY →
            </span>
            <span className="text-white font-bold group-hover:text-[#0099FF] transition-colors block">
              {nextCaseStudy.clientName}
            </span>
          </button>
        </nav>

        {/* Section 10: Closing CTA */}
        <section className="p-8 sm:p-12 bg-gradient-to-r from-[#0A0C0F] via-[#0D1015] to-[#0A0C0F] border border-[#0099FF]/30 rounded-[2px] text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
            YOUR BUSINESS COULD BE NEXT.
          </h2>
          <p className="text-sm text-[#8D949E] max-w-xl mx-auto leading-relaxed">
            Tell us what you're building, where growth is getting constrained, and what you want to change across acquisition, commerce, or intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartProject}
              className="px-6 py-3.5 bg-[#0099FF] hover:bg-[#0088EE] text-white font-mono text-xs font-semibold rounded-[2px] transition-all cursor-pointer shadow-lg shadow-[#0099FF]/20"
            >
              START A PROJECT →
            </button>

            <button
              onClick={onExploreCapabilities}
              className="px-6 py-3.5 border border-white/10 hover:border-white/30 text-[#F5F7FA] font-mono text-xs rounded-[2px] transition-all cursor-pointer"
            >
              EXPLORE CAPABILITIES
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
