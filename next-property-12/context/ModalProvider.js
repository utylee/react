import { useDisclosure } from "@chakra-ui/react";
import React, { useState, useMemo } from "react";
import { ModalDispatchContext, ModalStateContext } from "./ModalContext";

const ModalProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [curRoom, setCurRoom] = useState({});
  const [curModalContent, setCurModalContent] = useState("");
  const [curModalPosition, setCurModalPosition] = useState("");

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
    return {
      open,
      close,
      setCurRoom,
      setIsOpen,
      setCurModalContent,
      setCurModalPosition,
    };
  }, []);

  return (
    <ModalStateContext.Provider
      value={{ isOpen, curRoom, curModalContent, curModalPosition }}
    >
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
