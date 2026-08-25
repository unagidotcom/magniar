import React, { useState } from 'react';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { CapabilitiesPage } from './components/capabilities/CapabilitiesPage';
import { ProcessPage } from './components/process/ProcessPage';
import { IndustriesPage } from './components/industries/IndustriesPage';
import { WorkPage } from './components/work/WorkPage';
import { CaseStudyDetailPage } from './components/work/CaseStudyDetailPage';
import { InsightsPage } from './components/insights/InsightsPage';
import { ArticleDetailPage } from './components/insights/ArticleDetailPage';
import { StartProjectPage } from './components/startProject/StartProjectPage';
import { AboutPage } from './components/about/AboutPage';
import { AdminShell } from './components/admin/AdminShell';
import { ContactPage } from './components/contact/ContactPage';
import { ThemeSwitcher } from './components/common/ThemeSwitcher';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { ClientLoginPage } from './components/pages/ClientLoginPage';
import { HomePage } from './components/home/HomePage';
import { StartProjectStep, ProjectRequestFormData } from './types/startProject';

const getInitialSiteView = ():
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
  | 'admin-os' => {
  if (typeof window === 'undefined') return 'homepage';

  const path = window.location.pathname;
  if (path === '/admin' || path === '/admin/login' || path.startsWith('/admin/')) {
    return 'admin-os';
  }
  if (path === '/portal' || path === '/portal/login' || path.startsWith('/portal/') || path === '/client-login') {
    return 'login-page';
  }

  return 'homepage';
};

const getInitialActiveTab = () => {
  if (typeof window === 'undefined') return 'shell';
  return window.location.pathname.startsWith('/admin') ? 'admin-os' : 'shell';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => getInitialActiveTab());

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
  >(() => getInitialSiteView());

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
    } else if (route === 'services') {
      setSiteView('homepage');
      setActiveTab('services');
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
        window.setTimeout(() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
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
                : activeTab === 'services'
                ? 'services'
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
              if (tab === 'services') handleNavigate('services');
              else if (tab === 'about') handleAboutPage();
              else if (tab === 'start-project') handleStartProject();
              else if (tab === 'capabilities') handleNavigate('capabilities-page');
              else if (tab === 'process') handleNavigate('process-page');
              else if (tab === 'industries') handleNavigate('industries-page');
              else if (tab === 'work') handleNavigate('work-page');
              else if (tab === 'insights') handleNavigate('insights-page');
              else if (tab === 'contact') handleNavigate('contact-page');
              else handleNavigate('homepage');
            }}
          />

          {/* Main Website Canvas */}
          <main className="flex-1 w-full">
            {siteView === 'homepage' ? (
              <HomePage
                onStartProject={handleStartProject}
                onNavigate={handleNavigate}
              />
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
