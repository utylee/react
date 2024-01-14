import { VStack, HStack, Flex } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import FileItem from "../components/FileItem";
import MyModal from "../components/MyModal";
import LoginJson from "../components/LoginJson";

export default function Home() {
  const [files, setFiles] = useState();
  const [myconfirm, setMyconfirm] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [auth_status, setAuth_status] = useState("");
  console.log("rendered!");
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
      };

      ws.current.onmessage = (evt) => {
        console.log("comming msg:" + evt.data);
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
      const js = await res.json();
      console.log(js);
      setFiles([...js]);
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
        <LoginJson auth_status={auth_status} />

        {/* <Flex p={3} bg="gray.500" rounded="md"> */}
        {/*   핑두 */}
        {/* </Flex> */}
        {/* <FileItem />; */}
        {/* return <FileItem file={f} key={index} />; */}
        {files != null
          ? files.map((f, index) => {
              // console.log("indexs.js:map::" + f.filename);
              return <FileItem file={f} key={parseInt(f.timestamp)} />;
            })
          : 0}
      </VStack>
      <MyModal setMyconfirm={setMyconfirm} />
    </>
  );
}
