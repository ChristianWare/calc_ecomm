// Importing Config type from tailwindcss
import type { Config } from "tailwindcss";

// Importing withMT from "@material-tailwind/react/utils"
const withMT = require("@material-tailwind/react/utils/withMT");

// Exporting configuration with Material Tailwind plugin
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/***.{js, ts, jsx, tsx, mdx}",
    "./app/**/*.{js, ts, jsx, tsx, mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
