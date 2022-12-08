import React, { useEffect, useState } from "react";
import { VStack, Box, Flex, Text } from "@chakra-ui/react";
import useModal from "../context/useModal";
import usePlanters from "../context/usePlanters";
import usePlanterCur from "../context/usePlanterCur";

const Germinaty = ({ gem }) => {
  // const { waterGauge, warning, seedNames } = gem;
  const { openModal, setModalType } = useModal();
  const [thisGem, setThisGem] = useState({ ...gem });
  const [isWarning, setIsWarning] = useState(0);

  const { setEachGemSetter } = usePlanters();
  const { setCurGem } = usePlanterCur();

  useEffect(() => {
    setEachGemSetter({ id: gem.id, func: setThisGem });
  }, []);

  useEffect(() => {
    thisGem.waterGauge <= 25 ? setIsWarning(1) : setIsWarning(0);
  }, [thisGem.waterGauge]);

  return (
    <>
      <VStack
        pl={3}
        spacing="0.1em"
        mb={2}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          setCurGem({ ...thisGem });
          setModalType("germinaty");
          openModal();
        }}
      >
        {/* 상판 */}
        <Flex
          justify="space-between"
          align="center"
          w="7em"
          h="2.5em"
          px={3}
          py={1}
          bg="gray.600"
          borderRadius="lg"
        >
          {/* <span>ㅋㅋㅋㅋㅋ</span> */}
          {/* {gem.seedNames.map((seedName) => { */}
          {thisGem.seedNames.map((sn) => {
            return (
              <Flex
                key={Math.floor(Math.random() * 1000000)}
                flexWrap="nowrap"
                bg="green.600"
                w="45%"
                h="80%"
                borderRadius="5"
                align="center"
                justify="center"
              >
                {/* 텍스트 생략을 위한 구문 3종 세트 */}
                <Text
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="gray.800"
                  fontSize="0.8em"
                  // fontWeight="normal"
                  // fontWeight="medium"
                  fontWeight="semibold"
                >
                  {sn}
                </Text>
              </Flex>
            );
          })}
        </Flex>

        {/* 수위게이지 */}
        {/* 바탕 */}
        {/* bg={warning ? "#59110c" : "blue.800"} */}
        <Flex
          w="90%"
          h="0.3em"
          borderRadius="1.5"
          position="relative"
          bg={isWarning ? "#59110c" : "blue.800"}
        >
          {/* 알맹이 */}
          {/* bg={warning ? "red.700" : "blue.500"} */}
          <Flex
            w={() => {
              // return gem.waterGauge + "%";
              return thisGem.waterGauge + "%";
            }}
            borderRadius="1.5"
            bg={isWarning ? "red.700" : "blue.500"}
          ></Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default Germinaty;
