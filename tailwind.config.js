// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B263B', // Deep navy for trust
        secondary: '#D4AF37', // Gold for luxury
        background: '#F7F6F3', // Soft background
        error: '#7B2D26', // Error red
        text: '#333333', // Body text
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'], // Elegant headings
        body: ['Inter', 'sans-serif'], // Clean body font
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        subtle: '0 2px 6px rgba(27, 38, 59, 0.15)',
      },
    },
  },
  plugins: [],
}
