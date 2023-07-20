/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        clickedgray: '#B7B7B7',
        unclickedgray: '#bfbfbf',
        darkgray: '#7b7b7b',
      }
    },
  },
  plugins: [],
}

