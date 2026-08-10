import React from 'react';
import { FOOTER_COLUMNS } from '../../data/navigationData';
import { MagniarButton } from '../common/MagniarButton';
import { SignalIndicator } from '../common/SignalIndicator';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { ArrowIcon } from '../common/ArrowIcon';
import { Globe, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate?: (route: string) => void;
  onStartProject?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onStartProject }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#start') {
      if (onStartProject) onStartProject();
      else if (onNavigate) onNavigate('start-project');
    } else if (href === '#login' || href === '/portal' || href === '#portal') {
      if (onNavigate) onNavigate('portal');
    } else if (href === '/admin/login' || href === '/admin' || href === '#admin' || href === '#admin/login') {
      if (onNavigate) onNavigate('admin-login');
    } else if (href === '#privacy') {
      if (onNavigate) onNavigate('privacy-page');
    } else if (href === '#terms') {
      if (onNavigate) onNavigate('terms-page');
    } else if (href === '#contact') {
      if (onNavigate) onNavigate('contact-page');
    } else if (href === '#about') {
      if (onNavigate) onNavigate('about-page');
    } else if (href === '#capabilities') {
      if (onNavigate) onNavigate('capabilities-page');
    } else if (href === '#process') {
      if (onNavigate) onNavigate('process-page');
    } else if (href === '#work') {
      if (onNavigate) onNavigate('work-page');
    } else if (href === '#insights') {
      if (onNavigate) onNavigate('insights-page');
    } else if (onNavigate) {
      onNavigate('homepage');
    }
  };
  return (
    <footer className="w-full bg-[#050505] text-[#F5F7FA] border-t border-white/10 relative overflow-hidden pt-16 pb-12">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 magniar-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Editorial Closing Statement CTA Block */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-16 border-b border-white/10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <TechnicalLabel variant="active" size="sm">
                02 / GLOBAL GROWTH PARTNER
              </TechnicalLabel>
              <SignalIndicator label="ACCEPTING NEW CLIENTS" size="sm" />
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-[#F5F7FA] leading-tight">
              BUILD YOUR NEXT <br className="hidden sm:inline" />
              <span className="font-extrabold text-white">GROWTH SYSTEM.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Partner with Magniar to engineer predictable revenue across performance marketing, social commerce, custom web infrastructure, and AI strategy.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-start lg:items-end">
            <a href="#start" className="w-full sm:w-auto">
              <MagniarButton variant="primary" size="lg" fullWidth>
                START A PROJECT
              </MagniarButton>
            </a>
            <a href="/portal" onClick={(e) => handleLinkClick(e, '/portal')} className="w-full sm:w-auto">
              <MagniarButton variant="utility" size="lg" fullWidth>
                CLIENT PORTAL
              </MagniarButton>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <a href="#" className="font-heading text-2xl font-extrabold tracking-[0.2em] text-[#F5F7FA] block">
                MAGNIAR
              </a>
              <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
                Global marketing, development, commerce, and AI strategy agency serving ambitious small-to-mid-sized businesses internationally.
              </p>
            </div>

            <div className="p-5 bg-[#0A0C0F] border border-white/10 rounded-[2px] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0099FF] tracking-wider uppercase">
                <span>GLOBAL DELIVERY ENGINE</span>
                <Globe className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-400 font-sans">
                US • UK • EUROPE • APAC • LATAM
              </div>
              <div className="text-xs font-sans text-slate-300 pt-2 border-t border-white/5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-pulse" />
                <span>24/7 MULTI-CHANNEL CAMPAIGN MONITORING</span>
              </div>
            </div>
          </div>

          {/* 4 Structured Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col, idx) => (
              <div key={idx} className="space-y-4">
                <div className="pb-2 border-b border-white/10 font-heading text-xs font-bold text-[#F5F7FA] tracking-wider flex items-center justify-between uppercase">
                  <span>{col.title}</span>
                  {col.numberLabel && (
                    <span className="text-xs text-[#0099FF] font-mono">{col.numberLabel}</span>
                  )}
                </div>

                <ul className="space-y-2 text-sm">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-slate-300 hover:text-[#0099FF] transition-colors flex items-center justify-between group py-1 cursor-pointer"
                      >
                        <span>{link.label}</span>
                        {link.badge ? (
                          <span className="text-[10px] font-sans px-1.5 py-0.5 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] uppercase">
                            {link.badge}
                          </span>
                        ) : (
                          <ArrowIcon size={12} className="opacity-0 group-hover:opacity-100 text-[#0099FF] transition-opacity" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pt-8 border-t border-white/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-slate-300">© 2026 MAGNIAR AGENCY LLC. ALL RIGHTS RESERVED.</span>
          <span>|</span>
          <a href="#privacy" onClick={(e) => handleLinkClick(e, '#privacy')} className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</a>
          <a href="#terms" onClick={(e) => handleLinkClick(e, '#terms')} className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</a>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Lock className="w-3.5 h-3.5 text-[#0099FF]" />
          <span>ENCRYPTED CLIENT WORKSPACE PORTAL</span>
        </div>
      </div>
    </footer>
  );
};
