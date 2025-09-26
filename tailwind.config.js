/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#07be8a',
        skyblue: '#79adff',
        lightskyblue: '#9cc2dd',
        dark: '#172023',
      },
      maxWidth: {
        '8xl': '90rem',
        '45p': '45%',
        '1/5': '20%',
        '3/4': '75%',
      },
      fontSize: {
        'xm': '1.125rem',
        '9xl': '6.5rem',
        '40': '2.5rem',
        '52': '3.25rem',
      },
      screens: {
        'xs': '375px',
        'mobile': '520px',
      },
      spacing: {
        '68': '17rem',
        '295': '18.438rem',
      },
      boxShadow: {
        '3xl': '0px 4px 6px -2px #0000000D, 0px 10px 15px -3px #0000001A',
        'auth': '0 20px 25px -5px #0000001a',
        'dark-auth': 'rgba(255, 255, 255, 0.1) 0px 12px 28px 0px, rgba(255, 255, 255, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}