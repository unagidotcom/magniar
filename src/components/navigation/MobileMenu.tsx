import React, { useState } from 'react';
import { MOBILE_NAV_LINKS, CAPABILITY_GROUPS } from '../../data/navigationData';
import { MagniarButton } from '../common/MagniarButton';
import { BrandLogo } from '../common/BrandLogo';
import { ChevronDown, X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
  setActiveTab?: (tab: string) => void;
  onStartProject?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  setActiveTab,
  onStartProject,
}) => {
  const [capabilitiesExpanded, setCapabilitiesExpanded] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLinkClick = (id: string) => {
    onClose();
    if (setActiveTab) {
      setActiveTab(id);
    } else if (onNavigate) {
      if (id === 'services') onNavigate('services');
      else if (id === 'process') onNavigate('process-page');
      else if (id === 'industries') onNavigate('industries-page');
      else if (id === 'work') onNavigate('work-page');
      else if (id === 'insights') onNavigate('insights-page');
      else if (id === 'about') onNavigate('about-page');
      else if (id === 'contact') onNavigate('contact-page');
      else onNavigate('homepage');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#F5F7FA] p-5 text-[#0B0D0F] transition-all duration-300 sm:p-8">
      <div className="flex items-center justify-between border-b border-[#D9DEE5] pb-5">
        <BrandLogo variant="wordmark" className="h-8 w-[164px]" />

        <button
          onClick={onClose}
          className="rounded-[5px] border border-[#D9DEE5] bg-[#FFFFFF] p-2 text-[#68717C] transition-colors hover:text-[#0B0D0F]"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="py-8">
        <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#68717C]">
          Navigation
        </div>

        <nav className="space-y-3">
          {MOBILE_NAV_LINKS.map((link, idx) => {
            const num = `0${idx + 1}`;
            if (link.hasMegaMenu) {
              return (
                <div key={link.id} className="rounded-[6px] border border-[#D9DEE5] bg-[#FFFFFF] p-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLinkClick(link.id)}
                      className="flex items-center gap-3 text-left"
                    >
                      <span className="text-xs font-bold text-[#B89A72]">{num}</span>
                      <span className="font-heading text-2xl font-semibold">{link.label}</span>
                    </button>

                    <button
                      onClick={() => setCapabilitiesExpanded(!capabilitiesExpanded)}
                      className="rounded-[5px] bg-[#F5F7FA] p-2 text-[#68717C]"
                      aria-label="Toggle services submenu"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          capabilitiesExpanded ? 'rotate-180 text-[#B89A72]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {capabilitiesExpanded && (
                    <div className="mt-5 space-y-4 border-t border-[#D9DEE5] pt-5">
                      {CAPABILITY_GROUPS.map((group) => (
                        <div key={group.id} className="space-y-2">
                          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B89A72]">
                            {group.numberLabel} / {group.title}
                          </div>
                          <div className="grid grid-cols-1 gap-1.5 text-sm text-[#68717C]">
                            {group.items.slice(0, 3).map((item) => (
                              <button
                                key={item.name}
                                onClick={() => handleLinkClick('services')}
                                className="block rounded-[5px] px-2 py-1.5 text-left transition-colors hover:bg-[#F5F7FA] hover:text-[#0B0D0F]"
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="flex w-full items-center justify-between rounded-[6px] border border-[#D9DEE5] bg-[#FFFFFF] p-4 text-left transition-colors hover:bg-white"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#B89A72]">{num}</span>
                  <span className="font-heading text-2xl font-semibold">{link.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4 border-t border-[#D9DEE5] pt-6">
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => {
              onClose();
              onNavigate?.('portal');
            }}
            className="block w-full text-left"
          >
            <MagniarButton
              variant="utility"
              fullWidth
              size="md"
              className="rounded-[5px] border-[#D9DEE5] bg-[#FFFFFF] text-[#0B0D0F] hover:bg-white"
            >
              CLIENT LOGIN
            </MagniarButton>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onStartProject) onStartProject();
              else onNavigate?.('start-project');
            }}
            className="block w-full text-left"
          >
            <MagniarButton
              variant="primary"
              fullWidth
              size="lg"
              className="rounded-[5px] !border-[#B89A72] !bg-[#B89A72] !text-[#FFFFFF] hover:!bg-[#8F714D] hover:shadow-none"
            >
              START A PROJECT
            </MagniarButton>
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#68717C]">
          <span>2026 MAGNIAR</span>
          <span>Digital services</span>
        </div>
      </div>
    </div>
  );
};
