import axios from "axios";

export const getEnrolmentsByProducerId = async (producerId: string) => {
  const response = await axios.get(`/api/enrolment/${producerId}`);
  return response;
};
