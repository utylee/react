import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, Flex } from "@chakra-ui/react";
import PullToRefresh from "react-simple-pull-to-refresh";
import Planter from "../../components/Planter";
import Germinaty from "../../components/Germinaty";

export default function Home() {
  const [statuses, setStatuses] = useState([]);
  const handleRefresh = async () => {
    console.log("handleRefresh");
    return 0;
  };

  useEffect(() => {
    setStatuses(["1", "2", "3"]);
  }, []);

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      justifyContent="center"
      pullingContent=""
    >
      <HStack w="full" align="center" justify="center" spacing={6}>
        {statuses.map((statuses, key) => (
          <Planter key={Math.random()} />
        ))}
      </HStack>

      <HStack>
        {/* 씨앗 발아 전용입니다 */}
        <Germinaty />
      </HStack>
      {/* <Planter /> */}
    </PullToRefresh>
  );
}
