import { default as Link } from "next/link.js";
import { NextSeo } from "next-seo";
import type React from "react";
import { css, default as tw, styled } from "twin.macro";

import {
  clampWidth,
  lineCountAtWidth,
  mobileOnly,
} from "~src/lib/styles/mobileOnly.js";

const quote =
  "The best time to plant a tree was 20 years ago. The second best time is now.";

const Home: React.FC = () => {
  return (
    <div tw="md:pt-24">
      <NextSeo canonical="https://ianm.com/" />
      <h1 tw="text-4xl my-4 md:(text-5xl my-8)">Ian Macalinao</h1>
      <div tw="text-lg flex flex-col gap-4">
        <p
          css={css`
            ${lineCountAtWidth(2, 370)}
          `}
        >
          Hi, I&apos;m Ian. I&apos;m currently working on{" "}
          <a href="https://saber.so" target="_blank" rel="noreferrer">
            Saber
          </a>
          , a stableswap AMM on Solana.
        </p>
        <p
          css={css`
            // 2 lines tall to lessen layout shift
            min-height: calc(28px * 2);
            ${lineCountAtWidth(4, 370)}
          `}
        >
          I believe in a future where capital can flow freely to its most
          productive economic purpose&mdash; a future with truly efficient
          markets.
        </p>
        <p
          css={css`
            max-height: 35px;
            ${lineCountAtWidth(1, 370)}
            // hack for page speed to be happy
            overflow: hidden;
            ${lineCountAtWidth(2, 350)}
          `}
        >
          You can find my resume <Link href="/resume">here</Link>.
          <span
            css={css`
              ${clampWidth(
                css`
                  display: none;
                `,
                367,
              )}
              ${clampWidth(
                css`
                  display: inline;
                `,
                350,
              )}
            `}
          >
            {" "}
            &#9632;
          </span>
        </p>
      </div>

      <Connect>
        <li>
          <Link href="/posts">Writing</Link>
        </li>
        <li>
          <a href="https://twitter.com/simplyianm">Twitter</a>
        </li>
        <li>
          <a href="https://github.com/macalinao">GitHub</a>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </Connect>
      <Quote>&ldquo;{quote}&rdquo;</Quote>
    </div>
  );
};

const Quote = styled.blockquote`
  &::before {
    display: block;
    background-color: #979797;
    height: 1px;
    width: 120px;
    content: "";
    margin-bottom: 20px;
  }

  ${tw`text-left text-gray-500 italic m-0 text-base mb-7`}
`;

const Connect = styled.ul`
  text-align: center;
  padding: 0px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${mobileOnly(css`
    grid-template-columns: repeat(2, 1fr);
    text-align: left;
  `)}
  max-width: 100%;
  li {
    display: inline;
    &:last-child {
      padding-right: 0;
    }
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  margin-top: 45px;
  margin-bottom: 45px;

  ${mobileOnly(css`
    margin-top: 10px;
    margin-bottom: 10px;
  `)}
`;

export default Home;
