/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        xl: '1200px',
      },
    },
    extend: {
      colors: {
        bgStart: '#675FEC',
        bgEnd: '#413E5C',
        primaryText: 'rgba(234, 234, 240, 0.9)',
        secondaryText: 'rgba(161, 161, 181, 0.7)',
        glass: 'rgba(255,255,255,0.05)',
        accent: '#FFD600',
        warning: '#FFD600',
        ink: '#121212',
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glass: '0 20px 60px rgba(10, 10, 20, 0.22)',
        card: '0 24px 80px rgba(12, 12, 20, 0.2)',
        glow: '0 0 80px rgba(139, 124, 255, 0.2)',
      },
      backdropBlur: {
        glass: '20px',
      },
      backgroundImage: {
        hero: 'linear-gradient(135deg, #675FEC 0%, #413E5C 100%)',
      },
      letterSpacing: {
        widePlus: '0.18em',
      },
    },
  },
  plugins: [],
}
