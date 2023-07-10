import React from "react";
import { VStack, HStack, Flex, Box } from "@chakra-ui/react";
import useModal from "../context/useModal";

// const Topboard = ({ plantName, piecess, isModal, setTypeModal }) => {
// const ModalTopboard = ({ piecess }) => {
const ModalTopboard = ({ planter }) => {
  // const { getIsOpen, getModalType, setModalType, openModal, closeModal } =
  const { setModalType } = useModal();
  // 일반 상판입니다
  const normalBoard = () => {
    return (
      <>
        {/* {piecess.map((pieces, key1) => { */}
        {planter.pieces.map((pieces, key1) => {
          // console.log("normalBoard " + piecess);
          return (
            // 각구멍들입니다
            <HStack
              key={key1}
              px={[1, 2, 4]}
              py={[1, 1, "0.5em"]}
              w="full"
              justify="space-between"
            >
              {pieces.map((piece, key2) => {
                // console.log("normalBoard " + piece);
                return (
                  <Box
                    key={key1 * 4 + key2}
                    borderRadius="50%"
                    w={[5, 6, 8]}
                    h={[5, 6, 8]}
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
      <Flex
        flexWrap="wrap"
        px={["0.3em", "0.3em", "1.5em"]}
        pt={["0.5em", "0.7em", "1.1em"]}
        w="full"
        justify="space-between"
      >
        {/* {console.log("seedlingBoard " + piecess)} */}
        {/* {piecess.map((piece, key) => { */}
        {planter.pieces.map((piece, key) => {
          return (
            <Box
              key={key}
              borderRadius={5}
              w={["2em", "2.3em", "3.3em"]}
              h={["2em", "2.3em", "3.3em"]}
              mb={["1.2em", "1.4em", "1.5em"]}
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
      {/* w="full" */}
      <VStack
        px={["0.8em", 4]}
        py={["0.8em", "1.3em"]}
        bg="gray.600"
        w={["10em", "11em", "18em"]}
        h={["8em", "10em", "13em"]}
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
        {/* {piecess.length === 3 ? normalBoard() : seedlingBoard()} */}
        {planter.pieces.length === 3 ? normalBoard() : seedlingBoard()}
      </VStack>
    </>
  );
};

export default ModalTopboard;
