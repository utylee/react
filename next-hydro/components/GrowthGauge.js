import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { ImLeaf } from "react-icons/im";
import { TiLeaf } from "react-icons/ti";
import { RiLeafLine } from "react-icons/ri";

const GrowthGauge = ({ gauge }) => {
  return (
    <>
      {/* 게이지 바탕 */}
      <Flex
        direction="column"
        ml={1}
        w="5%"
        h="full"
        borderRadius="2"
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
          borderBottomRadius="2"
          borderTopRadius="2"
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
