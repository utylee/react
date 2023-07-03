import React, { useState, useContext, useMemo } from "react";
import { ModalStateContext, ModalDispatchContext } from "./ModalContext";
import { useDisclosure } from "@chakra-ui/react";
// import MyModal from "../components/MyModal";

const ModalProvider = ({ children }) => {
  let { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState(0);
  const [curFile, setCurfile] = useState({});
  const dummyFunc = () => {
    return [1, 2];
  };
  const open = () => {
    onOpen();
  };
  const close = () => {
    onClose();
  };

  const setIsOpen = (b) => {
    isOpen = b;
  };
  const dispatch = useMemo(
    () => ({ dummyFunc, setValue, open, close, setIsOpen, setCurfile }),
    []
  );

  return (
    <ModalStateContext.Provider value={{ value, isOpen, curFile }}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {/* <MyModal /> */}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
