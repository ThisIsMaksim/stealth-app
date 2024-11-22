import {keepTheme} from "keep-react/keepTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [],
}

export default keepTheme(config);

