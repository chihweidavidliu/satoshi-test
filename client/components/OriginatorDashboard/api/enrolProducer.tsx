import axios from "axios";
import { IUser } from "../../../types/IUser";
import { IProgram } from "../../../types/IProgram";

export const enrolProducer = async (
  originator: IUser,
  producer: IUser,
  program: IProgram,
  apv: number
) => {
  const response = await axios.post("/api/enrolment", {
    originator: originator.id,
    producer: producer.id,
    program: program.id,
    apv,
  });
  return response;
};
