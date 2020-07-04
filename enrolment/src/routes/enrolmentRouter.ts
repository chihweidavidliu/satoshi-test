import { Router, Request, Response } from "express";
import {
  currentUser,
  requireAuth,
  validateRequest,
  UserType,
  BadRequestError,
  requireOriginatorAuth,
  NotFoundError,
} from "@satoshi-test/common";
import mongoose from "mongoose";
import { body } from "express-validator";
import { Enrolment } from "../models/enrolment";
import { User } from "../models/user";
import { Program } from "../models/program";

const enrolmentRouter = Router();

// TODO: this should probably go into a registration service
// get a list of eligible producers
enrolmentRouter.get(
  "/api/enrolment/producers",
  currentUser,
  requireOriginatorAuth,
  async (req, res) => {
    const { email } = req.query;

    if (!email) {
      return res.send([]);
    }

    const regex = new RegExp(`.*${email}.*`, "i");

    const users = await User.find(
      {
        email: regex,
        type: UserType.PRODUCER,
      },
      null,
      { limit: 10 }
    );

    res.send(users);
  }
);

enrolmentRouter.get(
  "/api/enrolment/producers/:producerId",
  currentUser,
  requireOriginatorAuth,
  async (req, res) => {
    const { producerId } = req.params;
    const user = await User.findById(producerId);

    if (!user) {
      throw new NotFoundError();
    }

    res.send(user);
  }
);

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
      .populate({ path: "producer", model: User })
      .populate({ path: "originator", model: User })
      .populate({ path: "program", model: Program })
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
        .populate({ path: "producer", model: User })
        .populate({ path: "program", model: Program });
      return res.send(enrolments);
    }

    const enrolments = await Enrolment.find({ producer: id })

      .populate({ path: "originator", model: User })
      .populate({ path: "program", model: Program });
    return res.send(enrolments);
  }
);

export { enrolmentRouter };
