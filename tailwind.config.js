/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
    },
  },
  daisyui: {
    themes: [
      {
        petiscar: {
          // "primary": "#7c3aed",
          "primary": "#d946ef",
          "secondary": "#475569",
          "accent": "#06b6d4",
          "neutral": "#737373",
          "base-100": "#ffffff",
          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#f43f5e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

