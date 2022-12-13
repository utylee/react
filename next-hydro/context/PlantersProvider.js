import React, { useEffect, useMemo, useCallback, useState } from "react";
import {
  PlantersStateContext,
  PlantersPlantersContext,
  PlantersGemsContext,
  PlantersSettersContext,
  PlantersGemSettersContext,
  PlantersDispatchContext,
} from "./PlantersContext";

const PlantersProvider = ({ children }) => {
  const [planters, setPlanters] = useState({});
  const [gems, setGems] = useState([]);

  const [setters, setSetters] = useState({});
  const [gemSetters, setGemSetters] = useState([]);

  // useEffect(() => {
  //   const Dummy = async () => {
  //     await getHydros();
  //   };
  //   Dummy();
  // }, []);

  // const makePiecesArray = (arr) => {
  //   // 일반상판과 새싹상판을 구분합니다
  //   arr.map((l) => {
  //     if (l.id === 7) {
  //       l.pieces = [
  //         parseInt(l.pieces[0]),
  //         parseInt(l.pieces[1]),
  //         parseInt(l.pieces[2]),
  //         parseInt(l.pieces[3]),
  //         parseInt(l.pieces[4]),
  //         parseInt(l.pieces[5]),
  //       ];
  //     } else {
  //       l.pieces = [
  //         [
  //           parseInt(l.pieces[0]),
  //           parseInt(l.pieces[1]),
  //           parseInt(l.pieces[2]),
  //           parseInt(l.pieces[3]),
  //         ],
  //         [
  //           parseInt(l.pieces[4]),
  //           parseInt(l.pieces[5]),
  //           parseInt(l.pieces[6]),
  //           parseInt(l.pieces[7]),
  //         ],
  //         [
  //           parseInt(l.pieces[8]),
  //           parseInt(l.pieces[9]),
  //           parseInt(l.pieces[10]),
  //           parseInt(l.pieces[11]),
  //         ],
  //       ];
  //     }
  //   });
  // };

  // const dividePlantGem = (hydro) => {
  //   const plants = [];
  //   const gms = [];
  //   hydro.map((h) => {
  //     if (h.id === 8) {
  //       gms = [...gms, h];
  //     } else plants = [...plants, h];
  //   });

  //   console.log("index.js:dividePlantGem:gem...");
  //   console.log(gms[0]);

  //   // plants 를 id 에 따라 내림차순 정렬합니다
  //   plants.sort((a, b) => {
  //     return a.id - b.id;
  //   });

  //   return [gms[0], plants];
  // };

  // const processSetGems = (gem) => {
  //   // const seeds = gem.pieces.split(",");
  //   // const seedsGauges = [
  //   //   parseInt(gem.waterGauge / 10000),
  //   //   parseInt((gem.waterGauge % 10000) / 100),
  //   //   gem.waterGauge % 100,
  //   // ];
  //   const { seeds, seedsGauges } = unzipGemData(gem);
  //   console.log("index.js:processSetGems:seeds, seedsGauges ...");
  //   console.log(seeds, seedsGauges);

  //   setGems([
  //     {
  //       id: 1,
  //       seedNames: [seeds[0], seeds[1]],
  //       waterGauge: seedsGauges[0],
  //       warning: 0,
  //     },
  //     {
  //       id: 2,
  //       seedNames: [seeds[2], seeds[3]],
  //       waterGauge: seedsGauges[1],
  //       warning: 0,
  //     },
  //     {
  //       id: 3,
  //       seedNames: [seeds[4], seeds[5]],
  //       waterGauge: seedsGauges[2],
  //       warning: 0,
  //     },
  //   ]);
  // };

  // const getHydros = async () => {
  //   console.log("getHydros() async rendered");
  //   // console.log("getMemos rendered");
  //   const res = await fetch(`/hydro/api/listjs`);
  //   // const res = await fetch(`/api/listjs`);
  //   const hydros = await res.json();
  //   // setHydroList(hydros);
  //   hydros = [...dividePlantGem(hydros)];
  //   makePiecesArray(hydros[1]);

  //   console.log("index.js:getHydros:hydros[1]: " + hydros[1]);
  //   console.log(hydros[1]);
  //   setObjectPlanters(hydros[1]);
  //   // setPlanters(hydros[1]);
  //   console.log("index.js:before setgemed..");
  //   console.log(hydros[0]);
  //   processSetGems(hydros[0]);
  //   console.log("index.js:after setgemed..");
  //   console.log(gems);
  //   // setGems([
  //   //   { seedNames: ["치커리", "깻잎"], waterGauge: 80, warning: 0 },
  //   //   { seedNames: ["케일", "시금치"], waterGauge: 45, warning: 1 },
  //   //   { seedNames: ["시금치", "곱슬아삭이"], waterGauge: 90, warning: 0 },
  //   // ]);
  // };

  const setObjectPlanters = (arr) => {
    // setPlanters(arr.map((a) => ({ [a.id]: a })));

    var tempPlanters = {};
    arr.map((a) => {
      Object.assign(tempPlanters, { [a.id]: a });
    });
    setPlanters(tempPlanters);
  };

  // const [curPlanterSetter, setCurPlanterSetter] = useState();

  const setEachPlanterSetter = (obj) => {
    Object.assign(setters, { [obj.id]: obj.func });
  };

  const setEachGemSetter = (obj) => {
    // Object.assign(gemSetters, { [obj.id]: obj.func });
    // 오직 전체 하나만 하면 됩니다
    // Object.assign(gemSetters, { [0]: obj.func });
    setGemSetters(obj);
  };

  const unzipGemData = (gem) => {
    const seeds = gem.pieces.split(",");
    const seedsGauges = [
      parseInt(gem.waterGauge / 10000),
      parseInt((gem.waterGauge % 10000) / 100),
      gem.waterGauge % 100,
    ];
    return { seeds, seedsGauges };
  };

  const zipGemData = ({ seeds, seedsGauges }) => {
    let gem = { pieces: "", waterGauge: "" };
    // 이름은 pieces 이지만 씨앗 이름들이 ,로 구분되어 합쳐집니다
    gem.pieces = seeds.join(",");
    // const seeds = gem.pieces.split(",");
    gem.waterGauge = $`parseInt(seedsGauges[0])*10000 + parseInt(seedsGauges[1])*100 + parseInt(seedsGauges[2])`;

    return gem;
  };

  const postJson = async (plt) => {
    const tempPlt = { ...plt };
    plt.id != 8 ? zipPieces(tempPlt) : null;
    console.log("postJson:plant: " + tempPlt);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tempPlt }),
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
      setPlanters,
      setGems,
      setEachPlanterSetter,
      setEachGemSetter,
      postJson,
      zipPieces,
      unzipPieces,
      zipGemData,
      unzipGemData,
    }),
    []
  );

  return (
    <PlantersPlantersContext.Provider value={planters}>
      <PlantersGemsContext.Provider value={gems}>
        <PlantersSettersContext.Provider value={setters}>
          <PlantersGemSettersContext.Provider value={gemSetters}>
            <PlantersDispatchContext.Provider value={dispatch}>
              {children}
              {/* <PlantersStateContext.Provider */}
              {/*   value={{ planters, gems, setters, gemSetters }} */}
              {/* > */}
              {/* </PlantersStateContext.Provider> */}
            </PlantersDispatchContext.Provider>
          </PlantersGemSettersContext.Provider>
        </PlantersSettersContext.Provider>
      </PlantersGemsContext.Provider>
    </PlantersPlantersContext.Provider>
  );
};

export default PlantersProvider;
