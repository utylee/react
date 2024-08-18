import { useContext } from "react";
import { PrintDispatchContext, PrintStateContext } from "./PrintContext";

const usePrint = () => {
  const { print } = useContext(PrintStateContext);
  const { setPrint } = useContext(PrintDispatchContext);

  const printCur = print;
  const setPrintCur = setPrint;

  return { printCur, setPrintCur };

  // return { print, setPrint };
};

export default usePrint;
