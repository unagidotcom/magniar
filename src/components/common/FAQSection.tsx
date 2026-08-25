import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/faqData';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('services');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-[#F8F5EF] px-4 py-14 text-[#1F241F] sm:px-6 sm:py-16 lg:px-12">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#877969]">
            Frequently asked questions
          </span>
          <h2 className="mt-3 max-w-[390px] font-heading text-[1.85rem] font-semibold leading-tight sm:text-[2.25rem]">
            Small answers before a bigger conversation.
          </h2>
          <p className="mt-4 max-w-[360px] text-sm leading-6 text-[#5D5A50]">
            Concise answers about services, locations, platforms, pricing, and how to start a project with Magniar.
          </p>
        </div>

        <div className="space-y-2 lg:col-span-8">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-[8px] border transition-colors ${
                  isOpen ? 'border-[#CFC0AE] bg-[#FFF9EE]' : 'border-[#E1D6C7] bg-[#F5F0E8] hover:bg-[#FFF9EE]'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="pt-0.5 text-[11px] font-bold text-[#877969]">0{idx + 1}</span>
                    <span className="text-[0.98rem] font-semibold leading-6 text-[#1F241F]">{item.question}</span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#877969] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#E1D6C7] px-4 pb-4 pt-3 text-sm leading-6 text-[#5D5A50] sm:pl-12">
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
