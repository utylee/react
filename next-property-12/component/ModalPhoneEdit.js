import { Stack, Flex, Input, Radio, RadioGroup, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import useModal from "../context/useModal";
import useProperty from "../context/useProperty";

const ModalPhoneEdit = ({ curRoom }) => {
  const phoneRef = useRef(undefined);
  const { setCurModalContent, setCurModalPosition } = useModal();
  const {
    curOccupantDetails,
    curRoomDetails,
    updateRoomDetails,
    updateOccupantDetails,
  } = useProperty();
  const [inputNumber, setInputNumber] = useState("");
  // const [inputNumber, setInputNumber] = useState(curOccupantDetails.phone);

  const updatePhoneEdit = () => {
    let { phone, ...rest } = curOccupantDetails;
    // - 가 들어간 input value에서 -를 다시 제거해줍니다
    let objOccupant = {
      phone: phoneRef.current.value.trim().replace(/-/g, ""),
      ...rest,
    };

    updateOccupantDetails(objOccupant);
  };

  const phoneFormatter = (str) => {
    let company = str.slice(0, 3);
    let middle = str.slice(3, str.length - 4);
    let last = str.slice(-4);

    console.log("ModalPhoneEdit::phoneFormatter::done");

    return company + "-" + middle + "-" + last;
  };

  const manipulateHiphen = (key) => {
    console.log("ModalPhoneEdit::manipulateHiphen::key pushed");
    let result = "";
    let num = phoneRef.current.value.trim().replace(/-/g, "");
    console.log("ModalPhoneEdit::manipulateHiphen::num is ");
    console.log(num);

    // backspace 일 때는 행하지 않습니다. 더이상 backspace로 지워지지 않는 문제가
    // 생겼습니다
    if (key !== "Backspace") {
      if (num?.length >= 3) {
        result = num.slice(0, 3) + "-";

        if (num?.length < 7) {
          result += num.slice(3);
        } else {
          result += num.slice(3, 7) + "-" + num.slice(7);
        }

        // setInputNumber(result);
        phoneRef.current.value = result;
      }
    }
  };

  useEffect(() => {
    console.log("ModalPhoneEdit::useEffect::setInputNumber..");
    console.log(phoneFormatter(curOccupantDetails.phone));
    setInputNumber(phoneFormatter(curOccupantDetails.phone));
  }, []);

  return (
    <>
      <Flex direction="column" w="100%" overflowY="auto">
        {/* <Flex>{curRoomDetails.occupant_name}</Flex> */}
        {/* 전화번호수정란입니다 */}
        {/* <Flex w="14em" mb="1.5em" alignItems="center" justifyContent="center"> */}
        <Flex mb="2em" alignItems="center" justifyContent="center">
          <Flex ml={["0.5em", "2em"]}>
            {/* <Text mt="0.5em" color="gray.400" fontSize=""> */}
            <Text mt="0.3em" color="gray.400" fontSize="1em">
              전화번호
            </Text>
          </Flex>
          {/* defaultValue={curOccupantDetails.phone} */}
          {/* placeholder={curOccupantDetails.phone} */}
          <Input
            ml={["0.5em", "1em"]}
            textAlign="center"
            w="8em"
            autoFocus
            ref={phoneRef}
            size="md"
            borderBottomWidth={1}
            borderColor="gray.500"
            rounded={0}
            placeholder={inputNumber}
            defaultValue={inputNumber}
            variant="unstyled"
            textColor="gray.100"
            fontSize="xl"
            onKeyDown={(e) => {
              manipulateHiphen(e.key);
            }}
          />
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
              updatePhoneEdit();

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

export default ModalPhoneEdit;
