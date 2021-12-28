import React, { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Text,
  Flex,
  IconButton,
  VStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { BsFillBackspaceFill } from "react-icons/bs";
import { IoMdGlobe } from "react-icons/io";
import {
  IoDocumentTextOutline,
  IoMagnet,
  IoMagnetOutline,
} from "react-icons/io5";
import { BsTextLeft } from "react-icons/bs";
// import moment from "moment";
import Moment from "react-moment";
import "moment/locale/ko";

//IoMdGlobe 지구본
// IoDocumentTextOutline 문서

// Moment.globalLocale = "ko";
// Moment.globalLocal = true;

// const MemoItem = ({ key, memo, children }) => {
const MemoItem = ({ memo, children, getMemos }) => {
  // const isIcon =
  //   // memo.type === 1 ? IoMdGlobe : BsTextLeft;
  //   memo.type === 1 ? IoMagnetOutline : BsTextLeft;
  // const isColor = memo.type === 1 ? blue.600" : "gray.400";
  const isIcon = (() => {
    if (memo.type === 0) {
      return BsTextLeft;
    } else if (memo.type === 1) {
      return IoMdGlobe;
    } else if (memo.type === 2) {
      // return IoMagnetOutline;
      return IoMagnet;
    }
  })();
  const isColor = (() => {
    if (memo.type === 0) {
      return "gray.400";
    } else if (memo.type === 1) {
      return "blue.600";
    } else if (memo.type === 2) {
      return "purple.400";
    }
  })();
  const [clicked, setClicked] = useState(0);
  const handleClick = () => {
    console.log(clicked);
    // setClicked(!clicked);
    setClicked(1);
  };
  const handleMouseOut = () => {
    console.log(clicked);
    setClicked(0);
  };
  const handleRemove = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "appication/json" },
      body: JSON.stringify({
        // id: key,
        time: memo.time,
        text: "갑니까",
      }),
    };
    const res = await fetch("/api/removejs", requestOptions);
    //const resultJson = await res.json();

    await getMemos();
  };
  console.log("clicked");

  return (
    <VStack mb={3} align="flex-end" spacing={0}>
      {/* 시간과 메모버블을 모두 포함한 영역 */}
      {/* 메모버블 */}
      <Flex
        justifyContent="space-between"
        w="full"
        minW="200px"
        maxW={["100px", "500px"]}
        bg="gray.100"
        rounded="2xl"
        px={2}
        align="center"
        overflow="hidden"
        textOverflow="ellipsis"
        onMouseOver={handleClick}
        onMouseOut={handleMouseOut}
      >
        {/* onMouseOver={handleClick} */}
        {/* onMouseOut={handleMouseOut} */}

        {/* onClick={handleClick} */}
        {/* maxW="300px" */}
        {/* 메모타입 */}
        {console.log(isIcon)}
        <Flex flexDirection="flex-start">
          <Icon as={isIcon} color={isColor} />
        </Flex>
        {/* <Icon as={IoMdGlobe} /> */}
        {/* <Icon icon={{ isText }} /> */}
        {/* <IconButton icon={<IoMdGlobe />} /> */}
        {/* <IconButton icon={<BsFillBackspaceFill />} /> */}

        {/* 메모 텍스트 */}
        {/* 링크여부를 판단하여 추가합니다 */}
        <Link href={memo.text}>
          {/* <Link href={memo.text} isExternal> */}
          <Text
            as={Box}
            outline="none"
            w="full"
            color="gray.600"
            fontSize="lg"
            ml={2}
            maxW="100px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace={clicked ? "wrap" : "nowrap"}
            _hover={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            {memo.text}
          </Text>
        </Link>

        {/* 삭제버튼 */}
        <IconButton
          variant="ghost"
          fontSize="1.4em"
          icon={<BsFillBackspaceFill />}
          mx={0}
          my={1}
          color="red.200"
          onClick={() => handleRemove()}
        >
          {/* 삭제버튼 */}
        </IconButton>
        {children}
      </Flex>

      {/* 시간 */}
      <Text pr={4} fontSize="xs" color="gray.400">
        {/* <Text pr={4} fontSize="xx-small" color="gray.400"> */}
        {/* parseInt(memo.time) */}
        {/* parseInt(memo.time) */}
        {/* Date.now() */}
        {/* moment.locale("ko") */}
        {/* (moment(Date.now())) */}
        {/* return moment().format("YYYYMMDD HH:mm:ss"); */}
        {/* (() => { */}
        {/* moment.locale("ko"); */}
        {/* })() */}
        <Moment interval={0} format="MM월 DD일 (dd) HH:mm:ss">
          {parseInt(memo.time)}
        </Moment>
        {/* <Moment>{Date.now()}</Moment> */}
      </Text>
      {/* 10월31일 (수) 오후 6:41 */}
    </VStack>
  );
};

export default MemoItem;
