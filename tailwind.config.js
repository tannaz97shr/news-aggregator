/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#222831",
      dark: "#393E46",
      teal: "#00ADB5",
      grey: "#eeeeee",
      backdrop: "rgba(0,0,0, 0.5)",
    },
    extend: {},
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
