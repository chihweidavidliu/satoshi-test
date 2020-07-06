import React from "react";
import styled from "styled-components";
import { LeftChevron } from "../icons/LeftChevron";
import { DollarIcon } from "../icons/DollarIcon";
import { ChartIcon } from "../icons/ChartIcon";
import { SMSIcon } from "../icons/SMSIcon";
import { RightChevron } from "../icons/RightChevron";

const MenuBarWrapper = styled.div`
  height: 74px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const IconGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const MenuBar = () => {
  return (
    <MenuBarWrapper>
      <IconGrid>
        <LeftChevron />
        <DollarIcon />
        <ChartIcon />
        <SMSIcon />
        <RightChevron />
      </IconGrid>
    </MenuBarWrapper>
  );
};

export default MenuBar;
