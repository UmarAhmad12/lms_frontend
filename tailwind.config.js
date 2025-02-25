/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: '#3490dc', // Define your primary color
      //   secondary: '#e06aef', // Define your secondary color
      // },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
