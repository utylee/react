import { Stack, Flex, Input, Radio, RadioGroup, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useModal from "../context/useModal";

const ModalPhoneEdit = ({ curRoomDetails, curOccupantDetails }) => {
  const phoneRef = useRef(undefined);
  const { setCurModalContent, setCurModalPosition } = useModal();
  return (
    <>
      <Flex direction="column" w="100%" alignItems="center" overflowY="auto">
        {/* <Flex>{curRoomDetails.occupant_name}</Flex> */}
        {/* 전화번호수정란입니다 */}
        <Flex w="12em" mb="1.5em" alignItems="center" justifyContent="center">
          <Flex w="4em" h="2em">
            <Text mt="0.5em" color="gray.400" fontSize="lg">
             전화번호 
            </Text>
          </Flex>
          <Input
            textAlign="center"
            w="9em"
            autoFocus
            ref={phoneRef}
            size="md"
            borderBottomWidth={1}
            borderColor="gray.500"
            rounded={0}
            placeholder={curOccupantDetails.phone}
            variant="unstyled"
            defaultValue={curOccupantDetails.phone}
            textColor="gray.100"
            fontSize="2xl"
          />
        </Flex>


        {/* 수정완료 및 취소 버튼 */}
        <Flex mb="0.6em">
          <Flex
            w="5em"
            h="2.5em"
            bgColor="gray.600"
            borderWidth={1}
            borderColor="gray.500"
            rounded="md"
            alignItems="center"
            justifyContent="center"
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              // 변경점을 반영합니다
              console.log("phone is...");
              console.log(phoneRef.current.value);
              setCurModalPosition("namesex");
              setCurModalContent("edit");
            }}
          >
            <Text color="gray.300">완료</Text>
          </Flex>

          {/* bgColor="gray.600" */}
          <Flex
            w="5em"
            h="2.5em"
            ml="1em"
            borderWidth={1}
            borderColor="gray.500"
            rounded="md"
            alignItems="center"
            justifyContent="center"
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              setCurModalContent("edit");
            }}
          >
            <Text color="gray.400">취소</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ModalPhoneEdit;
