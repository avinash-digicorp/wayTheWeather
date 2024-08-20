/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#189AB4',
        'primary-200': '#05445E'
        // 'primary-300': colors.primary3,
        // 'primary-400': colors.primary4,
        // 'primary-500': colors.primary5,
        // 'primary-600': colors.primary6,
        // 'primary-700': colors.primary7,
        // 'primary-800': colors.primary8,
        // 'primary-900': colors.primary9
      },
      fontFamily: {
        bold: ['Poppins-Bold'],
        'extra-bold': ['Poppins-ExtraBold'],
        'extra-light': ['Poppins-ExtraLight'],
        light: ['Poppins-Light'],
        medium: ['Poppins-Medium'],
        regular: ['Poppins-Regular'],
        'semi-bold': ['Poppins-SemiBold']
      }
    }
  },
  plugins: []
}
