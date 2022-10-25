import React, { useContext } from "react";
import { PlanterStateContext, PlanterDispatchContext } from "./PlanterContext";

export default function usePlanter() {
  // const dispatch = useMemo(() => ({
  //   getCurPlanter,
  //   setCurPlanter,
  //   getPlanters,
  //   getGems,
  // }));

  const {
    setPlanters,
    setGems,
    getCurPlanter,
    setCurPlanter,
    getPlanters,
    getGems,
  } = useContext(PlanterDispatchContext);

  return {
    setPlanters,
    setGems,
    getCurPlanter,
    setCurPlanter,
    getPlanters,
    getGems,
  };
}
