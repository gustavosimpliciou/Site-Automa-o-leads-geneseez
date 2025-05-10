/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neonBlue: '#0cf',
        neonPurple: '#b45afb',
        neonPink: '#ff47d2',
        neonGreen: '#0cfa83',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 15px var(--neon-blue), 0 0 30px rgba(12, 255, 170, 0.3)',
      },
    },
  },
  plugins: [],
};