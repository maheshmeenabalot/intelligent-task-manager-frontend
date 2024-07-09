/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'text': '#240750',     // Dark Purple
        'secondary': '#344C64',   // Navy Blue
        'accent': '#577B8D',      // Slate Blue
        'light': '#1679AB',       // Pale Pink
        'primary': '#00224D',        // Navy Blue
        'background': '#FFFFFF',  // White
        'button-hover': '#E0E0E0', // Gray for button hover
      },
    },
  },
  plugins: [],
}
