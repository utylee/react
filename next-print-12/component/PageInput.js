import React, { useEffect, useState } from "react";
import { VStack, Flex, Box } from "@chakra-ui/layout";
import usePrint from "../context/usePrint";
import PrintInput from "./PrintInput";
import PrintItem from "./PrintItem";

// // SSR, SSG 용 함수입니다
// export async function getStaticProps() {
//   // const res = await fetch(`http://localhost/memo/api/listjs`);
//   // 갑자기 npm run build에서static page 생성중 에러가 나서 변경해보았습니다
//   const res = await fetch(`http://192.168.1.203/print/api/listjs`);
//   const prints = await res.json();
//   return {
//     props: {
//       prints,
//     },
//     // 주기를 20초로 하긴했지만, next export에서는 의미없습니다
//     // next build 후 next start로 node js 서버가 돌아갈때나 의미있습니다
//     revalidate: 20,
//   };
// }

const PageInput = ({ prints }) => {
  const [printList, setPrintList] = useState(prints);
  // const [printList, setPrintList] = useState(prints);
  const { printCur, setPrintCur } = usePrint();
  // printCur 기본값들을 세팅해줍니다

  useEffect(() => {
    // console.log("index.js::router.query.name::");
    // console.log(router.query.name);
    const getPrints = async () => {
      console.log("PageInput::getPrints rendered");
      const res = await fetch("/print/api/listjs");
      // const res = await fetch(`/api/listjs`);
      const prints = await res.json();
      // setPrintList(prints);
      prints = prints.reverse();
      console.log("PageInput::getPrints::prints is::");
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
  }, []);
  // }, [router.query.name]);

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

    return prints;
  };

  return (
    <VStack color="white">
      {/* <Link href="http://utylee.duckdns.org/print/test/test">hahahah</Link> */}
      {/* <Link href="/print/test/test">hahahah</Link> */}
      {/* <Link href="http://naver.com">hahahah</Link> */}
      <PrintInput getPrints={getPrints} />
      {/* 메모 항목들 */}
      {/* <VStack */}
      {/*   pt={2} */}
      {/*   justifyContent="center" */}
      {/*   alignItems="center" */}
      {/*   flexDirection="column-reverse" */}
      {/* > */}
      {/* bgColor="red" */}
      <Flex
        pl={2}
        ml={0}
        w={["20em", "65em"]}
        grow="revert"
        flexWrap="wrap"
        justifyContent="center"
        gap={[2, 3]}
        rowGap={[6, 8]}
      >
        {/* spacing={2} */}
        {/* w={["10px", "10px"]} */}
        {/* maxW='10px' */}
        {/* maxW={['10em', '10em']} */}
        {/* {console.log(Date.now())} */}
        {/* {console.log("all page item box part")} */}
        {/* mb={4} */}
        {/* {printList.reverse().map((print) => ( */}
        {printList.map((print) => (
          <Box key={print.uid}>
            <PrintItem
              as={Flex}
              key={print.uid}
              print={print}
              getPrints={getPrints}
            />
          </Box>
        ))}
        {/* <Box key={memo.time} mb={4}> */}
        {/* <List spacing={2}> */}
        {/*   <ListItem> */}
        {/*     {memoList.map((memo) => ( */}
        {/*       <MemoItem key={memo.time} memo={memo} getMemos={getMemos} /> */}
        {/*     ))} */}
        {/*   </ListItem> */}
        {/*   {/1* <ListItem> *1/} */}
        {/*   {/1*   <MemoItem msg="식초" /> *1/} */}
        {/*   {/1* </ListItem> *1/} */}
        {/* </List> */}
        {/* </VStack> */}
      </Flex>
    </VStack>
  );
};

export default PageInput;
