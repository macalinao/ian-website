import { Global } from "@emotion/react";
import { css, default as tw, GlobalStyles as BaseStyles } from "twin.macro";

const globalStyles = css`
  body {
    ${tw`font-sans font-normal text-gray-700`}
  }

  h1,
  h2 {
    ${tw`font-serif font-bold text-gray-900`}
  }

  a {
    ${tw`transition-all text-ian hover:text-ian-200`}
  }

  pre {
    border-left: 4px solid #3873a3;
  }

  #post blockquote {
    border-left: 2px solid #455565;
    font-style: italic;
    color: #666;
    margin: 10px 5px;
    padding: 5px 25px;
  }

  #post p > img {
    width: 100%;
    margin: 0 0 60px;
  }

  figure {
    width: 100%;
    margin: 60px auto;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  figure img {
    max-width: 100%;
    display: block;
    margin: 0px auto;
  }

  figcaption {
    text-align: center;
    font-style: italic;
    color: #777;
  }

  strong {
    font-weight: 700;
  }
`;

export const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={globalStyles} />
  </>
);
