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
      'md': { 'max': '768px' },
      'lg': { 'min': '769px' }
    },
    extend: {}
  },
  plugins: [require('daisyui')],
}