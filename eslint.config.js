import { configs } from "@macalinao/eslint-config-react";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  ...configs.reactFull,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    ignores: [".next/*"],
  },
];
