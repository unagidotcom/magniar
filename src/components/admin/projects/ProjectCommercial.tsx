import React from 'react';
import { Project } from '../../../types/projects';
import { DollarSign, CreditCard, Calendar, AlertCircle, Info, ShieldCheck } from 'lucide-react';

interface ProjectCommercialProps {
  project: Project;
}

export const ProjectCommercial: React.FC<ProjectCommercialProps> = ({ project }) => {
  const comm = project.commercial;

  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#0099FF]" />
            <span>COMMERCIAL & FINANCIAL SUMMARY</span>
          </h3>
          <p className="text-white/50 text-[11px] mt-0.5">
            Retainer fees, media spend parameters, and billing configuration for this project.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-bold uppercase">
            DEMO DATA
          </span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-bold uppercase">
            BILLING: {comm.billing_status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Grid of Commercial Figures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Monthly Service Fee */}
        <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
          <span className="text-white/40 text-[9px] uppercase block font-semibold">
            MAGNIAR SERVICE FEE
          </span>
          <div className="text-white font-bold text-base text-[#0099FF]">
            {comm.monthly_service_fee || comm.project_fee || 'Retainer'}
          </div>
          <span className="text-[9px] text-emerald-400 block font-semibold">
            ✓ Magniar Agency Revenue
          </span>
        </div>

        {/* Media Budget */}
        <div className="p-3 bg-[#050505] border border-amber-500/30 rounded-[2px] space-y-1">
          <span className="text-amber-400/80 text-[9px] uppercase block font-semibold flex items-center justify-between">
            <span>CLIENT MEDIA BUDGET</span>
            <Info className="w-3 h-3 text-amber-400" />
          </span>
          <div className="text-white font-bold text-base">
            {comm.media_budget || 'N/A (Non-Media)'}
          </div>
          <span className="text-[9px] text-white/40 block">
            Direct client spend paid to ad platforms
          </span>
        </div>

        {/* Contract Value */}
        <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
          <span className="text-white/40 text-[9px] uppercase block font-semibold">
            ESTIMATED TCV (TOTAL CONTRACT)
          </span>
          <div className="text-white font-bold text-base">
            {comm.total_contract_value || 'N/A'}
          </div>
          <span className="text-[9px] text-white/40 block">
            Agreed engagement total
          </span>
        </div>

        {/* Billing Model */}
        <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
          <span className="text-white/40 text-[9px] uppercase block font-semibold">
            BILLING MODEL
          </span>
          <div className="text-white font-bold text-xs">
            {comm.billing_model}
          </div>
          <span className="text-[9px] text-white/40 block">
            Next Invoice: {comm.next_invoice_date}
          </span>
        </div>
      </div>

      {/* Distinction Callout Banner */}
      <div className="p-3 bg-[#0099FF]/5 border border-[#0099FF]/20 rounded-[2px] text-[11px] text-white/70 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white uppercase text-[10px] block">OPERATIONAL REVENUE DISTINCTION:</strong>
          Media Budgets represent client ad platform spend (Meta/Google) managed under Magniar oversight and are <strong className="text-amber-300 font-semibold">never</strong> counted as direct Magniar service revenue. Service Fees reflect actual monthly retainer contract earnings.
        </div>
      </div>
    </div>
  );
};
