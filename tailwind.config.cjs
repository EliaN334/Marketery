/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pt-sans": ['PT Sans', 'sans-serif'],
        "pt-sans-narrow": ['PT Sans Narrow', 'sans-serif']
      },
      colors: {
        tan: {
          50: '#FFF6ED',
          100: '#FEEAD6',
          200: '#FCD1AC',
          300: '#F9A362',
          400: '#F78340',
          500: '#F4631B',
          600: '#E54911',
          700: '#BE3510',
          800: '#972C15',
          900: '#7A2614'
        }
      }
    },
  },
  plugins: [],
};
