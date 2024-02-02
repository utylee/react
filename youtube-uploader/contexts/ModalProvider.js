import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { ModalStateContext, ModalDispatchContext } from "./ModalContext";
import { useDisclosure } from "@chakra-ui/react";
// import MyModal from "../components/MyModal";

const ModalProvider = ({ children }) => {
  let { isOpen, onOpen, onClose } = useDisclosure();
  const [val, setVal] = useState(0);
  const [curFile, setCurfile] = useState({});
  const [websocket, setWebsocket] = useState();

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
    () => ({
      dummyFunc,
      setVal,
      open,
      close,
      setIsOpen,
      setCurfile,
      setWebsocket,
    }),
    []
  );

  return (
    <ModalStateContext.Provider value={{ val, isOpen, curFile, websocket }}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {/* <MyModal /> */}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
