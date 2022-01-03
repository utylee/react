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

// const MemoItem = React.memo(({ memo, children, getMemos }) => {
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
      // console.log("islink");
      return true;
    } else {
      // console.log("isnotlink");
      return false;
    }
  };
  const iconColor = (() => {
    if (memo.type === 0) {
      return "gray.500";
      // return "gray";
    } else if (memo.type === 1) {
      return "blue.600";
    } else if (memo.type === 2) {
      return "purple.400";
    }
  })();
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    console.log("clicked:", clicked);
    setClicked(() => (clicked = !clicked));
    setClicked(!clicked);
    // setClicked(1);
  };
  const handleMouseOut = () => {
    console.log("clicked,mouseout:", clicked);
    setClicked(false);
  };
  const handleRemove = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "appication/json" },
      body: JSON.stringify({
        // id: key,
        uid: memo.uid,
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
      {/* 시간과 메모버블을 모두 포함한 전체영역 */}

      {/* ------------------------------------------------- */}
      {/* 메모버블세트 */}
      <Flex
        justifyContent="space-between"
        w={["18em", "28em"]}
        color="black"
        bg="gray.700"
        rounded="2xl"
        px={0}
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
        {/* 메모타입 아이콘*/}

        {console.log(iconType)}
        {console.log('item렌더')}
        <Flex
          pl={[3, 5]}
          flexDirection="flex-start"
          bg="gray.700"
          onClick={handleClick}
          _focus={{ boxShadow: "none" }}
        >
          {/* 위는 버튼 focus시에 추한 파한색 테투리를 제거하는 요령입니다 */}
          {/* https://github.com/chakra-ui/chakra-ui/issues/708#issuecomment-899069227 */}
          {/* as={Button} */}
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
          wrapper={(children) => (
            <Link color="white" href={memo.text}>
              {children}
            </Link>
          )}
        >
          {/* {isLinkOpen ? (<Link href={memo.text}>) : null} */}
          {/* <Link href={memo.text}> */}
          {/* <Link href={memo.text} isExternal> */}
          {/* maxW={["11em", "18em", "25em", "38em"]} */}
          {/* maxW={["11em", "18em", "25em"]} */}
          {/* w="full" */}
          {/* w={["11em", "18em", "25em"]} */}
          {/* color="gray.600" */}
          <Text
            as={Box}
            outline="none"
            w={["11em", "18em"]}
            fontSize="lg"
            color="gray.300"
            ml={[0, 2]}
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
          mr={[1, 3]}
          my={1}
          color="red.200"
          onClick={() => handleRemove()}
          _focus={{ boxShadow: "none", background: "none" }}
        ></IconButton>
        {children}
      </Flex>

      {/* ------------------------------------------------- */}
      {/* 시간 */}

      <Text pr={4} fontSize="xs" color="gray.600">
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

// 상황에 따라 링크를 추가하려 할 때 컴포넌트를 통해 래핑하는 기술입니다
const ConditionalLink = ({ wrapper, condition, children }) => {
  // condition에 ()를 붙여서 함수실행을 하게끔해줘야 했습니다
  return condition() ? wrapper(children) : children;
};

export default MemoItem;
