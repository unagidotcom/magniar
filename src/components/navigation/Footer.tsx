import React from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

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
    <footer className="w-full border-t border-[#2E342C] bg-[#171A16] px-4 py-10 text-[#D8D0C4] sm:px-6 lg:px-12">
      <div className="mx-auto max-w-[1180px] space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(event) => handleLinkClick(event, '#home')}
              className="inline-flex items-center gap-3 font-heading text-lg font-extrabold tracking-[0.16em] text-[#FFF9EE]"
            >
              MAGNIAR
              <span className="h-1.5 w-1.5 rounded-full bg-[#F0D84C]" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6">
              Digital experiences built to grow your business.
            </p>
            <a
              href="#start"
              onClick={(event) => handleLinkClick(event, '#start')}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F0D84C] transition-colors hover:text-[#FFF9EE]"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-7 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            <div className="col-span-2 space-y-3 sm:col-span-1">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFF9EE]">Contact</h3>
              <div className="space-y-2.5 text-xs leading-5">
                <p className="font-semibold text-[#FFF9EE]">Raingam Luikham</p>
                <a href="mailto:magniarventures@gmail.com" className="flex items-start gap-2 break-all transition-colors hover:text-[#FFF9EE]">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F0D84C]" />
                  magniarventures@gmail.com
                </a>
                <a href="tel:8798250520" className="flex items-center gap-2 transition-colors hover:text-[#FFF9EE]">
                  <Phone className="h-3.5 w-3.5 text-[#F0D84C]" />
                  8798250520
                </a>
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F0D84C]" />
                  Gurgaon, Haryana, India
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFF9EE]">Business</h3>
              <div className="space-y-3 text-xs leading-5">
                <div>
                  <span className="block uppercase tracking-[0.1em] text-[#928A7D]">Udyam Registration No.</span>
                  <span className="font-medium text-[#FFF9EE]">UDYAM-HR-OS-0177833</span>
                </div>
                <div>
                  <span className="block uppercase tracking-[0.1em] text-[#928A7D]">Enterprise Type</span>
                  <span className="font-medium text-[#FFF9EE]">Micro</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFF9EE]">Services</h3>
              <ul className="space-y-2 text-xs">
                {serviceLinks.map((label) => (
                  <li key={label}>
                    <a href="#services" onClick={(event) => handleLinkClick(event, '#services')} className="transition-colors hover:text-[#F0D84C]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFF9EE]">Company</h3>
              <ul className="space-y-2 text-xs">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={(event) => handleLinkClick(event, link.href)} className="transition-colors hover:text-[#F0D84C]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FFF9EE]">Legal</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#privacy" onClick={(event) => handleLinkClick(event, '#privacy')} className="transition-colors hover:text-[#F0D84C]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" onClick={(event) => handleLinkClick(event, '#terms')} className="transition-colors hover:text-[#F0D84C]">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <span className="text-[#928A7D]">Cancellation & Refund Policy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-[#2E342C] pt-5 text-[11px] text-[#928A7D] sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>2026 MAGNIAR. All rights reserved.</span>
            <a href="#privacy" onClick={(event) => handleLinkClick(event, '#privacy')} className="transition-colors hover:text-[#FFF9EE]">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(event) => handleLinkClick(event, '#terms')} className="transition-colors hover:text-[#FFF9EE]">
              Terms & Conditions
            </a>
            <span>Cancellation & Refund Policy</span>
          </div>

          <a href="/portal" onClick={(event) => handleLinkClick(event, '/portal')} className="transition-colors hover:text-[#FFF9EE]">
            Client Login
          </a>
        </div>
      </div>
    </footer>
  );
};
