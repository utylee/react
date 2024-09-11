import { VStack, Icon, Img, Box, Flex } from "@chakra-ui/react";
import React from "react";
// 집 외곽 모양입니다
import { RiHome2Fill } from "react-icons/ri";

const ApartmentPage = ({}) => {
  return (
    <>
      <Flex w={["10em", "20em"]} position="relative">
        {/* <IconButton */}
        {/*   mr={["0em", "-2em"]} */}
        {/*   variant="ghost" */}
        {/*   fontSize="1.4em" */}
        {/*   icon={<MdCancel />} */}
        {/*   color="red.200" */}
        {/*   onClick={() => handleRemove()} */}
        {/*   _focus={{ boxShadow: "none", background: "none" }} */}
        {/* ></IconButton> */}
        <Flex w="100%" position="absolute" justifyContent="flex-end">
          <Flex
            borderWidth="0.2em"
            borderColor="gray.300"
            w="7em"
            h="7em"
            rounded="full"
            overflow="hidden"
          >
            <Img
              objectFit="cover"
              w="100%"
              h="100%"
              style={{ transform: "scale(1.1)" }}
              src="property/public/maxvill.png"
            />
          </Flex>
        </Flex>

        <Icon color="gray.600" as={RiHome2Fill} boxSize={["20em"]} mb="-3px" />
      </Flex>
    </>
  );
};

export default ApartmentPage;
