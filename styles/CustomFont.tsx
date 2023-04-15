import { Global } from "@mantine/core";
//import RobotoFlex from "../public/assets/font/Roboto/RobotoFlex-VariableFont.ttf";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Poppins Bold",
            src: `url('/assets/font/Poppins/Poppins-Bold.ttf') format("woff2")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Poppins Medium",
            src: `url('/assets/font/Poppins/Poppins-Medium.ttf') format("woff2")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Roboto Flex Medium",
            src: `url('/assets/font/Roboto/RobotoFlex-VariableFont.ttf') format("woff2")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Roboto Flex",
            src: `url('/assets/font/Roboto/RobotoFlex-VariableFont.ttf') format("woff2")`,
            //fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Roboto Flex Light",
            src: `url('/assets/font/Roboto/RobotoFlex-VariableFont.ttf') format("woff2")`,
            fontWeight: 300,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Roboto Flex Bold",
            src: `url('/assets/font/Roboto/RobotoFlex-VariableFont.ttf') format("woff2")`,
            fontWeight: 700,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "Roboto Flex SemiBold",
            src: `url('/assets/font/Roboto/RobotoFlex-VariableFont.ttf') format("woff2")`,
            fontWeight: 600,
            fontStyle: "normal",
            fontDisplay: "block",
          },
        },
        {
          "@font-face": {
            fontFamily: "Roboto Flex Italic",
            src: `url('/assets/font/Roboto/RobotoFlex-VariableFont.ttf') format("woff2")`,
            fontStyle: "italic",
            fontDisplay: "block",
          },
        },
      ]}
    />
  );
}
