/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Noto Serif", "serif"],
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
