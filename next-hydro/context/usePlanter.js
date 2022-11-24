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
    setCurPlanterSetter,
    getCurPlanterSetter,
  } = useContext(PlanterDispatchContext);


  // return {
  //   setPlanters,
  //   setGems,
  //   getCurPlanter,
  //   setCurPlanterHook,
  //   getPlanters,
  //   getGems,
  //   setCurPlanterSetter,
  //   getCurPlanterSetter,
  // };
  //
  return {
    setPlanters,
    setGems,
    getGems,
    getPlanters,
    getCurPlanter,
    setCurPlanter,
  };
}
