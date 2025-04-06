/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./content/**/*.md", "./content/**/*.html", "./layouts/**/*.html"],
  
  theme: {
    extend: {
      colors: {
        mycolor: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',

        DEFAULT: '#1F2937',
        },
        myblack: '#111827',
        mywhite: '#ffffff',
        myred: '#ff2222',
      }, 
    },
  },
  plugins: [],
}