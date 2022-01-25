import React from "react";
import { Box, Text, VStack, HStack, Flex, Icon } from "@chakra-ui/react";
import { MdWaterDrop } from "react-icons/md";
import { IoWaterSharp } from "react-icons/io5";
import { ImDroplet } from "react-icons/im";
import Moment from "react-moment";
import "moment/locale/ko";

const WaterGauge = ({ gauge, time }) => {
  return (
    <Flex w="full" pt={1}>
      {/* 아이콘 + 게이지 */}
      {/* <VStack align="flex-end" w="full" spacing={0}> */}
      {/* 아이콘 */}
      <Flex align="center">
        {/* <Icon as={MdWaterDrop} color="blue.500" fontSize="md" /> */}

        {/* <Icon as={IoWaterSharp} color="blue.500" fontSize="md" /> */}
        <Icon as={ImDroplet} color="blue.500" fontSize="0.8em" />
      </Flex>

      {/* <Flex bg="blue.800" h={5} w="full" borderRadius="md"> */}

      {/* 게이지 바탕 */}
      <Flex bg="blue.800" h={4} w="full" borderRadius="5" ml={1} mr={2}>
        {/* w={() => parseInt(gauge) + "%"} */}
        {/* <Flex position="relative" w="100%" h="100%" overflow='hidden'> */}

        {/* 게이지 알맹이 */}
        <Flex
          bg="blue.500"
          w={() => gauge + "%"}
          borderLeftRadius="5"
          borderRightRadius="4"
        ></Flex>
        {/* <Flex */}
        {/*   position="absolute" */}
        {/*   left="50%" */}
        {/*   top="50%" */}
        {/*   transform="translate(-50%,-50%)" */}
        {/* ></Flex> */}
        {/* </Flex> */}
      </Flex>
      {/* </VStack> */}
      {/* 급수 일자 */}
      {/* 클릭하면 커질 때 나오는 것으로 수정하기로 했습니다 */}
      {/* <Text color="blue.500" mt={0} pr={1} fontSize="0.7em"> */}
      {/*   <Moment interval={0} format="MM월 DD일 HH시"> */}
      {/*     {time} */}
      {/*   </Moment> */}
      {/* </Text> */}
    </Flex>
  );
};

export default WaterGauge;
