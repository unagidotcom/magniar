export interface CapabilityItem {
  name: string;
  description: string;
  platforms?: string[];
  isPopular?: boolean;
}

export interface CapabilityGroup {
  id: string;
  numberLabel: string; // e.g. "01 / PERFORMANCE"
  title: string;
  summary: string;
  items: CapabilityItem[];
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  numberLabel?: string;
  links: {
    label: string;
    href: string;
    badge?: string;
  }[];
}

export type ViewportMode = '1440px' | '1280px' | '1024px' | '768px' | '390px';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'utility';
export type ButtonState = 'rest' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
