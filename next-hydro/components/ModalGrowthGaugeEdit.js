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

const ModalGrowthGaugeEdit = ({ planter }) => {
  const borderBottom = ["1em", "1em"];
  const borderTop = ["0.4em", "0.5em"];

  const outerBoxRef = useRef();
  const outerBoxDimensions = useDimensions(outerBoxRef);

  const [ratio, setRatio] = useState(planter.growthGauge);
  // const [isWarning, setIsWarning] = useState();
  const { closeModal } = useModal();
  const { setters } = useContext(PlantersStateContext);
  const { postJson } = usePlanters();

  const handleFinishClick = async () => {
    console.log("ModalGrowthGaugeEdit:finish clicked");
    const newPlanter = { ...planter };
    const { growthGauge, ...rest } = newPlanter;
    newPlanter.growthGauge = ratio;
    // setters[parseInt(newPlanter.id)]({ ...rest, waterGauge: ratio });
    setters[parseInt(newPlanter.id)](newPlanter);

    await postJson(newPlanter);
    closeModal();
  };

  const clickGauge = (e) => {
    // var rect = e.target.getBoundingClientRect();
    // var full_wth = rect.right - rect.left;
    var rect = outerBoxDimensions.borderBox;
    // console.log("growthGauge:e.clientY: " + e.clientY);
    // console.log("growthGauge:rect.bottom: " + rect.bottom);
    setRatio(parseInt(((rect.bottom - e.clientY) * 100) / rect.height));
  };

  // useEffect(() => {
  //   ratio <= 25 ? setIsWarning(1) : setIsWarning(0);
  // }, [ratio]);
  return (
    <>
      {/* 게이지 바탕 */}
      {/* h="full" */}
      <VStack>
        <Flex
          ref={outerBoxRef}
          direction="column"
          ml={1}
          mt={["4em", "1em", "3em"]}
          w={["4em", "4.5em", "5em"]}
          h={["10em", "10em", "12em"]}
          bg={"green.900"}
          borderRadius={borderBottom}
          justify="flex-end"
          align="center"
          _hover={{ cursor: "pointer" }}
          onClick={(e) => {
            // setModalType("watergauge");
            // clickGauge(e.target.getBoundingClientRect());
            clickGauge(e);
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
          {/* h={() => parseInt(planter.growthGauge) + "%"} */}
          <Flex
            w="full"
            h={() => parseInt(ratio) + "%"}
            bg="green.500"
            borderBottomRadius={borderBottom}
            borderTopRadius={borderTop}
          ></Flex>
          {/* backgroundImage={ */}
          {/*   <Icon */}
          {/*     clipPath="inset(30% 0 0 0)" */}
          {/*     color="green.500" */}
          {/*     as={ImLeaf} */}
          {/*     mb={1} */}
          {/*   /> */}
        </Flex>
        <Flex>
          {/* <Flex mt="2em" mb="2em"> */}
          <Button
            size="lg"
            colorScheme="teal"
            mt={["2em", "1em", "3em"]}
            mb={["2em", "1em", "2em"]}
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

export default ModalGrowthGaugeEdit;
