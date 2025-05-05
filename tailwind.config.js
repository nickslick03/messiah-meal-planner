/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'messiah-blue': 'hsl(210, 57%, 24%)',
        'messiah-blue-hover': 'hsl(210, 57%, 34%)',
        'messiah-blue-active': 'hsl(210, 57%, 14%)',
        'messiah-light-blue': 'hsl(210, 20%, 70%)',
        'messiah-light-blue-hover': 'hsl(210, 20%, 80%)',
        'messiah-light-blue-active': 'hsl(210, 20%, 60%)',
        'messiah-red': 'hsl(359, 50%, 43%)',
        'messiah-red-light': 'hsl(359, 50%, 63%)',
        'messiah-red-dark': 'hsl(359, 50%, 23%)',        
        'messiah-red-hover': 'hsl(359, 50%, 53%)',
        'messiah-red-active': 'hsl(359, 50%, 33%)',
        'messiah-green': 'hsl(173, 83%, 25%)',
        'messiah-green-light': 'hsl(173, 83%, 45%)',
        'messiah-green-dark': 'hsl(173, 83%, 15%)'
      },
      overflow: {
        visible: 'visible'
      },
      fontFamily: {
        inter: ['Inter', 'monospace']
      },
      dropShadow: {
        dark: '0 2px 2px rgb(0 0 0 / 0.3)'
      },
      keyframes: {
        topNotify: {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '20%, 60%': {
            transform: 'translateY(0%)'
          },
          '100%': {
            transform: 'translateY(-100%)'
          }
        }
      },
      animation: {
        topNotify: 'topNotify 3s ease'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
};
