import React, { useCallback, useContext, useState } from "react";
import { WSDispatchContext, WSStateContext } from "../contexts/WSContext";

const useWS = () => {
  const { isReady, msg, binded_send } = useContext(WSStateContext);
  // const { getReadyState, forceReconnect } = useContext(WSDispatchContext);
  const { getReadyState, setDummy } = useContext(WSDispatchContext);

  const correctConnection = () => {
    console.log("useWS::correctConnection::");
    if (!checkConnection) {
      forceReconnect();
    }
  };

  const checkConnection = () => {
    console.log("useWS::checkConnection::getReadyState::...");
    console.log(getReadyState());
    let ret = true;
    if (getReadyState() == 3) {
      ret = false;
    }
    return ret;
  };

  const send = (val) => {
    binded_send(val);
  };

  // const checkConnection = useCallback(() => {
  //   console.log("useWS::checkConnection::getReadyState::...");
  //   console.log(getReadyState());
  //   let ret = true;
  //   if (getReadyState() == 3) {
  //     ret = false;
  //   }
  //   return ret;
  // }, []);

  // const send = useCallback((val) => {
  //   binded_send(val);
  // }, []);

  const forceReconnect = () => {
    console.log(
      "useWS::forceReconnect()::setDummy calling...::setDummy is... "
    );
    console.log(setDummy);
    setDummy({});
  };

  return { correctConnection, checkConnection, forceReconnect, msg, send };
};

export default useWS;
