/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        system: {
          bg: 'var(--system-bg)',
          'bg-secondary': 'var(--system-bg-secondary)',
          'bg-tertiary': 'var(--system-bg-tertiary)',
          blue: 'var(--system-blue)',
          green: 'var(--system-green)',
          red: 'var(--system-red)',
          gray: 'var(--system-gray)',
          gray2: 'var(--system-gray2)',
          gray3: 'var(--system-gray3)',
        }
      }
    },
  },
  plugins: [],
}
