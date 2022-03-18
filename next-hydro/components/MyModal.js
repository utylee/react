import React, { useState } from "react";
import { ModalStateContext } from "../context/ModalContext";
import useModal from "../context/useModal";
import ModalPlanter from "./ModalPlanter";
import ModalTopboard from "./ModalTopboard";

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

  // state context 를 소유해서 리프레시를 유도합니다
  const typeModal = useContext(ModalStateContext);
  const contentModal = () => {
    return <></>;
  };
  // const contentModal = () => {
  //   if (getModalType === "planter") {
  //     return <ModalPlanter />;
  //   } else if (getModalType === "topboard") {
  //     return <ModalTopboard />;
  //   }
  // };
  return (
    <>
      <Modal
        isOpen={getIsOpen}
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

          {contentModal}

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
