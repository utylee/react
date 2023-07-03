import { useEffect, useMemo, useCallback, useState } from "react";
import {
  PlanterCurStateContext,
  PlanterCurDispatchContext,
} from "./PlanterCurContext";

const PlanterCurProvider = ({ children }) => {
  const [curPlanter, setCurPlanter] = useState();
  const [curGem, setCurGem] = useState();
  // const [curPlanterSetter, setCurPlanterSetter] = useState();

  // useEffect는 index.js에서 실행하기로 합니다
  // useEffect(() => {
  //   // setCurPlanter({ ...planters[0] });
  //   console.log("PlanterProvider useEffect");
  //   setPlanters([
  //     {
  //       id: 1,
  //       plantName: "신홍적축면",
  //       waterGauge: 55,
  //       // waterDate: Date.now(),
  //       waterDate: getDate(),
  //       warning: 0,
  //       growth: 35,
  //       pieces: [
  //         [1, 0, 1, 0],
  //         [0, 1, 1, 0],
  //         [1, 0, 1, 0],
  //       ],
  //       rootVolume: 10,
  //     },
  //     {
  //       id: 2,
  //       plantName: "중엽쑥갓",
  //       waterGauge: 35,
  //       waterDate: getDate(),
  //       warning: 1,
  //       growth: 35,
  //       pieces: [
  //         [0, 1, 0, 1],
  //         [1, 0, 1, 0],
  //         [0, 1, 0, 1],
  //       ],
  //       rootVolume: 40,
  //     },
  //     {
  //       id: 3,
  //       plantName: "진흥쌈케일",
  //       waterGauge: 35,
  //       waterDate: getDate(),
  //       warning: 0,
  //       growth: 35,
  //       pieces: [
  //         [0, 1, 0, 1],
  //         [1, 0, 1, 0],
  //         [0, 1, 0, 1],
  //       ],
  //       rootVolume: 20,
  //     },
  //     {
  //       id: 4,
  //       plantName: "리치치커리",
  //       waterGauge: 35,
  //       waterDate: getDate(),
  //       warning: 0,
  //       pieces: [
  //         [0, 1, 0, 1],
  //         [1, 0, 1, 0],
  //         [0, 1, 0, 1],
  //       ],
  //       growth: 35,
  //       rootVolume: 70,
  //     },
  //     {
  //       id: 5,
  //       plantName: "슈퍼열풍",
  //       waterGauge: 35,
  //       waterDate: getDate(),
  //       warning: 1,
  //       growth: 35,
  //       pieces: [
  //         [0, 1, 0, 1],
  //         [1, 0, 1, 0],
  //         [0, 1, 0, 1],
  //       ],
  //       rootVolume: 50,
  //     },
  //     {
  //       id: 6,
  //       plantName: "만추잎들깨",
  //       waterGauge: 35,
  //       waterDate: getDate(),
  //       warning: 0,
  //       growth: 35,
  //       pieces: [
  //         [0, 1, 0, 1],
  //         [1, 0, 1, 0],
  //         [0, 1, 0, 1],
  //       ],
  //       rootVolume: 90,
  //     },
  //     {
  //       id: 7,
  //       plantName: "모종새싹",
  //       waterGauge: 35,
  //       waterDate: getDate(),
  //       warning: 0,
  //       growth: 35,
  //       pieces: [0, 1, 1, 1, 0, 0],
  //       rootVolume: 60,
  //     },
  //   ]);
  //   setGems([
  //     { seedNames: ["치커리", "깻잎"], waterGauge: 80, warning: 0 },
  //     { seedNames: ["케일", "시금치"], waterGauge: 45, warning: 1 },
  //     { seedNames: ["시금치", "곱슬아삭이"], waterGauge: 90, warning: 0 },
  //   ]);
  // }, []);

  // 변경한 planter 객체만 리렌더 하기위해서입니다
  // const getCurPlanterSetter = () => {
  //   return curPlanterSetter;
  // };

  // const setCurPlanterHook = (c) => {
  // setCurPlanter(c => c);
  // };

  //context로 직접 받아와 쓰기로 합니다
  // const getCurPlanter = useCallback(() => {
  //   return curPlanter;
  // }, [curPlanter]);
  // }, []);
  // const getCurPlanter = () => {
  //   return curPlanter;
  // };

  // const dispatch = {
  //   setCurPlanter,
  // };
  const dispatch = useMemo(
    () => ({
      setCurPlanter,
      setCurGem,
    }),
    []
  );

  // const dispatch = {
  //   getCurPlanter,
  //   setPlanters,
  //   setCurPlanter,
  //   setGems,
  //   getPlanters,
  //   getGems,
  //   setCurPlanterSetter,
  //   getCurPlanterSetter,
  // };

  // setCurPlanter,
  // setCurPlanterHook,
  // const dispatch = useMemo(
  //   () => ({
  //     getCurPlanter,
  //     setPlanters,
  //     setCurPlanter,
  //     setGems,
  //     getPlanters,
  //     getGems,
  //     setCurPlanterSetter,
  //     getCurPlanterSetter,
  //   }),
  //   /* planters state가 변경될 때는 재생성하게끔 해줍니다.
  //    * 그럴경우 useMemo의 실익이 사라지는 게 아닌가 하는 아쉬움은 있습니다
  //    * */
  //   // [planters, curPlanter]
  //   // [planters]
  //   []
  // );

  return (
    <PlanterCurStateContext.Provider value={{ curPlanter, curGem }}>
      <PlanterCurDispatchContext.Provider value={dispatch}>
        {children}
      </PlanterCurDispatchContext.Provider>
    </PlanterCurStateContext.Provider>
  );
};

export default PlanterCurProvider;
