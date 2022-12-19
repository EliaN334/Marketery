/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWith: 80,
  singleQuote: true,
  jsxSingleQuote: true
};
