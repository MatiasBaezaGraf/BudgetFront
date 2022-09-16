/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,png}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        'l-md': '0px -1px 5px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        'display': ['Roboto Mono', 'monospace'],
        'title': ['Poppins', 'sans-serif'],
      },
      colors: {
        stone: {
          50: '#242424'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
