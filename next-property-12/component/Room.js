import React, { useState, useEffect, useContext } from "react";
import { HStack, Divider, Flex, Text, Icon } from "@chakra-ui/react";
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

import useProperty from "../context/useProperty";
import useModal from "../context/useModal";
import { PropertyStateContext } from "../context/PropertyContext";

// Floor 의 fullProperties 가 업데이트 되면 거기서 재렌더를 해줘서 새값으로
// 렌더링해주기에 여기서는 건드리지 않습니다
const Room = ({ room: thisroom, key }) => {
// const Room = ({ room, key }) => {
  // const Room = ({ uid, key }) => {
  const { openModal } = useModal();

  // const [room, setRoom] = useState(curRoom);
  // const [thisroom, setThisRoom] = useState(room);

  // useEffect(() => {
  //   console.log("Room::useEffect::[room] changed");
  //   setThisRoom(room);
  // }, [room]);

  // useEffect(() => {
  //   const getProperty = async () => {
  //     const result = await fetchProperty(uid);
  //     setRoom(result);
  //   };
  //   getProperty();
  // }, []);

  return (
    <>
      <Flex
        position="relative"
        direction="column"
        alignItems="center"
        mb="2rem"
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          console.log("room");
          // console.log(room.room_no);
          console.log(thisroom.room_no);
          console.log("clicked");
          //// fetchOccupant(room.occupant_id);
          // openModal(room, "full");
          openModal(thisroom, "full");
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
        {/* borderColor={room.has_issue > 0 ? "yellow.500" : "gray.500"} */}
        <Flex
          ml="-1.0em"
          borderWidth={1}
          borderColor={thisroom.has_issue > 0 ? "yellow.500" : "gray.500"}
          rounded="lg"
          bgColor="gray.600"
          p="0.2em"
        >
          {/* color={ */}
          {/*   room.occupant_id <= 0 */}
          {/*     ? "gray.500" */}
          {/*     : room.non_pay_continues > 0 */}
          {/*     ? "pink.400" */}
          {/*     : "gray.300" */}
          {/* } */}
          {/* {room.room_no}호 */}
          {/* </Text> */}
          {/* 호수 text */}
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            color={
              thisroom.occupant_id <= 0
                ? "gray.500"
                : thisroom.non_pay_continues > 0
                ? "pink.400"
                : "gray.300"
            }
          >
            {thisroom.room_no}호
          </Text>
          {/* display={room.has_issue > 0 ? "flex" : "none"} */}
          <Flex
            display={thisroom.has_issue > 0 ? "flex" : "none"}
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
          key={key}
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
          {/* bgColor={ */}
          {/*   room.occupant_id <= 0 */}
          {/*     ? "gray.600" */}
          {/*     : room.non_pay_continues > 0 */}
          {/*     ? "pink.700" */}
          {/*     : "gray.500" */}
          {/* } */}
          <Flex
            bgColor={
              thisroom.occupant_id <= 0
                ? "gray.600"
                : thisroom.non_pay_continues > 0
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
              {/* {room.occupant_id > 0 ? room.monthly_pay : ""} */}
              <Text letterSpacing="-0.05em" fontSize="5xl" fontWeight="bold">
                {thisroom.occupant_id > 0 ? thisroom.monthly_pay : ""}
              </Text>
            </Flex>
            {/* display={room.occupant_id > 0 ? "none" : "flex"} */}
            <Flex
              display={thisroom.occupant_id > 0 ? "none" : "flex"}
              w="100%"
              h="100%"
              position="absolute"
              justifyContent="center"
              alignItems="center"
            >
              <Icon color="gray.700" as={RiZzzLine} boxSize="3rem" />
            </Flex>
            {/* 월세 보증금 사이 구분자 */}
            {/* display={room.occupant_id > 0 ? "flex" : "none"} */}
            {/* borderColor={ */}
            {/*   room.non_pay_continues <= 0 ? "gray.600" : "gray.500" */}
            {/* } */}
            <Divider
              display={thisroom.occupant_id > 0 ? "flex" : "none"}
              borderColor={
                thisroom.non_pay_continues <= 0 ? "gray.600" : "gray.500"
              }
              mt="-0.5em"
              mb="0.6em"
              w="80%"
            />
            {/* 보증금 */}
            <Flex w="100%" h="2.5rem" justifyContent="center">
              {/* {room.occupant_id > 0 ? room.reserved_pay : ""} */}
              <Text fontSize="2xl" fontWeight="bold">
                {thisroom.occupant_id > 0 ? thisroom.reserved_pay : ""}
              </Text>

              {/* {room.occupant_id > 0 ? "만원" : " "} */}
              <Text
                ml="0.3em"
                fontSize="sm"
                fontWeight="semibold"
                lineHeight="shorter"
              >
                {thisroom.occupant_id > 0 ? "만원" : " "}
              </Text>
            </Flex>
            {/* <Text fontSize="xl">{room.room_no}</Text> */}
            {/* <Text fontSize="xl">{room.payday}</Text> */}
            {/* <Text fontSize="xl">{curProperties[i].length}</Text> */}
          </Flex>
          {/* 납입일입니다 */}
          {/* bgColor={ */}
          {/*   room.non_pay_continues > 0 */}
          {/*     ? "pink.600" */}
          {/*     : room.occupant_id > 0 */}
          {/*     ? "cyan.800" */}
          {/*     : "cyan.900" */}
          {/* } */}
          {/* borderColor={ */}
          {/*   room.non_pay_continues > 0 */}
          {/*     ? "pink.500" */}
          {/*     : room.occupant_id > 0 */}
          {/*     ? "cyan.700" */}
          {/*     : "cyan.900" */}
          {/* } */}
          <Flex
            w={["3.5em"]}
            h={["2em"]}
            bgColor={
              thisroom.non_pay_continues > 0
                ? "pink.600"
                : thisroom.occupant_id > 0
                ? "cyan.800"
                : "cyan.900"
            }
            borderColor={
              thisroom.non_pay_continues > 0
                ? "pink.500"
                : thisroom.occupant_id > 0
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
            {/* {room.occupant_id > 0 ? room.payday : ""} */}
            <Text color="gray.300" fontSize="2xl" fontWeight="semibold">
              {thisroom.occupant_id > 0 ? thisroom.payday : ""}
            </Text>
            {/* {room.occupant_id > 0 ? "일" : ""} */}
            <Text ml="0.2em" color="gray.400" fontSize="md">
              {thisroom.occupant_id > 0 ? "일" : ""}
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

              // for (let i = 0; i < room.non_pay_continues; i++) {
              for (let i = 0; i < thisroom.non_pay_continues; i++) {
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
        {/* opacity={room.occupant_id > 0 ? "1" : "0"} */}
        <HStack
          opacity={thisroom.occupant_id > 0 ? "1" : "0"}
          ml={["-1rem"]}
          mt="0.3em"
          spacing={1.5}
        >
          {/* 공실일 경우 투명도를 0으로 설정합니다 */}
          {/* 반려동물 유무 */}
          {/* bgColor="green.600" */}
          {/* bgColor="gray.600" */}
          {/* opacity={room.pets > 0 ? "1" : "0"} */}
          <Flex
            rounded="md"
            w={["1.5em"]}
            h={["1.5em"]}
            borderWidth={1}
            borderColor="green.600"
            opacity={thisroom.pets > 0 ? "1" : "0"}
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
          {/* opacity={room.cars > 0 ? "1" : "0"} */}
          <Flex
            justifyContent="center"
            opacity={thisroom.cars > 0 ? "1" : "0"}
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
            <Icon ml="-0.02em" color="blue.700" as={FaCar} boxSize="1.1rem" />
          </Flex>
          {/* 요주 세입자 */}
          {/* pr="0.2em" */}
          {/* bgColor="orange.600" */}
          {/* opacity={room.defectiveness > 0 ? "1" : "0"} */}
          <Flex
            justifyContent="center"
            opacity={thisroom.defectiveness > 0 ? "1" : "0"}
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
    </>
  );
};

export default Room;
