import React, { useContext, useState } from "react";
import { VStack, HStack, Flex, Box } from "@chakra-ui/react";
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

  const { setCurPlanter } = usePlanterCur();
  const { postJson, zipPieces, unzipPieces } = usePlanters();

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
              px={[1, 4]}
              py={[1, "0.5em"]}
              w="full"
              justify="space-between"
            >
              {pcs.map((pc, key2) => {
                // console.log("normalBoard " + piece);
                return (
                  <Box
                    key={key1 * 4 + key2}
                    borderRadius="50%"
                    w={[5, 8]}
                    h={[5, 8]}
                    borderWidth={1}
                    borderColor="gray.600"
                    bg={pc ? "green.600" : "gray.700"}
                    onClick={async () => {
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
                      zipPieces(sendingObj);
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
                      console.log(
                        "clicked circle" + (key1 * 4 + key2).toString()
                      );
                      // console.log("piecess:" + piecess);
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
      <Flex flexWrap="wrap" px={1} py="0.5" w="full" justify="space-between">
        {/* {console.log("seedlingBoard " + piecess)} */}
        {/* {piecess.map((piece, key) => { */}
        {planter.pieces.map((piece, key) => {
          return (
            <Box
              key={key}
              borderRadius={5}
              w={6}
              h={6}
              my={1}
              borderWidth={1}
              borderColor="gray.600"
              bg={piece ? "green.600" : "gray.700"}
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
      <VStack
        px={["0.8em", 4]}
        py={["0.8em", "1.3em"]}
        bg="gray.600"
        w="full"
        borderRadius="lg"
        justify="space-between"
      >
        {/* 행렬과 map을 어떻게 병용할까 고민하다가 이중배열과 이중 map을 사용하기로 했습니다 */}

        {/* 배열개수에 따라서 일반상판과 모종상판을 구분하기로 합니다 */}
        {planter.pieces.length === 3 ? normalBoard() : seedlingBoard()}
      </VStack>
    </>
  );
};

export default ModalTopboardEdit;
