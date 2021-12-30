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

const MemoItem = ({ memo, children, getMemos }) => {
  const iconType = (() => {
    if (memo.type === 0) {
      return BsTextLeft;
    } else if (memo.type === 1) {
      return IoMdGlobe;
    } else if (memo.type === 2) {
      // return IoMagnetOutline;
      return IoMagnet;
    }
  })();
  const isLink = () => {
    if (memo.type === 1 || memo.type === 2) {
      console.log("islink");
      return true;
    } else {
      console.log("isnotlink");
      return false;
    }
  };
  const isLinkOpen = () => {
    if (memo.type === 1 || memo.type === 2) {
      return true;
    } else {
      return false;
    }
  };
  const isLinkClose = () => {
    if (memo.type === 1 || memo.type === 2) {
      return true;
      // return </Link>;
    } else {
      return false;
      // return </>;
    }
  };
  const iconColor = (() => {
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

  return (
    <VStack mb={3} align="flex-end" spacing={0}>
      {/* ------------------------------------------------- */}
      {/* 시간과 메모버블을 모두 포함한 영역 */}
      {/* 메모버블세트 */}
      <Flex
        justifyContent="space-between"
        bg="gray.100"
        w={["18em", "28em"]}
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

        {/* ------------------------------------------------- */}
        {/* 메모타입 */}
        {console.log(iconType)}
        <Flex flexDirection="flex-start">
          <Icon as={iconType} color={iconColor} />
        </Flex>
        {/* <Icon as={IoMdGlobe} /> */}
        {/* <Icon icon={{ isText }} /> */}
        {/* <IconButton icon={<IoMdGlobe />} /> */}
        {/* <IconButton icon={<BsFillBackspaceFill />} /> */}

        {/* ------------------------------------------------- */}
        {/* 메모 텍스트 */}
        {/* 링크여부를 판단하여 앵커를 추가합니다 */}
        <ConditionalLink
          condition={isLink}
          wrapper={(children) => <Link href={memo.text}>{children}</Link>}
        >
          {/* {isLinkOpen ? (<Link href={memo.text}>) : null} */}
          {/* <Link href={memo.text}> */}
          {/* <Link href={memo.text} isExternal> */}
          {/* maxW={["11em", "18em", "25em", "38em"]} */}
          {/* maxW={["11em", "18em", "25em"]} */}
          {/* w="full" */}
          {/* w={["11em", "18em", "25em"]} */}
          <Text
            as={Box}
            outline="none"
            w={["11em", "18em"]}
            color="gray.600"
            fontSize="lg"
            ml={2}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace={clicked ? "wrap" : "nowrap"}
            _hover={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            {memo.text}
          </Text>
        </ConditionalLink>
        {/* {isLinkOpen ? (</Link>) : null} */}

        {/* ------------------------------------------------- */}
        {/* 삭제버튼 */}
        <IconButton
          variant="ghost"
          fontSize="1.4em"
          icon={<BsFillBackspaceFill />}
          mx={0}
          my={1}
          color="red.200"
          onClick={() => handleRemove()}
        ></IconButton>
        {children}
      </Flex>

      {/* ------------------------------------------------- */}
      {/* 시간 */}
      <Text pr={4} fontSize="xs" color="gray.400">
        {/* <Text pr={4} fontSize="xx-small" color="gray.400"> */}

        {/* 인터벌을 0으로 disable 해주지 않으면 타이머가 동작하는 것 같습니다 */}
        <Moment interval={0} format="MM월 DD일 (dd) HH:mm:ss">
          {/* 스트링을 숫자로 변환하는 함수합니다 */}
          {parseInt(memo.time)}
        </Moment>
        {/* <Moment>{Date.now()}</Moment> */}
      </Text>
    </VStack>
  );
};

const ConditionalLink = ({ wrapper, condition, children }) => {
  // console.log("conditional link come in");
  // condition에 ()를 붙여서 함수실행을 하게끔해줘야 했습니다
  return condition() ? wrapper(children) : children;
};

export default MemoItem;
