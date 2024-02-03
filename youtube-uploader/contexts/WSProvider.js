import { WSStateContext, WSDispatchContext } from "./WSContext";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const WSProvider = ({ children }) => {
  // const [ws, setWs] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [msg, setMsg] = useState();
  const ws = useRef(null);
  const [dummy, setDummy] = useState(); // 오직 forceReconnect를 위한 state 선언입니다
  // const [callbackFunc, setCallbackFunc] = useState();
  console.log("WSProvider::rendering...");
  useEffect(() => {
    // console.log("WSProvider::useEffect[]::setDummy is ...");
    // console.log(setDummy);
    setDummy({});
  }, []);

  // dep: [dummy]
  useEffect(() => {
    console.log("WSProvider::useEffect[]::starting::ws.current is... ");
    console.log(ws.current);

    ws.current = new WebSocket("ws://utylee.duckdns.org/youtube/uploader/ws");

    ws.current.onopen = () => {
      console.log("WSProvider::ws connected");
      setIsReady(true);
      console.log("WSProvider::ws.onopen::callbackFunc calling...");
      // console.log(callbackFunc);
      // callbackFunc ? callbackFunc() : 0;
    };

    ws.current.onclose = (evt) => {
      console.log("WSProvider::useEffect::websocket closed ");
      setIsReady(false);
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };

    ws.current.onmessage = (evt) => {
      console.log("WSProvider::useEffect::msg:" + evt.data);
      setMsg(evt.data);

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

      // // json 객체로 주고 받기로 변경하였습니다
      // // 잠시만...
      // if (evt.data === "processing" || evt.data === "finished") {
      //   console.log("set auth_status:" + evt.data);
      //   // auth_status.current = evt.data;
      //   setAuth_status(evt.data);
      // } else if (evt.data === "needRefresh") {
      //   console.log("needRefresh ws came");
      //   setMyconfirm(Math.random());
      // }

      return () => {
        console.log("WSProvider::useEffect::return::socket close()");
        if (ws.current) {
          ws.current.close();
          ws.current = null;
        }
      };
    };
  }, [dummy]);

  let binded_send = ws.current ? ws.current.send.bind(ws.current) : null;

  const getReadyState = () => {
    // 혹시 끊겨있다면 그냥 3을 전달해줘서 끊겨있는 상태로 그대로 처리하게 합니다
    return ws.current ? ws.current.readyState : 3;
  };

  const dispatch = useMemo(
    () => ({
      getReadyState,
      setDummy,
      // forceReconnect,
      // setCallbackFunc,
    }),
    []
  );

  return (
    <WSStateContext.Provider value={{ isReady, msg, binded_send }}>
      {/* <WSStateContext.Provider value={{ isReady, msg, ws.current?.send.bind(ws.current) }}> */}
      <WSDispatchContext.Provider value={dispatch}>
        {children}
      </WSDispatchContext.Provider>
    </WSStateContext.Provider>
  );
};

export default WSProvider;
