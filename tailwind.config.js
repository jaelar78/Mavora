/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF9F7',
          dark: '#F5F3EF',
        },
        taupe: '#9E9484',
        gold: '#C9A96E',
        'warm-charcoal': '#3D3632',
        'warm-gray': '#6B6560',
        'warm-muted': '#8A7E76',
        'warm-border': '#E8E2D9',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 1px 3px rgba(61,54,50,0.05), 0 4px 12px rgba(61,54,50,0.04)',
        'premium-hover': '0 4px 6px -1px rgba(61,54,50,0.05), 0 20px 40px -4px rgba(61,54,50,0.08)',
        elevated: '0 10px 40px rgba(61,54,50,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}