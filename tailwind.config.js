
/** @type {import('tailwindcss').Config} */

export default {

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {

    extend: {

      colors: {

        'azwaj-gold': '#D4AF37',

        'azwaj-maroon': '#4A0E0E',

        'azwaj-dark': '#300909',

        'azwaj-light': '#FDF5F5',

      },

      backgroundImage: {

        'premium-gradient': 'linear-gradient(135deg, #4A0E0E 0%, #631212 100%)',

        'gold-gradient': 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',

      }

    },

  },

  plugins: [],

}



