import React, { FunctionComponent, useState } from "react";
import Nav from "./Nav";
import BottomBar from "./BottomBar";
import { PageWrapper } from "./PageWrapper";
import Menu from "./Menu";

const Layout: FunctionComponent = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  return (
    <>
      <Menu
        isVisible={isMenuVisible}
        handleClose={() => setIsMenuVisible(false)}
      />
      <Nav />
      <PageWrapper>{children}</PageWrapper>
      <BottomBar openMenu={() => setIsMenuVisible(true)} />
    </>
  );
};

export default Layout;
