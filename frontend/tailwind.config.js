/** @type {import('tailwindcss').Config} */
const preset = require("./themes/presets");
const tokens = require("./themes/tokens");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      ...preset,
      ...tokens,
    },
  },
  plugins: [],
};
