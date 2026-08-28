import React from 'react';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { ShoppingBag, Store, Repeat, Cpu, BarChart2 } from 'lucide-react';

interface EcommerceSectionProps {
  onStartProject?: () => void;
  onExploreCapabilities?: () => void;
}

export const EcommerceSection: React.FC<EcommerceSectionProps> = ({
  onStartProject,
  onExploreCapabilities,
}) => {
  const platforms = [
    'Shopify & Shopify Plus',
    'WooCommerce',
    'Amazon Marketplace',
    'Walmart Marketplace',
    'TikTok Shop',
    'Etsy',
    'eBay',
    'Meesho',
  ];

  const pillars = [
    { title: 'Store', desc: 'Custom storefront architecture and checkout optimization.', icon: Store },
    { title: 'Traffic', desc: 'Performance acquisition across paid social and search channels.', icon: BarChart2 },
    { title: 'Conversion', desc: 'Speed, UX clarity, and cart recovery automation.', icon: ShoppingBag },
    { title: 'Retention', desc: 'LTV optimization, email/SMS flows, and customer loyalty.', icon: Repeat },
    { title: 'Operations', desc: 'Inventory sync, marketplace APIs, and fulfillment workflows.', icon: Cpu },
  ];

  return (
    <section id="ecommerce-section" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#080B10] text-[#F5F7FA] border-t border-white/10 relative">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <TechnicalLabel text="COMMERCE SYSTEMS" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
            <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
              MULTI-CHANNEL RETAIL
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            Ecommerce is more <br />
            <span className="text-[#B89A72]">than a store.</span>
          </h2>

          <p className="text-lg text-slate-300 font-normal leading-relaxed">
            Storefronts, marketplaces, acquisition channels, and operations must work as one connected commercial system.
          </p>
        </div>

        {/* 5 Connected Operations Loop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#050505] border border-white/10 rounded-[2px] space-y-4 hover:border-[#B89A72]/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs text-[#B89A72] font-bold">0{idx + 1}</span>
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-[#B89A72] transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#B89A72] transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-300 font-sans font-normal leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Supported Platforms Matrix */}
        <div className="p-8 bg-[#030508] border border-white/10 rounded-[2px] space-y-6">
          <div className="font-sans text-xs text-slate-300 uppercase tracking-wider font-semibold flex items-center justify-between border-b border-white/10 pb-4">
            <span>SUPPORTED COMMERCE & MARKETPLACE PLATFORMS</span>
            <span className="text-[#B89A72] font-medium">MULTICHANNEL INTEGRATION</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans text-xs text-white font-medium">
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#080B10] border border-white/10 rounded-[2px] flex items-center gap-2.5 hover:border-[#B89A72]/40 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
                <span className="text-xs text-slate-200">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
