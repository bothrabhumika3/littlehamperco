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
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EBDDC9',
          400: '#DEC8AE',
        },
        brand: {
          50: '#FDF7F5',
          100: '#FAECE7',
          200: '#F5D7CD',
          300: '#EBB9A8',
          400: '#DC937C',
          500: '#C86D51', // Warm Terracotta primary
          600: '#B2563A',
          700: '#94442D',
          800: '#7A3826',
          900: '#643122',
        },
        gold: {
          100: '#FDF8EC',
          200: '#F7EBCB',
          300: '#ECD59C',
          400: '#DCBC6E',
          500: '#C5A880', // Champagne Gold
          600: '#A8895E',
          700: '#866943',
        },
        sage: {
          50: '#F6F8F5',
          100: '#EAF0E7',
          200: '#D5E0CF',
          300: '#B6C8AD',
          400: '#93AC87',
          500: '#6F8C62', // Fresh herb/botanical
          600: '#566E4C',
          700: '#43563C',
        },
        charcoal: {
          800: '#272B30',
          900: '#181C20',
          950: '#0E1113',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(24, 28, 32, 0.05)',
        'card': '0 10px 30px -4px rgba(24, 28, 32, 0.08)',
        'hover': '0 20px 35px -6px rgba(24, 28, 32, 0.12)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
