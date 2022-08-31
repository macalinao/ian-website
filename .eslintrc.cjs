"use strict";

/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: ["*.js"],
  extends: ["next", "@saberhq/eslint-config-react"],
  parserOptions: {
    project: "tsconfig.json",
  },
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
};

module.exports = config;
