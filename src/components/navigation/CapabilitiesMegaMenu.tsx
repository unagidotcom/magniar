import React from 'react';
import { CAPABILITY_GROUPS } from '../../data/navigationData';
import { ArrowIcon } from '../common/ArrowIcon';
import { ArrowUpRight, ShieldCheck, X } from 'lucide-react';

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
    onNavigate?.('services');
  };

  const handleStartProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    if (onStartProject) onStartProject();
    else onNavigate?.('start-project');
  };

  return (
    <div className="absolute left-0 top-full z-50 w-full border-b border-[#D5D1C8] bg-[#F4F1EA]/98 shadow-[0_24px_60px_rgba(43,38,30,0.14)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6 lg:px-12 lg:py-8">
        <div className="mb-6 flex items-center justify-between border-b border-[#D5D1C8] pb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#686963]">
          <div className="flex items-center gap-3">
            <span className="text-[#20211F]">Services</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#B86F55]" />
            <span>4 service areas</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-[5px] border border-[#D5D1C8] bg-[#FAF9F6] px-3 py-1.5 text-[#686963] transition-colors hover:text-[#20211F]"
          >
            <span>Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-[6px] bg-[#242622] p-5 text-[#F4F1EA] lg:col-span-4 lg:p-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B86F55]">
              Digital services
            </span>
            <h3 className="mt-4 max-w-sm font-heading text-2xl font-semibold leading-tight">
              Websites, eCommerce, marketing and support from one place.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#D5D1C8]">
              Choose a focused service or combine work into a practical digital plan for your business.
            </p>

            <div className="mt-8 border-t border-[#F4F1EA]/12 pt-5">
              <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#D5D1C8]">
                <ShieldCheck className="h-4 w-4 text-[#B86F55]" />
                Clear scope before work begins
              </div>
              <a
                href="#start"
                onClick={handleStartProjectClick}
                className="group flex items-center justify-between rounded-[5px] bg-[#B86F55] p-4 text-[#F4F1EA] transition-colors hover:bg-[#8F4F3D]"
              >
                <span>
                  <span className="block text-sm font-semibold">Start a Project</span>
                  <span className="block text-xs text-[#F4F1EA]/78">Tell us what you need built or improved</span>
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {CAPABILITY_GROUPS.map((group, index) => (
              <div
                key={group.id}
                className={`rounded-[6px] border border-[#D5D1C8] p-4 ${index % 2 === 0 ? 'bg-[#E9E6DE]' : 'bg-[#FAF9F6]'}`}
              >
                <div className="mb-5 flex items-center justify-between border-b border-[#20211F]/10 pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#686963]">
                    {group.numberLabel}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#B86F55]" />
                </div>

                <h4 className="font-heading text-lg font-semibold text-[#20211F]">{group.title}</h4>
                <p className="mt-2 min-h-[54px] text-xs leading-5 text-[#686963]">{group.summary}</p>

                <ul className="mt-5 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href="#services"
                        onClick={handleServicesClick}
                        className="group/item flex items-center justify-between gap-2 rounded-[5px] px-2 py-2 text-sm font-medium text-[#20211F] transition-colors hover:bg-[#F4F1EA]"
                      >
                        <span className="truncate">{item.name}</span>
                        <ArrowIcon size={12} className="shrink-0 text-[#B86F55] opacity-0 transition-opacity group-hover/item:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
