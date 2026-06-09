import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17212B",
        cream: "#FBFAF7",
        brand: {
          DEFAULT: "#6C5CE7",
          dark: "#5141C8",
          light: "#EEEAFE"
        },
        mint: "#20C997",
        sun: "#FFCC4D",
        coral: "#FF7D66"
      },
      boxShadow: {
        card: "0 16px 50px rgba(37, 29, 79, 0.08)",
        button: "0 5px 0 #5141C8",
        "button-sm": "0 3px 0 #5141C8"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    },
  },
  plugins: [],
} satisfies Config;
