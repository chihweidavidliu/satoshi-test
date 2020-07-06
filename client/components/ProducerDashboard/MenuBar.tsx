import React from "react";
import styled from "styled-components";
import { LeftChevron } from "../icons/LeftChevron";
import { DollarIcon } from "../icons/DollarIcon";
import { ChartIcon } from "../icons/ChartIcon";
import { SMSIcon } from "../icons/SMSIcon";
import { RightChevron } from "../icons/RightChevron";
import { ProducerMenuItem } from "../../types/ProducerMenuItem";

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

interface IMenuBarProps {
  selectedMenuItem: ProducerMenuItem;
  handleSelect: (selected: ProducerMenuItem) => void;
}

const MenuBar = ({ selectedMenuItem, handleSelect }: IMenuBarProps) => {
  return (
    <MenuBarWrapper>
      <IconGrid>
        <LeftChevron />
        <DollarIcon
          isSelected={selectedMenuItem === ProducerMenuItem.OVERVIEW}
          onClick={() => handleSelect(ProducerMenuItem.OVERVIEW)}
        />
        <ChartIcon
          isSelected={selectedMenuItem === ProducerMenuItem.CHARTS}
          onClick={() => handleSelect(ProducerMenuItem.CHARTS)}
        />
        <SMSIcon
          isSelected={selectedMenuItem === ProducerMenuItem.NEWS}
          onClick={() => handleSelect(ProducerMenuItem.NEWS)}
        />
        <RightChevron />
      </IconGrid>
    </MenuBarWrapper>
  );
};

export default MenuBar;
