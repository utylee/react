import { VStack, HStack, Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PrintInput from "../../component/PrintInput";
import PrintItem from "../../component/PrintItem";
import Link from "next/link";
import usePrint from "../../context/usePrint";
import { useRouter } from "next/router";
import usePage from "../../context/usePage";
import PageInput from "../../component/PageInput";
import PagePrint from "../../component/PagePrint";

// SSR, SSG 용 함수입니다
export async function getStaticProps() {
  // const res = await fetch(`http://localhost/memo/api/listjs`);
  // 갑자기 npm run build에서static page 생성중 에러가 나서 변경해보았습니다
  const res = await fetch(`http://192.168.1.203/print/api/listjs`);
  const prints = await res.json();
  return {
    props: {
      prints,
    },
    // 주기를 20초로 하긴했지만, next export에서는 의미없습니다
    // next build 후 next start로 node js 서버가 돌아갈때나 의미있습니다
    revalidate: 20,
  };
}

const Home = ({ prints }) => {
  const [printList, setPrintList] = useState(prints);

  const { printCur, setPrintCur } = usePrint();
  const { pageCur, setPageCur } = usePage();

  const router = useRouter();

  // printCur 기본값들을 세팅해줍니다
  useEffect(() => {
    // document.body.style.backgroundColor = "black";
    const getPrints = async () => {
      console.log("getPrints rendered");
      const res = await fetch("/print/api/listjs");
      // const res = await fetch(`/api/listjs`);
      const prints = await res.json();
      // setPrintList(prints);
      prints = prints.reverse();
      console.log("index::getPrints::prints is::");
      console.log(prints);
      setPrintList(prints);
      // setPrintList(prints.reverse());
      // console.log(memoList);
    };
    getPrints();

    const initValues = {
      text: "",
      time: "",
      font_size: 10,
      uid: 0,
      clone: 3,
    };
    setPrintCur(initValues);

    setPageCur("PageInput");
  }, []);
  // }, [router.query.name]);

  useEffect(() => {
    if (pageCur == "PagePrint") {
      window.print();
    }
  }, [pageCur]);

  const contentPage = () => {
    if (pageCur == "PageInput") {
      console.log("index.js:: if PageInput");

      document.body.style.backgroundColor = "#2b2a33";
      return <PageInput prints={printList} />;
    } else if (pageCur == "PagePrint") {
      console.log("index.js:: if PagePrintt");
      document.body.style.backgroundColor = "white";
      return <PagePrint />;
    }
  };

  // const getPrints = async () => {
  //   console.log("getPrints rendered");
  //   const res = await fetch("/print/api/listjs");
  //   // const res = await fetch(`/api/listjs`);
  //   const prints = await res.json();
  //   // setPrintList(prints);
  //   prints = prints.reverse();
  //   console.log("index::getPrints::prints is::");
  //   console.log(prints);
  //   setPrintList(prints);
  //   // setPrintList(prints.reverse());
  //   // console.log(memoList);

  //   return prints;
  // };

  return (
    <>
      {contentPage()}

      {/* <VStack color="white"> */}
      {/*   {/1* <Link href="http://utylee.duckdns.org/print/test/test">hahahah</Link> *1/} */}
      {/*   {/1* <Link href="/print/test/test">hahahah</Link> *1/} */}
      {/*   {/1* <Link href="http://naver.com">hahahah</Link> *1/} */}
      {/*   <PrintInput getPrints={getPrints} /> */}
      {/*   {/1* 메모 항목들 *1/} */}
      {/*   {/1* <VStack *1/} */}
      {/*   {/1*   pt={2} *1/} */}
      {/*   {/1*   justifyContent="center" *1/} */}
      {/*   {/1*   alignItems="center" *1/} */}
      {/*   {/1*   flexDirection="column-reverse" *1/} */}
      {/*   {/1* > *1/} */}
      {/*   {/1* bgColor="red" *1/} */}
      {/*   <Flex */}
      {/*     w={["35em", "65em"]} */}
      {/*     grow="revert" */}
      {/*     flexWrap="wrap" */}
      {/*     justifyContent="center" */}
      {/*     gap={5} */}
      {/*     rowGap={0} */}
      {/*   > */}
      {/*     {/1* spacing={2} *1/} */}
      {/*     {/1* w={["10px", "10px"]} *1/} */}
      {/*     {/1* maxW='10px' *1/} */}
      {/*     {/1* maxW={['10em', '10em']} *1/} */}
      {/*     {/1* {console.log(Date.now())} *1/} */}
      {/*     {/1* {console.log("all page item box part")} *1/} */}
      {/*     {/1* mb={4} *1/} */}
      {/*     {/1* {printList.reverse().map((print) => ( *1/} */}
      {/*     {printList.map((print) => ( */}
      {/*       <Box key={print.uid}> */}
      {/*         <PrintItem */}
      {/*           as={Flex} */}
      {/*           key={print.uid} */}
      {/*           print={print} */}
      {/*           getPrints={getPrints} */}
      {/*         /> */}
      {/*       </Box> */}
      {/*     ))} */}
      {/*     {/1* <Box key={memo.time} mb={4}> *1/} */}
      {/*     {/1* <List spacing={2}> *1/} */}
      {/*     {/1*   <ListItem> *1/} */}
      {/*     {/1*     {memoList.map((memo) => ( *1/} */}
      {/*     {/1*       <MemoItem key={memo.time} memo={memo} getMemos={getMemos} /> *1/} */}
      {/*     {/1*     ))} *1/} */}
      {/*     {/1*   </ListItem> *1/} */}
      {/*     {/1*   {/2* <ListItem> *2/} *1/} */}
      {/*     {/1*   {/2*   <MemoItem msg="식초" /> *2/} *1/} */}
      {/*     {/1*   {/2* </ListItem> *2/} *1/} */}
      {/*     {/1* </List> *1/} */}
      {/*     {/1* </VStack> *1/} */}
      {/*   </Flex> */}
      {/* </VStack> */}
    </>
  );
};

export default Home;
