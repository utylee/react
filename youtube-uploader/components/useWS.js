import React, { useCallback, useContext, useState } from "react";
import { WSDispatchContext, WSStateContext } from "../contexts/WSContext";

const useWS = () => {
  const { isReady, msg, binded_send } = useContext(WSStateContext);
  const { getReadyState, forceReconnect, setCallbackFunc } =
    useContext(WSDispatchContext);

  const checkConnection = useCallback(() => {
    console.log("useWS::checkConnection::getReadyState::...");
    console.log(getReadyState());
    let ret = true;
    if (getReadyState() == 3) {
      ret = false;
    }
    return ret;
  }, []);

  const send = useCallback((val) => {
    binded_send(val);
  }, []);

  return { checkConnection, forceReconnect, msg, send, setCallbackFunc };
};

export default useWS;
