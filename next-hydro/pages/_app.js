import "../scripts/wdyr";
// import '../styles/globals.css'
// import '@/modules/core/wdyr/wdyr';
import Head from "next/head";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ModalProvider from "../context/ModalProvider";
import PlantersProvider from "../context/PlantersProvider";
import PlanterCurProvider from "../context/PlanterCurProvider";

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

              // ios safari 에서의 클릭시 깜빡임을 없애는 문구입니다
              // "-webkit-tap-highlight-color": "transparent",

              // 그라데이션 테스트입다
              // backgroundImage:
              //   "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)",
            },
          },
        },
      })}
    >
      <ModalProvider>
        <PlantersProvider>
          <PlanterCurProvider>
            <Head>
              <link rel="icon" href="/hydro/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </PlanterCurProvider>
        </PlantersProvider>
      </ModalProvider>
    </ChakraProvider>
  );
}

export default MyApp;
