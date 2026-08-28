import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';
import { MagniarButton } from '../common/MagniarButton';
import { ClientTrustStrip } from '../common/ClientTrustStrip';
import { FAQSection } from '../common/FAQSection';
import { BrandLogo } from '../common/BrandLogo';

interface HomePageProps {
  onStartProject?: () => void;
  onNavigate?: (route: string) => void;
}

const services = [
  {
    title: 'Websites',
    description: 'High-performing websites built for speed, clarity, SEO and conversions.',
    items: ['Website design', 'WordPress', 'Custom development', 'Landing pages'],
    icon: Globe2,
  },
  {
    title: 'eCommerce',
    description: 'Scalable online stores that make products easier to discover and buy.',
    items: ['Shopify', 'WooCommerce', 'Storefront development', 'Conversion storefronts'],
    icon: ShoppingBag,
  },
  {
    title: 'Marketing',
    description: 'Data-driven campaigns that grow traffic, leads and revenue.',
    items: ['Meta Ads', 'Google Ads', 'Analytics', 'Tracking'],
    icon: Megaphone,
  },
  {
    title: 'Maintenance',
    description: 'Ongoing care and support to keep your website fast, secure and up to date.',
    items: ['Technical support', 'Performance', 'Updates', 'Ongoing care'],
    icon: Wrench,
  },
];

const audiences = [
  {
    title: 'Growing businesses',
    text: 'Move faster with a stronger digital foundation that supports consistent growth.',
    icon: Users,
  },
  {
    title: 'eCommerce brands',
    text: 'Build online stores that connect and keep customers coming back.',
    icon: ShoppingBag,
  },
  {
    title: 'Established companies',
    text: 'Modernize your digital presence and unlock new growth opportunities.',
    icon: MonitorSmartphone,
  },
];

const processSteps = [
  {
    title: 'Discover',
    text: 'We learn about your business, audience and goals.',
    icon: Users,
  },
  {
    title: 'Plan',
    text: 'We create a smart strategy and roadmap for success.',
    icon: BarChart3,
  },
  {
    title: 'Build',
    text: 'We design and develop with performance and quality.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Grow',
    text: 'We launch, optimize and scale for long-term results.',
    icon: Sparkles,
  },
];

const reasons = [
  {
    title: 'Strategy first',
    text: 'Every decision is aligned with your business goals.',
    icon: Globe2,
  },
  {
    title: 'Performance driven',
    text: 'We focus on measurable results that support the bottom line.',
    icon: BarChart3,
  },
  {
    title: 'Transparent and honest',
    text: 'Clear communication, no hidden surprises and no unsupported claims.',
    icon: ShieldCheck,
  },
  {
    title: 'Long-term partner',
    text: 'Support for your growth beyond the first launch.',
    icon: Clock3,
  },
];

const pricing = [
  {
    title: 'Websites',
    price: 'Custom project pricing',
    detail: 'Quoted after scope, pages, content and platform needs are clear.',
    action: 'Get started',
  },
  {
    title: 'Marketing',
    price: 'INR 5,000 / month or 30% of ad spend',
    detail: 'Final pricing depends on scope, platforms and account complexity.',
    action: 'Discuss your needs',
    featured: true,
  },
  {
    title: 'eCommerce',
    price: 'Custom project pricing',
    detail: 'Quoted around store complexity, catalog, integrations and launch needs.',
    action: 'Plan a store',
  },
  {
    title: 'Maintenance',
    price: 'Custom monthly pricing',
    detail: 'Based on update frequency, technical support and site complexity.',
    action: 'Request support',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onStartProject, onNavigate }) => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#FFFFFF] text-[#0B0D0F]">
      <section className="px-4 pb-10 pt-6 sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[8px] bg-[#F5F7FA]">
          <div className="grid grid-cols-1 gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-14">
            <div className="flex flex-col justify-center lg:col-span-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89A72]">
                Marketing agency for growing businesses
              </span>
              <h1 className="mt-5 max-w-[680px] font-heading text-[2.35rem] font-semibold leading-[1.02] text-[#0B0D0F] sm:text-[3.25rem] lg:text-[4.35rem]">
                Digital experiences that help ambitious businesses grow<span className="text-[#B89A72]">.</span>
              </h1>
              <p className="mt-5 max-w-[580px] text-base leading-7 text-[#68717C] sm:text-[1.05rem]">
                We design, build and market high-performance websites and eCommerce stores that attract, convert and retain customers.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <MagniarButton
                  variant="primary"
                  size="md"
                  onClick={onStartProject}
                  className="rounded-[5px] !border-[#B89A72] !bg-[#B89A72] !text-[#FFFFFF] hover:!bg-[#8F714D] hover:shadow-none"
                >
                  Start a project
                </MagniarButton>
                <button
                  type="button"
                  onClick={scrollToServices}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[5px] border border-[#D9DEE5] bg-[#FFFFFF] px-5 py-2.5 text-sm font-semibold text-[#0B0D0F] transition-colors hover:border-[#B89A72]/40 hover:text-[#B89A72]"
                >
                  View our work
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 text-xs text-[#68717C] sm:grid-cols-3">
                {['Transparent process', 'No long-term lock-ins', 'Results driven'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#B89A72]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[360px] rounded-[8px] bg-[#F4EFE8] p-5 sm:min-h-[430px] sm:p-8 lg:col-span-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.75),transparent_32%),radial-gradient(circle_at_18%_82%,rgba(184,154,114,0.18),transparent_28%)]" />
              <div className="relative mx-auto mt-2 max-w-[500px] rounded-[22px] border border-[#FFFFFF]/80 bg-[#FFFFFF]/72 p-4 shadow-[0_24px_80px_rgba(184,154,114,0.20)] backdrop-blur-md">
                <div className="rounded-[16px] border border-[#D9DEE5] bg-[#FFFFFF] p-4">
                  <div className="mb-6 flex items-center justify-between text-[10px] font-semibold text-[#68717C]">
                    <BrandLogo variant="wordmark" className="h-7 w-[150px]" />
                    <span className="rounded-full bg-[#F5F7FA] px-2 py-1">Live</span>
                  </div>
                  <div className="grid grid-cols-[1fr_0.75fr] gap-5">
                    <div>
                      <h2 className="font-heading text-3xl font-semibold leading-tight text-[#0B0D0F]">
                        Website, store and growth system.
                      </h2>
                      <button
                        type="button"
                        onClick={onStartProject}
                        className="mt-6 inline-flex items-center gap-2 rounded-[5px] bg-[#0B0D0F] px-4 py-2 text-xs font-semibold text-[#FFFFFF]"
                      >
                        Start plan
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {services.slice(0, 3).map((service) => {
                        const Icon = service.icon;
                        return (
                          <div key={service.title} className="rounded-[10px] border border-[#D9DEE5] bg-[#F5F7FA] p-3">
                            <Icon className="mb-5 h-4 w-4 text-[#B89A72]" />
                            <span className="block text-sm font-semibold text-[#0B0D0F]">{service.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-7 right-7 w-[154px] rounded-[20px] border border-[#FFFFFF] bg-[#FFFFFF] p-2 shadow-[0_18px_50px_rgba(11,13,15,0.16)] sm:w-[190px]">
                <div className="rounded-[15px] border border-[#D9DEE5] bg-[#F5F7FA] p-3">
                  <div className="mb-8 flex items-center justify-between text-[9px] text-[#68717C]">
                    <span>Mobile</span>
                    <span>SEO</span>
                  </div>
                  <p className="font-heading text-lg font-semibold leading-tight text-[#0B0D0F]">
                    Refined digital presence.
                  </p>
                  <div className="mt-8 h-20 rounded-[12px] bg-[#F4EFE8]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientTrustStrip />

      <section id="services" className="bg-[#FFFFFF] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[1160px] border-t border-[#D9DEE5] pt-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89A72]">What we do</span>
              <h2 className="mt-4 max-w-[580px] font-heading text-[2rem] font-semibold leading-tight text-[#0B0D0F] sm:text-[2.55rem]">
                End-to-end digital solutions for modern businesses.
              </h2>
            </div>
            <p className="max-w-[560px] text-base leading-7 text-[#68717C] lg:col-span-6 lg:justify-self-end">
              From strategy and design to development and growth marketing, we handle the digital work that helps a business move forward.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="rounded-[8px] border border-[#D9DEE5] bg-[#FFFFFF] p-6 shadow-[0_16px_40px_rgba(11,13,15,0.04)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#F4EFE8] text-[#B89A72]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-8 font-heading text-xl font-semibold text-[#0B0D0F]">{service.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#68717C]">{service.description}</p>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('capabilities-page')}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B89A72] transition-colors hover:text-[#8F714D]"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-[1160px] border-t border-[#D9DEE5] pt-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89A72]">Who we help</span>
          <h2 className="mt-4 font-heading text-[2rem] font-semibold leading-tight text-[#0B0D0F] sm:text-[2.35rem]">
            Solutions tailored to your goals.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <div key={audience.title} className="border-l border-[#D9DEE5] pl-5">
                  <Icon className="h-5 w-5 text-[#B89A72]" />
                  <h3 className="mt-4 text-base font-semibold text-[#0B0D0F]">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68717C]">{audience.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-1 py-10 sm:py-12">
        <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[12px] bg-[#0B0D0F] px-5 py-10 text-[#FFFFFF] sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89A72]">Our process</span>
              <h2 className="mt-4 font-heading text-[2rem] font-semibold leading-tight">
                A clear path from strategy to growth.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {processSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#FFFFFF]/25 text-[#FFFFFF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-[220px] text-sm leading-6 text-[#D9DEE5]">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-[1160px]">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89A72]">Why choose us</span>
          <h2 className="mt-4 font-heading text-[2rem] font-semibold leading-tight text-[#0B0D0F] sm:text-[2.35rem]">
            Partners in your growth.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className="border-l border-[#D9DEE5] pl-5">
                  <Icon className="h-5 w-5 text-[#B89A72]" />
                  <h3 className="mt-4 text-sm font-semibold text-[#0B0D0F]">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68717C]">{reason.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-[1160px] border-t border-[#D9DEE5] pt-10">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89A72]">Engagement models</span>
              <h2 className="mt-4 font-heading text-[2rem] font-semibold leading-tight text-[#0B0D0F] sm:text-[2.35rem]">
                Flexible options. Clear value.
              </h2>
            </div>
            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B89A72] transition-colors hover:text-[#8F714D] lg:col-span-6 lg:justify-self-end"
            >
              Need a custom solution? Let's talk
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pricing.map((item) => (
              <article
                key={item.title}
                className={`relative rounded-[8px] border bg-[#FFFFFF] p-6 ${item.featured ? 'border-[#B89A72] shadow-[0_18px_44px_rgba(184,154,114,0.14)]' : 'border-[#D9DEE5]'}`}
              >
                {item.featured ? (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B89A72] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFFFFF]">
                    Popular
                  </span>
                ) : null}
                <h3 className="text-base font-semibold text-[#0B0D0F]">{item.title}</h3>
                <p className="mt-3 min-h-[50px] text-sm leading-6 text-[#68717C]">{item.detail}</p>
                <div className="mt-6 font-heading text-xl font-semibold text-[#0B0D0F]">{item.price}</div>
                <button
                  type="button"
                  onClick={onStartProject}
                  className={`mt-6 inline-flex min-h-10 w-full items-center justify-center rounded-[5px] px-4 text-sm font-semibold transition-colors ${item.featured ? 'bg-[#B89A72] text-[#FFFFFF] hover:bg-[#8F714D]' : 'border border-[#D9DEE5] text-[#0B0D0F] hover:border-[#B89A72]/45 hover:text-[#B89A72]'}`}
                >
                  {item.action}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-8 rounded-[12px] bg-[#F5F7FA] p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89A72]">About Magniar</span>
            <h2 className="mt-4 max-w-[650px] font-heading text-[2rem] font-semibold leading-tight text-[#0B0D0F] sm:text-[2.35rem]">
              Digital work, without the unnecessary layers.
            </h2>
            <p className="mt-4 max-w-[700px] text-base leading-7 text-[#68717C]">
              Magniar provides website development, eCommerce, digital advertising, analytics and ongoing technical support for businesses that need practical digital execution.
            </p>
          </div>

          <div className="rounded-[8px] border border-[#D9DEE5] bg-[#FFFFFF] p-5 lg:col-span-5">
            <div className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B89A72]">
              <Sparkles className="h-4 w-4" />
              Business details
            </div>
            <div className="space-y-4 text-sm text-[#68717C]">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B89A72]" />
                <span><strong className="text-[#0B0D0F]">Gurgaon, Haryana, India</strong><br />Business location</span>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#B89A72]" />
                <span><strong className="break-all text-[#0B0D0F]">magniarventures@gmail.com</strong><br />Business email</span>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#B89A72]" />
                <span><strong className="text-[#0B0D0F]">8798250520</strong><br />Contact number</span>
              </div>
              <div className="flex gap-3 border-t border-[#D9DEE5] pt-4">
                <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-[#B89A72]" />
                <span><strong className="text-[#0B0D0F]">UDYAM-HR-OS-0177833</strong><br />Udyam Registration No. / Micro enterprise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="bg-[#FFFFFF] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-6 overflow-hidden rounded-[12px] bg-[#F4EFE8] p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-[2rem] font-semibold leading-tight text-[#0B0D0F] sm:text-[2.45rem]">
              Ready to grow your business?
            </h2>
            <p className="mt-3 max-w-[560px] text-base leading-7 text-[#68717C]">
              Tell us what you are building, improving or trying to grow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[5px] bg-[#B89A72] px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] transition-colors hover:bg-[#8F714D]"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('contact-page')}
              className="inline-flex min-h-11 items-center justify-center rounded-[5px] border border-[#D9DEE5] bg-[#FFFFFF] px-5 py-2.5 text-sm font-semibold text-[#0B0D0F] transition-colors hover:border-[#B89A72]/45 hover:text-[#B89A72]"
            >
              Schedule a call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
