import React, { useState } from "react";
import styled from "styled-components";
import Dinero from "dinero.js";
import { IEnrolment } from "../../utils/sortEnrolmentsByProducer";
import { MinusIcon } from "../icons/MinusIcon";
import { PlusIcon } from "../icons/PlusIcon";

const HeaderBar = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  align-items: center;
  grid-gap: 20px;
`;

const ProgramWrapper = styled.div`
  padding-left: 50px;
  display: grid;
  grid-template-columns: 1fr max-content;
`;

interface IEnrolmentListProps {
  email: string;
  enrolments: IEnrolment[];
}

const EnrolmentList = ({ email, enrolments }: IEnrolmentListProps) => {
  const [areEnrolmentsVisible, setAreEnrolmentsVisible] = useState(false);

  return (
    <div>
      <HeaderBar onClick={() => setAreEnrolmentsVisible(!areEnrolmentsVisible)}>
        {areEnrolmentsVisible ? <MinusIcon /> : <PlusIcon />}
        <strong>{email}</strong>
        <div>apv</div>
      </HeaderBar>

      {areEnrolmentsVisible && (
        <div>
          {enrolments.map((enrolment) => {
            return (
              <ProgramWrapper key={enrolment.id}>
                <div>{enrolment.program.name}</div>
                <div>
                  {Dinero({
                    amount: enrolment.apv,
                    currency: "USD",
                  }).toFormat("$0,0.00")}
                </div>
              </ProgramWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrolmentList;
