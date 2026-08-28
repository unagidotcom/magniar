import React from 'react';
import { Cpu, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface AIStrategySectionProps {
  onSeeIntelligenceCapabilities?: () => void;
}

export const AIStrategySection: React.FC<AIStrategySectionProps> = ({
  onSeeIntelligenceCapabilities,
}) => {
  const frameworkSteps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Identify high-impact friction points.',
      desc: 'Audit manual workflows, ad creative production bottlenecks, customer service queries, and data extraction delays.',
    },
    {
      num: '02',
      title: 'DESIGN',
      subtitle: 'Define custom LLM & data workflows.',
      desc: 'Architect deterministic AI pipelines combining custom prompts, API integrations, and human-in-the-loop validation.',
    },
    {
      num: '03',
      title: 'IMPLEMENT',
      subtitle: 'Connect tools to core infrastructure.',
      desc: 'Deploy custom automated agents into your CRM, ad platforms, storefront APIs, and reporting databases.',
    },
    {
      num: '04',
      title: 'MEASURE',
      subtitle: 'Track operational speed & ROI impact.',
      desc: 'Evaluate exact hours saved, turnaround speed acceleration, and decision accuracy improvement.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B89A72]" />
            [ 08 — AI STRATEGY & LEVERAGE ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase leading-tight">
            AI SHOULD CREATE <br />
            <span className="text-[#B89A72]">MEASURABLE LEVERAGE.</span>
          </h2>
          <p className="text-base text-[#8D949E] leading-relaxed">
            The question isn’t where AI can be added to sound trendy. The question is where intelligence can remove friction, increase speed, or improve a high-stakes business decision.
          </p>
        </div>

        {/* Major Editorial Box */}
        <div className="p-8 sm:p-10 bg-[#080B10] border border-white/15 mb-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#B89A72] font-bold">THE MAGNIAR AI METHODOLOGY</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase font-mono">
                NOT AI FOR THE SAKE OF AI.
              </h3>
            </div>

            <button
              onClick={onSeeIntelligenceCapabilities}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8F714D] transition-all cursor-pointer self-start lg:self-auto"
            >
              <span>EXPLORE INTELLIGENCE CAPABILITIES</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm sm:text-base text-[#8D949E] leading-relaxed py-6">
            We don’t promise that "AI will autonomously run your entire company." We engineer practical, targeted AI pipelines that compound human capabilities across creative research, predictive ad bidding, customer insights, and operational workflows.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 font-mono text-xs">
            <div className="p-3 bg-[#050505] border border-white/10 flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#B89A72] shrink-0" />
              <span>Creative Ad Iteration & Testing</span>
            </div>
            <div className="p-3 bg-[#050505] border border-white/10 flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#B89A72] shrink-0" />
              <span>Predictive LTV & ROAS Modeling</span>
            </div>
            <div className="p-3 bg-[#050505] border border-white/10 flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#B89A72] shrink-0" />
              <span>Automated Ops & Reporting Pipelines</span>
            </div>
          </div>
        </div>

        {/* 4-Step Framework Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {frameworkSteps.map((step) => (
            <div
              key={step.num}
              className="p-6 bg-[#0A0D12] border border-white/10 hover:border-[#B89A72]/50 transition-colors group space-y-3"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#B89A72] font-bold">{step.num} / STAGE</span>
                <Cpu className="w-4 h-4 text-white/20 group-hover:text-[#B89A72] transition-colors" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase group-hover:text-[#B89A72] transition-colors">
                {step.title}
              </h4>
              <p className="text-xs font-mono text-[#B89A72]">
                {step.subtitle}
              </p>
              <p className="text-xs text-[#8D949E] leading-relaxed pt-2 border-t border-white/5">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
