import React from 'react';
import App from 'next/app';
import Page from '../components/Page';

import { withAuthentication } from '../context';
import { DarkModeProvider } from '../context/DarkModeContext';

import 'react-toastify/dist/ReactToastify.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <DarkModeProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </DarkModeProvider>
    );
  }
}

export default withAuthentication(MyApp);
