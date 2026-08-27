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
    <div className="absolute left-0 top-full z-50 w-full border-b border-[#D9DEE5] bg-[#F5F7FA]/98 shadow-[0_24px_60px_rgba(11,13,15,0.14)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6 lg:px-12 lg:py-8">
        <div className="mb-6 flex items-center justify-between border-b border-[#D9DEE5] pb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#68717C]">
          <div className="flex items-center gap-3">
            <span className="text-[#0B0D0F]">Services</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#B89A72]" />
            <span>4 service areas</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-[5px] border border-[#D9DEE5] bg-[#FFFFFF] px-3 py-1.5 text-[#68717C] transition-colors hover:text-[#0B0D0F]"
          >
            <span>Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-[6px] bg-[#0B0D0F] p-5 text-[#F5F7FA] lg:col-span-4 lg:p-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B89A72]">
              Digital services
            </span>
            <h3 className="mt-4 max-w-sm font-heading text-2xl font-semibold leading-tight">
              Websites, eCommerce, marketing and support from one place.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#D9DEE5]">
              Choose a focused service or combine work into a practical digital plan for your business.
            </p>

            <div className="mt-8 border-t border-[#F5F7FA]/12 pt-5">
              <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#D9DEE5]">
                <ShieldCheck className="h-4 w-4 text-[#B89A72]" />
                Clear scope before work begins
              </div>
              <a
                href="#start"
                onClick={handleStartProjectClick}
                className="group flex items-center justify-between rounded-[5px] bg-[#B89A72] p-4 text-[#FFFFFF] transition-colors hover:bg-[#8F714D]"
              >
                <span>
                  <span className="block text-sm font-semibold">Start a Project</span>
                  <span className="block text-xs text-[#F5F7FA]/78">Tell us what you need built or improved</span>
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {CAPABILITY_GROUPS.map((group, index) => (
              <div
                key={group.id}
                className={`rounded-[6px] border border-[#D9DEE5] p-4 ${index % 2 === 0 ? 'bg-[#F4EFE8]' : 'bg-[#FFFFFF]'}`}
              >
                <div className="mb-5 flex items-center justify-between border-b border-[#0B0D0F]/10 pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#68717C]">
                    {group.numberLabel}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#B89A72]" />
                </div>

                <h4 className="font-heading text-lg font-semibold text-[#0B0D0F]">{group.title}</h4>
                <p className="mt-2 min-h-[54px] text-xs leading-5 text-[#68717C]">{group.summary}</p>

                <ul className="mt-5 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href="#services"
                        onClick={handleServicesClick}
                        className="group/item flex items-center justify-between gap-2 rounded-[5px] px-2 py-2 text-sm font-medium text-[#0B0D0F] transition-colors hover:bg-[#F5F7FA]"
                      >
                        <span className="truncate">{item.name}</span>
                        <ArrowIcon size={12} className="shrink-0 text-[#B89A72] opacity-0 transition-opacity group-hover/item:opacity-100" />
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
