import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, Flex } from "@chakra-ui/react";
import PullToRefresh from "react-simple-pull-to-refresh";
import Planter from "../../components/Planter";
import Germinaty from "../../components/Germinaty";

export default function Home() {
  const [statuses, setStatuses] = useState([]);
  const [gems, setGems] = useState([]);
  const handleRefresh = async () => {
    console.log("handleRefresh");
    return 0;
  };

  useEffect(() => {
    setStatuses(["1", "2", "3", "4", "5", "6", "7"]);
    setGems(["1", "2", "3"]);
  }, []);

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      justifyContent="center"
      pullingContent=""
    >
      {/* <Flex direction='column' mt={8} spacing={8} align="flex-start" justify="center"> */}
      <Flex direction="column" mt={8} spacing={8} justify="center">
        {/* <HStack w="full" align="center" justify="center" spacing='6em'> */}
        {/* <HStack w="full" align="space-between" justify="center" spacing='6em'> */}
        {/* <HStack w="full" align="center" ml='1em' justify="space-between" > */}
        {/* <HStack w="full" align="center" m='3em' justify="space-between" > */}
        <HStack align="center" mx="6em" justify="space-between">
          {statuses.map((status) => (
            <Planter key={Math.random()} />
          ))}
        </HStack>

        <Flex direction='column' pl="3em" mt="3em" align="flex-start">
          {/* <Flex justify='center'> */}
          {/* 씨앗 발아 전용입니다 */}
          {gems.map((gem) => (
            <Germinaty key={Math.random()} />
          ))}
        </Flex>
        {/* <Planter /> */}
      </Flex>
    </PullToRefresh>
  );
}
