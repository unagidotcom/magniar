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

const emptyFinancialSummary: FinancialSummary = {
  monthlyRevenue: '$0.00',
  revenueGrowth: 'Live',
  outstandingInvoices: '$0.00',
  overdueInvoices: '$0.00',
  upcomingInvoices: '$0.00',
  paidThisMonth: '$0.00',
  isDemoData: false,
};

export const dashboardService = {
  getAttentionItems(): AttentionItem[] {
    return [];
  },

  getPipelineCounts(): PipelineStageCount[] {
    return [
      { stage: 'NEW', label: 'New Intakes', count: 0 },
      { stage: 'REVIEWING', label: 'In Review', count: 0 },
      { stage: 'QUALIFIED', label: 'Qualified', count: 0 },
      { stage: 'DISCOVERY', label: 'Discovery', count: 0 },
      { stage: 'PROPOSAL', label: 'Proposal', count: 0 },
      { stage: 'WON', label: 'Won', count: 0 },
    ];
  },

  getClientHealthList(): ClientHealthItem[] {
    return [];
  },

  getFinancialSummary(): FinancialSummary {
    return emptyFinancialSummary;
  },

  getRevenueTrend(): RevenueDataPoint[] {
    return [];
  },

  getUpcomingEvents(): UpcomingEvent[] {
    return [];
  },

  getActivityFeed(): ActivityLogItem[] {
    return [];
  },
};
