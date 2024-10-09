/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /^[a-zA-Z0-9:_-]+$/,
    },

  ],
  plugins: [],
} satisfies Config

