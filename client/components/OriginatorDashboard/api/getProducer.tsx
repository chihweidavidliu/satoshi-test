import axios from "axios";

export const getProducer = async (id: string) => {
  const response = await axios.get("/api/enrolment/producers/" + id);
  return response;
};
