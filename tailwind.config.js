/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        racing: ['racing-font', 'sans-serif'],
      },
      colors: {
        f1: {
          red: '#E10600',
          black: '#15151E',
          white: '#FFFFFF',
          gray: '#38383F',
          silver: '#C0C0C0',
          gold: '#FFD700',
        },
        gray: {
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
        }
      },
      animation: {
        'speed-line': 'speedLine 0.5s linear infinite',
        'pit-light': 'pitLight 1s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        speedLine: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pitLight: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        counter: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
