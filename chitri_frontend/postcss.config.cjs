// chitri_frontend/postcss.config.cjs
// This file MUST be named .cjs (or .mjs if using ES module syntax here)
// if your package.json has "type": "module" and you want to use CommonJS syntax (module.exports, require()).

module.exports = {
  plugins: [
    require('tailwindcss'), // This will load the main tailwindcss plugin
    require('autoprefixer'),
  ],
};
