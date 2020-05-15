import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';

import Page from '../components/Page';
import { withAuthentication } from 'context';
import { PointerEventsProvider } from 'context/PointerEventsContext';

import configureStore from 'store';

// import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <PointerEventsProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </PointerEventsProvider>
      </Provider>
    );
  }
}

export default withAuthentication(MyApp);
