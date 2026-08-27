import React from 'react';
import { CaseStudy } from '../../types/work';
import { ArrowUpRight, Globe, Layers, ShieldCheck, DollarSign, Activity } from 'lucide-react';

interface WorkCardProps {
  key?: React.Key;
  caseStudy: CaseStudy;
  onSelect: (slug: string) => void;
  featuredLayout?: boolean;
}

export function WorkCard({ caseStudy, onSelect, featuredLayout = false }: WorkCardProps) {
  const getStatusColor = (status: CaseStudy['status']) => {
    switch (status) {
      case 'ACTIVE_CLIENT':
      case 'ONGOING':
        return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30';
      case 'COMPLETED':
        return 'bg-[#B89A72]/10 text-[#B89A72] border-[#B89A72]/30';
      case 'SELECTED_PROJECT':
        return 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30';
      case 'PAST_CLIENT':
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30';
      default:
        return 'bg-white/5 text-[#8D949E] border-white/10';
    }
  };

  const getStatusLabel = (status: CaseStudy['status']) => {
    switch (status) {
      case 'ACTIVE_CLIENT':
        return 'ACTIVE CLIENT';
      case 'ONGOING':
        return 'ONGOING ENGAGEMENT';
      case 'COMPLETED':
        return 'COMPLETED PROJECT';
      case 'SELECTED_PROJECT':
        return 'SELECTED SHOWCASE';
      case 'PAST_CLIENT':
        return 'PAST ENGAGEMENT';
      default:
        return 'CLIENT CASE';
    }
  };

  return (
    <article
      onClick={() => onSelect(caseStudy.slug)}
      className={`group relative bg-[#0A0C0F] border border-white/10 rounded-[2px] p-6 sm:p-8 hover:border-[#B89A72]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        featuredLayout ? 'lg:col-span-2 bg-gradient-to-br from-[#0A0C0F] via-[#0D1015] to-[#0A0C0F]' : ''
      }`}
    >
      {/* Top Header & Badges */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-heading text-sm font-bold tracking-wide text-white uppercase">
              {caseStudy.isConfidential ? 'CONFIDENTIAL CLIENT' : caseStudy.clientName}
            </span>
            <span className="text-white/20">•</span>
            <span className="font-sans text-xs text-slate-300 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#B89A72]" />
              {caseStudy.geography}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`font-sans text-xs px-2.5 py-0.5 rounded-[2px] border font-semibold uppercase tracking-wider flex items-center gap-1.5 ${getStatusColor(
                caseStudy.status
              )}`}
            >
              <Activity className="w-3 h-3 animate-pulse" />
              {getStatusLabel(caseStudy.status)}
            </span>
          </div>
        </div>

        {/* Title and Business Subtitle */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2 font-sans text-xs text-[#B89A72]">
            <span className="uppercase tracking-wider font-semibold">{caseStudy.businessModel}</span>
            <span className="text-white/20">|</span>
            <span className="text-slate-300">{caseStudy.engagementType}</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F7FA] group-hover:text-[#B89A72] transition-colors leading-snug">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {caseStudy.subtitle}
          </p>
        </div>

        {/* Primary Metric Preview */}
        {caseStudy.results && caseStudy.results.length > 0 && (
          <div className="mb-6 p-4 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between">
            <div>
              <span className="font-sans text-xs text-slate-400 uppercase tracking-wider block font-medium">
                PRIMARY HIGHLIGHT
              </span>
              <span className="text-sm text-[#F5F7FA] font-medium">
                {caseStudy.results[0].label}
              </span>
            </div>
            <div className="text-right">
              <span className="font-heading text-xl font-extrabold text-[#B89A72]">
                {caseStudy.results[0].metric}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Metadata Grid */}
      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-sans">
          <div>
            <span className="text-slate-400 block text-xs uppercase font-medium">CAPABILITIES</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {caseStudy.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="px-2 py-0.5 bg-white/5 text-[#F5F7FA] border border-white/10 rounded-[2px] text-xs uppercase font-medium"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase font-medium">PLATFORMS</span>
            <span className="text-[#F5F7FA] block truncate mt-1 font-medium">
              {caseStudy.platforms.slice(0, 3).join(' · ')}
              {caseStudy.platforms.length > 3 && ` +${caseStudy.platforms.length - 3}`}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs uppercase font-medium">MEDIA BUDGET</span>
            <span className="text-[#B89A72] font-semibold block mt-1 flex items-center gap-1 text-sm">
              <DollarSign className="w-3.5 h-3.5" />
              {caseStudy.mediaBudgetDisplay}
            </span>
          </div>
        </div>

        {/* View Case Study CTA */}
        <div className="flex items-center justify-end pt-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-wider text-[#F5F7FA] group-hover:text-[#B89A72] transition-colors uppercase">
            VIEW CASE STUDY
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#B89A72]" />
          </span>
        </div>
      </div>
    </article>
  );
}
