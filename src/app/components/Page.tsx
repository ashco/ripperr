import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/GlobalStyle';
// import { theme, lightMode, darkMode } from '../styles/theme';

import { ModalProvider } from '../context/ModalContext';
import { MoveProvider } from '../context/MoveContext';
import { FilterProvider } from '../context/FilterContext';
import {
  useThemeModeState,
  useThemeModeDispatch,
} from '../context/ThemeModeContext';

import Meta from './Meta';
import Navigation from './Navigation/Navigation';

const StyledPage = styled.div`
  color: ${({ theme }) => theme.color.neutral[900]};
  /* background: rgb(84, 255, 180);
  background: linear-gradient(
    32deg,
    rgba(84, 255, 180, 1) 0%,
    rgba(74, 255, 209, 1) 40%,
    rgba(101, 230, 255, 1) 100%
  ); */
  background: ${(props) => props.theme.mode.background[100]};
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-areas:
    'navigation'
    'main';
  border-top: 7px solid rgba(84, 255, 180, 1);
`;

const Inner = styled.div`
  grid-area: main;
  overflow-y: auto;
`;

const Page: React.FC = (props) => {
  const themeModeState = useThemeModeState();
  const themeModeDispatch = useThemeModeDispatch();

  useEffect(() => {
    if (
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
            <StyledPage>
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

export default Page;
