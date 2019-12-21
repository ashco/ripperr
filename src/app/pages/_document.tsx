import Document, { Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

interface Props {
  styleTags: any
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          {/* <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services --> */}
          {/* <!-- Firebase App (the core Firebase SDK) is always required and must be listed first --> */}
          <script src="/__/firebase/7.6.1/firebase-app.js"></script>
          {/* <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics --> */}
          <script src="/__/firebase/7.6.1/firebase-analytics.js"></script>
          {/* <!-- Add Firebase products that you want to use --> */}
          <script src="/__/firebase/7.6.1/firebase-auth.js"></script>
          <script src="/__/firebase/7.6.1/firebase-firestore.js"></script>
          {/* <!-- Initialize Firebase --> */}
          <script src="/__/firebase/init.js"></script>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
