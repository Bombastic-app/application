/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      marine: 'rgb(var(--color-marine) / <alpha-value>)',
      beige: 'rgb(var(--color-beige) / <alpha-value>)'
    },
    fontFamily: {
      'balgin-black': 'Balgin-BlackSmCondensed',
      'balgin-narrow': 'Balgin-Narrow',
      'balgin-narrow-bold': 'Balgin-NarrowBold'
    },
    fontSize: {
      16: 16,
      18: 18,
      50: 50,
      56: 56
    },
    spacing: {
      7: 7,
      10: 10,
      16: 16,
      20: 20,
      24: 24,
      30: 30,
      50: 50
    },
    borderRadius: {
      12: 12,
      full: 99999
    },
    extend: {},
  },
  plugins: [],
}