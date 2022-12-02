import { useEffect, useMemo, useCallback, useState } from "react";
import {
  PlantersStateContext,
  PlantersDispatchContext,
} from "./PlantersContext";

const PlantersProvider = ({ children }) => {
  // const [planters, setPlanters] = useState([]);
  const [planters, setPlanters] = useState({});
  const [gems, setGems] = useState([]);

  // const [setters, setSetters] = useState([{ id: 0, func: () => {} }]);
  // const [setters, setSetters] = useState([]);
  const [setters, setSetters] = useState({});

  const setObjectPlanters = (arr) => {
    // setPlanters(arr.map((a) => ({ [a.id]: a })));

    var tempPlanters = {};
    arr.map((a) => {
      Object.assign(tempPlanters, { [a.id]: a });
    });
    setPlanters(tempPlanters);
  };

  // const [curPlanterSetter, setCurPlanterSetter] = useState();

  // // 변경한 planter 객체만 리렌더 하기위해서입니다
  // const getCurPlanterSetter = () => {
  //   return curPlanterSetter;
  // };

  // const setCurPlanterHook = (c) => {
  // setCurPlanter(c => c);
  // };

  // const getCurPlanter = useCallback(() => {
  //   return curPlanter;
  //   // }, []);
  // }, [curPlanter]);
  //
  // const getCurPlanter = () => {
  //   return curPlanter;
  // };

  // 그냥 planters컨텍스트를 가져와서 쓰기로 합니다
  // const getPlanters = useCallback(() => {
  //   return planters;
  // }, [planters]);
  // const getPlanters = () => {
  //   return planters;
  // };
  // const getGems = () => {
  //   return gems;
  // };

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

  // const setEachSetter = useCallback((i, func) => {
  // setSetters(setters => (setters.filter(setter)=> { ...setters, { id: i, func: func }}));
  // }, []);
  //

  const setEachSetter = (obj) => {
    // setSetters((setters) => [...setters, { id: 0, func: () => {} }]);
    // setSetters((setters) => {
    //   const remains = setters.filter((s) => s.id != obj.id);
    //   return [...remains, { id: obj.id, func: obj.func }];
    // });

    Object.assign(setters, { [obj.id]: obj.func });
  };

  const postJson = async (plt) => {
    console.log("postJson:plant: " + plt);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...plt }),
    };
    const res = await fetch("/hydro/api/updatejs", requestOptions);
  };

  const zipPieces = (p) => {
    var tempPieces = [...p.pieces];
    if (p.id === 7) {
      p.pieces = "";
      for (let i = 0; i < 6; i++) {
        p.pieces += +`${tempPieces[i]}`;
      }
      console.log("p.pieces: " + p.pieces);
    } else {
      p.pieces = "";
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          p.pieces += +`${tempPieces[i][j]}`;
        }
      }
      console.log("p.pieces: " + p.pieces);
    }
  };

  const unzipPieces = (p) => {
    // 일반상판과 새싹상판을 구분합니다
    if (p.id === 7) {
      p.pieces = [
        parseInt(p.pieces[0]),
        parseInt(p.pieces[1]),
        parseInt(p.pieces[2]),
        parseInt(p.pieces[3]),
        parseInt(p.pieces[4]),
        parseInt(p.pieces[5]),
      ];
    } else {
      p.pieces = [
        [
          parseInt(p.pieces[0]),
          parseInt(p.pieces[1]),
          parseInt(p.pieces[2]),
          parseInt(p.pieces[3]),
        ],
        [
          parseInt(p.pieces[4]),
          parseInt(p.pieces[5]),
          parseInt(p.pieces[6]),
          parseInt(p.pieces[7]),
        ],
        [
          parseInt(p.pieces[8]),
          parseInt(p.pieces[9]),
          parseInt(p.pieces[10]),
          parseInt(p.pieces[11]),
        ],
      ];
    }
  };

  // setPlanters,
  const dispatch = useMemo(
    () => ({
      setObjectPlanters,
      setGems,
      setEachSetter,
      postJson,
      zipPieces,
      unzipPieces,
    }),
    []
  );
  // const dispatch = useMemo(
  //   () => ({
  //     setPlanters,
  //     setGems,
  //     setSetters,
  //   }),
  //   []
  // );

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
    <PlantersStateContext.Provider value={{ planters, gems, setters }}>
      {/* <PlantersStateContext.Provider value={{ planters, gems }}> */}
      <PlantersDispatchContext.Provider value={dispatch}>
        {children}
      </PlantersDispatchContext.Provider>
    </PlantersStateContext.Provider>
  );
};

export default PlantersProvider;
