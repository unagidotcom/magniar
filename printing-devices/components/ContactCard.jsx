import React, { useState, useEffect } from 'react';
import { Phone, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ContactCard() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button on mobile after scrolling past hero section
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Inline Contact Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none rounded-bl-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Independent Resource Team</span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Need assistance?
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Our team is available to help answer general questions and guide you to the right educational guides or resources.
            </p>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch md:items-end justify-center shrink-0 gap-3 min-w-[240px]">
            <a 
              href="tel:+18059940590"
              className="flex items-center justify-center gap-3 w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 group hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5 animate-pulse" />
              <div className="text-left">
                <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider leading-none">Call Now</div>
                <div className="text-base font-bold leading-tight">+1 (805) 994-0590</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <p className="text-[10px] text-center md:text-right text-slate-400 max-w-[240px] leading-tight">
              We offer independent guidance. Not affiliated with HP.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Call Button (Mobile Only) */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/90 border-t border-slate-200/60 backdrop-blur-md shadow-2xl flex items-center justify-between gap-4 md:hidden transition-all duration-500 transform ${
          showSticky ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Independent Help</span>
          <span className="text-sm font-bold text-slate-900">+1 (805) 994-0590</span>
        </div>
        
        <a 
          href="tel:+18059940590"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Support</span>
        </a>
      </div>
    </>
  );
}
