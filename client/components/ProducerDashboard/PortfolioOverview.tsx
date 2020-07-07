import React from "react";
import styled from "styled-components";
import { IEnrolment } from "../../utils/sortEnrolmentsByProducer";
import { H1 } from "../typography/H1";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  padding: 20px;
  padding-bottom: 0px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 20px;
`;
const BlueCard = styled.div`
  padding: 15px;
  background: #101a3f;
  color: white;
  font-size: 36px;
`;

interface IPortfolioOverviewProps {
  enrolments: IEnrolment[];
  handleEnrolmentSelect: (selected: IEnrolment) => void;
}

const PortfolioOverview = ({
  enrolments,
  handleEnrolmentSelect,
}: IPortfolioOverviewProps) => {
  return (
    <Wrapper>
      <>
        <TitleWrapper>
          <H1>Select Program</H1>
        </TitleWrapper>

        <CardGrid>
          {enrolments.map((enrolment: IEnrolment) => {
            return (
              <BlueCard
                key={enrolment.id}
                onClick={() => handleEnrolmentSelect(enrolment)}
              >
                {enrolment.program.name}
              </BlueCard>
            );
          })}
        </CardGrid>
      </>
    </Wrapper>
  );
};

export default PortfolioOverview;
