// import { HStack, Box, IconButton, Input } from "@chakra-ui/layout";
import {
  Text,
  Textarea,
  HStack,
  VStack,
  Box,
  IconButton,
  Icon,
  Flex,
  Divider,
  Show,
  Hide,
} from "@chakra-ui/react";
// import { IoIosPrint } from "react-icons/io";
// import { PiPrinterLight } from "react-icons/pi";
// import { HiOutlinePrinter } from "react-icons/hi2";
// import { CgCopy } from "react-icons/cg";
// import { PiCopyLight } from "react-icons/pi";
// import { SlPrinter } from "react-icons/sl";
import { PiCopySimple } from "react-icons/pi";
// import { RxFontSize } from "react-icons/rx";
import { BiFontSize } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
// import { PiPrinter } from "react-icons/pi";
import { IoPrintOutline } from "react-icons/io5";
// import { PiPlus, PiMinus } from "react-icons/pi";
import { FaPlus, FaMinus } from "react-icons/fa6";

import React from "react";
// import { BsPlusLg } from "react-icons/bs";
// import Link from "next/link";
import usePrint from "../context/usePrint";
// import { useRouter } from "next/router";
import usePage from "../context/usePage";

const PrintInput = ({ getPrints }) => {
  // const router = useRouter();
  const { pageCur, setPageCur } = usePage();

  // const [inputValue, setInputValue] = useState("");
  const { printCur, setPrintCur } = usePrint();

  // const inputRef = useRef(undefined);
  // const inputValue = "";
  // const handleKeyDown = (e) => {
  //   const pressed = e.key;
  //   console.log("pressed:");
  //   console.log(pressed);
  //   if (pressed == "Enter") {
  //     console.log("came into enter");
  //     // setInputValue((inputValue) => inputValue + "\n");
  //     // return false;
  //   }
  // };

  const handleInputText = (e) => {
    const inputValue = e.target.value;
    // const inputValue = e.key;
    // console.log("inputValue:");
    // console.log(inputValue);
    // const keyCode = window.event.keyCode;
    // console.log("keyCode:");
    // console.log(keyCode);
    // if (keyCode == 13) inputValue = inputValue + "\n";
    // if (e.keyCode == 13) inputValue = inputValue + "\n";
    // setInputValue(() => inputValue + "\n");
    // setInputValue(inputValue);

    // setPrintCur({ text: (printCur ? printCur.txt : "") + inputValue });

    let { text, ...restCur } = printCur;
    setPrintCur({ ...restCur, text: inputValue });
    // setPrintCur({ text: e.target.value });
  };

  const handleClonePlus = () => {
    // console.log("org font_size is:");
    // console.log(printCur.font_size);
    if (printCur.clone < 10) {
      let { clone, ...rest } = printCur;
      setPrintCur({ ...rest, clone: printCur.clone + 1 });
    }
    // console.log("chgd clone is:");
    // console.log(printCur.clone);
  };
  const handleCloneMinus = () => {
    // console.log("org font_size is:");
    // console.log(printCur.font_size);
    if (printCur.clone > 1) {
      let { clone, ...rest } = printCur;
      setPrintCur({ ...rest, clone: printCur.clone - 1 });
    }
    // console.log("chgd clone is:");
    // console.log(printCur.clone);
  };

  const handleFontSizeUpClick = () => {
    // console.log("org font_size is:");
    // console.log(printCur.font_size);
    if (printCur.font_size < 50) {
      let { font_size, ...rest } = printCur;
      setPrintCur({ ...rest, font_size: printCur.font_size + 2 });
    }
    // console.log("chgd font_size is:");
    // console.log(printCur.font_size);
  };

  const handleFontSizeDownClick = () => {
    // console.log("org font_size is:");
    // console.log(printCur.font_size);
    if (printCur.font_size > 6) {
      let { font_size, ...rest } = printCur;
      setPrintCur({ ...rest, font_size: printCur.font_size - 2 });
    }
    // console.log("chgd font_size is:");
    // console.log(printCur.font_size);
  };

  //
  // 추가 버튼을 클릭할 경우 호출되는 함수입니다
  const handlePrintClick = async () => {
    // const text = inputRef.current.value.trim();
    const txt = printCur.text;
    // const text = inputValue;
    // 아무입력값이 없으면 실행하지 않습니다
    if (!txt) {
      console.log("PrintInput::printCur:text is None. Do nothing");
      return;
    }
    // const handleAddClick = async (text, setText) => {
    // console.log("Add Clicked");
    // const now = Math.round(Date.now() / 1000);
    const now = Date.now();
    // index.js 에서 초기에 설정해줍니다
    // const font_size = 10;
    const font_size = printCur.font_size;
    const uid = Math.floor(Math.random() * 10000000);

    setPrintCur({
      uid,
      font_size,
      text: txt,
      time: now,
      clone: printCur.clone,
    });
    // setPrintCur(3);
    // setPrint(3);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ time: now, text: inputText.trim()"pink head", type: 0 }),
      // font_size: font_size,
      body: JSON.stringify({
        uid: uid,
        font_size,
        text: txt,
        time: now,
        clone: printCur.clone,
      }),
    };
    const res = await fetch("/print/api/addjs", requestOptions);
    await getPrints();
    console.log("PrintInput.js::printCur is ");
    console.log(printCur);
    // inputRef.current.value = "";
    // setPrintCur({ text: "" });

    setPageCur("PagePrint");
    // router.push("/print/test/test");

    // router.push({
    //   pathname: "/print/test/test",
    //   query: { getPrints },
    // });

    // window.print();
  };

  return (
    <>
      {/* 전체 인풋 row */}
      {/* maxW="25em" */}
      {/* w="full" */}
      <HStack
        w={["100%", "100%", "25em"]}
        px={["1.5em", "4em", "0.5em"]}
        ml={["0em", "0em", "0em"]}
        pt={["2em", "1em"]}
        justifyContent="space-between"
        spacing={["2", "2", "2"]}
      >
        {/* <Show above="2280px"> */}
        {/* <Show breakpoint="(min-width: 1800px, max-width: 1900px)"> */}
        {/* <Show breakpoint="(min-width: 40em)"> */}
        {/* <Show breakpoint="(max-width: 80em)"> */}

        {/* 가로모드에서만 보이는 미리보기 영역입니다 */}
        {/* fontSize={(printCur.font_size / 10).toString() - 0.5 + "em"} */}
        <Flex
          display={["none", "flex", "none"]}
          w="12em"
          h="6em"
          mr="0.5em"
          overflow="hidden"
        >
          {/* size="8em" */}
          {/* h="4em" */}
          {/* fontSize={printCur.font_size} */}
          {/* rows={5} */}
          {/* cols={15} */}
          <Textarea
            placeholder="미리보기 영역"
            _placeholder={{ color: "gray.500" }}
            size="lg"
            cols="40"
            rows="10"
            fontSize={(printCur.font_size / 10 - 0.2).toString() + "em"}
            bgColor="gray.400"
            color="black"
            isDisabled
            value={printCur.text}
            justifyItemss="center"
          ></Textarea>
        </Flex>
        {/* 세로 세퍼레이터입니다 */}
        <Divider
          display={["none", "flex", "none"]}
          orientation="vertical"
          h="5em"
          borderColor="gray.600"
        />

        {/* borderBottomWidth={1} */}
        {/* borderBottomColor="gray.700" */}
        {/* spacing={6} */}
        {/* mx={3} */}
        {/* py={4} */}
        {/* px={4} */}
        {/* onChange={handleInputText} */}
        {/* onKeyDown={handleInputText} */}
        {/* value={printCur.text} */}
        {/* whiteSpace="pre-line" */}
        {/* onKeyDown={handleKeyDown} */}

        {/* 폰트 사이즈 조절부입니다 */}
        <VStack m={0} width="2em" alignItems="center" justifyContent="center">
          {/* 위 화살표 */}
          <Flex
            m={0}
            bgColor="gray.700"
            rounded="15%"
            justifyContent="center"
            alignItems="center"
          >
            {/* aria-label="print input" */}
            {/* <Icon fontSize="1em" color="black" as={RxFontSize} boxSize='1em' /> */}
            <IconButton
              size="2em"
              aria-label="print input"
              icon={<IoIosArrowUp fontSize="1.6em" />}
              colorScheme="gray"
              color="gray.400"
              onClick={handleFontSizeUpClick}
              variant="outline"
              borderColor="gray.600"
            />
            {/* <Icon color="gray.400" as={IoIosArrowUp} boxSize="1.7em" /> */}
          </Flex>

          {/* 폰트 아이콘 */}
          <VStack
            w="1.8em"
            h="1.8em"
            bgColor="gray.600"
            rounded="15%"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            overflow="hidden"
          >
            {/* w="1.8em" */}
            {/* h="1.8em" */}
            {/* aria-label="print input" */}
            {/* <Icon fontSize="1em" color="black" as={RxFontSize} boxSize='1em' /> */}
            {/* <Icon color="gray.700" as={BiFontSize} boxSize="1.4em" /> */}
            {/* {console.log("font_size in return:")} */}
            {/* {console.log((printCur.font_size / 10).toString() + "em")} */}

            {/* bgColor="red" */}
            <Icon
              color="gray.700"
              as={BiFontSize}
              boxSize={(printCur.font_size / 10).toString() + "em"}
            />
            {/* 폰트 사이즈 텍스트 출력부입니다 절대 포지션으로 중첩표시됩니다 */}
            {/* bgColor="yellow" */}
            <Flex position="absolute">
              <Text p={0} mt={5} fontSize="0.6em" color="gray.400">
                {printCur.font_size}
              </Text>
            </Flex>
          </VStack>

          {/* 아래화살표 */}
          <Flex
            bgColor="gray.700"
            rounded="15%"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              size="2em"
              aria-label="print input"
              icon={<IoIosArrowDown fontSize="1.6em" />}
              colorScheme="gray"
              color="gray.400"
              onClick={handleFontSizeDownClick}
              variant="outline"
              borderColor="gray.600"
            />
            {/* aria-label="print input" */}
            {/* <Icon fontSize="1em" color="black" as={RxFontSize} boxSize='1em' /> */}
          </Flex>
        </VStack>

        {/* 세로 세퍼레이터입니다 */}
        <Divider orientation="vertical" h="5em" borderColor="gray.600" />

        {/* 입력 textarea 란입니다 */}
        {/* mb="-1.2em" */}
        {/* size={["sm", "sm", "sm"]} */}
        <Textarea
          w={["8em", "9em", "10em"]}
          h={["6.5em", "6em", "7em"]}
          rows={5}
          value={printCur.text}
          onChange={handleInputText}
          placeholder={printCur.text}
          rounded="lg"
          borderColor="gray.500"
        ></Textarea>

        {/* 젤우측 컬럼 */}
        <VStack justifyContent="center" alignItems="center">
          {/* 프린트출력버튼입니다 */}
          {/* <Box pr={2}> */}
          <Box>
            {/* <NoRenderButton getHandleClick={getHandleClick} /> */}
            {/* icon={<BsPlusLg />} */}
            {/* icon={<SlPrinter size="1.4em" />} */}
            {/* icon={<PiPrinter size="1.4em" />} */}
            {/* size="lg" */}
            <IconButton
              w={["3.3em", "4em", "4.5em"]}
              h={["1.4em", "1.3em", "1.5em"]}
              color="gray.800"
              aria-label="print input"
              icon={<IoPrintOutline />}
              fontSize={["2em", "2.2em", "2em"]}
              colorScheme="teal"
              onClick={handlePrintClick}
            />
          </Box>

          {/* 세퍼레이터입니다 */}
          <Divider
            orientaion="horizontal"
            borderColor="gray.600"
            mb={["0.2em", "0em"]}
          />

          {/* 반복 횟수 조절부입니다 */}
          <HStack spacing={[1, 1.5]}>
            {/* 복사 횟수 마이너스버튼 입니다 */}
            {/* boxSize="2em" */}
            <Flex justifyContent="center" bgColor="gray.700" rounded="md">
              <IconButton
                variant="outline"
                size="sm"
                aria-label="print input"
                icon={<FaMinus size="1.0em" />}
                colorScheme="blue"
                onClick={handleCloneMinus}
                borderColor="blue.600"
              />
            </Flex>
            {/* 복사 중앙아이콘입니다 */}
            {/* rounded="10%" */}
            <HStack
              w={["2.6em", "4.0em"]}
              h="2.0em"
              alignItems="center"
              justifyContent="center"
              backgroundColor="blue.700"
              rounded="md"
              spacing={[0, 1]}
            >
              <Text fontSize={["1.2em", "1.5em"]} color="gray.300" mt="-1px">
                {printCur.clone}
              </Text>
              <Icon
                color="gray.400"
                as={PiCopySimple}
                boxSize={["0.9em", "1.0em"]}
                mb="-3px"
              />
            </HStack>
            {/* boxSize="2.0em" */}
            <Flex justifyContent="center" bgColor="gray.700" rounded="md">
              {/* <Flex> */}
              <IconButton
                variant="outline"
                size="sm"
                aria-label="clone plus"
                icon={<FaPlus size="1.0em" />}
                colorScheme="blue"
                onClick={handleClonePlus}
                borderColor="blue.600"
              />
            </Flex>
          </HStack>
        </VStack>

        {/* <Input pr={80} variant="filled" placeholder="추가할 메모" rounded="full" /> */}
        {/* <Input */}
        {/*   w="xs" */}
        {/*   backgroundColor="gray.700" */}
        {/*   color="gray.100" */}
        {/*   variant="filled" */}
        {/*   ref={inputRef} */}
        {/*   placeholder="메모를 입력하세요" */}
        {/*   rounded="full" */}
        {/*   onChange={handleInputText} */}
        {/* /> */}
        {/* {/1* onKeyPress={(e) => { *1/} */}
        {/* {/1* e.key === "Enter" ? handleAddClick() : null; *1/} */}
        {/* {/1* onInput={handleInputText} *1/} */}
        {/* {/1* value={inputText} *1/} */}
        {/* {/1* onKeyPress={(e) => {(e.key === "Enter" ? handleAddClick : null)}} *1/} */}
        {/* {/1* onKeyDown={(e) => {(e.key === "Enter" ? console.log("fuck") : null)}} *1/} */}
        {/* {/1* onKeyDown={(e) => (e.key === "Enter" ? handleAddClick : null)} *1/} */}
        {/* {/1* onChange가 맞는지 onInput이 맞는지는 모르겠습니다 *1/} */}
        {/* {/1* onChange={handleInputText} *1/} */}
        {/* {/1* <Link href="/print/test/test"> *1/} */}
        {/* <Box pr={2}> */}
        {/*   {/1* <NoRenderButton getHandleClick={getHandleClick} /> *1/} */}
        {/*   {/1* onClick={handleAddClick} *1/} */}
        {/*   <IconButton */}
        {/*     w="6em" */}
        {/*     aria-label="print input" */}
        {/*     colorScheme="teal" */}
        {/*     icon={<BsPlusLg />} */}
        {/*     onClick={handleAddClick} */}
        {/*   /> */}
        {/* </Box> */}
        {/* </Link> */}
      </HStack>
      {/* <Text>{printCur.text}</Text> */}
      {/* <Textarea isDisabled value={inputValue} size="lg"></Textarea> */}

      {/* 미리보기 바로위의 세퍼레이터입니다 */}
      <Divider
        my="0.5em"
        orientaion="horizontal"
        width={["80%", "23em"]}
        borderColor="blue.800"
      />
      {/* 미리보기 영역입니다 */}
      {/* <Hide breakpoint="(min-width: 60em)"> */}
      {/* <Hide breakpoint="(min-width:22rem) and (max-width:80rem)"> */}
      {/* <Hide breakpoint="(max-width: 63em)"> */}
      {/* h={(["8em"], ["10em"])} */}
      {/* h={(["8em"], ["10em"])} */}
      {/* fontSize={(printCur.font_size / 10).toString() + "em"} */}
      <Flex display={["flex", "none", "flex"]} w={["12em", "18em"]} h="6em">
        {/* size="8em" */}
        {/* h="4em" */}
        {/* fontSize={printCur.font_size} */}
        {/* rows={5} */}
        {/* cols={15} */}
        <Textarea
          placeholder="미리보기 영역"
          _placeholder={{ color: "gray.500" }}
          rows="10"
          cols="10"
          fontSize={(printCur.font_size / 10 + 0.3).toString() + "em"}
          bgColor="gray.400"
          color="black"
          isDisabled
          value={printCur.text}
          justifyItemss="center"
        ></Textarea>
      </Flex>

      {/* 미리보기 바로 아래의 세퍼레이터입니다 */}
      <Divider
        display={["flex", "none", "flex"]}
        mt="0.5em"
        mb="1em"
        orientaion="horizontal"
        width={["80%", "23em"]}
        borderColor="blue.800"
      />

      {/* <div>{inputValue}</div> */}
    </>
  );
};

export default PrintInput;
