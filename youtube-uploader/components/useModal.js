import React, { useContext } from "react";
import {
  ModalDispatchContext,
  ModalStateContext,
} from "../contexts/ModalContext";

const useModal = () => {
  const { isOpen, curFile } = useContext(ModalStateContext);
  const { open, close, setIsOpen, setCurfile } =
    useContext(ModalDispatchContext);

  const openModal = (file) => {
    // alert(file.timestamp);
    console.log("open");
    setCurfile(file);
    setIsOpen(true);
    open();
    // alert(file);
  };
  const closeModal = () => {
    close();
  };

  return { openModal, closeModal, isOpen, curFile };
};

export default useModal;
