import { motion } from "motion/react";
import { Check, Clock, ShieldCheck, Activity, Milestone } from "lucide-react";
import { PROCESS_STEPS } from "../data";

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-bg-primary py-24 border-t border-border-primary" id="process">
      {/* Background radial atmosphere */}
      <div className="absolute top-[50%] left-[50%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Title */}
        <div className="mb-20 text-center">
          <span className="font-mono text-sm font-bold uppercase tracking-widest text-brand-blue">
            HOW WE CONVERT
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Our Scale <span className="text-gradient">Framework.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-lg leading-relaxed text-text-secondary">
            A structured workflow starting with thorough unit margin audits, progressing to asset development and landing page optimization, leading to scalable multi-channel results.
          </p>
        </div>

        {/* Process Roadmap Wrapper */}
        <div className="relative mx-auto max-w-4xl" id="process-timeline-canvas">
          {/* Connecting Vertical Glowing Line */}
          <div className="absolute top-8 left-4 bottom-8 w-[2px] bg-linear-to-b from-brand-blue to-brand-pink md:left-1/2 md:-translate-x-1/2 opacity-35" />

          {/* Timeline steps loop */}
          <div className="flex flex-col gap-12" id="process-steps-timeline">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                  id={`process-step-${step.number}`}
                >
                  {/* Glowing Numeric Node Anchor */}
                  <div className="absolute top-2 left-4 z-10 flex h-7.5 w-7.5 -translate-x-1/2 items-center justify-center rounded-full bg-bg-secondary border-2 border-brand-blue text-text-primary md:left-1/2">
                    <span className="font-mono text-xs font-bold">{step.number}</span>
                  </div>

                  {/* Left spacer block for desktop symmetry */}
                  <div className="hidden w-1/2 md:block" />

                  {/* Right/Content column (takes full width on mobile, half on desktop) */}
                  <div className="w-full pl-12 md:w-1/2 md:pl-0 md:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="group relative rounded-2xl border border-border-primary bg-card-bg p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/30 hover:bg-card-hover-bg shadow-xs"
                    >
                      {/* Top ribbon containing duration clocks */}
                      <div className="flex items-center justify-between border-b border-border-primary pb-3">
                        <span className="font-display text-sm font-bold uppercase tracking-wider text-text-primary">
                          0{step.number} {step.title}
                        </span>
                        
                        <div className="flex items-center gap-1 font-mono text-xs text-brand-blue uppercase font-bold">
                          <Clock className="h-3 w-3" />
                          <span>{step.duration}</span>
                        </div>
                      </div>

                      {/* Tagline */}
                      <h3 className="mt-4 font-display text-base font-semibold tracking-wide text-brand-blue">
                        {step.tagline}
                      </h3>

                      {/* Detail description */}
                      <p className="mt-2 font-sans text-base md:text-lg leading-relaxed text-text-secondary">
                        {step.description}
                      </p>

                      {/* Deliverables checklist capsules */}
                      <div className="mt-5">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary block mb-2.5">
                          KEY DELIVERABLE ARTIFACTS
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((deliv, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center gap-1.5 rounded-md bg-bg-secondary px-2.5 py-1 border border-border-primary"
                            >
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="font-sans text-sm text-text-secondary">
                                {deliv}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Summary Capsule */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-card-bg px-4 py-2 text-base md:text-lg text-text-secondary shadow-xs"
          >
            <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
            <span>Guaranteed transparency. All milestones tracked strictly inside customized shared dashboards.</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
