import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import fonts from "../../public/fonts/font-face";
import { Global } from "@emotion/react";
import { client } from "../utils/createUrqlClient";
import { Provider } from "urql";
import { Navbar } from "../components/Navbar/Navbar";
import AllContextProvider from "../globalContexts/allContextProvider";
import "../css/timeline-extra-stylings.css";
import "../css/animations.css";
import "../css/forms.css";
import "../css/keyframes.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <AllContextProvider>
      <Provider value={client}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Global styles={fonts} />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </AllContextProvider>
  );
}

export default MyApp;
