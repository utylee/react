import React, { useContext, useCallback } from "react";
import {
  ModalDispatchContext,
  ModalStateContext,
} from "../contexts/ModalContext";

const useModal = () => {
  // console.log("useModal rendered");
  const { isOpen, curFile } = useContext(ModalStateContext);
  const { open, close, setIsOpen, setCurfile } =
    useContext(ModalDispatchContext);

  const openModal = useCallback((file) => {
    // alert(file.timestamp);
    console.log("useModal:openModal:open");
    setCurfile(file);
    setIsOpen(true);
    open();
    // alert(file);
  }, []);
  const closeModal = useCallback(() => {
    close();
  }, []);

  return { openModal, closeModal, isOpen, curFile };
};

export default useModal;
