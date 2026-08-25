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
    description: 'Clean websites with practical structure, clear content and responsive execution.',
    items: ['Website Design', 'WordPress', 'Custom Development', 'Landing Pages'],
    cta: 'Explore Websites',
    icon: Globe2,
    accent: 'bg-[#B86F55]',
    panel: 'bg-[#E9E6DE]',
  },
  {
    title: 'eCommerce',
    description: 'Storefronts that make products easier to understand, choose and buy.',
    items: ['Shopify', 'WooCommerce', 'eCommerce Development', 'Conversion Storefronts'],
    cta: 'Explore eCommerce',
    icon: ShoppingBag,
    accent: 'bg-[#B86F55]',
    panel: 'bg-[#F4F1EA]',
  },
  {
    title: 'Marketing',
    description: 'Campaigns, tracking and reporting handled with steady commercial discipline.',
    items: ['Meta Ads', 'Google Ads', 'Analytics & Tracking', 'Campaign Management'],
    cta: 'Explore Marketing',
    icon: Megaphone,
    accent: 'bg-[#B86F55]',
    panel: 'bg-[#E9E6DE]',
  },
  {
    title: 'Maintenance',
    description: 'Ongoing care for performance, reliability, updates and technical support.',
    items: ['Website Care', 'Performance', 'Technical Support', 'Ongoing Updates'],
    cta: 'Explore Maintenance',
    icon: Wrench,
    accent: 'bg-[#B86F55]',
    panel: 'bg-[#F4F1EA]',
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
    text: 'Understand the business, customers, goals and practical constraints.',
  },
  {
    step: '02',
    title: 'Build',
    text: 'Design and develop the right website, store or campaign system.',
  },
  {
    step: '03',
    title: 'Launch',
    text: 'Test, connect tracking, prepare handover and launch carefully.',
  },
  {
    step: '04',
    title: 'Grow',
    text: 'Improve the website, campaigns and digital presence over time.',
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
    <div className="bg-[#F4F1EA] text-[#20211F]">
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-12 pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16">
        <div className="absolute inset-x-0 top-0 h-[58%] bg-[#242622]" />

        <div className="relative z-10 mx-auto max-w-[1320px]">
          <div className="grid min-h-[590px] grid-cols-1 overflow-hidden rounded-[6px] bg-[#242622] shadow-[0_28px_80px_rgba(32,33,31,0.24)] lg:grid-cols-12">
            <div className="relative flex min-h-[500px] flex-col justify-between overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:col-span-7 lg:px-12 lg:py-10">
              <div className="absolute inset-0 opacity-45">
                <div className="absolute left-[9%] top-[14%] h-44 w-44 rounded-full bg-[#B86F55]/14 blur-3xl" />
                <div className="absolute bottom-[12%] right-[10%] h-56 w-56 rounded-full bg-[#FAF9F6]/8 blur-3xl" />
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4F1EA]/75">
                <span className="rounded-full border border-[#F4F1EA]/18 bg-[#F4F1EA]/8 px-3 py-1">Digital Studio</span>
                <span>Websites</span>
                <span className="text-[#B86F55]">.</span>
                <span>eCommerce</span>
                <span className="text-[#B86F55]">.</span>
                <span>Marketing</span>
              </div>

              <div className="relative z-10 max-w-[690px] space-y-5 py-10 sm:py-14 lg:py-16">
                <h1 className="font-heading text-[2.42rem] font-semibold leading-[1.03] tracking-[-0.01em] text-[#F4F1EA] sm:text-[3.2rem] lg:text-[4rem]">
                  Digital experiences built to grow your business.
                </h1>
                <p className="max-w-[560px] text-[1rem] leading-7 text-[#D5D1C8] sm:text-[1.08rem]">
                  Websites, eCommerce and performance marketing - designed, built and managed from one place.
                </p>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <MagniarButton
                    variant="primary"
                    size="lg"
                    onClick={onStartProject}
                    className="rounded-[5px] border-[#B86F55] bg-[#B86F55] text-[#F4F1EA] hover:bg-[#8F4F3D] hover:shadow-none"
                  >
                    Start a Project
                  </MagniarButton>
                  <button
                    type="button"
                    onClick={scrollToServices}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] border border-[#F4F1EA]/20 px-6 py-3 text-sm font-semibold text-[#F4F1EA] transition-colors hover:border-[#B86F55]/70 hover:bg-[#B86F55]/12"
                  >
                    View Services
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-2 text-[12px] text-[#D5D1C8] sm:flex sm:flex-wrap">
                {['WordPress', 'Shopify', 'Meta Ads', 'Google Ads', 'Analytics'].map((item) => (
                  <span key={item} className="rounded-[5px] bg-[#F4F1EA]/8 px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative bg-[#E9E6DE] p-5 sm:p-8 lg:col-span-5 lg:p-10">
              <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-[#B86F55]/18" />
              <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full border border-[#D5D1C8]" />
              <div className="relative z-10 ml-auto flex max-w-[410px] flex-col gap-4">
                <div className="rounded-[6px] bg-[#FAF9F6] p-5 shadow-[0_18px_50px_rgba(52,48,40,0.12)]">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#686963]">Project path</span>
                    <BadgeCheck className="h-5 w-5 text-[#B86F55]" />
                  </div>
                  <div className="space-y-3">
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <button
                          key={service.title}
                          type="button"
                          onClick={scrollToServices}
                          className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-[5px] border border-[#D5D1C8] bg-[#F4F1EA] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#20211F]/30 hover:bg-white"
                        >
                          <span className={`flex h-10 w-10 items-center justify-center rounded-full ${service.accent}`}>
                            <Icon className="h-4 w-4 text-[#F4F1EA]" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-[#20211F]">{service.title}</span>
                            <span className="block truncate text-xs text-[#686963]">{service.items[0]} / {service.items[1]}</span>
                          </span>
                          <ArrowRight className="h-4 w-4 text-[#686963] transition-transform group-hover:translate-x-1" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[6px] bg-[#242622] p-4 text-[#F4F1EA]">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-[#D5D1C8]">Pricing clarity</span>
                    <strong className="mt-5 block text-lg font-semibold">No fake rates</strong>
                  </div>
                  <div className="rounded-[6px] bg-[#FAF9F6] p-4 text-[#20211F]">
                    <span className="block text-[11px] uppercase tracking-[0.14em]">Based in</span>
                    <strong className="mt-5 block text-lg font-semibold">Gurgaon</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-4 sm:px-6 lg:px-12 py-14 sm:py-18 bg-[#F4F1EA]">
        <div className="mx-auto max-w-[1180px] space-y-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B86F55]">Services</span>
              <h2 className="mt-3 max-w-[620px] font-heading text-[2rem] font-semibold leading-tight text-[#20211F] sm:text-[2.5rem]">
                Everything you need to build and grow online.
              </h2>
            </div>
            <p className="max-w-[560px] text-base leading-7 text-[#686963] lg:justify-self-end">
              Choose a focused project or combine services into one managed digital system. Each service is scoped around what the business actually needs next.
            </p>
          </div>

          <div className="space-y-5">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isAlternate = index % 2 === 1;
              return (
                <article
                  key={service.title}
                  className={`grid gap-4 rounded-[6px] border border-[#D5D1C8] ${service.panel} p-4 sm:p-5 lg:grid-cols-12`}
                >
                  <div className={`${isAlternate ? 'lg:col-start-8' : ''} lg:col-span-5 rounded-[5px] bg-[#FAF9F6]/82 p-5`}>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#686963]">
                        0{index + 1} / Service
                      </span>
                      <span className={`flex h-11 w-11 items-center justify-center rounded-[5px] ${service.accent}`}>
                        <Icon className="h-5 w-5 text-[#F4F1EA]" />
                      </span>
                    </div>
                    <h3 className="font-heading text-[1.75rem] font-semibold leading-tight text-[#20211F] sm:text-[2.1rem]">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-[0.98rem] leading-7 text-[#686963]">{service.description}</p>
                    <button
                      type="button"
                      onClick={() => onNavigate?.('capabilities-page')}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B86F55] underline decoration-[#B86F55]/20 underline-offset-4 transition-colors hover:text-[#8F4F3D]"
                    >
                      {service.cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className={`${isAlternate ? 'lg:col-start-1 lg:row-start-1' : ''} lg:col-span-7 rounded-[5px] bg-[#242622] p-5 text-[#F4F1EA] sm:p-6`}>
                    <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.items.map((item, itemIndex) => (
                        <div
                          key={item}
                          className={`rounded-[5px] border border-[#F4F1EA]/10 bg-[#F4F1EA]/7 p-4 ${itemIndex === 0 ? 'sm:row-span-2 sm:p-5' : ''}`}
                        >
                          <span className="mb-7 block text-[11px] font-bold uppercase tracking-[0.14em] text-[#B86F55]">
                            {String(itemIndex + 1).padStart(2, '0')}
                          </span>
                          <span className="block text-base font-semibold">{item}</span>
                          {itemIndex === 0 && (
                            <p className="mt-4 text-sm leading-6 text-[#D5D1C8]">
                              Built with enough structure to support launch, updates and future improvement.
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#E9E6DE] px-4 py-14 sm:px-6 sm:py-18 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:pt-8">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B86F55]">Who we help</span>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-tight text-[#20211F] sm:text-[2.4rem]">
              Built for businesses ready to move forward.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-[620px] text-base leading-7 text-[#686963]">
              Magniar works with practical businesses that need a clearer website, better online selling, stronger ads or dependable technical support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {audiences.map((audience, index) => (
                <span
                  key={audience}
                  className={`rounded-[5px] border border-[#D5D1C8] px-4 py-2 text-sm font-semibold text-[#20211F] ${index === 1 ? 'bg-[#FAF9F6] border-[#B86F55]/35' : 'bg-[#F4F1EA]'}`}
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#242622] px-4 py-14 text-[#F4F1EA] sm:px-6 sm:py-18 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B86F55]">How we work</span>
              <h2 className="mt-3 max-w-[420px] font-heading text-[2rem] font-semibold leading-tight sm:text-[2.4rem]">
                A simple path from idea to launch.
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[6px] bg-[#F4F1EA]/12 sm:grid-cols-2">
                {processSteps.map((item, index) => (
                  <div key={item.step} className={`min-h-[190px] bg-[#20211F] p-5 sm:p-6 ${index === 1 ? 'sm:translate-y-4' : ''}`}>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B86F55]">{item.step}</span>
                    <h3 className="mt-12 font-heading text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-3 max-w-[300px] text-sm leading-6 text-[#D5D1C8]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientTrustStrip />

      <section className="bg-[#F4F1EA] px-4 py-14 sm:px-6 sm:py-18 lg:px-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B86F55]">Pricing</span>
              <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-tight text-[#20211F] sm:text-[2.4rem]">
                Clear starting points.
              </h2>
            </div>
            <p className="max-w-[560px] text-base leading-7 text-[#686963] lg:col-span-7 lg:justify-self-end">
              Final pricing depends on scope, platforms and account complexity. No fake discounts, no unsupported guarantees.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
            {pricing.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-[6px] border border-[#D5D1C8] p-5 sm:p-6 ${index === 2 ? 'bg-[#FAF9F6] border-[#B86F55]/40' : 'bg-[#FAF9F6]'}`}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#B86F55]">{item.title}</span>
                <div className="mt-5 font-heading text-[1.3rem] font-semibold leading-tight text-[#20211F] sm:text-[1.55rem]">
                  {item.price}
                </div>
                <p className="mt-5 text-sm leading-6 text-[#686963]">{item.detail}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onStartProject}
            className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-[5px] bg-[#B86F55] px-5 py-2.5 text-sm font-semibold text-[#F4F1EA] transition-colors hover:bg-[#8F4F3D]"
          >
            Discuss Your Project
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="bg-[#E9E6DE] px-4 py-14 sm:px-6 sm:py-18 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B86F55]">About Magniar</span>
            <h2 className="mt-3 max-w-[660px] font-heading text-[2rem] font-semibold leading-tight text-[#20211F] sm:text-[2.4rem]">
              Digital work, without the unnecessary layers.
            </h2>
            <p className="mt-5 max-w-[690px] text-base leading-7 text-[#686963]">
              Magniar provides website development, eCommerce, digital advertising, analytics and ongoing technical support for businesses that need practical digital execution.
            </p>
            <p className="mt-4 max-w-[620px] text-base leading-7 text-[#686963]">
              The business is operated by Raingam Luikham and based in Gurgaon, Haryana, India.
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.('about-page')}
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-[5px] border border-[#20211F]/20 px-5 py-2.5 text-sm font-semibold text-[#20211F] transition-colors hover:border-[#20211F] hover:bg-[#20211F] hover:text-[#F4F1EA]"
            >
              More About Magniar
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[6px] bg-[#FAF9F6] p-5 shadow-[0_18px_50px_rgba(52,48,40,0.10)] sm:p-6">
              <div className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B86F55]">
                <Sparkles className="h-4 w-4" />
                Business details
              </div>
              <div className="space-y-4 text-sm text-[#686963]">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B86F55]" />
                  <span><strong className="text-[#20211F]">Gurgaon, Haryana, India</strong><br />Business location</span>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#B86F55]" />
                  <span><strong className="break-all text-[#20211F]">magniarventures@gmail.com</strong><br />Business email</span>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#B86F55]" />
                  <span><strong className="text-[#20211F]">8798250520</strong><br />Contact number</span>
                </div>
                <div className="flex gap-3 border-t border-[#D5D1C8] pt-4">
                  <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-[#B86F55]" />
                  <span><strong className="text-[#20211F]">UDYAM-HR-OS-0177833</strong><br />Udyam Registration No. / Micro enterprise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="bg-[#242622] px-4 py-14 text-[#F4F1EA] sm:px-6 sm:py-18 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 rounded-[6px] bg-[#FAF9F6] p-6 text-[#20211F] sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-[0.16em]">Start</span>
            <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-tight sm:text-[2.55rem]">
              Have a project in mind?
            </h2>
            <p className="mt-4 max-w-[560px] text-base leading-7 text-[#686963]">
              Tell us what you're building, improving or trying to grow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[5px] bg-[#B86F55] px-5 py-2.5 text-sm font-semibold text-[#F4F1EA] transition-colors hover:bg-[#8F4F3D]"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('contact-page')}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[5px] border border-[#20211F]/30 px-5 py-2.5 text-sm font-semibold text-[#20211F] transition-colors hover:bg-[#20211F]/8"
            >
              Contact Magniar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
