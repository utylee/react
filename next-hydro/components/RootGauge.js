import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { GiTreeRoots } from "react-icons/gi";

const RootGauge = ({ gauge }) => {
  return (
    <Flex w="full" pt={1}>
      {/* 아이콘 */}
      <Flex align="center">
        <Icon fontSize="0.8em" as={GiTreeRoots} color="yellow.700" />
        {/* <Icon fontSize="md" as={GiTreeRoots} color="gray.400" /> */}
      </Flex>

      {/* 게이지 바탕 */}
      <Flex align='center' w="full" bg="yellow.900" h={2} borderRadius="3" ml={1} mr={2}>
        <Flex position="relative" overflow="hidden" w="100%" h="100%">
          {/* 게이지 알맹이 */}
          <Flex
            bg="yellow.600"
            w={() => gauge + "%"}
            borderLeftRadius="3"
            borderRightRadius="2"
          ></Flex>
          <Flex
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            position="absolute"
          >
            {/* overflow="hidden" */}
            {/* backgroundImage={GiTreeRoots} */}
          </Flex>
        </Flex>
        {/* zIndex={2} */}
        {/* <Flex bg="yellow.900" h={5} w="full" borderRadius="md"> */}
        {/* w={() => prseInt(gauge) + "%"} */}
        {console.log("root gauge:" + gauge)}

        {/* zIndex={3} */}
        {/* 뿌리 아이콘 */}
        {/* <Icon position='absolute' zIndex="1" as={GiTreeRoots} opacity="40%" /> */}
      </Flex>
    </Flex>
  );
};

export default RootGauge;
