module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // 'tablet': '640px',
      // // => @media (min-width: 640px) { ... }
      //
      // 'laptop': '1024px',
      // // => @media (min-width: 1024px) { ... }
      //
      // 'desktop': '1280px',
      // // => @media (min-width: 1280px) { ... }
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },

      // => @media (max-width: 639px) { ... }
      // "2xl": { max: "1535px" },
      // // => @media (max-width: 1535px) { ... }

      // xl: { min: "1280px" },
      // // => @media (max-width: 1279px) { ... }

      // lg: { min: "768px", max: "1279px" },
      // // => @media (max-width: 1023px) { ... }

      // md: { min: "481px", max: "767px" },
      // // => @media (max-width: 767px) { ... }

      // sm: { max: "480px" },
      // // => @media (max-width: 639px) { ... }

      // // sm: "480px",
      // // md: "768px",
      // // lg: "1280px",
    },
    extend: {
      boxShadow: {
        headerShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        myBlue: "#3B64F4",
        myGray: "#C1C1C1",
        myBlack: "#030303",
      },
      
      spacing: {
        mobil: "320px",
        tablet: "640px",
        desktop: "1280px",
        "1px": "1px",
        "2px": "2px",
        "4px": "4px",
        "8px": "8px",
        "12px": "12px",
        "16px": "16px",
        "20px": "20px",
        "24px": "24px",
        "28px": "28px",
        "32px": "32px",
        "36px": "36px",
        "40px": "40px",
        "48px": "48px",
        "56px": "56px",
        "64px": "64px",
        "72px": "72px",
        "80px": "80px",
        "88px": "88px",
        "96px": "96px",
        "104px": "104px",
        "112px": "112px",
        "120px": "120px",
        "136px": "136px",
        "152px": "152px",
        "168px": "168px",
        "184px": "184px",
        "200px": "200px",
        "216px": "216px",
        "232px": "232px",
        "248px": "248px",
        "264px": "264px",
        "280px": "280px",
        "296px": "296px",
        "312px": "312px",
        "328px": "328px",
        "344px": "344px",
        "360px": "360px",
        "376px": "376px",
        "392px": "392px",
        "408px": "408px",
        "424px": "424px",
        "440px": "440px",
        "456px": "456px",
        "472px": "472px",
        "488px": "488px",
        "504px": "504px",
        "520px": "520px",
        "536px": "536px",
        "552px": "552px",
        "568px": "568px",
        "584px": "584px",
        "600px": "600px",
        "616px": "616px",
        "632px": "632px",
        "648px": "648px",
        "664px": "664px",
        "680px": "680px",
        "696px": "696px",
        "712px": "712px",
        "728px": "728px",
        "744px": "744px",
        "760px": "760px",
        "776px": "776px",
        "792px": "792px",
        "808px": "808px",
        "824px": "824px",
        "840px": "840px",
        "856px": "856px",
        "872px": "872px",
        "888px": "888px",
        "904px": "904px",
        "920px": "920px",
        "936px": "936px",
        "952px": "952px",
        "968px": "968px",
        "984px": "984px",
        "1000px": "1000px",
        "1016px": "1016px",
        "1032px": "1032px",
        "1048px": "1048px",
        "1064px": "1064px",
        "1080px": "1080px",
        "1096px": "1096px",
        "1112px": "1112px",
        "1128px": "1128px",
        "1144px": "1144px",
        "1160px": "1160px",
        "1176px": "1176px",
        "1192px": "1192px",
        "1208px": "1208px",
      },

      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
