/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#217CA3', 
          secondary: '#408fc1', 
          darkBlue: '#27618a',   
          accent: '#E29930',   
          accentLight: '#db9e34', 
          brown: '#967d5a',    
          dark: '#211F30',      
          grayBlue: '#32384D',  
          slate: '#4e5768',     
          light: '#778ca0',    
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Fuente limpia
      }
    },
  },
  plugins: [],
}