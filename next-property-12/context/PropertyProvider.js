import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  PropertyStateContext,
  PropertyDispatchContext,
} from "./PropertyContext";

const PropertyProvider = ({ children }) => {
  // const [curPage, setCurPage] = useState("apartments_page");
  const [curPage, setCurPage] = useState("");
  const [curOccupantDetails, setCurOccupantDetails] = useState({});
  const [curRoomDetails, setCurRoomDetails] = useState({});
  const [curRoom, setCurRoom] = useState({});
  const [fullProperties, setFullProperties] = useState([]);

  const fetchAll = async () => {
    const res = await fetch("/property/api/listjs");
    const full_properties = await res.json();
    console.log(full_properties);
    setFullProperties(full_properties);
    // return fullProperties;
  };

  const fetchRoomDetails = async (apartment, room_no) => {
    const requestOptions = {
      method: "POST",
      header: { "Content-Type:": "application/json" },
      body: JSON.stringify({
        apartment,
        room_no,
      }),
    };

    const res = await fetch("/property/api/roominfo", requestOptions);
    const cur = await res.json();
    console.log("PropertyProvider::curRoomDetails is::");
    console.log(cur);
    setCurRoomDetails(cur);
  };

  const fetchOccupantDetails = async (uid) => {
    const requestOptions = {
      method: "POST",
      header: { "Content-Type:": "application/json" },
      body: JSON.stringify({
        uid,
      }),
    };

    const res = await fetch("/property/api/occupantinfo", requestOptions);
    const cur = await res.json();
    console.log("PropertyProvider::curOccupantDetails is::");
    console.log(cur);
    setCurOccupantDetails(cur);
  };

  const dispatch = useMemo(() => {
    return {
      setCurPage,
      fetchAll,
      fetchOccupantDetails,
      fetchRoomDetails,
    };
  }, []);

  return (
    <PropertyStateContext.Provider
      value={{
        curPage,
        fullProperties,
        curOccupantDetails,
        curRoomDetails,
        curRoom,
      }}
    >
      <PropertyDispatchContext.Provider value={dispatch}>
        {children}
      </PropertyDispatchContext.Provider>
    </PropertyStateContext.Provider>
  );
};

export default PropertyProvider;
