import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'magniar-theme';

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'dark' ? 'dark' : 'light';
};

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
  const Icon = theme === 'dark' ? Sun : Moon;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className="magniar-theme-toggle fixed bottom-3 right-3 z-[70] inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D9DEE5] bg-[#FFFFFF]/92 text-[#0B0D0F] shadow-[0_14px_36px_rgba(11,13,15,0.22)] backdrop-blur-md transition-colors hover:border-[#B89A72] hover:text-[#B89A72] sm:bottom-5 sm:right-5"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};
