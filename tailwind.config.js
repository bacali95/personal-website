module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    container: { center: true },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
