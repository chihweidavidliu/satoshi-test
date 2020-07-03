import axios from "axios";

export const getPrograms = async () => {
  const response = await axios.get("/api/programs");
  return response;
};
