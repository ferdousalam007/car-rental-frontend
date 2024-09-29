/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class', // Enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
     container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
       extend: {
        
      colors: {
        'bg-primary': 'var(--color-background-primary)',
        'bg-secondary': 'var(--color-background-secondary)',
        'bg-tertiary': 'var(--color-background-tertiary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'bg-input': 'var(--color-background-input)',
        'bg-button': 'var(--color-mybtn)',  
        'btn-hover': 'var(--color-mybtn-hover)',  
        'border': 'var(--color-border)',
        'primary': 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)',
      },
    },
    },
  },
  plugins: [],
};
