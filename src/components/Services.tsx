import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Zap,
  Flame,
  Target,
  Layers,
  Award,
  Compass,
  Eye,
  Cpu,
  MousePointer,
  LineChart,
  ArrowRight,
  TrendingUp,
  LucideIcon
} from "lucide-react";
import { SERVICES } from "../data";

const iconMap: Record<string, LucideIcon> = {
  Activity: Activity,
  Zap: Zap,
  Flame: Flame,
  Target: Target,
  Layers: Layers,
  Award: Award,
  Compass: Compass,
  Eye: Eye,
  Cpu: Cpu,
  MousePointer: MousePointer,
  LineChart: LineChart
};

type CategoryFilter = "all" | "marketing" | "marketplace" | "development";

export default function Services() {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filteredServices = SERVICES.filter(
    (s) => filter === "all" || s.category === filter
  );

  const categories = [
    { label: "All Architecture", id: "all" },
    { label: "Paid Traffic", id: "marketing" },
    { label: "Marketplace Growth", id: "marketplace" },
    { label: "Bespoke Eng & CRO", id: "development" }
  ];

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-24 border-t border-border-primary" id="services">
      {/* Visual lighting depth block */}
      <div className="absolute top-[10%] right-[30%] h-[200px] w-[200px] rounded-full bg-brand-blue/5 blur-[90px]" />
      <div className="absolute bottom-[20%] left-[20%] h-[250px] w-[250px] rounded-full bg-brand-blue/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header section */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-brand-blue">
              OUR ARSENAL
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Scalable Core <span className="text-gradient">Services.</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-lg leading-relaxed text-text-secondary">
            A comprehensive growth capability loop. We align audience acquisition, item listing, custom e-commerce checkout speed, and detailed pixel tracking under single operational metrics.
          </p>
        </div>

        {/* Categories Tab Pill Swapper */}
        <div className="mt-12 flex flex-wrap justify-start gap-2.5" id="services-categories-swapper">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as CategoryFilter)}
              className={`relative rounded-full px-5 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === cat.id
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-card-bg text-text-tertiary border border-border-primary hover:bg-bg-primary hover:text-text-primary"
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Services Grid with entrance transitions */}
        <motion.div
          layout
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          id="services-cards-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const IconComp = iconMap[service.iconName] || Target;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={service.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-primary bg-card-bg p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:border-brand-blue/30 hover:shadow-md"
                >
                  {/* Subtle hover neon top strip */}
                  <span className="absolute top-0 left-0 h-[2px] w-full bg-linear-to-r from-brand-blue to-brand-pink opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Unique Category Marker and Icon Component */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-secondary text-text-primary transition-colors group-hover:bg-brand-blue/10 group-hover:text-brand-blue">
                        <IconComp className="h-5.5 w-5.5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="rounded-md bg-bg-secondary px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-tertiary border border-border-primary">
                        {service.category === "marketing" ? "Paid Traffic" : service.category === "marketplace" ? "Store nodes" : "Engineering"}
                      </span>
                    </div>

                    {/* Service Name & Description */}
                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-text-primary group-hover:text-gradient">
                      {service.title}
                    </h3>
                    <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights statistics label in each card fitting Awwwards standards */}
                  <div className="mt-6 flex items-center justify-between border-t border-border-primary pt-4">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                        {service.statLabel}
                      </span>
                      <span className="font-display text-base font-extrabold text-brand-blue group-hover:text-text-primary">
                        {service.stat}
                      </span>
                    </div>
                    
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-secondary text-text-tertiary transition-all duration-300 group-hover:bg-brand-blue/20 group-hover:text-text-primary">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* Glass layout mesh cover */}
                  <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 bg-gradient-to-tr from-brand-blue/5 to-brand-pink/5 blur-xl group-hover:from-brand-blue/15 group-hover:to-brand-pink/15" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Global Capability Validation Statement banner */}
        <div className="mt-12 rounded-2xl border border-border-primary bg-card-bg p-6 text-center md:text-left shadow-xs">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <TrendingUp className="h-4 w-4 text-brand-blue" />
                <span className="font-display text-sm font-bold tracking-wider text-text-primary uppercase">
                  ATTRIBUTION & PRIVACY ASSURED
                </span>
              </div>
              <p className="mt-1 font-sans text-base md:text-lg text-text-secondary">
                All traffic systems incorporate first-party cookieless tagging rules to minimize tracking loss up to 100%.
              </p>
            </div>
            <a
              href="#contact"
              className="group flex shrink-0 items-center gap-2 rounded-xl bg-bg-secondary border border-border-primary px-5 py-3 text-xs font-bold tracking-wider text-text-primary uppercase hover:bg-card-bg"
            >
              <span>Explore Custom Matrix</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
