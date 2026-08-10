import React from 'react';

interface SignalIndicatorProps {
  label?: string;
  status?: 'active' | 'live' | 'synced' | 'standby';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const SignalIndicator: React.FC<SignalIndicatorProps> = ({
  label = 'LIVE',
  status = 'active',
  size = 'md',
  pulse = true,
  className = ''
}) => {
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-[11px]';

  return (
    <div className={`inline-flex items-center gap-2 font-mono ${textSize} uppercase tracking-wider ${className}`}>
      <span className="relative flex items-center justify-center">
        {pulse && (
          <span className={`absolute inline-flex ${dotSize} rounded-full bg-[#0099FF] opacity-75 animate-ping`} />
        )}
        <span
          className={`relative inline-block ${dotSize} rounded-full bg-[#0099FF] shadow-[0_0_8px_#0099FF]`}
        />
      </span>
      <span className="text-[#F5F7FA] font-medium tracking-widest">{label}</span>
    </div>
  );
};
