import { Stack, Flex, Input, Radio, RadioGroup, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useModal from "../context/useModal";

const ModalNameSexEdit = ({ curRoomDetails, curOccupantDetails }) => {
  const [sex, setSex] = useState(curOccupantDetails.sex);
  const nameRef = useRef(undefined);
  const { setCurModalContent, setCurModalPosition } = useModal();
  return (
    <>
      <Flex direction="column" w="100%" alignItems="center" overflowY="auto">
        {/* <Flex>{curRoomDetails.occupant_name}</Flex> */}
        {/* 이름수정란입니다 */}
        <Flex w="12em" mb="1.5em" alignItems="center" justifyContent="center">
          <Flex w="4em" h="2em">
            <Text mt="0.5em" color="gray.400" fontSize="lg">
              이름
            </Text>
          </Flex>
          <Input
            textAlign="center"
            w="5em"
            autoFocus
            ref={nameRef}
            size="md"
            borderBottomWidth={1}
            borderColor="gray.500"
            rounded={0}
            placeholder={curRoomDetails.occupant_name}
            variant="unstyled"
            defaultValue={curRoomDetails.occupant_name}
            textColor="gray.100"
            fontSize="2xl"
          />
          {/* value={curRoomDetails.occupant_name} */}
        </Flex>

        {/* 성별수정란입니다 */}
        <Flex mb={["2em", "2em"]}>
          <Flex w="4em" h="2em">
            <Text mt="0em" color="gray.400" fontSize="lg">
              성별
            </Text>
          </Flex>
          <RadioGroup
            onChange={setSex}
            defaultValue={curOccupantDetails.sex == "male" ? "male" : "female"}
          >
            <Stack direction="row" spacing="2em">
              <Radio value="male">
                <Text color="gray.200" fontSize="lg">
                  남성
                </Text>
              </Radio>
              <Radio value="female">
                <Text color="gray.200" fontSize="lg">
                  여성
                </Text>
              </Radio>
            </Stack>
          </RadioGroup>
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
              console.log("name is...");
              console.log(nameRef.current.value);
              console.log("sex is...");
              console.log(sex);
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

export default ModalNameSexEdit;
