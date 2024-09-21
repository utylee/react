import {
  VStack,
  Icon,
  Img,
  Box,
  Flex,
  HStack,
  Divider,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
// 집 외곽 모양입니다
import { RiHome2Fill } from "react-icons/ri";
// alert 경고 아이콘입니다
import { GoAlert } from "react-icons/go";
//<GoAlert />

import {
  PropertyDispatchContext,
  PropertyStateContext,
} from "../context/PropertyContext";
import useProperty from "../context/useProperty";

const ApartmentsPage = ({}) => {
  // const { fetchAll } = useContext(PropertyDispatchContext);
  const { setCurPage, fetchAll, getFullProperties } = useProperty();
  const [fullFloors, setFullFloors] = useState([]);
  // const fullProperties = getFullProperties();
  const { fullProperties } = useContext(PropertyStateContext);

  const floors = [];

  const makeFloors = () => {
    let fullProperties = getFullProperties();
    console.log("ApartmentPage::makeFloors::fullProperties:");
    console.log(fullProperties);
    setFullFloors(fullProperties);

    // let maxvill_floor2 = [],
    //   maxvill_floor3 = [],
    //   maxvill_floor4 = [],
    //   dochon_floor1 = [],
    //   dochon_floor2 = [],
    //   dochon_floor3 = [],
    //   dochon_floor4 = [];
    // fullProperties.map((p) => {
    //   if (p.apartment == "maxvill" && p.floor == 2) {
    //     maxvill_floor2 = [...maxvill_floor2, p];
    //   } else if (p.apartment == "maxvill" && p.floor == 3) {
    //     maxvill_floor3 = [...maxvill_floor3, p];
    //   } else if (p.apartment == "maxvill" && p.floor == 4) {
    //     maxvill_floor4 = [...maxvill_floor4, p];
    //   } else if (p.apartment == "dochon" && p.floor == 1) {
    //     dochon_floor1 = [...dochon_floor1, p];
    //   } else if (p.apartment == "dochon" && p.floor == 2) {
    //     dochon_floor2 = [...dochon_floor2, p];
    //   } else if (p.apartment == "dochon" && p.floor == 3) {
    //     dochon_floor3 = [...dochon_floor3, p];
    //   } else if (p.apartment == "dochon" && p.floor == 4) {
    //     dochon_floor4 = [...dochon_floor4, p];
    //   }
    // });

    // setFullFloors({
    //   maxvill: [
    //     sortFloor(maxvill_floor2),
    //     sortFloor(maxvill_floor3),
    //     sortFloor(maxvill_floor4),
    //   ],
    //   dochon: [
    //     sortFloor(dochon_floor1),
    //     sortFloor(dochon_floor2),
    //     sortFloor(dochon_floor3),
    //     sortFloor(dochon_floor4),
    //   ],
    // });
    console.log("ApartmentsPage::makeFloors::fullFloors:...");
    console.log(fullFloors);
  };

  const sortFloor = (floor) => {
    console.log("ApartmentsPage::sortFloor:: before map");
    floor.sort((a, b) => {
      return a.room_no - b.room_no;
    });
    return floor;
  };

  // const sortFloor = (floors) => {
  //   console.log("ApartmentsPage::sortFloor:: before map");
  //   floors.map((floor) => {
  //     floor.sort((a, b) => {
  //       return a.room_no - b.room_no;
  //     });
  //   });
  // };

  // useEffect(() => sortFloor(fullFloors), [fullFloors]);

  useEffect(() => {
    makeFloors();
    // }, [getFullProperties()]);
  }, [fullProperties]);

  useEffect(() => {
    const f = async () => {
      console.log("ApartmentsPage::useEffect::f()::before fetchAll");
      await fetchAll();
    };
    f();
    makeFloors();
  }, []);

  return (
    <>
      {/* 맥스빌*/}
      <Flex
        w={["20rem", "23rem"]}
        position="relative"
        px="0.2rem"
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          setCurPage("richvill_page");
          // setCurPage("maxvill_page");
          // setCurPage("floors_page");
        }}
      >
        <Flex
          pr={["1.3rem", "1rem"]}
          w="100%"
          position="absolute"
          justifyContent="flex-end"
          zIndex="5"
        >
          {/* 원형 이미지 박스입니다 */}
          <Flex
            borderWidth="0.2em"
            borderColor="gray.300"
            w={["7.3em", "7em"]}
            h={["7.3em", "7em"]}
            rounded="full"
            overflow="hidden"
          >
            {/* 맥스빌 이미지입니다 */}
            {/* src="property/public/maxvill.png" */}
            {/* style={{ transform: "scale(1.1)" }} */}
            {/* objectFit="cover" */}
            <Img
            objectFit="cover"
              w="100%"
              h="100%"
              style={{ transform: "scale(1.1)" }}
              src="property/public/richvill.png"
            />
          </Flex>
        </Flex>

        <Flex
          w="100%"
          flexDirection="row"
          position="relative"
          zIndex="1"
          justifyContent="center"
        >
          {/* 건물 프레임 대형 아이콘 입니다 */}
          <Icon
            color="gray.600"
            as={RiHome2Fill}
            boxSize={["100%"]}
            mb="-3px"
          />

          {/* bgColor="yellow" */}
          {/* floor 별 room 배열입니다 */}
          <Flex
            w="70%"
            mt={["-4rem", "-4.5em"]}
            h="100%"
            direction="column"
            position="absolute"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* 맥스빌4층 */}
            {(() => {
              // if (fullFloors.maxvill[2] !== undefined) {
              // if (fullFloors.maxvill !== undefined) {
              if (fullFloors.richvill !== undefined) {
                console.log("rendering floors [2]::if");
                console.log("  fullFloors [2]::");
                // console.log(fullFloors[2]);
                // return <Floor floors={fullFloors.maxvill[2]} />;
                return <Floor floors={fullFloors.richvill[2]} />;
              }
            })()}
            <Divider borderColor="gray.500" width="60%" my="3" />
            {/* 맥스빌3층 */}
            {(() => {
              // if (fullFloors.maxvill[1] !== undefined) {
              // if (fullFloors.maxvill !== undefined) {
              if (fullFloors.richvill !== undefined) {
                console.log("rendering floors [1]::if");
                console.log("  fullFloors [1]::");
                // console.log(fullFloors[1]);
                // return <Floor floors={fullFloors.maxvill[1]} />;
                return <Floor floors={fullFloors.richvill[1]} />;
              }
            })()}
            <Divider borderColor="gray.500" width="60%" my="3" />
            {/* 맥스빌2층 */}
            {(() => {
              // if (fullFloors.maxvill[0] !== undefined) {
              // if (fullFloors.maxvill !== undefined) {
              if (fullFloors.richvill !== undefined) {
                console.log("rendering floors [0]::if");
                console.log("  fullFloors [0]::");
                // console.log(fullFloors[0]);
                // return <Floor floors={fullFloors.maxvill[0]} />;
                return <Floor floors={fullFloors.richvill[0]} />;
              }
            })()}
          </Flex>
        </Flex>
      </Flex>

      {/* 도촌동 */}
      <Flex
        w={["20rem", "23rem"]}
        position="relative"
        px="0.2rem"
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          setCurPage("dochon_page");
        }}
      >
        <Flex
          pr={["1.3rem", "1rem"]}
          w="100%"
          position="absolute"
          justifyContent="flex-end"
          zIndex="5"
        >
          <Flex
            borderWidth="0.2em"
            borderColor="gray.300"
            w={["7.3em", "7em"]}
            h={["7.3em", "7em"]}
            rounded="full"
            overflow="hidden"
          >
            {/* 도촌동 건물사진입니다 */}
            <Img
              objectFit="cover"
              w="100%"
              h="100%"
              style={{ transform: "scale(1.1)" }}
              src="property/public/dochon.png"
            />
          </Flex>
        </Flex>

        {/* 건물 프레임 대형 아이콘 입니다 */}
        <Flex
          w="100%"
          flexDirection="row"
          position="relative"
          zIndex="1"
          justifyContent="center"
        >
          <Icon
            color="gray.600"
            as={RiHome2Fill}
            boxSize={["100%"]}
            mb="-3px"
          />
          {/* bgColor="yellow" */}
          {/* floor 별 room 배열입니다 */}
          <Flex
            w="70%"
            mt={["-4rem", "-4.5em"]}
            h="100%"
            direction="column"
            position="absolute"
            justifyContent="flex-end"
            alignItems="center"
          >
            {/* 도촌동4층 */}
            {(() => {
              // if (fullFloors.dochon[2] !== undefined) {
              if (fullFloors.dochon !== undefined) {
                console.log("rendering floors [2]::if");
                console.log("  fullFloors [2]::");
                // console.log(fullFloors[2]);
                return <Floor floors={fullFloors.dochon[3]} />;
              }
            })()}
            <Divider borderColor="gray.500" width="60%" my="3" />
            {/* 도촌동3층 */}
            {(() => {
              // if (fullFloors.dochon[2] !== undefined) {
              if (fullFloors.dochon !== undefined) {
                console.log("rendering floors [2]::if");
                console.log("  fullFloors [2]::");
                // console.log(fullFloors[2]);
                return <Floor floors={fullFloors.dochon[2]} />;
              }
            })()}
            <Divider borderColor="gray.500" width="60%" my="3" />
            {/* 도촌동2층 */}
            {(() => {
              // if (fullFloors[1] !== undefined) {
              if (fullFloors.dochon !== undefined) {
                console.log("rendering floors [1]::if");
                console.log("  fullFloors [1]::");
                // console.log(fullFloors[1]);

                return <Floor floors={fullFloors.dochon[1]} />;
              }
            })()}
            <Divider borderColor="gray.500" width="60%" my="3" />
            {/* 도촌동1층 */}
            {(() => {
              // if (fullFloors[0] !== undefined) {
              if (fullFloors.dochon !== undefined) {
                console.log("rendering floors [0]::if");
                console.log("  fullFloors [0]::");
                // console.log(fullFloors[0]);
                return <Floor floors={fullFloors.dochon[0]} />;
              }
            })()}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

// const Floor = ({ rooms }) => {
const Floor = ({ floors }) => {
  return (
    <>
      {/* 각 floor 입니다 */}
      {/* mb="1em" */}
      {/* <Flex mb="1em" mx="2em" wrap="wrap"> */}
      <Flex w="70%" mx="2em" justifyContent="space-around">
        {/* backgroundColor={room.occupant_id > 0 ? "gray.700" : "pink.600"} */}
        {floors.map((room, key) => {
          return (
            // 각 room 입니다
            <Flex
              key={key}
              w={["1.4em", "1.4em"]}
              h={["1.4em", "1.4em"]}
              position="relative"
              justifyContent="center"
              alignItems="center"
            >
              <Flex
                key={key}
                w={["1.4em", "1.4em"]}
                h={["1.4em", "1.4em"]}
                backgroundColor={
                  room.occupant_id > 0
                    ? room.non_pay_continues > 0
                      ? "pink.600"
                      : "yellow.400"
                    : "gray.700"
                }
                borderColor={room.occupant_id > 0 ? "yellow.400" : "gray.700"}
                borderWidth={[2, 3]}
                rounded="md"
              ></Flex>
              {/* {/1* mb="-3px" *1/} */}
              {/* <Flex */}
              {/*   display={room.non_pay_continues > 0 ? "flex" : "none"} */}
              {/*   position="absolute" */}
              {/* > */}
              {/*   <Icon color="red.600" as={GoAlert} boxSize={["140%"]} /> */}
              {/* </Flex> */}
            </Flex>
          );
        })}

        {/* {(() => { */}
        {/*   const rows = []; */}

        {/*   for (let i = 0; i < rooms; i++) { */}
        {/*     // mr="3" */}
        {/*     rows.push( */}
        {/*       <Flex */}
        {/*         w={["1.3em", "1.4em"]} */}
        {/*         h={["1.3em", "1.4em"]} */}
        {/*         backgroundColor="gray.700" */}
        {/*         rounded="md" */}
        {/*       ></Flex> */}
        {/*     ); */}
        {/*   } */}

        {/*   return rows; */}
        {/* })()} */}
      </Flex>
    </>
  );
};

export default ApartmentsPage;
