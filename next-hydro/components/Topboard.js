import React from "react";
import { VStack, HStack, Flex, Box } from "@chakra-ui/react";

const Topboard = ({ plantName, piecess }) => {
  // 일반 상판입니다
  const normalBoard = () => {
    return (
      <>
        {piecess.map((pieces, key1) => {
          console.log("normalBoard " + piecess);
          return (
            <HStack key={key1} px={1} py="0.5" w="full" justify='space-between'>
              {pieces.map((piece, key2) => {
                console.log("normalBoard " + piece);
                return (
                  <Box
                    key={key1 * 4 + key2}
                    borderRadius="50%"
                    w={3.5}
                    h={3.5}
                    borderWidth={1}
                    borderColor="gray.600"
                    bg={piece ? "green.600" : "gray.700"}
                  ></Box>
                );
              })}
            </HStack>
          );
        })}
      </>
    );
  };
  // piecess.map((pieces, key1) => {
  //   console.log("normalBoard " + piecess);
  // return <><span color='white' opacity='100%'>하하</span></>;

  // return (
  //   <Flex key={key1} px={1} py="0.5" w="10em">
  //     {pieces.map((piece, key2) => {
  //       console.log("normalBoard " + piece);
  //       return (
  //         <Box
  //           key={key1 * 4 + key2}
  //           borderRadius="50%"
  //           w={3.5}
  //           h={3.5}
  //           borderWidth={1}
  //           borderColor="gray.600"
  //           bg={piece ? "green.600" : "gray.700"}
  //         ></Box>
  //       );
  //     })}
  //   </Flex>
  // );
  // });
  // };
  const seedlingBoard = () => {
    return (
      <Flex flexWrap="wrap" px={1} py="0.5" w="full" justify="space-between">
        {console.log("seedlingBoard " + piecess)}
        {piecess.map((piece, key) => {
          return (
            <Box
              key={key}
              borderRadius={5}
              w={6}
              h={6}
              my={1}
              borderWidth={1}
              borderColor="gray.600"
              bg={piece ? "green.600" : "gray.700"}
            ></Box>
          );
        })}
      </Flex>
    );
  };
  return (
    <VStack
      px={3}
      py={3}
      bg="gray.600"
      w="full"
      borderRadius="lg"
      justify="space-between"
    >
      {/* 행렬과 map을 어떻게 병용할까 고민하다가 이중배열과 이중 map을 사용하기로 했습니다 */}
      {piecess.length === 3 ? normalBoard() : seedlingBoard()}
    </VStack>
  );
};

export default Topboard;
