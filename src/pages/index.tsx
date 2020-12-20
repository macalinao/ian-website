import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { lineCountAtWidth, mobileOnly } from "~src/lib/styles/mobileOnly";

const quote =
  "The best time to plant a tree was 20 years ago. The second best time is now.";

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <Head>
        <title>Ian Macalinao</title>
        <meta
          name="description"
          content="The personal website and blog of Ian Macalinao, software engineer and crypto-finance enthusiast."
        />
      </Head>
      <h1>Ian Macalinao</h1>
      <div>
        <p
          css={css`
            ${lineCountAtWidth(5, 370)}
          `}
        >
          Hi, I'm Ian. I'm currently working at{" "}
          <a href="https://pipe.com" target="_blank">
            Pipe
          </a>
          , an exchange for companies to get liquidity on their recurring
          revenue streams.
        </p>
        <p
          css={css`
            // 3 lines tall to lessen layout shift
            min-height: calc(35px * 3);
            ${lineCountAtWidth(5, 370)}
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
          You can find my resume{" "}
          <a href="/resume" target="_blank">
            here
          </a>
          . &#9632;
        </p>
      </div>

      <Connect>
        <li>
          <Link href="/posts" passHref prefetch={false}>
            <a>Writing</a>
          </Link>
        </li>
        <li>
          <a href="https://twitter.com/simplyianm">Twitter</a>
        </li>
        <li>
          <a href="https://github.com/macalinao">GitHub</a>
        </li>
        <li>
          <Link href="/contact" passHref prefetch={false}>
            <a>Contact</a>
          </Link>
        </li>
      </Connect>
      <Quote>"{quote}"</Quote>
    </HomeWrapper>
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

  text-align: left;
  color: #666;
  font-style: italic;
  margin: 0;
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 30px;
`;

const HomeWrapper = styled.div`
  width: 720px;
  max-width: 100%;
  margin: 0px auto;
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
