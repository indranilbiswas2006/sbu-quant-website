import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"]
      },
      colors: {
        "midnight": "#07090f",
        "carbon": "#0e121b",
        "ice": "#d9f0ff",
        "neon": "#C8102E",
        "signal": "#7c9cff",
        "ember": "#ff7a59"
      },
      boxShadow: {
        glow: "0 0 40px rgba(200, 16, 46, 0.35)"
      },
      backgroundImage: {
        "grid": "linear-gradient(rgba(124, 156, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 156, 255, 0.08) 1px, transparent 1px)",
        "radial": "radial-gradient(circle at top, rgba(124, 156, 255, 0.25), transparent 55%)"
      }
    }
  },
  plugins: []
};

export default config;
