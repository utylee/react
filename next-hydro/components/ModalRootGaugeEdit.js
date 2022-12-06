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
import { PlantersStateContext } from "../context/PlantersContext";

const ModalRootGaugeEdit = ({ planter }) => {
  const borderLeft = ["0.6em", "0.7em"];
  const borderRight = ["0.4em", "0.5em"];

  const outerBoxRef = useRef();
  const outerBoxDimensions = useDimensions(outerBoxRef);

  const [ratio, setRatio] = useState(planter.rootVolume);
  const [isWarning, setIsWarning] = useState();
  const { closeModal } = useModal();
  const { setters } = useContext(PlantersStateContext);
  const { postJson } = usePlanters();

  const handleFinishClick = async () => {
    console.log("ModalWaterGaugeEdit:finish clicked");
    const newPlanter = { ...planter };
    // const { rootVolume, ...rest } = newPlanter;
    newPlanter.rootVolume = ratio;
    // setters[parseInt(newPlanter.id)]({ ...rest, rootVolume: ratio });
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

  // rootVolume이 85 이상이면 경고로 설정합니다
  useEffect(() => {
    ratio >= 85 ? setIsWarning(1) : setIsWarning(0);
  }, [ratio]);

  return (
    <>
      <VStack w="full" pt={["1.6em", "2.2em"]} mt={["2em", "4em"]}>
        {/* 아이콘 + 게이지 */}
        <Flex
          w="full"
          pt={[3, 2]}
          _hover={{ cursor: "pointer" }}
          onClick={(e) => {
            // setModalType("rootVolume");
            // clickGauge(e.target.getBoundingClientRect());
            clickGauge(e);
          }}
        >
          {/* <Flex w="full" pt={isModal ? [3, 2] : 1}> */}
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
          <Flex
            ref={outerBoxRef}
            align="center"
            w="full"
            h={[5, 6]}
            borderRadius={borderLeft}
            bg={isWarning ? "#59110c" : "yellow.900"}
            ml={2}
            mr={3}
          >
            <Flex position="relative" overflow="hidden" w="100%" h="100%">
              {/* 게이지 알맹이 */}
              {/* bg="yellow.600" */}
              {/* w={() => planter.rootVolume + "%"} */}
              <Flex
                bg={isWarning ? "red.700" : "yellow.600"}
                w={() => ratio + "%"}
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

export default ModalRootGaugeEdit;
