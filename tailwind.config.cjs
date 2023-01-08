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
        },
        brown: {
          50: '#FBF6F5',
          100: '#F7EEEC',
          200: '#EFDFDC',
          300: '#E2C3BF',
          400: '#D1A19B',
          500: '#BC7E77',
          600: '#A55C59',
          700: '#894847',
          800: '#743D3D',
          900: '#68393B'
        }
      },
      transitionTimingFunction: {
        bounce: 'cubic-bezier(.7,-0.33,.36,1.33)'
      }
    },
  },
  plugins: [],
};
