/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'max': '426px' },
      'md': { 'min': '426px', 'max': '769px' },
      'lg': { 'min': '769px' }
    },
    extend: {},
  },
  plugins: [require('daisyui')],
}