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
  const {
    setCurPage,
    fetchAll,
    fetchOccupantDetails,
    fetchRoomDetails,
    fetchProperty,
    updateOccupantDetails,
    updateRoomDetails,
    updateProperty,
  } = useContext(PropertyDispatchContext);

  const getCurPage = () => curPage;
  const getCurOccupantDetails = () => curOccupantDetails;
  const getCurRoomDetails = () => curRoomDetails;
  const getFullProperties = () => fullProperties;

  return {
    setCurPage,
    getCurPage,
    getCurOccupantDetails,
    getCurRoomDetails,
    curRoomDetails,
    curOccupantDetails,
    curRoom,
    fetchAll,
    fetchOccupantDetails,
    fetchRoomDetails,
    fetchProperty,
    updateOccupantDetails,
    updateRoomDetails,
    updateProperty,
    getFullProperties,
  };
};

export default useProperty;
