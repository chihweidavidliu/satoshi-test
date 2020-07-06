import React, { useEffect, useState } from "react";
import { H1 } from "../typography/H1";
import { getEnrolments } from "./api/getEnrolments";
import {
  sortEnrolmentsByProducer,
  IEnrolmentsByProducer,
} from "../../utils/sortEnrolmentsByProducer";
import EnrolmentList from "./EnrolmentList";
import { ContentWrapper } from "../Layout/ContentWrapper";

const TrackEnrolment = () => {
  const [
    enrolmentsByProducer,
    setEnrolmentsByProducer,
  ] = useState<IEnrolmentsByProducer | null>(null);

  useEffect(() => {
    getEnrolments()
      .then((response) => {
        const { data } = response;
        const dataByProducer = sortEnrolmentsByProducer(data);
        setEnrolmentsByProducer(dataByProducer);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <ContentWrapper>
      <H1>Track Enrolments</H1>

      {enrolmentsByProducer &&
        Object.keys(enrolmentsByProducer).map((email) => {
          return (
            <EnrolmentList
              key={email}
              email={email}
              enrolments={enrolmentsByProducer[email]}
            />
          );
        })}
    </ContentWrapper>
  );
};

export default TrackEnrolment;
