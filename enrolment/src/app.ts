import express from "express";
// removes the need to call next() on async errors (can just throw)
import "express-async-errors";
import { NotFoundError, errorHandler } from "@satoshi-test/common";
import cookieSession from "cookie-session";
import { json } from "body-parser";

import { enrolmentRouter } from "./routes/enrolmentRouter";

const app = express();

app.use(json());

// trust the ingress-nginx proxy
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false, // don't encrypt as we are using jwts are already tamper resistant
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(enrolmentRouter);

app.all("*", (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
