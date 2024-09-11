import React from "react";
import { Flex } from "@chakra-ui/react";
import ApartmentsPage from "./ApartmentsPage";
import MaxvillPage from "./MaxvillPage";
import DochonPage from "./DochonPage";
import FloorsPage from "./FloorsPage";

export const selectPage = (str_page) => {
  if (str_page == "apartments_page") {
    return <ApartmentsPage />;
  } else if (str_page == "maxvill_page") {
    // return <MaxvillPage />;
    return <FloorsPage apartment="maxvill" />;
  } else if (str_page == "dochon_page") {
    // return <DochonPage />;
    return <FloorsPage apartment="dochon" />;
  } else if (str_page == "floors_page") {
    return <FloorsPage />;
  } else {
    // console.log("came into empty page");
    return (
      <>
        <Flex>Empty Page</Flex>
      </>
    );
  }
};

const Pages = () => {};

export default Pages;
