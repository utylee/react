import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ImLeaf } from "react-icons/im";
import { TiLeaf } from "react-icons/ti";
import { RiLeafLine } from "react-icons/ri";

const GrowthGauge = ({ isModal, gauge }) => {
  const borderLeft = [4, 5];
  const borderRight = [5, 6];
  return (
    <>
      {/* 게이지 바탕 */}
      <Flex
        direction="column"
        ml={isModal ? [3, 4] : 1}
        w={isModal ? ["1em", "6"] : "2"}
        h="full"
        borderRadius={isModal ? borderLeft : "2"}
        justify="flex-end"
        align="center"
      >
        {/* bg="gray.900" */}
        {console.log("growth:" + gauge)}
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
          h={() => parseInt(gauge) + "%"}
          bg="green.500"
          borderBottomRadius={isModal ? borderLeft : "2"}
          borderTopRadius={isModal ? borderRight : "2"}
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

export default GrowthGauge;
