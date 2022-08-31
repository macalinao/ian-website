/// <reference types="@emotion/react/types/css-prop" />

import type { css as cssImport } from "@emotion/react";
import type { default as styledImport } from "@emotion/styled";

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}
