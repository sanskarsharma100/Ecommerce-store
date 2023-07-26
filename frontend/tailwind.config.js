/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontSize: {
        dynamic: "clamp(1rem, 5vw, 1.115rem)",
        dynamicHeading: "clamp(1.5rem, 8vw, 3rem)",
        dynamicHeading2: "clamp(1.5rem, 8vw, 2.25rem)",
        dynamicText: "clamp(0.8rem, 3vw, 1rem)",
      },
      backgroundImage: {
        blackGradient:
          "linear-gradient(-45deg, #000000, #080808, #101010, #151515, #1a1a1a);",
        // shopBg:
        //   "linear-gradient( rgba(134, 239, 172,0.6), rgba(134, 239, 172,0.6) ),url('./src/assets/shopping-bg.jpg')",
        shopBg:
          "linear-gradient( rgba(134, 239, 172,0.6), rgba(134, 239, 172,0.6) ),url('../public/shopping-bg.jpg')",
      },
      dropShadow: {
        "4xl": [
          "0 0 5px rgb(255, 0, 0)",
          "0 0 5px rgb(255, 0, 0)",
          "0 0 5px rgb(255, 0, 0)",
        ],
      },
      boxShadow: {
        custom: "6px 6px 0px 0px rgba(0,0,0,0.75)",
        cardShadow: "0px 0px 35px 5px rgba(0,0,0,0.9)",
      },
      colors: {
        textColor: "#050505",
        background: "#eefcde",
        primary: "#6ec011",
        secondary: "#e7fbd0",
        accent: "#87eb14",
        warning: "#cc3300",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
