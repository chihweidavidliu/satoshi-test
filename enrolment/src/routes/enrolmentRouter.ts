import { Router } from "express";

const enrolmentRouter = Router();

enrolmentRouter.get("/api/enrolment", (req, res) => {
  res.send("Hello");
});

export { enrolmentRouter };
