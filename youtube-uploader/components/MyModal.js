import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Flex,
  Stack,
  VStack,
  HStack,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import { FaHome, FaServer, FaYoutube, FaYoutubeSquare } from "react-icons/fa";
import useModal from "./useModal";

const MyModal = () => {
  const { openModal, isOpen, setIsOpen, closeModal, curFile } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent maxW="34em" bg="#2b2a33">
          <ModalCloseButton _focus={{ boxShadow: "None" }} />
          <VStack w="full" h="full" justify="center" alignItems="center">
            <Flex mt="3em" mb="2em" px="2em" fontSize="1.1em">
              {curFile != null ? curFile.filename : "없음"}
            </Flex>
            {/* 인풋 영역입니다 */}
            <Flex my="3em">
              <Input size="lg" w="20em" />
            </Flex>
            {/* 버튼 영역입니다 */}
            <HStack w="full" pt="3em" pb="3em" px="2.2em" justify="space-between">
              <HStack alignSelf="start" spacing="0.5em">
                <Button
                  color="gray.500"
                  variant="outline"
                  size="sm"
                  alignSelf="start"
                  borderColor="gray.500"
                >
                  상태수정
                </Button>
                <Button
                  color="gray.500"
                  variant="outline"
                  size="sm"
                  alignSelf="start"
                  borderColor="gray.500"
                >
                  재전송
                </Button>
              </HStack>
              <HStack alignSelf="end">
                <Button
                  leftIcon={<FaYoutube fontSize="1.5em" />}
                  colorScheme="red"
                  size="lg"
                  alignSelf="end"
                >
                  제목설정
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size="lg"
                  alignSelf="end"
                  _hover={{ bg: "gray.400" }}
                >
                  취소
                </Button>
              </HStack>
            </HStack>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
