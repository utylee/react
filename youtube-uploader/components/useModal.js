import React, { useContext, useCallback, useMemo } from "react";
import {
  ModalDispatchContext,
  ModalStateContext,
} from "../contexts/ModalContext";

const useModal = () => {
  const { changed, isOpen, curFile, websocket, playlists } =
    useContext(ModalStateContext);
  const {
    open,
    close,
    setChanged,
    setIsOpen,
    setCurfile,
    setPlaylists,
    setWebsocket,
  } = useContext(ModalDispatchContext);

  const getCurrentWebsocket = useMemo(() => {
    websocket;
  });
  const setCurrentWebsocket = useCallback((f) => {
    setWebsocket(f);
  });

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

  return {
    openModal,
    closeModal,
    changed,
    setChanged,
    isOpen,
    curFile,
    setCurfile,
    playlists,
    setPlaylists,
    setCurrentWebsocket,
    getCurrentWebsocket,
  };
};

export default useModal;
