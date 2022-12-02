import React, { useContext, useMemo, useCallback } from "react";
import { PlantersDispatchContext } from "./PlantersContext";

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
  // const { setPlanters, setGems } = useContext(PlantersDispatchContext);
  // const { setPlanters, setGems, setSetters } = useContext(
  // const { setPlanters, setGems, setEachSetter } = useContext(
  //
  const { postJson, zipPieces, unzipPieces, setObjectPlanters, setGems, setEachSetter } =
    useContext(PlantersDispatchContext);

  // const setEachSetter = useCallback((i, func) => {
  //   setSetters({ id: i, func: func });
  // }, []);

  // const setEachSetter = useCallback(
  //   (i, f) =>
  //     setSetters({ ...{ id: i, func: func } }),
  //     // setSetters(setters =>({...setters, { id: i, func: f}})),
  //   []
  // );

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
  //   getCurPlanter,

  // setSetters,
  // setPlanters,
  return {
    setObjectPlanters,
    setGems,
    setEachSetter,
    postJson,
    zipPieces,
    unzipPieces,
  };
}
