import request from "supertest";
import { app } from "../app";
import { UserType } from "../types/UserType";
// sets up authenticated test requests

export const signin = async (userType?: UserType) => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      name: "david",
      password,
      type: userType || UserType.ORIGINATOR,
    })
    .expect(201);

  // set cookie
  const cookie = response.get("Set-Cookie");
  return { cookie, user: { email, password } };
};
