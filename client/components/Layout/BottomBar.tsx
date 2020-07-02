import React from "react";
import styled from "styled-components";
import { MenuIcon } from "../icons/MenuIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { AddIcon } from "../icons/AddIcon";

const Wrapper = styled.div`
  height: 92px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGrid = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  justify-content: space-around;
`;

interface IBottomBarProps {
  openMenu: () => void;
}

const BottomBar = ({ openMenu }) => {
  return (
    <Wrapper>
      <ButtonGrid>
        <MenuIcon onClick={openMenu} />
        <HomeIcon />
        <AddIcon />
      </ButtonGrid>
    </Wrapper>
  );
};

export default BottomBar;
