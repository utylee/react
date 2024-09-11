import { Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useContext, useState } from "react";
import ApartmentsPage from "../../component/ApartmentsPage.js";
import MaxvillPage from "../../component/MaxvillPage.js";
import {
  PropertyDispatchContext,
  PropertyStateContext,
} from "../../context/PropertyContext.js";
import useProperty from "../../context/useProperty.js";
import { selectPage } from "../../component/Pages.js";
import MyModal from "../../context/MyModal.js";

// 거주를 표시하는 등불모양 후보입니다
// import { MdOutlineLight } from "react-icons/md";
// <MdOutlineLight />
//

const Home = () => {
  const { setCurPage, getCurPage } = useProperty();

  const renderCurPage = () => {
    return selectPage(getCurPage());
  };

  useEffect(() => {
    setCurPage("apartments_page");
  }, []);

  return (
    <>
      <VStack>
        {renderCurPage()}
        {/* <ApartmentPage /> */}
        <MyModal />
      </VStack>
    </>
  );
};

export default Home;
