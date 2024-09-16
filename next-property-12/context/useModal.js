import React, { useCallback, useContext } from "react";
import { ModalDispatchContext, ModalStateContext } from "./ModalContext";
import useProperty from "./useProperty";

const useModal = () => {
  const { isOpen, curRoom, curModalContent } = useContext(ModalStateContext);
  const { open, close, setCurRoom, setIsOpen, setCurModalContent } =
    useContext(ModalDispatchContext);

  const {
    fetchOccupantDetails,
    fetchRoomDetails,
    getCurRoomDetails,
    getCurOccupantDetails,
  } = useProperty();

  const openModal = useCallback(async (cur, content) => {
    await fetchRoomDetails(cur.apartment, cur.room_no);
    await fetchOccupantDetails(cur.occupant_id);

    setCurModalContent(content);
    setCurRoom(cur);
    setIsOpen(true);
    open();
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    close();
  }, []);

  return {
    isOpen,
    curRoom,
    curModalContent,
    setCurModalContent,
    openModal,
    closeModal,
  };
};

export default useModal;
