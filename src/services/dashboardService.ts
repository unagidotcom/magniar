import {
  MOCK_REQUESTS,
  MOCK_PROSPECTS,
  MOCK_CLIENTS,
  MOCK_PROJECTS,
  MOCK_INVOICES,
  MOCK_PAYMENTS,
  MOCK_NOTIFICATIONS,
  MockRequest,
  MockClient,
  MockProject,
  MockInvoice,
} from '../data/adminMockData';

export interface AttentionItem {
  id: string;
  type: 'NEW_REQUEST' | 'INVOICE_OVERDUE' | 'PROJECT_DEADLINE' | 'PROPOSAL_WAITING' | 'CLIENT_ALERT';
  priority: 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW';
  title: string;
  entityName: string;
  category: string;
  meta: string;
  actionText: string;
  targetRoute: string;
  badgeText: string;
  badgeStyle: string;
}

export interface ClientHealthItem {
  id: string;
  clientName: string;
  industry: string;
  leadPartner: string;
  healthStatus: 'HEALTHY' | 'ATTENTION' | 'AT_RISK' | 'PAUSED';
  monthlyValue: string;
  activeProjects: number;
  nextAction: string;
  note?: string;
}

export interface PipelineStageCount {
  stage: 'NEW' | 'REVIEWING' | 'QUALIFIED' | 'DISCOVERY' | 'PROPOSAL' | 'WON' | 'LOST';
  label: string;
  count: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  label: string;
}

export interface FinancialSummary {
  monthlyRevenue: string;
  revenueGrowth: string;
  outstandingInvoices: string;
  overdueInvoices: string;
  upcomingInvoices: string;
  paidThisMonth: string;
  isDemoData: boolean;
}

export interface UpcomingEvent {
  id: string;
  dayLabel: string;
  title: string;
  clientName: string;
  time: string;
  type: 'MEETING' | 'DEADLINE' | 'REPORT' | 'INVOICE' | 'STRATEGY';
}

export interface ActivityLogItem {
  id: string;
  type: 'NEW_REQUEST' | 'PROJECT_UPDATED' | 'INVOICE_PAID' | 'PROPOSAL_SENT' | 'STRATEGY_APPROVED';
  title: string;
  entityName: string;
  timestamp: string;
  actor: string;
  routeTarget: string;
}

// Service abstractions
export const dashboardService = {
  getAttentionItems(): AttentionItem[] {
    return [
      {
        id: 'att-1',
        type: 'NEW_REQUEST',
        priority: 'URGENT',
        title: 'New Project Intake',
        entityName: 'Solaris Apparel Group',
        category: 'E-commerce / Apparel',
        meta: 'Meta + Shopify Scale ($50k-$100k/mo)',
        actionText: 'REVIEW',
        targetRoute: 'requests',
        badgeText: 'NEW',
        badgeStyle: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      },
      {
        id: 'att-2',
        type: 'INVOICE_OVERDUE',
        priority: 'URGENT',
        title: 'Invoice Overdue (11 Days)',
        entityName: 'Aura Skincare Labs',
        category: 'INV-2026-0715',
        meta: '$28,000.00 Outstanding Milestone',
        actionText: 'VIEW',
        targetRoute: 'invoices',
        badgeText: 'OVERDUE',
        badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      },
      {
        id: 'att-3',
        type: 'PROJECT_DEADLINE',
        priority: 'HIGH',
        title: 'Project Milestone SLA Due',
        entityName: 'Solaris Apparel Group',
        category: 'Shopify Plus Cart Re-architecture',
        meta: 'Staging QA Review Due Aug 31',
        actionText: 'VIEW',
        targetRoute: 'projects',
        badgeText: 'DUE FRIDAY',
        badgeStyle: 'bg-[#0099FF]/10 text-[#0099FF] border-[#0099FF]/30',
      },
      {
        id: 'att-4',
        type: 'PROPOSAL_WAITING',
        priority: 'NORMAL',
        title: 'Commercial Proposal Under Review',
        entityName: 'Lumina Home Living',
        category: 'Amazon DSP & APAC Expansion',
        meta: '$600,000 Estimated ACV Contract',
        actionText: 'TRACK',
        targetRoute: 'prospects',
        badgeText: 'WAITING',
        badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      },
    ];
  },

  getPipelineCounts(): PipelineStageCount[] {
    return [
      { stage: 'NEW', label: 'New Intakes', count: 4 },
      { stage: 'REVIEWING', label: 'In Review', count: 3 },
      { stage: 'QUALIFIED', label: 'Qualified', count: 2 },
      { stage: 'DISCOVERY', label: 'Discovery', count: 2 },
      { stage: 'PROPOSAL', label: 'Proposal', count: 1 },
      { stage: 'WON', label: 'Won', count: 1 },
    ];
  },

  getClientHealthList(): ClientHealthItem[] {
    return [
      {
        id: 'health-1',
        clientName: 'Solaris Apparel Group',
        industry: 'Fashion & E-Commerce',
        leadPartner: 'Kaelen Voss',
        healthStatus: 'HEALTHY',
        monthlyValue: '$45,000/mo',
        activeProjects: 3,
        nextAction: 'Q3 Media Scaling Plan Sign-off',
        note: 'All campaigns meeting SLA (3.2x MER)',
      },
      {
        id: 'health-2',
        clientName: 'Vanguard Nutrition',
        industry: 'DTC Health & Supplement',
        leadPartner: 'Devon Thorne',
        healthStatus: 'HEALTHY',
        monthlyValue: '$35,000/mo',
        activeProjects: 2,
        nextAction: 'Amazon SP-API Catalog QA',
        note: 'Onboarding completed smoothly',
      },
      {
        id: 'health-3',
        clientName: 'Aura Skincare Labs',
        industry: 'Beauty & Cosmetics',
        leadPartner: 'Aria Lin',
        healthStatus: 'AT_RISK',
        monthlyValue: '$28,000/mo',
        activeProjects: 1,
        nextAction: 'Invoice Settlement & SLA Meeting',
        note: 'Milestone 2 pending payment clearance',
      },
      {
        id: 'health-4',
        clientName: 'Apex Logistics Corp',
        industry: 'B2B Logistics & Tech',
        leadPartner: 'Marcus Brody',
        healthStatus: 'ATTENTION',
        monthlyValue: '$15,000 (Initial)',
        activeProjects: 1,
        nextAction: 'Discovery Audit Presentation',
        note: 'LinkedIn campaign setup awaiting creative assets',
      },
      {
        id: 'health-5',
        clientName: 'Zephyr Mobility Systems',
        industry: 'EV & Micromobility',
        leadPartner: 'Kaelen Voss',
        healthStatus: 'PAUSED',
        monthlyValue: '$0/mo (Paused)',
        activeProjects: 0,
        nextAction: 'Q4 Contract Renewal Call',
        note: 'Paused pending product launch shift',
      },
    ];
  },

  getFinancialSummary(): FinancialSummary {
    return {
      monthlyRevenue: '$215,000.00',
      revenueGrowth: '+28.4%',
      outstandingInvoices: '$84,500.00',
      overdueInvoices: '$28,000.00',
      upcomingInvoices: '$35,000.00',
      paidThisMonth: '$45,000.00',
      isDemoData: true,
    };
  },

  getRevenueTrend(): RevenueDataPoint[] {
    return [
      { month: 'JAN', revenue: 140000, label: '$140k' },
      { month: 'FEB', revenue: 155000, label: '$155k' },
      { month: 'MAR', revenue: 162000, label: '$162k' },
      { month: 'APR', revenue: 178000, label: '$178k' },
      { month: 'MAY', revenue: 185000, label: '$185k' },
      { month: 'JUN', revenue: 195000, label: '$195k' },
      { month: 'JUL', revenue: 205000, label: '$205k' },
      { month: 'AUG', revenue: 215000, label: '$215k' },
    ];
  },

  getUpcomingEvents(): UpcomingEvent[] {
    return [
      {
        id: 'up-1',
        dayLabel: 'MON',
        title: 'Q3 Media Strategy Sign-off',
        clientName: 'Solaris Apparel Group',
        time: '10:30 AM',
        type: 'STRATEGY',
      },
      {
        id: 'up-2',
        dayLabel: 'WED',
        title: 'Amazon SP-API Report Delivery',
        clientName: 'Vanguard Nutrition',
        time: '02:00 PM',
        type: 'REPORT',
      },
      {
        id: 'up-3',
        dayLabel: 'FRI',
        title: 'Custom Cart Milestone Delivery',
        clientName: 'Solaris Apparel Group',
        time: '05:00 PM',
        type: 'DEADLINE',
      },
      {
        id: 'up-4',
        dayLabel: 'NEXT MON',
        title: 'Attribution Engine Settlement Review',
        clientName: 'Aura Skincare Labs',
        time: '11:00 AM',
        type: 'INVOICE',
      },
    ];
  },

  getActivityFeed(): ActivityLogItem[] {
    return [
      {
        id: 'act-1',
        type: 'NEW_REQUEST',
        title: 'New Intake Submitted',
        entityName: 'Solaris Apparel Group (Meta + Shopify Scale)',
        timestamp: '15 minutes ago',
        actor: 'Client Intake Form',
        routeTarget: 'requests',
      },
      {
        id: 'act-2',
        type: 'PROJECT_UPDATED',
        title: 'Staging QA Tests Passed',
        entityName: 'Shopify Plus Custom Cart Re-architecture',
        timestamp: '3 hours ago',
        actor: 'Zara Finch (Lead Engineer)',
        routeTarget: 'projects',
      },
      {
        id: 'act-3',
        type: 'INVOICE_PAID',
        title: 'August Retainer Wire Confirmed ($45,000)',
        entityName: 'Solaris Apparel Group (INV-2026-0801)',
        timestamp: '5 hours ago',
        actor: 'Finance Ledger',
        routeTarget: 'invoices',
      },
      {
        id: 'act-4',
        type: 'PROPOSAL_SENT',
        title: 'Proposal Issued ($600k ACV)',
        entityName: 'Lumina Home Living (Amazon DSP Expansion)',
        timestamp: 'Yesterday at 16:45',
        actor: 'Devon Thorne',
        routeTarget: 'prospects',
      },
      {
        id: 'act-5',
        type: 'STRATEGY_APPROVED',
        title: 'Onboarding & Q3 Strategy Signed',
        entityName: 'Vanguard Nutrition',
        timestamp: '2 days ago',
        actor: 'Kaelen Voss',
        routeTarget: 'clients',
      },
    ];
  },
};
