import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface Settings {
  highContrast: boolean;
  readableFont: boolean; // dyslexia-friendly font for body text
  relaxedSpacing: boolean; // generous line spacing
  reducedMotion: boolean;
}

const SETTINGS_KEY = 'pokerpath.settings';

function defaultSettings(): Settings {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  return {
    highContrast: false,
    readableFont: false,
    relaxedSpacing: false,
    reducedMotion: Boolean(prefersReduced),
  };
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings();
    return { ...defaultSettings(), ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return defaultSettings();
  }
}

interface SettingsContextValue {
  settings: Settings;
  toggle: (key: keyof Settings) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => loadSettings());

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage failures
    }
    const root = document.documentElement;
    root.classList.toggle('hc', settings.highContrast);
    root.classList.toggle('readable', settings.readableFont);
    root.classList.toggle('relaxed', settings.relaxedSpacing);
    root.classList.toggle('reduce-motion', settings.reducedMotion);
  }, [settings]);

  const toggle = useCallback((key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const value = useMemo(() => ({ settings, toggle }), [settings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
