import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
// import { ImLeaf } from "react-icons/im";
// import { TiLeaf } from "react-icons/ti";
// import { RiLeafLine } from "react-icons/ri";

import usePlanters from "../context/usePlanters";
import useModal from "../context/useModal";

const ModalGrowthGauge = ({ planter }) => {
  const borderLeft = [4, 5];
  const borderRight = [5, 6];
  const { setModalType } = useModal();

  return (
    <>
      {/* 게이지 바탕 */}
      {/* h={"5em"} */}
      {/* direction="column" */}
      {/* h={["4em", "14em", "18em"]} */}
      {/* h="full" */}
      {/* h="90%" */}
      {/* alignSelf={"center"} */}
      <Flex
        align="flex-end"
        ml={[2, 4, 5]}
        w={["1.1em", "1.2em", "1.5em"]}
        h={["8em", "10em", "13em"]}
        borderRadius={borderLeft}
        bg="green.900"
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          setModalType("growthgauge");
        }}
      >
        {/* bg="gray.900" */}
        {/* {console.log("growth:" + gauge)} */}
        {/* borderTopRadius="3" */}

        {/* 잎 아이콘 */}

        {/* 아이콘을 일부만 채우는 기술입니다 */}
        {/* <Flex position="relative"> */}
        {/*   <Icon color="gray.500" as={ImLeaf} mb={1} opacity="40%" /> */}
        {/*   <Flex position="absolute"> */}
        {/*     <Icon */}
        {/*       clipPath="inset(30% 0 0 0)" */}
        {/*       color="green.500" */}
        {/*       as={ImLeaf} */}
        {/*       mb={1} */}
        {/*     /> */}
        {/*   </Flex> */}
        {/* </Flex> */}

        {/* 게이지 실제 수치 */}
        <Flex
          w="full"
          h={() => parseInt(planter.growthGauge) + "%"}
          bg="green.500"
          borderBottomRadius={borderLeft}
          borderTopRadius={borderRight}
        ></Flex>
        {/* backgroundImage={ */}
        {/*   <Icon */}
        {/*     clipPath="inset(30% 0 0 0)" */}
        {/*     color="green.500" */}
        {/*     as={ImLeaf} */}
        {/*     mb={1} */}
        {/*   /> */}
      </Flex>
    </>
  );
};

export default ModalGrowthGauge;
