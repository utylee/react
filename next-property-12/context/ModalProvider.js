import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState, useMemo } from "react";
import { ModalDispatchContext, ModalStateContext } from "./ModalContext";

const ModalProvider = ({ children }) => {
  let { isOpen, onOpen, onClose } = useDisclosure();
  const [curRoom, setCurRoom] = useState({});

  const open = () => {
    onOpen();
  };
  const close = () => {
    onClose();
  };

  const setIsOpen = (b) => {
    isOpen = b;
  };

  const dispatch = useMemo(() => {
    return { open, close, setCurRoom, setIsOpen };
  }, []);

  return (
    <ModalStateContext.Provider value={{ isOpen, curRoom }}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
