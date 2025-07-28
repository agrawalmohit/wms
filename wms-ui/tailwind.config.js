/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Simple, readable colors for rural users
        'primary': '#065f46', // Dark green
        'secondary': '#059669', // Medium green
        'accent': '#10b981', // Light green
        'warning': '#f59e0b', // Amber
        'danger': '#dc2626', // Red
      },
      fontSize: {
        // Larger text for easier reading
        'xs': '14px',
        'sm': '16px',
        'base': '18px',
        'lg': '20px',
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
