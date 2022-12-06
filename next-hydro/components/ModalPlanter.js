import React, { useState } from "react";
import { Img, Image, Box, Flex, VStack, Text, Icon } from "@chakra-ui/react";
// import WaterGauge from "./WaterGauge";
import Moment from "react-moment";
import "moment/locale/ko";
import { ImDroplet } from "react-icons/im";
import { RiLeafFill } from "react-icons/ri";
import ModalTitle from "./ModalTitle";
import ModalTopboard from "./ModalTopboard";
import ModalWaterGauge from "./ModalWaterGauge";
import ModalRootGauge from "./ModalRootGauge";
import ModalGrowthGauge from "./ModalGrowthGauge";

import useModal from "../context/useModal";

// const ModalPlanter = ({ planter, curPlanter, setTypeModal }) => {
// const ModalPlanter = ({ planter, curPlanter }) => {
const ModalPlanter = ({ planter }) => {
  const { setModalType } = useModal();
  const [water, setWater] = useState();
  const [kind, setKind] = useState();
  const [individual, setIndividual] = useState();
  const [waterdate, setWaterDate] = useState();
  const dateToString = (time) => {
    return 0;
  };
  const plantIcon = (len) => {
    // planter.pieces의 갯수로 모종인지 일반상판인지를 구분합니다
    if (len != 3) {
      return <Icon as={RiLeafFill} color="gray.300" />;
    } else {
      // src={"hydro/public/" + planter.plantName + ".png"}
      return <Img w="100%" h="100%" src={"hydro/public/" + planter.imageUrl} />;
    }
  };

  // {
  //   id: 7,
  //   plantName: "중엽쑥갓",
  //   waterGauge: 35,
  //   waterDate: 11111111,
  //   pieces: 6,
  // },
  return (
    <>
      {/* 휴대용 기기에서의 리스폰시브 대응 */}
      <VStack
        w={["12em", "20em"]}
        mb={[5, 8]}
        mt={[4, 6]}
        mx={[0, 1, 4]}
        // spacing={0}
        spacing={[0, 2]}
        /* _hover={isModal ? 0 : { cursor: "pointer" }} */
      >
        {/* 작물 이름 및 작물 포장 사진 */}
        <Flex w="full" justify={"center"} pb={["1.4em", "1.4em"]}>
          {/* 작물 포장 사진 */}
          <Flex
            ml={"0em"}
            mr={"1em"}
            w={["2em", "2.3em"]}
            h={["2em", "2.3em"]}
            borderRadius="full"
            bg="green.500"
            borderColor="gray.400"
            borderWidth={2}
            align="center"
            justify="center"
            overflow="hidden"
          >
            {plantIcon(planter.pieces.length)}
            {/* <Img */}
            {/*   w="100%" */}
            {/*   h="100%" */}
            {/*   src={"hydro/public/" + planter.plantName + ".png"} */}
            {/* /> */}
          </Flex>
          {/* 작물 이름 */}
          <ModalTitle planter={planter} />
          {/* <Flex flexWrap="nowrap" justify="center"> */}
          {/*   {/1* <Flex transform='translate(0, 0%)'> *1/} */}
          {/*   <Text */}
          {/*     justify="center" */}
          {/*     color="green.400" */}
          {/*     fontWeight="bold" */}
          {/*     // fontSize="1em" */}
          {/*     fontSize={["1.2em", "1.5em"]} */}
          {/*     whiteSpace="nowrap" */}
          {/*     overflow="hidden" */}
          {/*     textOverflow="ellipsis" */}
          {/*   > */}
          {/*     {/1* left="50%" *1/} */}
          {/*     {/1* top="50%" *1/} */}
          {/*     {/1* transform="translate(-10%,0%)" *1/} */}
          {/*     {planter.plantName} */}
          {/*   </Text> */}
          {/* </Flex> */}
        </Flex>

        {/* 상판 및 성장게이지 박스 */}
        {/* <Flex pl={'1em'} w="full" h="full"> */}
        <Flex pl={"1em"} w="full" h={["8em", "14em"]}>
          {/* 상판 */}

          {/* <Topboard */}
          {/*   setTypeModal={setTypeModal} */}
          {/*   isModal={isModal} */}
          {/*   piecess={planter.pieces} */}
          {/* /> */}
          {/* <ModalTopboard piecess={planter.pieces} /> */}
          <ModalTopboard planter={planter} />

          {/* 식물 성장도 */}
          {/* <Flex ml={2} bg="teal.200" w="1.3em" h="full" borderRadius='md'></Flex> */}
          {/* <GrowthGauge isModal={isModal} gauge={planter.growth} /> */}
          {/* <ModalGrowthGauge gauge={planter.growth} /> */}
          <ModalGrowthGauge planter={planter} />
        </Flex>

        {/* 물 현재량 */}

        {/* isModal={isModal} */}
        {/* gauge={planter.waterGauge} */}
        {/* time={planter.waterdate} */}
        {/* warning={planter.warning} */}
        <ModalWaterGauge planter={planter} />

        {/* 뿌리 현재크기 */}
        <Flex w="full">
          {/* <RootGauge isModal={isModal} gauge={planter.rootVolume} /> */}
          {/* <RootGauge gauge={planter.rootVolume} /> */}
          <ModalRootGauge planter={planter} />
        </Flex>
      </VStack>
    </>
  );
};

export default ModalPlanter;
