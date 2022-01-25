import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, Flex } from "@chakra-ui/react";
import PullToRefresh from "react-simple-pull-to-refresh";
import Planter from "../../components/Planter";
import Germinaty from "../../components/Germinaty";

export default function Home() {
  const [planters, setPlanters] = useState([]);
  const [gems, setGems] = useState([]);
  const handleRefresh = async () => {
    console.log("handleRefresh");
    return 0;
  };
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

  useEffect(() => {
    setPlanters([
      {
        id: 1,
        plantName: "여름적상추",
        waterGauge: 55,
        // waterDate: Date.now(),
        waterDate: getDate(),
        growth: 35,
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
        waterGauge: 35,
        waterDate: getDate(),
        growth: 35,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ],
        rootVolume: 40,
      },
      {
        id: 3,
        plantName: "케일",
        waterGauge: 35,
        waterDate: getDate(),
        growth: 35,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ],
        rootVolume: 20,
      },
      {
        id: 4,
        plantName: "치커리",
        waterGauge: 35,
        waterDate: getDate(),
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ],
        growth: 35,
        rootVolume: 70,
      },
      {
        id: 5,
        plantName: "슈퍼열풍",
        waterGauge: 35,
        waterDate: getDate(),
        growth: 35,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ],
        rootVolume: 50,
      },
      {
        id: 6,
        plantName: "중엽쑥갓",
        waterGauge: 35,
        waterDate: getDate(),
        growth: 35,
        pieces: [
          [0, 1, 0, 1],
          [1, 0, 1, 0],
          [0, 1, 0, 1],
        ],
        rootVolume: 90,
      },
      {
        id: 7,
        plantName: "모종새싹",
        waterGauge: 35,
        waterDate: getDate(),
        growth: 35,
        pieces: [0, 1, 1, 1, 0, 0],
        rootVolume: 60,
      },
    ]);
    setGems([
      { seedName: "치커리", waterGauge: 80 },
      { seedName: "깻잎", waterGauge: 85 },
      { seedName: "시금치", waterGauge: 90 },
    ]);
  }, []);

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
        <Flex ml={0} flexWrap="wrap">
          {planters.map((planter) => (
            <Planter key={Math.random()} planter={planter} />
          ))}
        </Flex>

        {/* 씨앗 발아기 */}
        <Flex direction="column" pl="3em" mt="3em" align="flex-start">
          {/* <Flex justify='center'> */}
          {gems.map((gem) => (
            <Germinaty key={Math.random()} gem={gem} />
          ))}
        </Flex>
        {/* <Planter /> */}
      </VStack>
    </PullToRefresh>
  );
}
