import { PageStateContext, PageDispatchContext } from "./PageContext";
import { useState, useMemo } from "react";

const PageProvider = ({ children }) => {
  const [page, setPage] = useState({});

  // const dispatch = useMemo(() => {
  //   return { setPage };
  // }, []);
  const dispatch = useMemo(() => ({ setPage }), []);

  return (
    <PageStateContext.Provider value={{ page }}>
      <PageDispatchContext.Provider value={dispatch}>
        {children}
      </PageDispatchContext.Provider>
    </PageStateContext.Provider>
  );
};

export default PageProvider;
