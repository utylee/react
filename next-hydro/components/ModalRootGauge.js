import React, { useState, useEffect } from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { GiTreeRoots } from "react-icons/gi";
import useModal from "../context/useModal";

// const RootGauge = ({ gauge, isModal }) => {
const RootGauge = ({ planter }) => {
  const borderLeft = [5, 5];
  const borderRight = [6, 6];

  const { setModalType } = useModal();

  const [ratio, setRatio] = useState(planter.rootVolume);
  const [isWarning, setIsWarning] = useState();

  // rootVolume이 85 이상이면 경고로 설정합니다
  useEffect(() => {
    planter.rootVolume >= 85 ? setIsWarning(1) : setIsWarning(0);
  }, [planter.rootVolume]);

  return (
    <Flex
      w={["12em", "10em", "15em"]}
      pl={["0em", "1em", "1.2em"]}
      _hover={{ cursor: "pointer" }}
      onClick={() => {
        setModalType("rootgauge");
      }}
    >
      {/* pt={["1em", "2.2em"]} */}
      {/* pt={[3, 2]} */}
      {/* w="full" */}
      {/* <Flex w="full" pt={isModal ? [3, 2] : 1}> */}
      {/* 아이콘 */}
      <Flex align="center">
        <Icon
          fontSize={["1.1em", "1.4em"]}
          as={GiTreeRoots}
          color="yellow.700"
        />
        {/* <Icon fontSize="md" as={GiTreeRoots} color="gray.400" /> */}
      </Flex>

      {/* 게이지 바탕 */}
      {/* bg="yellow.900" */}
      {/* h={[5, 6]} */}
      <Flex
        align="center"
        w="full"
        h={["1.4em", "2.0em", "2em"]}
        borderRadius={borderLeft}
        bg={isWarning ? "#59110c" : "yellow.900"}
        ml={2}
        mr={3}
      >
        <Flex position="relative" overflow="hidden" w="100%" h="100%">
          {/* 게이지 알맹이 */}
          {/* bg="yellow.600" */}
          <Flex
            bg={isWarning ? "red.700" : "yellow.600"}
            w={() => planter.rootVolume + "%"}
            borderLeftRadius={borderLeft}
            borderRightRadius={borderRight}
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
