import React, { useState } from "react";
import styled from "styled-components";
import { IUser } from "../../types/IUser";
import { H1 } from "../typography/H1";
import MenuBar from "./MenuBar";
import { ProducerMenuItem } from "../../types/ProducerMenuItem";
import Overview from "./Overview";

const DashboardWrapper = styled.div`
  width: 100vw;
  height: ${(props) => {
    return `calc(100vh - ${props.theme.navHeight} - ${props.theme.bottomBarHeight})`;
  }};
  text-align: center;
`;

interface IProducerDashboardProps {
  currentUser: IUser;
}

const ProducerDashboard = ({ currentUser }: IProducerDashboardProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    ProducerMenuItem.OVERVIEW
  );

  return (
    <DashboardWrapper>
      <MenuBar
        selectedMenuItem={selectedMenuItem}
        handleSelect={(selected: ProducerMenuItem) =>
          setSelectedMenuItem(selected)
        }
      />
      {selectedMenuItem === ProducerMenuItem.OVERVIEW && <Overview />}
    </DashboardWrapper>
  );
};

export default ProducerDashboard;
