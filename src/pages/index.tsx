import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const quotes = [
  "Success isn't about being the best. It's about always getting better.",
  "Nothing ventured, nothing gained.",
  "The world is your oyster.",
];

const randomQuote = (): string => {
  return quotes[Math.floor(Math.random() * quotes.length)] ?? quotes[0] ?? "";
};

const Home: React.FC = () => {
  const [quote, setQuote] = useState<string>(
    "Success isn't about being the best. It's about always getting better."
  );

  useEffect(() => {
    setQuote(randomQuote());
  }, []);

  return (
    <div id="homeWrapper">
      <Head>
        <title>Ian Macalinao</title>
      </Head>
      <h1 className="desktop">Ian Macalinao</h1>
      <h1 className="mobile">Ian M.</h1>

      <div id="info">
        <p>
          Hi, I'm Ian<span className="mobile"> Macalinao</span>. I'm currently
          working at{" "}
          <a href="https://pipe.com" target="_blank">
            Pipe
          </a>
          , an exchange for companies to get liquidity on their recurring
          revenue streams.
        </p>
        <p>
          I believe in a future where capital can flow freely to its most
          productive economic purpose&mdash; a future with truly efficient
          markets.
        </p>
        <p>
          I prefer high level abstractions over for-loops and mutexes, and
          <br />I prefer a strong type system over preventable runtime errors.
          <br />I believe that the best code is the code you don’t have to
          write.
        </p>
        <p>
          You can find my resume{" "}
          <a href="/resume" target="_blank">
            here
          </a>
          . &#9632;
        </p>
      </div>

      <div id="connect">
        <ul>
          <li>
            <Link href="/posts" passHref>
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
            <Link href="/contact" passHref>
              <a>Contact</a>
            </Link>
          </li>
        </ul>
      </div>

      <div id="quoteBar"></div>

      <blockquote id="quote">"{quote}"</blockquote>
    </div>
  );
};

export default Home;
