/** @type {import('tailwindcss').Config} */
import { Platform } from "react-native";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f3f5f1",
          100: "#dfe6d9",
          200: "#c7d5bc",
          300: "#a8bfa0",
          400: "#7ea080",
          500: "#5f7a61",
          600: "#4f6650",
          700: "#425440",
          800: "#374535",
          900: "#2d382c",
        },
        secondary: {
          50: "#fef7f3",
          100: "#fce8dc",
          200: "#f9d5c1",
          300: "#f4b8a0",
          400: "#ed968f",
          500: "#d9ae8e",
          600: "#c2957a",
          700: "#a87d65",
          800: "#8a6552",
          900: "#6d5242",
        },
        tertiary: {
          50: "#f1f5f9",
          100: "#dce6f0",
          200: "#c1d4e6",
          300: "#9ebad8",
          400: "#7a9ac7",
          500: "#6b8ead",
          600: "#5d789b",
          700: "#515f80",
          800: "#464c69",
          900: "#3c4056",
        },
        neutral: {
          50: "#fefdfb",
          100: "#faf8f6",
          200: "#f7f5f2",
          300: "#f0ede8",
          400: "#e0dcd4",
          500: "#ccc5bb",
          600: "#b8aea4",
          700: "#9d9490",
          800: "#7a7268",
          900: "#5d564c",
        },
      },
      text: {
        DEFAULT: '#0f172a',
        muted: '#64748b',
      },
    },
  },
  plugins: [],
}
