import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", "Georgia", "serif"],
      },
      colors: {
        ian: {
          DEFAULT: "#3873A3",
          50: "#AFCCE4",
          100: "#A0C2DE",
          200: "#82AFD4",
          300: "#639CC9",
          400: "#4588BF",
          500: "#3873A3",
          600: "#2A5679",
          700: "#1B384F",
          800: "#0D1B26",
          900: "#000000",
        },
      },
    },
  },
};

export default config;
