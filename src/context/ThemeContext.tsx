import React, { useState, createContext, useContext, useEffect } from 'react';
import { ThemeStyle, ThemeConfig, THEME_CONFIGS } from '../styles/themeConfig';

interface ThemeContextType {
  currentTheme: ThemeStyle;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeStyle) => void;
  isThemePickerOpen: boolean;
  setIsThemePickerOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'baiten_jlu_active_theme_v1';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<ThemeStyle>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in THEME_CONFIGS) {
        return saved as ThemeStyle;
      }
    } catch {
      // fallback
    }
    return 'baiten-classic';
  });

  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

  const setTheme = (theme: ThemeStyle) => {
    setCurrentThemeState(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  };

  const themeConfig = THEME_CONFIGS[currentTheme];

  useEffect(() => {
    // Add theme class to html/body if needed
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeConfig,
        setTheme,
        isThemePickerOpen,
        setIsThemePickerOpen
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
