import React from "react";
import styled from "styled-components";
import { IEnrolment } from "../../utils/sortEnrolmentsByProducer";
import { CircularArrowIcon } from "../icons/CircularArrowIcon";

const TitleWrapper = styled.div`
  padding-bottom: 15px;
  font-size: 36px;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
  align-items: center;
`;

interface ICurrentProgramTitleProps {
  enrolment: IEnrolment;
}

const CurrentProgramTitle = ({ enrolment }: ICurrentProgramTitleProps) => {
  return (
    <TitleWrapper>
      <div>{enrolment.program.name}</div>
      <CircularArrowIcon />
    </TitleWrapper>
  );
};

export default CurrentProgramTitle;
