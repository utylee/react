import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  RefreshingStateContext,
  RefreshingDispatchContext,
} from "./RefreshingContext";

const RefreshingProvider = ({ children }) => {
  // const [refreshingFunc, setRefreshingFunc] = useState(() => {
  //   (f) => {
  //     console.log("핑두" + f);
  //   };
  // });

  // useEffect(() => {
  //   console.log("RefreshingProvider::useEffect[]::refreshingFunc is...");
  //   console.log(refreshingFunc);
  // }, []);
  const [refreshingFunc, setRefreshingFunc] = useState(() => () => {});
  // const setRefreshingFunction = useCallback(
  //   (f) => {
  //     console.log("RefreshingProvider::cameinto setRefreshingFunction::f is..");
  //     console.log(f);
  //     setRefreshingFunc(f);
  //   },
  //   [setRefreshingFunc]
  // );

  // useEffect(() => {
  //   console.log(
  //     "RefreshingProvider::useEffect[]::setRefreshingFunc changed::..."
  //   );
  //   console.log(setRefreshingFunc);
  // }, [setRefreshingFunc]);

  useEffect(() => {
    console.log("RefreshingProvider::useEffect[]::refreshingFunc changed::...");
    console.log(refreshingFunc);
  }, [refreshingFunc]);

  // console.log("RefreshingProvider::rendering::refreshingFunc is...");
  // console.log(refreshingFunc);

  // const dispatch = useMemo(
  //   () => ({
  //     setRefreshingFunc,
  //   }),
  //   []
  // );
  const dispatch = useMemo(
    () => ({
      // setRefreshingFunction,
      setRefreshingFunc,
    }),
    []
  );

  return (
    <RefreshingStateContext.Provider value={{ refreshingFunc }}>
      <RefreshingDispatchContext.Provider value={dispatch}>
        {children}
        {/* <MyModal /> */}
      </RefreshingDispatchContext.Provider>
    </RefreshingStateContext.Provider>
  );
};

export default RefreshingProvider;
