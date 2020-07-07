import axios from "axios";

export const getEnrolments = async () => {
  const response = await axios.get("/api/enrolment");
  return response;
};
