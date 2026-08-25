import React, { useState } from 'react';
import { MOBILE_NAV_LINKS, CAPABILITY_GROUPS } from '../../data/navigationData';
import { MagniarButton } from '../common/MagniarButton';
import { X, ChevronDown } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto p-5 sm:p-8 transition-all duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-[#F5F7FA] tracking-[0.2em] uppercase">
            MAGNIAR
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#8D949E] hover:text-white border border-white/10 rounded-[2px] bg-white/[0.02] cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="py-8 space-y-6">
        <div className="font-mono text-[10px] text-[#0099FF] tracking-[0.2em] uppercase mb-4">
          MAGNIAR NAVIGATION
        </div>

        <nav className="space-y-4">
          {MOBILE_NAV_LINKS.map((link, idx) => {
            const num = `0${idx + 1}`;
            if (link.hasMegaMenu) {
              return (
                <div key={link.id} className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between py-2">
                    <button
                      onClick={() => handleLinkClick(link.id)}
                      className="flex items-center gap-3 group text-left cursor-pointer"
                    >
                      <span className="font-mono text-xs text-[#0099FF]">{num}</span>
                      <span className="text-xl font-light text-[#F5F7FA] group-hover:text-white">
                        {link.label}
                      </span>
                    </button>

                    <button
                      onClick={() => setCapabilitiesExpanded(!capabilitiesExpanded)}
                      className="p-2 text-[#8D949E] hover:text-white cursor-pointer"
                      aria-label="Toggle capabilities submenu"
                    >
                      <ChevronDown
                        className={`w-5 h-5 text-[#8D949E] transition-transform duration-200 ${
                          capabilitiesExpanded ? 'rotate-180 text-[#0099FF]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expandable Capabilities on Mobile */}
                  {capabilitiesExpanded && (
                    <div className="mt-4 pl-6 space-y-5 border-l border-[#0099FF]/30 py-2 animate-in fade-in duration-200">
                      {CAPABILITY_GROUPS.map((group) => (
                        <div key={group.id} className="space-y-2">
                          <div className="font-mono text-[10px] text-[#0099FF] font-semibold tracking-wider">
                            {group.numberLabel} — {group.title}
                          </div>
                          <div className="grid grid-cols-1 gap-1.5 text-xs text-[#8D949E]">
                            {group.items.slice(0, 3).map((item, i) => (
                              <button
                                key={i}
                                onClick={() => handleLinkClick('services')}
                                className="hover:text-[#F5F7FA] transition-colors py-0.5 block text-left"
                              >
                                • {item.name}
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
              <div key={link.id} className="border-b border-white/10 pb-4">
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className="w-full flex items-center justify-between py-2 group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#0099FF]">{num}</span>
                    <span className="text-xl font-light text-[#F5F7FA] group-hover:text-white">
                      {link.label}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions Area */}
      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => {
              onClose();
              if (onNavigate) onNavigate('portal');
            }}
            className="block w-full text-left cursor-pointer"
          >
            <MagniarButton variant="utility" fullWidth size="md">
              CLIENT LOGIN →
            </MagniarButton>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onStartProject) onStartProject();
              else if (onNavigate) onNavigate('start-project');
            }}
            className="block w-full text-left"
          >
            <MagniarButton variant="primary" fullWidth size="lg">
              START A PROJECT →
            </MagniarButton>
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#5A626E] pt-2">
          <span>© 2026 MAGNIAR</span>
          <span className="text-[#0099FF]">DIGITAL SERVICES</span>
        </div>
      </div>
    </div>
  );
};
