import { useContext } from "react";
// import { PageDispatchContext, PageStateContext } from "./PageContext";
import { PageStateContext } from "./PageContext";
import { PageDispatchContext } from "./PageContext";

const usePage = () => {
  const { page } = useContext(PageStateContext);
  const { setPage } = useContext(PageDispatchContext);

  const pageCur = page;
  const setPageCur = setPage;

  return { pageCur, setPageCur };

  // return { print, setPrint };
};

export default usePage;
