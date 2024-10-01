import { Stack, Flex, Input, Radio, RadioGroup, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import useModal from "../context/useModal";
import useProperty from "../context/useProperty";

const ModalNameSexEdit = ({ curRoom }) => {
  const refName = useRef(undefined);
  const { setCurModalContent, setCurModalPosition } = useModal();
  const {
    curOccupantDetails,
    curRoomDetails,
    updateRoomDetails,
    updateOccupantDetails,
    fetchRoomDetails,
    fetchOccupantDetails,
  } = useProperty();
  const [inputName, setInputName] = useState(curOccupantDetails.name);

  const [cursex, setCurSex] = useState(curOccupantDetails.sex);
  const [curage, setCurAge] = useState(curOccupantDetails.age);
  // const [inputNumber, setInputNumber] = useState(curOccupantDetails.phone);

  const updateNameSexEdit = () => {
    let { name, sex, age, ...restOccupantDetails } = curOccupantDetails;
    let { occupant_name, ...restRoomDetails } = curRoomDetails;

    let objOccupant = {
      name: refName.current.value.trim(),
      sex: cursex,
      age: curage,
      ...restOccupantDetails,
    };

    let objRoom = {
      occupant_name: refName.current.value.trim(),
      ...restRoomDetails,
    };

    updateRoomDetails(objRoom);
    updateOccupantDetails(objOccupant);

    // fetchRoomDetails(curRoom.apartment, curRoom.room_no);
    // fetchOccupantDetails(curRoom.occupant_id);
  };

  useEffect(() => {
    console.log("ModalNameSexEdit::useEffect::setInputName..");
    console.log(curOccupantDetails.name);
    setInputName(curOccupantDetails.name);
  }, []);

  return (
    <>
      <Flex direction="column" w="100%" overflowY="auto">
        {/* <Flex>{curRoomDetails.occupant_name}</Flex> */}
        {/* 이름수정란입니다 */}
        {/* <Flex w="14em" mb="1.5em" alignItems="center" justifyContent="center"> */}
        <Flex
          mb="2em"
          w={["15em", "18em"]}
          rounded="lg"
          alignSelf="center"
          justifyContent="center"
          borderWidth={1}
          borderColor="gray.600"
          direction="column"
          pt="1.5em"
          pb="1.8em"
        >
          {/* mt={["1em", "2em"]} */}
          <Flex ml={["1.5em", "2em"]}>
            {/* <Text mt="0.5em" color="gray.400" fontSize=""> */}
            <Text w={["3em"]} mt="0.3em" color="gray.400" fontSize="1em">
              이름
            </Text>
            {/* defaultValue={curOccupantDetails.phone} */}
            {/* placeholder={curOccupantDetails.phone} */}
            <Input
              autoFocus
              ml={["0.5em", "1em"]}
              textAlign="center"
              w="5em"
              autoFocus
              ref={refName}
              size="md"
              borderBottomWidth={1}
              borderColor="gray.500"
              rounded={0}
              placeholder={inputName}
              defaultValue={inputName}
              variant="unstyled"
              textColor="gray.100"
              fontSize="xl"
            />
          </Flex>

          {/* 성별입니다 */}
          <Flex mt={["0.7em", "1em"]} ml={["1.5em", "2em"]}>
            {/* <Text mt="0.5em" color="gray.400" fontSize=""> */}
            <Text w="3em" mt="0.3em" color="gray.400" fontSize="1em">
              성별
            </Text>
            <Flex w="100%" justifyContent="center">
              {/* ml={["1.5em"]} */}
              <RadioGroup
                px="1em"
                mt="0.3em"
                colorScheme="teal"
                defaultValue={curOccupantDetails.sex}
                onChange={setCurSex}
              >
                <Radio spacing="0.2em" colorScheme="teal" value="male">
                  <Text color="gray.300">남성</Text>
                </Radio>
                <Radio spacing="0.2em" ml={["1.5em", "2em"]} value="female">
                  <Text color="gray.300">여성</Text>
                </Radio>
              </RadioGroup>
            </Flex>
          </Flex>

          {/* 연령입니다 */}
          <Flex mt={["1em", "1em"]} ml={["1.5em", "2em"]}>
            {/* <Text mt="0.5em" color="gray.400" fontSize=""> */}
            <Text w="2.5em" mt="0.3em" color="gray.400" fontSize="1em">
              연령
            </Text>
            <Flex w="100%" justifyContent="center">
              {/* ml={["1.5em"]} */}
              {/* defaultValue={ */}
              {/*   curOccupantDetails.age === "young" */}
              {/*     ? "청년" */}
              {/*     : curOccupantDetails.age === "old" */}
              {/*     ? "노년" */}
              {/*     : "중년" */}
              {/* } */}
              <RadioGroup
                px="0.5em"
                mt="0.3em"
                colorScheme="teal"
                defaultValue={curOccupantDetails.age}
                onChange={setCurAge}
              >
                <Radio spacing="0.2em" colorScheme="teal" value="young">
                  <Text color="gray.300">청년</Text>
                </Radio>
                <Radio spacing="0.2em" ml={["0.5em", "1em"]} value="middle">
                  <Text color="gray.300">중년</Text>
                </Radio>
                <Radio spacing="0.2em" ml={["0.5em", "1em"]} value="old">
                  <Text color="gray.300">노년</Text>
                </Radio>
              </RadioGroup>
            </Flex>
          </Flex>
        </Flex>

        {/* 수정완료 및 취소 버튼 */}
        <Flex mb="0.4em" alignSelf="center">
          <Flex
            w="5.2em"
            h="2.2em"
            bgColor="gray.600"
            borderWidth={1}
            borderColor="gray.500"
            rounded="md"
            alignItems="center"
            justifyContent="center"
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              // api에 수정된 정보를 전송해줍니다
              updateNameSexEdit();

              // 모달페이지를 설정해줍니다
              setCurModalPosition("namesex");
              setCurModalContent("edit");
            }}
          >
            <Text color="gray.300" fontSize="1.05em">
              완료
            </Text>
          </Flex>

          {/* bgColor="gray.600" */}
          <Flex
            w="5.2em"
            h="2.2em"
            ml="1.7em"
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
            <Text color="gray.300" fontSize="1.05em">
              취소
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ModalNameSexEdit;
