// pages/_app.js
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import PrintProvider from "../context/PrintProvider";
import PageProvider from "../context/PageProvider";
import "@kfonts/nanum-square";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
          fonts: {
            body: `'나눔스퀘어', 'Nanum-square', sans-serif`,
          },
        })}
      >
        <PageProvider>
          <PrintProvider>
            <Head>
              <link rel="icon" href="/print/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </PrintProvider>
        </PageProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
