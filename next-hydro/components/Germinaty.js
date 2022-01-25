import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

const Germinaty = ({ gem }) => {
  return (
    <>
      <Flex px={4} py={2} mb={2} bg="gray.500" borderRadius="lg">
        {/* <span>ㅋㅋㅋㅋㅋ</span> */}
        {gem.seedName}
      </Flex>
    </>
  );
};

export default Germinaty;
