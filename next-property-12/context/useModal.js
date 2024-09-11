import React, { useCallback, useContext } from "react";
import { ModalDispatchContext, ModalStateContext } from "./ModalContext";

const useModal = () => {
  const { isOpen, curRoom } = useContext(ModalStateContext);
  const { open, close, setCurRoom, setIsOpen } =
    useContext(ModalDispatchContext);

  const openModal = useCallback((cur) => {
    setCurRoom(cur);
    setIsOpen(true);
    open();
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    close();
  }, []);

  return {
    curRoom,
    openModal,
    closeModal,
  };
};

export default useModal;
