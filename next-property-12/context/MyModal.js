import React, { useContext } from "react";
import useModal from "./useModal";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  ModalBody,
  Link,
} from "@chakra-ui/react";
import { PropertyStateContext } from "./PropertyContext";
import ModalFullInfo from "../component/ModalFullInfo";
import ModalPhoneContact from "../component/ModalPhoneContact";
import ModalEdit from "../component/ModalEdit";
import ModalNameSexEdit from "../component/ModalNameSexEdit";
import ModalPhoneEdit from "../component/ModalPhoneEdit";
import ModalSpecialtyEdit from "../component/ModalSpecialtyEdit";
import ModalComplaintsEdit from "../component/ModalComplaintsEdit";
import useProperty from "./useProperty";

const MyModal = () => {
  const { closeModal, curRoom, curModalContent, isOpen } = useModal();
  const { curRoomDetails, curOccupantDetails } =
    useContext(PropertyStateContext);

  const { fetchOccupantDetails, fetchRoomDetails } = useProperty();

  // 모달 컨텐츠를 선택합니다
  const renderModalContent = () => {
    if (typeof curModalContent !== "undefined" && curModalContent == "full") {
      // return <ModalFullInfo curRoom={curRoom} />;
      return (
        <>
          <ModalFullInfo
            uid={curRoom.uid}
            apartment={curRoom.apartment}
            room_no={curRoom.room_no}
            occupant_id={curRoom.occupant_id}
          />
        </>
      );
    } else if (
      typeof curModalContent !== "undefined" &&
      curModalContent == "phone"
    ) {
      return (
        <>
          <ModalPhoneContact
            room_no={curRoom.room_no}
            name={curRoomDetails.occupant_name}
            phone={curOccupantDetails.phone}
          />
        </>
      );
    } else if (
      typeof curModalContent !== "undefined" &&
      curModalContent == "edit"
    ) {
      // return <ModalEdit curRoom={curRoom} />;
      // return <ModalEdit uid={curRoom.uid} />;
      return (
        <ModalEdit
          uid={curRoom.uid}
          apartment={curRoom.apartment}
          room_no={curRoom.room_no}
          occupant_id={curRoom.occupant_id}
        />
      );
    } else if (
      typeof curModalContent !== "undefined" &&
      curModalContent == "namesex_edit"
    ) {
      return <ModalNameSexEdit curRoom={curRoom} />;
    } else if (
      typeof curModalContent !== "undefined" &&
      curModalContent == "phone_edit"
    ) {
      return <ModalPhoneEdit curRoom={curRoom} />;
    } else if (
      typeof curModalContent !== "undefined" &&
      curModalContent == "specialty_edit"
    ) {
      // return <ModalSpecialtyEdit curRoom={curRoom} />;
      return <ModalSpecialtyEdit uid={curRoom.uid} />;
    } else if (
      typeof curModalContent !== "undefined" &&
      curModalContent == "complaints_edit"
    ) {

      console.log(
        "MyModal::renderModalContent::complaints_edit::complaints is.."
      );
      console.log(curOccupantDetails.complaints);
      return (
        <ModalComplaintsEdit
          occupant_id={curRoom.occupant_id}
          complaints={curOccupantDetails.complaints}
        />
      );
    }
  };

  return (
    <Modal
      blockScrollOnMount={false}
      overflowY="auto"
      isOpen={isOpen}
      onClose={closeModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        rounded="xl"
        maxW={["17em", "28em"]}
        maxH={["29em", "35em"]}
        bg="gray.700"
      >
        <ModalCloseButton _focus={{ boxShadow: "none" }} color="gray.300" />
        <ModalBody
          mt="3em"
          mb="1em"
          w="100%"
          px={0}
          overflowX="hidden"
          overflowY="auto"
        >
          {renderModalContent()}
        </ModalBody>

        {/* 하단 페이드아웃 오버레이입니다 */}
        <Flex
          w="100%"
          h="0.8em"
          position="absolute"
          bottom="0.9em"
          bgGradient="linear(to-t, rgba(46,55,72,0.8) 5%, rgba(255,255,255,0) 90%)"
        ></Flex>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
