import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#131313",
        surface: "#181716",
        "surface-low": "#0e0e0e",
        "surface-container": "#201f1f",
        "surface-high": "#2a2a2a",
        primary: "#e9c176",
        "primary-muted": "#c5a059",
        "on-primary": "#251900",
        "on-surface": "#e5e2e1",
        "on-muted": "#cfc7bb",
        outline: "#5d5345",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(233, 193, 118, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
