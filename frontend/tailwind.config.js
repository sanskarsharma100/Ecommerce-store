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
        dynamic: "clamp(0.5rem, 3vw, 1rem)",
        dynamicHeading: "clamp(1.5rem, 8vw, 3rem)",
        dynamicHeading2: "clamp(1.5rem, 8vw, 2.25rem)",
        dynamicText: "clamp(0.8rem, 3vw, 1rem)",
      },
      backgroundImage: {
        shopBg:
          "url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      },
      colors: {
        background: "#FFFFFF",

        // Primary / Neutrals
        "primary-050": "#F0F4F8",
        "primary-100": "#D9E2EC",
        "primary-200": "#BCCCDC",
        "primary-300": "#9FB3C8",
        "primary-400": "#829AB1",
        "primary-500": "#627D98",
        "primary-600": "#486581",
        "primary-700": "#334E68",
        "primary-800": "#243B53",
        "primary-900": "#102A43",

        // Supporting
        "light-blue-vivid-050": "#E3F8FF",
        "light-blue-vivid-100": "#B3ECFF",
        "light-blue-vivid-200": "#81DEFD",
        "light-blue-vivid-300": "#5ED0FA",
        "light-blue-vivid-400": "#40C3F7",
        "light-blue-vivid-500": "#2BB0ED",
        "light-blue-vivid-600": "#1992D4",
        "light-blue-vivid-700": "#127FBF",
        "light-blue-vivid-800": "#0B69A3",
        "light-blue-vivid-900": "#035388",

        "cyan-050": "#E0FCFF",
        "cyan-100": "#BEF8FD",
        "cyan-200": "#87EAF2",
        "cyan-300": "#54D1DB",
        "cyan-400": "#38BEC9",
        "cyan-500": "#2CB1BC",
        "cyan-600": "#14919B",
        "cyan-700": "#0E7C86",
        "cyan-800": "#0A6C74",
        "cyan-900": "#044E54",

        "pink-vivid-050": "#FFE3EC",
        "pink-vivid-100": "#FFB8D2",
        "pink-vivid-200": "#FF8CBA",
        "pink-vivid-300": "#F364A2",
        "pink-vivid-400": "#E8368F",
        "pink-vivid-500": "#DA127D",
        "pink-vivid-600": "#BC0A6F",
        "pink-vivid-700": "#A30664",
        "pink-vivid-800": "#870557",
        "pink-vivid-900": "#620042",

        "red-vivid-050": "#FFE3E3",
        "red-vivid-100": "#FFBDBD",
        "red-vivid-200": "#FF9B9B",
        "red-vivid-300": "#F86A6A",
        "red-vivid-400": "#EF4E4E",
        "red-vivid-500": "#E12D39",
        "red-vivid-600": "#CF1124",
        "red-vivid-700": "#AB091E",
        "red-vivid-800": "#8A041A",
        "red-vivid-900": "#610316",

        "yellow-vivid-050": "#FFFBEA",
        "yellow-vivid-100": "#FFF3C4",
        "yellow-vivid-200": "#FCE588",
        "yellow-vivid-300": "#FADB5F",
        "yellow-vivid-400": "#F7C948",
        "yellow-vivid-500": "#F0B429",
        "yellow-vivid-600": "#DE911D",
        "yellow-vivid-700": "#CB6E17",
        "yellow-vivid-800": "#B44D12",
        "yellow-vivid-900": "#8D2B0B",

        "teal-050": "#EFFCF6",
        "teal-100": "#C6F7E2",
        "teal-200": "#8EEDC7",
        "teal-300": "#65D6AD",
        "teal-400": "#3EBD93",
        "teal-500": "#27AB83",
        "teal-600": "#199473",
        "teal-700": "#147D64",
        "teal-800": "#0C6B58",
        "teal-900": "#014D40",
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
