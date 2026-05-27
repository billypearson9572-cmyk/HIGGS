/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        felt: {
          50: '#eef6f1',
          100: '#d6ebe0',
          200: '#aed7c1',
          300: '#7fbd9d',
          400: '#509b78',
          500: '#357d5e',
          600: '#266049',
          700: '#1e4c3a',
          800: '#193d2f',
          900: '#143226',
          950: '#0a1d16',
        },
        clay: {
          50: '#fbf6f1',
          100: '#f3e7da',
          200: '#e6ccb3',
          300: '#d6ab84',
          400: '#c88a5c',
          500: '#bd7140',
          600: '#a85a35',
          700: '#8b452e',
          800: '#71392b',
          900: '#5d3026',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        readable: ['"Atkinson Hyperlegible"', 'Lexend', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
