import React, { useState } from "react";
import { Box, Flex, VStack, Text, Icon } from "@chakra-ui/react";
import WaterGauge from "./WaterGauge";
import RootGauge from "./RootGauge";
import Moment from "react-moment";
import "moment/locale/ko";
import { ImDroplet } from "react-icons/im";
import Topboard from "./Topboard";
import GrowthGauge from "./GrowthGauge";

const Planter = ({ planter }) => {
  const [water, setWater] = useState();
  const [kind, setKind] = useState();
  const [individual, setIndividual] = useState();
  const [waterdate, setWaterDate] = useState();
  const dateToString = (time) => {
    return 0;
  };

  // {
  //   id: 7,
  //   plantName: "중엽쑥갓",
  //   waterGauge: 35,
  //   waterDate: 11111111,
  //   pieces: 6,
  // },
  return (
    <>
      {/* <Flex direction="column"> */}
      {/* <Flex direction="column" p={3} border="1px" borderRadius="lg"> */}
      {/* <VStack w="10em" h="12em" align="flex-end"> */}
      {/* <VStack w="7em" h="8em" mb='4em' mx='1em'> */}
      {/* <VStack w="9em" mb='4em' mx='1em' spacing={0}> */}
      <VStack w="9em" mb='4em' mx={2} spacing={0}>
        {/* 재배기 숫자 */}
        {/* <Flex pl={6} position="absolute" mt={-8} justify="flex-start"> */}
        {/*   {/1* pl={-10} *1/} */}
        {/*   {/1*  *1/} */}
        {/*   <Text fontWight="semibold" fontSize="3xl" color="teal.600"> */}
        {/*     {planter.id} */}
        {/*   </Text> */}
        {/* </Flex> */}

        {/* 작물 이름 */}
        <Flex w="full" position="relative" align="center" justify="center">
          <Text
            justify="center"
            color="green.400"
            fontWeight="bold"
            fontSize="1em"
            left="50%"
            top="50%"
          >
            {/* transform="translate(-10%,0%)" */}
            {planter.plantName}
          </Text>
        </Flex>

        {/* 상판 및 성장게이지 박스 */}
        <Flex pl={3} w="full" position="relative" h="full">

          {/* 상판 */}
          <Topboard piecess={planter.pieces} />

          {/* 식물 성장도 */}
          {/* <Flex ml={2} bg="teal.200" w="1.3em" h="full" borderRadius='md'></Flex> */}
          <GrowthGauge gauge={planter.growth} />

        </Flex>

        {/* 물 현재량 */}

        <WaterGauge gauge={planter.waterGauge} time={planter.waterdate} />

        {/* 뿌리 현재크기 */}
        <Flex w="full">
          <RootGauge gauge={planter.rootVolume} />
        </Flex>
      </VStack>
    </>
  );
};

export default Planter;
