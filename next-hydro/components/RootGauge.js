import React, { useState, useEffect } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { GiTreeRoots } from "react-icons/gi";

// const RootGauge = ({ gauge, isModal }) => {
const RootGauge = ({ planter }) => {
  const borderLeft = [5, 5];
  const borderRight = [6, 6];
  const [ratio, setRatio] = useState(planter.rootVolume);
  const [isWarning, setIsWarning] = useState(0);
  //
  // rootVolume이 85 이상이면 경고로 설정합니다
  useEffect(() => {
    planter.rootVolume >= 85 ? setIsWarning(1) : setIsWarning(0);
  }, [planter.rootVolume]);

  return (
    <Flex w="full" pt={1}>
      {/* <Flex w="full" pt={isModal ? [3, 2] : 1}> */}
      {/* 아이콘 */}
      {/* color="yellow.700" */}
      {/* color={gauge >= 85 ? "red.700" : "yellow.700"} */}
      <Flex align="center">
        <Icon color="yellow.700" fontSize={"0.8em"} as={GiTreeRoots} />
        {/* <Icon fontSize="md" as={GiTreeRoots} color="gray.400" /> */}
      </Flex>

      {/* 게이지 바탕 */}
      {/* bg="yellow.900" */}
      {/* bg={planter.rootVolume >= 85 ? "#59110c" : "yellow.900"} */}
      <Flex
        align="center"
        w="full"
        bg={isWarning ? "#59110c" : "yellow.900"}
        h={2}
        borderRadius={3}
        ml={1}
        mr={2}
      >
        <Flex position="relative" overflow="hidden" w="100%" h="100%">
          {/* 게이지 알맹이 */}
          {/* bg="yellow.600" */}
          {/* bg={planter.rootVolume >= 85 ? "red.700" : "yellow.600"} */}
          <Flex
            bg={isWarning ? "red.700" : "yellow.600"}
            w={() => planter.rootVolume + "%"}
            borderLeftRadius={3}
            borderRightRadius={2}
          ></Flex>
          <Flex
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            position="absolute"
          >
            {/* overflow="hidden" */}
            {/* backgroundImage={GiTreeRoots} */}
          </Flex>
        </Flex>
        {/* zIndex={2} */}
        {/* <Flex bg="yellow.900" h={5} w="full" borderRadius="md"> */}
        {/* w={() => prseInt(gauge) + "%"} */}
        {/* {console.log("root gauge:" + gauge)} */}

        {/* zIndex={3} */}
        {/* 뿌리 아이콘 */}
        {/* <Icon position='absolute' zIndex="1" as={GiTreeRoots} opacity="40%" /> */}
      </Flex>
    </Flex>
  );
};

export default RootGauge;
