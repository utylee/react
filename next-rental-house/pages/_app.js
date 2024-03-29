import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider
      theme={extendTheme({
        styles: {
          global: {
            body: {
              // bg: "#fcf7ff",
              bg: "#2b2a33",
              color: "white",
              // 그라데이션 테스트입다
              // backgroundImage:
              //   "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
            },
          },
        },
      })}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
//
//
// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
