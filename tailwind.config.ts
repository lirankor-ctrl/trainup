import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        sage: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        ocean: {
          50: "#eff8ff",
          100: "#dbeefe",
          300: "#7cc4fb",
          400: "#48a9f8",
          500: "#2b8fe6",
          600: "#1f72c4",
        },
      },
      boxShadow: {
        soft: "0 8px 24px -8px rgba(31, 114, 196, 0.18)",
        glow: "0 12px 32px -10px rgba(16, 185, 129, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
