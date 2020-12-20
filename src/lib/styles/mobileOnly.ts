import { css, SerializedStyles } from "@emotion/react";

export const mobileOnly = (styles: SerializedStyles): SerializedStyles =>
  css`
    @media only screen and (max-width: 767px) {
      ${styles}
    }
  `;
