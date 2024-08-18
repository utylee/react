import { PrintStateContext, PrintDispatchContext } from "./PrintContext";
import { useState, useMemo } from "react";

const PrintProvider = ({ children }) => {
  const [print, setPrint] = useState({});

  const dispatch = useMemo(() => {
    return { setPrint };
  }, []);

  return (
    <PrintStateContext.Provider value={{ print }}>
      <PrintDispatchContext.Provider value={dispatch}>
        {children}
      </PrintDispatchContext.Provider>
    </PrintStateContext.Provider>
  );
};

export default PrintProvider;
