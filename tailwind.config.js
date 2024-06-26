/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "messiah-blue": "hsl(210, 57%, 24%)",
        "messiah-blue-hover": "hsl(210, 57%, 34%)",
        "messiah-blue-active": "hsl(210, 57%, 14%)",
        "messiah-light-blue": "hsl(210, 20%, 70%)",
        "messiah-light-blue-hover": "hsl(210, 20%, 80%)",
        "messiah-light-blue-active": "hsl(210, 20%, 60%)",
        "messiah-red": "hsl(359, 50%, 43%)",
        "messiah-green": "hsl(173, 83%, 25%)"
      },
      fontFamily: {
        inter: ["Inter", "monospace"]
      },
      dropShadow: {
        "dark": "0 2px 3px rgb(0 0 0 / 0.3)"
      }
    },
  },
  plugins: [],
}

