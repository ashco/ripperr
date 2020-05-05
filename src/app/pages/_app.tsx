import React from 'react';
import App from 'next/app';

import Page from '../components/Page';
import { withAuthentication } from 'context';
import { ThemeModeProvider } from 'context/ThemeModeContext';
import { PointerEventsProvider } from 'context/PointerEventsContext';

// import 'react-toastify/dist/ReactToastify.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeModeProvider>
        <PointerEventsProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </PointerEventsProvider>
      </ThemeModeProvider>
    );
  }
}

export default withAuthentication(MyApp);
