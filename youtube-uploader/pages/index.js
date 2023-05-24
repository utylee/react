import { VStack, HStack, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

export default function Home() {
  return (
    <VStack pt={"2em"}>
      <Flex p={3} bg="gray.500" rounded="md">
        핑두
      </Flex>
      <Flex p={3} bg="gray.500" rounded="md">
        핑두
      </Flex>
      <Flex p={3} bg="gray.500" rounded="md">
        핑두
      </Flex>
    </VStack>
  );
}
