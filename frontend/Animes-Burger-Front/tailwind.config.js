import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Atop': ['Atop', ...defaultTheme.fontFamily.sans],
        'Adlam': ['ADLaM', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}

