import React from 'react';

interface ArrowIconProps {
  className?: string;
  size?: number;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ className = '', size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
    >
      <path
        d="M3.33331 8H12.6666M12.6666 8L8.00002 3.33334M12.6666 8L8.00002 12.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
