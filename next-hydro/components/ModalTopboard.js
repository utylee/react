import React from "react";
import { VStack, HStack, Flex, Box } from "@chakra-ui/react";
import useModal from "../context/useModal";

// const Topboard = ({ plantName, piecess, isModal, setTypeModal }) => {
const ModalTopboard = ({ piecess }) => {
  const { getIsOpen, getModalType, setModalType, openModal, closeModal } =
    useModal();
  // 일반 상판입니다
  const normalBoard = () => {
    return (
      <>
        {piecess.map((pieces, key1) => {
          console.log("normalBoard " + piecess);
          return (
            // 각구멍들입니다
            <HStack
              key={key1}
              px={[1, 4]}
              py={[1, "0.5em"]}
              w="full"
              justify="space-between"
            >
              {pieces.map((piece, key2) => {
                console.log("normalBoard " + piece);
                return (
                  <Box
                    key={key1 * 4 + key2}
                    borderRadius="50%"
                    w={[5, 8]}
                    h={[5, 8]}
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
    <>
      {/* ml={(["1.2em"], ["1.4em"])} */}
      <VStack
        px={["0.8em", 4]}
        py={["0.8em", "1.3em"]}
        bg="gray.600"
        w="full"
        borderRadius="lg"
        justify="space-between"
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          setModalType("topboard");
          console.log("setModalType:topboard edit");
        }}
      >
        {/* 행렬과 map을 어떻게 병용할까 고민하다가 이중배열과 이중 map을 사용하기로 했습니다 */}

        {/* 배열개수에 따라서 일반상판과 모종상판을 구분하기로 합니다 */}
        {piecess.length === 3 ? normalBoard() : seedlingBoard()}
      </VStack>
    </>
  );
};

export default ModalTopboard;
