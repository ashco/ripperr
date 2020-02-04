import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

interface IProps {
  styleTags: any;
}

export default class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    //   const page = ctx.renderPage(App => props =>
    //     sheet.collectStyles(<App {...props} />),
    //   );
    //   const styleTags = sheet.getStyleElement();
    //   return { ...page, styleTags };
    // }

    // render() {
    //   return (
    //     <html>
    //       <Head>{this.props.styleTags}</Head>
    //       <body>
    //         {/* <ModalRoot id="modal-root" /> */}
    //         <Main />
    //         <NextScript />
    //       </body>
    //     </html>
    //   );
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
