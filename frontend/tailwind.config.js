/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
        headline: ['"Noto Serif"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
        label: ['"Manrope"', 'sans-serif'],
      },
      colors: {
        "on-surface-variant": "#c3c5d8",
        "tertiary-fixed-dim": "#ffb59a",
        "on-tertiary-fixed-variant": "#802a00",
        "outline-variant": "#434656",
        "on-error": "#690005",
        "on-secondary-fixed": "#0d1c2d",
        "tertiary-container": "#c74500",
        "secondary": "#b9c8de",
        "on-error-container": "#ffdad6",
        "on-tertiary": "#5b1b00",
        "on-primary-fixed": "#001550",
        "on-background": "#e5e2e1",
        "surface-tint": "#D32F2F",
        "primary-fixed-dim": "#D32F2F",
        "surface-container-lowest": "#0e0e0e",
        "background": "#131313",
        "surface-container-highest": "#353534",
        "on-tertiary-fixed": "#380d00",
        "error-container": "#93000a",
        "on-tertiary-container": "#fff4f1",
        "inverse-on-surface": "#313030",
        "inverse-surface": "#e5e2e1",
        "outline": "#8d90a2",
        "secondary-container": "#39485a",
        "secondary-fixed": "#d4e4fa",
        "primary": "#D32F2F",
        "on-primary-fixed-variant": "#8B0000",
        "on-secondary-container": "#a7b6cc",
        "on-secondary": "#233143",
        "primary-fixed": "#FFEBEE",
        "on-primary": "#FFFFFF",
        "surface-container": "#201f1f",
        "inverse-primary": "#D32F2F",
        "surface-container-high": "#2a2a2a",
        "on-primary-container": "#FFFFFF",
        "surface": "#131313",
        "surface-bright": "#3a3939",
        "on-surface": "#e5e2e1",
        "surface-dim": "#131313",
        "error": "#ffb4ab",
        "secondary-fixed-dim": "#b9c8de",
        "surface-variant": "#353534",
        "primary-container": "#D32F2F",
        // Backward-compatible aliases for existing utility usage.
        surface_variant: "#353534",
        primary_container: "#D32F2F",
        on_surface: "#e5e2e1",
        on_surface_variant: "#c3c5d8",
        "surface-container-low": "#1c1b1b"
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(220, 20, 60, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 30px rgba(220, 20, 60, 0.9))' },
        }
      }
    },
  },
  plugins: [],
}
