import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IUser } from "../../types/IUser";
import { IProgram } from "../../types/IProgram";
import { getPrograms } from "./api/getPrograms";
import ProgramCard from "./ProgramCard";

const EnrolmentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  height: 100%;
  display: grid;
  grid-template-rows: max-content: 1fr;
`;

const ProgramCardGrid = styled.div`
  margin: 15px 0px;
  display: grid;
  grid-gap: 15px;

  height: 100%;
  overflow-y: auto;
`;

interface IEnrolmentProps {
  producer: IUser;
}

const Enrolment = ({ producer }: IEnrolmentProps) => {
  const [programs, setPrograms] = useState<IProgram[]>([]);

  useEffect(() => {
    getPrograms().then(({ data }) => {
      setPrograms(data);
    });
  }, []);

  return (
    <EnrolmentWrapper>
      Select a program for {producer.email}
      <ProgramCardGrid>
        {programs.map((program) => {
          return <ProgramCard key={program.id} program={program} />;
        })}
      </ProgramCardGrid>
    </EnrolmentWrapper>
  );
};

export default Enrolment;
