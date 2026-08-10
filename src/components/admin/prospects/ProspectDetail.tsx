import React, { useState } from 'react';
import { Prospect, ProspectStage, LostReason } from '../../../types/prospects';
import { AdminStatusBadge } from '../AdminStatusBadge';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  DollarSign,
  UserCheck,
  Calendar,
  Clock,
  CheckSquare,
  FileText,
  Plus,
  AlertTriangle,
  Send,
  UserPlus,
  Layers,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Shield,
  MessageSquare,
} from 'lucide-react';

interface ProspectDetailProps {
  prospect: Prospect;
  onBack: () => void;
  onOpenSourceRequest: (requestCode: string) => void;
  onUpdateStage: (prospectId: string, stage: ProspectStage) => void;
  onConvertClient: (prospect: Prospect) => void;
  onMarkLost: (prospect: Prospect) => void;
  onAddNote: (prospectId: string) => void;
  onToggleTask: (prospectId: string, taskId: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const ProspectDetail: React.FC<ProspectDetailProps> = ({
  prospect,
  onBack,
  onOpenSourceRequest,
  onUpdateStage,
  onConvertClient,
  onMarkLost,
  onAddNote,
  onToggleTask,
  onTriggerToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'discovery' | 'activity' | 'documents'>('overview');
  const [isAssigningOwner, setIsAssigningOwner] = useState(false);

  const ownersList = [
    'Kaelen Voss',
    'Devon Thorne',
    'Strategy Team',
    'Media Buying',
    'Commerce Team',
    'Development',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-mono">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#0099FF]" />
          <span>← Back to Prospects CRM</span>
        </button>

        <div className="flex items-center gap-2 text-[10px] text-white/40">
          <span>PROSPECTS CRM</span>
          <span>/</span>
          <span className="text-[#0099FF] font-bold">{prospect.id}</span>
        </div>
      </div>

      {/* HEADER CARD */}
      <div className="p-6 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-sm font-bold text-[#0099FF]">
                {prospect.id}
              </span>
              <AdminStatusBadge status={prospect.stage} />
              <span className="text-[10px] font-bold px-2 py-0.5 bg-white/5 border border-white/10 text-white/70 rounded">
                PRIORITY: {prospect.priority}
              </span>
              {prospect.converted_client_id && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  CLIENT RECORD: {prospect.converted_client_id}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-display font-bold text-white tracking-tight">
              {prospect.business_name}
            </h1>
            <p className="text-xs text-white/60 font-mono">
              {prospect.industry} — {prospect.business_model} Model | Contact: <strong className="text-white">{prospect.contact_name}</strong> ({prospect.contact_title})
            </p>
          </div>

          {/* Action Button Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Stage Quick Switch dropdown */}
            <div className="relative">
              <select
                value={prospect.stage}
                onChange={(e) => {
                  onUpdateStage(prospect.id, e.target.value as ProspectStage);
                  onTriggerToast('success', 'Stage Updated', `Moved to ${e.target.value}`);
                }}
                className="bg-[#050505] border border-white/10 text-white font-mono text-xs rounded-[2px] px-3 py-2 focus:outline-none focus:border-[#0099FF]"
              >
                <option value="QUALIFIED">Stage: QUALIFIED (25%)</option>
                <option value="DISCOVERY">Stage: DISCOVERY (40%)</option>
                <option value="PROPOSAL">Stage: PROPOSAL (65%)</option>
                <option value="NEGOTIATION">Stage: NEGOTIATION (80%)</option>
                <option value="WON">Stage: WON (100%)</option>
                <option value="LOST">Stage: LOST (0%)</option>
                <option value="NOT_A_FIT">Stage: NOT A FIT (0%)</option>
              </select>
            </div>

            {/* Primary Action Button */}
            {prospect.stage !== 'WON' && prospect.stage !== 'LOST' && prospect.stage !== 'NOT_A_FIT' && (
              <button
                onClick={() => {
                  if (prospect.stage === 'QUALIFIED') {
                    onUpdateStage(prospect.id, 'DISCOVERY');
                    onTriggerToast('info', 'Discovery Scheduled', 'Moved prospect to Discovery stage.');
                  } else if (prospect.stage === 'DISCOVERY') {
                    onUpdateStage(prospect.id, 'PROPOSAL');
                    onTriggerToast('info', 'Proposal Preparation', 'Moved prospect to Proposal stage.');
                  } else {
                    onConvertClient(prospect);
                  }
                }}
                className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white text-xs font-semibold rounded-[2px] shadow-lg shadow-[#0099FF]/20 flex items-center gap-1.5"
              >
                {prospect.stage === 'QUALIFIED' && 'SCHEDULE DISCOVERY'}
                {prospect.stage === 'DISCOVERY' && 'CREATE PROPOSAL'}
                {prospect.stage === 'PROPOSAL' && 'MOVE TO NEGOTIATION'}
                {prospect.stage === 'NEGOTIATION' && 'CONVERT TO CLIENT'}
              </button>
            )}

            {/* Convert to Client Button */}
            {prospect.stage !== 'WON' && (
              <button
                onClick={() => onConvertClient(prospect)}
                className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>CONVERT TO CLIENT</span>
              </button>
            )}

            {/* Mark Lost Button */}
            {prospect.stage !== 'LOST' && prospect.stage !== 'NOT_A_FIT' && (
              <button
                onClick={() => onMarkLost(prospect)}
                className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-[2px] transition-colors"
              >
                MARK LOST
              </button>
            )}
          </div>
        </div>

        {/* SOURCE REQUEST LINK BAR (Section 20) */}
        {prospect.source_request_code && (
          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/40 uppercase font-semibold">SOURCE REQUEST:</span>
              <span className="text-[#0099FF] font-bold font-mono">{prospect.source_request_code}</span>
              <span className="text-white/40">Submitted: {prospect.source_request_date || 'Recent'}</span>
            </div>

            <button
              onClick={() => onOpenSourceRequest(prospect.source_request_code!)}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-[#0099FF] hover:text-white border border-white/10 rounded-[2px] text-[11px] inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>VIEW ORIGINAL REQUEST →</span>
            </button>
          </div>
        )}

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
            <span className="text-[10px] text-white/40 uppercase block">MEDIA BUDGET</span>
            <span className="text-white font-semibold text-sm">{prospect.opportunity.media_budget}</span>
          </div>

          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
            <span className="text-[10px] text-white/40 uppercase block">EST. MAGNIAR FEE</span>
            <span className="text-emerald-400 font-semibold text-sm">{prospect.opportunity.service_fee}</span>
          </div>

          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
            <span className="text-[10px] text-white/40 uppercase block">EST. CONTRACT VALUE</span>
            <span className="text-emerald-400 font-bold text-sm">{prospect.opportunity.estimated_contract_value}</span>
          </div>

          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-white/40 uppercase block">ASSIGNED OWNER</span>
              <span className="text-white font-medium text-xs">{prospect.owner}</span>
            </div>
            <button
              onClick={() => setIsAssigningOwner(!isAssigningOwner)}
              className="text-[10px] text-[#0099FF] hover:underline"
            >
              Change
            </button>
          </div>
        </div>

        {/* Owner assignment inline toggle */}
        {isAssigningOwner && (
          <div className="p-3 bg-[#050505] border border-[#0099FF]/30 rounded-[2px] flex items-center gap-3 animate-in fade-in">
            <span className="text-xs text-white">Reassign Owner:</span>
            <div className="flex flex-wrap gap-1.5">
              {ownersList.map((own) => (
                <button
                  key={own}
                  onClick={() => {
                    prospect.owner = own;
                    setIsAssigningOwner(false);
                    onTriggerToast('success', 'Owner Reassigned', `Assigned to ${own}`);
                  }}
                  className={`px-2 py-1 text-[11px] rounded-[2px] border ${
                    prospect.owner === own
                      ? 'bg-[#0099FF] text-white border-[#0099FF]'
                      : 'bg-[#0A0A0C] text-white/70 border-white/10 hover:text-white'
                  }`}
                >
                  {own}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* NAV TABS */}
      <div className="flex border-b border-white/10 space-x-1 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 font-semibold transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-[#0099FF] text-[#0099FF] bg-white/[0.02]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          OVERVIEW & OPPORTUNITY
        </button>
        <button
          onClick={() => setActiveTab('discovery')}
          className={`px-4 py-2.5 font-semibold transition-colors border-b-2 ${
            activeTab === 'discovery'
              ? 'border-[#0099FF] text-[#0099FF] bg-white/[0.02]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          DISCOVERY & QUALIFICATION
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2.5 font-semibold transition-colors border-b-2 ${
            activeTab === 'activity'
              ? 'border-[#0099FF] text-[#0099FF] bg-white/[0.02]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          TASKS & ACTIVITY TIMELINE ({prospect.activities.length})
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2.5 font-semibold transition-colors border-b-2 ${
            activeTab === 'documents'
              ? 'border-[#0099FF] text-[#0099FF] bg-white/[0.02]'
              : 'border-transparent text-white/60 hover:text-white'
          }`}
        >
          DOCUMENTS & NOTES
        </button>
      </div>

      {/* TAB 1: OVERVIEW & OPPORTUNITY */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1 & 2: Business & Opportunity Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            {/* NEXT ACTION CARD (Section 25) */}
            <div className="p-4 bg-[#0A0A0C] border border-amber-500/30 rounded-[2px] space-y-2">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                  <Clock className="w-4 h-4" />
                  <span>NEXT IMMEDIATE ACTION</span>
                </div>
                <span className="text-[10px] text-amber-300 font-mono">DUE: {prospect.next_action.due_date}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <h4 className="text-white font-display font-semibold text-sm">
                    {prospect.next_action.title}
                  </h4>
                  <p className="text-[11px] text-white/50">
                    Target: {prospect.business_name} | Owner: <strong className="text-white">{prospect.next_action.owner}</strong>
                  </p>
                </div>

                <button
                  onClick={() =>
                    onTriggerToast('info', 'Next Action', `Opened schedule for ${prospect.next_action.title}`)
                  }
                  className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-[2px] text-xs font-semibold"
                >
                  OPEN ACTION
                </button>
              </div>
            </div>

            {/* COMMERCIAL OPPORTUNITY FINANCIAL PANEL (Section 11, 12, 13) */}
            <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase">
                  COMMERCIAL OPPORTUNITY BREAKDOWN
                </h3>
                <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  DEMO FINANCIAL MODEL
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                  <span className="text-[10px] text-white/40 uppercase block">MEDIA ADVERTISING BUDGET</span>
                  <div className="text-base font-semibold text-white mt-1">
                    {prospect.opportunity.media_budget}
                  </div>
                  <span className="text-[10px] text-white/40 block mt-1">Client Ad Spend (Meta/Google)</span>
                </div>

                <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                  <span className="text-[10px] text-white/40 uppercase block">EST. MAGNIAR SERVICE FEE</span>
                  <div className="text-base font-semibold text-emerald-400 mt-1">
                    {prospect.opportunity.service_fee}
                  </div>
                  <span className="text-[10px] text-white/40 block mt-1">Agency Management Retainer</span>
                </div>

                <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                  <span className="text-[10px] text-white/40 uppercase block">PROJECT / SETUP FEE</span>
                  <div className="text-base font-semibold text-white mt-1">
                    {prospect.opportunity.project_fee || '$15,000'}
                  </div>
                  <span className="text-[10px] text-white/40 block mt-1">One-time Audit & Setup</span>
                </div>

                <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                  <span className="text-[10px] text-white/40 uppercase block">EST. CONTRACT VALUE</span>
                  <div className="text-base font-bold text-emerald-400 mt-1">
                    {prospect.opportunity.estimated_contract_value}
                  </div>
                  <span className="text-[10px] text-white/40 block mt-1">Annualized Potential</span>
                </div>

                <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/40 uppercase">INTERNAL PROBABILITY</span>
                    <span className="text-[9px] text-white/30 font-semibold">ESTIMATE</span>
                  </div>
                  <div className="text-base font-bold text-[#0099FF] mt-1">
                    {prospect.opportunity.probability}%
                  </div>
                  <span className="text-[10px] text-white/40 block mt-1">Stage Probability</span>
                </div>

                <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px]">
                  <span className="text-[10px] text-white/40 uppercase block">TARGET CLOSE DATE</span>
                  <div className="text-base font-semibold text-white mt-1">
                    {prospect.opportunity.expected_close_date}
                  </div>
                  <span className="text-[10px] text-white/40 block mt-1">Target Launch Q3</span>
                </div>
              </div>
            </div>

            {/* SERVICES OF INTEREST */}
            <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
              <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase border-b border-white/10 pb-2">
                SERVICES & CAPABILITIES REQUESTED
              </h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {prospect.services.map((srv) => (
                  <span
                    key={srv}
                    className="px-3 py-1.5 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 text-xs rounded-[2px] font-mono font-medium"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Business Profile Sidebar */}
          <div className="space-y-6">
            <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4 text-xs font-mono">
              <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase border-b border-white/10 pb-2">
                BUSINESS & CONTACT FILE
              </h3>

              <div className="space-y-3 divide-y divide-white/[0.05]">
                <div className="pt-2">
                  <span className="text-[10px] text-white/40 uppercase block">Company Name</span>
                  <span className="text-white font-medium">{prospect.business_name}</span>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-white/40 uppercase block">Primary Contact</span>
                  <div className="text-white font-medium">{prospect.contact_name}</div>
                  <div className="text-white/60 text-[11px]">{prospect.contact_title}</div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-white/40 uppercase block">Email</span>
                  <a href={`mailto:${prospect.email}`} className="text-[#0099FF] hover:underline">
                    {prospect.email}
                  </a>
                </div>

                {prospect.phone && (
                  <div className="pt-2">
                    <span className="text-[10px] text-white/40 uppercase block">Phone</span>
                    <span className="text-white">{prospect.phone}</span>
                  </div>
                )}

                {prospect.website && (
                  <div className="pt-2">
                    <span className="text-[10px] text-white/40 uppercase block">Website</span>
                    <a
                      href={prospect.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0099FF] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{prospect.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                <div className="pt-2">
                  <span className="text-[10px] text-white/40 uppercase block">Company Size</span>
                  <span className="text-white">{prospect.company_size || '25-50 employees'}</span>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-white/40 uppercase block">Markets Served</span>
                  <span className="text-white">{prospect.markets_served || 'US, CA, UK'}</span>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-white/40 uppercase block">Current Technology Stack</span>
                  <p className="text-white/80 leading-snug">{prospect.current_technology}</p>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-white/40 uppercase block">Lead Source</span>
                  <span className="text-amber-300 font-semibold">{prospect.lead_source}</span>
                </div>
              </div>
            </div>

            {/* COMMUNICATION ACTIONS */}
            <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block font-bold">
                COMMUNICATION ACTIONS
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onTriggerToast('info', 'Communication Modal', 'Email integration coming in future workspace module.')}
                  className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10 text-[11px] font-mono flex flex-col items-center gap-1"
                >
                  <Mail className="w-4 h-4 text-[#0099FF]" />
                  <span>EMAIL</span>
                </button>
                <button
                  onClick={() => onTriggerToast('info', 'Communication Modal', 'Call log integration coming in future workspace module.')}
                  className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10 text-[11px] font-mono flex flex-col items-center gap-1"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>CALL</span>
                </button>
                <button
                  onClick={() => onTriggerToast('info', 'Communication Modal', 'Calendar meeting invite coming in future workspace module.')}
                  className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10 text-[11px] font-mono flex flex-col items-center gap-1"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>MEETING</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DISCOVERY & QUALIFICATION */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DISCOVERY INFORMATION (Sections 31-33) */}
          <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4 text-xs font-mono">
            <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase border-b border-white/10 pb-2">
              DISCOVERY INTELLIGENCE BRIEF
            </h3>

            <div className="space-y-4 divide-y divide-white/[0.05]">
              <div className="pt-2">
                <span className="text-[10px] text-[#0099FF] uppercase font-bold block mb-1">
                  PRIMARY OBJECTIVE
                </span>
                <p className="text-white font-medium leading-relaxed">
                  {prospect.discovery.primary_objective}
                </p>
              </div>

              <div className="pt-3">
                <span className="text-[10px] text-rose-400 uppercase font-bold block mb-1">
                  CURRENT CHALLENGES & BOTTLENECKS
                </span>
                <p className="text-white/80 leading-relaxed">
                  {prospect.discovery.current_challenge}
                </p>
              </div>

              <div className="pt-3">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">
                  DESIRED COMMERCIAL OUTCOME
                </span>
                <p className="text-white/90 leading-relaxed">
                  {prospect.discovery.desired_outcome}
                </p>
              </div>

              <div className="pt-3 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-white/40 uppercase block">MONTHLY SPEND</span>
                  <span className="text-white font-semibold">{prospect.discovery.current_monthly_spend}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 uppercase block">REVENUE RANGE</span>
                  <span className="text-white font-semibold">{prospect.discovery.current_revenue_range}</span>
                </div>
              </div>

              <div className="pt-3">
                <span className="text-[10px] text-white/40 uppercase block mb-1">SUCCESS CRITERIA</span>
                <p className="text-white/80">{prospect.discovery.success_criteria}</p>
              </div>

              {prospect.discovery.market_context && (
                <div className="pt-3">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">MARKET CONTEXT</span>
                  <p className="text-white/70 italic">{prospect.discovery.market_context}</p>
                </div>
              )}
            </div>
          </div>

          {/* QUALIFICATION FRAMEWORK (Sections 35-37) */}
          <div className="space-y-6">
            <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4 text-xs font-mono">
              <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase border-b border-white/10 pb-2">
                QUALIFICATION FRAMEWORK
              </h3>

              <p className="text-[11px] text-white/60">
                Actionable criteria evaluating strategic and financial fit for Magniar execution:
              </p>

              <div className="space-y-2.5">
                {[
                  { label: 'BUDGET FIT', val: prospect.qualification.budget_fit },
                  { label: 'SERVICE FIT', val: prospect.qualification.service_fit },
                  { label: 'TIMELINE FIT', val: prospect.qualification.timeline_fit },
                  { label: 'DECISION MAKER', val: prospect.qualification.decision_maker_fit },
                  { label: 'STRATEGIC FIT', val: prospect.qualification.strategic_fit },
                ].map((item) => {
                  const statusColors: Record<string, string> = {
                    CONFIRMED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
                    LIKELY: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
                    UNKNOWN: 'bg-white/10 text-white/60 border-white/20',
                    CONCERN: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
                  };

                  return (
                    <div
                      key={item.label}
                      className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between"
                    >
                      <span className="font-semibold text-white">{item.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 border rounded ${statusColors[item.val] || 'text-white'}`}>
                        {item.val}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1 mt-3">
                <span className="text-[10px] text-[#0099FF] uppercase font-bold block">
                  WHY MAGNIAR?
                </span>
                <p className="text-white/80 leading-relaxed text-[11px]">
                  {prospect.qualification.why_magniar}
                </p>
              </div>
            </div>

            {/* INTERNAL NOTES (Section 37) */}
            <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-display font-bold text-white text-sm tracking-wider uppercase">
                  INTERNAL NOTES (PRIVATE TO MAGNIAR)
                </span>
                <span className="text-[9px] text-white/40 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                  HIDDEN FROM CLIENT PORTAL
                </span>
              </div>

              <p className="text-white/80 leading-relaxed bg-[#050505] p-3 border border-white/10 rounded-[2px]">
                {prospect.internal_notes || 'No internal notes added.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TASKS & ACTIVITY TIMELINE */}
      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TASKS PANEL (Section 29) */}
          <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase">
                ACTION TASKS
              </h3>
              <button
                onClick={() => {
                  const taskTitle = prompt('Enter task title:');
                  if (taskTitle) {
                    prospect.tasks.push({
                      id: `task-${Date.now()}`,
                      title: taskTitle,
                      due_date: 'Next Week',
                      status: 'OPEN',
                      assigned_to: prospect.owner,
                    });
                    onTriggerToast('success', 'Task Added', `Added task: ${taskTitle}`);
                  }
                }}
                className="text-[11px] text-[#0099FF] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ ADD TASK</span>
              </button>
            </div>

            <div className="space-y-2">
              {prospect.tasks.length === 0 ? (
                <div className="text-white/40 text-center py-6">No tasks logged for this prospect.</div>
              ) : (
                prospect.tasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => onToggleTask(prospect.id, t.id)}
                    className={`p-3 rounded-[2px] border flex items-center justify-between cursor-pointer transition-all ${
                      t.status === 'DONE'
                        ? 'bg-white/[0.02] border-white/5 text-white/40 line-through'
                        : 'bg-[#050505] border-white/10 text-white hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-[2px] border flex items-center justify-center ${
                          t.status === 'DONE' ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/30'
                        }`}
                      >
                        {t.status === 'DONE' && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="font-medium text-xs">{t.title}</div>
                        <div className="text-[10px] text-white/40">Assigned: {t.assigned_to}</div>
                      </div>
                    </div>

                    <span className="text-[10px] text-white/40">{t.due_date}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CHRONOLOGICAL ACTIVITY FEED (Section 26, 27, 28) */}
          <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase">
                ACTIVITY TIMELINE
              </h3>
              <button
                onClick={() => onAddNote(prospect.id)}
                className="px-2.5 py-1 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] rounded-[2px] border border-[#0099FF]/30 text-[11px] inline-flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ ADD NOTE</span>
              </button>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10">
              {prospect.activities.map((act) => (
                <div key={act.id} className="relative pl-8 space-y-1">
                  <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-[#0099FF] border-2 border-[#0A0A0C]" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{act.title}</span>
                    <span className="text-[10px] text-white/40">{act.timestamp}</span>
                  </div>
                  <p className="text-white/70 text-[11px] leading-relaxed bg-[#050505] p-2.5 border border-white/10 rounded-[2px]">
                    {act.description}
                  </p>
                  <div className="text-[10px] text-white/40">By {act.author}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DOCUMENTS & NOTES */}
      {activeTab === 'documents' && (
        <div className="p-5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase">
              ASSOCIATED COMMERCIAL DOCUMENTS
            </h3>
            <span className="text-[10px] text-white/40">MOCK DOCUMENTS FILE</span>
          </div>

          <div className="space-y-2">
            {prospect.documents.map((doc) => (
              <div
                key={doc.id}
                className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#0099FF]" />
                  <div>
                    <div className="font-medium text-white">{doc.name}</div>
                    <div className="text-[10px] text-white/40">{doc.type} • {doc.size}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/40">{doc.uploaded_at}</span>
                  <button
                    onClick={() =>
                      onTriggerToast('info', 'Document Download', `Downloading ${doc.name}...`)
                    }
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10 text-[11px]"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
