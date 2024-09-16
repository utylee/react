import { Divider, Flex, Link, Text } from "@chakra-ui/layout";
import React from "react";
import useModal from "../context/useModal";
import { ImPhone } from "react-icons/im";
import { Icon } from "@chakra-ui/react";
import { MdOutlineTextsms, MdSms } from "react-icons/md";

const ModalPhoneContact = ({ room_no, name, phone }) => {
  const { setCurModalContent } = useModal();
  return (
    <>
      <Flex
        direction="column"
        w="100%"
        bgColor="gray.700"
        rounded="lg"
        justifySelf="center"
        alignSelf="center"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          direction="column"
          justifySelf="center"
          alignSelf="center"
          alignItems="center"
          color="gray.300"
        >
          <Flex>
            <Text fontSize="3xl">{room_no}</Text>
            <Text mt={["0.5em"]} fontSize="lg">
              호
            </Text>
          </Flex>
          <Flex mt={["0.1em"]}>
            <Text fontSize="2xl">{name}</Text>
            <Text color="gray.400" mt={["0.3em"]} fontSize="lg">
              에게
            </Text>
          </Flex>
          <Text mt={["0.3em"]} color="gray.400" fontSize="xl">
            연락하시겠습니까?
          </Text>
        </Flex>

        {/* sms 통화 취소 선택란입니다 */}
        <Flex
          mt={["2em", "3.5em"]}
          mb={["2em"]}
          direction="column"
          w="8em"
          bgColor="gray.600"
          borderColor="gray.500"
          borderWidth={1}
          rounded="xl"
          alignItems="center"
        >
          <Link href={"sms:" + phone} style={{ textDecoration: "none" }}>
            <Flex>
              <Icon
                mt="0.9em"
                mr="0.5em"
                color="gray.300"
                as={MdOutlineTextsms}
                boxSize="1.4rem"
              />
              <Text
                fontSize="xl"
                fontWeight="semibold"
                color="gray.300"
                my="0.5em"
              >
                SMS
              </Text>
            </Flex>
          </Link>
          <Divider borderColor="gray.500" />
          <Link href={"tel:" + phone} style={{ textDecoration: "none" }}>
            <Flex>
              <Icon
                mt="0.8em"
                mr="0.4em"
                color="gray.300"
                as={ImPhone}
                boxSize="1.3rem"
              />
              <Text
                fontSize="xl"
                fontWeight="semibold"
                color="gray.300"
                my="0.5em"
              >
                전화
              </Text>
            </Flex>
          </Link>
          <Divider borderColor="gray.500" />
          <Flex
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              setCurModalContent("full");
            }}
          >
            <Text
              fontSize="xl"
              fontWeight="semibold"
              color="orange.500"
              my="0.5em"
            >
              취소
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ModalPhoneContact;
