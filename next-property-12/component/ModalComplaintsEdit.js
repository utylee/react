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
const ModalComplaintsEdit = ({ occupant_id, complaints }) => {
  const refComplaint = useRef(undefined);
  const { setCurModalContent, setCurModalPosition } = useModal();
  const {
    updateOccupantDetails,
    updateProperty,
    fetchRoomDetails,
    fetchOccupantDetails,
    fetchProperty,
    curOccupantDetails,
    curRoom,
  } = useProperty();
  // curRoom이 component 프롭과 이름이 겹쳐서 이렇게 선언했는데
  // 일단 curRoom 프롭 전체를 사용하지는 않긴 합니다

  // const { curRoom: curProperty } = useContext(PropertyStateContext);

  // curRoom.pets,
  // curRoom.cars,
  // curRoom.defectiveness,
  // useEffect(() => {
  //   // setChecked([curProperty.pets, curProperty.cars, curProperty.defectiveness]);
  //   setArrayComplaints(curProperty.complaints);
  // }, [curProperty]);

  // useEffect(() => {
  //   fetchProperty(uid);
  // }, []);

  const [arrayComplaints, setArrayComplaints] = useState(complaints);
  const [checked, setChecked] = useState({});

  // occupantdetails를 fetch후 complaints array를 set해서 렌더해줍니다
  // useEffect(() => {
  //   let thisOccupant = {};
  //   const f = async () => {
  //     thisOccupant = await fetchOccupantDetails(occupant_id);
  //   };

  //   f();
  //   console.log("ModalComplaintsEdit::useEffect::fetchOccupantDetails ..");
  //   console.log(thisOccupant);

  //   console.log("ModalComplaintsEdit::useEffect::setArrayComplaints");
  //   if (typeof thisOccupant !== "undefined" && thisOccupant)
  //     setArrayComplaints(thisOccupant.complaints);
  //   // setArrayComplaints(thisOccupant["complaints"]);
  // }, []);

  // complaints 배열을 object 형태로 변환해줍니다
  useEffect(() => {
    console.log("ModalComplaintsEdit::useEffect::arrayComplaints changed..");
    console.log(arrayComplaints);

    if (typeof arrayComplaints !== "undefined") {
      let tempObj = {};
      for (let i = 0; i < arrayComplaints.length; i++) {
        Object.assign(tempObj, { [i]: arrayComplaints[i][1] });
      }
      // setChecked(tempObj);
      console.log("ModalComplaintsEdit::useEffect::setChecked done..");
      console.log("ModalComplaintsEdit::useEffect::checked(tempObj) is..");
      console.log(tempObj);
    }
    // }, []);
  }, [arrayComplaints]);

  const renderCheckboxes = () => {
    let result0 = [];
    console.log("ModalComplaintsEdit::renderCheckboxes()::came into");

    if (arrayComplaints) {
      console.log(
        "ModalComplaintsEdit::renderCheckboxes()::arrayComplaints size is.."
      );
      console.log(arrayComplaints.length);
      for (let i = 0; i < arrayComplaints.length; i++) {
        console.log("ModalComplaintsEdit::renderCheckboxes()::for {i} is..");
        console.log(i);
        result0.push(
          <>
            {/* isChecked={parseInt(checked[i]) ? true : false} */}
            <Checkbox
              colorScheme="yellow"
              mt={["0em"]}
              isChecked={parseInt(arrayComplaints[i][1]) ? true : false}
              onChange={(e) => {
                // let tempChecked = { ...checked };
                // tempChecked[i] = e.target.checked ? "1" : "0";
                // setChecked(tempChecked);

                let tempChecked = e.target.checked ? "1" : "0";

                let tempArrayComplaints = [...arrayComplaints];
                // tempArrayComplaints[i][1] = tempChecked[i];
                tempArrayComplaints[i][1] = tempChecked;
                setArrayComplaints(tempArrayComplaints);

                console.log(
                  "ModalComplaintsEdit::renderCheckboxes::for::<Checkbox>::onChange::checked tempArrayComplaints is.."
                );
                console.log(tempArrayComplaints);
                console.log(
                  "ModalComplaintsEdit::renderCheckboxes::for::<Checkbox>::onChange::checked arrayComplaints is.."
                );
                console.log(arrayComplaints);

                // setChecked([e.target.checked, checked[1], checked[2]]);
              }}
            >
              <Flex mt="-0.15em">
                <Text
                  fontSize={["sm", "md"]}
                  ml={["0.3em"]}
                  color={
                    parseInt(arrayComplaints[i][1]) ? "gray.500" : "gray.300"
                  }
                  isChecked={parseInt(arrayComplaints[i][1]) ? true : false}
                  textDecoration={
                    parseInt(arrayComplaints[i][1]) ? "line-through" : 0
                  }
                >
                  {arrayComplaints[i][0]}
                </Text>
              </Flex>
            </Checkbox>
          </>
        );
      }
    }

    return result0;

    // arrayComplaints.map((arr) => {
    //   <Checkbox
    //     colorScheme="cyan"
    //     mt={["0em"]}
    //     isChecked={checked[0]}
    //     onChange={(e) => setChecked([e.target.checked, checked[1], checked[2]])}
    //   >
    //     <Flex mt="-0.15em">
    //       <Icon as={FaPaw} ml={["0.3em"]} mt={["0.3em"]} color="green.500" />
    //       <Text ml={["0.3em"]} color="gray.300">
    //         반려동물 소유
    //       </Text>
    //     </Flex>
    //   </Checkbox>;
    // });

    // return (
    //   <>
    //     <Checkbox
    //       colorScheme="cyan"
    //       mt={["0em"]}
    //       isChecked={checked[0]}
    //       onChange={(e) =>
    //         setChecked([e.target.checked, checked[1], checked[2]])
    //       }
    //     >
    //       <Flex mt="-0.15em">
    //         <Icon as={FaPaw} ml={["0.3em"]} mt={["0.3em"]} color="green.500" />
    //         <Text ml={["0.3em"]} color="gray.300">
    //           반려동물 소유
    //         </Text>
    //       </Flex>
    //     </Checkbox>
    //   </>
    // );
  };

  const addNewComplaint = () => {
    const compl = refComplaint.current.value.trim();

    refComplaint.current.value = "";

    // 배열에 컴플레인을 추가하고 리렌더합니다
    //
    // 형식: [ { task: 'qasdfasdfdfdas...', flag: 1 }, { task: 'dfadfsf..', flag: 1 } ... ]
    // null 이 아닐 경우만 추가합니다
    // if (compl.length > 0) setArrayComplaints([...arrayComplaints, [compl, '0']]);
    console.log("ModalComplaintsEdit::addNewComplaint::arrayComplaints is...");
    console.log(arrayComplaints);
    if (compl.length > 0) {
      setArrayComplaints([[compl, "0"], ...arrayComplaints]);
      console.log(
        "ModalComplaintsEdit::addNewComplaint::added arrayComplaints is..."
      );
      console.log([[compl, "0"], ...arrayComplaints]);
    }
  };

  const updateComplaintsEdit = () => {
    // let { pets, cars, defectiveness, ...restRoom } = curProperty;
    //
    // jsx destructuing 중복 assign 방법입니다. 변수명이 같을 경우
    // a : aDescription
    let { complaints, ...restOccupant } = curOccupantDetails;
    let { has_issue, ...restRoom } = curRoom;
    let issue = 0;

    console.log(
      "ModalComplaintsEdit::updateComplaintsEdit::curOccupantDetails is..."
    );
    console.log(curOccupantDetails);
    console.log(
      "ModalComplaintsEdit::updateComplaintsEdit::restOccupant is..."
    );
    console.log(restOccupant);

    // bool형식을 int로 바로 넣으려니 오류가 나서 변환해주기로 합니다
    // pets: checked[0],
    // cars: checked[1],
    // defectiveness: checked[2],
    // let objProperty = {
    //   pets: checked[0] ? 1 : 0,
    //   cars: checked[1] ? 1 : 0,
    //   defectiveness: checked[2] ? 1 : 0,
    //   ...restRoom,
    // };

    // pets: checked[0],
    // cars: checked[1],
    // defectiveness: checked[2],
    let objOccupant = {
      complaints: arrayComplaints,
      ...restOccupant,
    };

    for (let i = 0; i < arrayComplaints.length; i++) {
      console.log("ModalComplaintsEdit::updateComplaintsEdit::for::0 or 1?..");
      console.log(arrayComplaints[i][1]);

      if (arrayComplaints[i][1] === "0") issue = 1;
    }

    let objRoom = {
      has_issue: issue,
      ...restRoom,
    };

    console.log("ModalComplaintsEdit::updateComplaintsEdit::objOccupant is...");
    console.log(objOccupant);

    console.log("ModalComplaintsEdit::updateOccupantDetails::objRoom is ..");
    console.log(objRoom);

    updateOccupantDetails(objOccupant);
    updateProperty(objRoom);
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
          {/* 체크박스파트입니다 */}
          <Flex
            ml={["2em", "4em"]}
            mb={["1.8em"]}
            direction="column"
            h="5.5em"
            position="relative"
          >
            {/* 체크박스컨텐츠부입니다 */}
            <Flex
              position="relative"
              zIndex={1}
              w="100%"
              h="100%"
              overflowY="scroll"
              direction="column"
              pb="0.8em"
            >
              {renderCheckboxes()}
            </Flex>

            {/* 하단 페이드아웃 오버레이입니다 */}
            <Flex
              position="absolute"
              w="100%"
              h="1em"
              bottom="0"
              zIndex={7}
              bgGradient="linear(to-t, rgba(46,55,72,0.8) 30%, rgba(255,255,255,0) 100%)"
            ></Flex>

            {/* <Checkbox */}
            {/*   colorScheme="cyan" */}
            {/*   mt={["0em"]} */}
            {/*   isChecked={checked[0]} */}
            {/*   onChange={(e) => */}
            {/*     setChecked([e.target.checked, checked[1], checked[2]]) */}
            {/*   } */}
            {/* > */}
            {/*   <Flex mt="-0.15em"> */}
            {/*     <Icon */}
            {/*       as={FaPaw} */}
            {/*       ml={["0.3em"]} */}
            {/*       mt={["0.3em"]} */}
            {/*       color="green.500" */}
            {/*     /> */}
            {/*     <Text ml={["0.3em"]} color="gray.300"> */}
            {/*       반려동물 소유 */}
            {/*     </Text> */}
            {/*   </Flex> */}
            {/* </Checkbox> */}
            {/* <Checkbox */}
            {/*   colorScheme="cyan" */}
            {/*   mt={["1em"]} */}
            {/*   isChecked={checked[1]} */}
            {/*   onChange={(e) => */}
            {/*     setChecked([checked[0], e.target.checked, checked[2]]) */}
            {/*   } */}
            {/* > */}
            {/*   <Flex mt="-0.15em"> */}
            {/*     <Icon */}
            {/*       as={FaCar} */}
            {/*       ml={["0.3em"]} */}
            {/*       mt={["0.3em"]} */}
            {/*       color="blue.500" */}
            {/*     /> */}
            {/*     <Text ml={["0.3em"]} color="gray.300"> */}
            {/*       차량 소유 */}
            {/*     </Text> */}
            {/*   </Flex> */}
            {/* </Checkbox> */}
            {/* <Checkbox */}
            {/*   colorScheme="cyan" */}
            {/*   mt={["1em"]} */}
            {/*   isChecked={checked[2]} */}
            {/*   onChange={(e) => */}
            {/*     setChecked([checked[0], checked[1], e.target.checked]) */}
            {/*   } */}
            {/* > */}
            {/*   <Flex mt="-0.15em"> */}
            {/*     <Icon */}
            {/*       as={ImAngry2} */}
            {/*       ml={["0.3em"]} */}
            {/*       mt={["0.3em"]} */}
            {/*       color="orange.500" */}
            {/*     /> */}
            {/*     <Text ml={["0.3em"]} color="gray.300"> */}
            {/*       악성 세입자 여부 */}
            {/*     </Text> */}
            {/*   </Flex> */}
            {/* </Checkbox> */}
          </Flex>

          {/* 컴플레인 추가 input 영역입니다 */}
          <Flex position="relative" w="100%">
            {/* +추가 버튼입니다 */}
            <Flex
              mt="0em"
              right="0.4em"
              position="absolute"
              borderColor="gray.500"
              borderWidth={1}
              bgColor="gray.600"
              rounded="sm"
              px="0.35em"
              py="0.1em"
              onClick={() => {
                addNewComplaint();
              }}
            >
              <Text color="gray.300" fontSize="0.7em">
                +추가
              </Text>
            </Flex>
            <Text ml={["0.5em"]} mt={["0.2em"]} color="gray.400" fontSize="xs">
              요청사항
            </Text>

            {/* placeholder={inputName} */}
            {/* defaultValue={inputName} */}
            <Input
              autoFocus
              ml={["0.5em", "0.5em"]}
              textAlign="start"
              w={["8.7em", "12em"]}
              autoFocus
              ref={refComplaint}
              onKeyDown={(e) => {
                if (e.key === "Enter") addNewComplaint();
              }}
              size="md"
              borderBottomWidth={1}
              borderColor="gray.500"
              rounded={0}
              variant="unstyled"
              textColor="gray.100"
              fontSize="sm"
            />
          </Flex>
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
              updateComplaintsEdit();

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
    </>
  );
};

export default ModalComplaintsEdit;
