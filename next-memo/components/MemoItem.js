import React from "react";
import { Box, Text, Flex, IconButton, VStack, Icon } from "@chakra-ui/react";
import { BsFillBackspaceFill } from "react-icons/bs";
import { IoMdGlobe } from "react-icons/io";
import { IoDocumentTextOutline, IoMagnet, IoMagnetOutline } from "react-icons/io5";
import { BsTextLeft } from "react-icons/bs";

//IoMdGlobe 지구본
// IoDocumentTextOutline 문서

const MemoItem = ({ memo, children }) => {
  // const isIcon =
  //   // memo.type === 1 ? IoMdGlobe : BsTextLeft;
  //   memo.type === 1 ? IoMagnetOutline : BsTextLeft;
  // const isColor = memo.type === 1 ? "blue.600" : "gray.400";
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

  return (
    <VStack mb={3} align="flex-end" spacing={0}>
      {/* 메모버블 */}
      <Flex
        justifyContent="space-between"
        w="full"
        minW="250px"
        bg="gray.100"
        align="center"
        rounded="2xl"
        px={2}
      >
        {/* 메모타입 */}
        {console.log(isIcon)}
        {/* <Icon icon={{ isText }} /> */}
        {/* <IconButton icon={<IoMdGlobe />} /> */}
        {/* <IconButton icon={<BsFillBackspaceFill />} /> */}
        {/* 메모 텍스트 */}
        <Icon as={isIcon} color={isColor} />
        {/* <Icon as={IoMdGlobe} /> */}
        <Text w="full" color="gray.600" fontSize="lg" ml={2}>
          {memo.text}
        </Text>

        {/* 삭제버튼 */}
        <IconButton
          fontSize="1.4em"
          variant="ghost"
          icon={<BsFillBackspaceFill />}
          mx={0}
          my={1}
          color="red.200"
        >
          {/* 삭제버튼 */}
        </IconButton>
        {children}
      </Flex>

      {/* 시간 */}
      <Text pr={4} fontSize="xs" color="gray.400">
        {/* <Text pr={4} fontSize="xx-small" color="gray.400"> */}
        10월31일 (수) 오후 6:41
      </Text>
    </VStack>
  );
};

export default MemoItem;
