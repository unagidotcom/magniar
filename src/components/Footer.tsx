import { Sparkles, Linkedin, Instagram, Twitter, ArrowUp, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const agencyEmail = "magniarventures@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(agencyEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const servicesLinks = [
    { label: "Google Ads Management", id: "services" },
    { label: "Meta Ads & Storyboarding", id: "services" },
    { label: "TikTok Shop Growth & Ads", id: "services" },
    { label: "Bespoke Web Development", id: "services" },
  ];

  const frameworkLinks = [
    { label: "Case Audits", id: "case-studies" },
    { label: "Growth Framework", id: "process" },
    { label: "Positioning", id: "about" },
  ];

  return (
    <footer className="relative overflow-hidden bg-bg-secondary pt-20 pb-12 border-t border-border-primary" id="main-footer">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Top Grid section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4" id="footer-top-grid">
          
          {/* Logo & Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-tr from-brand-blue to-brand-pink p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-bg-secondary">
                  <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
                </div>
              </div>
              <span className="font-display text-base font-bold tracking-tight text-text-primary">
                Magniar <span className="text-gradient">& Co.</span>
              </span>
            </div>

            <p className="font-sans text-sm leading-relaxed text-text-tertiary">
              A high-end growth engineering agency focused on paid acquisition, marketplaces, and conversion development architectures.
            </p>

            {/* Social Links */}
            <div className="flex gap-3" id="footer-socials">
              <a
                href="https://linkedin.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-primary bg-bg-primary text-text-tertiary transition-colors hover:border-brand-pink hover:bg-card-hover-bg hover:text-text-primary"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-primary bg-bg-primary text-text-tertiary transition-colors hover:border-brand-pink hover:bg-card-hover-bg hover:text-text-primary"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-primary bg-bg-primary text-text-tertiary transition-colors hover:border-brand-pink hover:bg-card-hover-bg hover:text-text-primary"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: services catalog */}
          <div>
            <span className="block font-display text-sm font-bold uppercase tracking-wider text-text-primary">Services Suite</span>
            <ul className="mt-4 space-y-2.5">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`#${link.id}`}
                    className="font-sans text-sm text-text-tertiary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: framework */}
          <div>
            <span className="block font-display text-sm font-bold uppercase tracking-wider text-text-primary">Framework Map</span>
            <ul className="mt-4 space-y-2.5">
              {frameworkLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`#${link.id}`}
                    className="font-sans text-sm text-text-tertiary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: copyable direct contact email */}
          <div className="space-y-4" id="footer-email-widget">
            <span className="block font-display text-sm font-bold uppercase tracking-wider text-text-primary">Direct Line</span>
            
            <p className="font-sans text-sm text-text-tertiary">
              Connect directly with our engineering team for custom inquiries:
            </p>

            <div className="flex items-center justify-between rounded-xl bg-bg-primary p-3 border border-border-primary">
              <div className="flex items-center gap-2 overflow-hidden">
                <Mail className="h-4 w-4 shrink-0 text-brand-pink" />
                <span className="font-mono text-xs text-text-secondary truncate tracking-wide">{agencyEmail}</span>
              </div>
              
              <button
                onClick={handleCopyEmail}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-bg-secondary text-text-tertiary transition-colors hover:bg-brand-pink/20 hover:text-text-primary cursor-pointer"
                id="footer-email-copy-btn"
                aria-label="Copy agency email"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <span className="mt-16 block h-[1px] w-full bg-border-primary" />

        {/* Bottom credits */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-mono text-xs text-text-tertiary">
            © {new Date().getFullYear()} Magniar & Co. All rights retained. Engineered with premium parameters.
          </span>

          <button
            onClick={handleScrollTop}
            className="group flex items-center gap-1.5 font-mono text-xs tracking-wider text-text-tertiary hover:text-text-primary uppercase cursor-pointer"
            id="footer-scroll-top-btn"
          >
            <span>Top Node</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
