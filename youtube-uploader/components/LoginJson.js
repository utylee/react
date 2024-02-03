import { Flex, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useWS from "./useWS";

// const LoginJson = ({ json_date, auth_status, setSocketConnected, ws }) => {
const LoginJson = ({ json_date, auth_status }) => {
  console.log("LoginJson::auth_status::" + auth_status);
  const [isHover, setIshover] = useState(false);
  const { correctConnection, checkConnection, forceReconnect, msg, send } =
    useWS();

  const msging = () => {
    let result = "login.json   " + json_date;
    if (auth_status === "processing") {
      // result = "authorizing...";
      return <Flex>authorizing...</Flex>;
    } else {
      let clr = isHover ? "gray.400" : "purple.700";
      // let clr_hover = "gray.100";
      return (
        <HStack>
          {/* <Flex color="purple.700" alignSelf="end" sx={{ fontSize: "0.7em" }}> */}
          <Flex mr="0em">login.json</Flex>
          <Flex color={clr} alignSelf="end" sx={{ fontSize: "0.8em" }}>
            {json_date}
          </Flex>
        </HStack>
      );
    }
  };

  const bging = () => {
    let result = "0";
    if (auth_status === "processing" && isHover !== true) {
      result = "pink.700";
    } else if (isHover === true) {
      result = "purple.800";
    }
    return result;
  };

  const coloring = () => {
    let result = "gray.600";
    if (auth_status === "processing" && isHover !== true) {
      result = "gray.100";
    } else if (isHover === true) {
      result = "gray.500";
    }
    return result;
  };

  // 재인증 명령을 전송합니다
  const sendAuthoring = async () => {
    console.log("LoginJson.js::sendAuthoring");

    //클라이트 리프레싱 루틴도 추가합니다
    // console.log("LoginJson.js::sendAuthoring::ws socket is ", ws.current);
    // console.log(ws.current);
    // if (is_connected == false) {
	  
    // if (ws.current.readyState == 3) {
    //   console.log(
    //     "LoginJson::sendAuthoring::ws socket not connected so refreshing and reconnect"
    //   );

    //   // ws를 null로 할당하고 setSocketConnected 함수를 호출해서 소켓생성 useEffect를
    //   // 실행하게끔합니다
    //   ws.current.close();
    //   ws.current = null;
    //   // ws.current = null;
    //   setSocketConnected(false);
    //   // is_connected.current = false;
    //   // refresh_function(Math.random());
    // }
    correctConnection();

    const res = await fetch("/youtube/uploader/loginjson");
    // const res = await fetch("/uploader/api/listjs");
    // const js = await res.json();
    const txt = await res.text();
    console.log("LoginJson::sendAuthoring::after loginjson fetch::...");
    console.log(txt);

    // setFiles([...js]);
    // console.log("files:");
    // console.log(files);
  };
  return (
    <>
      {/* bg: isHover ? "purple.800" : 0, */}
      {/* color: isHover ? "gray.500" : "gray.600", */}

      {/*
        sx={{
          bg: () => bging(),
          cursor: isHover ? "pointer" : "none",
          color: () => coloring(),
        }}
		*/}
      <Flex
        border="1px"
        rounded={["0.5em", "0.5em", "0.7em"]}
        w={["16em", "16em", "30em"]}
        h={["1.5em", "1.5em", "2em"]}
        px="1em"
        justify="center"
        alignItems="center"
        borderColor="purple.800"
        overflow="hidden"
        onMouseEnter={() => setIshover(true)}
        onMouseLeave={() => setIshover(false)}
        onClick={() => sendAuthoring()}
        sx={{
          bg: bging(),
          cursor: isHover ? "pointer" : "none",
          color: coloring(),
        }}
      >
        {msging()}
      </Flex>
    </>
  );
};

export default LoginJson;
