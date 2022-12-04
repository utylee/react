import React, { useRef } from "react";
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

const ModalTitleEdit = ({ planter }) => {
  const titleInputRef = useRef(undefined);
  const { closeModal } = useModal();
  const { postJson } = usePlanters();
  const handleFinishClick = () => {
    console.log("finish clicked");
    closeModal();
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
            e.key === "Enter" ? handleFinishClick() : null;
          }}
        />
        <Button onClick={() => closeModal()} colorScheme="teal">
          완료
        </Button>
      </VStack>
    </>
  );
};

export default ModalTitleEdit;
