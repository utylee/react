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
              // bg: "#fcf7ff",
              bg: "#2b2a33", // 파폭 다크모드 바탕 색깔을 사용해봤습니다
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
