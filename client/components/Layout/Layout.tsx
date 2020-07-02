import React, { FunctionComponent, useState } from "react";
import Nav from "./Nav";
import BottomBar from "./BottomBar";
import { PageWrapper } from "./PageWrapper";
import Menu from "./Menu";

interface ILayoutProps {
  isBottomBarDisabled?: boolean;
}

const Layout: FunctionComponent<ILayoutProps> = ({
  children,
  isBottomBarDisabled,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  return (
    <>
      <Menu
        isVisible={isMenuVisible}
        handleClose={() => setIsMenuVisible(false)}
      />
      <Nav />
      <PageWrapper>{children}</PageWrapper>
      {!isBottomBarDisabled && (
        <BottomBar openMenu={() => setIsMenuVisible(true)} />
      )}
    </>
  );
};

export default Layout;
