import React from "react";
import styled, { css } from "styled-components";
import Dinero from "dinero.js";
import { IProgram } from "../../types/IProgram";

const ProgramCardWrapper = styled.div<{ isSelected: boolean }>`
  border: 1px solid grey;
  border-radius: 6px;
  padding: 15px;
  font-size: 14px;
  cursor: pointer;
  ${(props) =>
    props.isSelected &&
    css`
      background: green;
      border: 1px solid darkgreen;
      color: white;
    `}
`;

interface IProgramCardProps {
  program: IProgram;
  isSelected: boolean;
  handleSelect: () => void;
}

const ProgramCard = ({
  program,
  isSelected,
  handleSelect,
}: IProgramCardProps) => {
  return (
    <ProgramCardWrapper isSelected={isSelected} onClick={handleSelect}>
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
