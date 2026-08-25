import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Globe2,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  ShoppingBag,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { MagniarButton } from '../common/MagniarButton';
import { ClientTrustStrip } from '../common/ClientTrustStrip';
import { FAQSection } from '../common/FAQSection';

interface HomePageProps {
  onStartProject?: () => void;
  onNavigate?: (route: string) => void;
}

const services = [
  {
    title: 'Websites',
    description: 'Clean, responsive websites built around your business goals.',
    items: ['Website design & development', 'WordPress', 'Custom websites', 'Landing pages'],
    cta: 'Explore Websites',
    icon: Globe2,
  },
  {
    title: 'eCommerce',
    description: 'Storefronts and buying journeys designed for clarity and conversion.',
    items: ['Shopify', 'WooCommerce', 'eCommerce development', 'Conversion-focused storefronts'],
    cta: 'Explore eCommerce',
    icon: ShoppingBag,
  },
  {
    title: 'Marketing',
    description: 'Paid campaigns and tracking systems managed with practical discipline.',
    items: ['Meta Ads', 'Google Ads', 'Analytics & tracking', 'Campaign management'],
    cta: 'Explore Marketing',
    icon: Megaphone,
  },
  {
    title: 'Maintenance',
    description: 'Ongoing technical support to keep your digital presence reliable.',
    items: ['Website care', 'Performance', 'Technical support', 'Ongoing updates'],
    cta: 'Explore Maintenance',
    icon: Wrench,
  },
];

const audiences = [
  'Small businesses',
  'Growing brands',
  'eCommerce businesses',
  'Service businesses',
  'Established companies',
];

const processSteps = [
  {
    step: '01',
    title: 'Discover',
    text: 'Understand your business, goals and customers.',
  },
  {
    step: '02',
    title: 'Build',
    text: 'Design and develop the right digital experience.',
  },
  {
    step: '03',
    title: 'Launch',
    text: 'Test, connect and launch the required systems.',
  },
  {
    step: '04',
    title: 'Grow',
    text: 'Optimize your website, campaigns and digital presence over time.',
  },
];

const pricing = [
  {
    title: 'Websites',
    price: 'Custom project pricing',
    detail: 'Quoted after scope, pages, content and platform needs are clear.',
  },
  {
    title: 'eCommerce',
    price: 'Custom project pricing',
    detail: 'Quoted around store complexity, catalog, integrations and launch needs.',
  },
  {
    title: 'Marketing',
    price: 'INR 5,000 / month or 30% of ad spend',
    detail: 'Final pricing depends on scope, platforms and account complexity.',
  },
  {
    title: 'Maintenance',
    price: 'Custom monthly pricing',
    detail: 'Based on update frequency, technical support and site complexity.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onStartProject, onNavigate }) => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#050505] text-[#F5F7FA]">
      <section className="relative min-h-[calc(100vh-76px)] lg:min-h-[calc(100vh-84px)] flex items-center overflow-hidden px-4 sm:px-6 lg:px-12 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] opacity-30 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0099FF]/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs sm:text-sm text-slate-300">
              <Sparkles className="w-4 h-4 text-[#0099FF]" />
              <span>Websites, eCommerce, ads and technical support</span>
            </div>

            <div className="space-y-6">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-[1.02] max-w-5xl">
                Digital experiences built to grow your business.
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Websites, eCommerce and performance marketing - designed, built and managed from one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <MagniarButton variant="primary" size="lg" onClick={onStartProject} fullWidth={false}>
                Start a Project
              </MagniarButton>
              <MagniarButton variant="secondary" size="lg" onClick={scrollToServices} fullWidth={false}>
                View Services
              </MagniarButton>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 text-xs sm:text-sm text-slate-400">
              {['Websites', 'eCommerce', 'Meta Ads', 'Google Ads', 'Analytics'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0099FF]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[2px] border border-white/10 bg-[#0A0C0F] p-5 sm:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Project focus</span>
                  <BadgeCheck className="w-5 h-5 text-[#0099FF]" />
                </div>

                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.title}
                      onClick={scrollToServices}
                      className="w-full flex items-center justify-between gap-4 rounded-[2px] border border-white/8 bg-[#050505] px-4 py-4 text-left transition-colors hover:border-[#0099FF]/45 hover:bg-[#080B10]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="h-10 w-10 shrink-0 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/25 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#0099FF]" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-white">{service.title}</span>
                          <span className="block text-xs text-slate-400 truncate">{service.items.slice(0, 2).join(' + ')}</span>
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#0099FF] shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-4 sm:px-6 lg:px-12 py-20 sm:py-24 bg-[#F5F7FA] text-[#101827]">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-sm font-semibold text-[#0073CC] uppercase tracking-wide">Services</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
                Everything you need to build and grow online.
              </h2>
            </div>
            <p className="lg:col-span-5 text-base sm:text-lg text-[#435063] leading-relaxed">
              Choose a focused project or combine services into one managed digital system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.title}
                  onClick={() => onNavigate?.('capabilities-page')}
                  className="group bg-white p-6 sm:p-7 text-left min-h-[340px] flex flex-col justify-between transition-colors hover:bg-[#F8FAFC]"
                >
                  <div className="space-y-5">
                    <div className="h-12 w-12 rounded-full bg-[#EAF5FF] text-[#0073CC] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl font-semibold text-[#101827]">{service.title}</h3>
                      <p className="text-sm text-[#435063] leading-relaxed">{service.description}</p>
                    </div>
                    <ul className="space-y-2.5">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#243044]">
                          <CheckCircle2 className="w-4 h-4 text-[#0073CC] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0073CC]">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-12 py-20 sm:py-24 bg-white text-[#101827] border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-sm font-semibold text-[#0073CC] uppercase tracking-wide">Who we help</span>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Built for businesses ready to move forward.
            </h2>
            <p className="text-base sm:text-lg text-[#435063] leading-relaxed">
              Magniar works with practical businesses that need a clearer website, better online selling, stronger ads or dependable technical support.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {audiences.map((audience) => (
              <div key={audience} className="border border-slate-200 bg-[#F8FAFC] px-5 py-4 rounded-[2px] flex items-center justify-between">
                <span className="font-semibold text-[#101827]">{audience}</span>
                <ArrowRight className="w-4 h-4 text-[#0073CC]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-12 py-20 sm:py-24 bg-[#050505] text-[#F5F7FA]">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-sm font-semibold text-[#0099FF] uppercase tracking-wide">How we work</span>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
              A simple path from idea to launch.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {processSteps.map((item) => (
              <div key={item.step} className="bg-[#0A0C0F] p-6 sm:p-7 min-h-[230px] flex flex-col justify-between">
                <span className="text-sm font-semibold text-[#0099FF]">{item.step}</span>
                <div className="space-y-3">
                  <h3 className="font-heading text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClientTrustStrip />

      <section className="px-4 sm:px-6 lg:px-12 py-20 sm:py-24 bg-[#F5F7FA] text-[#101827] border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-sm font-semibold text-[#0073CC] uppercase tracking-wide">Pricing</span>
              <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
                Clear starting points.
              </h2>
            </div>
            <p className="lg:col-span-5 text-base sm:text-lg text-[#435063] leading-relaxed">
              Final pricing depends on scope, platforms and account complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {pricing.map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-[2px] p-6 sm:p-7 min-h-[230px] flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-sm font-semibold text-[#0073CC] uppercase tracking-wide">{item.title}</span>
                  <div className="font-heading text-2xl font-semibold text-[#101827] leading-tight">
                    {item.price}
                  </div>
                </div>
                <p className="text-sm text-[#435063] leading-relaxed pt-6">{item.detail}</p>
              </div>
            ))}
          </div>

          <MagniarButton variant="primary" size="lg" onClick={onStartProject}>
            Discuss Your Project
          </MagniarButton>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-12 py-20 sm:py-24 bg-white text-[#101827] border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-sm font-semibold text-[#0073CC] uppercase tracking-wide">About Magniar</span>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Digital work, without the unnecessary layers.
            </h2>
            <p className="text-base sm:text-lg text-[#435063] leading-relaxed max-w-3xl">
              Magniar provides website development, eCommerce, digital advertising, analytics and ongoing technical support for businesses that need practical digital execution.
            </p>
            <p className="text-base text-[#435063] leading-relaxed max-w-3xl">
              The business is operated by Raingam Luikham and based in Gurgaon, Haryana, India.
            </p>
            <MagniarButton variant="secondary" size="lg" onClick={() => onNavigate?.('about-page')}>
              More About Magniar
            </MagniarButton>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-3">
            <div className="border border-slate-200 bg-[#F8FAFC] p-5 rounded-[2px] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#0073CC] shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-[#101827]">Gurgaon, Haryana, India</div>
                <div className="text-sm text-[#657286]">Business location</div>
              </div>
            </div>
            <div className="border border-slate-200 bg-[#F8FAFC] p-5 rounded-[2px] flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#0073CC] shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-[#101827] break-all">magniarventures@gmail.com</div>
                <div className="text-sm text-[#657286]">Business email</div>
              </div>
            </div>
            <div className="border border-slate-200 bg-[#F8FAFC] p-5 rounded-[2px] flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#0073CC] shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-[#101827]">8798250520</div>
                <div className="text-sm text-[#657286]">Contact number</div>
              </div>
            </div>
            <div className="border border-slate-200 bg-[#F8FAFC] p-5 rounded-[2px] flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-[#0073CC] shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-[#101827]">UDYAM-HR-OS-0177833</div>
                <div className="text-sm text-[#657286]">Udyam Registration No. - Micro enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="px-4 sm:px-6 lg:px-12 py-20 sm:py-24 bg-[#050505] text-[#F5F7FA] border-t border-white/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-sm font-semibold text-[#0099FF] uppercase tracking-wide">Start</span>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Have a project in mind?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Tell us what you're building, improving or trying to grow.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
            <MagniarButton variant="primary" size="lg" onClick={onStartProject}>
              Start a Project
            </MagniarButton>
            <MagniarButton variant="secondary" size="lg" onClick={() => onNavigate?.('contact-page')}>
              Contact Magniar
            </MagniarButton>
          </div>
        </div>
      </section>
    </div>
  );
};
