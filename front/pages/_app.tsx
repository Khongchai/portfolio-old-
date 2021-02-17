import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import fonts from "../public/fonts/font-face";
import { Global } from "@emotion/react";
import { client } from "../utils/createUrqlClient";
import { Provider } from "urql";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Global styles={fonts} />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
