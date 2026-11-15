import React from 'react';
import { ArrowRight } from 'lucide-react';
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
    <footer
      id="site-footer"
      className="w-full border-t border-[var(--magniar-border)] bg-[var(--magniar-surface)] px-5 text-[var(--magniar-text-secondary)] sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-8 border-b border-[var(--magniar-border)] py-12 md:grid-cols-12 md:items-end md:py-14">
          <div className="md:col-span-8 lg:col-span-9">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B89A72]">
              Work with Magniar
            </span>
            <h2 className="mt-4 max-w-[780px] font-heading text-3xl font-semibold leading-[1.12] text-[var(--magniar-text-primary)] sm:text-4xl">
              Digital experiences built for businesses ready to grow.
            </h2>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end lg:col-span-3">
            <a
              href="#start"
              onClick={(event) => handleLinkClick(event, '#start')}
              className="group inline-flex min-h-12 items-center gap-5 border-b border-[#B89A72] pb-2 text-sm font-semibold text-[var(--magniar-text-primary)] transition-colors hover:text-[#B89A72]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="grid gap-y-11 py-12 sm:grid-cols-2 sm:gap-x-10 md:grid-cols-12 md:gap-x-8 lg:py-14">
          <div className="sm:col-span-2 md:col-span-5 md:pr-8 lg:col-span-5 lg:pr-16">
            <a
              href="#home"
              onClick={(event) => handleLinkClick(event, '#home')}
              className="inline-flex h-9 items-center transition-opacity hover:opacity-70"
              aria-label="Magniar & Co home"
            >
              <BrandLogo variant="wordmark" className="h-full w-[158px]" />
            </a>
            <p className="mt-6 max-w-[390px] text-sm leading-7 text-[var(--magniar-text-secondary)]">
              Strategy, design, development, commerce, and growth marketing from one focused team in Gurgaon, India.
            </p>
            <address className="mt-6 space-y-1 text-sm leading-6 not-italic">
              <p className="font-semibold text-[var(--magniar-text-primary)]">Rain</p>
              <a
                href="mailto:magniarventures@gmail.com"
                className="block w-fit break-words transition-colors hover:text-[#B89A72]"
              >
                magniarventures@gmail.com
              </a>
              <a
                href="tel:8798250520"
                className="block w-fit transition-colors hover:text-[#B89A72]"
              >
                8798250520
              </a>
            </address>
          </div>

          <nav className="md:col-span-2" aria-label="Footer services">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--magniar-text-primary)]">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#services"
                    onClick={(event) => handleLinkClick(event, '#services')}
                    className="transition-colors hover:text-[#B89A72]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Footer company navigation">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--magniar-text-primary)]">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href)}
                    className="transition-colors hover:text-[#B89A72]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 md:col-span-3 md:pl-2">
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--magniar-text-primary)]">
              Access
            </h3>
            <div className="space-y-4">
              <a
                href="/portal"
                onClick={(event) => handleLinkClick(event, '/portal')}
                className="group flex items-center justify-between border-b border-[var(--magniar-border)] pb-3 text-sm font-medium text-[var(--magniar-text-primary)] transition-colors hover:text-[#B89A72]"
              >
                Client Login
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="/admin/login"
                onClick={(event) => handleLinkClick(event, '/admin/login')}
                className="group flex items-center justify-between border-b border-[var(--magniar-border)] pb-3 text-sm font-medium text-[var(--magniar-text-primary)] transition-colors hover:text-[#B89A72]"
              >
                Admin Login
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-5 border-t border-[var(--magniar-border)] py-6 text-[11px] leading-5 text-[var(--magniar-text-muted)] md:grid-cols-[1fr_auto] md:items-center md:gap-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>{new Date().getFullYear()} MAGNIAR. All rights reserved.</span>
            <span className="hidden h-3 w-px bg-[var(--magniar-border)] sm:block" aria-hidden="true" />
            <span>UDYAM-HR-OS-0177833</span>
            <span>Micro enterprise</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            <a
              href="#privacy"
              onClick={(event) => handleLinkClick(event, '#privacy')}
              className="transition-colors hover:text-[var(--magniar-text-primary)]"
            >
              Privacy
            </a>
            <a
              href="#terms"
              onClick={(event) => handleLinkClick(event, '#terms')}
              className="transition-colors hover:text-[var(--magniar-text-primary)]"
            >
              Terms
            </a>
            <span>Cancellation &amp; Refund</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
