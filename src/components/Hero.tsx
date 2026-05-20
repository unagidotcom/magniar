import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, TrendingUp } from "lucide-react";
import MarketingCanvas from "./MarketingCanvas";

interface HeroProps {
  onCtaclick: (target: string) => void;
}

export default function Hero({ onCtaclick }: HeroProps) {
  // Compute mouse position relative to the hero section to spawn bursts in Canvas context
  const handleWordMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const container = document.getElementById("hero");
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Dispatch the custom event safely
    window.dispatchEvent(
      new CustomEvent("magniar-word-burst", {
        detail: { x, y },
      })
    );
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-dark pt-24 pb-16"
      id="hero"
    >
      {/* Background Decorative Mesh Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Interactive Floating Marketing Analytics HUD Canvas Background */}
      <MarketingCanvas />

      {/* Floating Glowing Orbs (Premium CSS Animations) */}
      <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-brand-blue/10 blur-[100px] animate-orb-1" />
      <div className="absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-brand-blue/5 blur-[120px] animate-orb-2" />
      <div className="absolute top-[50%] left-[50%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[80px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center md:px-12">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 flex max-w-fit items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-xs font-bold tracking-widest text-brand-blue uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue"></span>
          </span>
          <span>GROWTH ENGINEERING WITH CREATIVE MASTERY</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          onMouseMove={handleWordMouseMove}
          className="mx-auto max-w-5xl font-display text-4xl font-extrabold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl leading-tight select-none cursor-default py-4"
        >
          <div className="flex flex-wrap justify-center mb-1 sm:mb-2 gap-y-2">
            {["We", "Build", "Brands"].map((word) => (
              <span key={word} className="inline-block whitespace-nowrap mr-3 sm:mr-4 md:mr-5">
                {word.split("").map((char, index) => {
                  const hoverColors = ["#60a5fa", "#f472b6", "#10b981", "#c084fc", "#22d3ee"];
                  const randomColor = hoverColors[(index + word.charCodeAt(0)) % hoverColors.length];
                  return (
                    <motion.span
                      key={index}
                      className="inline-block origin-bottom text-white"
                      whileHover={{
                        y: -16,
                        scale: 1.22,
                        rotate: (index % 2 === 0 ? 1 : -1) * 8,
                        color: randomColor,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 12
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </div>

          <div className="relative inline-flex flex-wrap justify-center mt-2 pb-2">
            {["That", "Scale."].map((word) => (
              <span key={word} className="inline-block whitespace-nowrap mr-3 sm:mr-4 md:mr-5">
                {word.split("").map((char, index) => {
                  const hoverColors = ["#60a5fa", "#f472b6", "#34d399", "#a855f7", "#06b6d4"];
                  const randomColor = hoverColors[(index + word.charCodeAt(0)) % hoverColors.length];
                  return (
                    <motion.span
                      key={index}
                      className="inline-block origin-bottom animate-gradient-text"
                      whileHover={{
                        y: -18,
                        scale: 1.25,
                        rotate: (index % 2 === 0 ? -1 : 1) * 10,
                        color: randomColor,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 10
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
            {/* Elegant underlining highlight */}
            <span className="absolute bottom-0 left-0 h-[4px] w-full rounded-full bg-linear-to-r from-brand-blue to-brand-pink pointer-events-none opacity-80" />
          </div>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl font-sans text-base md:text-lg leading-relaxed text-gray-300"
        >
          Performance marketing, marketplaces, and high-performance web experiences engineered to capture high-intent buyers and unlock radical growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => onCtaclick("contact")}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-brand-blue to-brand-pink p-[1px] shadow-[0_4px_25px_rgba(59,130,246,0.15)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(59,130,246,0.3)] cursor-pointer"
            id="hero-book-btn"
          >
            <span className="flex items-center gap-2 rounded-full bg-brand-dark px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all group-hover:bg-transparent">
              <span>Book Consultation</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          <button
            onClick={() => onCtaclick("services")}
            className="group flex items-center gap-2 rounded-full bg-white/5 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-brand-blue cursor-pointer"
            id="hero-services-btn"
          >
            <Play className="h-3.5 w-3.5 text-brand-blue transition-transform duration-300 group-hover:scale-110" />
            <span>View Services</span>
          </button>
        </motion.div>

        {/* Real-time Ticker Preview of Performance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mt-16 max-w-4xl rounded-2xl border border-white/5 bg-brand-dark/40 p-1.5 backdrop-blur-xs"
        >
          <div className="flex flex-col items-center justify-between gap-3 rounded-xl bg-black/60 px-6 py-4 sm:flex-row md:gap-6 border border-white/5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-gray-500">
                LIVE ORCHESTRATION STREAM:
              </span>
            </div>
            <div className="flex flex-1 items-center gap-2 text-left overflow-hidden">
              <TrendingUp className="h-4 w-4 shrink-0 text-brand-blue" />
              <div className="animate-pulse font-sans text-sm font-semibold text-gray-300">
                Scaling Aethera Apparel PMax Ads to <span className="text-brand-blue font-bold">5.4x ROAS</span> • Optimized TikTok Shop sync for Lumina Sleep (+190% YoY)
              </div>
            </div>
            <div className="rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] uppercase text-gray-400 border border-white/5">
              GMT 22:17
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
