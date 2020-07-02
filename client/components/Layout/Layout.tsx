import React, { FunctionComponent } from "react";
import Nav from "./Nav";
import BottomBar from "./BottomBar";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <BottomBar />
    </>
  );
};

export default Layout;
