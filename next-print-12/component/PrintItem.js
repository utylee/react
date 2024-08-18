import React, { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Text,
  // Flex,
  IconButton,
  VStack,
  HStack,
  Icon,
  Link,
  Textarea,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { BsFillBackspaceFill } from "react-icons/bs";
import { IoMdGlobe } from "react-icons/io";
import {
  IoDocumentTextOutline,
  IoMagnet,
  IoMagnetOutline,
} from "react-icons/io5";
import { MdCancel } from "react-icons/md";

import { BsTextLeft } from "react-icons/bs";
import usePrint from "../context/usePrint";
import Moment from "react-moment";
import "moment/locale/ko";

const PrintItem = ({ print, getPrints }) => {
  const { printCur, setPrintCur } = usePrint();

  const iconType = (() => {
    if (print.type === 0) {
      return BsTextLeft;
    } else if (print.type === 1) {
      return IoMdGlobe;
    } else if (print.type === 2) {
      // return IoMagnetOutline;
      return IoMagnet;
    }
  })();
  const isLink = () => {
    if (print.type === 1 || print.type === 2) {
      // console.log("islink");
      return true;
    } else {
      // console.log("isnotlink");
      return false;
    }
  };
  const iconColor = (() => {
    if (print.type === 0) {
      return "gray.500";
      // return "gray";
    } else if (print.type === 1) {
      return "blue.600";
    } else if (print.type === 2) {
      return "purple.400";
    }
  })();
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    // console.log("clicked:", clicked);
    setClicked(() => (clicked = !clicked));
    setClicked(!clicked);

    setPrintCur(print);
  };
  const handleMouseOut = () => {
    // console.log("clicked,mouseout:", clicked);
    setClicked(false);
  };
  const handleRemove = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "appication/json" },
      body: JSON.stringify({
        // id: key,
        uid: print.uid,
        text: "갑니까",
      }),
    };
    // const res = await fetch("/api/removejs", requestOptions);
    const res = await fetch("/print/api/removejs", requestOptions);
    //const resultJson = await res.json();

    await getPrints();
  };

  return (
    <>
      {/* <VStack onClick={handleClick}> */}
      {/* <VStack align="flex-start" mb={3} spacing={0} onClick={handleClick}> */}
      {/* ------------------------------------------------- */}
      {/* 시간과 메모버블을 모두 포함한 전체영역 */}
      {/* ------------------------------------------------- */}
      {/* 메모버블세트 */}
      {/* w={["18em", "28em"]} */}
      {/* justifyContent="space-between" */}
      {/* overflow="hidden" */}
      {/* align="center" */}
      {/* textOverflow="ellipsis" */}
      {/* justifyContent="flex-start" */}
      <VStack
        onClick={handleClick}
        spacing={0}
        w={["9em", "13em"]}
        h={["8em", "8em"]}
        color="black"
        bg="gray.700"
        rounded="2xl"
        px={0}
        overflow="hidden"
        textAlign="left"
        justifyItems="left"
      >
        {/* onMouseOver={handleClick} */}
        {/* onMouseOut={handleMouseOut} */}
        {/* onClick={handleClick} */}
        {/* maxW="300px" */}
        <HStack justifyContent="flex-start">
          {/* ------------------------------------------------- */}
          {/* 시간 */}
          <Text fontSize={["0.7em", "0.8em"]} color="gray.600">
            {/* <Text pr={4} fontSize="xx-small" color="gray.400"> */}
            {/* {parseInt(print.font_size)} */}

            {/* 인터벌을 0으로 disable 해주지 않으면 타이머가 동작하는 것 같습니다 */}
            {/* <Moment interval={0} format="'YY MM.DD (dd) HH:mm:ss"> */}
            <Moment interval={0} format="'YY MM.DDdd&nbsp;HH:mm">
              {/* 스트링을 숫자로 변환하는 함수합니다 */}
              {parseInt(print.time)}
            </Moment>
            {/* <Moment>{Date.now()}</Moment> */}
          </Text>

          {/* ------------------------------------------------- */}
          {/* 삭제버튼 */}
          {/* mr={[1, 3]} */}

          {/* my={1} */}
          {/* mt="-4em" */}
          {/* mr={["-4em", "-6em"]} */}
          <IconButton
            mr={["0em", "-2em"]}
            variant="ghost"
            fontSize="1.4em"
            icon={<MdCancel />}
            color="red.200"
            onClick={() => handleRemove()}
            _focus={{ boxShadow: "none", background: "none" }}
          ></IconButton>
        </HStack>
        {/* 저장된 텍스트 표시부입니다 */}
        {/* fontSize="lg" */}
        {/* fontSize={(printCur.fontSize / 10 - 0.4).toString() + "em"} */}
        <Textarea
          readOnly
          outline="none"
          w={["6em", "10em"]}
          fontSize={(print.font_size / 10).toString() + "em"}
          ml={[0, 0]}
          color="gray.400"
          _hover={{ cursor: "pointer" }}
          onClick={handleClick}
          borderColor="gray.600"
        >
          {print.text}
        </Textarea>
        {/* </ConditionalLink> */}
        {/* {isLinkOpen ? (</Link>) : null} */}
      </VStack>
    </>
  );
};

// 상황에 따라 링크를 추가하려 할 때 컴포넌트를 통해 래핑하는 기술입니다
const ConditionalLink = ({ wrapper, condition, children }) => {
  // condition에 ()를 붙여서 함수실행을 하게끔해줘야 했습니다
  return condition() ? wrapper(children) : children;
};

export default PrintItem;
