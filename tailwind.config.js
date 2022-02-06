module.exports = {
  content: ['./ui/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins',
      },
      colors: {
        'border-primary': '#52525b',
        'text-primary': '#ffffff',
        'bg-primary': '#18181b',
        'bg-secondary': '#27272a',
      },
      borderRadius: {
        primary: '0.375rem',
      },
    },
  },
  plugins: [],
}
