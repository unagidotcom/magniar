import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { STATISTICS } from "../data";
import { Lightbulb, Code, Target, BarChart4 } from "lucide-react";
import { useCurrency } from "../CurrencyContext";

// Safe dynamic counting hook
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [currentVal, setCurrentVal] = useState(0);
  const elementRef = useRef(null);
  const isSeen = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isSeen) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function outQuad for butter smooth animation
      const easedProgress = progress * (2 - progress);
      
      setCurrentVal(Math.floor(easedProgress * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrentVal(value);
      }
    };

    requestAnimationFrame(step);
  }, [value, isSeen]);

  return (
    <span ref={elementRef} className="font-display font-bold text-white">
      {prefix}
      {currentVal.toLocaleString()}
      {suffix}
    </span>
  );
}

const iconGroup = [
  { icon: Target, title: "Paid Advertising", text: "Scaling demand through hyper-efficient bids." },
  { icon: Lightbulb, title: "Creative Production", text: "Storyboards, TikTok Shop content & copywriting." },
  { icon: Code, title: "Full-Stack Web Dev", text: "Ultra-fast headless architectures." },
  { icon: BarChart4, title: "True Attribution", text: "Zero tracking leak server tag connection." }
];

export default function About() {
  const { currentCurrency, convertValue } = useCurrency();

  return (
    <section className="relative overflow-hidden bg-bg-primary py-24" id="about">
      {/* Decorative vertical coordinates overlay */}
      <div className="absolute top-0 right-10 h-full w-[1px] bg-gradient-to-b from-transparent via-border-primary to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text Narrative Column - 7 columns wide */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 border border-brand-blue/30 px-3.5 py-1 text-sm font-semibold tracking-widest text-brand-blue uppercase">
                <span>OUR CORE POSITIONING</span>
              </div>
              
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                Growth Meets <br />
                <span className="text-gradient">Creative Execution.</span>
              </h2>

              <p className="mt-6 font-sans text-lg md:text-xl leading-relaxed text-text-secondary">
                Magniar & Co is a modern digital marketing and creative engineering growth agency built for the speed of modern digital commerce. We deploy performance paid advertising, design high-converting visual creative streams, and launch custom sub-second website nodes. 
              </p>

              <p className="mt-4 font-sans text-lg md:text-xl leading-relaxed text-text-secondary">
                Instead of isolated activities, we combine advertising scripts and code, ensuring your campaigns benefit from immediate, error-free checkout pages, and your marketing budgets are guided directly by accurate attribution analytics.
              </p>

              {/* Four Core Focus Clusters */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" id="about-pillars">
                {iconGroup.map((item, id) => {
                  const Icon = item.icon;
                  return (
                    <div key={id} className="flex gap-3 rounded-xl border border-border-primary bg-card-bg p-4 shadow-xs">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-text-primary">
                        <Icon className="h-5 w-5 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="font-display text-base font-semibold text-text-primary">{item.title}</h4>
                        <p className="mt-1 font-sans text-sm md:text-base text-text-tertiary">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Metrics & Animated Counters Column - 5 columns wide */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4" id="about-stats-grid">
              {STATISTICS.map((stat, idx) => {
                const isAdSpend = stat.id === "adspend";
                const displayVal = isAdSpend ? Math.round(convertValue(stat.val)) : stat.val;
                const displayPrefix = isAdSpend ? currentCurrency.symbol : stat.prefix;

                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative rounded-2xl border border-border-primary bg-card-bg p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/35 hover:bg-card-hover-bg shadow-xs"
                  >
                    {/* Subtle top horizontal indicator ray */}
                    <span className="absolute top-0 left-6 h-[1.5px] w-12 bg-linear-to-r from-brand-blue to-brand-pink opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="flex flex-col">
                      <span className="font-display text-3xl font-extrabold text-text-primary md:text-4xl">
                        <AnimatedCounter value={displayVal} prefix={displayPrefix} suffix={stat.suffix} />
                      </span>
                      <span className="mt-2 font-sans text-sm md:text-base font-semibold tracking-wide text-text-secondary">
                        {stat.label}
                      </span>
                    </div>

                    {/* Corner aesthetic visual grid widget */}
                    <div className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center text-[8px] font-mono text-text-tertiary/20 select-none group-hover:text-brand-blue/30">
                      //0{idx + 1}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Glowing client validation capsule */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex items-center gap-4 rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-4"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue"></span>
                </span>
              </div>
              <div className="font-sans text-base md:text-lg text-text-secondary leading-relaxed">
                <span className="font-bold text-text-primary">Full Agency Integration:</span> Managed spend represents live Google and Meta Enterprise direct API integrations.
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
