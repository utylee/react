import React, { useEffect, useState } from "react";
import { Box, Text, VStack, HStack, Flex, Icon } from "@chakra-ui/react";
// import { MdWaterDrop } from "react-icons/md";
// import { IoWaterSharp } from "react-icons/io5";
import { ImDroplet } from "react-icons/im";
import { RiAlertFill } from "react-icons/ri";
// import Moment from "react-moment";
import "moment/locale/ko";
import useModal from "../context/useModal";

// const ModalWaterGauge = ({ gauge, time, warning }) => {
const ModalWaterGauge = ({ planter }) => {
  const borderLeft = [5, 5];
  const borderRight = [6, 6];
  const [isWarning, setIsWarning] = useState();
  const { setModalType } = useModal();
  useEffect(() => {
    planter.waterGauge <= 25 ? setIsWarning(1) : setIsWarning(0);
  }, [planter.waterGauge]);

  return (
    <>
      {/* 아이콘 + 게이지 */}
      {/* w="full" */}
      {/* pt={["1.2em", "2em", "3.0em"]} */}
      <Flex
        pt={["1.2em", "0em", "0em"]}
        pb={["1.2em", "1.2em", "1.2em"]}
        w={["12em", "10em", "15em"]}
        pl={["0em", "1em", "1.2em"]}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          setModalType("watergauge");
        }}
      >
        {/* borderColor={warning ? "red.500" : "gray.200"} */}
        {/* borderWidth={warning ? 3 : 0} */}
        {/* <VStack align="flex-end" w="full" spacing={0}> */}
        {/* 아이콘 */}
        <Flex align="center">
          {/* <Icon as={MdWaterDrop} color="blue.500" fontSize="md" /> */}
          {/* <Icon as={IoWaterSharp} color="blue.500" fontSize="md" /> */}
          {/* color={warning ? "red.700" : "blue.500"} */}
          {/* color={gauge <= 25 ? "red.700" : "blue.500"} */}
          <Icon
            as={ImDroplet}
            color={isWarning ? "red.700" : "blue.500"}
            fontSize={["1.1em", "1.4em"]}
          />
        </Flex>

        {/* <Flex bg="blue.800" h={5} w="full" borderRadius="md"> */}

        {/* 게이지 바탕 */}
        {/* bg={warning ? "#59110c" : "blue.800"} */}
        {/* bg={gauge <= 25 ? "#59110c" : "blue.800"} */}
        {/* w={["10em", "6em"]} */}
        <Flex
          bg={isWarning ? "#59110c" : "blue.800"}
          h={["1.4em", "2.0em", "2em"]}
          w="full"
          borderRadius={borderLeft}
          ml={2}
          mr={3}
          position="relative"
        >
          {/* w={() => parseInt(gauge) + "%"} */}
          {/* <Flex position="relative" w="100%" h="100%" overflow='hidden'> */}

          {/* 게이지 알맹이 */}
          <Flex position="relative" w="full" h="full">
            {/* w="30%" */}
            {/* bg={warning ? "red.700" : "blue.500"} */}
            <Flex w="full" h="full" position="absolute" borderRadius={5}></Flex>
            {/* bg={gauge <= 25 ? "red.700" : "blue.500"} */}
            <Flex
              w={() => planter.waterGauge + "%"}
              h="full"
              bg={isWarning ? "red.700" : "blue.500"}
              borderLeftRadius={borderLeft}
              borderRightRadius={borderRight}
              position="absolute"
              zIndex="3"
            ></Flex>
            {/* 경고 아이콘 */}
            {/* display={warning ? "flex" : "none"} */}
            {/* display={gauge <= 25 ? "flex" : "none"} */}
            <Flex
              position="absolute"
              zIndex="4"
              w="full"
              h="full"
              justify="center"
              align="center"
              display={isWarning ? "flex" : "none"}
            >
              <Icon
                as={RiAlertFill}
                color="yellow.400"
                fontSize={["1.4em", "1.6em"]}
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

export default ModalWaterGauge;
