/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "header-height": "96px",
      },
      space: {
        "header-height": "96px",
      },
      colors: {
        primary: {
          lighter: "var(--primary-lighter)",
          light: "var(--primary-light)",
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          darker: "var(--primary-darker)",
        },
        secondary: {
          lighter: "var(--secondary-lighter)",
          light: "var(--secondary-light)",
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
          darker: "var(--secondary-darker)",
        },
        neutral: {
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          DEFAULT: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
      },
    },
  },
  plugins: [],
};
