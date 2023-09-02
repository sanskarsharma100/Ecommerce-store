/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
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
      gridTemplateColumns: {
        "fill-8": "repeat(auto-fill, minmax(8rem, auto))",
      },
      backgroundImage: {
        blackGradient:
          "linear-gradient(-45deg, #000000, #080808, #101010, #151515, #1a1a1a);",
        // shopBg:
        //   "linear-gradient( rgba(134, 239, 172,0.6), rgba(134, 239, 172,0.6) ),url('./src/assets/shopping-bg.jpg')",
        shopBg:
          "linear-gradient( rgba(255, 255, 255,0.5), rgba(255, 255, 255,0.5) ),url('../public/shopping-bg.jpg')",
      },
      dropShadow: {
        "4xl": [
          "0 0 5px rgb(255, 0, 0)",
          "0 0 5px rgb(255, 0, 0)",
          "0 0 5px rgb(255, 0, 0)",
        ],
        "3xl": "0 2px 5px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        navbar: "0px 3px 5px 2px rgba(0,0,0,0.2)",
        custom: "6px 6px 0px 0px rgba(0,0,0,0.75)",
        cardShadow: "0px 0px 500px 50px rgba(0,0,0,0.9)",
        accentBox: "0px 0px 2px 1px hsl(338, 80%, 65%, 0.5)",
      },
      colors: {
        textColor: "hsl(0, 0%, 0%)",
        grayCustom: "hsl(0, 0%, 50%)",
        grayDarker: "hsl(0, 0%, 20%)",
        light: "hsl(0, 0%, 90%)",
        background: "hsl(0, 0%, 100%)",
        "background-2": "hsl(0, 0%, 10%)",
        "background-3": "rgb(234, 237, 237)",
        primary: "hsl(0, 0%, 100%)",
        secondary: "hsl(0, 0%, 0%)",
        accent: "hsl(338, 80%, 65%)",
        linkColor: "hsl(222, 100%, 58%)",
        success: "hsl(120, 100%, 25%)",
        warning: "hsl(15, 100%, 40%)",
        semiDarkOverlay: "rgba(0, 0, 0, 0.4)",
        semiLightOverlay: "rgba(255, 255, 255, 0.4)",
        grayLighter: "hsl(0, 0%, 80%)",
      },
      borderWidth: {
        3: "3px",
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
  plugins: [require("@tailwindcss/forms")],
};
