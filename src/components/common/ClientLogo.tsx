import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

interface ClientLogoProps {
  name: string;
  logoUrl?: string | null;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'MG';

const isLikelyImageUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();

    if (!path || path === '/') return false;
    return (
      /\.(png|jpe?g|webp|svg|gif|avif)(\?.*)?$/.test(path) ||
      path.includes('/storage/v1/object/') ||
      path.includes('/cdn/shop/files/') ||
      path.includes('/uploads/') ||
      path.includes('/images/')
    );
  } catch {
    return false;
  }
};

export const ClientLogo: React.FC<ClientLogoProps> = ({
  name,
  logoUrl,
  className = 'h-16 flex items-center justify-center bg-[#0B0D0F] border border-white/10 rounded-[2px] px-4',
  imageClassName = 'max-h-10 max-w-full object-contain',
  fallbackClassName = 'flex items-center gap-2 text-[#B89A72]',
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  const normalizedLogoUrl = logoUrl?.trim();
  const shouldShowImage = Boolean(normalizedLogoUrl && isLikelyImageUrl(normalizedLogoUrl) && !hasImageError);

  useEffect(() => {
    setHasImageError(false);
  }, [normalizedLogoUrl]);

  return (
    <div className={className}>
      {shouldShowImage ? (
        <img
          src={normalizedLogoUrl}
          alt={`${name} logo`}
          className={imageClassName}
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className={fallbackClassName}>
          <Building2 className="w-5 h-5" />
          <span className="font-heading text-xl font-bold tracking-wider">
            {getInitials(name)}
          </span>
        </div>
      )}
    </div>
  );
};
