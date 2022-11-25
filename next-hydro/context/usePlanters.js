import React, { useContext } from "react";
import {
  PlantersDispatchContext,
} from "./PlantersContext";

export default function usePlanters() {
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
  const { setPlanters, setGems } = useContext(PlantersDispatchContext);

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
    setPlanters,
    setGems,
  };
}
