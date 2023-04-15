import variable from "./variables";

export default {
  palette: {
    black: "#000",
    white: "#fff",
    themePrimary: "#1E96FC",
    themeLighterAlt: "#01060a",
    themeLighter: "#051828",
    themeLight: "#092d4c",
    themeTertiary: "#125997",
    themeSecondary: "#E91E63",
    themeDarkAlt: "#359ffd",
    themeDark: "#54aefd",
    themeDarker: "#81c3fe",
    neutralLighterAlt: "#eeeeee",
    neutralLighter: "#eaeaea",
    neutralLight: "#e1e1e1",
    neutralQuaternaryAlt: "#d1d1d1",
    neutralQuaternary: "#181818",
    neutralTertiaryAlt: "#c0c0c0",
    /*
            textfield underlined color
        */
    neutralTertiary: "#0a0a0a",
    neutralSecondary: "#0e0e0e",
    neutralPrimaryAlt: "#111111",
    neutralPrimary: "#1e1e1e",
    neutralDark: "#181818",
  },
  semanticColors: {
    bodyText: variable.grey900,
    bodyBackground: variable.grey100,
    errorText: variable.error,
  },
  defaultFontStyle: {
    fontFamily: variable.fontFamily,
    WebkitFontSmoothing: "subpixel-antialiased",
    MozOsxFontSmoothing: "subpixel-antialiased",
  },
  fonts: {
    medium: {
      fontSize: variable.fontSizeMedium,
      color: variable.grey900,
    },
  },
  components: {},
  fontSizes:{
    xs:'12px'
  },
  spacing:{
    sm:16,
    md:32
  }
};
