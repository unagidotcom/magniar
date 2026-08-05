import React, { useState, useEffect } from 'react';
import { Phone, Printer, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Setup', href: '#setup' },
    { name: 'Wireless', href: '#wireless' },
    { name: 'Scanning', href: '#scanning' },
    { name: 'Maintenance', href: '#maintenance' },
    { name: 'Guides', href: '#guides' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 border-b border-slate-200/50 backdrop-blur-md shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/printing-devices" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <Printer className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-slate-900 tracking-tight leading-none">
              Device <span className="text-blue-600">Guides</span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
              Independent HP Resource
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <a 
            href="tel:+18059940590" 
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            <span>+1 (805) 994-0590</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 bg-white/50 text-slate-600 hover:bg-white transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200/50 bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-sans text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 px-3">
              <a
                href="tel:+18059940590"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 font-sans text-sm font-semibold text-white shadow-md transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (805) 994-0590</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
