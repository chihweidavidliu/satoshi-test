import jwt from "jsonwebtoken";

export const createToken = (
  id: string,
  name: string,
  score: number,
  age: number
) => {
  const userJwt = jwt.sign({ id, name, score, age }, process.env.JWT_KEY!);
  return userJwt;
};
