import { VStack, HStack, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FileItem from "../components/FileItem";
import MyModal from "../components/MyModal";

export default function Home() {
  const [files, setFiles] = useState();
  const [myconfirm, setMyconfirm] = useState("");
  console.log("rendered!");

  useEffect(() => {
    console.log("index.js::useEffect");
    const getItems = async () => {
      console.log("came index.js::useEffect");
      const res = await fetch("/uploader/api/listjs");
      const js = await res.json();
      console.log(js);
      setFiles([...js]);
      // console.log("dddd");
      console.log("files:");
      console.log(files);
    };
    getItems();
  }, [myconfirm]);

  return (
    <>
      <VStack pt={"2em"}>
        {/* <Flex p={3} bg="gray.500" rounded="md"> */}
        {/*   핑두 */}
        {/* </Flex> */}
        {/* <FileItem />; */}
        {/* return <FileItem file={f} key={index} />; */}
        {files != null
          ? files.map((f, index) => {
              // console.log("indexs.js:map::" + f.filename);
              return <FileItem file={f} key={parseInt(f.timestamp)} />;
            })
          : 0}
      </VStack>
      <MyModal setMyconfirm={setMyconfirm} />
    </>
  );
}
