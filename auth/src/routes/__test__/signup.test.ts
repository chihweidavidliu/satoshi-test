import request from "supertest";
import { app } from "../../app";
import { UserType } from "../../types/UserType";

it("returns a 201 on successful signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserType.ORIGINATOR,
    })
    .expect(201);
});

it("returns 400 if invalid email was used", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david",
      name: "david",
      password: "password",
      type: UserType.ORIGINATOR,
    })
    .expect(400);
});

it("returns 400 if invalid password was used", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "1",
      type: UserType.ORIGINATOR,
    })
    .expect(400);
});

it("returns 400 if a field is missing", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      type: UserType.ORIGINATOR,
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",

      password: "password",
      type: UserType.ORIGINATOR,
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      name: "david",
      password: "password",
      type: UserType.ORIGINATOR,
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserType.ORIGINATOR,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserType.ORIGINATOR,
    })
    .expect(400);
});

it("sets a cookie after a successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "david@defty.com",
      name: "david",
      password: "password",
      type: UserType.ORIGINATOR,
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
