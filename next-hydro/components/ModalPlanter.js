import React, { useReducer } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import Planter from "./Planter";
import Topboard from "./Topboard";
import GrowthGauge from "./GrowthGauge";


const reducer = (contentModal, { action, payload }) => {
  switch (action) {
    case "modal":
      return (
        <>
          <Planter
            key={Math.random()}
            planter={curPlanter.current}
            curPlanter={curPlanter}
            onOpen={onOpen}
            isModal={1}
            setTypeModal={setTypeModal}
          />
        </>
      );
      break;
    case "topboard":
      console.log("topboard?");
      return (
        <>
          <Flex pl={0} w="full" h="full">
            {/* 상판 */}
            <Topboard
              setTypeModal={setTypeModal}
              isModal={1}
              piecess={curPlanter.current.pieces}
            />
            {/* 식물 성장도 */}
            {/* <Flex ml={2} bg="teal.200" w="1.3em" h="full" borderRadius='md'></Flex> */}
            <GrowthGauge isModal={1} gauge={curPlanter.current.growth} />
          </Flex>
        </>
      );
      break;

    default:
      break;
  }
};

const ModalPlanter = ({
  isOpen,
  onOpen,
  onClose,
  curPlanter,
  typeModal,
  setTypeModal,
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const [typeModal, setTypeModal] = useState("modal");
  const [contentModal, dispatch] = useReducer(reducer, []);
  const modalSelector = (typeModal) => {
    if (typeModal === "modal") {
      return (
        <>
          <Planter
            key={Math.random()}
            planter={curPlanter.current}
            curPlanter={curPlanter}
            onOpen={onOpen}
            isModal={1}
            setTypeModal={setTypeModal}
          />
        </>
      );
    } else typeModal === "topboard";
    {
      console.log("topboard?");
      return (
        <>
          <Flex pl={0} w="full" h="full">
            {/* 상판 */}
            <Topboard
              setTypeModal={setTypeModal}
              isModal={1}
              piecess={curPlanter.current.pieces}
            />
            {/* 식물 성장도 */}
            {/* <Flex ml={2} bg="teal.200" w="1.3em" h="full" borderRadius='md'></Flex> */}
            <GrowthGauge isModal={1} gauge={curPlanter.current.growth} />
          </Flex>
        </>
      );
    }
  };
  return (
    <>
      {console.log(curPlanter)}

      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        _focus={{ boxShadow: "none" }}
      >
        <ModalOverlay />
        <ModalContent w={["15em", "24em"]} bg="#2b2a33">
          {/* <ModalHeader>{curPlanter.plantName}</ModalHeader> */}
          {/* <ModalHeader>{curPlanter.plantName}</ModalHeader> */}
          {/* <ModalHeader></ModalHeader> */}
          {/* 포커스 focus시에 추한 란색 테두리를 제거합니다 */}
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          {/* setCurPlanter={setCurPlanter} */}
          <ModalBody mt={["1em", "2em"]} pb={6}>
            {/* <Flex align="center" justify="center"> */}
            <Flex>
              {contentModal}

              {/* {modalSelector(typeModal)} */}

              {/* <Planter */}
              {/*   key={Math.random()} */}
              {/*   planter={curPlanter.current} */}
              {/*   curPlanter={curPlanter} */}
              {/*   onOpen={onOpen} */}
              {/*   isModal={1} */}
              {/* /> */}
            </Flex>
          </ModalBody>

          {/* <ModalFooter> */}
          {/*   <Button colorScheme="teal" onClick={onClose}> */}
          {/*     닫기 */}
          {/*   </Button> */}
          {/* </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPlanter;
