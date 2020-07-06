import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuBar from "./MenuBar";
import { ProducerMenuItem } from "../../types/ProducerMenuItem";
import Overview from "./Overview";
import { getEnrolments } from "../OriginatorDashboard/api/getEnrolments";
import { IEnrolment } from "../../utils/sortEnrolmentsByProducer";

const DashboardWrapper = styled.div`
  width: 100vw;
  height: ${(props) => {
    return `calc(100vh - ${props.theme.navHeight} - ${props.theme.bottomBarHeight})`;
  }};
  text-align: center;
`;

const ProducerDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    ProducerMenuItem.OVERVIEW
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
      <MenuBar
        selectedMenuItem={selectedMenuItem}
        handleSelect={(selected: ProducerMenuItem) =>
          setSelectedMenuItem(selected)
        }
      />
      {selectedMenuItem === ProducerMenuItem.OVERVIEW && selectedEnrolment && (
        <Overview enrolment={selectedEnrolment} />
      )}
    </DashboardWrapper>
  );
};

export default ProducerDashboard;
