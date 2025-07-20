/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFF0A3',
          dark: '#B7950B',
        },
        custom: {
          dark: '#121212',
          paper: '#1A1A1A',
        }
      },
    },
  },
  plugins: [],
}