/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE8DF',
          light: '#FAF8F4',
        },
        taupe: {
          DEFAULT: '#9E9484',
          dark: '#8A806F',
          light: '#B5AD9F',
        },
        'warm-charcoal': '#3D3632',
        'warm-gray': '#5C534D',
        'warm-muted': '#8A7E76',
        'warm-border': '#E8E2D9',
        'warm-input': '#D9D3CA',
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D4B87A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
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
