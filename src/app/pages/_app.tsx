import React from 'react';
import App from 'next/app';
import Page from '../components/Page';
import { withAuthentication } from '../components/Session';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Page>
        <Component {...pageProps} />
      </Page>
    );
  }
}

export default withAuthentication(MyApp);
