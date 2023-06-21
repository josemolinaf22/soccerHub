import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Teko", "san-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
