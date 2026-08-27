import React from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface FooterProps {
  onNavigate?: (route: string) => void;
  onStartProject?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onStartProject }) => {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();

    if (href === '#start') {
      onStartProject?.();
    } else if (href === '#home') {
      onNavigate?.('homepage');
    } else if (href === '#services') {
      onNavigate?.('services');
    } else if (href === '#about') {
      onNavigate?.('about-page');
    } else if (href === '#work') {
      onNavigate?.('work-page');
    } else if (href === '#insights') {
      onNavigate?.('insights-page');
    } else if (href === '#contact') {
      onNavigate?.('contact-page');
    } else if (href === '#privacy') {
      onNavigate?.('privacy-page');
    } else if (href === '#terms') {
      onNavigate?.('terms-page');
    } else if (href === '/portal') {
      onNavigate?.('portal');
    } else if (href === '/admin/login') {
      onNavigate?.('admin-login');
    }
  };

  const serviceLinks = ['Websites', 'eCommerce', 'Marketing', 'Maintenance'];
  const companyLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="w-full border-t border-[#D9DEE5] bg-[#FFFFFF] px-4 py-7 text-[#68717C] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1320px] space-y-6">
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(220px,1fr)_minmax(250px,1.25fr)_minmax(190px,0.9fr)_minmax(120px,0.65fr)_minmax(120px,0.65fr)_minmax(180px,0.85fr)]">
          <div>
            <a
              href="#home"
              onClick={(event) => handleLinkClick(event, '#home')}
              className="inline-flex h-14 items-center transition-opacity hover:opacity-80"
              aria-label="Magniar & Co home"
            >
              <BrandLogo variant="full" className="h-full w-[150px]" />
            </a>
            <p className="mt-3 max-w-xs text-sm leading-6">
              Digital experiences built to grow your business.
            </p>
            <a
              href="#start"
              onClick={(event) => handleLinkClick(event, '#start')}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#B89A72] transition-colors hover:text-[#8F714D]"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B0D0F]">Contact</h3>
            <div className="space-y-2 text-xs leading-5">
              <p className="font-semibold text-[#0B0D0F]">Rain</p>
              <a href="mailto:magniarventures@gmail.com" className="flex items-start gap-2 break-words transition-colors hover:text-[#0B0D0F]">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B89A72]" />
                <span>magniarventures@gmail.com</span>
              </a>
              <a href="tel:8798250520" className="flex items-center gap-2 transition-colors hover:text-[#0B0D0F]">
                <Phone className="h-3.5 w-3.5 text-[#B89A72]" />
                8798250520
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B89A72]" />
                Gurgaon, Haryana, India
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B0D0F]">Business</h3>
            <div className="space-y-3 text-xs leading-5">
              <div>
                <span className="block uppercase tracking-[0.1em] text-[#68717C]">Udyam Registration No.</span>
                <span className="font-medium text-[#0B0D0F]">UDYAM-HR-OS-0177833</span>
              </div>
              <div>
                <span className="block uppercase tracking-[0.1em] text-[#68717C]">Enterprise Type</span>
                <span className="font-medium text-[#0B0D0F]">Micro</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B0D0F]">Services</h3>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a href="#services" onClick={(event) => handleLinkClick(event, '#services')} className="transition-colors hover:text-[#B89A72]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B0D0F]">Company</h3>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(event) => handleLinkClick(event, link.href)} className="transition-colors hover:text-[#B89A72]">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/admin/login" onClick={(event) => handleLinkClick(event, '/admin/login')} className="transition-colors hover:text-[#B89A72]">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B0D0F]">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#privacy" onClick={(event) => handleLinkClick(event, '#privacy')} className="transition-colors hover:text-[#B89A72]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(event) => handleLinkClick(event, '#terms')} className="transition-colors hover:text-[#B89A72]">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <span className="text-[#68717C]">Cancellation & Refund Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-[#D9DEE5] pt-4 text-[11px] text-[#68717C] sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>2026 MAGNIAR. All rights reserved.</span>
            <a href="#privacy" onClick={(event) => handleLinkClick(event, '#privacy')} className="transition-colors hover:text-[#0B0D0F]">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(event) => handleLinkClick(event, '#terms')} className="transition-colors hover:text-[#0B0D0F]">
              Terms & Conditions
            </a>
            <span>Cancellation & Refund Policy</span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/portal" onClick={(event) => handleLinkClick(event, '/portal')} className="transition-colors hover:text-[#0B0D0F]">
              Client Login
            </a>
            <a href="/admin/login" onClick={(event) => handleLinkClick(event, '/admin/login')} className="transition-colors hover:text-[#0B0D0F]">
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
