/* eslint-disable no-undef */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Source Sans Pro", "sans-serif"],
    },
  },
  variants: {
    outline: ["focus"],
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
