import React, { useContext } from "react";
import {
  PropertyDispatchContext,
  PropertyStateContext,
} from "./PropertyContext";

const useProperty = () => {
  const { curPage, fullProperties } = useContext(PropertyStateContext);
  const { setCurPage, fetchAll } = useContext(PropertyDispatchContext);

  const getCurPage = () => curPage;
  const getFullProperties = () => fullProperties;

  return { setCurPage, getCurPage, fetchAll, getFullProperties };
};

export default useProperty;
