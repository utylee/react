import React from "react";
import { Box, Text, Flex, IconButton, VStack } from "@chakra-ui/react";
import { BsFillBackspaceFill } from "react-icons/bs";

const MemoItem = ({ msg, children }) => (
  <VStack mb={3} align='flex-end' spacing={0}>
  {/* <VStack p={1.5} spacing={0}> */}
    <Flex
      justifyContent="space-between"
      w={400}
      bg="gray.100"
      maxW={300}
      align="center"
      rounded="2xl"
    >
      <Text
        w="100%"
        color="gray.600"
        fontSize="xl"
        ml={3}
      >
        {msg}
      </Text>
      <IconButton
        fontSize="1.4em"
        variant="ghost"
        icon={<BsFillBackspaceFill />}
        mx={1}
        my={1}
        color="red.200"
      >
        {/* 삭제버튼 */}
      </IconButton>
      {children}
    </Flex>
    <Text pr={4} fontSize="xs" color="gray.400">
    {/* <Text pr={4} fontSize="xx-small" color="gray.400"> */}
		10월31일 (수) 오후 6:41
    </Text>
  </VStack>
);

export default MemoItem;
