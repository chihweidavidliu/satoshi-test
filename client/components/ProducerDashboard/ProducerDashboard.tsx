import React from "react";
import styled from "styled-components";
import { IUser } from "../../types/IUser";
import { H1 } from "../typography/H1";
import MenuBar from "./MenuBar";

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
  return (
    <DashboardWrapper>
      <MenuBar />
      <H1>Producer Dashboard</H1>
      <p>{`Welcome ${currentUser.name}`}</p>
      <p>{currentUser.email}</p>
      <p>{currentUser.type}</p>
    </DashboardWrapper>
  );
};

export default ProducerDashboard;
