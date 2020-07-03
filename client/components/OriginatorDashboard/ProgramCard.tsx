import React from "react";
import styled from "styled-components";
import Dinero from "dinero.js";
import { IProgram } from "../../types/IProgram";

const ProgramCardWrapper = styled.div`
  border: 2px solid grey;
  border-radius: 6px;
  padding: 15px;
  cursor: pointer;
`;

interface IProgramCardProps {
  program: IProgram;
}

const ProgramCard = ({ program }: IProgramCardProps) => {
  return (
    <ProgramCardWrapper>
      <div>{program.name}</div>
      <div>{program.commodity}</div>
      <div>
        {Dinero({ amount: program.currentPrice, currency: "GBP" }).toFormat(
          "$0,0.00"
        )}
      </div>
    </ProgramCardWrapper>
  );
};

export default ProgramCard;
