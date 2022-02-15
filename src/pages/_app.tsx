import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import { globalStyles } from "~src/lib/styles/globalStyles";
import { useAnalytics } from "~src/lib/useAnalytics";

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
    <meta name="apple-mobile-web-app-title" content="ian.pw" />
    <meta name="application-name" content="ian.pw" />
    <meta name="msapplication-TileColor" content="#3873a3" />
    <meta name="theme-color" content="#3873a3" />
  </>
);

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useAnalytics();
  return (
    <AppOuter>
      <AppWrapper>
        <Global styles={globalStyles} />
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

const AppWrapper = styled.div`
  width: 750px;
  margin: 0px auto;
  max-width: calc(100% - 40px);
  padding: 0px 20px;
  margin-bottom: 60px;
`;

export default App;
