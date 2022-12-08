import React, { useEffect, useState } from "react";
import { Text, VStack, Flex, Button } from "@chakra-ui/react";
import useModal from "../context/useModal";
import usePlanters from "../context/usePlanters";

const ModalGerminatyEdit = ({ gem }) => {
  const borderLeft = ["0.6em", "0.7em", "0.8em"];

  const [thisGem, setThisGem] = useState(gem);
  const [isWarning, setIsWarning] = useState(0);
  const { closeModal } = useModal();
  const { postJson } = usePlanters();

  const handleFinishClick = () => {
    closeModal();
  };

  useEffect(() => {
    thisGem.waterGauge <= 25 ? setIsWarning(1) : setIsWarning(0);
  }, [thisGem.waterGauge]);

  return (
    <>
      {/* spacing="0.1em" */}
      <VStack mt={["4em", "1em", "2em"]}>
        {/* _hover={{ cursor: "pointer" }} */}
        {/* onClick={() => { */}
        {/* setCurGem({ ...thisGem }); */}
        {/* setModalType("germinaty"); */}
        {/* openModal(); */}
        {/* }} */}
        {/* 상판 */}
        <Flex
          justify="space-between"
          align="center"
          w={["14.2em", "18em", "17em"]}
          h={["4.5em", "4em", "7em"]}
          px={["1em", "1em", "1em"]}
          py={["0.5em", "0.5em", "1em"]}
          mb={["1.3em", "1em", "1.3em"]}
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
                  fontSize={["1.3em", "1.3em", "1.5em"]}
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
          w={["13em", "16em", "16em"]}
          h={["2.2em", "2em", "3em"]}
          borderRadius={borderLeft}
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
            borderLeftRadius={borderLeft}
            bg={isWarning ? "red.700" : "blue.500"}
          ></Flex>
        </Flex>
        <Flex>
          {/* <Flex mt="2em" mb="2em"> */}
          <Button
            size="lg"
            colorScheme="teal"
            mt={["3em", "2em", "2.5em"]}
            mb={["2em", "1.5em", "2em"]}
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

export default ModalGerminatyEdit;
