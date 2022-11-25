import React, { useContext, useState } from "react";
import { ModalStateContext } from "../context/ModalContext";
import useModal from "../context/useModal";
// import usePlanter from "../context/usePlanter";
import PlanterCurStateContext from "../context/PlanterCurContext";
import ModalPlanter from "./ModalPlanter";
import ModalTopboardEdit from "./ModalTopboardEdit";

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
} from "@chakra-ui/react";

const MyModal = () => {
  const { getIsOpen, openModal, closeModal, setModalType, getModalType } =
    useModal();

  const { curPlanter } = useContext(PlanterCurStateContext);
  // const {
  //   getCurPlanter,
  //   setCurPlanter,
  //   getCurPlanterSetter,
  //   setCurPlanterSetter,
  // } = usePlanter();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // state context 를 소유해서 리프레시를 유도합니다
  const { isOpen, typeModal } = useContext(ModalStateContext);
  // const contentModal = () => {
  //   return <></>;
  // };
  const contentModal = () => {
    console.log("getmodaltype=", getModalType());
    // if (getModalType() === "planter") {
    if (typeModal == "planter") {
      console.log("modaltype is planter");
      // return <ModalPlanter planter={getCurPlanter()} />;
      return <ModalPlanter planter={curPlanter} />;
      // } else if (getModalType() == "topboard") {
      // } else if (getModalType() == "topboard") {
    } else if (typeModal == "topboard") {
      console.log("modaltype is topboard");
      // return <ModalTopboardEdit piecess={getCurPlanter().pieces} />;
      // return <ModalTopboardEdit piecess={curPlanter.pieces} />;
      return <ModalTopboardEdit piecess={curPlanter} />;
    }
  };
  return (
    <>
      {/* onClose={onClose} */}

      {/* 오브젝트형태로 넘겨주면 리턴값이 value가 아닌 referrence로 넘길수 있다고 해서 */}
      {/* 한번 해봤습니다 */}
      {/* isOpen={getIsOpen().isOpen} */}

      {/* isOpen={isOpen} */}
      <Modal
        isOpen={getIsOpen()}
        closeOnOverlayClick={true}
        onClose={closeModal}
        isCentered
        _focus={{ boxShadow: "none" }}
      >
        <ModalOverlay />
        <ModalContent w={["15em", "24em"]} bg="#2b2a33">
          {/* <ModalHeader>{curPlanter.plantName}</ModalHeader> */}
          {/* 포커스 focus시에 추한 란색 테두리를 제거합니다 */}
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          {contentModal()}
          {/* setCurPlanter={setCurPlanter} */}
          {/* <ModalBody mt={["1em", "2em"]} pb={6}> */}
          {/*   <Flex> */}
          {/* {contentModal} */}
          {/* </Flex> */}
          {/* </ModalBody> */}
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

export default MyModal;
