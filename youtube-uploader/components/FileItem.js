import React, { useCallback, useState, useRef } from "react";
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
  const { openModal } = useModal();
  // const isHover = true;
  const [isHover, setIshover] = useState(false);
  // const [thisFile, setThisfile] = useState(file);

  // console.log("FileItem::rendering...");
  // if (file.title) console.log('--- "' + file.title + '"');

  /*
  // 투명도 설정 함수입니다
  const opacitying = useCallback((s) => {
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
  }, []);
  */

  // useCallback 을 제거했습니다. 해당 인디케이터박스가 변화없음으로 인식되어
  //업데이트가 안되는 문제가 발생하였습니다
  const gradienting = (s) => {
    let ret = "";
    // 첫번째 로컬 영역 그라디언트 설정입니다
    if (s == 1) {
      if (file.local == 1)
        if (file.copying == 1) {
          // 복사중일 경우입니다
          ret =
            file.upscale_pct != 100
              ? "linear(to-r, cyan.900  , cyan.900, teal.100 )"
              : "linear(to-r, blue.700  , blue.700, teal.100 )";
        } else if (file.making == 1) {
			// 업스케일중일 경우입니다 / 붉고 노란 빛의 형상입니다
          if (file.upscale_pct != -1) {
            // console.log(
            //   "linear(to-r, blue.700 0%, cyan.300 ",
            //   file.upscale_pct,
            //   "%, blue.800 100%)"
            // );
            console.log(
              "linear(to-r, blue.700 0%, cyan.300 ",
              file.upscale_pct,
              "%)"
            );
            // "linear(to-r, blue.800 0%, cyan.100 " +
            ret =
              "linear(to-r, yellow.700 0%, yellow.100 " +
              file.upscale_pct +
              "%, cyan.800 100%)";
          } else ret = "linear(to-r, cyan.900  , cyan.800, teal.400 )";
          // 생성완료일 경우입니다 / 파란색
        } else if (file.upscale_pct == 100)
          ret = "linear(to-r, blue.700  , blue.700 )";
        else ret = "linear(to-r, cyan.900  , cyan.900 )";
      // 복사완료일 경우입니다
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
      // else if (file.uploading == 3) ret = "linear(to-r, pink.600, pink.600)";
      else if (file.uploading == 3)
        ret = "linear(to-r, purple.600, purple.500)";
      // 전송실패일 경우입니다
      else if (file.uploading == 4)
        ret = "linear(to-r, orange.600, orange.500)";
      else ret = "linear(to-r, gray.700  , gray.700)";
    }
    return ret;
  };
  /*
  const gradienting = useCallback((s) => {
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
      // else if (file.uploading == 3) ret = "linear(to-r, pink.600, pink.600)";
      else if (file.uploading == 3)
        ret = "linear(to-r, purple.600, purple.500)";
      // 전송실패일 경우입니다
      else if (file.uploading == 4)
        ret = "linear(to-r, orange.600, orange.500)";
      else ret = "linear(to-r, gray.700  , gray.700)";
    }
    return ret;
  }, []);
  */

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
        <VStack
          w={["16em", "16em", "30em"]}
          h={["6em", "6em", "4em"]}
          p="0"
          m="0"
          spacing={0}
          position="relative"
        >
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
                {/* 추가됨 아이콘입니다 */}
                <MdAddToPhotos fontSize="1.5em" />
              </Flex>
              {/* h="30%" */}
              {/* 유튜브 업로드 제목입니다 */}
              {/* 유튜브 업로드가 완료된 제목은 보라색으로 표시합니다 */}
              <Flex
                w="50%"
                h="full"
                color={
                  isHover
                    ? file.uploading === 3
                      ? "purple.300"
                      : file.uploading === 4
                      ? "orange.300"
                      : "pink.200"
                    : file.uploading === 3
                    ? "purple.500"
                    : file.uploading === 4
                    ? "orange.500"
                    : "pink.400"
                }
                alignItems="center"
                position="relative"
              >
                <Flex
                  w="full"
                  h="full"
                  position="absolute"
                  align="center"
                  justify={isHover ? "end" : "start"}
                  opacity={
                    file.title !== null
                      ? file.title.length !== 0
                        ? "1"
                        : "0"
                      : "0"
                  }
                >
                  {/* 별 문양입니다 */}
                  <Flex mr="1em" zIndex={isHover ? 100 : 10}>
                    <FaStarOfLife fontSize="1.5em" />
                  </Flex>
                  {/* 유튜브 제목입니다 */}
                  <Flex hidden={isHover ? 1 : 0} zIndex={isHover ? -1 : 10}>
                    {file.title}
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
            opacity={
              file.title !== null ? (file.title.length !== 0 ? 1 : 0) : 0
            }
          ></Flex>

          {/* 인티케이터 플렉스입니다 */}
          {/* <Flex w="full" h="full" justify="center" position="absolute"> */}
          {/*   {/1* 전송 인디케이터입니다 *1/} */}
          {/*   <HStack h="11%" w="50%" px="0em" m="0" spacing="0.1em" position="absolute"> */}
          {/*   {/1* <HStack h={["0.1%","0.1%",  "0.1%"]} w="100%" px="0em" m="0" spacing="0.1em"> *1/} */}
          {/*     {/1* opacity={opacitying(1)} *1/} */}
          {/*     <Box */}
          {/*       bgGradient={gradienting(1)} */}
          {/*       h="100%" */}
          {/*       w="33%" */}
          {/*       m="0" */}
          {/*       px="0" */}
          {/*     ></Box> */}
          {/*     {/1* opacity={opacitying(2)} *1/} */}
          {/*     <Box */}
          {/*       bgGradient={gradienting(2)} */}
          {/*       h="100%" */}
          {/*       w="34%" */}
          {/*       bgColor={"gray.600"} */}
          {/*       m="0" */}
          {/*       px="0" */}
          {/*     ></Box> */}
          {/*     {/1* opacity={opacitying(3)} *1/} */}
          {/*     <Box */}
          {/*       bgGradient={gradienting(3)} */}
          {/*       h="100%" */}
          {/*       w="33%" */}
          {/*       bgColor={"pink.600"} */}
          {/*       m="0" */}
          {/*       px="0" */}
          {/*     ></Box> */}
          {/*   </HStack> */}

          {/* <Icon as={FaHome} /> */}
          {/* <Icon as={FaServer} /> */}
          {/* <Icon as={FaYoutubeSquare} /> */}
          <Flex w="full" h="full" justify="center" position="absolute">
            {/* 파일명입니다 */}

            <HStack h="full" alignItems="center" position="absolute">
              <Flex mx={["1em", "1em", "0em"]} my={["1em", "1em", "0em"]}>
                <Text>{file.filename}</Text>
              </Flex>
              {/* <Flex>{file}</Flex> */}
            </HStack>
            {/* 숨겨진 인풋창입니다 */}
          </Flex>

          {/* 실제 인디케이터 구현부입니다 */}
          <Flex
            w="full"
            h="full"
            justify="center"
            position="absolute"
            zIndex={100}
          >
            {/* <HStack h="11%" w="100%" px="0em" m="0" spacing="0.1em"> */}
            <HStack
              h={["0.4em", "0.4em", "0.4em"]}
              w="100%"
              px="0em"
              m="0"
              spacing="0.1em"
            >
              {/* 로컬부 */}
              {/* opacity={opacitying(1)} */}
              <Box
                bgGradient={gradienting(1)}
                h="100%"
                w="33%"
                bgColor={"cyan.600"}
                m="0"
                px="0"
              ></Box>
              {/* 리모트부 */}
              {/* opacity={opacitying(2)} */}
              <Box
                bgGradient={gradienting(2)}
                h="100%"
                w="34%"
                bgColor={"gray.600"}
                m="0"
                px="0"
              ></Box>
              {/* 유튜브부 */}
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
