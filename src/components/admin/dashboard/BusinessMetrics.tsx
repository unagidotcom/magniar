import React from 'react';
import { AdminMetricCard } from '../AdminMetricCard';
import { FinancialSummary } from '../../../services/dashboardService';

interface BusinessMetricsProps {
  financial: FinancialSummary;
  openRequestsCount: number;
  activeClientsCount: number;
  activeProjectsCount: number;
  proposalsCount: number;
  outstandingInvoicesCount: number;
}

export const BusinessMetrics: React.FC<BusinessMetricsProps> = ({
  financial,
  openRequestsCount,
  activeClientsCount,
  activeProjectsCount,
  proposalsCount,
  outstandingInvoicesCount,
}) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono font-medium text-white/50 uppercase tracking-wider">
          BUSINESS OVERVIEW (AGENCY OPERATIONAL METRICS)
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <AdminMetricCard
          label="ACTIVE CLIENTS"
          value={activeClientsCount}
          change="Live"
          isPositive={true}
          sublabel="From client records"
          isDemoData={false}
        />
        <AdminMetricCard
          label="ACTIVE PROJECTS"
          value={activeProjectsCount}
          change="Pending migration"
          isPositive={true}
          sublabel="Projects not migrated"
          isDemoData={false}
        />
        <AdminMetricCard
          label="OPEN REQUESTS"
          value={openRequestsCount}
          change="Live"
          isPositive={true}
          sublabel="Intake queue"
          isDemoData={false}
        />
        <AdminMetricCard
          label="PROPOSALS"
          value={proposalsCount}
          change="Pending migration"
          isPositive={true}
          sublabel="Proposals not migrated"
          isDemoData={false}
        />
        <AdminMetricCard
          label="OUTSTANDING"
          value={financial.outstandingInvoices}
          change={`${outstandingInvoicesCount} invoices`}
          isPositive={false}
          sublabel="Ledger Balance"
          isDemoData={false}
        />
        <AdminMetricCard
          label="MONTHLY REVENUE"
          value={financial.monthlyRevenue}
          change={financial.revenueGrowth}
          isPositive={true}
          sublabel="Paid invoices"
          isDemoData={false}
        />
      </div>
    </section>
  );
};
