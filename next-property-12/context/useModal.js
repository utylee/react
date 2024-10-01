import React, { useCallback, useContext } from "react";
import { ModalDispatchContext, ModalStateContext } from "./ModalContext";
import useProperty from "./useProperty";

const useModal = () => {
  const { isOpen, curRoom, curModalContent, curModalPosition } =
    useContext(ModalStateContext);
  const {
    open,
    close,
    setCurRoom,
    setIsOpen,
    setCurModalContent,
    setCurModalPosition,
  } = useContext(ModalDispatchContext);

  const {
    fetchOccupantDetails,
    fetchRoomDetails,
    fetchAll,
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
    console.log("useModal::closeModal::fetchAll()");
	// 닫을 때 fetchAll로 FloorsPage를 업데이트해줍니다
    fetchAll();
    setIsOpen(false);
    close();
  }, []);

  return {
    isOpen,
    curRoom,
    curModalContent,
    curModalPosition,
    setCurModalContent,
    setCurModalPosition,
    openModal,
    closeModal,
  };
};

export default useModal;
