import { IProgram } from "../types/IProgram";
import { IUser } from "../types/IUser";

export interface IEnrolment {
  id: string;
  originator: string;
  producer: IUser;
  program: IProgram;
  apv: number;
}

export interface IEnrolmentsByProducer {
  [index: string]: IEnrolment[];
}

const sortEnrolmentsByProducer = (data: IEnrolment[]) => {
  const dataByProducer: IEnrolmentsByProducer = {};

  data.forEach((enrolment: IEnrolment) => {
    if (!dataByProducer[enrolment.producer.email]) {
      dataByProducer[enrolment.producer.email] = [enrolment];
    } else {
      dataByProducer[enrolment.producer.email].push(enrolment);
    }
  });

  return dataByProducer;
};

export { sortEnrolmentsByProducer };
