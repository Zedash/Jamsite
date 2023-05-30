const { colors } = require(`tailwindcss/defaultTheme`)

module.exports = {
  mode: 'jit', // see https://tailwindcss.com/docs/just-in-time-mode
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or "media" or "class"
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      blue: {
        DEFAULT: '#658da7',
        dark: '#2e4757',
      },
      red: {
        alert: '#ce5353',
        DEFAULT: '#7e1930',
      },
      gray: {
        dark: '#2e2e2e',
        DEFAULT: '#6a6a6a',
        light: '#c7cace',
      },
      grayBlue: {
        dark: '#252b31',
        DEFAULT: '#3c4650',
        light: '#8896a3',
        lightest: '#f0f2f4',
      },
      yellow: {
        alert: '#e5bc35',
      },
    },
    extend: {
      container: {
        lg: 'width:100%',
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '2rem',
        },
      },
      minHeight: {
        30: '7.5rem',
        112: '28rem',
      },
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
      sherif: ['Merriweather', 'sherif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    letterSpacing: {
      50: '.05em',
      20: '.02em',
      100: '.1',
      200: '.2',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
