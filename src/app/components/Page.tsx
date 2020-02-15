import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

import Meta from './Meta';
import Header from './Header';
import Navigation from './Navigation/Navigation';

const StyledPage = styled.div`
  color: ${({ theme }) => theme.color.neutral[900]};
  background: ${(props) => props.theme.color.neutral[400]};
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 12rem 1fr;
  grid-template-areas: 'navigation main';
`;

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
`;

const Inner = styled.div`
  height: 100vh;
  grid-area: main;
  overflow-y: auto;
`;

const Page = (props: any) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <GlobalStyle />
        <Meta />
        <ModalRoot id="modal-root" />
        <Navigation />
        <ToastContainer />
        <Inner>{props.children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
