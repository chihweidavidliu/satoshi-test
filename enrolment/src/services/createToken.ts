import jwt from "jsonwebtoken";
import { UserType } from "../types/UserType";

export const createToken = (
  id: string,
  email: string,
  name: string,
  type: UserType
) => {
  const userJwt = jwt.sign({ id, email, name, type }, process.env.JWT_KEY!);
  return userJwt;
};
