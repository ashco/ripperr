import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'store';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'styles/GlobalStyle';

import StyledPage from './style';

import { ModalProvider } from 'context/ModalContext';
import { MoveProvider } from 'context/MoveContext';
import { AddMoveModeProvider } from 'context/AddMoveModeContext';
import { usePointerEvents } from 'context/PointerEventsContext';

import Meta from '../Meta';
import NavBar from 'domain/Navigation';

const Page: React.FC = (props) => {
  const pointerEvents = usePointerEvents()[0];

  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const prevThemeMode = localStorage.getItem('theme');

    if (prevThemeMode) {
      dispatch({ type: prevThemeMode });
    } else if (
      typeof window !== `undefined` &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      dispatch({ type: 'DARK_MODE' });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MoveProvider>
        <ModalProvider>
          <AddMoveModeProvider>
            <StyledPage pointerEvents={pointerEvents ? 'auto' : 'none'}>
              <GlobalStyle />
              <Meta />
              <NavBar />
              <div className="main">{props.children}</div>
            </StyledPage>
          </AddMoveModeProvider>
        </ModalProvider>
      </MoveProvider>
    </ThemeProvider>
  );
};

export default Page;
