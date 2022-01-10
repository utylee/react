//import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider
      theme={extendTheme({
        styles: {
          global: {
            body: {
              bg: "#fcf7ff",
            },
          },
        },
      })}
    >
      <Head>
        {/* <link rel="icon" href="/memo/images/favicon.ico" /> */}
        {/* <link rel="icon" href="/memo/public/favicon2.ico" /> */}
        {/* <link rel="icon" href="./favicon.ico" /> */}
        <link rel="icon" href="/memo/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
