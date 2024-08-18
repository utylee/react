import usePrint from "../../../context/usePrint";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";

// export default function Test({ getPrints }) {
export default function Test() {
  const { printCur, setPrintCur } = usePrint();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  // const getPrints = async () => {
  //   console.log("test.js::getPrints rendered");
  //   const res = await fetch("/print/api/listjs");
  //   // const res = await fetch(`/api/listjs`);
  //   const prints = await res.json();
  //   // setPrintList(prints);
  //   prints = prints.reverse();
  //   console.log("test::getPrints::prints is::");
  //   console.log(prints);
  //   setPrintList(prints);
  //   // setPrintList(prints.reverse());
  //   // console.log(memoList);

  //   return prints;
  // };

  const backToIndex = async () => {
    setPrintCur({ uid: 0, text: "", clone: 3, time: 0, font_size: 10 });

    // const prints = await getPrints();

    // query: { name: "genius" },
    router.push({
      pathname: "/print",
    });
  };

  useEffect(() => {
    // colorMode = "light";
    // toggleColorMode();
    //
    // console.log("color mode is: ");
    // console.log(colorMode);
    //
    // document.body.addEventListener("click", () => router.push("/print"));
    // 표시부분이 아닌 페이지 전체의 클릭을 받기위해서는 body.를 지정해주지 않아야
    // 했습니다
    // document.addEventListener("click", () => router.push("/print"));

    // await getPrints();
    // window.document.readyState == whatever
    if (typeof window != "undefined" && window.document) {
      // do stuff
      setTimeout(() => window.print(), 5000);
    }
    // setTimeout(async () => backToIndex(), 8000);

    document.body.style.backgroundColor = "white";
    document.addEventListener("click", backToIndex);
    return function cleanup() {
      // window.removeEventListener("click", () => router.push("/print"));
      window.removeEventListener("click", backToIndex);
    };
  }, []);

  const loopResult = () => {
    console.log("test.js::came to loopResult");
    const result = [];
    for (let i = 0; i < printCur.clone; i++) {
      result.push(
        <Textarea
          readOnly
          fontSize={(printCur.font_size / 10).toString() + "em"}
          placeholder={printCur.text}
          value={printCur.text}
          row="10"
          height="10em"
          resize="none"
          borderWidth={0}
        />
      );
    }
    return result;
  };

  return (
    <>
      {/* {for(let i=0;i<printCur.clone;i++){console.log('')}} */}
      {/* <Flex color="#000000">{printCur.text}</Flex> */}
      {console.log("test.js::fontSize:")}
      {console.log((printCur.font_size / 10).toString() + "em")}
      <Flex
        w="100%"
        justifyContent="space-between"
        color="#000000"
        size="lg"
        height="18em"
      >
        {loopResult()}

        {/* <Textarea */}
        {/*   fontSize={(printCur.font_size / 10).toString() + "em"} */}
        {/*   placeholder={printCur.text} */}
        {/*   value={printCur.text} */}
        {/* /> */}
      </Flex>
      {/* {window.print()} */}
    </>
  );
}
