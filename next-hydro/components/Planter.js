import React, { useState } from "react";
import { Flex, VStack } from "@chakra-ui/react";

const Planter = () => {
  const [water, setWater] = useState();
  const [kind, setKind] = useState();
  const [individual, setIndividual] = useState();
  const [waterdate, setWaterDate] = useState();
  return (
    <>
      {/* <Flex direction="column"> */}
      {/* <Flex direction="column" p={3} border="1px" borderRadius="lg"> */}
      <Flex direction="column" p={3} bg='teal.100' minW='3em' borderRadius="lg">
        <span>하하하하</span>
        <span>천천</span>
      </Flex>
    </>
  );
};

export default Planter;
