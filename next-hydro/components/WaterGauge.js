import React from "react";
import { Box, Text, VStack, HStack, Flex, Icon } from "@chakra-ui/react";
import { MdWaterDrop } from "react-icons/md";
import { IoWaterSharp } from "react-icons/io5";
import { ImDroplet } from "react-icons/im";
import { RiAlertFill } from "react-icons/ri";
import Moment from "react-moment";
import "moment/locale/ko";

// const WaterGauge = ({ gauge, time, warning }) => {
const WaterGauge = ({ isModal, gauge, time, warning }) => {
  const borderLeft = [5, 5];
  const borderRight = [6, 6];
  return (
    <>
      {/* 아이콘 + 게이지 */}
      <Flex w="full" pt={isModal ? ["1.6em", "2.2em"] : 1}>
        {/* borderColor={warning ? "red.500" : "gray.200"} */}
        {/* borderWidth={warning ? 3 : 0} */}
        {/* <VStack align="flex-end" w="full" spacing={0}> */}
        {/* 아이콘 */}
        <Flex align="center">
          {/* <Icon as={MdWaterDrop} color="blue.500" fontSize="md" /> */}
          {/* <Icon as={IoWaterSharp} color="blue.500" fontSize="md" /> */}
            {/* color={warning ? "red.700" : "blue.500"} */}
          <Icon
            as={ImDroplet}
            color={gauge <= 25 ? "red.700" : "blue.500"}
            fontSize={isModal ? ["1.1em", "1.4em"] : "0.75em"}
          />
        </Flex>

        {/* <Flex bg="blue.800" h={5} w="full" borderRadius="md"> */}

        {/* 게이지 바탕 */}
        {/* bg={warning ? "#59110c" : "blue.800"} */}
        <Flex
          bg={gauge <= 25 ? "#59110c" : "blue.800"}
          h={isModal ? [6, 8] : 4}
          w="full"
          borderRadius={isModal ? borderLeft : 5}
          ml={isModal ? 2 : 1}
          mr={isModal ? 3 : 2}
          position="relative"
        >
          {/* w={() => parseInt(gauge) + "%"} */}
          {/* <Flex position="relative" w="100%" h="100%" overflow='hidden'> */}

          {/* 게이지 알맹이 */}
          <Flex position="relative" w="full" h="full">
            {/* w="30%" */}
            {/* bg={warning ? "red.700" : "blue.500"} */}
            <Flex w="full" h="full" position="absolute" borderRadius={5}></Flex>
            <Flex
              w={() => gauge + "%"}
              h="full"
              bg={gauge <= 25 ? "red.700" : "blue.500"}
              borderLeftRadius={isModal ? borderLeft : 5}
              borderRightRadius={isModal ? borderRight : 4}
              position="absolute"
              zIndex="3"
            ></Flex>
            {/* 경고 아이콘 */}
            {/* display={warning ? "flex" : "none"} */}
            <Flex
              position="absolute"
              zIndex="4"
              w="full"
              h="full"
              justify="center"
              align="center"
              display={gauge <= 25 ? "flex" : "none"}
            >
              <Icon
                as={RiAlertFill}
                color="yellow.400"
                fontSize={isModal ? ["1.4em", "1.6em"] : "1em"}
              />
            </Flex>
          </Flex>
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
    </>
  );
};

export default WaterGauge;
