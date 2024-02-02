import React, { useEffect, useRef, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Flex,
  Stack,
  VStack,
  HStack,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import { FaHome, FaServer, FaYoutube, FaYoutubeSquare } from "react-icons/fa";
import useModal from "./useModal";
import useWS from "./useWS";
import useRefreshing from "./useRefreshing";
// import {
//   RefreshingStateContext,
//   RefreshingDispatchContext,
// } from "../contexts/RefreshingContext";

const MyModal = ({ setMyconfirm, setSocketConnected, ws }) => {
  const { openModal, isOpen, setIsOpen, closeModal, curFile } = useModal();

  const { checkConnection, forceReconnect, msg, send, setCallbackFunc } =
    useWS();

  const { getIndexRefreshingFunction } = useRefreshing();
  // const { refreshingFunc } = useContext(RefreshingStateContext);

  const inputRef = useRef(undefined);

  // useEffect(() => {
  //   console.log("MyModal::useEffect[msg]::came in::msg...");
  //   console.log(msg);

  //   if (msg === "processing" || msg === "finished") {
  //     console.log("MyModal::useEffect[msg]::set auth_status:...");
  //     console.log(msg);
  //     // auth_status.current = evt.data;
  //     // setAuth_status(msg);
  //   } else if (msg === "needRefresh") {
  //     console.log("needRefresh ws came");
  //     // setMyconfirm(Math.random());
  //     // getIndexRefreshingFunction(Math.random());
  //   }
  // }, [msg]);

  // autoFocus 를 사용하기에 문제해결도 못했겠다 제거해보았습니다
  // useEffect(() => {
  //   console.log("MyModal::useEffect");
  //   if (inputRef.current !== undefined && inputRef.current.value !== null) {
  //     console.log("MyModal::useEffect::focused");
  //     inputRef.current.focus();
  //   }
  // }, []);
  // }, [curFile.timestamp]);

  const handleDelete = async () => {
    const file = curFile.filename;
    console.log("MyModal::handleDelete::filename:...");
    console.log(file);

    if (!checkConnection()) {
      console.log("MyModal::handleDelete::connection lost::reconnecting...");
      console.log("MyModal::handleDelete::getIndexRefreshingFunction is...");
      // console.log(getIndexRefreshingFunction());
      // console.log(getIndexRefreshingFunction);
      console.log(getIndexRefreshingFunction());
      // console.log(refreshingFunc);
      // console.log("MyModal::handleDelete::callbackFunc::is...");
      // setCallbackFunc(getIndexRefreshingFunction());
      // if (refreshingFunc) {
      //   refreshingFunc(Math.random());
      // }
		  
      // if (getIndexRefreshingFunction()) {
      //   getIndexRefreshingFunction()(Math.random());
      // }
      forceReconnect();
    }

    /*
    if (ws.current.readyState == 3) {
      console.log(
        "MyModal::handleDelete::ws socket not connected so refreshing and reconnect"
      );

      // ws를 null로 할당하고 setSocketConnected 함수를 호출해서 소켓생성 useEffect를
      // 실행하게끔합니다
      ws.current.close();
      ws.current = null;
      setSocketConnected(false);
      // getIndexRefreshingFunction(Math.random());
      // setTimeout(getIndexRefreshingFunction(Math.random()), 8000);
    }
	*/
    // console.log("MyModal::handleDelete::getIndexRefreshingFunction::...");
    // console.log(getIndexRefreshingFunction);
    // console.log(refreshingFunc);
    // console.log("MyModal::handleDelete::getIndexRefreshingFunction()::...");
    // console.log(getIndexRefreshingFunction());

    const requestOptions = {
      method: "POST",
      header: { "Content-Type:": "application/json" },
      body: JSON.stringify({
        timestamp: curFile.timestamp,
        filename: curFile.filename,
      }),
    };
    // const res = await fetch("/uploader/api/updatejs", requestOptions);
    const res = await fetch("/youtube/api/deletejs", requestOptions);
    console.log("MyModal::handleDelete::fetch request sended");
    // console.log("response:" + JSON.stringify(res));
    // const js = await res.json();
    const txt = await res.text();
    console.log("MyModal::handleDelete::response:...");
    console.log(txt);

    // setMyconfirm(Math.random());

    // if (title !== curFile.title) {
    //   setMyconfirm(Math.random());
    // }
    //

    console.log("MyModal::handleDelete::refreshing!");
    getIndexRefreshingFunction()(Math.random());
    // refreshingFunc(Math.random());
    // setMyconfirm(Math.random())
    // setTimeout(getIndexRefreshingFunction(Math.random()), 4000);
    closeModal();
  };

  const handleConfirm = async () => {
    const title = inputRef.current.value.trim();
    console.log("handleConfirm::title:" + title);
    const requestOptions = {
      method: "POST",
      header: { "Content-Type:": "application/json" },
      body: JSON.stringify({ timestamp: curFile.timestamp, title: title }),
    };
    // const res = await fetch("/uploader/api/updatejs", requestOptions);
    const res = await fetch("/youtube/api/updatejs", requestOptions);
    // console.log("response:" + JSON.stringify(res));
    const js = await res.json();
    console.log("response:");
    console.log(js);
    if (title !== curFile.title) {
      // refreshingFunc(Math.random());
      getIndexRefreshingFunction()(Math.random());

      // setMyconfirm(Math.random());
      // getIndexRefreshingFunction(Math.random());
      // setMyconfirm(inputRef.current.value);
    }
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent maxW={["18em", "18em", "34em"]} bg="#2b2a33">
          <ModalCloseButton _focus={{ boxShadow: "None" }} />
          <VStack w="full" h="full" justify="center" alignItems="center">
            {/* 파일명입니다 */}
            <Flex
              mt={["1em", "1em", "3em"]}
              mb={["0.5em", "0.5em", "2em"]}
              px={["1em", "1em", "2em"]}
              fontSize="1.1em"
            >
              {curFile != null ? curFile.filename : "없음"}
            </Flex>
            {/* 인풋 영역입니다 */}
            <Flex mb={["0.5em", "0.5em", "3em"]}>
              <Input
                autoFocus="true"
                ref={inputRef}
                size="lg"
                w={["14em", "14em", "20em"]}
                placeholder={curFile.title}
                onKeyPress={(e) => {
                  e.key === "Enter" ? handleConfirm() : null;
                }}
              />
            </Flex>
            {/* 버튼 영역입니다 */}
            <HStack
              w="full"
              pt={["1em", "1em", "3em"]}
              pb={["1.5em", "1.5em", "3em"]}
              px={["0.2em", "0.2em", "2.2em"]}
              justify="space-between"
            >
              <HStack alignSelf="start" spacing={["0.1em", "0.1em", "0.5em"]}>
                <Button
                  color="gray.500"
                  variant="outline"
                  size={["xs", "xs", "sm"]}
                  alignSelf="start"
                  borderColor="gray.500"
                >
                  <Flex fontSize={["0.9em", "0.9em", "1em"]}>재전송</Flex>
                </Button>
                {/* colorScheme="red" */}
                {/* color="gray.500" */}
                {/* borderColor="gray.500" */}
                <Button
                  color="red.800"
                  borderColor="red.700"
                  variant="outline"
                  size={["xs", "xs", "sm"]}
                  alignSelf="start"
                  _hover={{
                    bg: "#770000",
                    color: "#CCCCCC",
                    borderColor: "#FF0000",
                  }}
                  onClick={() => handleDelete()}
                >
                  <Flex fontSize={["0.9em", "0.9em", "1em"]}>삭제</Flex>
                </Button>
              </HStack>
              <HStack alignSelf="end">
                <Button
                  leftIcon={<FaYoutube fontSize="1.5em" />}
                  colorScheme="red"
                  size={["sm", "sm", "lg"]}
                  alignSelf="end"
                  onClick={() => handleConfirm()}
                >
                  <Flex fontSize={["1.1em", "1.1em", "1em"]}>설정</Flex>
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  size={["sm", "sm", "lg"]}
                  alignSelf="end"
                  _hover={{ bg: "gray.400" }}
                  onClick={() => closeModal()}
                >
                  <Flex fontSize={["1.1em", "1.1em", "1em"]}>취소</Flex>
                </Button>
              </HStack>
            </HStack>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
