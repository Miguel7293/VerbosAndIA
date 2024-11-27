// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.css", // Aquí está la corrección
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
