const config = {
  plugins: {"@tailwindcss/postcss":{
    darkMode:"class",
    theme: {
      extend: {
        fontFamily: {
          sans: ["var(--font-poppins)", "sans-serif"], // For Poppins integration
        },
      }
    }
  }},
};

export default config;
