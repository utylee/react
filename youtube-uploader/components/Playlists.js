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
      color = "gray.600";
    } else if (k == 1) {
      color = "red.800";
    } else if (k == 2) {
      color = "pink.800";
    } else if (k == 3) {
      color = "yellow.800";
    } else if (k == 4) {
      color = "purple.700";
    } else if (k == 5) {
      color = "blue.700";
    }
    // }
    return (
      <>
        <Flex
          alignItems="center"
          height={curplaylist == t ? "1.8em" : "1.2em"}
          px="0.5em"
          pb={1}
          borderColor={
            curplaylist == t
              ? brightenedColor(color)
              : isHover
              ? brightenedColor(color)
              : color
          }
          borderWidth={1}
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
            fontSize={curplaylist == t ? "1em" : "0.9em"}
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

      {/* overflowX: "scroll", */}
      {/* "::-webkit-scrollbar": { display: "none" }, */}
      {/* sx={{ */}
      {/* overflow: "hidden", */}
      {/* }} */}
      {/* overflow="hidden" */}
      {/* overflowX="auto" */}
      <HStack
        width="100%"
        borderWidth={0}
        // 큰 데스크탑 화면에서는 스크롤바가 없으므로 중앙에 배치합니다
        justify={["flex-start", "flex-start", "center"]}
        alignItems="center"
        mx="4em"
        overflowX="auto"
      >
        {wholePlaylists.map((i, index) => {
          return Texting(i.nickname, index);
        })}
      </HStack>
    </>
  );
};

export default Playlists;
