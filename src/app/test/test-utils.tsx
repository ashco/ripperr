import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
// import { useThemeModeState } from 'context/ThemeModeContext';
import { darkTheme } from 'styles/theme';

function render(ui: any, { theme = darkTheme, ...options } = {}) {
  function Wrapper({ children }: any) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
// override the built-in render with our own
export { render };
