import React from 'react';
import { AboutHero } from './AboutHero';
import { CoreIdeaSection } from './CoreIdeaSection';
import { MagniarModelSection } from './MagniarModelSection';
import { WhyMagniarExistsSection } from './WhyMagniarExistsSection';
import { HowWeThinkSection } from './HowWeThinkSection';
import { TargetMarketSection } from './TargetMarketSection';
import { PlatformMatrix } from './PlatformMatrix';
import { MarketingDevelopmentSection } from './MarketingDevelopmentSection';
import { AIStrategySection } from './AIStrategySection';
import { CompactProcessSection } from './CompactProcessSection';
import { PeopleAndFounderSection } from './PeopleAndFounderSection';
import { ValuesAndSilosSection } from './ValuesAndSilosSection';
import { MagniarDifferenceSection } from './MagniarDifferenceSection';
import { AboutConnectionsSection } from './AboutConnectionsSection';
import { AboutCTA } from './AboutCTA';

interface AboutPageProps {
  onStartProject?: () => void;
  onExploreCapabilities?: () => void;
  onSeeProcess?: () => void;
  onSelectCaseStudy?: (slug: string) => void;
  onSelectArticle?: (slug: string) => void;
  onExploreWork?: () => void;
  onExploreInsights?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onStartProject,
  onExploreCapabilities,
  onSeeProcess,
  onSelectCaseStudy,
  onSelectArticle,
  onExploreWork,
  onExploreInsights,
}) => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans antialiased">
      {/* 01 ABOUT HERO */}
      <div id="about-hero">
        <AboutHero
          onStartProject={onStartProject}
          onExploreModel={() => {
            const el = document.getElementById('magniar-model');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* 02 CORE IDEA: MARKETING DOESN'T EXIST IN ISOLATION */}
      <div id="core-idea">
        <CoreIdeaSection onSeeCapabilities={onExploreCapabilities} />
      </div>

      {/* 03 THE MAGNIAR MODEL: INTERACTIVE SYSTEM DIAGRAM */}
      <div id="magniar-model">
        <MagniarModelSection
          onSelectDiscipline={() => {
            if (onExploreCapabilities) onExploreCapabilities();
          }}
        />
      </div>

      {/* 04 WHY MAGNIAR EXISTS & FRAGMENTATION DIAGRAM */}
      <div id="why-magniar">
        <WhyMagniarExistsSection onStartProject={onStartProject} />
      </div>

      {/* 05 HOW WE THINK & BUSINESS FIRST */}
      <div id="how-we-think">
        <HowWeThinkSection />
      </div>

      {/* 06 TARGET MARKET & INTERNATIONAL REACH */}
      <div id="target-market">
        <TargetMarketSection onStartProject={onStartProject} />
      </div>

      {/* 07 GLOBAL PLATFORM MATRIX */}
      <div id="platform-matrix">
        <PlatformMatrix />
      </div>

      {/* 08 MARKETING + DEVELOPMENT HYBRID ADVANTAGE */}
      <div id="mktg-dev">
        <MarketingDevelopmentSection />
      </div>

      {/* 09 AI POSITIONING & STRATEGY */}
      <div id="ai-strategy">
        <AIStrategySection onSeeIntelligenceCapabilities={onExploreCapabilities} />
      </div>

      {/* 10 COMPACT PROCESS */}
      <div id="compact-process">
        <CompactProcessSection onSeeProcess={onSeeProcess} />
      </div>

      {/* 11 PEOPLE & FOUNDER PLACEHOLDER SYSTEM */}
      <div id="people">
        <PeopleAndFounderSection />
      </div>

      {/* 12 VALUES & SYSTEMS OVER SILOS */}
      <div id="values">
        <ValuesAndSilosSection />
      </div>

      {/* 13 THE MAGNIAR DIFFERENCE */}
      <div id="differentiators">
        <MagniarDifferenceSection onStartProject={onStartProject} />
      </div>

      {/* 14 CONNECTIONS: WORK, INSIGHTS, CAPABILITIES */}
      <div id="connections">
        <AboutConnectionsSection
          onSelectCaseStudy={onSelectCaseStudy}
          onSelectArticle={onSelectArticle}
          onExploreWork={onExploreWork}
          onExploreInsights={onExploreInsights}
          onExploreCapabilities={onExploreCapabilities}
        />
      </div>

      {/* 15 ABOUT CTA */}
      <div id="about-cta">
        <AboutCTA
          onStartProject={onStartProject}
          onExploreWork={onExploreWork}
        />
      </div>
    </div>
  );
};
