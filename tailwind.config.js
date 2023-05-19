export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        taebaek: ['TAEBAEKmilkyway', 'sans-serif'],
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite',
      },
      keyframes: {
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
