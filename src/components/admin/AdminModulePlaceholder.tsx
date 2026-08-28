import React, { useEffect, useState } from 'react';
import { AdminPageHeader } from './AdminPageHeader';
import { AdminMetricCard } from './AdminMetricCard';
import { AdminStatusBadge } from './AdminStatusBadge';
import { AdminDrawer } from './AdminDrawer';
import { AdminModal } from './AdminModal';
import { AdminEmptyState } from './AdminEmptyState';
import { AdminErrorState } from './AdminErrorState';
import { AdminSkeletonTable } from './AdminSkeleton';
import {
  MOCK_REQUESTS,
  MOCK_PROSPECTS,
  MOCK_CLIENTS,
  MOCK_PROJECTS,
  MOCK_INVOICES,
  MOCK_PAYMENTS,
  MockRequest,
  MockProspect,
  MockClient,
  MockProject,
  MockInvoice,
  MockPayment,
} from '../../data/adminMockData';
import { Search, Filter, Eye, Plus, CheckCircle2, Shield, Trash2, ArrowUpRight, Download } from 'lucide-react';
import {
  AdminProjectRequest,
  listProjectRequests,
  updateProjectRequestStatus,
} from '../../services/projectRequestService';

interface AdminModulePlaceholderProps {
  route: string;
  onNavigate: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const AdminModulePlaceholder: React.FC<AdminModulePlaceholderProps> = ({
  route,
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectRequests, setProjectRequests] = useState<AdminProjectRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [requestsError, setRequestsError] = useState<string | null>(null);

  const routeFormatted = route.toUpperCase().replace(/-/g, ' ');

  const loadProjectRequests = React.useCallback(async () => {
    if (route !== 'requests') return;

    setRequestsLoading(true);
    setRequestsError(null);

    try {
      const rows = await listProjectRequests();
      setProjectRequests(rows);
    } catch (err: any) {
      setRequestsError(err?.message || 'Failed to load project requests.');
    } finally {
      setRequestsLoading(false);
    }
  }, [route]);

  useEffect(() => {
    loadProjectRequests();
  }, [loadProjectRequests]);

  if (simulatedState === 'skeleton') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="h-10 bg-white/10 rounded w-1/3 animate-pulse" />
        <AdminSkeletonTable />
      </div>
    );
  }

  if (simulatedState === 'empty') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <AdminPageHeader
          title={`${routeFormatted} Module`}
          subtitle={`Operational workspace for agency ${route}.`}
          moduleCode={`SYS / ${routeFormatted}`}
        />
        <AdminEmptyState
          title={`No ${routeFormatted} Records`}
          description={`There are currently no active records registered in the ${route} module.`}
          actionLabel={`Create First ${routeFormatted} Entry`}
          onAction={() => onTriggerToast('info', 'New Entry', `Creating new ${route} record...`)}
        />
      </div>
    );
  }

  if (simulatedState === 'error') {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <AdminPageHeader
          title={`${routeFormatted} Module`}
          subtitle={`Operational workspace for agency ${route}.`}
          moduleCode={`SYS / ${routeFormatted}`}
        />
        <AdminErrorState
          title={`Failed to fetch ${routeFormatted} data`}
          message="Server returned status code 500 (Internal System Ledger Timeout)."
          onRetry={() => onTriggerToast('info', 'Retrying Fetch', `Re-fetching ${route} dataset...`)}
        />
      </div>
    );
  }

  // Dynamic route data handling
  let title = `${routeFormatted} MODULE`;
  let subtitle = `Operational workspace for managing agency ${route}.`;
  let moduleCode = `SYS-002 / ${routeFormatted}`;
  let primaryLabel = `+ New ${route.slice(0, -1)}`;

  if (route === 'requests') {
    title = 'Intake Requests Queue';
    subtitle = 'Review and qualify inbound requests submitted via /start-a-project and direct referrals.';
    moduleCode = 'REQ-01 / INTAKE';
    primaryLabel = 'Refresh Requests';
  } else if (route === 'prospects') {
    title = 'Prospects CRM Pipeline';
    subtitle = 'Active prospective clients undergoing discovery, scoping, and proposal negotiation.';
    moduleCode = 'CRM-02 / PROSPECTS';
    primaryLabel = 'Add Prospect';
  } else if (route === 'clients') {
    title = 'Active Client Directory';
    subtitle = 'Manage retained clients, monthly retainers, partner leads, and portal credentials.';
    moduleCode = 'CLI-03 / DIRECTORY';
    primaryLabel = 'Add Client';
  } else if (route === 'projects') {
    title = 'Engineering & Growth Projects';
    subtitle = 'Track delivery SLAs, health scores, and lead engineers across all active client pillars.';
    moduleCode = 'PRJ-04 / PORTFOLIO';
    primaryLabel = 'New Project';
  } else if (route === 'invoices') {
    title = 'Invoices & Billing Ledger';
    subtitle = 'Issue client retainers, track payment due dates, and monitor overdue settlements.';
    moduleCode = 'FIN-05 / INVOICES';
    primaryLabel = 'Draft Invoice';
  } else if (route === 'payments') {
    title = 'Payments Settlement Ledger';
    subtitle = 'Bank wire, ACH, and card payment settlement records.';
    moduleCode = 'FIN-06 / SETTLEMENTS';
    primaryLabel = 'Record Settlement';
  } else if (route === 'strategies') {
    title = 'Strategies & Growth Roadmaps';
    subtitle = 'Strategic audit reports, media channel frameworks, and growth roadmaps.';
    moduleCode = 'STR-07 / ROADMAPS';
    primaryLabel = 'Create Strategy Document';
  } else if (route === 'proposals') {
    title = 'Commercial Proposals';
    subtitle = 'Master Service Agreements, Statements of Work, and commercial terms.';
    moduleCode = 'STR-08 / PROPOSALS';
    primaryLabel = 'Draft Proposal';
  } else if (route === 'reports') {
    title = 'Intelligence & Analytics Reports';
    subtitle = 'Cross-portfolio MER performance, channel spend, and retention metrics.';
    moduleCode = 'INT-09 / REPORTS';
    primaryLabel = 'Generate Custom Report';
  } else if (route === 'content') {
    title = 'Website Content Management System';
    subtitle = 'Manage public website case studies, insights articles, and capability models.';
    moduleCode = 'CMS-10 / CONTENT';
    primaryLabel = 'Publish New Article';
  } else if (route === 'team') {
    title = 'Team & System Permissions';
    subtitle = 'Admin users, security roles, and API key access control.';
    moduleCode = 'SYS-11 / TEAM';
    primaryLabel = 'Invite System User';
  } else if (route === 'settings') {
    title = 'System Configuration & Settings';
    subtitle = 'Magniar Operating System variables, integrations, and database schemas.';
    moduleCode = 'SYS-12 / CONFIG';
    primaryLabel = 'Save Configuration';
  }

  if (route !== 'requests') {
    primaryLabel = '';
  }

  // Filtered records rendering for table views
  const renderTableContent = () => {
    if (route === 'requests') {
      if (requestsLoading) {
        return <AdminSkeletonTable />;
      }

      if (requestsError) {
        return (
          <AdminErrorState
            title="Failed to load project requests"
            message={requestsError}
            onRetry={loadProjectRequests}
          />
        );
      }

      const filtered = projectRequests.filter(
        (r) =>
          (statusFilter === 'ALL' || r.status === statusFilter) &&
          (r.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${r.first_name} ${r.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.request_number.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      if (filtered.length === 0) return <AdminEmptyState title="No Requests Found" />;

      return (
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Created</th>
                  <th className="p-3.5">Client / Company</th>
                  <th className="p-3.5">Budget Tier</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 text-[#0099FF] font-medium">{req.request_number}</td>
                    <td className="p-3.5 text-white/50">
                      {new Date(req.created_at).toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <div className="text-white font-medium">{req.company_name}</div>
                      <div className="text-[11px] text-white/40">
                        {req.first_name} {req.last_name} ({req.email})
                      </div>
                      <div className="text-[11px] text-white/40">
                        {req.industry || 'Industry not specified'} / {req.engagement_type || 'Engagement not specified'}
                      </div>
                    </td>
                    <td className="p-3.5 text-white/70">{req.project_service_budget || 'Not specified'}</td>
                    <td className="p-3.5">
                      <AdminStatusBadge status={req.status} />
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedItem(req)}
                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-[2px] border border-white/10 text-[11px] inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <AdminEmptyState
        title={`${routeFormatted} Not Migrated Yet`}
        description="This module is not connected to a production database workflow yet."
      />
    );

    if (route === 'prospects') {
      return (
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Company</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Est. ACV</th>
                  <th className="p-3.5">Lead Strategist</th>
                  <th className="p-3.5">Target Launch</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {MOCK_PROSPECTS.map((pro) => (
                  <tr key={pro.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 text-white font-medium">{pro.company}</td>
                    <td className="p-3.5">
                      <div className="text-white/90">{pro.contact_name}</div>
                      <div className="text-[11px] text-white/40">{pro.email}</div>
                    </td>
                    <td className="p-3.5 text-emerald-400 font-semibold">{pro.estimated_acv}</td>
                    <td className="p-3.5 text-white/70">{pro.assigned_strategist}</td>
                    <td className="p-3.5 text-white/50">{pro.target_launch}</td>
                    <td className="p-3.5">
                      <AdminStatusBadge status={pro.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (route === 'clients') {
      return (
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Client Code</th>
                  <th className="p-3.5">Client Name</th>
                  <th className="p-3.5">Industry</th>
                  <th className="p-3.5">Active Projects</th>
                  <th className="p-3.5">Monthly Retainer</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {MOCK_CLIENTS.map((cli) => (
                  <tr key={cli.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 text-[#0099FF] font-medium">{cli.code}</td>
                    <td className="p-3.5 font-medium text-white">{cli.name}</td>
                    <td className="p-3.5 text-white/60">{cli.industry}</td>
                    <td className="p-3.5 text-white/80">{cli.active_projects_count} Engagements</td>
                    <td className="p-3.5 text-emerald-400 font-semibold">{cli.monthly_retainer}</td>
                    <td className="p-3.5">
                      <AdminStatusBadge status={cli.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (route === 'invoices') {
      return (
        <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Invoice #</th>
                  <th className="p-3.5">Client</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Issued Date</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {MOCK_INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 text-[#0099FF] font-medium">{inv.code}</td>
                    <td className="p-3.5 text-white font-medium">{inv.client_name}</td>
                    <td className="p-3.5 text-white font-semibold">{inv.amount}</td>
                    <td className="p-3.5 text-white/50">{inv.issued_date}</td>
                    <td className="p-3.5 text-white/50">{inv.due_date}</td>
                    <td className="p-3.5">
                      <AdminStatusBadge status={inv.status} />
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() =>
                          onTriggerToast('info', 'Invoice PDF', `Downloading invoice PDF ${inv.code}...`)
                        }
                        className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10 inline-flex items-center gap-1 text-[11px]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default fallback placeholder list for other routes
    return (
      <div className="space-y-4">
        <div className="p-6 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-mono text-sm font-medium text-white uppercase tracking-wider">
              {routeFormatted} Operational Records
            </h3>
            <span className="font-mono text-xs text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded-[2px]">
              OPERATIONAL STREAM ACTIVE
            </span>
          </div>

          <p className="text-xs font-mono text-white/60 leading-relaxed max-w-2xl">
            This module provides full CRUD management, filtering, and reporting capabilities for Magniar’s agency operational data layer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
              <span className="font-mono text-[10px] text-white/40 uppercase">Total Records</span>
              <div className="text-xl font-display font-semibold text-white">12 Records</div>
            </div>
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
              <span className="font-mono text-[10px] text-white/40 uppercase">Sync Status</span>
              <div className="text-xl font-display font-semibold text-emerald-400">Real-time</div>
            </div>
            <div className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
              <span className="font-mono text-[10px] text-white/40 uppercase">Access Level</span>
              <div className="text-xl font-display font-semibold text-[#0099FF]">Partner Read/Write</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <AdminPageHeader
        title={title}
        subtitle={subtitle}
        moduleCode={moduleCode}
        primaryActionLabel={primaryLabel}
        onPrimaryAction={() => {
          if (route === 'requests') {
            loadProjectRequests();
            onTriggerToast('info', 'Refreshing Requests', 'Loading latest Supabase intake records.');
            return;
          }
          onTriggerToast('success', `${title} Action`, `New record creation modal triggered.`);
        }}
        secondaryActionLabel="Export CSV"
        onSecondaryAction={() =>
          onTriggerToast('success', 'Export Success', `Exported ${route} data layer.`)
        }
      />

      {/* Filter / Search Bar */}
      <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-[#050505] border border-white/10 rounded-[2px] px-3 py-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${route}...`}
            className="w-full bg-transparent font-mono text-xs text-white focus:outline-none placeholder:text-white/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] p-2 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="ACTIVE">Active</option>
            <option value="PAID">Paid</option>
          </select>
        </div>
      </div>

      {/* Main Table or Module Content */}
      {renderTableContent()}

      {/* Item Drawer Inspection Panel */}
      <AdminDrawer
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.company || selectedItem?.code || 'Record Details'}
        subtitle={`System record ref ID: ${selectedItem?.id}`}
        status={selectedItem?.status}
        primaryActionLabel="Update Record State"
        onPrimaryAction={async () => {
          if (route === 'requests' && selectedItem?.id) {
            try {
              const updated = await updateProjectRequestStatus(selectedItem.id, 'REVIEWING');
              setProjectRequests((prev) =>
                prev.map((request) => (request.id === updated.id ? updated : request))
              );
              onTriggerToast('success', 'Status Updated', 'Request moved to REVIEWING.');
            } catch (err: any) {
              onTriggerToast('error', 'Status Update Failed', err?.message || 'Unable to update request.');
            } finally {
              setSelectedItem(null);
            }
            return;
          }
          onTriggerToast('success', 'Status Updated', 'Record state synced with operating database.');
          setSelectedItem(null);
        }}
      >
        {selectedItem && (
          <div className="space-y-4 font-mono text-xs">
            <pre className="p-4 bg-[#050505] border border-white/10 rounded-[2px] text-white/80 overflow-x-auto text-[11px]">
              {JSON.stringify(selectedItem, null, 2)}
            </pre>
          </div>
        )}
      </AdminDrawer>
    </div>
  );
};
