import type { SerializedStyles } from "@emotion/react";
import { css } from "twin.macro";

export const mobileOnly = (styles: SerializedStyles): SerializedStyles => css`
  @media only screen and (max-width: 767px) {
    ${styles}
  }
`;

export const clampWidth = (
  styles: SerializedStyles,
  width: number,
): SerializedStyles => css`
  @media only screen and (max-width: ${width}px) {
    ${styles}
  }
`;

export const lineCountAtWidth = (
  count: number,
  width: number,
): SerializedStyles =>
  clampWidth(
    css`
      min-height: calc(28px * ${count});
    `,
    width,
  );
