import {
  List,
  ListItem,
  VStack,
  Flex as Flex,
  IconButton,
  Button,
  Input,
  Heading,
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

  const getMemos = async () => {
    const res = await fetch(`/api/lists`);
    const memos = await res.json();
    setMemoList(memos);
    console.log(memoList);
  };
  // pull refresh 함수입니다
  const handleRefresh = async () => {
    getMemos();
    return 0;
  };

  useEffect(() => {
    getMemos();
  }, []);

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      justifyContent="center"
      pullingContent=""
    >
      {/* <PullToRefresh onRefresh={handleRefresh} justifyContent='center' pullingContent='당겨서 리프레시'> */}
      <VStack overflowY='auto' w="full" justify="center" align="center">
        {/* 메모입력란 */}
        <MemoInput />

        {/* 메모 항목들 */}
        <Flex pt={2}>
          <List spacing={2}>
            <ListItem>
              {/*memoList.map((memo) => (
                <MemoItem msg={memo.text} />
			  ))*/}
              {memoList.map((memo) => (
                <MemoItem memo={memo} />
              ))}
            </ListItem>
            {/* <ListItem> */}
            {/*   <MemoItem msg="식초" /> */}
            {/* </ListItem> */}
          </List>
        </Flex>
      </VStack>
    </PullToRefresh>
  );
}
