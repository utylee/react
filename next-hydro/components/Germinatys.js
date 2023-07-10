import React, { useContext, useEffect, useState } from "react";
import Germinaty from "./Germinaty";
import { Flex } from "@chakra-ui/react";
import useModal from "../context/useModal";
import { PlantersStateContext } from "../context/PlantersContext";
import usePlanters from "../context/usePlanters";

const Germinatys = ({ gems }) => {
  // const [thisGems, setThisGems] = useState([...gems]);
  const [thisGems, setThisGems] = useState([...gems]);
  const { setEachGemSetter } = usePlanters();

  // useEffect 사용할 필요가 없는 건 사용안해야.
  // *참고: https://beta.reactjs.org/learn/you-might-not-need-an-effect
  // if (thisGems != gems) {
  //   setThisGems(gems);
  // }
  useEffect(() => {
    // setEachGemSetter({ id: 0, func: setThisGems });
    // setter 함수 레퍼런스를 직접 넘겨주니 문제가 생겨서 배열이나 오브젝트에
    // 넣어줬습니다. 이유는 잘 모르겠습니다
    // setEachGemSetter(setThisGems);
    // if (thisGems != gems) {
    //   setThisGems([...gems]);
    // }
    setEachGemSetter([setThisGems]);
  }, []);

  useEffect(() => {
    console.log("Germinatys useEffect called");
    setThisGems(gems);
  }, [gems]);
  // }, [gems, thisGems]);

  return (
    <Flex direction="column" ml={3} align="center">
      {console.log("Germinatys rendered")}
      {console.log("thisGems is...")}
      {console.log(thisGems)}
      {thisGems.map((g) => (
        <Germinaty key={g.id} id={g.id} gems={thisGems} />
      ))}
      {/* <Germinaty key={g.id} id={g.id} gems={[ ...thisGems ]} /> */}
      {/* <Germinaty key={gem.id} id={gem.id} gems={thisGems} /> */}
    </Flex>
  );
};

Germinatys.whyDidYouRender = true;

export default React.memo(Germinatys);
