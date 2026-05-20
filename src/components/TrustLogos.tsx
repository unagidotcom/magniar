import { motion } from "motion/react";
import {
  Search,
  Instagram,
  ShoppingBag,
  Linkedin,
  TrendingUp,
  Sparkles,
  Store,
  CodeXml,
  LucideIcon
} from "lucide-react";
import { TRUST_PLATFORMS } from "../data";

// Type-safe map of Lucide icons
const iconMap: Record<string, LucideIcon> = {
  Search: Search,
  Instagram: Instagram,
  ShoppingBag: ShoppingBag,
  Linkedin: Linkedin,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
  Store: Store,
  CodeXml: CodeXml,
};

export default function TrustLogos() {
  return (
    <section className="relative bg-[#070707] py-20 border-y border-white/5" id="trust-platforms">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue">
            INTEGRATION NETWORK
          </p>
          <h2 className="mt-2 text-gradient font-display text-2xl font-bold tracking-tight md:text-3xl">
            Where We Engineer Dominance
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-300 leading-relaxed">
            Native integrations, official developer nodes, and advanced bidding algorithms configured directly across top digital pathways.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4" id="trust-logos-grid">
          {TRUST_PLATFORMS.map((platform, idx) => {
            const IconComponent = iconMap[platform.iconName] || Sparkles;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl border bg-brand-dark/40 p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] border-white/5`}
              >
                {/* Visual hover highlight glowing block */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${platform.colorClass} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[120px]">
                  {/* Icon Node */}
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-white/5 p-3 text-white transition-colors duration-300 group-hover:bg-white/10">
                      <IconComponent className="h-5 w-5 transition-transform duration-500 group-hover:rotate-6" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-600 group-hover:text-white/40">
                      {platform.category}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="mt-4">
                    <h3 className="font-display text-sm font-semibold tracking-wide text-white group-hover:text-white">
                      {platform.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-gray-400 group-hover:text-white">
                      {platform.description}
                    </p>
                  </div>
                </div>

                {/* Subtle visual glow corner indicator */}
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-tr from-transparent via-transparent to-white/5 opacity-50" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
