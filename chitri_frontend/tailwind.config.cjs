    // chitri_frontend/tailwind.config.cjs
    /** @type {import('tailwindcss').Config} */
    // IMPORTANT: This file MUST be named .cjs
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'black': '#000000',
            'gray-light': '#D1D0D0',
            'taupe': '#988686',
            'deep-taupe': '#5C4E4E',
            'light-green': '#fcf802',
          },
          fontFamily: {
            serif: ['"Playfair Display"', 'Georgia', 'serif'],
            sans: ['Inter', 'sans-serif'],
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
            slideInLeft: {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(0)' },
            },
            slideOutLeft: {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-100%)' },
            },
            pulseShadow: {
              '0%, 100%': { boxShadow: '0 0 10px rgba(152, 134, 134, 0.5)' },
              '50%': { boxShadow: '0 0 20px rgba(152, 134, 134, 0.8)' },
            }
          },
          animation: {
            'fade-in': 'fadeIn 0.6s ease-out forwards',
            'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
            'slide-out-left': 'slideOutLeft 0.3s ease-out forwards',
            'pulse-shadow': 'pulseShadow 2s infinite ease-in-out',
          },
        },
      },
      plugins: [],
    }
    