import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'magniar-theme';

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
};

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const options: Array<{ id: ThemeMode; label: string; icon: React.ReactNode }> = [
    { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[70] magniar-theme-toggle bg-[#080B10]/90 backdrop-blur-md border border-white/10 rounded-[2px] p-1.5 shadow-[0_18px_48px_rgba(0,0,0,0.38)]">
      <div className="flex items-center gap-1" role="group" aria-label="Choose site theme">
        {options.map((option) => {
          const isActive = option.id === theme;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setTheme(option.id)}
              aria-pressed={isActive}
              className={`h-9 px-3 rounded-[2px] inline-flex items-center gap-2 font-sans text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-[#0099FF] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title={`Switch to ${option.label.toLowerCase()} theme`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
