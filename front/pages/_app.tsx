import * as React from "react";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import theme from "../theme";
import fonts from "../public/fonts/font-face";
import { Global } from "@emotion/react";
import { client } from "../utils/createUrqlClient";
import { Provider } from "urql";
import { Navbar } from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Navbar />
      <Provider value={client}>
        <ChakraProvider theme={theme}>
          <Global styles={fonts} />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
