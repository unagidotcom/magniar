import React from 'react';

export type StatusType =
  | 'NEW'
  | 'REVIEWING'
  | 'QUALIFIED'
  | 'DISCOVERY'
  | 'PROPOSAL_SENT'
  | 'WON'
  | 'LOST'
  | 'NOT_A_FIT'
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'ON_TRACK'
  | 'AT_RISK'
  | 'OVERDUE'
  | 'PAID'
  | 'PENDING'
  | 'UNPAID'
  | 'DRAFT'
  | 'ARCHIVED';

interface AdminStatusBadgeProps {
  status: StatusType | string;
  size?: 'sm' | 'md';
}

export const AdminStatusBadge: React.FC<AdminStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const norm = status.toUpperCase();

  let styles = 'bg-white/5 text-white/70 border-white/10';

  if (norm === 'NEW' || norm === 'PENDING' || norm === 'UNPAID') {
    styles = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
  } else if (
    norm === 'ACTIVE' ||
    norm === 'QUALIFIED' ||
    norm === 'WON' ||
    norm === 'ON_TRACK' ||
    norm === 'PAID' ||
    norm === 'COMPLETED'
  ) {
    styles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  } else if (norm === 'REVIEWING' || norm === 'DISCOVERY' || norm === 'PROPOSAL_SENT') {
    styles = 'bg-[#0099FF]/10 text-[#0099FF] border-[#0099FF]/30';
  } else if (norm === 'AT_RISK' || norm === 'OVERDUE') {
    styles = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  } else if (norm === 'NOT_A_FIT' || norm === 'LOST' || norm === 'ARCHIVED' || norm === 'PAUSED') {
    styles = 'bg-white/5 text-white/40 border-white/10';
  }

  const px = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium uppercase tracking-wider rounded-[2px] border ${px} ${styles}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {norm.replace(/_/g, ' ')}
    </span>
  );
};
