/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Paleta inspirada en Ringr: violeta/morado principal + acentos
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        ringr: {
          primary: '#6d28d9',
          light: '#8b5cf6',
          dark: '#4c1d95',
          muted: '#a78bfa',
          bg: '#faf5ff',
          card: '#f5f3ff',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #faf5ff 0%, #f5f3ff 40%, #ffffff 100%)',
        'section-alt': 'linear-gradient(180deg, #f5f3ff 0%, #ffffff 100%)',
        'cta-gradient': 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)',
        'card-hover': 'linear-gradient(135deg, rgba(124,58,237,0.04) 0%, rgba(139,92,246,0.06) 100%)',
      },
      boxShadow: {
        'brand-sm': '0 2px 8px -2px rgba(124, 58, 237, 0.2)',
        'brand': '0 4px 14px -2px rgba(124, 58, 237, 0.25), 0 0 0 1px rgba(124, 58, 237, 0.05)',
        'brand-lg': '0 10px 40px -10px rgba(124, 58, 237, 0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(124, 58, 237, 0.06)',
        'card-hover': '0 8px 30px -8px rgba(124, 58, 237, 0.2), 0 0 0 1px rgba(124, 58, 237, 0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
