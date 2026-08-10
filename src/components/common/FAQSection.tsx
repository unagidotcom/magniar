import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/faqData';
import { TechnicalLabel } from './TechnicalLabel';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('business-size');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#050505] text-[#F5F7FA] border-t border-white/10 relative">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <TechnicalLabel text="FREQUENTLY ASKED QUESTIONS" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
              AGENCY & ENGAGEMENT FAQs
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
            FREQUENTLY ASKED <span className="text-[#0099FF]">QUESTIONS.</span>
          </h2>

          <p className="text-lg text-slate-300 font-normal leading-relaxed">
            Concise answers regarding our capabilities, international scope, platform support, and how we engage with growth-focused businesses.
          </p>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="max-w-4xl space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`
                  border transition-all rounded-[2px] overflow-hidden
                  ${isOpen 
                    ? 'bg-[#080B10] border-[#0099FF]/60 shadow-[0_0_20px_rgba(0,153,255,0.1)]' 
                    : 'bg-[#030508] border-white/10 hover:border-white/20'
                  }
                `}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer font-sans"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 font-heading text-base sm:text-lg font-bold text-white">
                    <span className="text-[#0099FF] text-sm font-bold">0{idx + 1}.</span>
                    <span>{item.question}</span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-[#0099FF] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 font-sans text-base text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

