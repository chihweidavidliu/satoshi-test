import { Router, Request, Response } from "express";
import {
  currentUser,
  requireAuth,
  validateRequest,
  UserType,
  BadRequestError,
} from "@satoshi-test/common";
import mongoose from "mongoose";
import { body } from "express-validator";
import { Enrolment } from "../models/enrolment";

const enrolmentRouter = Router();

enrolmentRouter.post(
  "/api/enrolment",
  currentUser,
  requireAuth,
  [
    body("producer")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Producer id must be provided"),
    body("originator")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Originator id must be provided"),
    body("program")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Program id must be provided"),
    body("apv").isFloat().withMessage("APV is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { producer, originator, program, apv } = req.body;

    const existingEnrolment = Enrolment.findOne({ producer, program });

    if (existingEnrolment) {
      throw new BadRequestError("Producer is already enrolled on this program");
    }
    const enrolment = Enrolment.build({ producer, originator, program, apv });
    await enrolment.save();
    res.send(enrolment);
  }
);

enrolmentRouter.get(
  "/api/enrolment",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { id, type } = req.currentUser as RequestUser;

    if (type === UserType.ORIGINATOR) {
      const enrolments = Enrolment.find({ originator: id });
      return res.send(enrolments);
    }

    const enrolments = Enrolment.find({ producer: id });
    return res.send(enrolments);
  }
);

export { enrolmentRouter };
