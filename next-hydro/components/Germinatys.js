import React from "react";
import Germinaty from "./Germinaty";
import { Flex } from "@chakra-ui/react";
import useModal from "../context/useModal";

const Germinatys = ({ gems }) => {
  return (
    <>
      <Flex direction="column" ml={3} align="center">
        {/* <Flex justify='center'> */}
        {/* {gems.map((gem) => ( */}
        {/* {getGems().map((gem) => ( */}
        {/* <Germinaty key={Math.random()} gem={gem} /> */}
        {gems.map((gem) => (
          <Germinaty key={gem.id} gem={gem} />
        ))}
      </Flex>
    </>
  );
};

export default Germinatys;
