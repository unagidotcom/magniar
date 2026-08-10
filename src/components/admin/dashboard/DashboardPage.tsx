import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw, Eye } from 'lucide-react';
import { AdminPageHeader } from '../AdminPageHeader';
import { AdminDrawer } from '../AdminDrawer';
import { AdminSkeletonCard, AdminSkeletonTable } from '../AdminSkeleton';
import { AdminEmptyState } from '../AdminEmptyState';
import { AdminErrorState } from '../AdminErrorState';
import { AdminStatusBadge } from '../AdminStatusBadge';

import {
  dashboardService,
  AttentionItem,
  ClientHealthItem,
  PipelineStageCount,
  FinancialSummary,
  RevenueDataPoint,
  UpcomingEvent,
  ActivityLogItem,
} from '../../../services/dashboardService';

import {
  MOCK_REQUESTS,
  MOCK_PROJECTS,
  MockRequest,
  MockProject,
} from '../../../data/adminMockData';

import { AttentionPanel } from './AttentionPanel';
import { BusinessMetrics } from './BusinessMetrics';
import { RequestPipeline } from './RequestPipeline';
import { RecentRequestsTable } from './RecentRequestsTable';
import { ActiveClientsCard } from './ActiveClientsCard';
import { ActiveProjectsCard } from './ActiveProjectsCard';
import { UpcomingList } from './UpcomingList';
import { FinancialSnapshot } from './FinancialSnapshot';
import { ActivityFeed } from './ActivityFeed';
import { QuickActionsModal } from './QuickActionsModal';
import { Chapter14DesignReview } from './Chapter14DesignReview';

interface DashboardPageProps {
  onNavigate: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
}) => {
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<string | null>(null);
  const [activeQuickAction, setActiveQuickAction] = useState<
    'NEW_REQUEST' | 'NEW_CLIENT' | 'NEW_PROJECT' | 'CREATE_INVOICE' | null
  >(null);

  // Drawers
  const [inspectingRequest, setInspectingRequest] = useState<MockRequest | null>(null);
  const [inspectingClient, setInspectingClient] = useState<ClientHealthItem | null>(null);
  const [inspectingProject, setInspectingProject] = useState<MockProject | null>(null);

  // Data loaded from service
  const [attentionItems, setAttentionItems] = useState<AttentionItem[]>([]);
  const [pipelineStages, setPipelineStages] = useState<PipelineStageCount[]>([]);
  const [clientHealthList, setClientHealthList] = useState<ClientHealthItem[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({
    monthlyRevenue: '$215,000.00',
    revenueGrowth: '+28.4%',
    outstandingInvoices: '$84,500.00',
    overdueInvoices: '$28,000.00',
    upcomingInvoices: '$35,000.00',
    paidThisMonth: '$45,000.00',
    isDemoData: true,
  });
  const [revenueTrend, setRevenueTrend] = useState<RevenueDataPoint[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityLogItem[]>([]);

  useEffect(() => {
    setAttentionItems(dashboardService.getAttentionItems());
    setPipelineStages(dashboardService.getPipelineCounts());
    setClientHealthList(dashboardService.getClientHealthList());
    setFinancialSummary(dashboardService.getFinancialSummary());
    setRevenueTrend(dashboardService.getRevenueTrend());
    setUpcomingEvents(dashboardService.getUpcomingEvents());
    setActivityFeed(dashboardService.getActivityFeed());
  }, []);

  // Simulated Skeleton View
  if (simulatedState === 'skeleton') {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="space-y-2">
          <div className="h-8 bg-white/10 rounded w-1/3 animate-pulse" />
          <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminSkeletonCard />
          <AdminSkeletonCard />
          <AdminSkeletonCard />
          <AdminSkeletonCard />
        </div>
        <AdminSkeletonTable />
      </div>
    );
  }

  // Simulated Empty View
  if (simulatedState === 'empty') {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <AdminPageHeader
          title="DASHBOARD"
          subtitle="A live overview of Magniar's growth operations."
          moduleCode="SYS-001 / DASHBOARD"
        />
        <AdminEmptyState
          title="WELCOME TO MAGNIAR."
          description="Your workspace is ready. Once requests, clients, and projects are created, your operational overview will appear here."
          actionLabel="Create First Intake Request"
          onAction={() => setActiveQuickAction('NEW_REQUEST')}
        />
        <QuickActionsModal
          actionType={activeQuickAction}
          onClose={() => setActiveQuickAction(null)}
          onSubmit={(title, msg) => onTriggerToast('success', title, msg)}
        />
      </div>
    );
  }

  // Simulated Error View
  if (simulatedState === 'error') {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <AdminPageHeader
          title="DASHBOARD"
          subtitle="A live overview of Magniar's growth operations."
          moduleCode="SYS-001 / DASHBOARD"
        />
        <AdminErrorState
          title="WE COULDN'T LOAD YOUR DASHBOARD."
          message="Failed to establish real-time socket connection with Magniar OS telemetry server."
          onRetry={() => onTriggerToast('info', 'Retrying Connection', 'Re-establishing socket connection...')}
        />
      </div>
    );
  }

  // Handle Attention Action Click
  const handleAttentionAction = (item: AttentionItem) => {
    onTriggerToast('info', `Navigating to ${item.entityName}`, item.title);
    onNavigate(item.targetRoute);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* 03 - Page Header */}
      <AdminPageHeader
        title="DASHBOARD"
        subtitle="A live overview of Magniar's growth operations."
        moduleCode="SYS-001 / OPERATIONAL COMMAND CENTER"
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveQuickAction('NEW_REQUEST')}
              className="px-3 py-1.5 bg-[#0099FF] hover:bg-[#0088EE] text-white font-mono text-xs font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ NEW REQUEST</span>
            </button>

            <button
              onClick={() => setActiveQuickAction('NEW_CLIENT')}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/90 font-mono text-xs font-semibold rounded-[2px] border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ NEW CLIENT</span>
            </button>

            <button
              onClick={() => setActiveQuickAction('NEW_PROJECT')}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/90 font-mono text-xs font-semibold rounded-[2px] border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ NEW PROJECT</span>
            </button>
          </div>
        }
      />

      {/* 04 & 05 - Top Priority Area: ATTENTION REQUIRED */}
      <AttentionPanel
        items={attentionItems}
        onActionClick={handleAttentionAction}
      />

      {/* 07 & 08 - Key Metrics: BUSINESS OVERVIEW */}
      <BusinessMetrics
        financial={financialSummary}
        openRequestsCount={MOCK_REQUESTS.length}
      />

      {/* 11 & 12 - Request Pipeline */}
      <RequestPipeline
        stages={pipelineStages}
        selectedStage={selectedPipelineStage}
        onSelectStage={(st) => setSelectedPipelineStage(st)}
      />

      {/* 13 & 14 - Recent Requests */}
      <RecentRequestsTable
        requests={MOCK_REQUESTS}
        selectedStage={selectedPipelineStage}
        onInspectRequest={(req) => setInspectingRequest(req)}
        onNavigateToRequests={() => onNavigate('requests')}
      />

      {/* Two Column Grid: Active Clients & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveClientsCard
          clients={clientHealthList}
          onInspectClient={(cli) => setInspectingClient(cli)}
          onNavigateToClients={() => onNavigate('clients')}
        />

        <ActiveProjectsCard
          projects={MOCK_PROJECTS}
          onInspectProject={(proj) => setInspectingProject(proj)}
          onNavigateToProjects={() => onNavigate('projects')}
        />
      </div>

      {/* Two Column Grid: Upcoming & Financial Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingList events={upcomingEvents} />

        <FinancialSnapshot
          financial={financialSummary}
          trendData={revenueTrend}
        />
      </div>

      {/* Activity Feed */}
      <ActivityFeed
        activities={activityFeed}
        onActivityClick={(act) => {
          onTriggerToast('info', act.title, act.entityName);
          onNavigate(act.routeTarget);
        }}
      />

      {/* Chapter 14 Design Review Docs */}
      <Chapter14DesignReview />

      {/* Quick Actions Modal */}
      <QuickActionsModal
        actionType={activeQuickAction}
        onClose={() => setActiveQuickAction(null)}
        onSubmit={(title, msg) => onTriggerToast('success', title, msg)}
      />

      {/* Inspection Drawer: Request */}
      <AdminDrawer
        isOpen={!!inspectingRequest}
        onClose={() => setInspectingRequest(null)}
        title={inspectingRequest ? `REQUEST ${inspectingRequest.code}` : ''}
        subtitle={inspectingRequest?.company}
      >
        {inspectingRequest && (
          <div className="space-y-6 font-mono text-xs">
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 uppercase">Status</span>
                <AdminStatusBadge status={inspectingRequest.status} />
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Client / Contact</div>
                <div className="text-white font-medium text-sm">{inspectingRequest.client_name}</div>
                <div className="text-[#0099FF]">{inspectingRequest.email}</div>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Subject</div>
                <div className="text-white font-medium">{inspectingRequest.subject}</div>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Budget Tier</div>
                <div className="text-emerald-400 font-semibold">{inspectingRequest.budget_tier}</div>
              </div>
            </div>

            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-2">
              <div className="text-white/40 uppercase text-[10px]">Summary & Scope</div>
              <p className="text-white/80 leading-relaxed text-xs">
                {inspectingRequest.summary}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <button
                onClick={() => {
                  onTriggerToast('success', 'Request Qualified', `Promoted ${inspectingRequest.code} to discovery.`);
                  setInspectingRequest(null);
                }}
                className="px-4 py-2 bg-[#0099FF] text-white font-semibold rounded-[2px]"
              >
                Promote to Discovery
              </button>
            </div>
          </div>
        )}
      </AdminDrawer>

      {/* Inspection Drawer: Client */}
      <AdminDrawer
        isOpen={!!inspectingClient}
        onClose={() => setInspectingClient(null)}
        title={inspectingClient ? inspectingClient.clientName : ''}
        subtitle={inspectingClient?.industry}
      >
        {inspectingClient && (
          <div className="space-y-6 font-mono text-xs">
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 uppercase">Account Health</span>
                <span className="text-emerald-400 font-bold">{inspectingClient.healthStatus}</span>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Monthly Retainer</div>
                <div className="text-emerald-400 font-bold text-sm">{inspectingClient.monthlyValue}</div>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Lead Partner</div>
                <div className="text-white">{inspectingClient.leadPartner}</div>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Next Required Action</div>
                <div className="text-amber-300">{inspectingClient.nextAction}</div>
              </div>
            </div>

            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-2">
              <div className="text-white/40 uppercase text-[10px]">Account Note</div>
              <p className="text-white/80 leading-relaxed">{inspectingClient.note}</p>
            </div>
          </div>
        )}
      </AdminDrawer>

      {/* Inspection Drawer: Project */}
      <AdminDrawer
        isOpen={!!inspectingProject}
        onClose={() => setInspectingProject(null)}
        title={inspectingProject ? inspectingProject.name : ''}
        subtitle={inspectingProject?.client_name}
      >
        {inspectingProject && (
          <div className="space-y-6 font-mono text-xs">
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 uppercase">Pillar</span>
                <span className="text-purple-300 font-bold">{inspectingProject.pillar}</span>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Lead Engineer</div>
                <div className="text-white font-medium">{inspectingProject.lead_engineer}</div>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Target Completion</div>
                <div className="text-white">{inspectingProject.target_completion}</div>
              </div>
            </div>
          </div>
        )}
      </AdminDrawer>
    </div>
  );
};
