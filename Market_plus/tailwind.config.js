/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./components/auth/**/*.{js,jsx,ts,tsx}",
    "./components/home/**/*.{js,jsx,ts,tsx}",
    "./components/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

