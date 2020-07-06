import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import BottomBar from "./BottomBar";
import { PageWrapper } from "./PageWrapper";
import Menu from "./Menu";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

interface ILayoutProps {
  isBottomBarDisabled?: boolean;
  isContentCenteringDisabled?: boolean;
}

const Layout: FunctionComponent<ILayoutProps> = ({
  children,
  isBottomBarDisabled,
  isContentCenteringDisabled,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  return (
    <AppWrapper>
      <Menu
        isVisible={isMenuVisible}
        handleClose={() => setIsMenuVisible(false)}
      />
      <Nav />
      <PageWrapper
        isCenteringDisabled={isContentCenteringDisabled}
        isBottomBarDisabled={isBottomBarDisabled}
      >
        {children}
      </PageWrapper>
      {!isBottomBarDisabled && (
        <BottomBar openMenu={() => setIsMenuVisible(true)} />
      )}
    </AppWrapper>
  );
};

export default Layout;
