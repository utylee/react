import { VStack, HStack, Flex } from "@chakra-ui/react";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import FileItem from "../components/FileItem";
import MyModal from "../components/MyModal";
import LoginJson from "../components/LoginJson";
// import useModal from "../components/useModal";
import useRefreshing from "../components/useRefreshing";
// import { RefreshingDispatchContext } from "../contexts/RefreshingContext";

export default function Home() {
  const [files, setFiles] = useState({});
  // const [files, setFiles] = useState({ json_date: "", files: [] });
  const [myconfirm, setMyconfirm] = useState(""); // refresh 함수로 사용됩니다

  const [socketConnected, setSocketConnected] = useState(true);
  const [auth_status, setAuth_status] = useState("");
  const { setIndexRefreshingFunction } = useRefreshing();
  // const { setRefreshingFunc } = useContext(RefreshingDispatchContext);

  // const [loginjson, setLoginjson] = useState("");
  // let json_date = "791031-21:00:00";
  console.log("index::js rendered!");
  console.log("index.js::setMyconfirm::is...");
  console.log(setMyconfirm);
  // console.log("index.js::setMyconfirmMemo::is...");
  // console.log(setMyconfirmMemo);
  // const websocketUrl = "ws://utylee.duckdns.org/youtube/api/ws";
  const websocketUrl = "ws://utylee.duckdns.org/youtube/uploader/ws";
  let ws = useRef(null);
  // let ws_connected = useRef(false);

  /*
  useEffect(() => {
    if (socketConnected) {
      console.log("sending msg..");
      ws.current.send("connected responsing send");
    }
  }, [socketConnected]);
  */

  // useEffect(() => {}, [socketMessage]);

  // 최초실행: 소켓 연결 함수 연결을 위해 set해줍니다
  useEffect(() => {
    setSocketConnected(false);

    // MyModal에서 index.js의 refreshing함수(listjs 및 state리프레이 다시 실행하는 함수)
    // 사용하기 위해 지정해줍니다

    // console.log(
    //   "index.js::useEffect[]::setIndexRefreshingFunction::setMyconfirm is..."
    // );
    // console.log(setMyconfirmMemo);
    // console.log(setMyconfirm);
    // useState에 함수를 저장하고 싶을 때는 꼭 함수형으로 한 번 더 감싸야 한답니다
    // 참고)) https://stackoverflow.com/questions/55621212/is-it-possible-to-react-usestate-in-react
    setIndexRefreshingFunction(() => setMyconfirm);
    // setRefreshingFunc(() => setMyconfirm);
    // setIndexRefreshingFunction(3);
    // setIndexRefreshingFunction(setMyconfirmMemo);
    // setRefreshingFunc(setMyconfirm);
  }, []);

  // useEffect(() => {
  //   setIndexRefreshingFunction(() => setMyconfirm);
  // }, [setIndexRefreshingFunction, getIndexRefreshingFunction, setMyconfirm]);

  // useEffect(() => {
  //   console.log("index.js::setMyconfirm changed::resetting...");
  //   console.log(setMyconfirm);
  //   // console.log(setMyconfirmMemo);
  //   // setIndexRefreshingFunction(setMyconfirm);
  //   // setIndexRefreshingFunction(3);
  //   // setIndexRefreshingFunction(setMyconfirmMemo);
  //   setRefreshingFunc(setMyconfirm);
  //   // }, [setMyconfirmMemo, setMyconfirm]);
  // }, [setMyconfirm]);

  // 소켓 연결 useEffect
  // dep: [socketConnected]
  useEffect(() => {
    console.log("index.js::useEffect[socketConnected]::ws.current is... ");
    console.log(ws.current);
    if (!ws.current && socketConnected == false) {
      // if (!ws.current || ws_connected.current == false) {
      ws.current = new WebSocket(websocketUrl);

      ws.current.onopen = () => {
        console.log("index.js::ws connected");
        setSocketConnected(true);
        // ws_connected.current = true;

        // 굳이 필요없는 것 같습니다
        //setSocketConnected(true);

        // setMyconfirm(Math.random());
      };

      ws.current.onclose = (evt) => {
        // ws_connected.current = false;
        console.log(
          "index.js::useEffect[socketConnected]::websocket closed ",
          evt
        );
        ws.current.close();
        console.log("index.js::useEffect[socketConnected]::socket closing");
        // ws.current = null;
      };

      ws.current.onmessage = (evt) => {
        console.log("index.js::useEffect[socketConnected]::msg:" + evt.data);

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
          // setMyconfirmMemo(Math.random());
          setMyconfirm(Math.random());
        }
      };
    }
  }, [socketConnected]);
  //}, []);

  // dep: [myconfirm]
  useEffect(() => {
    console.log("index.js::useEffect[myconfirm] for /api/listjs");
    const getItems = async () => {
      console.log("came index.js::useEffect");
      const res = await fetch("/youtube/api/listjs");
      // const res = await fetch("/uploader/api/listjs");
      let js = await res.json();
      js = JSON.parse(js);
      console.log("index.js::useEffect::js::");
      console.log(js);
      console.log("js.json_date:");
      console.log(js.json_date);
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
        {/* refresh_function={setMyconfirmMemo} */}
        {/* refresh_function={setMyconfirm} */}
        <LoginJson
          json_date={files.json_date}
          auth_status={auth_status}
          setSocketConnected={setSocketConnected}
          ws={ws}
        />

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
      {/* setMyconfirm={setMyconfirmMemo} */}
      {/* setMyconfirm={setMyconfirm} */}
      <MyModal setSocketConnected={setSocketConnected} ws={ws} />
    </>
  );
}
