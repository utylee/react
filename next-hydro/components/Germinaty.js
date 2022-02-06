import React, { useState } from "react";
import { VStack, Box, Flex, Text } from "@chakra-ui/react";

const Germinaty = ({ gem }) => {
  const { waterGauge, warning, seedNames } = gem;
  return (
    <>
      <VStack pl={3} spacing="0.1em" mb={2}>
        {/* 상판 */}
        <Flex
          justify="space-between"
          align="center"
          w="7em"
          h="2.5em"
          px={3}
          py={1}
          bg="gray.600"
          borderRadius="lg"
        >
          {/* <span>ㅋㅋㅋㅋㅋ</span> */}
          {/* {gem.seedNames.map((seedName) => { */}
          {seedNames.map((seedName) => {
            return (
                <Flex
                  key={Math.floor(Math.random() * 1000000)}
                  flexWrap="nowrap"
                  bg="green.600"
                  w="45%"
                  h="80%"
                  borderRadius="5"
                  align="center"
                  justify="center"
                >
                  {/* 텍스트 생략을 위한 구문 3종 세트 */}
                  <Text
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    color="gray.800"
                    fontSize="0.8em"
                    // fontWeight="normal"
                    // fontWeight="medium"
                    fontWeight="semibold"
                  >
                    {seedName}
                  </Text>
                </Flex>
            );
          })}
        </Flex>

        {/* 수위게이지 */}
        {/* 바탕 */}
        <Flex
          w="90%"
          h="0.3em"
          borderRadius="1.5"
          position="relative"
          bg={warning ? "#59110c" : "blue.800"}
        >
          {/* 알맹이 */}
          <Flex
            w={() => {
              // return gem.waterGauge + "%";
              return waterGauge + "%";
            }}
            borderRadius="1.5"
            bg={warning ? "red.700" : "blue.500"}
          ></Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default Germinaty;
