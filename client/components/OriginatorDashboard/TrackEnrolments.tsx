import React, { useEffect, useState } from "react";
import { H1 } from "../typography/H1";
import { getEnrolments } from "./api/getEnrolments";
import {
  sortEnrolmentsByProducer,
  IEnrolmentsByProducer,
} from "../../utils/sortEnrolmentsByProducer";

const TrackEnrolment = () => {
  const [
    enrolmentsByProducer,
    setEnrolmentsByProducer,
  ] = useState<IEnrolmentsByProducer | null>(null);

  useEffect(() => {
    getEnrolments()
      .then((response) => {
        console.log("enrolments", response.data);

        const { data } = response;

        const dataByProducer = sortEnrolmentsByProducer(data);
        setEnrolmentsByProducer(dataByProducer);
        console.log("data", dataByProducer);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <div>
      <H1>Track Enrolments</H1>

      {enrolmentsByProducer &&
        Object.keys(enrolmentsByProducer).map((email) => {
          return (
            <div key={email}>
              <p>{email}</p>
              <div>
                {enrolmentsByProducer[email].map((enrolment) => {
                  return <div key={enrolment.id}>{enrolment.program.name}</div>;
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TrackEnrolment;
