// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

// pages/_app.js
import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ModalProvider from "../contexts/ModalProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider
      theme={extendTheme({
        styles: {
          global: {
            body: {
              // bg: "#2b2a33",
              bg: "#2b2a33",
              color: "white",
            },
          },
        },
      })}
    >
      <ModalProvider>
        <Head>
          {/* <link rel="icon" href="/memo/images/favicon.ico" /> */}
          {/* <link rel="icon" href="/memo/public/favicon2.ico" /> */}
          {/* <link rel="icon" href="./favicon.ico" /> */}
          <link rel="icon" href="/youtube/favicon.ico" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <Component {...pageProps} />
      </ModalProvider>
    </ChakraProvider>
  );
}

export default MyApp;
