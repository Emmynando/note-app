import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secClr: "#383A3D",
        priText: "#A4C6ED",
        boxShadow: {
          custom:
            "0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
