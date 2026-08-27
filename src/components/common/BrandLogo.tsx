interface BrandLogoProps {
  variant?: 'wordmark' | 'full';
  className?: string;
  imageClassName?: string;
}

const LOGOS = {
  wordmark: {
    light: '/brand/magniar-wordmark.png',
    dark: '/brand/magniar-wordmark-dark.png',
  },
  full: {
    light: '/brand/magniar-logo-full.png',
    dark: '/brand/magniar-logo-full-dark.png',
  },
};

export const BrandLogo = ({
  variant = 'wordmark',
  className = '',
  imageClassName = '',
}: BrandLogoProps) => {
  const logo = LOGOS[variant];

  return (
    <span className={`magniar-brand-logo inline-flex shrink-0 items-center ${className}`}>
      <img
        src={logo.light}
        alt="Magniar & Co Marketing Agency"
        className={`magniar-brand-logo-light block h-full w-auto object-contain ${imageClassName}`}
      />
      <img
        src={logo.dark}
        alt="Magniar & Co Marketing Agency"
        className={`magniar-brand-logo-dark hidden h-full w-auto object-contain ${imageClassName}`}
      />
    </span>
  );
};
