import React, { useState, useEffect } from 'react';
import { PRIMARY_NAV_LINKS } from '../../data/navigationData';
import { MagniarButton } from '../common/MagniarButton';
import { CapabilitiesMegaMenu } from './CapabilitiesMegaMenu';
import { MobileMenu } from './MobileMenu';
import { ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  isScrolledSimulated?: boolean;
  onSimulateScrollToggle?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onStartProject?: () => void;
  onNavigate?: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isScrolledSimulated = false,
  activeTab = 'capabilities',
  setActiveTab,
  onStartProject,
  onNavigate,
}) => {
  const [isScrolledReal, setIsScrolledReal] = useState<boolean>(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Listen to actual browser scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolledReal(true);
      } else {
        setIsScrolledReal(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = isScrolledReal || isScrolledSimulated;

  return (
    <header
      className={`
        sticky top-0 z-40 w-full transition-all duration-300 ease-out h-[76px] lg:h-[84px] flex items-center
        ${isScrolled 
          ? 'bg-[#050505]/92 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent border-b border-white/5'
        }
      `}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* LEFT ZONE — MAGNIAR Brand Wordmark */}
        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('homepage');
              else if (setActiveTab) setActiveTab('homepage');
            }}
            className="group flex items-center gap-3 font-heading text-xl sm:text-2xl font-extrabold tracking-[0.2em] text-[#F5F7FA] hover:text-white transition-colors select-none"
          >
            <span>MAGNIAR</span>
            {/* Subtle electric blue signal dot anchor */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]" />
          </a>
        </div>

        {/* CENTER ZONE — Primary Navigation (Capabilities, Work, Insights, About) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive = activeTab === link.id;

            if (link.hasMegaMenu) {
              return (
                <div key={link.id} className="relative py-2">
                  <button
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    className={`
                      group font-sans text-sm tracking-wide uppercase transition-colors duration-200
                      flex items-center gap-1.5 cursor-pointer select-none py-1
                      ${megaMenuOpen || isActive
                        ? 'text-[#F5F7FA] font-semibold' 
                        : 'text-slate-300 hover:text-[#F5F7FA]'
                      }
                    `}
                    aria-expanded={megaMenuOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        megaMenuOpen ? 'rotate-180 text-[#0099FF]' : 'text-slate-400 group-hover:text-white'
                      }`}
                    />
                    {(megaMenuOpen || isActive) && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0099FF] shadow-[0_0_6px_#0099FF]" />
                    )}
                  </button>
                </div>
              );
            }

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMegaMenuOpen(false);
                  if (setActiveTab) setActiveTab(link.id);
                  else if (onNavigate) onNavigate(`${link.id}-page`);
                }}
                className={`
                  relative font-sans text-sm tracking-wide uppercase transition-colors duration-200 py-1 cursor-pointer
                  ${isActive
                    ? 'text-[#F5F7FA] font-semibold'
                    : 'text-slate-300 hover:text-[#F5F7FA]'
                  }
                `}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0099FF] shadow-[0_0_6px_#0099FF]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* RIGHT ZONE — Client Login & Primary CTA */}
        <div className="hidden sm:flex items-center gap-6">
          {/* Client Login (Secondary, Quiet Text Link) */}
          <a
            href="/portal"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('portal');
            }}
            className="hidden lg:flex items-center gap-1.5 font-sans text-sm font-medium text-slate-300 hover:text-white transition-colors tracking-wide uppercase group py-2 cursor-pointer"
          >
            <span>CLIENT LOGIN</span>
          </a>

          {/* Primary CTA */}
          <a
            href="#start"
            onClick={(e) => {
              e.preventDefault();
              if (onStartProject) {
                onStartProject();
              } else if (onNavigate) {
                onNavigate('start-project');
              }
            }}
          >
            <MagniarButton variant="primary" size="md">
              START A PROJECT
            </MagniarButton>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="#start"
            className="sm:hidden"
            onClick={(e) => {
              e.preventDefault();
              if (onStartProject) {
                onStartProject();
              } else if (onNavigate) {
                onNavigate('start-project');
              }
            }}
          >
            <MagniarButton variant="primary" size="sm">
              START
            </MagniarButton>
          </a>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="px-3.5 py-2 text-slate-200 hover:text-white border border-white/15 rounded-[2px] bg-white/[0.03] hover:bg-white/[0.08] cursor-pointer flex items-center gap-2 font-sans text-xs font-semibold tracking-wider uppercase"
            aria-label="Open navigation menu"
          >
            <span>MENU</span>
            <Menu className="w-4 h-4 text-[#0099FF]" />
          </button>
        </div>
      </div>

      {/* Capabilities Mega Menu Overlay */}
      <CapabilitiesMegaMenu
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
      />

      {/* Mobile Fullscreen Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={onNavigate}
        setActiveTab={setActiveTab}
        onStartProject={onStartProject}
      />
    </header>
  );
};
