/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        extraLarge: '12rem'
      },
      screens: {
        xs: '320px',
        md:'820px'
      },
      maxWidth:{
        screen:'100vw'
      }
    },
  },
  plugins: [],
};
