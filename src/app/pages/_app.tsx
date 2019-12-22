import React from 'react'
import App from 'next/app'
import Page from '../components/Page';

import Firebase, { FirebaseContext } from '../components/Firebase';

export default class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props
    return (
      // <FirebaseContext.Provider value={new Firebase()}>
      // <FirebaseContext.Provider>
      < Page >
        <Component {...pageProps} />
      </Page >
      // </FirebaseContext.Provider>
    )
  }
}