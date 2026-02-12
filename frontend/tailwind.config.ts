import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        sf: {
          bg: "#F6F3EE",
          card: "#FFFFFF",
          dark: "#1A1714",
          accent: "#C45D3E",
          "accent-light": "#E8805F",
          "accent-pale": "#FDF0EC",
          text: "#1A1714",
          "text-secondary": "#6B6560",
          "text-light": "#9C9690",
          border: "#E5E0D8",
          gold: "#D4A853",
          "gold-light": "#FBF5E6",
          success: "#3A7D5C",
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
