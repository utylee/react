import React from "react";
import { Box, Text, Flex, IconButton, VStack } from "@chakra-ui/react";
import { BsFillBackspaceFill } from "react-icons/bs";

const MemoItem = ({ msg, children }) => (
  <Flex
    justifyContent="space-between"
    w={400}
    bg="gray.100"
    maxW={300}
    align="center"
    rounded="2xl"
  >
    <VStack p={1.5} spacing={0}>
      <Text
        w="100%"
        color="gray.600"
        fontSize="xl"
        borderBottomWidth={1}
        borderBottomColor="gray.300"
        ml={3}
      >
        {msg}
      </Text>
      <Text fontSize="xs" color="gray.400">
        2021.10.31
      </Text>
    </VStack>
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
);

export default MemoItem;
