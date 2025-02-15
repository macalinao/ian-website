import {
  default as Document,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document.js";

class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
