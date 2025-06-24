/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          dark: '#2563eb',
        },
        secondary: {
          light: '#10b981',
          dark: '#059669',
        },
        background: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        surface: {
          light: '#f8fafc',
          dark: '#334155',
        },
        error: {
          light: '#ef4444',
          dark: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}