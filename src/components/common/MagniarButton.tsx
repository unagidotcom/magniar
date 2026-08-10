import React from 'react';
import { ArrowIcon } from './ArrowIcon';
import { ButtonVariant, ButtonState } from '../../types/navigation';
import { Loader2 } from 'lucide-react';

interface MagniarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  buttonState?: ButtonState;
  showArrow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  className?: string;
}

export const MagniarButton: React.FC<MagniarButtonProps> = ({
  children,
  variant = 'primary',
  buttonState = 'rest',
  showArrow = true,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const isForceDisabled = buttonState === 'disabled' || disabled;
  const isLoading = buttonState === 'loading';

  // Base layout styles according to spacing math (2x horizontal vs vertical)
  let sizeClasses = 'px-5 py-2.5 text-sm font-semibold';
  let arrowSize = 14;

  if (size === 'sm') {
    sizeClasses = 'px-4 py-2 text-xs font-semibold';
    arrowSize = 13;
  } else if (size === 'lg') {
    sizeClasses = 'px-7 py-3 text-sm sm:text-base font-semibold';
    arrowSize = 16;
  } else if (size === 'xl') {
    sizeClasses = 'px-8 py-3.5 text-base font-bold';
    arrowSize = 18;
  }

  // Variant Styling
  let variantClasses = '';

  if (variant === 'primary') {
    // High-contrast primary CTA: Bold white text on dark surface or high-contrast crisp white fill
    variantClasses = `
      bg-[#F5F7FA] text-[#050505] font-semibold border border-white
      hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
      active:bg-[#E2E8F0] active:scale-[0.99]
      focus-visible:ring-2 focus-visible:ring-[#0099FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]
    `;
  } else if (variant === 'secondary') {
    // Secondary action: Dark charcoal background with crisp hairline border and subtle electric blue hover accent
    variantClasses = `
      bg-[#0A0C0F] text-[#F5F7FA] font-medium border border-white/15
      hover:border-[#0099FF]/50 hover:bg-[#101318] hover:text-white hover:shadow-[0_0_15px_rgba(0,153,255,0.12)]
      active:bg-[#050505] active:scale-[0.99]
      focus-visible:ring-2 focus-visible:ring-[#0099FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]
    `;
  } else if (variant === 'utility') {
    // Utility action (e.g. Client Login): Clean subtle outline, discreet
    variantClasses = `
      bg-transparent text-[#8D949E] font-medium border border-white/10
      hover:text-[#F5F7FA] hover:border-white/25 hover:bg-white/[0.04]
      active:bg-white/[0.08] active:scale-[0.99]
      focus-visible:ring-2 focus-visible:ring-[#0099FF]
    `;
  } else if (variant === 'text') {
    // Text button
    variantClasses = `
      bg-transparent text-[#8D949E] font-medium border border-transparent p-0
      hover:text-[#0099FF]
      active:text-[#0099FF]/80
      focus-visible:ring-2 focus-visible:ring-[#0099FF]
    `;
  }

  // Forced Button State Classes for Playground inspection
  let simulatedStateClasses = '';
  if (buttonState === 'hover') {
    if (variant === 'primary') simulatedStateClasses = 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.25)]';
    if (variant === 'secondary') simulatedStateClasses = 'border-[#0099FF]/60 bg-[#101318] text-white shadow-[0_0_15px_rgba(0,153,255,0.15)]';
    if (variant === 'utility') simulatedStateClasses = 'text-white border-white/30 bg-white/[0.06]';
    if (variant === 'text') simulatedStateClasses = 'text-[#0099FF]';
  } else if (buttonState === 'active') {
    simulatedStateClasses = 'scale-[0.98] opacity-90';
  } else if (buttonState === 'focus') {
    simulatedStateClasses = 'ring-2 ring-[#0099FF] ring-offset-2 ring-offset-[#050505] outline-none';
  }

  const disabledClasses = isForceDisabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none grayscale'
    : 'cursor-pointer';

  return (
    <button
      disabled={isForceDisabled || isLoading}
      className={`
        group relative inline-flex items-center justify-center gap-2.5 font-sans tracking-wide uppercase
        rounded-[2px] transition-all duration-200 ease-out select-none
        ${sizeClasses}
        ${variantClasses}
        ${simulatedStateClasses}
        ${disabledClasses}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}

      <span className="truncate">{children}</span>

      {rightIcon ? (
        <span className="shrink-0 group-hover:translate-x-0.5 transition-transform">{rightIcon}</span>
      ) : showArrow && !isLoading ? (
        <ArrowIcon
          size={arrowSize}
          className={`
            transition-transform duration-200 ease-out
            ${buttonState === 'hover' ? 'translate-x-1' : 'group-hover:translate-x-1'}
          `}
        />
      ) : null}
    </button>
  );
};
