import React, { useContext, useRef, useEffect, useState } from "react";
import {
  Input,
  Box,
  Text,
  VStack,
  Flex,
  Button,
  ButtonGroup,
  useDimensions,
} from "@chakra-ui/react";
import useModal from "../context/useModal";
import usePlanters from "../context/usePlanters";
import {
  PlantersGemSettersContext,
  PlantersStateContext,
} from "../context/PlantersContext";

// postJson 을 위해 나머지 상판의 정보를 같이 가져오기 위해 구조를
// 현재 id 와 gems 를 같이 가져오기로 바꾸었습니다
// {id: n, gems: []}
const ModalGerminatyEdit = ({ curGems }) => {
  // const { gemSetters } = useContext(PlantersStateContext);
  const gemSetters = useContext(PlantersGemSettersContext);
  const { postJson, zipGemData } = usePlanters();
  const { closeModal } = useModal();

  const firstGemRef = useRef();
  const secondGemRef = useRef();
  const inputRefs = [firstGemRef, secondGemRef];

  const boxRef = useRef();
  const gaugeDimension = useDimensions(boxRef);

  // const [thisGem, setThisGem] = useState(gem);
  // const [thisGem, setThisGem] = useState({ seedNames: [], waterGauge: 0 });
  const [thisGem, setThisGem] = useState(
    curGems.gems.find((g) => g.id == curGems.id)
  );
  // const [thisGem, setThisGem] = useState({});
  const otherGems = [];
  const [isWarning, setIsWarning] = useState(0);
  const [isTextEdit, setIsTextEdit] = useState(false);
  const [editPosition, setEditPosition] = useState(0);
  const [inputZIndex, setInputZIndex] = useState([2, 2]);
  const [ratio, setRatio] = useState(
    curGems.gems.find((g) => g.id == curGems.id).waterGauge
  );

  const OnClickGauge = (e) => {
    var rect = gaugeDimension.borderBox;
    setRatio(parseInt(((e.clientX - rect.left) * 100) / rect.width));
  };

  const OnHiddenConfirm = () => {
    // 인터페이스 조작부
    setIsTextEdit(false);
    var tempArray = [...inputZIndex];
    tempArray[editPosition] = 2;
    setInputZIndex(tempArray);

    // 데이터 조작 및 모달 업데이트부
    var tempThisGem = { ...thisGem };
    tempThisGem.seedNames[editPosition] = inputRefs[editPosition].current.value;
    setThisGem(tempThisGem);
    console.log("thisGem..");
    console.log(thisGem);

    // index planter 업데이트부
    UpdateFullGems();
  };

  const UpdateFullGems = () => {
    var tempOtherGems = [];
    tempOtherGems = curGems.gems.filter((g) => g.id != curGems.id);
    console.log("tempOtherGems..");
    console.log(tempOtherGems);
    var fullGems = [...tempOtherGems];
    fullGems.push(thisGem);

    fullGems.sort((a, b) => {
      return a.id - b.id;
    });

    console.log("fullGems..");
    console.log(fullGems);
    gemSetters[0](fullGems);
    console.log("gemSetters done");
    return fullGems;
  };

  const OnConfirm = async () => {
    var arSeeds = [];
    var arWatergauge = [];

    var tempPieces = "";
    var tempWaterGauge = 0;

    // console.log(curGems.gems);
    var tempGems = [...curGems.gems];
    console.log("curGems.id: " + curGems.id);
    console.log("tempGems");
    console.log(tempGems);

    // const { waterGauge, ...restThisGem } = thisGem;
    // const tempThisGem = { waterGauge: ratio, ...restThisGem };
    // setThisGem(tempThisGem);

    // var fullGems = [];
    // fullGems = UpdateFullGems();

    const otherGemsObj = tempGems.filter((g) => g.id != curGems.id);
    console.log("otherGemsObj");
    console.log(otherGemsObj);
    console.log("otherGemsObj.len");
    console.log(otherGemsObj.length);
    var thisGemObj = {
      id: curGems.id,
      seedNames: [...thisGem.seedNames],
      // waterGauge: thisGem.waterGauge,
      waterGauge: ratio,
      warning: 0,
    };

    // console.log("thisGemObj");
    // console.log(thisGemObj);
    // console.log("before pushed otherGemsObj");
    // console.log(otherGemsObj);
    // console.log("otherGemsObj.len");
    // console.log(otherGemsObj.length);
    otherGemsObj.push(thisGemObj);
    otherGemsObj.sort((a, b) => {
      return a.id - b.id;
    });
    // console.log("sorted");
    // console.log(otherGemsObj);
    // console.log("otherGemsObj.len");
    // console.log(otherGemsObj.length);

    console.log("sorted");
    console.log(otherGemsObj);

    // fullGems.map((obj) => {
    otherGemsObj.map((obj) => {
      // console.log("seedNames: ");
      // console.log(obj.seedNames);
      arSeeds = arSeeds.concat(obj.seedNames);
      // console.log("arSeeds: ");
      // console.log(arSeeds);
      arWatergauge.push(obj.waterGauge);
    });
    // OnHiddenConfirm();

    // 씨앗발아 전용으로 pieces는 이름들, watergauge는 6자리 정수로 변환합니다
    tempPieces = arSeeds.join(",");
    tempWaterGauge =
      arWatergauge[0] * 10000 + arWatergauge[1] * 100 + arWatergauge[2];

    var tempPlanter = {
      id: 8,
      plantName: "씨앗발아",
      waterGauge: tempWaterGauge,
      waterDate: 123456,
      warning: 0,
      growthGauge: 1,
      pieces: tempPieces,
      rootVolume: 0,
      waterRate: 1,
      growthRate: 1,
      rootRate: 1,
      imageUrl: "0",
    };

    console.log("germinatyedit: completed tempPlanter: ");
    console.log(tempPlanter);

    await postJson(tempPlanter);

    gemSetters[0](otherGemsObj);
    console.log("gemSetters done");
  };

  const setEditProc = (n) => {
    // n이 0이면 왼쪽 text 수정모드, 1이면 오른쪽 text 수정모드 입니다
    inputRefs[n].current.focus();
    inputRefs[n].current.value = thisGem.seedNames[n];

    setEditPosition(n);

    var tempArray = [...inputZIndex];
    tempArray[n] = 10;
    tempArray[+!n] = 2;
    setInputZIndex(tempArray);

    // setIsTextEdit((isTextEdit) => !isTextEdit);
    setIsTextEdit(true);
  };

  const handleFinishClick = () => {
    OnConfirm();
    closeModal();
  };

  useEffect(() => {
    // setThisGem(curGems.gems.find((g) => g.id === curGems.id));
    otherGems = curGems.gems.filter((g) => g.id != curGems.id);
    console.log("useEffect:thisGem...");
    console.log(thisGem);
    console.log("useEffect:waterGauge...");
    console.log(thisGem.waterGauge);
    // setRatio(thisGem.waterGauge);
    console.log("otherGems..");
    console.log(otherGems);
    // console.log(tempGem);
    // }, [thisGem]);
  }, []);

  useEffect(() => {
    // thisGem.waterGauge <= 25 ? setIsWarning(1) : setIsWarning(0);
    // }, [thisGem.waterGauge]);
    ratio <= 25 ? setIsWarning(1) : setIsWarning(0);
  }, [ratio]);

  return (
    <VStack mt={["3em", "1em", "2em"]}>
      {/* _hover={{ cursor: "pointer" }} */}
      {/* onClick={() => { */}
      {/* setCurGem({ ...thisGem }); */}
      {/* setModalType("germinaty"); */}
      {/* openModal(); */}
      {/* }} */}

      {/* 입력 안내문구 */}
      {/* <InfoInputText /> */}

      {/* 상판 */}
      <BaseBoard>
        {/* 기본텍스트 상판 */}
        {/* zIndex 5 */}
        {/* setRef={setRef} */}
        <DefaultTextBoard
          thisGem={thisGem}
          inputRefs={inputRefs}
          editPosition={editPosition}
          isTextEdit={isTextEdit}
          inputZIndex={inputZIndex}
          setEditProc={setEditProc}
          onHiddenConfirm={OnHiddenConfirm}
        />

        {/* 숨겨진 Input 상판 */}
        {/* zIndex 1 / 10 */}
        {/* getRef={getRef} */}
        {/* <HiddenInputBoard */}
        {/*   firstGemRef={firstGemRef} */}
        {/*   editPosition={editPosition} */}
        {/*   isTextEdit={isTextEdit} */}
        {/* /> */}

        {/* 숨겨진 텍스트 입력완료버튼 */}
        {/* zIndex = 2 */}
        <HiddenFinishButton
          onHiddenConfirm={OnHiddenConfirm}
          isTextEdit={isTextEdit}
        />
      </BaseBoard>

      {/* 수위게이지 */}
      <WaterGauge
        boxRef={boxRef}
        ratio={ratio}
        thisGem={thisGem}
        isWarning={isWarning}
        onClickGauge={OnClickGauge}
      />

      {/* 전체입력완료버튼 */}
      {/* <FinishButton key={keyForRender} /> */}
      <FinishButton
        isTextEdit={isTextEdit}
        handleFinishClick={handleFinishClick}
      />
    </VStack>
  );
};

/* 입력 안내문구 */
const InfoInputText = ({ isTextEdit }) => {
  return (
    <Flex
      transition={"0.3s"}
      w={["10em", "12em", "15em"]}
      h={isTextEdit ? ["1em", "0.5em", "1.5em"] : "0em"}
      justify={"center"}
    >
      <Text
        fontSize={["sm", "md", "md"]}
        color="gray.500"
        opacity={isTextEdit ? "0" : "0"}
        transition={"opacity 0.3s"}
      >
        수정 후 enter를 눌러주세요
      </Text>
    </Flex>
  );
};

// 상판
const BaseBoard = ({ children }) => {
  return (
    <Flex
      w="full"
      justify="center"
      position="relative"
      mb={["5em", "3.7em", "6.2em"]}
    >
      {children}
    </Flex>
  );
};

// 기본텍스트 상판
// setRef,
const DefaultTextBoard = ({
  thisGem,
  inputRefs,
  editPosition,
  setEditProc,
  inputZIndex,
  isTextEdit,
  onHiddenConfirm,
}) => {
  return (
    <Flex
      position={"absolute"}
      align="center"
      w={["14em", "14em", "18em"]}
      h={["5em", "3.5em", "6em"]}
      bg="gray.600"
      borderRadius="lg"
      justify="space-between"
      zIndex={5}
    >
      {/* w={["14.2em", "18em", "17em"]} */}
      {/* h={["4.5em", "4em", "7em"]} */}
      {/* justify="space-between" */}
      {/* px={["1em", "1em", "1em"]} */}
      {/* py={["1em", "0.5em", "1em"]} */}

      {/* <span>ㅋㅋㅋㅋㅋ</span> */}
      {/* {gem.seedNames.map((seedName) => { */}
      {/* key={Math.floor(Math.random() * 1000000)} */}
      {thisGem.seedNames.map((sn, index) => {
        return (
          <Flex
            key={"inputouter" + index}
            w="full"
            h="full"
            position={"relative"}
            align="center"
            justify={"center"}
          >
            {console.log(
              "index: " +
                index +
                ", isTextEdit: " +
                isTextEdit +
                ", editPosition: " +
                editPosition
            )}
            <Flex
              key={"input" + index}
              position={"absolute"}
              mx={["1em", "2em", "1em"]}
              w={["5em", "4.5em", "7em"]}
              h={["3em", "2.3em", "4em"]}
              flexWrap="nowrap"
              borderRadius="lg"
              bg="green.400"
              justify={"center"}
              zIndex={inputZIndex[index]}
            >
              {/* ref={index == 0 ? firstGemRef : secondGemRef} */}
              {/* w="45%" */}
              {/* <Box w="40%" h="40%" justify={"center"}> */}
              {/* sx={{ WebkitTapHighlightColor: "transparent" }}> */}
              {/* w="4em" */}
              {/* h="80%" */}
              <Flex
                w="full"
                h="full"
                justify={"center"}
                align={"center"}
                borderRadius="lg"
              >
                {/* placeholder="치커리" */}
                {/* _placeholder={{ */}
                {/* color: "green.300", */}
                {/* fontWeight: "bold", */}
                {/* }} */}
                {/* rounded="lg" */}
                <Input
                  w="3em"
                  size="md"
                  textAlign={"center"}
                  fontSize={["1.1em", "1.1em", "1.4em"]}
                  fontWeight="medium"
                  variant="unstyled"
                  onKeyPress={(e) => {
                    e.key === "Enter"
                      ? e.target.value.trim().length != 0
                        ? onHiddenConfirm()
                        : null
                      : null;
                  }}
                  placeholder={sn}
                  ref={inputRefs[index]}
                />
              </Flex>
            </Flex>
            <Flex
              position="absolute"
              key={index}
              _hover={{ cursor: "pointer", background: "green.500" }}
              onClick={(e) => {
                setEditProc(index);
                // setEditPosition(index);
                // setRef(index);
                console.log("MGemEdit:editPosition is : " + editPosition);
                // setIsTextEdit((isTextEdit) => !isTextEdit);
                // inputRefs[editPosition].current.focus();
                console.log(
                  "MGemEdit:current.focus position is : " + editPosition
                );
              }}
              mx={["1em", "0em", "1em"]}
              w={["5em", "4.5em", "7em"]}
              h={["3em", "2.3em", "4em"]}
              flexWrap="nowrap"
              borderRadius="lg"
              bg="green.600"
              zIndex={8}
            >
              {/* ref={index == 0 ? firstGemRef : secondGemRef} */}
              {/* w="45%" */}
              {/* <Box w="40%" h="40%" justify={"center"}> */}
              {/* sx={{ WebkitTapHighlightColor: "transparent" }}> */}
              {/* w="4em" */}
              {/* h="80%" */}
              <Flex
                w="full"
                h="full"
                justify={"center"}
                align={"center"}
                borderRadius="lg"
              >
                {/* 텍스트 생략을 위한 구문 3종 세트 */}
                <Text
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="gray.800"
                  fontSize={["1.1em", "1.1em", "1.5em"]}
                  // fontWeight="normal"
                  // fontWeight="medium"
                  fontWeight="medium"
                >
                  {sn}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

// 숨겨진 텍스트 입력완료버튼
// / zIndex = 2 /
/* h={isTextEdit ? "2em" : "0em"} */
/* px={["1em", "1em", "1em"]} */
// mb={["0.5em", "0.5em", "1.3em"]}
const HiddenFinishButton = ({ isTextEdit, onHiddenConfirm }) => {
  return (
    <Flex
      justify={"center"}
      align="center"
      transition="0.3s"
      position="absolute"
      w={["14em", "14em", "18em"]}
      py={["1em", "0em", "1em"]}
      h={["4.5em", "3.5em", "4.5em"]}
      mt={isTextEdit ? ["4em", "2.8em", "5em"] : "0em"}
      bg="gray.600"
      borderRadius="lg"
      zIndex={2}
    >
      {/* display={isTextEdit ? "flex" : "none"} */}
      {/* mt="0.5em" */}
      <Button
        w={["10em", "8em", "10em"]}
        h="2em"
        colorScheme="blue"
        onClick={() => {
          onHiddenConfirm();
          // setIsTextEdit(false);
          // var tempArray = [...inputZIndex];
          // tempArray[editPosition] = 2;
          // setInputZIndex(tempArray);
        }}
      >
        입력완료
      </Button>
    </Flex>
  );
};

// 숨겨진 Input 상판
// zIndex 10 / 1
const HiddenInputBoard = ({ firstGemRef, editPosition, isTextEdit }) => {
  return (
    <Flex
      py="1em"
      position={"absolute"}
      align="center"
      w={["14em", "18em", "20em"]}
      h={["5em", "18em", "8em"]}
      bg="red.800"
      borderRadius="lg"
      justify="space-between"
      zIndex={isTextEdit ? 10 : 1}
    >
      {/* <Flex */}
      {/*   w="14em" */}
      {/*   justify="center" */}
      {/*   position="absolute" */}
      {/*   borderRadius="lg" */}
      {/*   bg="red" */}
      {/*   zIndex={isTextEdit ? 10 : 1} */}
      {/* > */}

      {/* bg="gray.400" */}
      {/* width="auto" */}
      {/* bg="gray.300" */}
      {console.log("HiddenInputBoard:editPosition: " + editPosition)}

      <Flex position="absolute">
        <Flex
          mx={["1em", "2em", "1em"]}
          w={["5em", "4em", "7em"]}
          h={["3em", "4em", "4em"]}
          borderRadius="5"
          bg="green.600"
        />
        <Flex
          mx={["1em", "2em", "1em"]}
          w={["5em", "4em", "7em"]}
          h={["3em", "4em", "4em"]}
          borderRadius="5"
          bg="green.600"
        />
      </Flex>
      <Flex
        w="full"
        h="full"
        align="center"
        position="absolute"
        justify="center"
      >
        <Flex
          display={editPosition == 0 ? "none" : "flex"}
          bg="blue"
          w="4em"
          h="3em"
        />
        <Flex w="4em" h="full">
          <Input
            w="4em"
            size="lg"
            variant="unstyled"
            placeholder="치커리"
            _placeholder={{
              color: "green.300",
              fontWeight: "bold",
            }}
            rounded="lg"
            zIndex={8}
            ref={firstGemRef}
          />
          {/* ref={getRef} */}
          {/* mb={"3em"} */}
          {/* value="치커리" */}
          {/* placeholder={planter.plantName} */}
          {/* onKeyPress={(e) => { */}
          {/* 아무 입력값이 없을 경우 enter가 반응이 없게 만듭니다 */}
          {/* e.key === "Enter" */}
          {/* ? titleInputRef.current.value.trim().length === 0 */}
          {/* ? null */}
          {/* : onConfirm() */}
          {/* : null; */}
          {/* }} */}
          {/* 치커리 */}
          {/* </Input> */}
        </Flex>
        <Flex
          bg="blue"
          w="4em"
          h="3em"
          display={editPosition == 0 ? "flex" : "none"}
        />
      </Flex>
    </Flex>
  );
};

/* 수위게이지 */
const WaterGauge = ({ boxRef, ratio, thisGem, isWarning, onClickGauge }) => {
  return (
    <Flex
      ref={boxRef}
      w={["13em", "13em", "16em"]}
      h={["2.2em", "1.8em", "2.3em"]}
      borderRadius={["0.6em", "0.5em", "0.8em"]}
      bg={isWarning ? "#59110c" : "blue.800"}
      _hover={{ cursor: "pointer" }}
      onClick={(e) => onClickGauge(e)}
    >
      {/* 바탕 */}
      {/* zIndex="2" */}
      {/* 알맹이 */}
      {/* bg={warning ? "red.700" : "blue.500"} */}
      <Flex
        w={() => {
          console.log(ratio);
          // return thisGem.waterGauge + "%";
          return ratio + "%";
        }}
        borderLeftRadius={["0.6em", "0.5em", "0.8em"]}
        bg={isWarning ? "red.700" : "blue.500"}
      ></Flex>
    </Flex>
  );
};

/* 전체입력완료버튼 */
const FinishButton = ({ isTextEdit, handleFinishClick }) => {
  return (
    <Flex
      w="full"
      justify="center"
      position="relative"
      opacity={isTextEdit ? "0" : "255"}
      transition={"opacity 0.5s"}
    >
      {/* opacity={"0"} */}
      {/* opacity={isTextEdit ? "0" : "255"} */}
      {/* transitionDuration={"2.5s"} */}
      {/* opacity={isOpen ? "0" : "255"} */}
      {/* transition={"opacity"} */}
      <Button
        size="lg"
        colorScheme={"teal"}
        mt={["1.5em", "2em", "2em"]}
        mb={["1em", "1.8em", "2em"]}
        onClick={() => {
          // isTextEdit ? null : handleFinishClick();
          handleFinishClick();
        }}
      >
        {/* <Button size="md" colorScheme="teal"> */}
        {/* <Text>{isTextEdit ? "xxx" : "완료"}</Text> */}
        <Text>완료</Text>
      </Button>
    </Flex>
  );
};

ModalGerminatyEdit.whyDidYouRender = true;

export default ModalGerminatyEdit;
