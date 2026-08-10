import React from 'react';

interface TechnicalLabelProps {
  children: React.ReactNode;
  variant?: 'outline' | 'ghost' | 'active';
  size?: 'sm' | 'md';
  className?: string;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({
  children,
  variant = 'outline',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[9px] tracking-[0.12em]' 
    : 'px-2.5 py-1 text-[10px] tracking-[0.14em]';

  let variantClasses = 'border border-white/10 bg-[#0A0C0F] text-[#8D949E]';

  if (variant === 'active') {
    variantClasses = 'border-[#0099FF]/40 bg-[#0099FF]/10 text-[#0099FF] font-semibold shadow-[0_0_12px_rgba(0,153,255,0.15)]';
  } else if (variant === 'ghost') {
    variantClasses = 'bg-transparent text-[#8D949E] border-transparent';
  }

  return (
    <span className={`inline-flex items-center font-mono font-medium uppercase rounded-[2px] transition-colors duration-200 ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
