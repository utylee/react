import {
  List,
  ListItem,
  VStack,
  Flex as Flex,
  IconButton,
  Button,
  Input,
  Heading,
  Box,
} from "@chakra-ui/react";
import { RiTwitchLine } from "react-icons/ri";
// import Temp from "./Temp";
import MemoItem from "../components/MemoItem";
import MemoInput from "../components/MemoInput";
// import Memo from "../components/Memo";
import React, { useState, useEffect } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

import { BiAddToQueue } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

//BiAddToQueu
//BsFillPlusSquareFill
//BsFillPlusCircleFill
//BsPlusLg
//IoMdGlobe 지구본
// IoDocumentTextOutline 문서

export default function Home() {
  const [memoList, setMemoList] = useState([]);
  const [inputText, setInputText] = useState("");

  const getMemos = async () => {
    const res = await fetch(`/api/lists`);
    const memos = await res.json();
    setMemoList(memos);
    console.log(memoList);
  };

  // pull-down refresh 함수입니다
  const handleRefresh = async () => {
    {
      /* 메모 항목들 */
    }
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
          {/* 메모입력란 */}
          <MemoInput
            inputText={inputText}
            setInputText={setInputText}
            getMemos={getMemos}
          />

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
            {console.log(Date.now())}
            {memoList.map((memo) => (
              <Box mb={4}>
                <MemoItem
                  as={Flex}
                  key={memo.time}
                  memo={memo}
                  getMemos={getMemos}
                />
              </Box>
            ))}
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
