import React, { useContext, useCallback, useMemo, useEffect } from "react";
import {
  RefreshingDispatchContext,
  RefreshingStateContext,
} from "../contexts/RefreshingContext";

const useRefreshing = () => {
  // console.log("useModal rendered");
  const { refreshingFunc } = useContext(RefreshingStateContext);
  const { setRefreshingFunc } = useContext(RefreshingDispatchContext);
  // const { setRefreshingFunction } = useContext(RefreshingDispatchContext);

  // useEffect(() => {
  //   console.log("useRefreshing::useEffect[refreshingFunc]::refreshingFunc:: is ...");
  //   console.log(refreshingFunc);
  // }, [refreshingFunc]);

  const setIndexRefreshingFunction = (f) => {
    console.log("useRefreshing::setIndexRefreshingFunction::(f) is ...");
    console.log(f);
    setRefreshingFunc(f);
    // setRefreshingFunction(f);
  };

  const getIndexRefreshingFunction = () => {
    console.log(
      "useRefreshing::getIndexRefreshingFunction::refreshingFunc is..."
    );
    console.log(refreshingFunc);
    return refreshingFunc;
  };

  return {
    setIndexRefreshingFunction,
    getIndexRefreshingFunction,
  };
};

export default useRefreshing;
