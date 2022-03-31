module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbar: "#101010",
        body: "#292929",
        card: "#171717",
        "nav-link": "#D0CBCB",
        filters: "#F2F2F2",
        "filter-dropdown": "#232323",
        "filter-div": "#131313",
        "card-text-gray": "#CFCFCF",
        "card-city": "rgba(0, 0, 0, 0.56)",
      },
      keyframes: {
        opacity: {
          "0%, 100%": { opacity: 0.2 },
        },
      },
    },
  },
  plugins: [],
};
