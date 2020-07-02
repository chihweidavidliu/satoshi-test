import React from "react";
import styled from "styled-components";

interface IMenuWrapperProps {
  isVisible: boolean;
}

const MenuWrapper = styled.div<IMenuWrapperProps>`
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: -100vh;
  right: 0;
  background: #727070;
  ${(props) =>
    props.isVisible
      ? `transform: translateY(100vh);`
      : `transform: translateY(-100vh);`}
  transition: all 0.8s cubic-bezier(0, 1, 0.8, 1);
`;

interface IMenuProps {
  isVisible: boolean;
  handleClose: () => void;
}

const Menu = ({ isVisible, handleClose }: IMenuProps) => {
  return (
    <MenuWrapper isVisible={isVisible}>
      <button onClick={handleClose}>Close</button>
    </MenuWrapper>
  );
};

export default Menu;
