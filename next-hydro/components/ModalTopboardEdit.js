import React, { useContext, useState } from "react";
import { VStack, Button, HStack, Flex, Box } from "@chakra-ui/react";
import useModal from "../context/useModal";
// import usePlanter from "../context/usePlanter";
import { PlanterCurStateContext } from "../context/PlanterCurContext";
import usePlanterCur from "../context/usePlanterCur";
import usePlanters from "../context/usePlanters";
import { PlantersStateContext } from "../context/PlantersContext";

// const Topboard = ({ plantName, piecess, isModal, setTypeModal }) => {
// const ModalTopboardEdit = ({ piecess }) => {
const ModalTopboardEdit = ({ planter }) => {
  const { getIsOpen, getModalType, setModalType, openModal, closeModal } =
    useModal();
  // const { getCurPlanter2, setCurPlanter2, getCurPlanterSetter } = usePlanter();

  // const { getCurPlanter, setCurPlanter } = usePlanter();
  const { curPlanter } = useContext(PlanterCurStateContext);
  const { setters } = useContext(PlantersStateContext);

  // const [thisPieces, setThisPieces] = useState(piecess);
  const [thisPieces, setThisPieces] = useState(planter.pieces);

  // const { setCurPlanter } = usePlanterCur();
  const { postJson } = usePlanters();

  const clickSquare = async (pc, key) => {
    const { pieces, ...rest } = curPlanter;
    pieces[key] = +!pc;
    setters[planter.id]({ pieces, ...rest });

    let sendingObj = { pieces, ...rest };
    await postJson(sendingObj);

    console.log("setter(" + planter.id + ") executed");
    setThisPieces({ ...planter.pieces });

    // console.log("getCurPlanterSetter:" + getCurPlanterSetter);
    // (getCurPlanterSetter())(getCurPlanter());
    //
    // setCurPlanter({ ...getCurPlanter() });
    //
    // console.log("curPlanter :" + getCurPlanter());
    // getCurPlanter.pieces[key1][key2] = +!piecess[key1][key2];
    console.log("clicked square" + key.toString());
    // console.log("piecess:" + piecess);
  };

  const clickCircle = async (pc, key1, key2) => {
    // boolean 앞에 + 를 붙여주면 1과 0으로 표현이 바뀐다고 합니다 */}
    // 참고 https://stackoverflow.com/a/7820695 */}
    // getCurPlanter().pieces[key1][key2] =
    //   +!piecess[key1][key2];
    const { pieces, ...rest } = curPlanter;
    pieces[key1][key2] = +!pc;
    // setCurPlanter({ pieces, ...rest });
    // setters[planter.id](planter);
    setters[planter.id]({ pieces, ...rest });

    let sendingObj = { pieces, ...rest };
    // zipPieces(sendingObj);
    await postJson(sendingObj);
    // unzipPieces(send{ pieces, ...rest });
    // await postJson({ pieces, ...rest });
    // unzipPieces({ pieces, ...rest });

    console.log("setter(" + planter.id + ") executed");
    // 리렌더를 위해 setCurPlanter 를 해줍니다
    // 문제는 모든 planter가 모두 리렌더 되는 문제가 있습니다
    //

    // setThisPieces({ pieces });
    setThisPieces({ ...planter.pieces });

    // console.log("getCurPlanterSetter:" + getCurPlanterSetter);
    // (getCurPlanterSetter())(getCurPlanter());
    //
    // setCurPlanter({ ...getCurPlanter() });
    //
    // console.log("curPlanter :" + getCurPlanter());
    // getCurPlanter.pieces[key1][key2] = +!piecess[key1][key2];
    console.log("clicked circle" + (key1 * 4 + key2).toString());
    // console.log("piecess:" + piecess);
  };

  // 일반 상판입니다
  const normalBoard = () => {
    return (
      <>
        {/* {piecess.map((pieces, key1) => { */}
        {planter.pieces.map((pcs, key1) => {
          // console.log("normalBoard " + piecess);
          return (
            // 각구멍들입니다
            <HStack
              key={key1}
              px={["1.2em", "2em", "2em"]}
              py={["0.3em", "0.6em", "0.7em"]}
              w="full"
              justify="space-between"
            >
              {pcs.map((pc, key2) => {
                // console.log("normalBoard " + piece);
                return (
                  <Box
                    key={key1 * 4 + key2}
                    borderRadius="50%"
                    w={[5, 7, 8]}
                    h={[5, 7, 8]}
                    borderWidth={1}
                    borderColor="gray.600"
                    bg={pc ? "green.600" : "gray.700"}
                    onClick={() => {
                      clickCircle(pc, key1, key2);
                    }}
                    _hover={{ cursor: "pointer" }}
                  ></Box>
                );
              })}
            </HStack>
          );
        })}
      </>
    );
  };
  const seedlingBoard = () => {
    return (
      <Flex
        flexWrap="wrap"
        px={["0.9em", "1.6em", "1.2em"]}
        pt={["0.8em", "1em", "0.8em"]}
        w="full"
        justify="space-between"
      >
        {/* {console.log("seedlingBoard " + piecess)} */}
        {/* {piecess.map((piece, key) => { */}
        {planter.pieces.map((pc, key) => {
          return (
            <Box
              key={key}
              borderRadius={5}
              w={["2.2em", "3em", "3em"]}
              h={["2.2em", "3em", "3em"]}
              mx={["0.2em", "0.4em", "1em"]}
              mb={["0.9em", "1.4em", "1.3em"]}
              borderWidth={1}
              borderColor="gray.600"
              bg={pc ? "green.600" : "gray.700"}
              onClick={() => {
                clickSquare(pc, key);
              }}
            ></Box>
          );
        })}
      </Flex>
    );
  };
  return (
    <>
      {/* ml={(["1.2em"], ["1.4em"])} */}
      {/* onClick= */}
      {/* {() => { */}
      {/* setModalType("topboard"); */}
      {/* console.log("setModalType:topboard edit"); */}
      {/* }} */}
      {/* _hover={{ cursor: "pointer" }} */}
      {/* justify="space-between" */}
      {/* <Flex w="full" h="full" justify={"center"} align="center" flexDirection={"column"}> */}
      <VStack w="full" h="full" justify={"center"} align="center">
        {/* px={["0.8em", "0.2em", "0.8em"]} */}
        <VStack
          align={"center"}
          mt={["3em", "0.5em", "5em"]}
          mx={["1em", "0.2em", "4em"]}
          py={["0.8em", "1.3em", "1.5em"]}
          bg="gray.600"
          w={["10em", "16em", "18em"]}
          borderRadius="lg"
        >
          {/* 행렬과 map을 어떻게 병용할까 고민하다가 이중배열과 이중 map을 사용하기로 했습니다 */}

          {/* 배열개수에 따라서 일반상판과 모종상판을 구분하기로 합니다 */}
          {planter.pieces.length === 3 ? normalBoard() : seedlingBoard()}
        </VStack>
        <Flex>
          {/* <Flex mt="2em" mb="2em"> */}
          <Button
            size="lg"
            colorScheme="teal"
            mt={["1em", "0em", "2em"]}
            mb={["2em", "0.5em", "3em"]}
            onClick={() => {
              closeModal();
              // handleFinishClick();
            }}
          >
            {/* <Button size="md" colorScheme="teal"> */}
            닫기
          </Button>
        </Flex>
      </VStack>
    </>
  );
};

export default ModalTopboardEdit;
