import React from "react";
import styled from "styled-components";
import { IUser } from "../../types/IUser";

const DashboardWrapper = styled.div`
  width: 90vw;
  background: whitesmoke;
  border-radius: 5px;
  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    width: auto;
    padding: 30px;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  padding: 30px;
`;

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 15px;
  font-size: 24px;
  @media (min-width: ${(props) => props.theme.tabletBreakpoint}) {
    font-size: 36px;
  }
`;

interface IOriginatorDashboardProps {
  currentUser: IUser;
}
const OriginatorDashboard = ({ currentUser }: IOriginatorDashboardProps) => {
  return (
    <DashboardWrapper>
      <TitleWrapper>
        <H1>Enrol in M+</H1>
        <p>{`Welcome ${currentUser.name}`}</p>
        <p>{currentUser.email}</p>
        <p>{currentUser.type}</p>
      </TitleWrapper>
    </DashboardWrapper>
  );
};

export default OriginatorDashboard;
