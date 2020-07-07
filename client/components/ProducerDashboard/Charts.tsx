import React from "react";
import styled from "styled-components";
import { IEnrolment } from "../../utils/sortEnrolmentsByProducer";
import CurrentProgramTitle from "./CurrentProgramTitle";

const ChartsWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

interface IChartsProps {
  enrolment: IEnrolment;
  showPortfolio: () => void;
}

const Charts = ({ enrolment, showPortfolio }: IChartsProps) => {
  return (
    <ChartsWrapper>
      <CurrentProgramTitle
        enrolment={enrolment}
        showPortfolio={showPortfolio}
      />
      <div>Charts go here</div>
    </ChartsWrapper>
  );
};

export default Charts;
