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
    // const res = await fetch("/uploader/api/updatejs", requestOptions);
    const res = await fetch("/youtube/api/updatejs", requestOptions);
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
        <ModalContent maxW={["18em", "18em", "34em"]} bg="#2b2a33">
          <ModalCloseButton _focus={{ boxShadow: "None" }} />
          <VStack w="full" h="full" justify="center" alignItems="center">
            {/* 파일명입니다 */}
            <Flex
              mt={["1em", "1em", "3em"]}
              mb={["0.5em", "0.5em", "2em"]}
              px={["1em", "1em", "2em"]}
              fontSize="1.1em"
            >
              {curFile != null ? curFile.filename : "없음"}
            </Flex>
            {/* 인풋 영역입니다 */}
            <Flex mb={["0.5em", "0.5em", "3em"]}>
              <Input
                autoFocus="true"
                ref={inputRef}
                size="lg"
                w={["14em", "14em", "20em"]}
                placeholder={curFile.title}
                onKeyPress={(e) => {
                  e.key === "Enter" ? handleConfirm() : null;
                }}
              />
            </Flex>
            {/* 버튼 영역입니다 */}
            <HStack
              w="full"
              pt={["1em", "1em", "3em"]}
              pb={["1.5em", "1.5em", "3em"]}
              px={["0.2em", "0.2em", "2.2em"]}
              justify="space-between"
            >
              <HStack alignSelf="start" spacing={["0.1em", "0.1em", "0.5em"]}>
                <Button
                  color="gray.500"
                  variant="outline"
                  size={["xs", "xs", "sm"]}
                  alignSelf="start"
                  borderColor="gray.500"
                >
                  <Flex fontSize={["0.9em", "0.9em", "1em"]}>상태수정</Flex>
                </Button>
                <Button
                  color="gray.500"
                  variant="outline"
                  size={["xs", "xs", "sm"]}
                  alignSelf="start"
                  borderColor="gray.500"
                >
                  <Flex fontSize={["0.9em", "0.9em", "1em"]}>재전송</Flex>
                </Button>
              </HStack>
              <HStack alignSelf="end">
                <Button
                  leftIcon={<FaYoutube fontSize="1.5em" />}
                  colorScheme="red"
                  size={["sm", "sm", "lg"]}
                  alignSelf="end"
                  onClick={() => handleConfirm()}
                >
                  <Flex fontSize={["1.1em", "1.1em", "1em"]}>설정</Flex>
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size={["sm", "sm", "lg"]}
                  alignSelf="end"
                  _hover={{ bg: "gray.400" }}
                  onClick={() => closeModal()}
                >
                  <Flex fontSize={["1.1em", "1.1em", "1em"]}>취소</Flex>
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
