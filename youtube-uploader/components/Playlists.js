import { Flex, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Playlists = ({ curFile, wholePlaylists, setCurfile, setChanged }) => {
  // const [playlist, setPlaylist] = useState(curPlaylist);
  const [curplaylist, setPlaylist] = useState(curFile.playlist);

  const handleClick = (c) => {
    setPlaylist(c);
    let { playlist, ...rest } = curFile;
    console.log("playlist", rest);
    setCurfile({ ...rest, playlist: c });
    console.log("playlist", { ...rest, playlist: c });
    setChanged(true);
  };

  // 색상에 red.600 등에 100을 줄여서 더 밝게 해줍니다
  const brightenedColor = (color) => {
    let result = color;
    // console.log("brightning");
    // console.log(color);
    let bright = parseInt(color.slice(-3, 20)) - 100;
    // console.log(bright);
    result = result.slice(-20, -3) + bright.toString();
    // console.log(result);
    return result;
  };
  const Texting = (t, k) => {
    const [isHover, setIshover] = useState(false);
    let color = "white.200";
    let bgcolor = "white.200";

    // if (t !== curPlaylist) {
    if (k == 0) {
      color = "gray.600"; //etc
    } else if (k == 1) {
      color = "red.800"; //finals
    } else if (k == 2) {
      color = "pink.800"; //sombra
    } else if (k == 3) {
      color = "green.700"; //wow
    } else if (k == 4) {
      color = "yellow.800"; //apex
    } else if (k == 5) {
      color = "blue.700"; //hos
    }
    // }
    return (
      <>
        <Flex
          alignItems="center"
          height={curplaylist == t ? "1.8em" : "1.2em"}
          px={["0.5em", "0.5em", "0.5em"]}
          ml={["0.5em", "0.5em", "1em"]}
          pb={[0, 1, 1]}
          borderColor={
            curplaylist == t
              ? brightenedColor(color)
              : isHover
              ? brightenedColor(color)
              : color
          }
          borderWidth={isHover ? 1 : 1}
          background={curplaylist == t ? brightenedColor(color) : 0}
          rounded="0.5em"
          onMouseEnter={() => setIshover(true)}
          onMouseLeave={() => setIshover(false)}
          onClick={() => handleClick(t)}
          sx={{
            cursor: isHover ? "pointer" : "none",
          }}
        >
          <Text
            fontWeight={isHover ? "bold" : "normal"}
            fontSize={curplaylist == t ? "1em" : isHover ? "1em" : "0.9em"}
            color={
              curplaylist == t
                ? "gray.800"
                : isHover
                ? brightenedColor(color)
                : color
            }
          >
            {t}
          </Text>
        </Flex>
      </>
    );
  };
  return (
    <>
      {console.log("wholePlaylists", wholePlaylists)}
      <Flex spacing={0} width="full" height="full">
        {/* 좌우여백의 좌측 여백입니다 */}
        <Flex
          width={["5%", "5%", "13%"]}
          height="full"
          flexGrow={1}
          position="relative"
        ></Flex>
        {/* 중간 실제 태그 파트입니다 */}
        <Flex width={["90%", "90%", "74%"]} position="relative">
          {/* overflowX: "scroll", */}
          {/* "::-webkit-scrollbar": { display: "none" }, */}
          {/* sx={{ */}
          {/* overflow: "hidden", */}
          {/* }} */}
          {/* overflow="hidden" */}
          {/* overflowX="auto" */}
          {/* 왼쪽 페이드아웃입니다 */}
          <Flex
            position="absolute"
            width="7%"
            height="full"
            justify="flex-start"
            flexBasis="1"
            overflow="auto"
            whiteSpace="nowrap"
            bgGradient="linear(to-r,rgba(43,42,51, 1) 0%  , rgba(43,42,51,0) 80%  )"
            zIndex="3"
          ></Flex>
          {/* 오른쪽 페이드아웃입니다 */}
          <Flex
            position="absolute"
            ml="90%"
            width={["10%", "10%", "0%"]}
            height="full"
            justify="flex-end"
            overflow="auto"
            whiteSpace="nowrap"
            bgGradient="linear(to-r,rgba(43,42,51, 0) 0%  , rgba(43,42,51,1) 50%  )"
            zIndex="4"
          ></Flex>
          {/* 실제 태그 구현부입니다 */}
          <HStack
            position="relative"
            pl={["0.5em", "0.5em", "1em"]}
            pr={["1.5em", "0.5em", "1em"]}
            zIndex="2"
            borderWidth={0}
            // 큰 데스크탑 화면에서는 스크롤바가 없으므로 중앙에 배치합니다
            justify={["flex-start", "flex-start", "center"]}
            alignItems="center"
            overflowX="auto"
          >
            {wholePlaylists.map((i, index) => {
              return Texting(i.nickname, index);
            })}
          </HStack>
        </Flex>
        {/* 오른쪽 여백입니다 */}
        <Flex width={["5%", "5%", "13%"]} position="relative"></Flex>
      </Flex>
    </>
  );
};

export default Playlists;
