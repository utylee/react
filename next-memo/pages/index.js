import {
  List,
  ListItem,
  VStack,
  Flex,
  IconButton,
  Button,
  Input,
  Heading,
} from "@chakra-ui/react";
import { RiTwitchLine } from "react-icons/ri";
// import Temp from "./Temp";
import MemoItem from "../components/MemoItem";
// import Memo from "../components/Memo";
import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

//BiAddToQueu
//BsFillPlusSquareFill
//BsFillPlusCircleFill
//BsPlusLg

export default function Home() {
  return (
    <VStack w="full" align="center">
      <p>천다원에박자</p>
      <Flex>{/* 추가 인풋 */}</Flex>
      <Flex>{/* 리스트 항목 */}</Flex>
      {/* <IconButton color="purple.100" icon={<BiAddToQueue />} aria-label="Test" /> */}
      {/* <IconButton color="purple.100" icon={<RiTwitchLine />} aria-label="Test" /> */}
      결과론적으로 속아넘어간 것 같습니다
      {/* <Memo /> */}
      {/* <Temp /> */}
      {/* <IconButton */}
      {/*   color="purple.100" */}
      {/*   icon={<BiAddToQueue />} */}
      {/*   aria-label="Test" */}
      {/* /> */}
      <List spacing={5}>
        <ListItem>
          <MemoItem msg='보지벌려'/>
        </ListItem>
        <ListItem>
          <MemoItem />
        </ListItem>
        <ListItem>
          <MemoItem />
        </ListItem>
        <ListItem>
          <MemoItem />
        </ListItem>
        <ListItem>
          <MemoItem />
        </ListItem>
        <ListItem>
          <MemoItem />
        </ListItem>
        <ListItem>
          <MemoItem />
        </ListItem>
        <ListItem>
          <MemoItem />
        </ListItem>
      </List>
    </VStack>
  );
}
