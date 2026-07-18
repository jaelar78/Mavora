/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#FAF8F4', dark: '#F5F0E8' },
        gold: { DEFAULT: '#C4A265', light: '#D4B87A', dark: '#A8894F' },
        brown: { DEFAULT: '#2C2420', light: '#3D3632', muted: '#8A7E76', border: '#E8E2D9' },
        'warm-gray': '#5C534D',
        'warm-muted': '#8A7E76',
        'warm-border': '#E8E2D9',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 1px 3px rgba(61, 54, 50, 0.04), 0 8px 24px rgba(61, 54, 50, 0.06)',
        'premium-hover': '0 2px 8px rgba(61, 54, 50, 0.06), 0 16px 48px rgba(61, 54, 50, 0.08)',
        'elevated': '0 4px 6px -1px rgba(61, 54, 50, 0.05), 0 20px 40px -4px rgba(61, 54, 50, 0.08)',
      },
    },
  },
  plugins: [],
};
