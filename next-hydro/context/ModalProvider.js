import React, { useMemo, useState } from "react";
// import { ModalStateContext, ModalDispatchContext } from "./ModalContext";
import {
  ModalTypeContext,
  ModalIsOpenContext,
  ModalDispatchContext,
} from "./ModalContext";
import { useDisclosure } from "@chakra-ui/react";
// import MyModal from "../components/MyModal";

// **필요한 것들
//
// isopen도 글로벌하게 필요하다
// 현지 모달 컨텐츠 유형
// 유형에 따른 자료는 오브젝트로 mymodal이 개인적으로 관리하고 페치해온다

const ModalProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [typeModal, setTypeModal] = useState("planter");

  // 단어 순서가 앞뒤가 다릅니다. 주의
  const setModalType = (type) => {
    console.log("setModalType=>", type);

    setTypeModal(type);
  };
  const getIsOpen = () => {
    return isOpen;
  };
  const setIsOpen = (bl) => {
    isOpen = bl;
  };
  const getModalType = () => {
    return typeModal;
  };

  // 이 객체가 state변경으로 리렌더될 때 함수가 변경으로 처리되는 것을
  // 방지하기 위해 useMemo를 사용합니다
  const dispatch = useMemo(
    () => ({
      onOpen,
      onClose,
      getIsOpen,
      getModalType,
      setModalType,
      setIsOpen,
    }),
    []
  );

  return (
    <ModalIsOpenContext.Provider value={isOpen}>
      <ModalTypeContext.Provider value={typeModal}>
        <ModalDispatchContext.Provider value={dispatch}>
          {children}
          {/* <MyModal /> */}
          {/* <ModalStateContext.Provider value={{ isOpen, typeModal }}> */}
          {/* </ModalStateContext.Provider> */}
        </ModalDispatchContext.Provider>
      </ModalTypeContext.Provider>
    </ModalIsOpenContext.Provider>
  );
};

export default ModalProvider;
