import React from 'react';
import { lightTheme, darkTheme } from '../styles/theme';
import { DefaultTheme } from 'styled-components';

type Mode = 'LIGHT' | 'DARK';
type UseThemeMode = (mode: Mode) => void;
const ThemeModeContext = React.createContext<
  [DefaultTheme, UseThemeMode] | undefined
>(undefined);

function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState(darkTheme);

  const setThemeMode: UseThemeMode = (mode) => {
    if (mode === 'LIGHT') {
      setTheme(lightTheme);
    } else if (mode === 'DARK') {
      setTheme(darkTheme);
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
