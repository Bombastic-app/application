/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      marine: 'rgb(var(--color-marine) / <alpha-value>)',
      beige: 'rgb(var(--color-beige) / <alpha-value>)',
      green: 'rgb(var(--color-green) / <alpha-value>)',
      pink: 'rgb(var(--color-pink) / <alpha-value>)',
      purple: 'rgb(var(--color-purple) / <alpha-value>)',
      blue: 'rgb(var(--color-blue) / <alpha-value>)'
    },
    fontFamily: {
      'balgin-black': 'Balgin-BlackSmCondensed',
      'balgin-narrow': 'Balgin-Narrow',
      'balgin-narrow-bold': 'Balgin-NarrowBold',
      'libre-franklin': 'Libre Franklin'
    },
    fontSize: {
      14: 14,
      16: 16,
      18: 18,
      32: 32,
      50: 50,
      56: 56
    },
    spacing: {
      0: 0,
      5: 5,
      7: 7,
      10: 10,
      16: 16,
      20: 20,
      24: 24,
      30: 30,
      50: 50,
      60: 60
    },
    borderRadius: {
      12: 12,
      full: 99999
    },
    extend: {
      borderWidth: {
        // 4: 5
      }
    },
  },
  plugins: [],
}