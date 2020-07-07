import React from "react";
import styled from "styled-components";
import { IEnrolment } from "../../utils/sortEnrolmentsByProducer";
import CurrentProgramTitle from "./CurrentProgramTitle";

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
  selectedEnrolment: IEnrolment | null;
}

const PortfolioOverview = ({
  enrolments,
  handleEnrolmentSelect,
  selectedEnrolment,
}: IPortfolioOverviewProps) => {
  return (
    <Wrapper>
      {enrolments.length && selectedEnrolment ? (
        <>
          <TitleWrapper>
            <CurrentProgramTitle
              enrolment={selectedEnrolment}
              showPortfolio={() => {}}
            />
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
      ) : (
        <div>You have not enrolled in any programs yet</div>
      )}
    </Wrapper>
  );
};

export default PortfolioOverview;
