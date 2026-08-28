import React from 'react';
import { ServiceItem } from '../../types/capabilities';
import { ArrowRight, CheckCircle2, Cpu, Tag } from 'lucide-react';

interface ServiceDetailCardProps {
  service: ServiceItem;
  onSelectService?: (serviceId: string) => void;
  onDiscussService?: (serviceTitle: string) => void;
}

export const ServiceDetailCard: React.FC<ServiceDetailCardProps> = ({
  service,
  onSelectService,
  onDiscussService
}) => {
  return (
    <div
      id={`service-${service.id}`}
      className="p-6 rounded-[2px] bg-[#07090D] border border-white/10 hover:border-[#B89A72]/60 transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden"
    >
      {/* Top Subtle Signal Gradient */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#B89A72]/40 to-transparent group-hover:via-[#B89A72] transition-all" />

      <div className="space-y-4">
        {/* Category Header */}
        <div className="flex items-center justify-between font-sans text-xs font-medium">
          <span className="text-[#B89A72] font-semibold tracking-wider uppercase">
            {service.pillarId} / {service.id}
          </span>
          {service.featured && (
            <span className="px-2.5 py-0.5 rounded bg-[#B89A72]/10 text-[#B89A72] text-xs font-semibold border border-[#B89A72]/30 uppercase">
              CORE SERVICE
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#B89A72] transition-colors">
          {service.title}
        </h4>

        {/* One-Liner */}
        <p className="text-sm text-[#B89A72] font-sans font-semibold tracking-wide">
          {service.oneLiner}
        </p>

        {/* Full Description */}
        <p className="text-sm text-slate-300 font-sans font-normal leading-relaxed">
          {service.description}
        </p>

        {/* What It Includes */}
        <div className="space-y-2.5 pt-3 border-t border-white/10">
          <div className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
            WHAT IT INCLUDES:
          </div>
          <ul className="space-y-2 font-sans text-sm text-[#F5F7FA]">
            {service.includes.map((inc, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B89A72] shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Supported Platforms / Tools */}
        {service.platforms && service.platforms.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-white/10">
            <div className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#B89A72]" />
              <span>PLATFORMS & TOOLS:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-sans text-xs">
              {service.platforms.map((p, idx) => (
                <span key={idx} className="px-2.5 py-0.5 rounded bg-[#030508] border border-white/10 text-slate-300 font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Target Audience */}
        <div className="text-xs text-slate-300 font-sans pt-1">
          <span className="text-slate-400 font-semibold uppercase">BEST FOR: </span>
          <span>{service.targetAudience}</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={() => onDiscussService?.(service.title)}
          className="w-full py-3 px-5 rounded-[2px] bg-[#050505] hover:bg-[#B89A72] text-[#F5F7FA] hover:text-white border border-white/15 hover:border-[#B89A72] transition-all font-sans text-xs uppercase tracking-wider font-semibold flex items-center justify-between cursor-pointer group-hover:border-[#B89A72]/50"
        >
          <span>{service.ctaText}</span>
          <ArrowRight className="w-4 h-4 text-[#B89A72] group-hover:text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
