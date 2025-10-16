/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF10F0',
        'lavender': '#B695F8',
        'deep-black': '#0A0A0A',
        'dark-gray': '#1A1A1A',
      },
    },
  },
  plugins: [],
}
