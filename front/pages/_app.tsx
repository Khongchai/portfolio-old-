import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import fonts from "../public/fonts/font-face";
import { Global } from "@emotion/react";
import { client } from "../utils/createUrqlClient";
import { Provider } from "urql";
import { Navbar } from "../components/Navbar/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: any) {
  const router = useRouter;

  return (
    <>
      <Provider value={client}>
        <ChakraProvider theme={theme}>
          {router().pathname === "/" ? null : <Navbar />}
          <Global styles={fonts} />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
