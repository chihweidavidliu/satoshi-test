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
  height: ${(props) => {
    return `calc(100vh - ${props.theme.navHeight} - ${props.theme.bottomBarHeight})`;
  }};
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
        console.log(response.data);
        setEnrolments(response.data);

        if (response.data.length) {
          setSelectedEnrolment(response.data[0]);
        }
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <DashboardWrapper>
      {isPortfolioOverviewVisible ? (
        <PortfolioOverview
          selectedEnrolment={selectedEnrolment}
          enrolments={enrolments}
          handleEnrolmentSelect={(selected) => {
            setSelectedEnrolment(selected);
            setIsPortfolioOverviewVisible(false);
          }}
        />
      ) : (
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
      )}
    </DashboardWrapper>
  );
};

export default ProducerDashboard;
