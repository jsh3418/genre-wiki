export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        taebaek: ['TAEBAEKmilkyway', 'sans-serif'],
        suite: ['SUIT', 'sans-serif'],
      },
      fontWeight: {
        'extra-light': 200,
        light: 300,
        normal: 400,
        medium: 500,
        'semi-bold': 600,
        bold: 700,
        'extra-bold': 800,
        black: 900,
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite',
        appear: 'appear 1s ease-in-out',
      },
      keyframes: {
        appear: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-0.5px)' },
          '20%': { transform: 'translateX(0px)' },
          '30%': { transform: 'translateX(0.5px)' },
          '40%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-0.5px)' },
          '60%': { transform: 'translateX(0px)' },
          '70%': { transform: 'translateX(0.5px)' },
          '80%': { transform: 'translateX(0px)' },
          '90%': { transform: 'translateX(-0.5px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
