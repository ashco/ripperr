// TODO - set up react dev tools to work with cypress
// need to run this before react loads to set up dev tools in cypress
// import '../react-devtools-hook'
// if (window.Cypress) {
//   window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
//     window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;
// }

import React from 'react';
import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

interface Props {
  styleTags: any;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
