/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // یہاں آپ کے مخصوص برانڈ کلرز آ گئے
      colors: {
        'azwaj-maroon': '#4A0E0E',
        'azwaj-gold': '#D4AF37',
      },
      // یہاں آپ کی اینیمیشنز آ گئیں
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
