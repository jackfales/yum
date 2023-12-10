/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          100: '#f9f9f7',
          200: '#f4f3ef',
          300: '#efeee8',
          400: '#eae8e0',
          500: '#e5e3d9',
        },
      },
    },
  },
  plugins: [],
}

