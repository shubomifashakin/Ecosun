/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: { sans: ['"Poppins", sans-serif'] },
    extend: {
      colors: {
        primaryBlue: "#2f4858",
        secondaryGreen: "#cafdc6",
        borderColor: "#2F485826",
        backgroundColor: "#f8f8f3",
      },
    },
  },
  plugins: [],
};
