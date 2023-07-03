// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

// pages/_app.js
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
        <Component {...pageProps} />
      </ModalProvider>
    </ChakraProvider>
  );
}

export default MyApp;
