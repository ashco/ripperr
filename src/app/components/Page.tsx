import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';

import { ModalProvider } from '../context/ModalContext';
import { FormProvider } from '../context/FormContext';

import Meta from './Meta';
import Header from './Header';
import Navigation from './Navigation/Navigation';
import Modal from './Modal/NewModal';

const StyledPage = styled.div`
  color: ${({ theme }) => theme.color.neutral[900]};
  /* background: ${(props) => props.theme.color.neutral[400]}; */
  background: rgb(84,255,180);
  background: linear-gradient(32deg, rgba(84,255,180,1) 0%, rgba(74,255,209,1) 40%, rgba(101,230,255,1) 100%);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 12rem 1fr;
  grid-template-areas: 'navigation main';
`;

const Inner = styled.div`
  height: 100vh;
  grid-area: main;
  overflow-y: auto;
`;

const Page: React.FC = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <FormProvider>
          <StyledPage>
            <GlobalStyle />
            <Meta />
            <Modal />
            <Navigation />
            <ToastContainer />
            <Inner>{props.children}</Inner>
          </StyledPage>
        </FormProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default Page;
