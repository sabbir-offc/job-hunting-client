/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kanit': "'Kanit', sans-serif",
        "prompt": "'Prompt', sans-serif",
        "lilita": " 'Lilita One', sans-serif"


      }
    },
  },
  plugins: [
    require("daisyui"),
  ],

}

// ".scrollbar-thin": {
//   scrollbarWidth: "thin",
//   scrollbarColor: "rgb(51 29 29) white"
// },
// ".scrollbar-webkit": {
//   "&::-webkit-scrollbar": {
//     width: "8px"
//   },
//   "&::-webkit-scrollbar-track": {
//     background: "white"
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgb(31 41 55)",
//     borderRadius: "20px",
//     border: '1px solid white'
//   },
// }