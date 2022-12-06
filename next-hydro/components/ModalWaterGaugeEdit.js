import React, { useRef, useContext, useState, useEffect } from "react";
import {
  Button,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Icon,
  useDimensions,
} from "@chakra-ui/react";
import useModal from "../context/useModal";
import { ImDroplet } from "react-icons/im";
import { RiAlertFill } from "react-icons/ri";
import usePlanters from "../context/usePlanters";
import { PlantersStateContext } from "../context/PlantersContext";

const ModalWaterGaugeEdit = ({ planter }) => {
  const borderLeft = ["0.6em", "0.7em"];
  const borderRight = ["0.4em", "0.5em"];

  const outerBoxRef = useRef();
  const outerBoxDimensions = useDimensions(outerBoxRef);

  const [ratio, setRatio] = useState(planter.waterGauge);
  const [isWarning, setIsWarning] = useState();
  const { closeModal } = useModal();
  const { setters } = useContext(PlantersStateContext);
  const { postJson } = usePlanters();

  const handleFinishClick = async () => {
    console.log("ModalWaterGaugeEdit:finish clicked");
    const newPlanter = { ...planter };
    const { waterGauge, ...rest } = newPlanter;
    newPlanter.waterGauge = ratio;
    // setters[parseInt(newPlanter.id)]({ ...rest, waterGauge: ratio });
    setters[parseInt(newPlanter.id)](newPlanter);

    await postJson(newPlanter);
    closeModal();
  };

  const clickGauge = (e) => {
    // var rect = e.target.getBoundingClientRect();
    // var full_wth = rect.right - rect.left;
    var rect = outerBoxDimensions.borderBox;
    setRatio(parseInt(((e.clientX - rect.left) * 100) / rect.width));
  };

  // }, [planter.waterGauge]);
  // planter.waterGauge <= 25 ? setIsWarning(1) : setIsWarning(0);
  useEffect(() => {
    ratio <= 25 ? setIsWarning(1) : setIsWarning(0);
  }, [ratio]);
  return (
    <>
      {/* 아이콘 + 게이지 */}
      <VStack w="full" pt={["1.6em", "2.2em"]} mt={["2em", "4em"]}>
        {/* borderColor={warning ? "red.500" : "gray.200"} */}
        {/* borderWidth={warning ? 3 : 0} */}
        {/* <VStack align="flex-end" w="full" spacing={0}> */}
        {/* 아이콘 */}
        <Flex w="80%" justify="center">
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
          <Flex
            ref={outerBoxRef}
            bg={isWarning ? "#59110c" : "blue.800"}
            h={["2.5em", "3em"]}
            w="full"
            borderRadius={borderLeft}
            ml={2}
            mr={3}
            position="relative"
            _hover={{ cursor: "pointer" }}
            onClick={(e) => {
              // setModalType("watergauge");
              // clickGauge(e.target.getBoundingClientRect());
              clickGauge(e);
            }}
          >
            {/* w={() => parseInt(gauge) + "%"} */}
            {/* <Flex position="relative" w="100%" h="100%" overflow='hidden'> */}

            {/* 게이지 알맹이 */}
            <Flex position="relative" w="full" h="full">
              {/* w="30%" */}
              {/* bg={warning ? "red.700" : "blue.500"} */}
              <Flex
                w="full"
                h="full"
                position="absolute"
                borderRadius={5}
              ></Flex>
              {/* bg={gauge <= 25 ? "red.700" : "blue.500"} */}
              {/* w={() => planter.waterGauge + "%"} */}
              <Flex
                w={() => ratio + "%"}
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
        <Flex>
          {/* <Flex mt="2em" mb="2em"> */}
          <Button
            size="lg"
            colorScheme="teal"
            mt="3em"
            mb={["2em", "3em"]}
            onClick={() => {
              handleFinishClick();
            }}
          >
            {/* <Button size="md" colorScheme="teal"> */}
            완료
          </Button>
        </Flex>
      </VStack>
    </>
  );
};

export default ModalWaterGaugeEdit;
