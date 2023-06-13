/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'card-blue': '#1A1C49'
      }
    },
  },
  plugins: [],
  fontFamily: {
    'sans': ['Montserrat', 'Sans-serif']
  }
}

