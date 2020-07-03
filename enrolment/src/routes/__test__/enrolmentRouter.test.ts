import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { signin, createUser } from "../../test/authHelper";
import { UserType } from "@satoshi-test/common";
import { Enrolment } from "../../models/enrolment";
import { createProgram } from "../../test/createProgram";

describe("POST /api/enrolment", () => {
  it("should return 401 if user is not signed in", async () => {
    const producer = new mongoose.Types.ObjectId().toHexString();
    const originator = new mongoose.Types.ObjectId().toHexString();
    const program = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .post("/api/enrolment")
      .send({
        producer,
        originator,
        program,
        apv: 10000331,
      })
      .expect(401);
  });

  it("should return 401 if user is not Originator", async () => {
    const producer = new mongoose.Types.ObjectId().toHexString();
    const originator = new mongoose.Types.ObjectId().toHexString();
    const program = new mongoose.Types.ObjectId().toHexString();

    const cookie = await signin(originator, UserType.PRODUCER);
    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer,
        originator,
        program,
        apv: 10000331,
      })
      .expect(401);
  });

  it("should return 400 if the required fields are missing", async () => {
    const producer = new mongoose.Types.ObjectId().toHexString();
    const originator = new mongoose.Types.ObjectId().toHexString();
    const program = new mongoose.Types.ObjectId().toHexString();

    const cookie = await signin(originator, UserType.ORIGINATOR);

    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        originator,
        program,
        apv: 10000331,
      })
      .expect(400);

    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer,
        program,
        apv: 10000331,
      })
      .expect(400);

    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer,
        originator,
        apv: 10000331,
      })
      .expect(400);

    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer,
        originator,
        program,
      })
      .expect(400);
  });

  it("should return 201 and new enrolment if required fields are provided", async () => {
    const producer = await createUser("david@defty.com", UserType.PRODUCER);
    const originator = await createUser("test@test.com", UserType.ORIGINATOR);
    const program = await createProgram();
    const apv = 23532432;

    const cookie = await signin(originator.id, UserType.ORIGINATOR);
    const response = await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer: producer.id,
        originator: originator.id,
        program: program.id,
        apv,
      })
      .expect(201);

    expect(response.body.producer).toMatchObject(
      JSON.parse(JSON.stringify(producer))
    );
    expect(response.body.originator).toMatchObject(
      JSON.parse(JSON.stringify(originator))
    );
    expect(response.body.apv).toEqual(apv);
  });

  it("should return 400 if producer is already enrolled in the program", async () => {
    const producer = await createUser("david@defty.com", UserType.PRODUCER);
    const originator = await createUser("test@test.com", UserType.ORIGINATOR);
    const program = await createProgram();
    const apv = 23532432;

    const cookie = await signin(originator.id, UserType.ORIGINATOR);
    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer: producer.id,
        originator: originator.id,
        program: program.id,
        apv,
      })
      .expect(201);

    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer: producer.id,
        originator: originator.id,
        program: program.id,
        apv,
      })
      .expect(400);
  });

  it("should save enrolment to database", async () => {
    const producer = new mongoose.Types.ObjectId().toHexString();
    const originator = new mongoose.Types.ObjectId().toHexString();
    const program = new mongoose.Types.ObjectId().toHexString();
    const cookie = await signin(originator, UserType.ORIGINATOR);
    const apv = 102312421;

    const response = await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer,
        originator,
        program,
        apv,
      })
      .expect(201);

    const enrolment = await Enrolment.findById(response.body.id);

    expect(enrolment?.producer == producer).toBeTruthy();
    expect(enrolment?.originator == originator).toBeTruthy();
    expect(enrolment?.apv == apv).toBeTruthy();
  });
});

describe("GET /api/enrolment/producers", () => {
  it("should return 401 if user is not authenticated or is not Originator", async () => {
    await request(app).get("/api/enrolment/producers").send().expect(401);

    const producer = await createUser("david@test.com", UserType.PRODUCER);
    const cookie = await signin(producer.id, UserType.PRODUCER);

    await request(app)
      .get("/api/enrolment/producers?email=ste")
      .set("Cookie", cookie)
      .send()
      .expect(401);
  });

  it("should return list of matching producers", async () => {
    // create dummy originator

    const originator = await createUser("david@test.com", UserType.ORIGINATOR);
    const cookie = await signin(originator.id, UserType.ORIGINATOR);

    // create dummy users
    const steve = await createUser("steve@test.com", UserType.PRODUCER);
    const bob = await createUser("bob@test.com", UserType.PRODUCER);

    // search for producers
    const response = await request(app)
      .get("/api/enrolment/producers?email=ste")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0]).toMatchObject(JSON.parse(JSON.stringify(steve)));

    const response2 = await request(app)
      .get("/api/enrolment/producers?email=bob")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response2.body.length).toEqual(1);
    expect(response2.body[0]).toMatchObject(JSON.parse(JSON.stringify(bob)));
  });
});

describe("GET /api/enrolment", () => {
  it("should return 401 if user is not authenticated", async () => {
    await request(app).get("/api/enrolment").send().expect(401);
  });

  it("should return 200 and array of enrolments for originator", async () => {
    const producer = await createUser("david@defty.com", UserType.PRODUCER);
    const originator = await createUser("test@test.com", UserType.ORIGINATOR);
    const program = await createProgram();
    const apv = 23532432;

    const cookie = await signin(originator.id, UserType.ORIGINATOR);
    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer: producer.id,
        originator: originator.id,
        program: program.id,
        apv,
      })
      .expect(201);

    const response = await request(app)
      .get("/api/enrolment")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),
      producer: expect.objectContaining(JSON.parse(JSON.stringify(producer))),
      originator: expect.any(String),
      program: expect.objectContaining(JSON.parse(JSON.stringify(program))),
    });
  });

  it("should return 200 and array of enrolments for producer", async () => {
    const producer = await createUser("david@defty.com", UserType.PRODUCER);
    const originator = await createUser("test@test.com", UserType.ORIGINATOR);
    const program = await createProgram();
    const apv = 23532432;

    const cookie = await signin(originator.id, UserType.ORIGINATOR);

    const producerCookie = await signin(producer.id, UserType.PRODUCER);
    await request(app)
      .post("/api/enrolment")
      .set("Cookie", cookie)
      .send({
        producer: producer.id,
        originator: originator.id,
        program: program.id,
        apv,
      })
      .expect(201);

    const response = await request(app)
      .get("/api/enrolment")
      .set("Cookie", producerCookie)
      .send()
      .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),
      producer: expect.any(String),
      originator: expect.objectContaining(
        JSON.parse(JSON.stringify(originator))
      ),
      program: expect.objectContaining(JSON.parse(JSON.stringify(program))),
    });
  });
});
