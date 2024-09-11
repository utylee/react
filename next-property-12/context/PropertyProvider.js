import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  PropertyStateContext,
  PropertyDispatchContext,
} from "./PropertyContext";

const PropertyProvider = ({ children }) => {
  // const [curPage, setCurPage] = useState("apartments_page");
  const [curPage, setCurPage] = useState("");
  const [fullProperties, setFullProperties] = useState([]);

  const fetchAll = async () => {
    const res = await fetch("/property/api/listjs");
    const full_properties = await res.json();
    console.log(full_properties);
    setFullProperties(full_properties);
    // return fullProperties;
  };

  const dispatch = useMemo(() => {
    return {
      setCurPage,
      fetchAll,
    };
  }, []);

  return (
    <PropertyStateContext.Provider value={{ curPage, fullProperties }}>
      <PropertyDispatchContext.Provider value={dispatch}>
        {children}
      </PropertyDispatchContext.Provider>
    </PropertyStateContext.Provider>
  );
};

export default PropertyProvider;
