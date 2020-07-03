import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserType } from "@satoshi-test/common";
import { User } from "../models/user";

// sets up authenticated test requests
// we don't want to reach out to the auth service for our testing (we want our service tests to be isolated)
// we are going to fake a session
export const signin = async (userId?: string, userType?: UserType) => {
  // build JWT payload
  const payload = {
    id: userId || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
    name: "testy tester",
    type: userType || UserType.ORIGINATOR,
  };

  // create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object
  const session = { jwt: token };

  // turn that session into json
  const sessionJSON = JSON.stringify(session);

  // take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string that's the cookie with the encoded data
  // supertest expects an array of cookies
  return [`express:sess=${base64}`];
};

export const createUser = async (email: string, type: UserType) => {
  const user = User.build({ name: "user", email, type, password: "password" });
  await user.save();
  return user;
};
