import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/GlobalStyle';
import Meta from './Meta';
import Header from './Header';
import Navigation from './Navigation/Navigation';
// // import SelectRow from "./SelectRow";
// import Nav from "./Nav";

const theme = {
  colors: {
    black: '#393939',
    grey: '#3A3A3A',
    red: '#FF0000',
  },
  boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  maxWidth: '1000px',
};

const StyledPage = styled.div`
  background: white;
  color: ${({ theme }) => theme.colors.black};
  height: 100vh;
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
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
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
        <Inner>{props.children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
