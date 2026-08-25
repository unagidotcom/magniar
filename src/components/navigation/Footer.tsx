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
    <footer className="w-full bg-[#050505] text-[#F5F7FA] border-t border-white/10 px-4 sm:px-6 lg:px-12 py-14 sm:py-16">
      <div className="max-w-[1440px] mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 space-y-5">
            <a
              href="#home"
              onClick={(event) => handleLinkClick(event, '#home')}
              className="font-heading text-2xl font-extrabold tracking-[0.2em] text-white inline-block"
            >
              MAGNIAR
            </a>
            <p className="text-base text-slate-300 leading-relaxed max-w-sm">
              Digital experiences built to grow your business.
            </p>
            <a
              href="#start"
              onClick={(event) => handleLinkClick(event, '#start')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0099FF] hover:text-white transition-colors"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Contact</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="font-semibold text-white">Raingam Luikham</p>
                <a href="mailto:magniarventures@gmail.com" className="flex items-start gap-2 hover:text-white transition-colors break-all">
                  <Mail className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
                  magniarventures@gmail.com
                </a>
                <a href="tel:8798250520" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#0099FF]" />
                  8798250520
                </a>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
                  Gurgaon, Haryana, India
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Business Information</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <span className="block text-slate-500 text-xs uppercase">Udyam Registration No.</span>
                  <span className="text-white font-medium">UDYAM-HR-OS-0177833</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-xs uppercase">Enterprise Type</span>
                  <span className="text-white font-medium">Micro</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Services</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {serviceLinks.map((label) => (
                  <li key={label}>
                    <a href="#services" onClick={(event) => handleLinkClick(event, '#services')} className="hover:text-[#0099FF] transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Company</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={(event) => handleLinkClick(event, link.href)} className="hover:text-[#0099FF] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <a href="#privacy" onClick={(event) => handleLinkClick(event, '#privacy')} className="hover:text-[#0099FF] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" onClick={(event) => handleLinkClick(event, '#terms')} className="hover:text-[#0099FF] transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <span className="text-slate-500">Cancellation & Refund Policy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
            <span>© 2026 MAGNIAR. All rights reserved.</span>
            <a href="#privacy" onClick={(event) => handleLinkClick(event, '#privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(event) => handleLinkClick(event, '#terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <span className="text-slate-500">Cancellation & Refund Policy</span>
          </div>

          <a href="/portal" onClick={(event) => handleLinkClick(event, '/portal')} className="text-xs text-slate-400 hover:text-white transition-colors">
            Client Login
          </a>
        </div>
      </div>
    </footer>
  );
};
