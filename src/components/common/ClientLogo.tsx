import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

interface ClientLogoProps {
  name: string;
  logoUrl?: string | null;
  className?: string;
  imageClassName?: string;
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'MG';

export const ClientLogo: React.FC<ClientLogoProps> = ({
  name,
  logoUrl,
  className = 'h-16 flex items-center justify-center bg-[#050505] border border-white/10 rounded-[2px] px-4',
  imageClassName = 'max-h-10 max-w-full object-contain',
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  const normalizedLogoUrl = logoUrl?.trim();
  const shouldShowImage = Boolean(normalizedLogoUrl && !hasImageError);

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
        <div className="flex items-center gap-2 text-[#0099FF]">
          <Building2 className="w-5 h-5" />
          <span className="font-heading text-xl font-bold tracking-wider">
            {getInitials(name)}
          </span>
        </div>
      )}
    </div>
  );
};
