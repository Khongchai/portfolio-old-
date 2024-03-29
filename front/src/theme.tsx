import { extendTheme } from "@chakra-ui/react";

const colors = {
  mainGrey: "#545161",
  mainOrange: "#FA9D55",
  grey2: "#636073",
  grey3: "#8E8C8C",
  mainBlack: "#000000",
  black2: "#151515",
  black3: "#2C2B2B",
  backgroundOnBlack: "#bfb4a8",
};

const fonts = {
  body: "Selawik",
  heading: "Selawik",
};

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  colors,
  fonts,
  styles: {
    global: {
      "html, body": {
        background: "black",
        color: "white",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      },
    },
  },
});
export default theme;

/**
 * 
 * 
const colors = {
  mainGrey: "#545161",
  mainOrange: "#FA9D55",
  grey2: "#636073",
  grey3: "#8E8C8C",
  mainBlack: "black",
  black2: "#151515",
  mainGradientGrey:
    "linear-gradient(102.89deg, rgba(92, 88, 113, 0) -1.82%, rgba(76, 72, 95, 0.627352) 21.42%, #423E55 66.2%), #636073",
};
 */
