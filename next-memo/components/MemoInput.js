import React, { useState } from "react";
import { Input, Flex as Box, HStack, IconButton } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";

const MemoInput = ({ inputText, setInputText, getMemos }) => {
  // 인풋에 키입력을 할때 마다 호출되는 함수입니다
  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  // 추가 버튼을 클릭할 경우 호출되는 함수입니다
  const handleClick = async () => {
    console.log("clicked");
    // const now = Math.round(Date.now() / 1000);
    const now = Date.now();
    console.log(now);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ time: now, text: inputText.trim()"pink head", type: 0 }),
      body: JSON.stringify({ time: now, text: inputText.trim(), type: 0 }),
    };

    const res = await fetch("/api/postjs", requestOptions);
    const test = await res.json();
    console.log(test);
    setInputText("");
    await getMemos();
  };

  // JSX
  return (
    <HStack
      w="full"
      maxW="400px"
      mx={3}
      py={4}
      px={4}
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      spacing={6}
    >
      {/* <Input pr={80} variant="filled" placeholder="추가할 메모" rounded="full" /> */}
      <Input
        w="xs"
        value={inputText}
        variant="filled"
        placeholder="메모를 입력하세요"
        rounded="full"
        onChange={handleInputText}
      />
      <Box pr={2}>
        <IconButton
          w="80px"
          aria-label="memo input"
          colorScheme="teal"
          icon={<BsPlusLg />}
          onClick={handleClick}
        />
      </Box>
    </HStack>
  );
};

export default MemoInput;
