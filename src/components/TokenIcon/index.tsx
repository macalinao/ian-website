import { css } from "@emotion/react";
import COMP from "./COMP.svg";
import USDC from "./USDC.svg";
import WBTC from "./WBTC.svg";

const tokenInfo = {
  COMP: {
    Icon: COMP,
    link: "https://www.coingecko.com/en/coins/compound",
  },
  USDC: {
    Icon: USDC,
    link: "https://www.coingecko.com/en/coins/usd-coin",
  },
  WBTC: {
    Icon: WBTC,
    link: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
  },
};

interface IProps {
  token: keyof typeof tokenInfo;
  hideName: boolean;
}

export const TokenIcon = ({ token }: IProps) => {
  const { Icon, link } = tokenInfo[token];
  return (
    <a
      href={link}
      target="_blank"
      css={css`
        color: #333;
        font-weight: 400;
        text-decoration: none;
        display: inline-block;
      `}
    >
      <span
        css={css`
          svg {
            height: 1em;
            width: 1em;
            margin-left: 2px;
            margin-right: 4px;
            margin-bottom: -2px;
          }
        `}
      >
        <Icon />
        <span>{token}</span>
      </span>
    </a>
  );
};
