import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/faqData';
import { TechnicalLabel } from './TechnicalLabel';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('services');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#050505] text-[#F5F7FA] border-t border-white/10 relative">
      <div className="max-w-[1120px] mx-auto space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-3">
            <TechnicalLabel text="FREQUENTLY ASKED QUESTIONS" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
            <span className="font-sans text-[12px] text-slate-400 uppercase tracking-wider font-semibold">
              AGENCY & ENGAGEMENT FAQs
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.08]">
            Frequently asked <span className="text-[#0099FF]">questions.</span>
          </h2>

          <p className="text-[13px] sm:text-sm text-slate-300 font-normal leading-relaxed">
            Concise answers about services, locations, platforms, pricing, and how to start a project with Magniar.
          </p>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-2.5">
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
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer font-sans text-[13px]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 font-heading text-[13px] sm:text-sm font-bold text-white">
                    <span className="text-[#0099FF] text-[12px] font-bold">0{idx + 1}.</span>
                    <span>{item.question}</span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-[#0099FF] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 font-sans text-[13px] text-slate-300 leading-relaxed border-t border-white/5 pt-3">
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
