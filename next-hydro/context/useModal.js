import React, { useContext } from "react";
import { ModalDispatchContext } from "./ModalContext";

export default function useModal() {
  // state context를 가지고 있으면 해당 사용컴포넌트가 리렌더됩니다
  // const type = useContext(ModalStateContext);
  // const setType = useContext(ModalDispatchContext);
  const { onOpen, onClose, getIsOpen, getModalType, setModalType, setIsOpen } =
    useContext(ModalDispatchContext);

  // const setModalType = (modalType) => {
  //   setType(modalType);
  // };

  const openModal = () => {
    console.log("openModal clicked");
	  
    //사실 별도 dispatch방식이 아닌 그냥 provider의 isopen을 그대로 대입했다면
    //필요없는 방식입니다. chakraui의 modal컴포넌트 구조를 잘 몰라서 내가 직접
    //isOpen을 세팅해줘도 되나 보는 차원에서 해봅니다. 괜찮게 되는군요
    setIsOpen(true);
    onOpen();
  };
  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return { getIsOpen, getModalType, setModalType, openModal, closeModal };
}
