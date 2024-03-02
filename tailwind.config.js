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
    extend: {
      keyframes: {
        slide: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100%)' },
        }
      }

    },
    plugins: [require('daisyui')],
  }

}