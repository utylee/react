import React, { useContext, useEffect, useRef } from "react";
import {
  Flex,
  Text,
  Input,
  Button,
  Box,
  IconButton,
  Img,
  VStack,
} from "@chakra-ui/react";
import useModal from "../context/useModal";
import usePlanters from "../context/usePlanters";
import {
  PlantersSettersContext,
  PlantersStateContext,
} from "../context/PlantersContext";
import usePlanterCur from "../context/usePlanterCur";

const ModalTitleEdit = ({ planter }) => {
  const titleInputRef = useRef(undefined);
  const { setModalType, closeModal } = useModal();
  const { postJson } = usePlanters();
  const handleFinishClick = () => {
    console.log("finish clicked");
    // closeModal();
    setModalType("planter");
  };
  console.log("modaledit:render");
  // const { setters } = useContext(PlantersStateContext);
  const setters = useContext(PlantersSettersContext);
  const { setCurPlanter } = usePlanterCur();

  const onConfirm = async () => {
    if (titleInputRef.current.value.trim().length != 0) {
      const newPlanter = { ...planter };

      const { plantName, ...rest } = newPlanter;
      newPlanter = { ...rest, plantName: titleInputRef.current.value.trim() };
      console.log(
        "ModalTitleEdit:OnConfirm:newPlanter: " + newPlanter.plantName
      );
      setters[newPlanter.id](newPlanter);
      setCurPlanter({ ...newPlanter });
      await postJson(newPlanter);
    }
    handleFinishClick();
  };

  useEffect(() => {
    console.log("modal edit useEffects");
    // 인풋에 포커싱을 줍니다
    titleInputRef.current.focus();
    titleInputRef.current.value = planter.plantName;
  }, []);

  return (
    <>
      <VStack
        px={["0.8em", "3.2em"]}
        py={["1.2em", "1.5em", "3em"]}
        justify="center"
      >
        {/* h={["1.2em", "2.3em"]} */}
        {/* backgroundColor="gray.700" */}
        {/* <Flex alignItems="left"> */}
        {/*   <Text mb="0.5em" color="gray.300" fontSize="2xl"> */}
        {/*     작물명 변경: */}
        {/*   </Text> */}
        {/* </Flex> */}
        {/* variant="outline" */}

        {/* 작물 아이콘 */}
        <Flex
          w={["2em", "2em", "3em"]}
          h={["2em", "2em", "3em"]}
          borderWidth={2}
          borderColor="gray.500"
          borderRadius={"full"}
          overflow="hidden"
          mb={["1em", "0.5em", "1.2em"]}
        >
          <Img w="100%" h="100%" src={"hydro/public/" + planter.imageUrl} />
        </Flex>

        <Flex justify={"center"}>
          {/* width="auto" */}
          {/* textDecoration="underline" */}
          {/* rounded="lg" */}

          {/* 아이폰 사파리에서 (iphone safari) 렌더링 후 useEffect focus()가 안먹혀서 */}
          {/* autofocus 속성을 줬더니 되었습니다 */}
          <Input
            autoFocus
            ref={titleInputRef}
            size="lg"
            width={["6em", "6em", "7em"]}
            borderBottomWidth={1}
            variant="unstyled"
            placeholder={planter.plantName}
            _placeholder={{
              color: "gray.600",
              fontWeight: "normal",
            }}
            borderColor="gray.600"
            rounded="0"
            mb={["1em", "1em", "1.5em"]}
            textColor="green.300"
            fontSize={["1.2em", "1.2em", "1.8em"]}
            fontWeight="medium"
            onKeyPress={(e) => {
              // 아무 입력값이 없을 경우 enter가 반응이 없게 만듭니다
              e.key === "Enter"
                ? titleInputRef.current.value.trim().length === 0
                  ? null
                  : onConfirm()
                : null;
            }}
          />
        </Flex>
        <Flex>
          <Button onClick={() => onConfirm()} colorScheme="teal">
            완료
          </Button>
        </Flex>
      </VStack>
    </>
  );
};

export default ModalTitleEdit;
