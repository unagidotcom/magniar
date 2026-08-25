import React from 'react';
import { CAPABILITY_GROUPS } from '../../data/navigationData';
import { SignalIndicator } from '../common/SignalIndicator';
import { ArrowIcon } from '../common/ArrowIcon';
import { X, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface CapabilitiesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject?: () => void;
  onNavigate?: (route: string) => void;
}

export const CapabilitiesMegaMenu: React.FC<CapabilitiesMegaMenuProps> = ({
  isOpen,
  onClose,
  onStartProject,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    if (onNavigate) onNavigate('services');
  };

  const handleStartProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    if (onStartProject) {
      onStartProject();
    } else if (onNavigate) {
      onNavigate('start-project');
    }
  };

  return (
    <div
      className="absolute top-full left-0 w-full z-50 bg-[#0A0C0F]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2"
    >
      {/* Top Subtle Electric Blue Signal Bar */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#0099FF] to-transparent opacity-60" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-8 lg:py-10">
        {/* Header row inside mega menu */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 font-mono text-[11px] text-[#8D949E] tracking-wider uppercase">
          <div className="flex items-center gap-4">
            <span className="text-[#0099FF] font-semibold">SERVICES</span>
            <span className="text-white/20">|</span>
            <SignalIndicator label="4 SERVICE AREAS" size="sm" />
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[#8D949E] hover:text-white transition-colors cursor-pointer"
          >
            <span>CLOSE</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Brand Positioning & Quick Action */}
          <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-[#0099FF] tracking-widest uppercase block">
                DIGITAL SERVICES
              </span>
              <h3 className="text-xl lg:text-2xl font-light text-[#F5F7FA] leading-tight">
                Websites, eCommerce, marketing and support from one place.
              </h3>
              <p className="text-xs text-[#8D949E] leading-relaxed">
                Choose a focused service or combine work into a practical digital plan for your business.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#5A626E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0099FF]" />
                <span>CLEAR SCOPE BEFORE WORK BEGINS</span>
              </div>

              <a
                href="#start"
                onClick={handleStartProjectClick}
                className="group flex items-center justify-between p-3 bg-white/[0.03] hover:bg-[#0099FF]/10 border border-white/10 hover:border-[#0099FF]/40 rounded-[2px] transition-all duration-200"
              >
                <div>
                  <div className="text-xs font-mono font-medium text-[#F5F7FA] group-hover:text-[#0099FF]">
                    START A PROJECT
                  </div>
                  <div className="text-[10px] text-[#8D949E]">Tell us what you need built or improved</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8D949E] group-hover:text-[#0099FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Section - 4 Core Pillars Grid */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {CAPABILITY_GROUPS.map((group) => (
              <div key={group.id} className="group/pillar flex flex-col justify-between">
                <div>
                  {/* Pillar Label & Title */}
                  <div className="pb-3 mb-4 border-b border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold text-[#0099FF] tracking-wider">
                      {group.numberLabel}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]/30 group-hover/pillar:bg-[#0099FF] group-hover/pillar:shadow-[0_0_8px_#0099FF] transition-all" />
                  </div>

                  <h4 className="text-base font-medium text-[#F5F7FA] mb-1 group-hover/pillar:text-white transition-colors">
                    {group.title}
                  </h4>
                  <p className="text-[11px] text-[#8D949E] mb-4 min-h-[32px] leading-snug">
                    {group.summary}
                  </p>

                  {/* Capability List Items */}
                  <ul className="space-y-2.5">
                    {group.items.map((item, idx) => (
                      <li key={idx} className="group/item">
                        <a
                          href="#services"
                          onClick={handleServicesClick}
                          className="block p-2 rounded-[2px] hover:bg-white/[0.04] transition-colors"
                        >
                          <div className="text-xs font-medium text-[#F5F7FA] group-hover/item:text-[#0099FF] flex items-center justify-between">
                            <span>{item.name}</span>
                            <ArrowIcon size={12} className="opacity-0 group-hover/item:opacity-100 text-[#0099FF] transition-opacity" />
                          </div>
                          <div className="text-[10px] text-[#5A626E] group-hover/item:text-[#8D949E] mt-0.5 line-clamp-1">
                            {item.description}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
