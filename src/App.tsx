import React, { useState } from 'react';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { CapabilitiesPage } from './components/capabilities/CapabilitiesPage';
import { ProcessSection } from './components/process/ProcessSection';
import { ProcessPage } from './components/process/ProcessPage';
import { IndustriesSection } from './components/industries/IndustriesSection';
import { IndustriesPage } from './components/industries/IndustriesPage';
import { WorkSection } from './components/work/WorkSection';
import { WorkPage } from './components/work/WorkPage';
import { CaseStudyDetailPage } from './components/work/CaseStudyDetailPage';
import { InsightsSection } from './components/insights/InsightsSection';
import { InsightsPage } from './components/insights/InsightsPage';
import { ArticleDetailPage } from './components/insights/ArticleDetailPage';
import { StartProjectPage } from './components/startProject/StartProjectPage';
import { AboutPage } from './components/about/AboutPage';
import { AdminShell } from './components/admin/AdminShell';
import { ContactPage } from './components/contact/ContactPage';
import { ClientTrustStrip } from './components/common/ClientTrustStrip';
import { ThemeSwitcher } from './components/common/ThemeSwitcher';
import { EcommerceSection } from './components/sections/EcommerceSection';
import { TestimonialsSection } from './components/common/TestimonialsSection';
import { FAQSection } from './components/common/FAQSection';
import { CTASection } from './components/common/CTASection';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { ClientLoginPage } from './components/pages/ClientLoginPage';
import { TechnicalLabel } from './components/common/TechnicalLabel';
import { StartProjectStep, ProjectRequestFormData } from './types/startProject';
import { HeroInteractionConfig } from './types/heroInteraction';

const DEFAULT_INTERACTION_CONFIG: HeroInteractionConfig = {
  motionActive: true,
  reducedMotion: false,
  density: 'MEDIUM',
  signalActivity: 'MEDIUM',
  cursorResponse: true,
  simulatedPreset: 'IDLE_1440',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('shell');

  const [siteView, setSiteView] = useState<
    | 'homepage'
    | 'about-page'
    | 'start-project'
    | 'capabilities-page'
    | 'process-page'
    | 'industries-page'
    | 'work-page'
    | 'work-detail'
    | 'insights-page'
    | 'insights-detail'
    | 'contact-page'
    | 'privacy-page'
    | 'terms-page'
    | 'login-page'
    | 'admin-os'
  >('homepage');

  // Admin OS States
  const [adminAuthStatus] = useState<boolean>(false);
  const [adminSelectedRoute] = useState<string>('dashboard');

  // Handle URL path on mount & browser back/forward
  React.useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      if (path === '/admin' || path === '/admin/login' || path.startsWith('/admin/')) {
        setSiteView('admin-os');
        setActiveTab('admin-os');
      } else if (path === '/portal' || path === '/portal/login' || path.startsWith('/portal/') || path === '/client-login') {
        setSiteView('login-page');
        setActiveTab('shell');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const [startProjectStep] = useState<StartProjectStep>(0);
  const [startProjectData] = useState<Partial<ProjectRequestFormData>>({});

  const [activeCaseStudySlug, setActiveCaseStudySlug] = useState<string>(
    'solaris-apparel-scaling-dtc-acquisition'
  );
  const [activeArticleSlug, setActiveArticleSlug] = useState<string>(
    'real-cost-of-scaling-paid-acquisition-too-early'
  );

  const [interactionConfig, setInteractionConfig] =
    useState<HeroInteractionConfig>(DEFAULT_INTERACTION_CONFIG);

  const handleConfigChange = (newConfig: Partial<HeroInteractionConfig>) => {
    setInteractionConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleSelectCaseStudy = (slug: string) => {
    setActiveCaseStudySlug(slug);
    setSiteView('work-detail');
    setActiveTab('work-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    setActiveArticleSlug(slug);
    setSiteView('insights-detail');
    setActiveTab('insights-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartProject = () => {
    setSiteView('start-project');
    setActiveTab('start-project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutPage = () => {
    setSiteView('about-page');
    setActiveTab('about-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (route: string) => {
    if (route === 'start-project') {
      handleStartProject();
    } else if (route === 'login-page' || route === 'portal' || route === 'portal-page' || route === 'client-portal') {
      setSiteView('login-page');
      setActiveTab('shell');
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/portal');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'privacy-page') {
      setSiteView('privacy-page');
      setActiveTab('shell');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'terms-page') {
      setSiteView('terms-page');
      setActiveTab('shell');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'contact-page') {
      setSiteView('contact-page');
      setActiveTab('shell');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'about-page') {
      handleAboutPage();
    } else if (route === 'capabilities-page') {
      setSiteView('capabilities-page');
      setActiveTab('capabilities-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'process-page') {
      setSiteView('process-page');
      setActiveTab('process-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'industries-page') {
      setSiteView('industries-page');
      setActiveTab('industries-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'work-page') {
      setSiteView('work-page');
      setActiveTab('work-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'insights-page') {
      setSiteView('insights-page');
      setActiveTab('insights-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'admin-os' || route === 'admin-login') {
      setSiteView('admin-os');
      setActiveTab('admin-os');
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', route === 'admin-login' ? '/admin/login' : '/admin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSiteView('homepage');
      setActiveTab('shell');
      if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/portal'))) {
        window.history.pushState({}, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans antialiased selection:bg-[#0099FF]/30 selection:text-white flex flex-col relative">
      {siteView === 'admin-os' || activeTab === 'admin-os' ? (
        <AdminShell
          initialAuthStatus={adminAuthStatus}
          initialRoute={adminSelectedRoute}
          onReturnToPublicSite={() => {
            setActiveTab('shell');
            setSiteView('homepage');
            if (typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
          }}
        />
      ) : (
        <>
          {/* Production Navigation Header */}
          <Header
            onStartProject={handleStartProject}
            onNavigate={handleNavigate}
            activeTab={
              siteView === 'about-page'
                ? 'about'
                : siteView === 'start-project'
                ? 'start-project'
                : siteView === 'capabilities-page'
                ? 'capabilities'
                : siteView === 'process-page'
                ? 'process'
                : siteView === 'industries-page'
                ? 'industries'
                : siteView === 'work-page' || siteView === 'work-detail'
                ? 'work'
                : siteView === 'insights-page' || siteView === 'insights-detail'
                ? 'insights'
                : 'homepage'
            }
            setActiveTab={(tab) => {
              if (tab === 'about') handleAboutPage();
              else if (tab === 'start-project') handleStartProject();
              else if (tab === 'capabilities') handleNavigate('capabilities-page');
              else if (tab === 'process') handleNavigate('process-page');
              else if (tab === 'industries') handleNavigate('industries-page');
              else if (tab === 'work') handleNavigate('work-page');
              else if (tab === 'insights') handleNavigate('insights-page');
              else handleNavigate('homepage');
            }}
          />

          {/* Main Website Canvas */}
          <main className="flex-1 w-full">
            {siteView === 'homepage' ? (
              <div className="space-y-0">
                {/* SECTION 1: HOMEPAGE HERO */}
                <HeroSection
                  interactionConfig={interactionConfig}
                  onInteractionConfigChange={handleConfigChange}
                  onStartProject={handleStartProject}
                  onExploreCapabilities={() => handleNavigate('capabilities-page')}
                />

                {/* SECTION 2: POSITIONING STATEMENT */}
                <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#030508] border-y border-white/10 relative overflow-hidden">
                  <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <div className="lg:col-span-5 space-y-6">
                      <div className="flex items-center gap-3">
                        <TechnicalLabel text="OUR APPROACH" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
                        <span className="font-sans text-xs text-slate-400 font-semibold uppercase tracking-wider">
                          INTEGRATED GROWTH PARTNER
                        </span>
                      </div>

                      <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                        One growth partner, <br />
                        <span className="text-[#0099FF]">from strategy to scale.</span>
                      </h2>

                      <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
                        Magniar connects performance marketing, social commerce, custom development and AI strategy into a single growth engine built around what your business actually needs.
                      </p>
                    </div>

                    {/* 4 Core Disciplines Bar */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-6 bg-[#080B10] border border-white/10 rounded-[2px] space-y-3 hover:border-[#0099FF]/40 transition-all">
                        <span className="font-heading text-xs font-bold text-[#0099FF] tracking-wider uppercase block">01 PERFORMANCE</span>
                        <p className="text-sm text-slate-300 font-sans font-normal leading-relaxed">Paid acquisition, media buying & demand generation.</p>
                      </div>
                      <div className="p-6 bg-[#080B10] border border-white/10 rounded-[2px] space-y-3 hover:border-[#0099FF]/40 transition-all">
                        <span className="font-heading text-xs font-bold text-[#0099FF] tracking-wider uppercase block">02 COMMERCE</span>
                        <p className="text-sm text-slate-300 font-sans font-normal leading-relaxed">Digital storefronts, social commerce & marketplaces.</p>
                      </div>
                      <div className="p-6 bg-[#080B10] border border-white/10 rounded-[2px] space-y-3 hover:border-[#0099FF]/40 transition-all">
                        <span className="font-heading text-xs font-bold text-[#0099FF] tracking-wider uppercase block">03 DEVELOPMENT</span>
                        <p className="text-sm text-slate-300 font-sans font-normal leading-relaxed">Web applications & custom web infrastructure.</p>
                      </div>
                      <div className="p-6 bg-[#080B10] border border-white/10 rounded-[2px] space-y-3 hover:border-[#0099FF]/40 transition-all">
                        <span className="font-heading text-xs font-bold text-[#0099FF] tracking-wider uppercase block">04 INTELLIGENCE</span>
                        <p className="text-sm text-slate-300 font-sans font-normal leading-relaxed">AI decision engines, predictive data & automation.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 3: CAPABILITIES */}
                <CapabilitiesSection
                  onExploreFullCapabilities={() => handleNavigate('capabilities-page')}
                />

                {/* SECTION 4: ECOMMERCE & MULTI-CHANNEL RETAIL HIGHLIGHT */}
                <EcommerceSection
                  onStartProject={handleStartProject}
                  onExploreCapabilities={() => handleNavigate('capabilities-page')}
                />

                {/* SECTION 5: PROCESS */}
                <ProcessSection
                  onExploreFullProcess={() => handleNavigate('process-page')}
                  onStartProject={handleStartProject}
                />

                {/* SECTION 6: INDUSTRIES */}
                <IndustriesSection
                  onExploreFullIndustries={() => handleNavigate('industries-page')}
                  onStartProject={handleStartProject}
                  onSeeProcess={() => handleNavigate('process-page')}
                />

                {/* SECTION 7: CLIENTS */}
                <ClientTrustStrip />

                {/* SECTION 8: WORK */}
                <WorkSection
                  onExploreFullWork={() => handleNavigate('work-page')}
                  onSelectCaseStudy={handleSelectCaseStudy}
                />

                {/* SECTION 9: TESTIMONIALS */}
                <TestimonialsSection />

                {/* SECTION 10: INSIGHTS */}
                <InsightsSection
                  onExploreFullInsights={() => handleNavigate('insights-page')}
                  onSelectArticle={handleSelectArticle}
                />

                {/* SECTION 11: FAQ */}
                <FAQSection />

                {/* SECTION 12: FINAL CTA */}
                <CTASection
                  onStartProject={handleStartProject}
                  onBookConversation={handleStartProject}
                />
              </div>
            ) : siteView === 'privacy-page' ? (
              <PrivacyPage
                onReturnHome={() => handleNavigate('homepage')}
                onContact={() => handleNavigate('contact-page')}
                onStartProject={handleStartProject}
              />
            ) : siteView === 'terms-page' ? (
              <TermsPage
                onReturnHome={() => handleNavigate('homepage')}
                onContact={() => handleNavigate('contact-page')}
                onStartProject={handleStartProject}
              />
            ) : siteView === 'login-page' ? (
              <ClientLoginPage
                onReturnHome={() => handleNavigate('homepage')}
                onStartProject={handleStartProject}
                onContact={() => handleNavigate('contact-page')}
              />
            ) : siteView === 'contact-page' ? (
              <ContactPage
                onReturnHome={() => handleNavigate('homepage')}
                onStartProject={handleStartProject}
              />
            ) : siteView === 'about-page' ? (
              <AboutPage
                onStartProject={handleStartProject}
                onExploreCapabilities={() => handleNavigate('capabilities-page')}
                onSeeProcess={() => handleNavigate('process-page')}
                onSelectCaseStudy={handleSelectCaseStudy}
                onSelectArticle={handleSelectArticle}
                onExploreWork={() => handleNavigate('work-page')}
                onExploreInsights={() => handleNavigate('insights-page')}
              />
            ) : siteView === 'start-project' ? (
              <StartProjectPage
                onReturnHome={() => handleNavigate('homepage')}
                onExploreInsights={() => handleNavigate('insights-page')}
                externalStepOverride={startProjectStep}
                externalFormDataOverride={startProjectData}
              />
            ) : siteView === 'capabilities-page' ? (
              <CapabilitiesPage
                onStartProject={handleStartProject}
                onSeeHowWeWork={() => handleNavigate('process-page')}
                onDiscussService={() => handleStartProject()}
              />
            ) : siteView === 'process-page' ? (
              <ProcessPage
                onStartProject={handleStartProject}
                onExploreCapabilities={() => handleNavigate('capabilities-page')}
              />
            ) : siteView === 'industries-page' ? (
              <IndustriesPage
                onStartProject={handleStartProject}
                onSeeHowWeWork={() => handleNavigate('process-page')}
                onExploreCapabilities={() => handleNavigate('capabilities-page')}
              />
            ) : siteView === 'work-page' ? (
              <WorkPage
                onSelectCaseStudy={handleSelectCaseStudy}
                onStartProject={handleStartProject}
                onSeeHowWeWork={() => handleNavigate('process-page')}
              />
            ) : siteView === 'work-detail' ? (
              <CaseStudyDetailPage
                slug={activeCaseStudySlug}
                onBackToWork={() => handleNavigate('work-page')}
                onSelectCaseStudy={handleSelectCaseStudy}
                onStartProject={handleStartProject}
                onExploreCapabilities={() => handleNavigate('capabilities-page')}
              />
            ) : siteView === 'insights-page' ? (
              <InsightsPage
                onSelectArticle={handleSelectArticle}
                onStartProject={handleStartProject}
                onExploreCapabilities={() => handleNavigate('capabilities-page')}
              />
            ) : (
              <ArticleDetailPage
                slug={activeArticleSlug}
                onBackToInsights={() => handleNavigate('insights-page')}
                onSelectArticle={handleSelectArticle}
                onStartProject={handleStartProject}
                onExploreCapabilities={() => handleNavigate('capabilities-page')}
                onSelectCaseStudy={handleSelectCaseStudy}
              />
            )}
          </main>

          {/* Production Footer */}
          <Footer onNavigate={handleNavigate} onStartProject={handleStartProject} />
        </>
      )}
      <ThemeSwitcher />
    </div>
  );
}
