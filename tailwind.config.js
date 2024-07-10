/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}' // Make sure your file structure matches these patterns
  ],
  theme: {
    extend: {
      colors: {
        error: '#ff3333' // Custom color named 'error'
      }
    }
  },
  plugins: []
};
