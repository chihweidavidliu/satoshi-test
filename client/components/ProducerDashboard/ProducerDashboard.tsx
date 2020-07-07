import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar";
import { ProducerMenuItem } from "../../types/ProducerMenuItem";
import Prices from "./Prices";
import { getEnrolments } from "../OriginatorDashboard/api/getEnrolments";
import { IEnrolment } from "../../utils/sortEnrolmentsByProducer";
import PortfolioOverview from "./PortfolioOverview";

const DashboardWrapper = styled.div`
  width: 100vw;
  height: 100%;
  text-align: center;
`;

const ProducerDashboard = () => {
  const [isPortfolioOverviewVisible, setIsPortfolioOverviewVisible] = useState(
    false
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    ProducerMenuItem.PRICE
  );

  const [enrolments, setEnrolments] = useState<IEnrolment[]>([]);
  const [selectedEnrolment, setSelectedEnrolment] = useState<IEnrolment | null>(
    null
  );

  useEffect(() => {
    getEnrolments()
      .then((response) => {
        setEnrolments(response.data);

        if (response.data.length) {
          setSelectedEnrolment(response.data[0]);
        }
      })
      .catch((error) => alert(error));
  }, []);

  const renderContent = () => {
    if (enrolments.length === 0) {
      return <p>You have not enrolled in a program</p>;
    }

    if (isPortfolioOverviewVisible) {
      return (
        <PortfolioOverview
          enrolments={enrolments}
          handleEnrolmentSelect={(selected) => {
            setSelectedEnrolment(selected);
            setIsPortfolioOverviewVisible(false);
          }}
        />
      );
    }

    return (
      <>
        <MenuBar
          selectedMenuItem={selectedMenuItem}
          handleSelect={(selected: ProducerMenuItem) =>
            setSelectedMenuItem(selected)
          }
        />

        {selectedMenuItem === ProducerMenuItem.PRICE && selectedEnrolment && (
          <Prices
            enrolment={selectedEnrolment}
            showPortfolio={() => setIsPortfolioOverviewVisible(true)}
          />
        )}
      </>
    );
  };

  return <DashboardWrapper>{renderContent()}</DashboardWrapper>;
};

export default ProducerDashboard;
