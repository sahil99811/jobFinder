/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0 22px 4px rgba(255, 32, 32, 0.25)',
        '4xl':'0 4 23px 2px rgba(0, 0, 0, 0.1)'
      }
    },
    colors: {
      white: "#ffffff",
      black: "#000",
      grey:"#C2C2C2",
      lightgrey:"#E3E3E3",
      red:"#ED5353",
      lightred:"#FFEEEE",
      richblack:{
        200:"595959",
        500:"#525252"
      },
      richgrey:{
        200:"#CCCCCC",
        300:"#999999"
      },
      richwhite:{
        100:"#FFEFEF"
      }
    }
  },
  plugins: [],
}

