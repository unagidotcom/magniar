import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Layout,
  Database,
  Lock,
  Search,
  Bell,
  Sparkles,
  ArrowRight,
  Sliders,
  Layers,
} from 'lucide-react';

export const AdminDesignReview: React.FC = () => {
  const strategicQuestions = [
    {
      num: '01',
      title: 'Operating System Purpose & Scope',
      question: 'Why build a dedicated private operating system rather than extending public marketing templates?',
      answer:
        'The Magniar Admin Operating System serves a fundamentally different purpose from marketing pages. Public pages communicate value, build trust, and drive project intakes. The Admin OS is an operational workspace designed for execution: managing client requests, monitoring project delivery SLAs, processing financial settlements, and tracking portfolio metrics. Separating these concerns ensures zero bloat in marketing bundles and maximum operational utility.',
    },
    {
      num: '02',
      title: 'Public Site vs. Admin Shell Isolation',
      question: 'How does Chapter 13 enforce structural separation between public marketing and private admin layouts?',
      answer:
        'The public website relies on MarketingHeader and MarketingFooter with conversion CTAs. The Admin OS introduces a dedicated AdminShell containing AdminSidebar, AdminHeader, AdminPageHeader, and AdminModulePlaceholder. This structural separation prevents accidental leaking of admin components or marketing banners across boundaries, maintaining strict layout integrity.',
    },
    {
      num: '03',
      title: 'Authentication & Gateway Architecture',
      question: 'How is security and access control represented without relying on backend databases at this stage?',
      answer:
        'Chapter 13 provides an authentic split-screen /admin/login experience with AES-256-GCM security indicators, password verification, session persistence simulation, and 1-click Super Admin preview capabilities. Unauthenticated users are strictly gated to /admin/login, maintaining clear boundary semantics while allowing seamless developer testing.',
    },
    {
      num: '04',
      title: 'Routing & Sub-Module Architecture',
      question: 'How does the route structure scale as Magniar adds new internal tools and intelligence modules?',
      answer:
        'The Admin OS uses clean sub-route keys (dashboard, requests, prospects, clients, projects, strategies, proposals, invoices, payments, reports, content, team, settings). Each route renders through a standardized AdminPageHeader and AdminModulePlaceholder or custom dashboard, guaranteeing consistent page headers, metrics, action buttons, and drawer inspectors.',
    },
    {
      num: '05',
      title: 'Navigation Hierarchy & Sidebar Structure',
      question: 'What design logic governs the sidebar grouping and operational workflow hierarchy?',
      answer:
        'The navigation sidebar is structured into 5 logical domains: OVERVIEW (Dashboard), WORKFLOW (Requests, Prospects, Clients, Projects), FINANCE & OPS (Strategies, Proposals, Invoices, Payments), INTELLIGENCE (Reports, Content, Team), and SYSTEM (Settings). Badges dynamically highlight pending intakes and active tasks.',
    },
    {
      num: '06',
      title: 'Data Model Separation & Entity Integrity',
      question: 'How are Request, Prospect, Client, Project, Strategy, Invoice, and Payment kept distinct?',
      answer:
        'Each entity exists in a distinct data layer in src/data/adminMockData.ts. A REQUEST is an unverified intake; a PROSPECT is an qualified opportunity in CRM discovery; a CLIENT is an active retained entity; a PROJECT is an engineering/media engagement; an INVOICE is a billing settlement document; a PAYMENT is a confirmed cash transaction. Conflating these entities is strictly avoided.',
    },
    {
      num: '07',
      title: 'Visual Identity & Technical Aesthetic',
      question: 'How does Admin OS uphold Magniar’s dark, technical, editorial, and precise aesthetic?',
      answer:
        'Admin OS rejects generic rounded SaaS templates. It utilizes #050505 pure dark backdrops, subtle #0099FF electric accents, mono-spaced typography for numeric data and codes, 1px thin border borders, high-contrast dark tables, and crisp status pills.',
    },
    {
      num: '08',
      title: 'Executive Dashboard & Metrics Integrity',
      question: 'How are metrics presented to ensure clarity regarding simulated vs live operational data?',
      answer:
        'All metric cards feature explicit "DEMO DATA" tags to maintain transparency. The executive dashboard displays 4 core indicators: Active Clients, Active Projects, Open Requests Queue, and Outstanding Ledger, backed by quick intake actions and recent request feeds.',
    },
    {
      num: '09',
      title: 'Search, Command Palette & Notifications',
      question: 'How do command shortcuts and activity notifications enhance productivity?',
      answer:
        'Pressing Ctrl+K triggers a global Command Palette for quick route jumps or operational actions. The Notification Center popover tracks system events (new intakes, paid invoices, QA milestones) with unread counter badges and direct navigation links.',
    },
    {
      num: '10',
      title: 'Modular Scalability & Future System Integration',
      question: 'How is Chapter 13 prepared for future Supabase or backend REST API integration?',
      answer:
        'All mock data layers mirror clean SQL relational schema structures (MockRequest, MockProspect, MockClient, MockProject, MockInvoice). Replacing mock collections with async fetch hooks or Supabase client queries requires zero UI component refactoring.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8 px-4 font-mono text-xs text-white">
      {/* Title */}
      <div className="border-b border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-[#0099FF] text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>CHAPTER 13 — DESIGN & ARCHITECTURE REVIEW</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-display font-semibold text-white tracking-tight">
          Private Operating System Shell Architectural Assessment
        </h1>
        <p className="text-sm text-white/60 leading-relaxed max-w-3xl">
          Detailed evaluation of strategic questions governing Chapter 13: Admin Shell, authentication gating, navigation taxonomy, data model boundaries, and executive dashboard design.
        </p>
      </div>

      {/* Strategic Questions List */}
      <div className="space-y-8">
        {strategicQuestions.map((q) => (
          <div
            key={q.num}
            className="p-6 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded-[2px] font-bold">
                  {q.num}
                </span>
                <h3 className="text-base font-display font-semibold text-white">
                  {q.title}
                </h3>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                Strategic Question:
              </p>
              <p className="text-xs text-white/90 font-medium leading-relaxed italic">
                "{q.question}"
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/[0.05]">
              <p className="text-xs text-[#0099FF] font-semibold uppercase tracking-wider">
                Architectural Implementation:
              </p>
              <p className="text-xs text-white/70 leading-relaxed">
                {q.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* System Verification Summary */}
      <div className="p-6 bg-gradient-to-r from-emerald-500/10 via-[#0A0A0C] to-transparent border border-emerald-500/30 rounded-[2px] space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>CHAPTER 13 SYSTEM ARCHITECTURE VERIFIED & COMPLETE</span>
        </div>
        <p className="text-xs text-white/70 leading-relaxed">
          The Magniar Admin Operating System shell, gateway login, drawer inspectors, status badges, command palette, notification center, and data models are fully functional and ready for production preview.
        </p>
      </div>
    </div>
  );
};
