import React, { useContext, useState } from "react";
import {
  ModalIsOpenContext,
  ModalStateContext,
  ModalTypeContext,
} from "../context/ModalContext";
import useModal from "../context/useModal";
// import usePlanter from "../context/usePlanter";
import { PlanterCurStateContext } from "../context/PlanterCurContext";
import ModalPlanter from "./ModalPlanter";
import ModalTopboardEdit from "./ModalTopboardEdit";
import ModalTitleEdit from "./ModalTitleEdit";
import ModalWaterGaugeEdit from "./ModalWaterGaugeEdit";
import ModalGrowthGaugeEdit from "./ModalGrowthGaugeEdit";
import ModalRootGaugeEdit from "./ModalRootGaugeEdit";
import ModalGerminatyEdit from "./ModalGerminatyEdit";

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
  // const { getIsOpen, openModal, closeModal, setModalType, getModalType } =
  const { closeModal, getModalType } = useModal();

  const { curGem, curPlanter } = useContext(PlanterCurStateContext);
  // const {
  //   getCurPlanter,
  //   setCurPlanter,
  //   getCurPlanterSetter,
  //   setCurPlanterSetter,
  // } = usePlanter();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // state context 를 소유해서 리프레시를 유도합니다
  // const { isOpen, typeModal } = useContext(ModalStateContext);

  // 리렌더링 최적화기법에 의해 각 state context를 객체가 아닌 분리했습니다
  const isOpen = useContext(ModalIsOpenContext); // 사용이 안되고 있었습니다
  const typeModal = useContext(ModalTypeContext);

  const contentModal = () => {
    console.log("getmodaltype=", getModalType());
    // if (getModalType() === "planter") {
    if (typeModal == "planter") {
      console.log("modaltype is planter");
      // return <ModalPlanter planter={getCurPlanter()} />;
      return <ModalPlanter planter={curPlanter} />;
    } else if (typeModal == "title") {
      console.log("modaltype is title");
      return <ModalTitleEdit planter={curPlanter} />;
    } else if (typeModal == "topboard") {
      console.log("modaltype is topboard");
      return <ModalTopboardEdit planter={curPlanter} />;
    } else if (typeModal == "watergauge") {
      console.log("modaltype is watergauge");
      return <ModalWaterGaugeEdit planter={curPlanter} />;
    } else if (typeModal == "growthgauge") {
      console.log("modaltype is growthgauge");
      return <ModalGrowthGaugeEdit planter={curPlanter} />;
    } else if (typeModal == "rootgauge") {
      console.log("modaltype is rootgauge");
      return <ModalRootGaugeEdit planter={curPlanter} />;
    } else if (typeModal == "germinaty") {
      console.log("modaltype is germinaty");
      return <ModalGerminatyEdit curGems={curGem} />;
    }
  };
  return (
    <>
      {/* onClose={onClose} */}

      {/* 오브젝트형태로 넘겨주면 리턴값이 value가 아닌 referrence로 넘길수 있다고 해서 */}
      {/* 한번 해봤습니다 */}
      {/* isOpen={getIsOpen().isOpen} */}

      {/* isOpen={getIsOpen()} */}
      <Modal
        isOpen={isOpen}
        closeOnOverlayClick={true}
        onClose={closeModal}
        isCentered
        _focus={{ boxShadow: "none" }}
        preserveScrollBarGap="true"
      >
        <ModalOverlay />
        {/* <ModalContent bg="#2b2a33"> */}
        {/* <ModalContent w={["16em", "18em", "26em"]} bg="#2b2a33"> */}
        <ModalContent maxW={["16em", "26em", "40em"]} bg="#2b2a33">
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
