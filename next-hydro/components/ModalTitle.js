import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import useModal from "../context/useModal";

const ModalTitle = ({ planter }) => {
  const { setModalType } = useModal();
  return (
    <>
      <Flex flexWrap="nowrap" justify="center">
        {/* <Flex transform='translate(0, 0%)'> */}
        <Text
          justify="center"
          color="green.400"
          fontWeight="bold"
          // fontSize="1em"
          fontSize={["1.2em", "1.5em"]}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            setModalType("title");
          }}
        >
          {/* left="50%" */}
          {/* top="50%" */}
          {/* transform="translate(-10%,0%)" */}
          {planter.plantName}
        </Text>
      </Flex>
    </>
  );
};

export default ModalTitle;
