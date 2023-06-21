import { VStack, HStack, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FileItem from "../components/FileItem";

export default function Home() {
  const [files, setFiles] = useState();
  console.log("rendered!");

  useEffect(() => {
    const getItems = async () => {
      console.log("came here");
      const res = await fetch("/uploader/api/listjs");
      const js = await res.json();
      console.log(js);
      setFiles([...js]);
      // console.log("dddd");
      console.log("files:");
      console.log(files);
    };
    getItems();
  }, []);

  return (
    <>
      <VStack pt={"2em"}>
        {/* <Flex p={3} bg="gray.500" rounded="md"> */}
        {/*   핑두 */}
        {/* </Flex> */}
        {/* <FileItem />; */}
        {files != null
          ? files.map((f, index) => {
              console.log(f.filename);
              return <FileItem file={f} key={index}/>;
            })
          : 0}
      </VStack>
    </>
  );
}
