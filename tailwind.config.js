/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        bodyLight: "#1A161F",
        bodyDark: "#595F69",
        grey: "#C6C9CC",
        borderColor: "#E8E9EB",
        BG: "#F8F8F8",
        bodyColor: "#0D0C0F",
      },
    },
  },
  plugins: [],
};
