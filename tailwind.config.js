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
        "messiah-red": "hsl(359, 50%, 43%)"
      },
      fontFamily: {
        inter: ["Inter", "monospace"]
      }
    },
  },
  plugins: [],
}

