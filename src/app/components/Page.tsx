import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/GlobalStyle';
import Meta from './Meta';
import Header from './Header';
import Sidebar from './Navigation/Sidebar';
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
  grid-template-rows: 80px auto;
  grid-template-columns: 200px auto;
  grid-template-areas:
    'header header'
    'sidebar main';
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  height: auto;
  grid-area: main;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <Meta />
          <Header />
          <Sidebar />
          <Inner>{this.props.children}</Inner>
          {/* <SelectRow /> */}
          {/* <Nav /> */}
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
