import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Laptop, Cpu, Check, ArrowRight, ShieldCheck, ShoppingCart, Lock, BarChart2 } from "lucide-react";
import { SHOWCASE_WEBSITES } from "../data";
import { useCurrency } from "../CurrencyContext";

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSite = SHOWCASE_WEBSITES[activeIndex];
  const { formatValue } = useCurrency();

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 border-t border-white/5" id="showcase">
      {/* Dynamic drifting pink lighting behind the browser frame */}
      <div className="absolute top-[40%] right-10 h-[280px] w-[280px] rounded-full bg-brand-pink/5 blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-[10%] left-[-10%] h-[320px] w-[320px] rounded-full bg-brand-blue/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text Navigation Hub - 5 cols */}
          <div className="lg:col-span-5" id="showcase-info-pane">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue">
              BESPOKE DEVELOPMENT
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Websites That <span className="text-gradient">Convert.</span>
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-gray-300">
              We replace heavy page visual builders with clean code architectures built on custom engines, launching e-commerce and business sites that load in milliseconds and retain high traffic volumes.
            </p>

            {/* Selector list elements */}
            <div className="mt-8 flex flex-col gap-3" id="showcase-custom-tabs">
              {SHOWCASE_WEBSITES.map((site, idx) => (
                <button
                  key={site.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "border-brand-blue bg-brand-blue/10"
                      : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"
                  }`}
                >
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-500">
                      SYSTEM: {site.type}
                    </span>
                    <span className={`font-display text-sm font-bold ${activeIndex === idx ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                      {site.title}
                    </span>
                  </div>

                  <span className={`rounded-full bg-white/5 px-3 py-1 font-mono text-[9px] font-bold ${activeIndex === idx ? "text-brand-blue border border-brand-blue/20" : "text-gray-500"}`}>
                    {site.metrics}
                  </span>
                </button>
              ))}
            </div>

            {/* Core Features bullets for dynamic selection */}
            <div className="mt-8 border-t border-white/5 pt-6">
              <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 block mb-3">
                BUILT-IN INFRASTRUCTURE STANDARD
              </span>
              <ul className="flex flex-col gap-2">
                {activeSite.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5">
                    <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-blue/20">
                      <Check className="h-3 w-3 text-brand-blue font-bold" />
                    </div>
                    <span className="font-sans text-base text-gray-300">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Floating Web Browser Frame Representation - 7 cols */}
          <div className="lg:col-span-7" id="showcase-browser-frame">
            <motion.div
              layout
              className="relative rounded-2xl border border-white/10 bg-black/60 shadow-2xl transition-all duration-500 hover:scale-[1.01]"
            >
              {/* Browser top-bar */}
              <div className="flex items-center justify-between border-b border-white/5 bg-[#0e0e0e]/90 px-5 py-3.5 rounded-t-2xl">
                {/* Traffic buttons */}
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                {/* URL path indicator */}
                <div className="flex max-w-[280px] w-full items-center justify-center gap-1.5 rounded-md bg-white/5 py-1 font-mono text-[9px] text-gray-400 border border-white/5 uppercase">
                  <Lock className="h-2.5 w-2.5 text-brand-blue" />
                  <span>https://{activeSite.urlName}</span>
                </div>
                {/* Right utility spacing */}
                <div className="flex gap-1.5 font-mono text-[9px] uppercase tracking-wider text-gray-600">
                  <span>SSL</span>
                </div>
              </div>

              {/* Interactive Virtual Render Screen Height Limit */}
              <div className="relative min-h-[380px] bg-brand-dark/95 p-6 overflow-hidden flex flex-col justify-between rounded-b-2xl">
                
                {/* Dynamic Content Transitions based on index selection */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSite.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-between h-full flex-1"
                  >
                    
                    {/* Render according to active selection */}
                    {activeSite.id === "chronos" && (
                      <div className="flex flex-col gap-6" id="mock-chronos-screen">
                        
                        {/* Luxury Watch Promo header */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <span className="font-display text-xs font-bold tracking-widest text-white">CHRONOS LUX</span>
                          <span className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-gray-400"><ShoppingCart className="h-3.5 w-3.5" /></span>
                        </div>

                        {/* Watch Item Card layout */}
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-4">
                            <h3 className="font-display text-2xl font-bold leading-tight text-white">{activeSite.mockData.heroTitle}</h3>
                            <p className="font-sans text-sm leading-relaxed text-gray-300">{activeSite.mockData.tagline}</p>
                            
                            <div className="pt-2">
                              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-blue block mb-1">ARCHIVE PRICE</span>
                              <span className="font-display text-2xl font-bold text-white">{formatValue(12450)}</span>
                            </div>
                          </div>

                          {/* Floating aesthetic layered card */}
                          <div className="flex items-center justify-center rounded-xl bg-white/[0.01] border border-white/5 p-4 relative group">
                            
                            {/* Dial Mockup inside */}
                            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-brand-blue/30">
                              <div className="h-[90%] w-[90%] rounded-full border border-dashed border-white/5 flex items-center justify-center">
                                <span className="font-mono text-[9px] text-gray-500">12</span>
                                <div className="absolute top-1/2 left-1/2 h-10 w-[1px] bg-brand-blue origin-bottom -translate-x-1/2 -translate-y-full rotate-45" />
                              </div>
                            </div>

                            {/* Floating overlay chip showing transaction success */}
                            <div className="absolute bottom-2 right-2 rounded-lg bg-[#0e0e0e] border border-brand-blue/30 p-2 text-[9px] shadow-lg flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-white font-bold">Sold Out • Secure</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}


                    {activeSite.id === "velo" && (
                      <div className="flex flex-col gap-6" id="mock-velo-screen">
                        
                        {/* SaaS header */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <span className="font-display text-xs font-bold tracking-widest text-white">VELOLABS.AI</span>
                          <span className="rounded-md bg-brand-blue/20 border border-brand-blue/30 px-2 py-0.5 font-mono text-[9px] text-brand-blue">Active Live</span>
                        </div>

                        {/* Biometric grid panels with high dynamic visualization */}
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 text-center">
                            <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-500">BIOMETRIC ACTIVE</span>
                            <span className="mt-2 block font-display text-xl font-bold text-white">{activeSite.mockData.activeUsers}</span>
                            <span className="mt-1 block font-mono text-[8.5px] text-emerald-400 font-bold">+18.5% YoY</span>
                          </div>

                          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 text-center">
                            <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-500">CONVERSION</span>
                            <span className="mt-2 block font-display text-xl font-bold text-white">{activeSite.mockData.conversionRate}</span>
                            <span className="mt-1 block font-mono text-[8.5px] text-brand-blue font-bold">PMax Ready</span>
                          </div>

                          <div className="rounded-xl bg-brand-blue/5 border border-brand-blue/10 p-4 flex flex-col justify-between min-h-[90px]">
                            <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-blue font-bold">SYSTEM METRIC</span>
                            <div className="flex items-center gap-1">
                              <BarChart2 className="h-4 w-4 text-brand-blue" />
                              <span className="font-display text-sm font-bold text-white">Edge Run</span>
                            </div>
                          </div>
                        </div>

                        {/* Description sentences */}
                        <div className="rounded-xl bg-[#0d0d0d] p-3 border border-white/5">
                          <span className="block font-mono text-[8px] text-gray-500">BIOMETRICS:</span>
                          <p className="mt-1 font-sans text-sm text-gray-300">“{activeSite.mockData.tagline}”</p>
                        </div>

                      </div>
                    )}


                    {activeSite.id === "nova" && (
                      <div className="flex flex-col gap-6" id="mock-nova-screen">
                        
                        {/* Web3 Platform header */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <span className="font-display text-xs font-bold tracking-widest text-white">NOVA INTELLIGENCE</span>
                          <span className="font-mono text-[9px] text-gray-500">0x62B...8DF</span>
                        </div>

                        {/* Interactive prompt block visual */}
                        <div className="space-y-4">
                          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                            <span className="block font-mono text-[8px] text-brand-blue text-left uppercase">STATION prompt terminal:</span>
                            <div className="mt-1 font-mono text-[10px] text-white/90 text-left flex items-start gap-1">
                              <span className="text-brand-blue font-bold shrink-0">&gt;</span>
                              <span>query node global_scale_attribution --project magniar_apparel</span>
                            </div>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-left">
                              <span className="font-mono text-[8px] text-gray-500">DECENTRALISED CONTRACTS</span>
                              <span className="block mt-1 font-display text-lg font-bold text-white">{activeSite.mockData.activeUsers}</span>
                            </div>
                            
                            <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-4 text-left flex flex-col justify-between">
                              <span className="font-mono text-[8px] text-brand-blue font-bold">MEMBER ATTRIBUTION</span>
                              <span className="mt-1 font-display text-base font-bold text-white">Liquid Verified • {activeSite.mockData.conversionRate}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {/* Performance stats footprint banner absolute bottom of browser mockup block */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
                    <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                    <span>ENGINE EFFICIENCY: 99/100 LIGHTHOUSE</span>
                  </div>
                  <span className="font-mono text-[9.5px] text-brand-blue font-semibold">
                    &lt;1.2s EDGE LOADS
                  </span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
