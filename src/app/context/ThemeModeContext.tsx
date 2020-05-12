import React from 'react';
import { theme as initTheme, darkMode, lightMode } from '../styles/theme';
import { DefaultTheme } from 'styled-components';

type Mode = 'LIGHT' | 'DARK';
type UseThemeMode = (mode: Mode) => void;
const ThemeModeContext = React.createContext<
  [DefaultTheme, UseThemeMode] | undefined
>(undefined);

function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState(initTheme);

  const setThemeMode: UseThemeMode = (mode) => {
    if (mode === 'LIGHT') {
      setTheme({ ...initTheme, mode: lightMode });
    } else if (mode === 'DARK') {
      setTheme({ ...initTheme, mode: darkMode });
    }
  };

  return (
    <ThemeModeContext.Provider value={[theme, setThemeMode]}>
      {children}
    </ThemeModeContext.Provider>
  );
}

function useThemeMode() {
  const context = React.useContext(ThemeModeContext);
  if (context === undefined) {
    throw Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
}

export { ThemeModeProvider, useThemeMode };
