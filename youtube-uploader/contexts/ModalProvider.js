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
  // const [val, setVal] = useState(0);
  const [changed, setChanged] = useState(false);
  const [curFile, setCurfile] = useState({});
  const [playlists, setPlaylists] = useState({});
  const [websocket, setWebsocket] = useState();

  const dummyFunc = () => {
    return [1, 2];
  };
  const open = () => {
    onOpen();
  };
  const close = () => {
    setChanged(false);
    onClose();
  };

  const setIsOpen = (b) => {
    isOpen = b;
  };
  const dispatch = useMemo(
    () => ({
      dummyFunc,
      setChanged,
      open,
      close,
      setIsOpen,
      setCurfile,
      setPlaylists,
      setWebsocket,
    }),
    []
  );

  return (
    <ModalStateContext.Provider
      value={{ changed, isOpen, curFile, playlists, websocket }}
    >
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {/* <MyModal /> */}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export default ModalProvider;
