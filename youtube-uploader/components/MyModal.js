import React, { useEffect, useRef } from "react";
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

const MyModal = ({ setMyconfirm }) => {
  const { openModal, isOpen, setIsOpen, closeModal, curFile } = useModal();
  const inputRef = useRef(undefined);

  // autoFocus 를 사용하기에 문제해결도 못했겠다 제거해보았습니다
  // useEffect(() => {
  //   console.log("MyModal::useEffect");
  //   if (inputRef.current !== undefined && inputRef.current.value !== null) {
  //     console.log("MyModal::useEffect::focused");
  //     inputRef.current.focus();
  //   }
  // }, []);
  // }, [curFile.timestamp]);

  const handleConfirm = async () => {
    const title = inputRef.current.value.trim();
    console.log("handleConfirm::title:" + title);
    const requestOptions = {
      method: "POST",
      header: { "Content-Type:": "application/json" },
      body: JSON.stringify({ timestamp: curFile.timestamp, title: title }),
    };
    const res = await fetch("/uploader/api/updatejs", requestOptions);
    // console.log("response:" + JSON.stringify(res));
    const js = await res.json();
    console.log("response:");
    console.log(js);
    if (title !== curFile.title) {
      setMyconfirm(Math.random());
      // setMyconfirm(inputRef.current.value);
    }
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent maxW="34em" bg="#2b2a33">
          <ModalCloseButton _focus={{ boxShadow: "None" }} />
          <VStack w="full" h="full" justify="center" alignItems="center">
            {/* 파일명입니다 */}
            <Flex mt="3em" mb="2em" px="2em" fontSize="1.1em">
              {curFile != null ? curFile.filename : "없음"}
            </Flex>
            {/* 인풋 영역입니다 */}
            <Flex my="3em">
              <Input
                autoFocus="true"
                ref={inputRef}
                size="lg"
                w="20em"
                placeholder={curFile.title}
                onKeyPress={(e) => {
                  e.key === "Enter" ? handleConfirm() : null;
                }}
              />
            </Flex>
            {/* 버튼 영역입니다 */}
            <HStack
              w="full"
              pt="3em"
              pb="3em"
              px="2.2em"
              justify="space-between"
            >
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
                  onClick={() => handleConfirm()}
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
