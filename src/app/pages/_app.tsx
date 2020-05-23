import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import createStore from 'store';

import Page from 'components/Page';
import withAuthentication from 'context/withAuthentication';

const store = createStore();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    if (typeof window !== `undefined` && (window as any).Cypress) {
      (window as any).store = store;
    }

    return (
      <Provider store={store}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Provider>
    );
  }
}

export default withAuthentication(MyApp);
