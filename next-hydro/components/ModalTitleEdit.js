import React, { useRef } from "react";
import { Input, Button, Box, IconButton, VStack } from "@chakra-ui/react";
import useModal from "../context/useModal";

const ModalTitleEdit = ({ planter }) => {
  const titleInputRef = useRef(undefined);
  const { closeModal } = useModal();
  const handleFinishClick = () => {
    console.log("finish clicked");
    closeModal();
  };
  return (
    <>
      <VStack px={["0.8em", "3.2em"]} py={["0.8em", "5em"]}>
        <Input
          ref={titleInputRef}
          h="sm"
          backgroundColor="gray.700"
          variant="filled"
          placeholder={planter.plantName}
          rounded="sm"
          mb={"3em"}
          onKeyPress={(e) => {
            e.key === "Enter" ? handleFinishClick() : null;
          }}
        />
        <Button mr={"2em"} colorScheme="teal">
          완료
        </Button>
      </VStack>
    </>
  );
};

export default ModalTitleEdit;
