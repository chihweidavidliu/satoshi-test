import { Router, Request, Response } from "express";
import {
  currentUser,
  requireAuth,
  validateRequest,
  UserType,
  BadRequestError,
  requireOriginatorAuth,
} from "@satoshi-test/common";
import mongoose from "mongoose";
import { body } from "express-validator";
import { Enrolment } from "../models/enrolment";

const enrolmentRouter = Router();

enrolmentRouter.post(
  "/api/enrolment",
  currentUser,
  requireOriginatorAuth,
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

    const existingEnrolment = await Enrolment.findOne({ producer, program });

    if (existingEnrolment) {
      throw new BadRequestError("Producer is already enrolled on this program");
    }

    const enrolment = Enrolment.build({ producer, originator, program, apv });
    await enrolment.save();

    const result = await enrolment
      .populate("producer")
      .populate("originator")
      .populate("program")
      .execPopulate();

    res.status(201).send(result);
  }
);

enrolmentRouter.get(
  "/api/enrolment",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { id, type } = req.currentUser as RequestUser;

    if (type === UserType.ORIGINATOR) {
      const enrolments = await Enrolment.find({ originator: id })
        .populate("producer")
        .populate("program");
      return res.send(enrolments);
    }

    const enrolments = await Enrolment.find({ producer: id })
      .populate("originator")
      .populate("program");
    return res.send(enrolments);
  }
);

export { enrolmentRouter };
