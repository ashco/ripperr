import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/GlobalStyle';
// import { theme, lightMode, darkMode } from '../styles/theme';

import { ModalProvider } from '../context/ModalContext';
import { MoveProvider } from '../context/MoveContext';
import { FilterProvider } from '../context/FilterContext';
import { usePointerEvents } from '../context/PointerEventsContext';
import {
  useThemeModeState,
  useThemeModeDispatch,
} from '../context/ThemeModeContext';

import Meta from './Meta';
import Navigation from './Navigation/Navigation';

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
              <Inner>{props.children}</Inner>
            </StyledPage>
          </FilterProvider>
        </ModalProvider>
      </MoveProvider>
    </ThemeProvider>
  );
};

const StyledPage = styled.div<{ pointerEvents: string }>`
  color: ${({ theme }) => theme.color.neutral[900]};
  background: ${(props) => props.theme.mode.background[100]};
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-areas:
    'navigation'
    'main';
  border-top: 7px solid ${(props) => props.theme.color.logo};
  pointer-events: ${(props) => (props.pointerEvents ? 'auto' : 'none')};
`;

const Inner = styled.div`
  grid-area: main;
  overflow-y: auto;
`;

export default Page;
