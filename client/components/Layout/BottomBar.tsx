import React from "react";
import styled from "styled-components";
import { SmallMenuIcon } from "../icons/MenuIcon";
import { SmallHomeIcon } from "../icons/HomeIcon";
import { SmallAddIcon } from "../icons/AddIcon";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  height: ${(props) => props.theme.bottomBarHeight};
  width: 100vw;
  min-width: 300px;
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
  align-items: center;
`;

interface IBottomBarProps {
  openMenu: () => void;
}

const BottomBar = ({ openMenu }: IBottomBarProps) => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/dashboard");
  };

  return (
    <Wrapper>
      <ButtonGrid>
        <SmallMenuIcon onClick={openMenu} />
        <SmallHomeIcon onClick={handleHomeClick} />
        <SmallAddIcon />
      </ButtonGrid>
    </Wrapper>
  );
};

export default BottomBar;
