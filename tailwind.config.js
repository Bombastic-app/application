/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  safelist:  { pattern: /(!bg|!text|border)-./ },
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      marine: 'rgb(var(--color-marine) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
      green: 'rgb(var(--color-green) / <alpha-value>)',
      pink: 'rgb(var(--color-pink) / <alpha-value>)',
      purple: 'rgb(var(--color-purple) / <alpha-value>)',
      blue: 'rgb(var(--color-blue) / <alpha-value>)'
    },
    fontFamily: {
      'balgin-black': 'Balgin-BlackSmCondensed',
      'balgin-black-italic': 'Balgin-BlackSmCondensedItalic',
      'balgin-bold': 'Balgin-BoldSmCondensed',
      'balgin-narrow': 'Balgin-Narrow',
      'balgin-narrow-bold': 'Balgin-NarrowBold',
      'libre-franklin': 'Libre Franklin'
    },
    fontSize: {
      12: 12,
      14: 14,
      16: 16,
      18: 18,
      20: 20,
      26: 26,
      28: 28,
      32: 32,
      50: 50,
      56: 56
    },
    spacing: {
      0: 0,
      3: 3,
      4: 4,
      5: 5,
      7: 7,
      10: 10,
      13: 13,
      15: 15,
      16: 16,
      20: 20,
      24: 24,
      28: 28,
      30: 30,
      40: 40,
      50: 50,
      60: 60,
      70: 70,
      110: 110,
      130: 130,
      150: 150,
      160: 160,
      200: 200,
      300: 300
    },
    borderRadius: {
      12: 12,
      30: 30,
      full: 99999
    },
    extend: {
      borderWidth: {
        1: 1,
        // 4: 5
      },
      zIndex: {
        1: 1
      }
    },
  },
  plugins: [],
}