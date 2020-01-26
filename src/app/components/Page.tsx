﻿import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

import Meta from './Meta';
import Header from './Header';
import Navigation from './Navigation/Navigation';
// // import SelectRow from "./SelectRow";
// import Nav from "./Nav";

const StyledPage = styled.div`
  /* background: white; */
  color: ${({ theme }) => theme.color.neutral[900]};
  background: ${(props) => props.theme.color.neutral[200]};
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr;
  /* grid-template-columns: auto; */
  grid-template-areas:
    'navigation'
    'main';
`;

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.space[15]};
  margin: 0 auto;
  /* padding: 2rem; */
  height: auto;
  grid-area: main;
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
