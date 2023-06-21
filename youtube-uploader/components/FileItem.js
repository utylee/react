import React, { useState } from "react";
import { Text, Icon, Flex, HStack, VStack, Box } from "@chakra-ui/react";
import {
  FaStarOfLife,
  FaHome,
  FaServer,
  FaYoutube,
  FaYoutubeSquare,
} from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { MdAddToPhotos } from "react-icons/md";
import useModal from "./useModal";

const FileItem = ({ file }) => {
  const [isHover, setIshover] = useState(false);

  // 투명도 설정 함수입니다
  const opacitying = (s) => {
    let ret = 0;
    // 로컬 영역입니다
    if (s == 1) {
      if (file.local == 1) {
        // 복사중일 때는 최고 밝기로 설정해줍니다
        if (file.copying == 1) ret = 1;
        // 생성중일 때는 중간 밝기로 설정해줍니다
        else if (file.making >= 1) ret = 0.5;
      } else ret = 0.1; // 기타 경우는 어둡게 설정해줍니다
    } else if (s == 2) {
      // 리모트 영역입니다
      // 복사중 이거나 유튜브 업로드 중일 때 최고 밝기로 설정해줍니다
      if (file.copying == 1 || file.uploading == 2) ret = 1;
      // 복사완료 후 파일이 존재할 경우 중간 밝기로 설정해줍니다
      else if (file.copying == 2) ret = 0.5;
      else ret = 0.1; // 기타 경우에는 어둡게 설정해줍니다
    } else if (s == 3) {
      // 유튜브 영역입니다
      // 유튜브 업로드 중일 때 최고 밝기로 설정해줍니다
      if (file.uploading == 2) ret = 1;
      // 업로드완료 후 중간 밝기로 설정해줍니다
      else if (file.uploading == 3) ret = 0.5;
      else ret = 0.1; // 기타 경우에는 어둡게 설정해줍니다
    } else ret = 0.1;

    return ret;
  };
  const gradienting = (s) => {
    let ret = "";
    // 첫번째 로컬 영역 그라디언트 설정입니다
    if (s == 1) {
      if (file.local == 1)
        if (file.copying == 1) {
          ret = "linear(to-r, cyan.900  , cyan.900, teal.100 )";
        } else if (file.making == 1) {
          ret = "linear(to-r, cyan.900  , cyan.800, teal.400 )";
        } else ret = "linear(to-r, cyan.900  , cyan.900 )";
      else ret = "linear(to-r, gray.700  , gray.700)";
    } else if (s == 2) {
      // 두번째 원격 영역 그라디언트 설정입니다
      if (file.copying == 1)
        ret = "linear(to-r, teal.100, gray.600  , gray.600)";
      else if (file.copying == 2) {
        if (file.uploading == 2)
          ret = "linear(to-r, gray.600, gray.600, gray.500, pink.100)";
        else ret = "linear(to-r, gray.500, gray.500)";
      } else ret = "linear(to-r, gray.700, gray.700)";
    } else if (s == 3) {
      // 세번째 유튜브 영역 그라디언트 설정입니다
      if (file.uploading == 2)
        ret = "linear(to-r, red.100, pink.700  , pink.800)";
      else if (file.uploading == 3) ret = "linear(to-r, pink.600, pink.600)";
      else ret = "linear(to-r, gray.700  , gray.700)";
    }
    return ret;
  };

  const { openModal } = useModal();

  return (
    <>
      {/* _hover={{ cursor: "pointer", bg: "teal.500", color: "gray.100" }} */}
      <Flex
        border="1px"
        rounded="xl"
        borderColor="gray.500"
        py="0em"
        overflow="hidden"
        color="gray.300"
        onMouseEnter={() => setIshover(true)}
        onMouseLeave={() => setIshover(false)}
        sx={{
          cursor: isHover ? "pointer" : "none",
          bg: isHover ? "teal.500" : 0,
          color: isHover ? "gray.100" : "gray.300",
        }}
        onClick={() => {
          openModal(file);
        }}
      >
        <VStack w="30em" h="4em" p="0" m="0" spacing={0} position="relative">
          {/* opacity={file.local ? 0.6 : 0.1} */}
          {/* opacity={file.copying == 1 ? 1 : file.uploading ? 0.6 : 0.1} */}
          {/* bgColor={file.copying == 2 ? "gray.400" : "gray.500"} */}
          {/* opacity={file.uploading == 2 ? 0.6 : 0.1} */}

          {/* 오버레이 플렉스입니다 */}
          <Flex w="full" h="full" position="absolute">
            <HStack w="full" h="full" spacing="0em">
              {/* <FaCircleArrowUp /> */}
              <Flex
                w="50%"
                h="full"
                alignItems="center"
                pl="1em"
                color="teal.300"
                opacity={file.queueing == 1 ? "1" : "0"}
              >
                {/* <BiAddToQueue fontSize="1.5em" /> */}
                <MdAddToPhotos fontSize="1.5em" />
              </Flex>
              {/* h="30%" */}
              <Flex
                w="50%"
                h="full"
                color={isHover ? "pink.200" : "pink.400"}
                alignItems="center"
                position="relative"
              >
                <Flex
                  w="full"
                  h="full"
                  position="absolute"
                  align="center"
                  justify={isHover ? "end" : "start"}
                >
                  {/* 별 문양입니다 */}
                  <Flex mr="1em" zIndex={isHover ? 100 : 10}>
                    <FaStarOfLife fontSize="1.5em" />
                  </Flex>
                  {/* 유튜브 제목입니다 */}
                  <Flex hidden={isHover ? 1 : 0} zIndex={isHover ? -1 : 10}>
                    hos falstad mvp
                  </Flex>
                </Flex>
              </Flex>
            </HStack>
          </Flex>

          {/* 중간층 마스킹 플렉스입니다 */}
          <Flex
            w="full"
            h="full"
            position="absolute"
            bgGradient="linear(to-r,rgba(43,42,51, 0) 40%  , rgba(43,42,51,1 ) 48%  )"
            zIndex={isHover ? -1 : 1}
          ></Flex>

          {/* 메인 플렉스입니다 */}
          <Flex w="full" h="full" justify="center" position="absolute">
            {/* 전송 인디케이터입니다 */}
            <HStack h="11%" w="100%" px="0em" m="0" spacing="0.1em">
              {/* opacity={opacitying(1)} */}
              <Box
                bgGradient={gradienting(1)}
                h="100%"
                w="33%"
                m="0"
                px="0"
              ></Box>
              {/* opacity={opacitying(2)} */}
              <Box
                bgGradient={gradienting(2)}
                h="100%"
                w="34%"
                bgColor={"gray.600"}
                m="0"
                px="0"
              ></Box>
              {/* opacity={opacitying(3)} */}
              <Box
                bgGradient={gradienting(3)}
                h="100%"
                w="33%"
                bgColor={"pink.600"}
                m="0"
                px="0"
              ></Box>
            </HStack>

            {/* <Icon as={FaHome} /> */}
            {/* <Icon as={FaServer} /> */}
            {/* <Icon as={FaYoutubeSquare} /> */}
            {/* 파일명입니다 */}
            <HStack height="full" alignItems="center" position="absolute">
              <Flex>
                <Text>{file.filename}</Text>
              </Flex>
              {/* <Flex>{file}</Flex> */}
            </HStack>
            {/* 숨겨진 인풋창입니다 */}
          </Flex>
          <Flex
            w="full"
            h="full"
            justify="center"
            position="absolute"
            zIndex={100}
          >
            <HStack h="11%" w="100%" px="0em" m="0" spacing="0.1em">
              {/* opacity={opacitying(1)} */}
              <Box
                bgGradient={gradienting(1)}
                h="100%"
                w="33%"
                bgColor={"cyan.600"}
                m="0"
                px="0"
              ></Box>
              {/* opacity={opacitying(2)} */}
              <Box
                bgGradient={gradienting(2)}
                h="100%"
                w="34%"
                bgColor={"gray.600"}
                m="0"
                px="0"
              ></Box>
              {/* opacity={opacitying(3)} */}
              <Box
                bgGradient={gradienting(3)}
                h="100%"
                w="33%"
                bgColor={"pink.600"}
                m="0"
                px="0"
              ></Box>
            </HStack>
          </Flex>
        </VStack>
      </Flex>
    </>
  );
};

export default FileItem;
