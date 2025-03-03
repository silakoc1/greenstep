/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./router/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppinsThin: ['Poppins_100Thin'],
        poppinsLight: ['Poppins_300Light'],
        poppinsRegular: ['Poppins_400Regular'],
        poppinsMedium: ['Poppins_500Medium'],
        poppinsSemiBold: ['Poppins_600SemiBold'],
        poppinsBold: ['Poppins_700Bold'],
        poppinsExtraBold: ['Poppins_800ExtraBold'],
      },
    },
},
  plugins: [],
};


