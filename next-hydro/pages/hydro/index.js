import React, { useContext, useRef, useEffect, useState } from "react";
import { Box, HStack, VStack, Flex } from "@chakra-ui/react";
import PullToRefresh from "react-simple-pull-to-refresh";
import Planter from "../../components/Planter";
import Germinaty from "../../components/Germinaty";
import ModalPlanter from "../../components/ModalPlanter";
import { useDisclosure } from "@chakra-ui/react";
import MyModal from "../../components/MyModal";
// import PlantersProvider from "../../context/PlantersProvider";
import { PlantersStateContext } from "../../context/PlantersContext";
import usePlanters from "../../context/usePlanters";
import Germinatys from "../../components/Germinatys";
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";

export default function Home() {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const { setPlanters, getPlanters, setGems, getGems } = usePlanter();
  const { setPlanters, setObjectPlanters, setGems, unzipGemData, zipGemData } =
    usePlanters();
  const { planters, gems } = useContext(PlantersStateContext);

  console.log("index.js rendered");
  // const [planters, setPlanters] = useState([]);
  // const [gems, setGems] = useState([]);

  // 한번 지워봅니다
  // const curPlanter = useRef({});

  // const typePlanter = useRef({});
  const handleRefresh = async () => {
    // console.log("handleRefresh");
    await getHydros();
    return 0;
  };
  // const typeModal = useRef("modal");
  /*
	'id', sa.Intege
	'kind', sa.Stri
	'water', sa.Int
	'waterdate', sa
	'individual', s)
	*/
  const getDate = () => {
    // return Math.floor(Date.now() / 1000);
    return Date.now();
  };

  const makePiecesArray = (arr) => {
    // 일반상판과 새싹상판을 구분합니다
    arr.map((l) => {
      if (l.id === 7) {
        l.pieces = [
          parseInt(l.pieces[0]),
          parseInt(l.pieces[1]),
          parseInt(l.pieces[2]),
          parseInt(l.pieces[3]),
          parseInt(l.pieces[4]),
          parseInt(l.pieces[5]),
        ];
      } else {
        l.pieces = [
          [
            parseInt(l.pieces[0]),
            parseInt(l.pieces[1]),
            parseInt(l.pieces[2]),
            parseInt(l.pieces[3]),
          ],
          [
            parseInt(l.pieces[4]),
            parseInt(l.pieces[5]),
            parseInt(l.pieces[6]),
            parseInt(l.pieces[7]),
          ],
          [
            parseInt(l.pieces[8]),
            parseInt(l.pieces[9]),
            parseInt(l.pieces[10]),
            parseInt(l.pieces[11]),
          ],
        ];
      }
    });
  };

  const dividePlantGem = (hydro) => {
    const plants = [];
    const gms = [];
    hydro.map((h) => {
      if (h.id === 8) {
        gms = [...gms, h];
      } else plants = [...plants, h];
    });

    // plants 를 id 에 따라 내림차순 정렬합니다
    plants.sort((a, b) => {
      return a.id - b.id;
    });

    return [gms[0], plants];
  };


  const processSetGems = (gem) => {
    // const seeds = gem.pieces.split(",");
    // const seedsGauges = [
    //   parseInt(gem.waterGauge / 10000),
    //   parseInt((gem.waterGauge % 10000) / 100),
    //   gem.waterGauge % 100,
    // ];
    const { seeds, seedsGauges } = unzipGemData(gem);

    setGems([
      {
        id: 1,
        seedNames: [seeds[0], seeds[1]],
        waterGauge: seedsGauges[0],
        warning: 0,
      },
      {
        id: 2,
        seedNames: [seeds[2], seeds[3]],
        waterGauge: seedsGauges[1],
        warning: 0,
      },
      {
        id: 3,
        seedNames: [seeds[4], seeds[5]],
        waterGauge: seedsGauges[2],
        warning: 0,
      },
    ]);
  };
  const getHydros = async () => {
    console.log("getHydros() async rendered");
    // console.log("getMemos rendered");
    const res = await fetch(`/hydro/api/listjs`);
    // const res = await fetch(`/api/listjs`);
    const hydros = await res.json();
    // setHydroList(hydros);
    hydros = [...dividePlantGem(hydros)];
    makePiecesArray(hydros[1]);

    console.log("index.js:getHydros:hydros[1]: " + hydros[1]);
    console.log(hydros[1]);
    setObjectPlanters(hydros[1]);
    // setPlanters(hydros[1]);
    processSetGems(hydros[0]);
    // setGems([
    //   { seedNames: ["치커리", "깻잎"], waterGauge: 80, warning: 0 },
    //   { seedNames: ["케일", "시금치"], waterGauge: 45, warning: 1 },
    //   { seedNames: ["시금치", "곱슬아삭이"], waterGauge: 90, warning: 0 },
    // ]);
  };

  useEffect(() => {
    console.log("index.js:useEffected");
    getHydros();
  }, []);

  /*
  useEffect(() => {
    // setCurPlanter({ ...planters[0] });
    setPlanters([
      {
        id: 1,
        plantName: "신홍적축면",
        waterGauge: 85,
        // waterDate: Date.now(),
        waterDate: getDate(),
        warning: 0,
        growth: 65,
        pieces: [
          [1, 0, 1, 0],
          [0, 1, 1, 0],
          [1, 0, 1, 0],
        ],
        rootVolume: 10,
      },
      {
        id: 2,
        plantName: "중엽쑥갓",
        waterGauge: 25,
        waterDate: getDate(),
        warning: 1,
        growth: 45,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ],
        rootVolume: 40,
      },
      {
        id: 3,
        plantName: "진흥쌈케일",
        waterGauge: 45,
        waterDate: getDate(),
        warning: 0,
        growth: 25,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ],
        rootVolume: 20,
      },
      {
        id: 4,
        plantName: "리치치커리",
        waterGauge: 55,
        waterDate: getDate(),
        warning: 0,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 0, 0, 1],
        ],
        growth: 55,
        rootVolume: 70,
      },
      {
        id: 5,
        plantName: "슈퍼열풍",
        waterGauge: 35,
        waterDate: getDate(),
        warning: 1,
        growth: 85,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ],
        rootVolume: 50,
      },
      {
        id: 6,
        plantName: "만추잎들깨",
        waterGauge: 70,
        waterDate: getDate(),
        warning: 0,
        growth: 35,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 1, 1],
        ],
        rootVolume: 90,
      },
      {
        id: 7,
        plantName: "모종새싹",
        waterGauge: 35,
        waterDate: getDate(),
        warning: 0,
        growth: 35,
        pieces: [0, 1, 1, 1, 0, 0],
        rootVolume: 60,
      },
    ]);
    setGems([
      { seedNames: ["치커리", "깻잎"], waterGauge: 80, warning: 0 },
      { seedNames: ["케일", "시금치"], waterGauge: 45, warning: 1 },
      { seedNames: ["시금치", "곱슬아삭이"], waterGauge: 90, warning: 0 },
    ]);
  }, []);
	*/

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      justifyContent="center"
      pullingContent=""
    >
      {/* <Flex direction='column' mt={8} spacing={8} align="flex-start" justify="center"> */}
      {/* <Flex direction="column" mt={8} spacing={8} justify="center"> */}
      {/* <VStack direction="column" mt={8} spacing={8}> */}
      <VStack mt={8}>
        {/* <HStack w="full" align="center" justify="center" spacing='6em'> */}
        {/* <HStack w="full" align="space-between" justify="center" spacing='6em'> */}
        {/* <HStack w="full" align="center" ml='1em' justify="space-between" > */}
        {/* <HStack w="full" align="center" m='3em' justify="space-between" > */}

        {/* 재배기 7개 */}
        {/* <HStack mx="6em" justify="space-between"> */}
        {/* <HStack ml="4em" flexWrap='wrap' spacing={6}> */}
        {/* <Flex ml={0} flexWrap="wrap" spacing={6}> */}
        {/* setCurPlanter={setCurPlanter} */}
        {/* typeModal="modal" */}
        <Flex ml={[0, 1, 3]} flexWrap="wrap">
          {/* <Flex ml={0} flexWrap="wrap"> */}
          {/* setTypeModal={setTypeModal} */}

          {/* isModal={0} */}
          {/* onOpen={onOpen} */}
          {/* {planters.map((planter) => ( */}

          {/* curPlanter를 생성단계에 마지막개만 해당하게 넣지 않고 */}
          {/* 클릭시 지정해주는 식으로 변경합니다 */}
          {/* curPlanter={curPlanter} */}
          {/* {getPlanters().map((planter) => ( */}
          {Object.keys(planters).map((k) => (
            <Planter key={k} planter={planters[k]} />
          ))}

          {/* {planters.map((planter) => ( */}
          {/*   <Planter key={planter.id} planter={planter} /> */}
          {/* ))} */}
          {/* 씨앗 발아기 */}
          <Germinatys gems={gems} />
          {/* <Flex direction="column" ml={3} align="center"> */}
          {/*   {gems.map((gem) => ( */}
          {/*     <Germinaty key={Math.random()} gem={gem} /> */}
          {/*   ))} */}
          {/* </Flex> */}
        </Flex>
      </VStack>
      {/* 구조를 useContext를 사용하여 바꿔보기로 합니다 */}
      <MyModal />
      {/* {console.log("all rendered index.js")} */}

      {/* typeModal={typeModal} */}
      {/* setTypeModal={setTypeModal} */}
      {/* <ModalPlanter */}
      {/*   isOpen={isOpen} */}
      {/*   onOpen={onOpen} */}
      {/*   onClose={onClose} */}
      {/*   curPlanter={curPlanter} */}
      {/*   isModal={1} */}
      {/* /> */}
    </PullToRefresh>
  );
}
