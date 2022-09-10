import type { AppProps } from "next/app.js";
import { default as Head } from "next/head.js";
import React from "react";
import tw, { styled } from "twin.macro";

import { GlobalStyles } from "~src/layouts/GlobalStyles/index.js";
import { useAnalytics } from "~src/lib/useAnalytics.js";

const favicons = (
  <>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png?v=00awvKA8lm"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png?v=00awvKA8lm"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png?v=00awvKA8lm"
    />
    <link rel="manifest" href="/site.webmanifest?v=00awvKA8lm" />
    <link
      rel="mask-icon"
      href="/safari-pinned-tab.svg?v=00awvKA8lm"
      color="#3873a3"
    />
    <link rel="shortcut icon" href="/favicon.ico?v=00awvKA8lm" />
    <meta name="apple-mobile-web-app-title" content="ianm.com" />
    <meta name="application-name" content="ianm.com" />
    <meta name="msapplication-TileColor" content="#3873a3" />
    <meta name="theme-color" content="#3873a3" />
  </>
);

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useAnalytics();
  return (
    <AppOuter>
      <AppWrapper>
        <GlobalStyles />
        <Head>
          <meta charSet="UTF-8" />
          {favicons}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:site_name" content="Ian Macalinao" />
          <meta property="og:locale" content="en_US" />
        </Head>
        <Component {...pageProps} />
      </AppWrapper>
    </AppOuter>
  );
};

const AppOuter = styled.div`
  border-top: 10px solid #3873a3;
  width: 100%;
`;

const AppWrapper = styled.div(() => [
  tw`w-full max-w-3xl mx-auto px-5 md:mb-16`,
]);

export default App;
