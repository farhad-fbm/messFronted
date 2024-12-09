import colors from './src/lib/colors';
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,

        background1: colors.background1,
        background2: colors.background2,
        background3: colors.background3,
        background4: colors.background4,

        text1: colors.text1,
        text2: colors.text2,
        text3: colors.text3,
        text4: colors.text4,

        success: colors.success,
        warning: colors.warning,
        error: colors.error,
      },
    },
  },
  plugins: [daisyui,],
}

