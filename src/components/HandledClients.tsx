import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, Target, ShoppingBag, Coins, ChevronRight, 
  Sparkles, CheckCircle2, TrendingUp, Search, BarChart3, 
  Workflow
} from "lucide-react";
import { HANDLED_CLIENTS } from "../data";
import { useCurrency } from "../CurrencyContext";
import { HandledClient } from "../types";

export default function HandledClients() {
  const [filter, setFilter] = useState<"all" | "lead-generation" | "e-commerce">("all");
  const { currentCurrency, convertValue } = useCurrency();

  const filteredClients = HANDLED_CLIENTS.filter((client) => {
    if (filter === "all") return true;
    return client.category === filter;
  });

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-24 border-t border-border-primary" id="handled-clients">
      {/* Absolute Ambient Highlights */}
      <div className="absolute top-[20%] right-[15%] h-[320px] w-[320px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] h-[280px] w-[280px] rounded-full bg-brand-pink/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end mb-16">
          <div>
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-brand-blue">
              PROVEN TRACK RECORD
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Handled <span className="text-gradient">Clients & Budgets.</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-lg leading-relaxed text-text-secondary">
            Engineered marketing loops, high-retaining lead generation, and professional Shopify storefronts deployed and scaled for real-world growth.
          </p>
        </div>

        {/* Categories Tab Selector Row */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border-primary pb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "all"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-card-bg text-text-tertiary border border-border-primary hover:bg-bg-primary hover:text-text-primary"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>All Projects ({HANDLED_CLIENTS.length})</span>
            </button>

            <button
              onClick={() => setFilter("lead-generation")}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "lead-generation"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-card-bg text-text-tertiary border border-border-primary hover:bg-bg-primary hover:text-text-primary"
              }`}
            >
              <Target className="h-3.5 w-3.5" />
              <span>Google Marketing / Lead-Gen ({HANDLED_CLIENTS.filter(c => c.category === "lead-generation").length})</span>
            </button>

            <button
              onClick={() => setFilter("e-commerce")}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "e-commerce"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-card-bg text-text-tertiary border border-border-primary hover:bg-bg-primary hover:text-text-primary"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Shopify / Marketplaces ({HANDLED_CLIENTS.filter(c => c.category === "e-commerce").length})</span>
            </button>
          </div>

          <div className="rounded-full bg-card-bg border border-border-primary px-4 py-1.5 font-mono text-xs text-text-secondary shadow-xs">
            Multi-Currency Enabled
          </div>
        </div>

        {/* Bento Grid layout */}
        <motion.div 
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          id="handled-clients-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredClients.map((client, idx) => {
              // Convert spend using active currency settings
              const displayVal = client.spend ? Math.round(convertValue(client.spend)) : null;
              const formattedSpend = displayVal 
                ? `${currentCurrency.symbol}${displayVal.toLocaleString()} Spend` 
                : "Continuous Setup";

              const isEcom = client.category === "e-commerce";

              return (
                <motion.div
                  layout
                  key={client.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-primary bg-card-bg p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/30 hover:scale-[1.01] hover:bg-card-hover-bg shadow-xs"
                >
                  <div>
                    {/* Header meta */}
                    <div className="flex items-center justify-between border-b border-border-primary pb-3.5 mb-4">
                      <div className="flex items-center gap-2">
                        {isEcom ? (
                          <div className="rounded-lg bg-pink-500/10 p-2 text-pink-400">
                            <ShoppingBag className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                            <Target className="h-4 w-4" />
                          </div>
                        )}
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-tertiary">
                          {client.focus}
                        </span>
                      </div>

                      <div className="rounded-full bg-brand-blue/10 border border-brand-blue/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-brand-blue uppercase">
                        {isEcom ? "STOREFRONT" : "ADS NODE"}
                      </div>
                    </div>

                    {/* Client Name & Service type */}
                    <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary group-hover:text-brand-blue transition-colors">
                      {client.name}
                    </h3>

                    <p className="mt-1 font-mono text-xs md:text-sm text-brand-blue">
                      {client.serviceType}
                    </p>

                    {/* Spend counter representation */}
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-bg-secondary px-2.5 py-1 font-mono text-xs md:text-sm text-text-secondary border border-border-primary">
                      <Coins className="h-3.5 w-3.5 text-amber-500" />
                      <span>{formattedSpend}</span>
                    </div>

                    {/* Core strategy description */}
                    <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
                      {client.description}
                    </p>
                  </div>

                  {/* Footprint metrics visual element */}
                  <div className="mt-6 flex items-center justify-between border-t border-border-primary pt-4">
                    <div className="flex items-center gap-1.5 font-mono text-xs text-text-tertiary">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-blue" />
                      <span>Delivery Verified</span>
                    </div>

                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
                      {isEcom ? "Ready to Sell" : "Lead Collection"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Global managed summaries widget */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-border-primary bg-card-bg p-6 backdrop-blur-md md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blend-lighten bg-brand-blue/10 text-brand-blue">
              <Workflow className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-text-primary">Full-Funnel Client Infrastructure</h4>
              <p className="mt-1 font-sans text-base text-text-tertiary">
                All lead lists and transactions pass through state-of-the-art secure REST API integrations, direct webhooks, and modern encryption standards.
              </p>
            </div>
          </div>
          <a
            href="#inquire"
            className="group flex items-center gap-1.5 rounded-full bg-bg-secondary hover:bg-card-bg px-5 py-2 text-xs font-semibold uppercase tracking-wider text-text-primary hover:text-brand-blue transition-all border border-border-primary cursor-pointer whitespace-nowrap"
          >
            <span>Discuss Setup</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
