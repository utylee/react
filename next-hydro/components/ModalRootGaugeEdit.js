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
import { GiTreeRoots } from "react-icons/gi";
import usePlanters from "../context/usePlanters";
import { PlantersSettersContext, PlantersStateContext } from "../context/PlantersContext";
import usePlanterCur from "../context/usePlanterCur";

const ModalRootGaugeEdit = ({ planter }) => {
  const borderLeft = ["0.6em", "0.7em"];
  const borderRight = ["0.4em", "0.5em"];

  const outerBoxRef = useRef();
  const outerBoxDimensions = useDimensions(outerBoxRef);

  const [ratio, setRatio] = useState(planter.rootVolume);
  const [isWarning, setIsWarning] = useState();
  const { closeModal, setModalType } = useModal();
  // const { setters } = useContext(PlantersStateContext);
  const { setters } = useContext(PlantersSettersContext);
  const { postJson } = usePlanters();
  const { setCurPlanter } = usePlanterCur();

  const handleFinishClick = async () => {
    console.log("ModalWaterGaugeEdit:finish clicked");
    const newPlanter = { ...planter };
    // const { rootVolume, ...rest } = newPlanter;
    newPlanter.rootVolume = ratio;
    // setters[parseInt(newPlanter.id)]({ ...rest, rootVolume: ratio });
    setters[parseInt(newPlanter.id)](newPlanter);
    setCurPlanter({ ...newPlanter });

    await postJson(newPlanter);
    // closeModal();
    setModalType("planter");
  };

  const clickGauge = (e) => {
    // var rect = e.target.getBoundingClientRect();
    // var full_wth = rect.right - rect.left;
    var rect = outerBoxDimensions.borderBox;
    setRatio(parseInt(((e.clientX - rect.left) * 100) / rect.width));
  };

  // rootVolume이 85 이상이면 경고로 설정합니다
  useEffect(() => {
    ratio >= 85 ? setIsWarning(1) : setIsWarning(0);
  }, [ratio]);

  return (
    <>
      <VStack
        sx={{ "-webkit-tap-highlight-color": "transparent" }}
        w="full"
        mt={["5em", "4em", "7em"]}
      >
        {/* 아이콘 + 게이지 */}
        {/* w="full" pt={[3, 2]}> */}
        {/* <Flex w="full" pt={isModal ? [3, 2] : 1}> */}
        <Flex w={["85%", "85%", "55%"]} justify="center">
          {/* 아이콘 */}
          <Flex align="center">
            <Icon
              fontSize={["1.2em", "1.4em"]}
              as={GiTreeRoots}
              color="yellow.700"
            />
            {/* <Icon fontSize="md" as={GiTreeRoots} color="gray.400" /> */}
          </Flex>
          {/* 게이지 바탕 */}
          {/* bg="yellow.900" */}
          {/* h={[5, 6]} */}
          <Flex
            ref={outerBoxRef}
            align="center"
            w="full"
            h={["2.8em", "3em", "3em"]}
            borderRadius={borderLeft}
            bg={isWarning ? "#59110c" : "yellow.900"}
            ml={2}
            mr={3}
            _hover={{ cursor: "pointer" }}
            onClick={(e) => {
              // setModalType("rootVolume");
              // clickGauge(e.target.getBoundingClientRect());
              clickGauge(e);
            }}
          >
            <Flex position="relative" overflow="hidden" w="100%" h="100%">
              {/* 게이지 알맹이 */}
              {/* bg="yellow.600" */}
              {/* w={() => planter.rootVolume + "%"} */}
              <Flex
                bg={isWarning ? "red.700" : "yellow.600"}
                w={() => ratio + "%"}
                borderLeftRadius={borderLeft}
                borderRightRadius={0}
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
        <Flex>
          {/* <Flex mt="2em" mb="2em"> */}
          {/* mt="3em" */}
          {/* mb={["2em", "3em"]} */}
          <Button
            mt={["2em", "1.5em", "2em"]}
            mb={["2em", "1.5em", "3em"]}
            size="lg"
            colorScheme="teal"
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

export default ModalRootGaugeEdit;
