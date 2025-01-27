/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'button-on': '#4caf50',  // Verde para botón activado
        'button-off': '#f44336', // Rojo para botón desactivado
        
      },
      fontFamily: {
        display: ['Gotham', 'sans-serif'],
        body: ['Gotham', 'sans-serif'],
        mono: ['Gotham', 'sans-serif'],
        serif: ['Gotham', 'sans-serif'],
        sans: ['Gotham', 'sans-serif']
      },
      backgroundColor: {
        'main-bg': '#4a5251',
        'main-dark-bg': '#42454a',
        'secondary-dark-bg': '#42454a',
        'content-bg': '#33373e',
        'secondary-content-bg':'#27272a',
        'light-gray': '#616263',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        'display-led': '#ff2e17',
        'page-title-background': '#595b61',
      },
    },
  },
  plugins: [],
}
