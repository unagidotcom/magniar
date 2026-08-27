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
    // Primary CTA: confident blue fill with white text.
    variantClasses = `
      bg-[#B89A72] text-[#FFFFFF] font-semibold border border-[#B89A72]
      hover:bg-[#8F714D] hover:border-[#8F714D] hover:shadow-none
      active:bg-[#8F714D] active:scale-[0.99]
      focus-visible:ring-2 focus-visible:ring-[#B89A72] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D0F]
    `;
  } else if (variant === 'secondary') {
    // Secondary action: Dark charcoal background with crisp hairline border and subtle blue hover accent
    variantClasses = `
      bg-[#0B0D0F] text-[#F5F7FA] font-medium border border-white/15
      hover:border-[#B89A72]/50 hover:bg-[#8F714D] hover:text-white hover:shadow-[0_0_15px_rgba(184,154,114,0.12)]
      active:bg-[#0B0D0F] active:scale-[0.99]
      focus-visible:ring-2 focus-visible:ring-[#B89A72] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D0F]
    `;
  } else if (variant === 'utility') {
    // Utility action (e.g. Client Login): Clean subtle outline, discreet
    variantClasses = `
      bg-transparent text-[#68717C] font-medium border border-white/10
      hover:text-[#F5F7FA] hover:border-white/25 hover:bg-white/[0.04]
      active:bg-white/[0.08] active:scale-[0.99]
      focus-visible:ring-2 focus-visible:ring-[#B89A72]
    `;
  } else if (variant === 'text') {
    // Text button
    variantClasses = `
      bg-transparent text-[#68717C] font-medium border border-transparent p-0
      hover:text-[#B89A72]
      active:text-[#B89A72]/80
      focus-visible:ring-2 focus-visible:ring-[#B89A72]
    `;
  }

  // Forced Button State Classes for Playground inspection
  let simulatedStateClasses = '';
  if (buttonState === 'hover') {
    if (variant === 'primary') simulatedStateClasses = 'bg-[#8F714D] border-[#8F714D] shadow-none';
    if (variant === 'secondary') simulatedStateClasses = 'border-[#B89A72]/60 bg-[#8F714D] text-white shadow-[0_0_15px_rgba(184,154,114,0.15)]';
    if (variant === 'utility') simulatedStateClasses = 'text-white border-white/30 bg-white/[0.06]';
    if (variant === 'text') simulatedStateClasses = 'text-[#B89A72]';
  } else if (buttonState === 'active') {
    simulatedStateClasses = 'scale-[0.98] opacity-90';
  } else if (buttonState === 'focus') {
    simulatedStateClasses = 'ring-2 ring-[#B89A72] ring-offset-2 ring-offset-[#0B0D0F] outline-none';
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
