/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        list: "calc(100vh - 160px)",
      },
      gridTemplateColumns: {
        "list": "200px 125px 100px 100px 100px 100px",
        "md-list": "200px 125px 100px 100px 100px 100px",
      },
      minWidth: {
        mille: "1000px",
      },
      fontFamily: {
        youngserif: ["YoungSerif"],
      },
    },
  },
  plugins: [],
}