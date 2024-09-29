import {
  Icon,
  Stack,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Text,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import useModal from "../context/useModal";
import useProperty from "../context/useProperty";
import { IoIosPaw } from "react-icons/io";
import { FaCar, FaPaw } from "react-icons/fa6";
import { ImAngry2 } from "react-icons/im";
import { PropertyStateContext } from "../context/PropertyContext";

// const ModalSpecialtyEdit = ({ curRoom }) => {
const ModalSpecialtyEdit = ({ uid }) => {
  const { setCurModalContent, setCurModalPosition } = useModal();
  const {
    updateOccupantDetails,
    updateProperty,
    fetchRoomDetails,
    fetchOccupantDetails,
    fetchProperty,
    curOccupantDetails,
    curRoom: curProperty,
  } = useProperty();

  // const { curRoom: curProperty } = useContext(PropertyStateContext);

  // curRoom.pets,
  // curRoom.cars,
  // curRoom.defectiveness,
  // const [checked, setChecked] = useState([
  //   curProperty.pets,
  //   curProperty.cars,
  //   curProperty.defectiveness,
  // ]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    // setChecked(() => [
    //   curProperty.pets,
    //   curProperty.cars,
    //   curProperty.defectiveness,
    // ]);
    setChecked([curProperty.pets, curProperty.cars, curProperty.defectiveness]);
  }, [curProperty]);

  useEffect(() => {
    fetchProperty(uid);
    console.log("ModalSpecialtyEdit::useEffect::came in..");
  }, []);

  const updateSpecialtyEdit = () => {
    // let { pets, cars, defectiveness, ...restRoom } = curRoom;
    let { pets, cars, defectiveness, ...restRoom } = curProperty;
    //
    // jsx destructuing 중복 assign 방법입니다. 변수명이 같을 경우
    // a : aDescription
    let {
      pets: petsOccupant,
      cars: carsOccupant,
      defectiveness: defectivenessOccupant,
      ...restOccupant
    } = curOccupantDetails;

    // pets: checked[0],
    // cars: checked[1],
    // defectiveness: checked[2],
    let objProperty = {
      pets: checked[0] ? 1 : 0,
      cars: checked[1] ? 1 : 0,
      defectiveness: checked[2] ? 1 : 0,

      ...restRoom,
    };

    // pets: checked[0],
    // cars: checked[1],
    // defectiveness: checked[2],
    let objOccupant = {
      pets: checked[0] ? 1 : 0,
      cars: checked[1] ? 1 : 0,
      defectiveness: checked[2] ? 1 : 0,

      ...restOccupant,
    };
    // deposit_history: curRoomDetails.deposit_history,
    console.log("ModalSpecialtyEdit::updateProperty::objProperty is ..");
    console.log(objProperty);
    updateProperty(objProperty);

    console.log("ModalSpecialtyEdit::updateOccupantDetails::objOccupant is ..");
    console.log(objOccupant);
    updateOccupantDetails(objOccupant);
  };

  return (
    <>
      <Flex direction="column" w="100%" alignItems="center" overflowY="auto">
        {/* <Flex>{curRoomDetails.occupant_name}</Flex> */}

        {/* alignItems="center" */}
        {/* 테투리 선입니다 */}
        <Flex
          py="1.5em"
          mb="1.5em"
          rounded="lg"
          borderWidth={1}
          borderColor="gray.600"
          direction="column"
          w={["14.5em", "18em"]}
          justifySelf="center"
        >
          <Flex ml={["2em", "4em"]} direction="column" mb={["2.5em"]}>
            <Checkbox
              colorScheme="cyan"
              mt={["1em"]}
              isChecked={checked[0]}
              onChange={(e) =>
                setChecked([e.target.checked, checked[1], checked[2]])
              }
            >
              <Flex mt="-0.15em">
                <Icon
                  as={FaPaw}
                  ml={["0.3em"]}
                  mt={["0.3em"]}
                  color="green.500"
                />
                <Text ml={["0.3em"]} color="gray.300">
                  반려동물 소유
                </Text>
              </Flex>
            </Checkbox>
            <Checkbox
              colorScheme="cyan"
              mt={["1em"]}
              isChecked={checked[1]}
              onChange={(e) =>
                setChecked([checked[0], e.target.checked, checked[2]])
              }
            >
              <Flex mt="-0.15em">
                <Icon
                  as={FaCar}
                  ml={["0.3em"]}
                  mt={["0.3em"]}
                  color="blue.500"
                />
                <Text ml={["0.3em"]} color="gray.300">
                  차량 소유
                </Text>
              </Flex>
            </Checkbox>
            <Checkbox
              colorScheme="cyan"
              mt={["1em"]}
              isChecked={checked[2]}
              onChange={(e) =>
                setChecked([checked[0], checked[1], e.target.checked])
              }
            >
              <Flex mt="-0.15em">
                <Icon
                  as={ImAngry2}
                  ml={["0.3em"]}
                  mt={["0.3em"]}
                  color="orange.500"
                />
                <Text ml={["0.3em"]} color="gray.300">
                  악성 세입자 여부
                </Text>
              </Flex>
            </Checkbox>
          </Flex>

          {/* 수정완료 및 취소 버튼 */}
          <Flex mb="0.4em" justifyContent="center">
            <Flex
              w="5.2em"
              h="2.2em"
              bgColor="gray.600"
              borderWidth={1}
              borderColor="gray.500"
              rounded="md"
              alignItems="center"
              justifyContent="center"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                // 변경점을 반영합니다
                // console.log("pet is...");
                // console.log(newpet);
                // console.log("car is...");
                // console.log(newsex);
                // console.log("defectiveness is...");
                // console.log(newage);

                // api에 수정된 정보를 전송해줍니다
                updateSpecialtyEdit();

                // 모달페이지를 설정해줍니다
                setCurModalPosition("namesex");
                setCurModalContent("edit");
              }}
            >
              <Text color="gray.300" fontSize="1.05em">
                완료
              </Text>
            </Flex>

            {/* bgColor="gray.600" */}
            <Flex
              w="5.2em"
              h="2.2em"
              ml="1.7em"
              borderWidth={1}
              borderColor="gray.500"
              rounded="md"
              alignItems="center"
              justifyContent="center"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                setCurModalContent("edit");
              }}
            >
              <Text color="gray.300" fontSize="1.05em">
                취소
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ModalSpecialtyEdit;
