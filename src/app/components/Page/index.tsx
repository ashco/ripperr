import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/styles/GlobalStyle';

import StyledPage from './style';

import { ModalProvider } from '@/context/ModalContext';
import { MoveProvider } from '@/context/MoveContext';
import { FilterProvider } from '@/context/FilterContext';
import { usePointerEvents } from '@/context/PointerEventsContext';
import {
  useThemeModeState,
  useThemeModeDispatch,
} from '@/context/ThemeModeContext';

import Meta from '../Meta';
import Navigation from '../Navigation';

const Page: React.FC = (props) => {
  const themeModeState = useThemeModeState();
  const themeModeDispatch = useThemeModeDispatch();

  const pointerEvents = usePointerEvents()[0];

  useEffect(() => {
    if (localStorage.getItem('themeMode') === 'LIGHT_MODE') {
      themeModeDispatch({ type: 'LIGHT_MODE' });
    } else if (localStorage.getItem('themeMode') === 'DARK_MODE') {
      themeModeDispatch({ type: 'DARK_MODE' });
    } else if (
      typeof window !== `undefined` &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      themeModeDispatch({ type: 'DARK_MODE' });
    }
  }, []);

  return (
    <ThemeProvider theme={themeModeState}>
      <MoveProvider>
        <ModalProvider>
          <FilterProvider>
            <StyledPage pointerEvents={pointerEvents ? 'auto' : 'none'}>
              <GlobalStyle />
              <Meta />
              <Navigation />
              <div className="main">{props.children}</div>
            </StyledPage>
          </FilterProvider>
        </ModalProvider>
      </MoveProvider>
    </ThemeProvider>
  );
};

export default Page;
