import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        sf: {
          bg: "var(--sf-bg)",
          card: "var(--sf-card)",
          dark: "var(--sf-dark)",
          accent: "var(--sf-accent)",
          "accent-light": "var(--sf-accent-light)",
          "accent-pale": "var(--sf-accent-pale)",
          text: "var(--sf-text)",
          "text-secondary": "var(--sf-text-secondary)",
          "text-light": "var(--sf-text-light)",
          border: "var(--sf-border)",
          gold: "var(--sf-gold)",
          "gold-light": "var(--sf-gold-light)",
          success: "var(--sf-success)",
        },
      },
      borderRadius: {
        "sf-sm": "8px",
        "sf-md": "14px",
        "sf-lg": "20px",
        "sf-xl": "28px",
      },
      boxShadow: {
        "sf-sm":
          "0 1px 3px rgba(26,23,20,0.04), 0 1px 2px rgba(26,23,20,0.06)",
        "sf-md":
          "0 4px 16px rgba(26,23,20,0.06), 0 2px 4px rgba(26,23,20,0.04)",
        "sf-lg":
          "0 12px 40px rgba(26,23,20,0.08), 0 4px 12px rgba(26,23,20,0.04)",
        "sf-hover":
          "0 16px 48px rgba(26,23,20,0.12), 0 6px 16px rgba(26,23,20,0.06)",
      },
      keyframes: {
        "fly-up": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": {
            opacity: "0",
            transform: "translateY(-60px) scale(1.5)",
          },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fly-up": "fly-up 1.2s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
