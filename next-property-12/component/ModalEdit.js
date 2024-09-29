import { Divider, Flex, Link, Text } from "@chakra-ui/layout";
import React, { useRef, useEffect } from "react";
import useModal from "../context/useModal";
import { ImPhone } from "react-icons/im";
import { Icon } from "@chakra-ui/react";
import { MdOutlineTextsms, MdSms } from "react-icons/md";
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { IoIosPaw } from "react-icons/io";
import { FaCar } from "react-icons/fa6";
import { ImAngry } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { PiStackDuotone } from "react-icons/pi";
import { MdTimelapse } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdPhoneForwarded } from "react-icons/md";
import { TbArrowBigRightLineFilled } from "react-icons/tb";
import { TbArrowBack } from "react-icons/tb";
import { RxDotFilled } from "react-icons/rx";

import { BsExclamationOctagon, BsExclamationTriangle } from "react-icons/bs";
import { RiFileUnknowFill } from "react-icons/ri";
import useProperty from "../context/useProperty";

// const ModalEdit = ({ curRoom, curRoomDetails, curOccupantDetails }) => {
const ModalEdit = ({ curRoom }) => {
  const { setCurModalContent, curModalPosition, setCurModalPosition } =
    useModal();

  const {
    fetchRoomDetails,
    fetchOccupantDetails,
    curOccupantDetails,
    curRoomDetails,
  } = useProperty();

  const refNamesex = useRef(null);
  const refPhone = useRef(null);
  const refSpecialty = useRef(null);
  const refComplaint = useRef(null);
  const refContractType = useRef(null);
  const refReservedPay = useRef(null);
  const refPayday = useRef(null);
  const refPeriod = useRef(null);
  const refDeposit = useRef(null);
  const refDescription = useRef(null);

  useEffect(() => {
    console.log(
      "ModalEdit::useEffect::fetch roomdetals and occupantdetals ..."
    );

    fetchRoomDetails(curRoom.apartment, curRoom.room_no);
    fetchOccupantDetails(curRoom.occupant_id);

    console.log("ModalEdit::useEffect::curModalPosition is...");
    if (typeof curModalPosition !== "undefined") {
      console.log(curModalPosition);
      if (curModalPosition == "namesex") {
        // refNamesex.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "phone") {
        refPhone.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "specialty") {
        refSpecialty.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "complaint") {
        refComplaint.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "contract_type") {
        refContractType.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "reserved_pay") {
        refReservedPay.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "payday") {
        refPayday.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "period") {
        refPeriod.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "deposit") {
        refDeposit.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      } else if (curModalPosition == "description") {
        refDescription.current.scrollIntoView({ behavior: "smooth" });
        setCurModalPosition("default");
      }
    }
  }, []);

  const processEtc = () => {
    return (
      <>
        {curRoomDetails.description?.length > 0 ? (
          <Flex
            borderColor="#6d7d99"
            rounded="sm"
            w={["12em"]}
            mt={["0.3em"]}
            mb={["0.5em"]}
            ml={["2.6em"]}
            direction="column"
            alignItems="center"
            px="0.7em"
            py="0.3em"
          >
            {/* color="gray.300" */}
            <Text color="gray.400" fontSize="md">
              {curRoomDetails.description}
            </Text>
          </Flex>
        ) : (
          <Flex
            borderColor="#6d7d99"
            rounded="sm"
            w={["12em"]}
            mt={["-0.7em"]}
            mb={["0.7em"]}
            ml={["1.6em"]}
            direction="column"
            alignItems="center"
          >
            {/* color="gray.300" */}
            <Text color="gray.400" fontSize="md">
              없음
            </Text>
          </Flex>
        )}
      </>
    );
  };

  const processDepositHistory = () => {
    let flag = 0;
    let result = [];

    curRoomDetails.deposit_history?.map((l) => {
      result.push(
        <>
          <Flex mx={["0.5em"]}>
            {/* borderWidth={1} */}
            {/* <Flex mt="0.4em" px="0.2em"> */}
            <Flex>
              <Text fontSize="sm" fontWeight="normal" color="gray.400">
                {depositFormatter(l[0])}
              </Text>
              <Flex mt="-0.35em" ml="0.7em">
                <Text
                  mt={["0.05em"]}
                  fontSize="lg"
                  fontWeight="semibold"
                  color="gray.400"
                >
                  {l[1]}
                </Text>
                <Text
                  mt={["0.4em"]}
                  ml={["0.2em"]}
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.400"
                >
                  만원
                </Text>
              </Flex>
            </Flex>
          </Flex>
          {flag < curRoomDetails.deposit_history.length - 1 ? (
            <Divider mb={["0.2em"]} alignSelf="center" w="85%" />
          ) : (
            ""
          )}
          {(() => {
            flag++;
          })()}
        </>
      );
    });

    return result;
  };

  const phoneFormatter = (str) => {
    let company = str.slice(0, 3);
    let middle = str.slice(3, str.length - 4);
    let last = str.slice(-4);

    return company + "-" + middle + "-" + last;
  };

  const depositFormatter = (str) => {
    // 2024-08-31 18:17:32.777 을 변환하는 함수입니다
    // 24/08/31-18시17분
    let [day, time] = str.split(" ");

    // day = day.replace("-", "/").slice(2); // 24/08/31
    // 위의 표현은 오직 한번만 교체하는 방법입니다. 모든 경우를 위해선 regExp를 사용하는
    // 아래 방법을 사용하라고 합니다
    // 참고: https://www.geeksforgeeks.org/how-to-remove-a-character-from-string-in-javascript/
    // day = day.replace(/-/g, "/").slice(2); // 24/08/31
    day = day.replace(/-/g, ".").slice(2); // 24/08/31

    let [hour, min] = time.split(":");
    time = hour + ":" + min;
    // time = hour + "시" + min + "분";

    return day + " " + time;
  };

  const dateFormatter = (str, add) => {
    // 240702 를 24년7월2일로 변환하는 함수입니다
    let retStr = "";
    let num = parseInt(str);
    let year = Math.round(num / 10000);
    let month = Math.round((num % 10000) / 100);
    let day = num % 100;

    // add 연산입니다
    if (add > 0) {
      let addYear = Math.round(add / 12);
      let addMonth = add % 12;

      let upper = Math.floor((month + addMonth) / 12);
      let upperRest = (month + addMonth) % 12;

      year = year + addYear + upper;
      month = upperRest;
    }

    retStr = year + "년 " + month + "월 " + day + "일";

    return retStr;
  };

  return (
    <>
      {/* <Flex w="100%" justifyContent="center"> */}
      <Flex direction="column" w="100%" alignItems="center" overflowY="auto">
        {/* bgColor={curRoom.non_pay_continues > 0 ? "pink.700" : "gray.700"} */}
        <Flex
          w="15em"
          h="5em"
          rounded="lg"
          bgColor="gray.700"
          alignItems="center"
          direction="column"
          borderColor={curRoom.non_pay_continues > 0 ? "pink.400" : "gray.500"}
          borderWidth={1}
        >
          {/* 호수 flex */}
          <Flex>
            {/* 호숫자 */}
            <Text
              mt={["0.1em", "0em"]}
              ml="0.5em"
              color="gray.400"
              fontSize="4xl"
              fontWeight="semibold"
            >
              {curRoom.room_no}
            </Text>
            {/* 호 */}
            <Text
              mt="0.9em"
              ml="0.2em"
              fontSize="xl"
              fontWeight="medium"
              color="gray.400"
            >
              호
            </Text>
          </Flex>
          {/* 룸종류 flex */}
          {/* borderWidth={1} */}
          <Flex
            mt={["-0.4em", "-0.4em"]}
            borderColor="gray.500"
            rounded="sm"
            px="0.3em"
            pt="-0.3em"
          >
            <Text fontSize="sm" fontWeight="semibold" color="gray.400">
              {curRoomDetails.room_type} / {curRoomDetails.sq_footage}평형
            </Text>
          </Flex>
        </Flex>

        {/* 세입자 flex 입니다 */}
        {/* h={["8.5em"]} */}
        <Flex
          mt="1.2em"
          w="15em"
          bgColor="gray.700"
          rounded="lg"
          direction="column"
          borderColor="gray.500"
          borderWidth={1}
          position="relative"
        >
          {/* 이름과 성별입니다 */}
          <Flex alignSelf="center">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refNamesex}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.6em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("namesex_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>

            <Text
              mt="0.5em"
              ml="0.8em"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.400"
            >
              {curRoomDetails.occupant_name}
            </Text>

            {(() => {
              if (curOccupantDetails.sex == "female")
                return (
                  <Icon
                    mt={["0.9em", "0.9em"]}
                    color="pink.400"
                    as={FaFemale}
                    boxSize="1rem"
                  />
                );
              else
                return (
                  <Icon
                    mt={["0.9em", "0.9em"]}
                    color="cyan.500"
                    as={FaMale}
                    boxSize="1rem"
                  />
                );
            })()}
            <Icon
              mt={["1.1em", "1.1em"]}
              ml={["0.1em", "0.1em"]}
              color="gray.400"
              as={RxDotFilled}
              boxSize="0.6rem"
            />
            <Text
              mt={["1.1em", "1em"]}
              ml={["0.3em"]}
              fontSize={["0.8em", "0.8em"]}
              fontWeight="normal"
              color="gray.400"
            >
              {(() => {
                if (curOccupantDetails.age == "young") return "청년";
                else if (curOccupantDetails.age == "middle") return "중년";
                else if (curOccupantDetails.age == "old") return "노년";
              })()}
            </Text>
          </Flex>
          {/* <Link */}
          {/*   href={"sms:" + curOccupantDetails.phone} */}
          {/*   style={{ textDecoration: "none" }} */}
          {/* > */}
          {/* </Link> */}

          {/* 전화번호입니다 */}
          <Flex w="100%" position="relative" justifyContent="center">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refPhone}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.5em"
              right="0.5em"
              rounded="4"
              mt={["0.8em", "0.8em"]}
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("phone_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>

            {/* borderWidth={1} */}
            <Flex
              mt={["0.4em"]}
              mb={["0.2em"]}
              borderColor="gray.400"
              rounded="md"
              px={["1.0em"]}
              py={["0.4em"]}
              alignSelf="center"
            >
              {/* ml={["2em", "1.8em"]} */}
              <Icon
                mt={["0.2em", "0.3em"]}
                ml={["-0.5em", "-0.5em"]}
                color="gray.500"
                as={ImPhone}
                boxSize="1.1rem"
              />
              <Icon
                display="none"
                mt={["0.2em", "0.2em"]}
                ml={["-0.4em", "-0.4em"]}
                color="gray.500"
                as={TbArrowBigRightLineFilled}
                boxSize="1rem"
              />
              <Text
                mt="0.0em"
                ml={["0.7em", "0.8em"]}
                fontSize="lg"
                fontWeight="semibold"
                color="gray.400"
              >
                {/* {curOccupantDetails.phone} */}
                {phoneFormatter(curOccupantDetails.phone)}
              </Text>
            </Flex>
          </Flex>

          {/* 차량및 반려동물 악성도 등 정보 표시 */}
          <Divider
            mt={["0em"]}
            mb={["0.1em"]}
            borderColor="gray.500"
            w="30%"
            alignSelf="center"
            display={
              (typeof curRoom.pets !== "undefined" && curRoom.pets > 0) ||
              (typeof curRoom.cars !== "undefined" && curRoom.cars > 0) ||
              (typeof curRoom.defectiveness !== "undefined" &&
                curRoom.defectiveness > 0)
                ? "flex"
                : "none"
            }
          />

          <Flex w="100%" justifyContent="center" position="relative">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refSpecialty}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.35em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("specialty_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>
            {/* 반려동물 차량 악성도 표시 열입니다 */}
            <Flex
              position="relative"
              ml={["-0.8rem"]}
              mt="0.5em"
              mb={["1.15em"]}
              alignSelf="center"
              display={
                (typeof curRoom.pets !== "undefined" && curRoom.pets > 0) ||
                (typeof curRoom.cars !== "undefined" && curRoom.cars > 0) ||
                (typeof curRoom.defectiveness !== "undefined" &&
                  curRoom.defectiveness > 0)
                  ? "flex"
                  : "none"
              }
            >
              {/* 아이콘표시 열 타이틀 아이콘입니다 */}
              {/* <RiFileUnknowFill /> */}
              <Flex ml={["-1.5em"]} mt={["0.2em"]}>
                <Icon color="gray.500" as={RiFileUnknowFill} boxSize="1.2rem" />
              </Flex>
              <Flex ml={["1.7em"]}>
                {/* 공실일 경우 투명도를 0으로 설정합니다 */}
                {/* 반려동물 유무 */}
                <Flex
                  rounded="md"
                  w={["1.5em"]}
                  h={["1.5em"]}
                  mr={["0.4em"]}
                  bgColor="green.600"
                  display={curRoom.pets > 0 ? "flex" : "none"}
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* <IoIosPaw /> */}
                  {/* <FaCar /> */}
                  <Icon color="gray.700" as={IoIosPaw} boxSize="1.3rem" />
                </Flex>
                {/* 차량 유무 */}
                <Flex
                  justifyContent="center"
                  display={curRoom.cars > 0 ? "flex" : "none"}
                  rounded="md"
                  w={["1.5em"]}
                  h={["1.5em"]}
                  mr={["0.4em"]}
                  bgColor="blue.600"
                  pl="-4em"
                  borderWidth={0}
                  alignItems="center"
                >
                  {/* <IoIosPaw /> */}
                  {/* <FaCar /> */}
                  <Icon
                    ml="-0.02em"
                    color="gray.800"
                    as={FaCar}
                    boxSize="1.1rem"
                  />
                </Flex>
                {/* 요주 세입자 */}
                {/* pr="0.2em" */}
                <Flex
                  justifyContent="center"
                  display={curRoom.defectiveness > 0 ? "flex" : "none"}
                  rounded="md"
                  w={["1.5em"]}
                  h={["1.5em"]}
                  mr={["0.4em"]}
                  bgColor="orange.700"
                  alignItems="center"
                >
                  {/* <IoIosPaw /> */}
                  {/* <FaCar /> */}
                  <Icon
                    ml="-0.05em"
                    color="gray.700"
                    as={ImAngry}
                    boxSize="1.2rem"
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* 컴플레인 사항 */}
          {/* {console.log("MyModal.js::curOccupantDetails.complaints.length is")} */}
          {/* {console.log(curOccupantDetails.complaints.length)} */}
          {/* display={ */}
          {/*   curOccupantDetails.complaints.length > 0 ? "flex" : "none" */}
          {/* } */}
          {/* display={ */}
          {/*   typeof curOccupantDetails.complaints !== "undefined" && */}
          {/*   curOccupantDetails.complaints.length > 0 */}
          {/*     ? "flex" */}
          {/*     : "none" */}
          {/* } */}
          <Divider
            mt={["-0.5em"]}
            borderColor="gray.500"
            w="30%"
            alignSelf="center"
          />

          <Flex w="100%" position="relative" justifyContent="center">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refComplaint}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.4em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("namesex_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>
            <Flex alignSelf="center" mt="0.3em">
              {/* 컴플레인 아이콘 */}
              {/* as={BsExclamationOctagon} */}
              {/* color="yellow.400" */}
              <Icon
                mt={["0.3em", "0.5em"]}
                mb={["0.9em", "0.9em"]}
                ml={["-0.5em", "0em"]}
                fontWeight="bold"
                color={
                  typeof curOccupantDetails.complaints !== "undefined" &&
                  curOccupantDetails.complaints.length > 0
                    ? "yellow.600"
                    : "gray.500"
                }
                as={BsExclamationTriangle}
                boxSize="1.2rem"
              />
              {/* 컴플레인 텍스트 */}
              {/* {curOccupantDetails.complaints} */}
              {/* color="yellow.400" */}
              <Text
                ml={["0.7em", "0.8em"]}
                mt={["0.2em", "0.4em"]}
                color={
                  typeof curOccupantDetails.complaints !== "undefined" &&
                  curOccupantDetails.complaints.length > 0
                    ? "yellow.600"
                    : "gray.500"
                }
                fontSize="md"
              >
                {typeof curOccupantDetails.complaints !== "undefined" &&
                curOccupantDetails.complaints.length > 0
                  ? curOccupantDetails.complaints
                  : "요청사항이 없습니다"}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* 계약조건 / 기간/ 이행 flex 박스입니다 */}
        {/* h={["8.5em"]} */}
        <Flex
          mt="1.2em"
          w="15em"
          bgColor="gray.700"
          rounded="lg"
          direction="column"
          borderColor="gray.500"
          borderWidth={1}
        >
          {/* 계약종류와 월세금액입니다 */}
          {/* <Flex alignSelf="center"> */}
          {/* <Flex ml="1em"> */}
          <Flex w="100%" position="relative">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refContractType}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.4em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("namesex_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>
          </Flex>

          <Flex ml="0.2em">
            <Flex>
              <Icon
                mt="0.76em"
                mr={["-0.1em"]}
                color="gray.500"
                as={MdOutlineAttachMoney}
                boxSize="1.0rem"
              />

              <Text
                mt="0.8em"
                fontSize="sm"
                fontWeight="semibold"
                color="gray.400"
              >
                계약/금액:
              </Text>
              <Text
                mt="0.3em"
                ml="0.8em"
                fontSize="xl"
                fontWeight="semibold"
                color="gray.400"
              >
                {curRoom.contract_type}
              </Text>
              <Text
                mt="0.4em"
                ml="0.3em"
                fontSize="lg"
                fontWeight="semibold"
                color="gray.500"
              >
                /
              </Text>
              <Text
                mt="0.1em"
                ml="0.3em"
                fontSize="2xl"
                fontWeight="semibold"
                color="gray.400"
              >
                {curRoom.monthly_pay}
              </Text>
              <Text
                mt="0.6em"
                ml="0.2em"
                fontSize="md"
                fontWeight="semibold"
                color="gray.400"
              >
                만원
              </Text>
            </Flex>
          </Flex>

          <Divider />

          {/* 보증금입니다 */}
          {/* <Flex mt={["-0.3em"]} alignSelf="center"> */}
          {/* <Flex mt={["-0.3em"]} ml="2.2em"> */}
          <Flex w="100%" position="relative">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refReservedPay}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.25em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("namesex_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>
          </Flex>

          <Flex mt={["-0.3em"]} ml="1.1em">
            <Flex>
              <Icon
                mt="0.85em"
                mr="0.3em"
                color="gray.500"
                as={PiStackDuotone}
                boxSize="0.9rem"
              />
              <Text
                mt="0.8em"
                fontSize="sm"
                fontWeight="semibold"
                color="gray.400"
              >
                보증금:
              </Text>
              <Text
                mt="0.1em"
                ml="0.6em"
                fontSize="2xl"
                fontWeight="semibold"
                color="gray.400"
              >
                {curRoom.reserved_pay}
              </Text>
              <Text
                mt="0.6em"
                ml="0.2em"
                fontSize="md"
                fontWeight="semibold"
                color="gray.400"
              >
                만원
              </Text>
            </Flex>
          </Flex>
          <Divider />

          {/* 입금일입니다 */}
          {/* <Flex mt={["-0.3em"]} alignSelf="center"> */}
          {/* <Flex mt={["-0.3em"]} ml="2.2em"> */}
          <Flex w="100%" position="relative">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refPayday}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.3em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("namesex_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>

            <Flex mt={["-0.3em"]} ml="1.2em">
              <Flex>
                <Icon
                  mt="0.85em"
                  mr="0.2em"
                  color="gray.500"
                  as={MdOutlineCalendarMonth}
                  boxSize="0.9rem"
                />
                <Text
                  mt="0.8em"
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.400"
                >
                  입금일:
                </Text>
                <Text
                  mt="0.2em"
                  ml="0.8em"
                  fontSize="2xl"
                  fontWeight="semibold"
                  color="cyan.500"
                >
                  {curRoom.payday}
                </Text>
                <Text
                  mt="0.7em"
                  ml="0.2em"
                  fontSize="md"
                  fontWeight="semibold"
                  color="gray.400"
                >
                  일
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Divider />
          {/* 계약기간입니다 */}
          {/* <Flex mt={["-0.3em"]} mb={["0.3em"]} ml="1.4em"> */}

          <Flex w="100%" position="relative">
            {/* 수정버튼입니다 */}
            <Flex
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="1em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("namesex_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>
          </Flex>

          <Flex mt={["-0.3em"]} mb={["0.3em"]} ml="0.5em">
            <Flex>
              <Icon
                mt="1.75em"
                mr="0.2em"
                color="gray.500"
                as={MdTimelapse}
                boxSize="0.9rem"
              />

              <Text
                mt="1.8em"
                fontSize="sm"
                fontWeight="semibold"
                color="gray.400"
              >
                계약기간:
              </Text>
              {/* bgColor="#454f61" */}
              {/* borderColor="#3a4352" */}
              <Flex
                mt="1.1em"
                ml="0.7em"
                px="0.7em"
                py="0.0em"
                rounded="lg"
                borderColor="gray.600"
                borderWidth={1}
              >
                <Text fontSize="lg" fontWeight="semibold" color="gray.400">
                  {curRoom.contract_period}
                </Text>
                <Text
                  mt={["0.15em"]}
                  ml={["0.1em"]}
                  fontSize="md"
                  fontWeight="semibold"
                  color="gray.400"
                >
                  개월
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex mt={["-0.3em"]} ml="4.6em">
            <Flex>
              <Text
                mt="0.4em"
                ml="0em"
                fontSize="lg"
                fontWeight="semibold"
                color="gray.400"
              >
                {dateFormatter(curRoom.contract_startdate, 0)}
              </Text>
              <Text
                mt="0.9em"
                ml="0.2em"
                fontSize="sm"
                fontWeight="normal"
                color="gray.400"
              >
                부터
              </Text>
            </Flex>
          </Flex>
          <Flex mt={["-0.3em"]} mb={["0.2em"]} ml="4.6em">
            <Flex mt="-0.2em" mb="0.4em">
              {/* {curRoom.contract_startdate} */}
              <Text
                mt="0.4em"
                ml="0em"
                fontSize="lg"
                fontWeight="semibold"
                color="gray.400"
              >
                {dateFormatter(
                  curRoom.contract_startdate,
                  curRoom.contract_period
                )}
              </Text>
              <Text
                mt="0.9em"
                ml="0.2em"
                fontSize="sm"
                fontWeight="normal"
                color="gray.400"
              >
                까지
              </Text>
            </Flex>
          </Flex>
          <Divider />

          {/* 입금내역입니다 */}

          <Flex w="100%" position="relative">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refDeposit}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.7em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("namesex_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>
            <Flex mt={["-0.1em"]} ml="0.4em">
              <Flex>
                <Icon
                  mt="0.9em"
                  mr="0.1em"
                  color="gray.500"
                  as={BiMoneyWithdraw}
                  boxSize="1rem"
                />
                <Text
                  mt="0.9em"
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.400"
                >
                  입금내역:
                </Text>
              </Flex>
            </Flex>

            {/* 연체횟수 */}
            {/* <Flex display={curRoom.non_pay_continues > 0 ? "flex" : "none"}> */}
            <Flex
              ml="1em"
              mt="0.86em"
              display={curRoom.non_pay_continues > 0 ? "flex" : "none"}
              borderWidth={1}
              borderColor="pink.400"
              bgColor="pink.500"
              px="1em"
              pt="0.2em"
              h={["1.3em"]}
              rounded="sm"
              alignItems="center"
              alignItems="center"
            >
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                연체:
              </Text>
              <Text
                ml="0.4em"
                fontSize="md"
                fontWeight="semibold"
                color="gray.800"
              >
                {curRoom.non_pay_continues}회
              </Text>
            </Flex>
          </Flex>

          {/* borderColor="#515e73" */}
          {/* borderColor="#283040" */}
          {/* bgColor="#454f61" */}
          {/* bgColor="#283040" */}
          {/* 입금내역 어두운 표박스입니다 */}
          {curRoomDetails.deposit_history?.length > 0 ? (
            <Flex
              mt={["0.3em"]}
              mb={["1em"]}
              ml="1.4em"
              pt={["0.5em"]}
              pb={["0.3em"]}
              px={["0.5em"]}
              direction="column"
              borderColor="#515e73"
              bgColor="#2c3647"
              borderWidth={1}
              rounded="md"
              alignSelf="center"
            >
              {processDepositHistory()}
            </Flex>
          ) : (
            <Flex h="1em"></Flex>
          )}

          <Divider />
          {/* 기타사항입니다 */}
          <Flex position="relative" w="100%">
            {/* 수정버튼입니다 */}
            <Flex
              ref={refDescription}
              _hover={{ cursor: "pointer" }}
              position="absolute"
              borderWidth={1}
              borderColor="gray.500"
              bgColor="gray.600"
              mt="0.6em"
              right="0.5em"
              rounded="4"
              px="0.4em"
              py="0.1em"
              opacity="0.75"
              onClick={() => setCurModalContent("namesex_edit")}
            >
              <Text color="gray.200" fontSize="sm">
                수정
              </Text>
            </Flex>

            <Flex mt={["-0.1em"]} ml="0.4em">
              <Flex>
                <Icon
                  mt="0.95em"
                  mr="0.1em"
                  color="gray.500"
                  as={IoChatboxEllipsesOutline}
                  boxSize="1rem"
                />
                <Text
                  mt="0.9em"
                  fontSize="sm"
                  fontWeight="semibold"
                  color="gray.400"
                >
                  기타사항:
                </Text>
              </Flex>
            </Flex>
          </Flex>

          {/* 기타사항박스 */}
          {processEtc()}
        </Flex>

        {/* 수정 버튼입니다 */}
        <Flex
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            setCurModalContent("full");
          }}
          borderWidth={1}
          borderColor="gray.600"
          rounded="lg"
          w={["14.5em"]}
          h={["2.3em"]}
          mt={["1.6em"]}
          mb={["0.8em"]}
          direction="column"
          bgColor="cyan.700"
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
        >
          {/* <Icon */}
          {/*   mt={["0.2em"]} */}
          {/*   color="gray.300" */}
          {/*   as={FiEdit} */}
          {/*   boxSize="1.1rem" */}
          {/* /> */}

          {/* mt={["0.3em", "0.5em"]} */}
          {/* mb={["0.9em", "0.9em"]} */}
          <Flex>
            <Icon
              mt={["0.1em", "0.2em"]}
              ml={["-0.5em", "0em"]}
              fontWeight="bold"
              color="gray.200"
              as={TbArrowBack}
              boxSize="1.2rem"
            />

            <Text
              ml={["0.4em"]}
              color="gray.200"
              fontSize="md"
              fontWeight="bold"
            >
              돌아가기
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ModalEdit;
