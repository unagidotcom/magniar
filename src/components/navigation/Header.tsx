import React, { useState, useEffect } from 'react';
import { PRIMARY_NAV_LINKS } from '../../data/navigationData';
import { MagniarButton } from '../common/MagniarButton';
import { BrandLogo } from '../common/BrandLogo';
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
        sticky top-0 z-40 w-full transition-all duration-300 ease-out h-[60px] lg:h-[64px] flex items-center
        ${isScrolled 
          ? 'bg-[#F5F7FA]/94 backdrop-blur-md border-b border-[#D9DEE5] shadow-[0_10px_34px_rgba(11,13,15,0.10)]'
          : 'bg-[#F5F7FA]/88 backdrop-blur-md border-b border-[#D9DEE5]'
        }
      `}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT ZONE - MAGNIAR Brand Wordmark */}
        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('homepage');
              else if (setActiveTab) setActiveTab('homepage');
            }}
            className="group flex h-9 items-center transition-opacity hover:opacity-80 sm:h-10"
            aria-label="Magniar & Co home"
          >
            <BrandLogo variant="wordmark" className="h-full w-[170px] sm:w-[192px]" />
          </a>
        </div>

        {/* CENTER ZONE — Primary Navigation (Capabilities, Work, Insights, About) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {PRIMARY_NAV_LINKS.map((link) => {
            const isActive = activeTab === link.id;

            if (link.hasMegaMenu) {
              return (
                <div key={link.id} className="relative py-2">
                  <button
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    className={`
                      group font-sans text-xs tracking-wide uppercase transition-colors duration-200
                      flex items-center gap-1.5 cursor-pointer select-none py-1
                      ${megaMenuOpen || isActive
                        ? 'text-[#0B0D0F] font-semibold'
                        : 'text-[#68717C] hover:text-[#0B0D0F]'
                      }
                    `}
                    aria-expanded={megaMenuOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        megaMenuOpen ? 'rotate-180 text-[#B89A72]' : 'text-[#68717C] group-hover:text-[#0B0D0F]'
                      }`}
                    />
                    {(megaMenuOpen || isActive) && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
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
                  relative font-sans text-xs tracking-wide uppercase transition-colors duration-200 py-1 cursor-pointer
                  ${isActive
                    ? 'text-[#0B0D0F] font-semibold'
                    : 'text-[#68717C] hover:text-[#0B0D0F]'
                  }
                `}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* RIGHT ZONE — Client Login & Primary CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Client Login (Secondary, Quiet Text Link) */}
          <a
            href="/portal"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('portal');
            }}
            className="hidden lg:flex items-center gap-1.5 font-sans text-xs font-medium text-[#68717C] hover:text-[#0B0D0F] transition-colors tracking-wide uppercase group py-2 cursor-pointer"
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
            <MagniarButton variant="primary" size="sm" className="rounded-[5px] !border-[#B89A72] !bg-[#B89A72] !text-[#FFFFFF] hover:!bg-[#8F714D] hover:shadow-none">
              START A PROJECT
            </MagniarButton>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="#start"
            className="hidden min-[360px]:block sm:hidden"
            onClick={(e) => {
              e.preventDefault();
              if (onStartProject) {
                onStartProject();
              } else if (onNavigate) {
                onNavigate('start-project');
              }
            }}
          >
            <MagniarButton variant="primary" size="sm" className="rounded-[5px] !border-[#B89A72] !bg-[#B89A72] !text-[#FFFFFF] hover:!bg-[#8F714D] hover:shadow-none">
              START
            </MagniarButton>
          </a>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="px-3 py-2 text-[#0B0D0F] hover:text-[#8F714D] border border-[#D9DEE5] rounded-[5px] bg-[#FFFFFF] hover:bg-white cursor-pointer flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wider uppercase"
            aria-label="Open navigation menu"
          >
            <span>MENU</span>
            <Menu className="w-4 h-4 text-[#B89A72]" />
          </button>
        </div>
      </div>

      {/* Capabilities Mega Menu Overlay */}
      <CapabilitiesMegaMenu
        isOpen={megaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
        onStartProject={onStartProject}
        onNavigate={onNavigate}
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
