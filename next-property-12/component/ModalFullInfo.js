import React from "react";

import { Flex, Text, Icon, Divider, Link } from "@chakra-ui/react";

import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import { IoIosPaw } from "react-icons/io";
import { FaCar } from "react-icons/fa6";
import { ImAngry } from "react-icons/im";
import { BsExclamationOctagon, BsExclamationTriangle } from "react-icons/bs";
import { RiFileUnknowFill } from "react-icons/ri";
import useModal from "../context/useModal";

const ModalFullInfo = ({ curRoom, curRoomDetails, curOccupantDetails }) => {
  const { setCurModalContent } = useModal();

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
      {/* 최상단 flex 입니다 */}
      {/* <Flex direction="column" w="100%" h="30em" alignItems="center"> */}
      <Flex direction="column" w="100%" alignItems="center" overflowY="auto">
        {/* 룸 flex 입니다 */}
        <Flex
          w="15em"
          h="5em"
          bgColor="gray.600"
          rounded="lg"
          alignItems="center"
          direction="column"
          borderColor="gray.500"
          borderWidth={1}
        >
          {/* 호수 flex */}
          <Flex>
            {/* 호숫자 */}
            <Text
              mt={["0.1em", "0em"]}
              ml="0.5em"
              fontSize="4xl"
              fontWeight="semibold"
              color="gray.300"
            >
              {curRoom.room_no}
            </Text>
            {/* 호 */}
            <Text
              mt="0.9em"
              ml="0.2em"
              fontSize="xl"
              fontWeight="medium"
              color="gray.300"
            >
              호
            </Text>
          </Flex>
          {/* 룸종류 flex */}
          <Flex
            mt={["-0.5em", "-0.4em"]}
            borderColor="gray.500"
            borderWidth={1}
            rounded="sm"
            px="0.3em"
            pt="-0.3em"
          >
            <Text fontSize="sm" fontWeight="semibold" color="gray.400">
              {curRoomDetails.type} / {curRoomDetails.sq_footage}평형
            </Text>
          </Flex>
        </Flex>

        {/* 세입자 flex 입니다 */}
        {/* h={["8.5em"]} */}
        <Flex
          mt="1.2em"
          w="15em"
          bgColor="gray.600"
          rounded="lg"
          direction="column"
          borderColor="gray.500"
          borderWidth={1}
        >
          {/* 이름과 성별입니다 */}
          <Flex alignSelf="center">
            <Text
              mt="0.5em"
              ml="0.8em"
              fontSize="lg"
              fontWeight="semibold"
              color="gray.300"
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
          </Flex>
          {/* <Link */}
          {/*   href={"sms:" + curOccupantDetails.phone} */}
          {/*   style={{ textDecoration: "none" }} */}
          {/* > */}
          {/* </Link> */}

          {/* 전화번호입니다 */}
          <Flex
            mb={["1em"]}
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              setCurModalContent("phone");
            }}
          >
            <Icon
              mt={["0.3em", "0.4em"]}
              ml={["2em", "1.8em"]}
              color="gray.500"
              as={ImPhone}
              boxSize="1rem"
            />
            <Text
              mt="0.0em"
              ml={["0.8em", "0.8em"]}
              fontSize="lg"
              fontWeight="semibold"
              color="gray.300"
            >
              {curOccupantDetails.phone}
            </Text>
          </Flex>

          {/* 차량및 반려동물 악성도 등 정보 표시 */}
          <Divider
            mt={["-0.5em"]}
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

          {/* 반려동물 차량 악성도 표시 열입니다 */}
          <Flex
            ml={["-0.8rem"]}
            mt="0.5em"
            mb={["1em"]}
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
                bgColor="green.500"
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
                bgColor="blue.500"
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
                bgColor="orange.600"
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
                  ? "yellow.400"
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
                  ? "yellow.400"
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

        {/* 계약조건 / 기간/ 이행 flex 박스입니다 */}
        {/* h={["8.5em"]} */}
        <Flex
          mt="1.2em"
          w="15em"
          bgColor="gray.600"
          rounded="lg"
          direction="column"
          borderColor="gray.500"
          borderWidth={1}
        >
          {/* 계약종류와 월세금액입니다 */}
          {/* <Flex alignSelf="center"> */}
          <Flex ml="1em">
            <Flex>
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
                color="gray.300"
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
                color="gray.300"
              >
                {curRoom.monthly_pay}
              </Text>
              <Text
                mt="0.6em"
                ml="0.2em"
                fontSize="md"
                fontWeight="semibold"
                color="gray.300"
              >
                만원
              </Text>
            </Flex>
          </Flex>

          <Divider />

          {/* 보증금입니다 */}
          {/* <Flex mt={["-0.3em"]} alignSelf="center"> */}
          <Flex mt={["-0.3em"]} ml="2.2em">
            <Flex>
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
                color="gray.300"
              >
                {curRoom.reserved_pay}
              </Text>
              <Text
                mt="0.6em"
                ml="0.2em"
                fontSize="md"
                fontWeight="semibold"
                color="gray.300"
              >
                만원
              </Text>
            </Flex>
          </Flex>
          <Divider />

          {/* 입금일입니다 */}
          {/* <Flex mt={["-0.3em"]} alignSelf="center"> */}
          <Flex mt={["-0.3em"]} ml="2.2em">
            <Flex>
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
                color="gray.300"
              >
                일
              </Text>
            </Flex>
          </Flex>

          <Divider />
          {/* 계약기간입니다 */}
          <Flex mt={["-0.3em"]} ml="1.4em">
            <Flex>
              <Text
                mt="0.8em"
                fontSize="sm"
                fontWeight="semibold"
                color="gray.400"
              >
                계약기간:
              </Text>
              <Text
                mt="0.4em"
                ml="1em"
                fontSize="lg"
                fontWeight="semibold"
                color="gray.300"
              >
                {curRoom.contract_period}개월
              </Text>
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
          <Flex mt={["-0.3em"]} ml="4.6em">
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
          <Flex mt={["-0.3em"]} ml="1.4em">
            <Flex>
              <Text
                mt="0.8em"
                fontSize="sm"
                fontWeight="semibold"
                color="gray.400"
              >
                입금내역:
              </Text>
            </Flex>
          </Flex>
          <Flex mt={["0.3em"]} mb={["1em"]} ml="4.6em" direction="column">
            {/* {(() => { */}
            {/*   console.log("deposit_history"); */}
            {/*   console.log(curRoomDetails.deposit_history); */}
            {/* })()} */}
            {curRoomDetails.deposit_history.map((l) => {
              return (
                <>
                  <Flex>
                    <Text
                      mt="0.4em"
                      ml="-3em"
                      fontSize="xs"
                      fontWeight="semibold"
                      color="gray.300"
                    >
                      {l[0]}
                    </Text>
                    <Text
                      mt="0.2em"
                      ml="-2em"
                      fontSize="sm"
                      fontWeight="semibold"
                      color="gray.300"
                    >
                      {l[1]}만원
                    </Text>
                  </Flex>
                </>
              );
            })}
          </Flex>
          {/* <Link */}
          {/*   href={"sms:" + curOccupantDetails.phone} */}
          {/*   style={{ textDecoration: "none" }} */}
          {/* > */}
          {/* </Link> */}
        </Flex>
      </Flex>
    </>
  );
};

export default ModalFullInfo;
