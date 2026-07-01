/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f7',
          100: '#d4deec',
          200: '#a9bdd9',
          300: '#7e9cc6',
          400: '#537bb3',
          500: '#1A365D',
          600: '#162E4E',
          700: '#0F2038',
          800: '#0B2240',
          900: '#061222',
          950: '#030912',
        },
        gold: {
          50:  '#fdf8f0',
          100: '#faecd9',
          200: '#f3d5a8',
          300: '#e9ba70',
          400: '#dd9d44',
          500: '#C5A880',
          600: '#b8913e',
          700: '#9a7531',
          800: '#7d5d28',
          900: '#654c21',
          950: '#3b2b11',
        },
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #061222 0%, #0B2240 40%, #162E4E 70%, #1A365D 100%)',
        'gold-gradient': 'linear-gradient(135deg, #E5C090 0%, #C5A880 50%, #A37E55 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(11,34,64,0.05) 0%, rgba(197,168,128,0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(11, 34, 64, 0.12)',
        'card': '0 10px 40px rgba(11, 34, 64, 0.08)',
        'card-hover': '0 20px 60px rgba(11, 34, 64, 0.15)',
        'gold': '0 4px 20px rgba(197, 168, 128, 0.35)',
        'gold-lg': '0 8px 40px rgba(197, 168, 128, 0.4)',
      },
    },
  },
  plugins: [],
};
