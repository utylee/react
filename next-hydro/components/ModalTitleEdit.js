import React, { useContext, useRef } from "react";
import {
  Flex,
  Text,
  Input,
  Button,
  Box,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import useModal from "../context/useModal";
import usePlanters from "../context/usePlanters";
import { PlantersStateContext } from "../context/PlantersContext";
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
  const { setters } = useContext(PlantersStateContext);
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

  return (
    <>
      <VStack px={["0.8em", "3.2em"]} py={["0.8em", "5em"]}>
        {/* h={["1.2em", "2.3em"]} */}
        {/* backgroundColor="gray.700" */}
        <Flex alignItems="left">
          <Text mb="0.5em" color="gray.300" fontSize="2xl">
            작물명 변경:
          </Text>
        </Flex>
        <Input
          ref={titleInputRef}
          size="lg"
          width="auto"
          variant="outline"
          placeholder={planter.plantName}
          _placeholder={{ color: "green.300", fontWeight: "bold" }}
          rounded="lg"
          mb={"3em"}
          onKeyPress={(e) => {
            // 아무 입력값이 없을 경우 enter가 반응이 없게 만듭니다
            e.key === "Enter"
              ? titleInputRef.current.value.trim().length === 0
                ? null
                : onConfirm()
              : null;
          }}
        />

        <Button onClick={() => onConfirm()} colorScheme="teal">
          완료
        </Button>
      </VStack>
    </>
  );
};

export default ModalTitleEdit;
