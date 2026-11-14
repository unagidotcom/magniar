import React, { useEffect, useState } from 'react';

interface ClientLogoProps {
  name: string;
  logoUrl?: string | null;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  wordmarkClassName?: string;
}

const normalizeImageUrl = (url: string) => {
  try {
    const candidate = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const parsed = new URL(candidate);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : null;
  } catch {
    return null;
  }
};

const wordmarkSize = (name: string) => {
  const length = name.trim().length;
  if (length <= 11) return 'text-xl';
  if (length <= 20) return 'text-base';
  if (length <= 30) return 'text-sm';
  return 'text-[11px]';
};

export const ClientLogo: React.FC<ClientLogoProps> = ({
  name,
  logoUrl,
  className = 'h-16 flex items-center justify-center bg-[#0B0D0F] border border-white/10 rounded-[2px] px-4',
  imageClassName = 'max-h-10 max-w-full object-contain',
  fallbackClassName = 'w-full text-[#B89A72]',
  wordmarkClassName,
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  const normalizedLogoUrl = logoUrl?.trim();
  const imageUrl = normalizedLogoUrl ? normalizeImageUrl(normalizedLogoUrl) : null;
  const shouldShowImage = Boolean(imageUrl && !hasImageError);
  const wordmark = name.trim() || 'Client';

  useEffect(() => {
    setHasImageError(false);
  }, [normalizedLogoUrl]);

  return (
    <div className={className}>
      {shouldShowImage ? (
        <img
          src={imageUrl || undefined}
          alt={`${name} logo`}
          className={imageClassName}
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div
          className={`min-w-0 max-w-full text-center ${fallbackClassName}`}
          role="img"
          aria-label={`${wordmark} wordmark`}
          title={wordmark}
        >
          <span
            className={`block max-w-full break-words font-heading font-semibold leading-[1.05] tracking-[0.04em] ${wordmarkClassName || wordmarkSize(wordmark)}`}
          >
            {wordmark}
          </span>
          <span className="mx-auto mt-1.5 block h-px w-7 bg-current opacity-35" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};
