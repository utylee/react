import React, { useRef, useEffect, useState } from "react";
import {
  Input,
  Box,
  Text,
  VStack,
  Flex,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import useModal from "../context/useModal";
import usePlanters from "../context/usePlanters";

const ModalGerminatyEdit = ({ gem }) => {
  const borderLeft = ["0.6em", "0.7em", "0.8em"];

  const { isOpen, onToggle } = useDisclosure();

  const firstGemRef = useRef();
  const secondGemRef = useRef();

  const [thisGem, setThisGem] = useState(gem);
  const [isWarning, setIsWarning] = useState(0);
  const [isTextEdit, setIsTextEdit] = useState(false);
  const [keyForRender, setKeyForRender] = useState(Date.now());
  // const [editPosition, setEditPosition] = useState(0);
  let editPosition = 0;
  const { closeModal } = useModal();
  const { postJson } = usePlanters();

  const handleFinishClick = () => {
    closeModal();
  };

  useEffect(() => {
    thisGem.waterGauge <= 25 ? setIsWarning(1) : setIsWarning(0);
  }, [thisGem.waterGauge]);

  return (
    <VStack mt={["3em", "1em", "2em"]}>
      {/* _hover={{ cursor: "pointer" }} */}
      {/* onClick={() => { */}
      {/* setCurGem({ ...thisGem }); */}
      {/* setModalType("germinaty"); */}
      {/* openModal(); */}
      {/* }} */}

      {/* 입력 안내문구 */}
      {/* <InfoInputText /> */}

      {/* 상판 */}
      {/* <BaseBoard> */}

      <Flex
        w="full"
        justify="center"
        position="relative"
        mb={["5em", "1em", "8em"]}
      >
        {/* 기본텍스트 상판 */}
        {/* zIndex 5 */}
        <DefaultTextBoard
          thisGem={thisGem}
          firstGemRef={firstGemRef}
          secondGemRef={secondGemRef}
          setIsTextEdit={setIsTextEdit}
        />

        {/* 숨겨진 Input 상판 */}
        {/* zIndex 1 / 10 */}
        <HiddenInputBoard editPosition={editPosition} isTextEdit={isTextEdit} />

        {/* 숨겨진 텍스트 입력완료버튼 */}
        {/* zIndex = 2 */}
        <HiddenFinishButton
          setIsTextEdit={setIsTextEdit}
          isTextEdit={isTextEdit}
        />
      </Flex>
      {/* </BaseBoard> */}

      {/* 수위게이지 */}
      <WaterGauge thisGem={thisGem} isTextEdit={isTextEdit} />

      {/* 전체입력완료버튼 */}
      {/* <FinishButton key={keyForRender} /> */}
      <FinishButton
        isTextEdit={isTextEdit}
        handleFinishClick={handleFinishClick}
      />
    </VStack>
  );
};

/* 입력 안내문구 */
const InfoInputText = ({ isTextEdit }) => {
  return (
    <Flex
      transition={"0.3s"}
      w={["10em", "12em", "15em"]}
      h={isTextEdit ? ["1em", "0.5em", "1.5em"] : "0em"}
      justify={"center"}
    >
      <Text
        fontSize={["sm", "md", "md"]}
        color="gray.500"
        opacity={isTextEdit ? "0" : "0"}
        transition={"opacity 0.3s"}
      >
        수정 후 enter를 눌러주세요
      </Text>
    </Flex>
  );
};

// 상판
const BaseBoard = ({ children }) => {
  return (
    <Flex
      w="full"
      justify="center"
      position="relative"
      mb={["5em", "1em", "1.3em"]}
    >
      {children}
    </Flex>
  );
};

// 기본텍스트 상판
const DefaultTextBoard = ({
  thisGem,
  firstGemRef,
  secondGemRef,
  editPosition,
  setIsTextEdit,
}) => {
  return (
    <Flex
      py="1em"
      position={"absolute"}
      align="center"
      w={["14em", "18em", "20em"]}
      h={["5em", "18em", "8em"]}
      bg="gray.800"
      borderRadius="lg"
      justify="space-between"
      zIndex={5}
    >
      {/* w={["14.2em", "18em", "17em"]} */}
      {/* h={["4.5em", "4em", "7em"]} */}
      {/* justify="space-between" */}
      {/* px={["1em", "1em", "1em"]} */}
      {/* py={["1em", "0.5em", "1em"]} */}

      {/* <span>ㅋㅋㅋㅋㅋ</span> */}
      {/* {gem.seedNames.map((seedName) => { */}
      {/* key={Math.floor(Math.random() * 1000000)} */}
      {thisGem.seedNames.map((sn, index) => {
        return (
          <Flex
            key={index}
            _hover={{ cursor: "pointer" }}
            onClick={(e) => {
              // setKeyForRender(Date.now());
              editPosition = index;
              // console.log("MGemEdit:editPosition is : " + editPosition);
              setIsTextEdit((isTextEdit) => !isTextEdit);
              // onToggle();
            }}
            mx={["1em", "2em", "1em"]}
            w={["6em", "4em", "7em"]}
            h={["3em", "4em", "4em"]}
            flexWrap="nowrap"
            borderRadius="5"
            bg="green.600"
            ref={index == 0 ? firstGemRef : secondGemRef}
          >
            {/* w="45%" */}
            {/* <Box w="40%" h="40%" justify={"center"}> */}
            {/* sx={{ WebkitTapHighlightColor: "transparent" }}> */}
            {/* w="4em" */}
            {/* h="80%" */}
            <Flex
              w="full"
              h="full"
              bg="green.600"
              justify={"center"}
              align={"center"}
              borderRadius="lg"
              position="relative"
            >
              {/* 텍스트 생략을 위한 구문 3종 세트 */}
              <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                color="gray.800"
                fontSize={["1.1em", "1.3em", "1.5em"]}
                // fontWeight="normal"
                // fontWeight="medium"
                fontWeight="medium"
              >
                {sn}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

// 숨겨진 텍스트 입력완료버튼
// / zIndex = 2 /
/* h={isTextEdit ? "2em" : "0em"} */
/* px={["1em", "1em", "1em"]} */
const HiddenFinishButton = ({ setIsTextEdit, isTextEdit }) => {
  return (
    <Flex
      justify={"center"}
      h={"4.5em"}
      transition="0.3s"
      position="absolute"
      w={["14em", "18em", "17em"]}
      py={["1em", "0.5em", "1em"]}
      mt={isTextEdit ? "4em" : "0em"}
      mb={["0.5em", "0.5em", "1.3em"]}
      bg="gray.600"
      borderRadius="lg"
      zIndex={2}
    >
      {/* display={isTextEdit ? "flex" : "none"} */}
      <Button
        mt="0.5em"
        w="10em"
        h="2em"
        colorScheme="teal"
        onClick={() => {
          // null;
          setIsTextEdit((isTextEdit) => !isTextEdit);
        }}
      >
        입력완료
      </Button>
    </Flex>
  );
};

// 숨겨진 Input 상판
// zIndex 10 / 1
const HiddenInputBoard = ({ editPosition, isTextEdit }) => {
  return (
    <Flex
      w="14em"
      justify="center"
      position="absolute"
      borderRadius="lg"
      bg="gray.600"
      zIndex={isTextEdit ? 10 : 1}
    >
      {/* width="auto" */}
      <Flex
        w="4em"
        bg="gray.300"
        display={editPosition == 0 ? "none" : "flex"}
      ></Flex>
      <Flex w="4em">
        <Input
          w="4em"
          size="lg"
          variant="unstyled"
          value="치커리"
          _placeholder={{
            color: "green.300",
            fontWeight: "bold",
          }}
          rounded="lg"
          mb={"3em"}
          zIndex={8}
        />
        {/* ref={titleInputRef} */}
        {/* placeholder={planter.plantName} */}
        {/* onKeyPress={(e) => { */}
        {/* 아무 입력값이 없을 경우 enter가 반응이 없게 만듭니다 */}
        {/* e.key === "Enter" */}
        {/* ? titleInputRef.current.value.trim().length === 0 */}
        {/* ? null */}
        {/* : onConfirm() */}
        {/* : null; */}
        {/* }} */}
        {/* 치커리 */}
        {/* </Input> */}
      </Flex>
      <Flex w="4em" display={editPosition == 0 ? "flex" : "none"}></Flex>
    </Flex>
  );
};

/* 수위게이지 */
const WaterGauge = ({ thisGem, isWarning }) => {
  return (
    <Flex
      w={["13em", "16em", "16em"]}
      h={["2.2em", "2em", "3em"]}
      borderRadius={["0.6em", "0.7em", "0.8em"]}
      bg={isWarning ? "#59110c" : "blue.800"}
    >
      {/* 바탕 */}
      {/* zIndex="2" */}
      {/* 알맹이 */}
      {/* bg={warning ? "red.700" : "blue.500"} */}
      <Flex
        w={() => {
          // return gem.waterGauge + "%";
          return thisGem.waterGauge + "%";
        }}
        borderLeftRadius={["0.6em", "0.7em", "0.8em"]}
        bg={isWarning ? "red.700" : "blue.500"}
      ></Flex>
    </Flex>
  );
};

/* 전체입력완료버튼 */
const FinishButton = ({ isTextEdit, handleFinishClick }) => {
  return (
    <Flex
      w="full"
      justify="center"
      position="relative"
      opacity={isTextEdit ? "0" : "255"}
      transition={"opacity 0.5s"}
    >
      {console.log("button rendered")}
      {console.log("isTextEdit:" + isTextEdit)}
      {/* opacity={"0"} */}
      {/* opacity={isTextEdit ? "0" : "255"} */}
      {/* transitionDuration={"2.5s"} */}
      {/* opacity={isOpen ? "0" : "255"} */}
      {/* transition={"opacity"} */}
      <Button
        size="lg"
        colorScheme={"teal"}
        mt={["1.5em", "2em", "2em"]}
        mb={["1em", "1.5em", "2em"]}
        onClick={() => {
          // isTextEdit ? null : handleFinishClick();
          handleFinishClick();
        }}
      >
        {/* <Button size="md" colorScheme="teal"> */}
        {/* <Text>{isTextEdit ? "xxx" : "완료"}</Text> */}
        <Text>완료</Text>
      </Button>
    </Flex>
  );
};

export default ModalGerminatyEdit;
