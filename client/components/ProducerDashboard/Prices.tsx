import React from "react";
import styled from "styled-components";
import { IEnrolment } from "../../utils/sortEnrolmentsByProducer";
import CurrentProgramTitle from "./CurrentProgramTitle";
import { formatPrice } from "../../utils/formatPrice";

const PricesWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const PriceBox = styled.div`
  border: 2px solid grey;
  border-radius: 6px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

interface IPricesProps {
  enrolment: IEnrolment;
  showPortfolio: () => void;
}

const Prices = ({ enrolment, showPortfolio }: IPricesProps) => {
  return (
    <PricesWrapper>
      <CurrentProgramTitle
        enrolment={enrolment}
        showPortfolio={showPortfolio}
      />
      <PriceBox>
        <div>M+</div>
        <div>{formatPrice(enrolment.program.currentPrice)}</div>
      </PriceBox>
    </PricesWrapper>
  );
};

export default Prices;
