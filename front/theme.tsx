import { extendTheme } from "@chakra-ui/react";

const colors = {
  mainGrey: "#545161",
  mainOrange: "#FA9D55",
  grey2: "#636073",
  mainGradientGrey:
    "linear-gradient(102.89deg, rgba(92, 88, 113, 0) -1.82%, rgba(76, 72, 95, 0.627352) 21.42%, #423E55 66.2%), #636073",
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
        background: "mainGradientGrey",
        color: "white",
      },
    },
  },
});
export default theme;
