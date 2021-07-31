import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React from "react";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="notifications"></div>
          <Script src="https://www.paypal.com/sdk/js?client-id=AVWa8N4iHxN5XSlZoJerbtPPdJbVkCHLaJgmmYfqKdY6ncElIYgSz-0GUwc0SRiIlIyDzSIM6mcEWcyv" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
