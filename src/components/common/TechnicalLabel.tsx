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

  let variantClasses = 'border border-white/10 bg-[#0B0D0F] text-[#68717C]';

  if (variant === 'active') {
    variantClasses = 'border-[#B89A72]/40 bg-[#B89A72]/10 text-[#B89A72] font-semibold shadow-[0_0_12px_rgba(184,154,114,0.15)]';
  } else if (variant === 'ghost') {
    variantClasses = 'bg-transparent text-[#68717C] border-transparent';
  }

  return (
    <span className={`inline-flex items-center font-mono font-medium uppercase rounded-[2px] transition-colors duration-200 ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};
