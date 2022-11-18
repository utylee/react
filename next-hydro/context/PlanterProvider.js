import { useEffect, useMemo, useState } from "react";
import { PlanterStateContext, PlanterDispatchContext } from "./PlanterContext";

const PlanterProvider = ({ children }) => {
  const [curPlanter, setCurPlanter] = useState([]);
  const [planters, setPlanters] = useState([]);
  const [gems, setGems] = useState([]);

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

  const getCurPlanter = () => {
    return curPlanter;
  };
  const getPlanters = () => {
    return planters;
  };
  const getGems = () => {
    return gems;
  };
  const dispatch = useMemo(() => ({
    getCurPlanter,
    setCurPlanter,
    setPlanters,
    setGems,
    getPlanters,
    getGems,
  }));

  return (
    <PlanterStateContext.Provider value={{ planters, gems }}>
      <PlanterDispatchContext.Provider value={dispatch}>
        {children}
      </PlanterDispatchContext.Provider>
    </PlanterStateContext.Provider>
  );
};

export default PlanterProvider;