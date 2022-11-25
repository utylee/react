import React, { useContext } from "react";
import { PlanterCurDispatchContext } from "./PlanterCurContext";

export default function usePlanterCur() {
  // const dispatch = useMemo(() => ({
  //   getCurPlanter,
  //   setCurPlanter,
  //   getPlanters,
  //   getGems,
  // }));

  // const {
  //   setPlanters,
  //   setGems,
  //   getCurPlanter,
  //   setCurPlanter,
  //   getPlanters,
  //   getGems,
  //   setCurPlanterSetter,
  //   getCurPlanterSetter,
  // } = useContext(PlanterDispatchContext);
  const { setCurPlanter } = useContext(PlanterCurDispatchContext);

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
  // return {
  //   setPlanters,
  //   setGems,
  //   getGems,
  //   getPlanters,
  //   getCurPlanter,
  //   setCurPlanter,
  // };
  return {
    setCurPlanter
  };
}
