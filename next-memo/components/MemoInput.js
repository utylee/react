import React, { useRef } from "react";
import { Input, Flex as Box, HStack, IconButton } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";

const MemoInput = ({ getMemos }) => {
  // useState대신 useRef를 쓰는 것이 버튼리렌더링도 피하고 간편한 방법 같습니다
  // const [inputText, setInputText] = useState("");
  const inputRef = useRef(undefined);

  // 인풋에 키입력을 할때 마다 호출되는 함수입니다
  // const handleInputText = (e) => {
  //   console.log("handleInputText");
  //   setInputText(e.target.value);
  // };

  // 추가 버튼을 클릭할 경우 호출되는 함수입니다
  const handleAddClick = async () => {
    const text = inputRef.current.value.trim();
    // 아무입력값이 없으면 실행하지 않습니다
    if (!text) return;
    // const handleAddClick = async (text, setText) => {
    // console.log("Add Clicked");
    // const now = Math.round(Date.now() / 1000);
    const now = Date.now();
    const uid = Math.floor(Math.random() * 10000000);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ time: now, text: inputText.trim()"pink head", type: 0 }),
      body: JSON.stringify({
        uid: uid,
        time: now,
        text,
        type: 0,
      }),
      // text: inputRef.current.value.trim(),
      // text: inputText.trim(),
    };
    const res = await fetch("/memo/api/addjs", requestOptions);
    // const res = await fetch("/api/addjs", requestOptions);
    const test = await res.json();
    // console.log("addjs got messages: ", test);
    await getMemos();
    inputRef.current.value = "";
    // setInputText("");
  };

  // JSX
  return (
    <>
      {/* 전체 인풋 row */}
      <HStack
        w="full"
        maxW="25em"
        mx={3}
        py={4}
        px={4}
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="gray.700"
        spacing={6}
      >
        {/* <Input pr={80} variant="filled" placeholder="추가할 메모" rounded="full" /> */}
        <Input
          w="xs"
          backgroundColor="gray.700"
          variant="filled"
          ref={inputRef}
          placeholder="메모를 입력하세요"
          rounded="full"
          onKeyPress={(e) => {
            e.key === "Enter" ? handleAddClick() : null;
          }}
        />
        {/* onInput={handleInputText} */}
        {/* value={inputText} */}
        {/* onKeyPress={(e) => {(e.key === "Enter" ? handleAddClick : null)}} */}
        {/* onKeyDown={(e) => {(e.key === "Enter" ? console.log("fuck") : null)}} */}
        {/* onKeyDown={(e) => (e.key === "Enter" ? handleAddClick : null)} */}
        {/* onChange가 맞는지 onInput이 맞는지는 모르겠습니다 */}
        {/* onChange={handleInputText} */}
        <Box pr={2}>
          {/* <NoRenderButton getHandleClick={getHandleClick} /> */}
          <IconButton
            w="6em"
            aria-label="memo input"
            colorScheme="teal"
            icon={<BsPlusLg />}
            onClick={handleAddClick}
          />
        </Box>
      </HStack>
    </>
  );
};

export default MemoInput;
