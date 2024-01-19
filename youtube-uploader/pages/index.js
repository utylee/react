import { VStack, HStack, Flex } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import FileItem from "../components/FileItem";
import MyModal from "../components/MyModal";
import LoginJson from "../components/LoginJson";

export default function Home() {
  const [files, setFiles] = useState({});
  // const [files, setFiles] = useState({ json_date: "", files: [] });
  const [myconfirm, setMyconfirm] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [auth_status, setAuth_status] = useState("");
  // const [loginjson, setLoginjson] = useState("");
  // let json_date = "791031-21:00:00";
  console.log("index::js rendered!");
  // const websocketUrl = "ws://utylee.duckdns.org/youtube/api/ws";
  const websocketUrl = "ws://utylee.duckdns.org/youtube/uploader/ws";
  let ws = useRef(null);
  // let wsMsg = useRef("");
  // let auth_status = useRef("idle");
  // let auth_status = "idle";

  useEffect(() => {
    if (socketConnected) {
      console.log("sending msg..");
      ws.current.send("connected responsing send");
    }
  }, [socketConnected]);

  // useEffect(() => {}, [socketMessage]);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(websocketUrl);

      ws.current.onopen = () => {
        console.log("ws connected");
        setSocketConnected(true);
        // setMyconfirm(Math.random());
      };

      ws.current.onmessage = (evt) => {
        console.log("comming msg:" + evt.data);

        // parsed = JSON.parse(evt.data);
        // if (typeof parsed.type != "undefined && parsed.type) {
        //   if (parsed.type === "processing") {
        //     console.log("set auth_status:" + parsed.type);
        //     setAuth_status(parsed.type);
        //   } else if (parsed.type === "finished") {
        //     console.log("set auth_status:" + parsed.type);
        //     setAuth_status(parsed.type);
        //   } else if (parsed.type === "needRefresh") {
        //     console.log("needRefresh ws came");
        //     setMyconfirm(Math.random());
        //   }
        // }

        // json 객체로 주고 받기로 변경하였습니다
        // 잠시만...
        if (evt.data === "processing" || evt.data === "finished") {
          console.log("set auth_status:" + evt.data);
          // auth_status.current = evt.data;
          setAuth_status(evt.data);
        } else if (evt.data === "needRefresh") {
          console.log("needRefresh ws came");
          setMyconfirm(Math.random());
        }
      };
    }
  }, []);

  useEffect(() => {
    console.log("index.js::useEffect");
    const getItems = async () => {
      console.log("came index.js::useEffect");
      const res = await fetch("/youtube/api/listjs");
      // const res = await fetch("/uploader/api/listjs");
      let js = await res.json();
      js = JSON.parse(js);
      console.log("index.js::useEffect::js::" + js);
      console.log("js.json_date:" + js.json_date);
      setFiles({ ...js });
      // setFiles([...js]);
      // console.log("dddd");
      console.log("files:");
      console.log(files);
    };
    getItems();
  }, [myconfirm]);

  return (
    <>
      <VStack pt={"2em"}>
        {/* <LoginJson auth_status={auth_status.current} /> */}
        {/* <LoginJson auth_status={auth_status} /> */}
        {/* <LoginJson json_date={json_date} auth_status={auth_status} /> */}
        <LoginJson json_date={files.json_date} auth_status={auth_status} />

        {/* <Flex p={3} bg="gray.500" rounded="md"> */}
        {/*   핑두 */}
        {/* </Flex> */}
        {/* <FileItem />; */}
        {/* return <FileItem file={f} key={index} />; */}
        {/* {files != null */}
        {/*   ? files.map((f, index) => { */}
        {/* {files != null */}
        {/* ? files.files != null */}
        {/*   ? files.files != null ?*/}
        {/* : 0 */}
        {/* console.log("indexs.js:map::" + files.files)) */}

        {/* !== null 로 해도 동일한 효과가 있는 것 같기도 합니다. 어디선가 본 것처럼 */}
        {typeof files !== undefined && files
          ? typeof files.files !== undefined && files.files
            ? files.files.map((f, index) => {
                // console.log("indexs.js:map::" + f.filename);
                return <FileItem file={f} key={parseInt(f.timestamp)} />;
              })
            : 0
          : 0}
      </VStack>
      <MyModal setMyconfirm={setMyconfirm} />
    </>
  );
}
