import { extendTheme } from "@chakra-ui/react";

const colors = {
  mainGrey: "#545161",
  mainOrange: "#FA9D55",
  grey2: "#636073",
};

const fonts = {
  body: "Selawik",
  heading: "Selawik",
};

const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: {
      "html, body": {
        backgroundColor: "mainGrey",
        color: "white",
      },
    },
  },
});
export default theme;
