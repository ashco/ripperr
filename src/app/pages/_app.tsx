import React from 'react';
import App from 'next/app';
import Page from '../components/Page';
import { withAuthentication } from '../context';
import { ThemeModeProvider } from '../context/ThemeModeContext';

import 'react-toastify/dist/ReactToastify.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeModeProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeModeProvider>
    );
  }
}

export default withAuthentication(MyApp);
