import React, { useContext } from "react";
import {
  PropertyDispatchContext,
  PropertyStateContext,
} from "./PropertyContext";

const useProperty = () => {
  const {
    curPage,
    fullProperties,
    curOccupantDetails,
    curRoomDetails,
    curRoom,
  } = useContext(PropertyStateContext);
  const { setCurPage, fetchAll, fetchOccupantDetails, fetchRoomDetails } =
    useContext(PropertyDispatchContext);

  const getCurPage = () => curPage;
  const getCurOccupantDetails = () => curOccupantDetails;
  const getCurRoomDetails = () => curRoomDetails;
  const getFullProperties = () => fullProperties;

  return {
    setCurPage,
    getCurPage,
    getCurOccupantDetails,
    getCurRoomDetails,
    curRoom,
    fetchAll,
    fetchOccupantDetails,
    fetchRoomDetails,
    getFullProperties,
  };
};

export default useProperty;
