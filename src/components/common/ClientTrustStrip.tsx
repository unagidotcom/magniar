import React from 'react';
import { TechnicalLabel } from './TechnicalLabel';

export const ClientTrustStrip: React.FC = () => {
  const sectors = [
    { name: 'DIRECT-TO-CONSUMER', label: 'E-Commerce Brands' },
    { name: 'ENTERPRISE SAAS', label: 'B2B Platforms' },
    { name: 'RETAIL & MARKETPLACES', label: 'Omnichannel Media' },
    { name: 'FINANCIAL SERVICES', label: 'Fintech & Advisory' },
    { name: 'HEALTH & WELLNESS', label: 'Consumer Products' },
  ];

  return (
    <div className="w-full bg-[#030508] border-y border-white/10 py-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Label */}
        <div className="flex items-center gap-3 shrink-0">
          <TechnicalLabel text="CLIENT SECTORS & PARTNERS" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
        </div>

        {/* Minimal Monochrome Sector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl">
          {sectors.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#080B10] border border-white/10 hover:border-[#0099FF]/40 transition-all rounded-[2px] flex flex-col items-center justify-center text-center group cursor-default"
            >
              <span className="font-heading text-xs font-bold text-slate-200 group-hover:text-[#0099FF] tracking-wider uppercase transition-colors">
                {item.name}
              </span>
              <span className="font-sans text-[11px] text-slate-400 font-medium mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

