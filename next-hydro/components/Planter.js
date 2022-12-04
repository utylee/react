import React, {
  useEffect,
  useState,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import { Img, Image, Box, Flex, VStack, Text, Icon } from "@chakra-ui/react";
import WaterGauge from "./WaterGauge";
import RootGauge from "./RootGauge";
import Moment from "react-moment";
import "moment/locale/ko";
import { ImDroplet } from "react-icons/im";
import { RiLeafFill } from "react-icons/ri";
import Topboard from "./Topboard";
import GrowthGauge from "./GrowthGauge";
// import { reducer } from "./ModalPlanter";
import useModal from "../context/useModal";
// import usePlanter from "../context/usePlanter";
import usePlanterCur from "../context/usePlanterCur";
import usePlanters from "../context/usePlanters";
import { PlantersStateContext } from "../context/PlantersContext";

// const Planter = ({ planter, curPlanter, onOpen, isModal, setTypeModal }) => {
// const Planter = ({ planter, curPlanter, isModal, setTypeModal }) => {
// const Planter = ({ planter, onOpen, curPlanter }) => {

const reducer = (state, action) => {
  switch (action.type) {
    case "update-planter":
      // 해당 id의 planter 객체를 수정합니다
      return action.payload.planters.map((plant) => {
        if (plant.id === action.payload.id) {
          return { ...plant, planter: action.payload.planter };
        }
        return plant;
      });

    default:
  }
};

// curPlanter를 직접받지 않게 일단 변경해봅니다
// const Planter = ({ planter, curPlanter }) => {
const Planter = ({ planter }) => {
  //
  // const { onOpen } = useModal();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [water, setWater] = useState();
  const [kind, setKind] = useState();
  const [individual, setIndividual] = useState();
  const [waterdate, setWaterDate] = useState();

  // 많은 state 대신 처리할 reducer를 만들기로 선언해놓습니다
  const [state, dispatch] = useReducer(reducer);

  // 리렌더용 각 planterSetter용 변수
  // const [thisPlanter, setThisPlanter] = useState([]);
  const [thisPlanter, setThisPlanter] = useState({ ...planter });

  const { openModal, getIsOpen, setModalType } = useModal();
  const { setCurPlanter } = usePlanterCur();
  const { setEachSetter } = usePlanters();

  // const {
  //   getCurPlanter,
  //   setCurPlanter,
  //   getCurPlanterSetter,
  //   setCurPlanterSetter,
  // } = usePlanter();
  // { getIsOpen, getModalType, setModalType, openModal, closeModal };

  const setEachSettersMemo = useCallback((a, b) => setEachSetter(a, b), []);
  // const setEachSettersMemo = useMemo(() => {
  //   setEachSetters;
  // }, []);

  useEffect(() => {
    // console.log("Planter.js useEffected: " + mykey);
    console.log("Planter.js useEffected:setThisPlanter  " + planter.id);
    setEachSetter({ id: planter.id, func: setThisPlanter });
    console.log("thisPlanter func: " + setThisPlanter);

    // setThisPlanter = { ...planter };

    // setEachSettersMemo(planter.id, { ...planter });
    // setEachSetter(planter.id, { ...planter });
  }, []);
  // }, [planter]);

  const dateToString = (time) => {
    return 0;
  };

  const plantIcon = (i) => {
    // planter.id 로 변경합니다
    // planter.pieces의 갯수로 모종인지 일반상판인지를 구분합니다
    // if (len != 3) {
    if (i === 7) {
      return <Icon as={RiLeafFill} color="gray.300" />;
    } else {
      return (
        <>
          {/* <Img */}
          {/*   w="100%" */}
          {/*   h="100%" */}
          {/*   src={"hydro/public/" + planter.plantName + ".png"} */}
          {/* /> */}
          <Img w="100%" h="100%" src={"hydro/public/" + thisPlanter.imageUrl} />
        </>
      );
    }
  };

  // {
  //   id: 7,
  //   plantName: "중엽쑥갓",
  //   waterGauge: 35,
  //   waterDate: 11111111,
  //   pieces: 6,
  // },

  // useEffect(() => {
  //   setThisPlanter({ ...planter });
  // }, []);
  return (
    <>
      {console.log("Planter" + thisPlanter.id + " rendered")}
      {/* 휴대용 기기에서의 리스폰시브 대응 */}
      <VStack
        w={"9em"}
        mb={"4em"}
        mx={[2, 1, 4]}
        // spacing={0}
        spacing={0}
        // { getIsOpen, getModalType, setModalType, openModal, closeModal };

        // curPlanter.current = { ...planter };
        //
        // 할당이 현재는 의미없는 것 같아서 빼보았습니다
        // setCurPlanter({ ...planter });
        // setCurPlanterHook({ ...planter });
        // setCurPlanterSetter(setThisPlanter);
        onClick={() => {
          setModalType("planter");
          setCurPlanter({ ...thisPlanter });
          // console.log("setCurPlanterSetter:" + setThisPlanter);
          openModal();
          // console.log("getIsOpen():", getIsOpen());
        }}
        _hover={{ cursor: "pointer" }}
      >
        {/* 작물 이름 및 작물 포장 사진 */}
        <Flex w="full" justify={"flex-start"} pb={1}>
          {/* <Flex w="full" justify="center" transform="translate(-5%, 0)" pb={1}> */}
          {/* <Flex w="full" justify="center" pb={1}> */}
          {/* 작물 포장 사진 */}
          <Flex
            ml={6}
            mr={1}
            w={"1.5em"}
            h={"1.5em"}
            borderRadius="full"
            bg="green.500"
            borderColor="gray.400"
            // borderWidth={1}
            borderWidth={1}
            align="center"
            justify="center"
            overflow="hidden"
          >
            {/* transform="translate(0, -25%)" */}
            {/* borderRadius="full" */}
            {/* <Img w="110%" h="110%" src="/hydro/superhotwind.png" /> */}
            {/* <Img w="110%" h="110%" src="hydro/public/superhotwind.png" /> */}

            {/* 구멍개수가 아닌 id로 새싹을 구분합니다 */}
            {/* {plantIcon(planter.pieces.length)} */}
            {plantIcon(thisPlanter.id)}

            {/* <Img */}
            {/*   w="100%" */}
            {/*   h="100%" */}
            {/*   src={"hydro/public/" + planter.plantName + ".png"} */}
            {/* /> */}
          </Flex>
          {/* 작물 이름 */}
          {/* <Flex width='70%' flexWrap="nowrap" justify="center"> */}
          <Flex flexWrap="nowrap" justify="center">
            {/* <Flex transform='translate(0, 0%)'> */}
            <Text
              justify="center"
              color="green.400"
              fontWeight="bold"
              // fontSize="1em"
              fontSize={"1em"}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {/* left="50%" */}
              {/* top="50%" */}
              {/* transform="translate(-10%,0%)" */}
              {thisPlanter.plantName}
            </Text>
          </Flex>
        </Flex>
        {/* 상판 및 성장게이지 박스 */}
        <Flex pl={3} w="full" h="full">
          {/* 상판 */}
          {/* setTypeModal={setTypeModal} */}
          {/* isModal={isModal} */}

          {console.log(
            "Planter.js:before Topboard:piecess: " + thisPlanter.pieces
          )}
          {console.log(
            "Planter.js:before Topboard:tiecess: " + planter.pieces
          )}
          {/* <Topboard id={thisPlanter.id} piecess={thisPlanter.pieces} /> */}
          <Topboard id={thisPlanter.id} piecess={planter.pieces} />
          {/* 식물 성장도 */}
          {/* <Flex ml={2} bg="teal.200" w="1.3em" h="full" borderRadius='md'></Flex> */}

          {/* <GrowthGauge isModal={isModal} gauge={planter.growth} /> */}
          <GrowthGauge gauge={thisPlanter.growth} />
        </Flex>
        {/* 물 현재량 */}
        {/* isModal={isModal} */}
        <WaterGauge
          gauge={thisPlanter.waterGauge}
          time={thisPlanter.waterDate}
          warning={thisPlanter.warning}
        />
        {/* 뿌리 현재크기 */}
        <Flex w="full">
          {/* <RootGauge isModal={isModal} gauge={planter.rootVolume} /> */}
          <RootGauge gauge={thisPlanter.rootVolume} />
        </Flex>
      </VStack>
    </>
  );
};

export default React.memo(Planter);
// export default Planter;
