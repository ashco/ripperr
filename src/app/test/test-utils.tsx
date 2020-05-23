import React from 'react';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import createStore from 'store';
import { darkTheme } from 'styles/theme';

interface RenderOptions {
  state?: object;
  store?: EnhancedStore<any>;
  theme?: DefaultTheme;
  rtlOptions?: any;
}

function render<Render>(
  ui: any,
  {
    state,
    store = createStore(state),
    theme = darkTheme,
    ...rtlOptions
  }: RenderOptions = {},
): any {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  };

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }),
    store,
  };
}

export * from '@testing-library/react';
// override the built-in render with our own
export { render };
