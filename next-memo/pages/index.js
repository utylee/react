import { VStack, Flex as Flex, Box } from "@chakra-ui/react";
// List,
// ListItem,
// IconButton,
// Button,
// Input,
// Heading,
// import Temp from "./Temp";
import MemoItem from "../components/MemoItem";
import MemoInput from "../components/MemoInput";
// import Memo from "../components/Memo";
import React, { useState, useEffect } from "react";
// useCallback
import PullToRefresh from "react-simple-pull-to-refresh";

// import { BiAddToQueue } from "react-icons/bi";
// import { BsPlusLg } from "react-icons/bs";

//BiAddToQueu
//BsFillPlusSquareFill
//BsFillPlusCircleFill
//BsPlusLg
//IoMdGlobe 지구본
// IoDocumentTextOutline 문서

// SSR, SSG 용 함수입니다
export async function getStaticProps() {
  const res = await fetch(`http://localhost/api/listjs`);
  const memos = await res.json();
  return {
    props: {
      memos,
    },
    // 주기를 20초로 하긴했지만, next export에서는 의미없습니다
    // next build 후 next start로 node js 서버가 돌아갈때나 의미있습니다
    revalidate: 20,
  };
}

// export default React.memo(function Home({ memos }) {
export default function Home({ memos }) {
  const [memoList, setMemoList] = useState(memos);
  // const [inputText, setInputText] = useState("");

  // const getMemos = useCallback(async () => {
  //   console.log("getMemos rendered");
  //   const res = await fetch(`/api/listjs`);
  //   const memos = await res.json();
  //   setMemoList(memos);
  //   console.log(memoList);
  // }, [memoList]);

  const getMemos = async () => {
    console.log("getMemos rendered");
    const res = await fetch(`/api/listjs`);
    const memos = await res.json();
    setMemoList(memos);
    console.log(memoList);
  };

  // pull-down refresh 함수입니다
  // const handleRefresh = useCallback(async () => {
  //   {
  //     /* 메모 항목들 */
  //   }
  //   console.log("handeRefresh rendered");
  //   await getMemos();
  //   return 0;
  // }, [memoList]);

  // useEffect(() => {
  //   getMemos();
  // }, []);
  const handleRefresh = async () => {
    {
      /* 메모 항목들 */
    }
    console.log("handeRefresh rendered");
    await getMemos();
    return 0;
  };

  useEffect(() => {
    getMemos();
  }, []);

  return (
    <>
      {/* 아래로 당길시 리프레시 모듈입니다 */}
      {/* <PullToRefresh onRefresh={handleRefresh} justifyContent='center' pullingContent='당겨서 리프레시'> */}
      <PullToRefresh
        onRefresh={handleRefresh}
        justifyContent="center"
        pullingContent=""
      >
        {/* 총 페이지 */}
        <VStack overflowY="auto" w="full" justify="center" align="center">
          {console.log("all page rendered")}
          {/* 메모입력란 */}
          <MemoInput getMemos={getMemos} />
          {/* inputText={inputText} */}
          {/* setInputText={setInputText} */}

          {/* 메모 항목들 */}
          <VStack
            pt={2}
            justifyContent="center"
            alignItems="center"
            flexDirection="column-reverse"
          >
            {/* spacing={2} */}
            {/* w={["10px", "10px"]} */}
            {/* maxW='10px' */}
            {/* maxW={['10em', '10em']} */}
            {/* {console.log(Date.now())} */}
            {console.log("all page item box part")}
            {memoList.map((memo) => (
              <Box key={memo.uid} mb={4}>
                <MemoItem
                  as={Flex}
                  key={memo.uid}
                  memo={memo}
                  getMemos={getMemos}
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
          </VStack>
        </VStack>
      </PullToRefresh>
    </>
  );
}
