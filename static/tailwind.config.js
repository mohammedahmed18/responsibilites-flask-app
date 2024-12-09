/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.slate,
      },
    },
  },
  daisyui: {
    themes: [
      "light",
    //   "dark",
    //   "cupcake",
    //   "bumblebee",
    //   "emerald",
    //   "corporate",
    //   "synthwave",
    //   "retro",
    //   "cyberpunk",
    //   "valentine",
    //   "halloween",
    //   "garden",
    //   "forest",
    //   "aqua",
    //   "lofi",
    //   "pastel",
    //   "fantasy",
    //   "wireframe",
    //   "black",
    //   "luxury",
    //   "dracula",
    //   "cmyk",
    //   "autumn",
    //   "business",
    //   "acid",
    //   "lemonade",
    //   "night",
    //   "coffee",
    //   "winter",
    //   "dim",
    //   "nord",
    //   "sunset",
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"),require('daisyui')],
}

