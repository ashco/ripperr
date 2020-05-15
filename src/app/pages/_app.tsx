import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';

import Page from '../components/Page';
import { withAuthentication } from 'context';

import configureStore from 'store';

// import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
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
