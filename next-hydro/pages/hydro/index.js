import React, { useRef, useEffect, useState } from "react";
import { Box, HStack, VStack, Flex } from "@chakra-ui/react";
import PullToRefresh from "react-simple-pull-to-refresh";
import Planter from "../../components/Planter";
import Germinaty from "../../components/Germinaty";
import ModalPlanter from "../../components/ModalPlanter";
import { useDisclosure } from "@chakra-ui/react";
import MyModal from "../../components/MyModal";
import usePlanter from "../../context/usePlanter";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setPlanters, getPlanters, setGems, getGems } = usePlanter();

  // const [planters, setPlanters] = useState([]);
  // const [gems, setGems] = useState([]);

  const curPlanter = useRef({});
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
    arr.map((l) => {
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
    });
  };

  const dividePlantGem = (hydro) => {
    const plants = [];
    const gems = [];
    hydro.map((h) => {
      if (h.id === 8) {
        gems = [...gems, h];
      } else plants = [...plants, h];
    });

    const seeds = gems[0].pieces.split(",");
    const seedsGauges = [
      parseInt(gems[0].waterGauge / 10000),
      parseInt((gems[0].waterGauge % 10000) / 100),
      gems[0].waterGauge % 100,
    ];

    setGems([
      {
        seedNames: [seeds[0], seeds[1]],
        waterGauge: seedsGauges[0],
        warning: 0,
      },
      {
        seedNames: [seeds[2], seeds[3]],
        waterGauge: seedsGauges[1],
        warning: 0,
      },
      {
        seedNames: [seeds[4], seeds[5]],
        waterGauge: seedsGauges[2],
        warning: 0,
      },
    ]);

    return [gems, plants];
  };
  const getHydros = async () => {
    // console.log("getMemos rendered");
    const res = await fetch(`/hydro/api/listjs`);
    // const res = await fetch(`/api/listjs`);
    const hydros = await res.json();
    // setHydroList(hydros);
    hydros = [...dividePlantGem(hydros)];

    makePiecesArray(hydros[1]);
    setPlanters(hydros[1]);
    // setGems([
    //   { seedNames: ["치커리", "깻잎"], waterGauge: 80, warning: 0 },
    //   { seedNames: ["케일", "시금치"], waterGauge: 45, warning: 1 },
    //   { seedNames: ["시금치", "곱슬아삭이"], waterGauge: 90, warning: 0 },
    // ]);
  };

  useEffect(() => {
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
          {getPlanters().map((planter) => (
            <Planter
              curPlanter={curPlanter}
              key={Math.random()}
              planter={planter}
            />
          ))}
          {/* 씨앗 발아기 */}
          <Flex direction="column" ml={3} align="center">
            {/* <Flex justify='center'> */}
            {/* {gems.map((gem) => ( */}
            {getGems().map((gem) => (
              <Germinaty key={Math.random()} gem={gem} />
            ))}
          </Flex>
        </Flex>
      </VStack>
      {/* 구조를 useContext를 사용하여 바꿔보기로 합니다 */}
      <MyModal />

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
