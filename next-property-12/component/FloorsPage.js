import {
  Img,
  Flex,
  VStack,
  Icon,
  Text,
  Divider,
  HStack,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext, useRef } from "react";
import useProperty from "../context/useProperty";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { PropertyStateContext } from "../context/PropertyContext";
import { FaDog } from "react-icons/fa6";
import { IoIosPaw } from "react-icons/io";
import { FaCar } from "react-icons/fa6";
import { ImAngry, ImAngry2 } from "react-icons/im";
import { GiNightSleep } from "react-icons/gi";
import { RiZzzLine } from "react-icons/ri";
import {
  BsExclamationOctagonFill,
  BsExclamationTriangleFill,
} from "react-icons/bs";

import useModal from "../context/useModal";

const FloorsPage = ({ apartment }) => {
  const { getCurOccupant, getFullProperties, setCurPage, getCurPage } =
    useProperty();
  const { fullProperties } = useContext(PropertyStateContext);

  const bottomRef = useRef(null);

  const apartGradient = () => {
    let ret = "";
    if (apartment == "maxvill") {
      ret =
        "linear-gradient(to right, rgba(170, 180, 180, 1) 40%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0) 80%), url('property/public/maxvill.png') no-repeat";
    } else if (apartment == "dochon") {
      ret =
        "linear-gradient(to right, rgba(170, 180, 180, 1) 40%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.3) 80%), url('property/public/dochon.png') no-repeat";
    }

    return ret;
  };

  useEffect(() => {
    // 화면 최하단으로 스크롤 내리는 방법입니다. scroll to bottom
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    // bottomRef.current.scrollIntoView();
  }, []);

  return (
    <>
      <Flex direction="column" w="full" position="relative">
        {/* 상단 고정헤더 */}
        {/* bgImage="linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,1) 100%)" */}
        {/* bgImage="linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.01) 1%, rgba(0, 0, 0, 1) 100%), url:('property/public/maxvill.png')" */}
        {/* bgPosition="10%" */}
        {/* bgSize="cover" */}
        {/* bgSize="50% 230%" */}
        {/* bgPosition="0% 30%" */}
        {/* bgGradient={apartGradient()} */}
        {/* bgRepeat="no-repeat" */}
        <Flex
          w={["100%", "30rem"]}
          h="3em"
          top="0"
          position="fixed"
          backgroundColor="gray.400"
          zIndex={7}
          alignSelf="center"
        >
          {/* 아파트 그라디언트 배경 */}
          {/* background 그리디언트 조절방식으로는 위치라던가 원하는 포지션으로 조정이 힘들어 */}
          {/* 추가로 덧붙여 mask-image를 통해 opacity gradient를 이용하였습니다 */}
          <Flex
            w={["100%", "30rem"]}
            h="3em"
            top="0"
            position="absolute"
            justifyContent="flex-end"
            overflow="hidden"
            style={{
              maskImage:
                "linear-gradient(to right, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 90%)",
            }}
          >
            <Img
              w="50%"
              objectFit="cover"
              h="100%"
              style={{ transform: "scale(1.1)" }}
              src={
                apartment == "maxvill"
                  ? "property/public/maxvill.png"
                  : "property/public/dochon.png"
              }
            />
          </Flex>
          {/* 뒤로 버튼 */}
          <Flex
            alignSelf="center"
            zIndex={8}
            position="absolute"
            left={5}
            _hover={{ cursor: "pointer" }}
            onClick={() => setCurPage("apartments_page")}
          >
            <Icon
              color="gray.600"
              as={MdOutlineArrowBackIos}
              boxSize="1.7rem"
            />
            <Text alignSelf="center" fontSize="xl" color="gray.700">
              뒤로
            </Text>
          </Flex>

          {/* 아파트 서클 */}
          {/* 현재는 사용하지 않습니다 */}
          {/* left={5} */}
          {/* justifyContent="center" */}
          <Flex
            display="none"
            w="100%"
            alignSelf="center"
            justifyContent="flex-end"
            zIndex={9}
            position="absolute"
            overflow="hidden"
            onClick={() => setCurPage("apartments_page")}
          >
            {/* 도촌동 건물사진입니다 */}
            <Flex
              borderWidth="0.2em"
              borderColor="gray.300"
              w={["4em", "6em"]}
              h={["4em", "4em"]}
              rounded="20%"
              overflow="hidden"
              mr={["2rem"]}
            >
              <Img
                objectFit="cover"
                w="100%"
                h="100%"
                style={{ transform: "scale(1.1)" }}
                src={
                  apartment == "maxvill"
                    ? "property/public/maxvill.png"
                    : "property/public/dochon.png"
                }
              />
            </Flex>
          </Flex>
        </Flex>

        {/* 페이지 내용물 */}
        <Flex
          alignSelf="center"
          top="3rem"
          ml={["2rem", "10rem"]}
          w={["100%", "20rem"]}
          h={["100%", "100%"]}
          zIndex={1}
          position="relative"
          direction="column"
        >
          {/* {apartment} */}
          <Floors apartment={apartment} />
        </Flex>
      </Flex>

      <div ref={bottomRef} />
    </>
  );
};

// 각 아파트의 총 층 호수를 렌더합니다
const Floors = ({ apartment }) => {
  // const { fullProperties, curRoomDetails, curOccupantDetails } =
  const { fullProperties } = useContext(PropertyStateContext);
  const [curProperties, setCurProperties] = useState(fullProperties[apartment]);
  const { openModal, curRoom } = useModal();

  useEffect(() => {
    // console.log("FloorsPage::Floors::useEffect::apartment..");
    // console.log(apartment);
    // console.log("FloorsPage::Floors::useEffect::curProperties..");
    // console.log(curProperties);
  }, []);

  const renderFloors = () => {
    let result0 = [];
    let result2 = [];
    // let flag = 0;
    let j = 0;
    result2.push(
      <Flex key={j} direction="column">
        {result0}
      </Flex>
    );
    j++;
    // for (let i = 0; i < curProperties.length; i++) {
    for (let i = curProperties.length - 1; i >= 0; i--) {
      let result1 = [];
      let k = 0;

      // justifyContent="space-around"
      result0.push(
        <>
          {/* mb="2rem" */}
          <Flex
            key={j}
            direction="row"
            justifyContent="flex-start"
            flexWrap="wrap"
            mt="2rem"
          >
            {result1}
          </Flex>
        </>
      );
      if (i != 0)
        result0.push(
          <Divider borderColor="gray.400" mt="1em" mb="1em" w={["90%"]} />
        );
      j++;

      curProperties[i].map((room) => {
        // return (
        result1.push(
          <>
            {/* 각 층의 한 방들 렌더 */}
            {/* {(() => { */}
            {/* console.log("flag cur is "); */}
            {/* })()} */}
            {/* {(() => { */}
            {/* console.log(flag); */}
            {/* })()} */}
            {/* <Flex w="3em" h="3em" rounded="md" bgColor="gray.400"> */}
            {/* h="5em" */}
            <Flex
              position="relative"
              direction="column"
              alignItems="center"
              mb="2rem"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                console.log("room");
                console.log(room.room_no);
                console.log("clicked");
                // fetchOccupant(room.occupant_id);
                openModal(room, "full");
              }}
            >
              {/* 호수 */}
              {/* bgColor="gray.600" */}
              {/* bgGradient={ */}
              {/*   room.has_issue > 0 */}
              {/*     ? "linear-gradient(to right, rgba(155,155,0,0.5) 5%, rgba(111,111,111,0.8) 70%)" */}
              {/*     : "0" */}
              {/* } */}
              {/* bgColor={room.has_issue > 0 ? "yellow.500" : "gray.600"} */}
              {/* borderColor="gray.500" */}
              <Flex
                ml="-1.0em"
                borderWidth={1}
                borderColor={room.has_issue > 0 ? "yellow.500" : "gray.500"}
                rounded="lg"
                bgColor="gray.600"
                p="0.2em"
              >
                {/* 호수 text */}
                <Text
                  fontSize="2xl"
                  fontWeight="semibold"
                  color={
                    room.occupant_id <= 0
                      ? "gray.500"
                      : room.non_pay_continues > 0
                      ? "pink.400"
                      : "gray.300"
                  }
                >
                  {room.room_no}호
                </Text>
                <Flex
                  display={room.has_issue > 0 ? "flex" : "none"}
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon
                    mt={["1.6em"]}
                    ml={["1.6em"]}
                    color="yellow.500"
                    as={BsExclamationTriangleFill}
                    boxSize="0.8rem"
                  />
                </Flex>
              </Flex>

              {/* 월세 / 보증금 / 납입일 표시하는 외부박스입니다 /*/}
              <Flex
                key={j}
                direction="column"
                w="5.6em"
                mr="1em"
                rounded="lg"
                bgColor="gray.600"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                {/* 월세납입일과 보증금을 표시합니다 */}
                {/* bgColor="gray.500" */}
                <Flex
                  bgColor={
                    room.occupant_id <= 0
                      ? "gray.600"
                      : room.non_pay_continues > 0
                      ? "pink.700"
                      : "gray.500"
                  }
                  w="90%"
                  direction="column"
                  rounded="md"
                  alignItems="center"
                  mt="0.5em"
                  mx="0.2em"
                  position="relative"
                >
                  {/* 월납입금 */}
                  {/* <GiNightSleep /> */}
                  <Flex
                    ml={-1}
                    w="4.5em"
                    h="4.5em"
                    position="relative"
                    justifyContent="center"
                  >
                    <Text
                      letterSpacing="-0.05em"
                      fontSize="5xl"
                      fontWeight="bold"
                    >
                      {room.occupant_id > 0 ? room.monthly_pay : ""}
                    </Text>
                  </Flex>
                  <Flex
                    display={room.occupant_id > 0 ? "none" : "flex"}
                    w="100%"
                    h="100%"
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon color="gray.700" as={RiZzzLine} boxSize="3rem" />
                  </Flex>
                  {/* 월세 보증금 사이 구분자 */}
                  <Divider
                    display={room.occupant_id > 0 ? "flex" : "none"}
                    borderColor={
                      room.non_pay_continues <= 0 ? "gray.600" : "gray.500"
                    }
                    mt="-0.5em"
                    mb="0.6em"
                    w="80%"
                  />
                  {/* 보증금 */}
                  <Flex w="100%" h="2.5rem" justifyContent="center">
                    <Text fontSize="2xl" fontWeight="bold">
                      {room.occupant_id > 0 ? room.reserved_pay : ""}
                    </Text>
                    <Text
                      ml="0.3em"
                      fontSize="sm"
                      fontWeight="semibold"
                      lineHeight="shorter"
                    >
                      {room.occupant_id > 0 ? "만원" : " "}
                    </Text>
                  </Flex>
                  {/* <Text fontSize="xl">{room.room_no}</Text> */}
                  {/* <Text fontSize="xl">{room.payday}</Text> */}
                  {/* <Text fontSize="xl">{curProperties[i].length}</Text> */}
                </Flex>
                {/* 납입일입니다 */}
                <Flex
                  w={["3.5em"]}
                  h={["2em"]}
                  bgColor={
                    room.non_pay_continues > 0
                      ? "pink.600"
                      : room.occupant_id > 0
                      ? "cyan.800"
                      : "cyan.900"
                  }
                  borderColor={
                    room.non_pay_continues > 0
                      ? "pink.500"
                      : room.occupant_id > 0
                      ? "cyan.700"
                      : "cyan.900"
                  }
                  borderWidth={1}
                  justifyContent="center"
                  alignItems="center"
                  rounded="md"
                  mt="0.8em"
                  mb="1em"
                  px="0.2em"
                >
                  <Text color="gray.300" fontSize="2xl" fontWeight="semibold">
                    {room.occupant_id > 0 ? room.payday : ""}
                  </Text>
                  <Text ml="0.2em" color="gray.400" fontSize="md">
                    {room.occupant_id > 0 ? "일" : ""}
                  </Text>
                  {/* <Text fontSize="xl">{room.room_no}</Text> */}
                  {/* <Text fontSize="xl">{room.payday}</Text> */}
                  {/* <Text fontSize="xl">{curProperties[i].length}</Text> */}
                </Flex>
                {/* </납입일 */}
                {/* 연속 미납 횟수 */}
                <Flex
                  bottom={["0.1em"]}
                  position="absolute"
                  mb="0.05em"
                  direction="row"
                >
                  {(() => {
                    let ret0 = [];
                    let ret1 = [];
                    ret1.push(<HStack spacing={1}>{ret0}</HStack>);

                    for (let i = 0; i < room.non_pay_continues; i++) {
                      ret0.push(
                        <Flex
                          w="0.45em"
                          h="0.45em"
                          rounded="sm"
                          bgColor="pink.400"
                        ></Flex>
                      );
                    }
                    return ret1;
                  })()}
                </Flex>
              </Flex>
              {/* </납입일및 보증금 */}
              {/* 차량및 반려동물 표시 */}
              <HStack
                opacity={room.occupant_id > 0 ? "1" : "0"}
                ml={["-1rem"]}
                mt="0.3em"
                spacing={1.5}
              >
                {/* 공실일 경우 투명도를 0으로 설정합니다 */}
                {/* 반려동물 유무 */}
                {/* bgColor="green.600" */}
                {/* bgColor="gray.600" */}
                <Flex
                  rounded="md"
                  w={["1.5em"]}
                  h={["1.5em"]}
                  borderWidth={1}
                  borderColor="green.600"
                  opacity={room.pets > 0 ? "1" : "0"}
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <IoIosPaw /> */}
                  {/* <FaCar /> */}
                  {/* <Icon color="gray.700" as={IoIosPaw} boxSize="1.3rem" /> */}
                  <Icon color="green.600" as={IoIosPaw} boxSize="1.3rem" />
                </Flex>
                {/* 차량 유무 */}
                {/* bgColor="blue.700" */}
                <Flex
                  justifyContent="center"
                  opacity={room.cars > 0 ? "1" : "0"}
                  rounded="md"
                  w={["1.5em"]}
                  h={["1.5em"]}
                  borderWidth={1}
                  borderColor="blue.600"
                  pl="-4em"
                  alignItems="center"
                >
                  {/* <IoIosPaw /> */}
                  {/* <FaCar /> */}
                  {/* color="gray.800" */}
                  <Icon
                    ml="-0.02em"
                    color="blue.700"
                    as={FaCar}
                    boxSize="1.1rem"
                  />
                </Flex>
                {/* 요주 세입자 */}
                {/* pr="0.2em" */}
                {/* bgColor="orange.600" */}
                <Flex
                  justifyContent="center"
                  opacity={room.defectiveness > 0 ? "1" : "0"}
                  rounded="md"
                  w={["1.5em"]}
                  h={["1.5em"]}
                  alignItems="center"
                  borderWidth={1}
                  borderColor="orange.600"
                >
                  {/* <IoIosPaw /> */}
                  {/* <FaCar /> */}
                  {/* color="gray.700" */}
                  <Icon
                    ml="-0.05em"
                    color="orange.700"
                    as={ImAngry2}
                    boxSize="1.1rem"
                  />
                </Flex>
              </HStack>
            </Flex>
            {/* 총 카드 */}

            {/* {(() => { */}
            {/*   flag = flag + 1; */}
            {/*   j++; */}
            {/* })()} */}
            {/* {(() => { */}
            {/*   console.log("j is..."); */}
            {/*   console.log(j); */}
            {/* })()} */}
          </>
        );
      });
    }
    // console.log("last flag:");
    // console.log(flag);
    return result2;
  };

  return (
    <>
      <Flex w="100%" h="100%" justifySelf="center">
        {renderFloors()}
        <>
          {/* <Flex w="2em" h="2em" rounded="md" bgColor="gray.400"> */}
          {/*   {/1*  납입일을 표시합니다 *1/} */}
          {/*   <Text fontSize="xl">12</Text> */}
          {/* </Flex> */}
        </>
      </Flex>
    </>
  );
};

export default FloorsPage;
