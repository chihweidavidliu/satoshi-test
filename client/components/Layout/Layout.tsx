import React, { FunctionComponent } from "react";
import Nav from "./Nav";
import BottomBar from "./BottomBar";
import { PageWrapper } from "./PageWrapper";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Nav />
      <PageWrapper>{children}</PageWrapper>
      <BottomBar />
    </>
  );
};

export default Layout;
