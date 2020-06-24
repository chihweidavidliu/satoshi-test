import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@dlticketbuddy/common";
import { User } from "../models/user";
import { createToken } from "../services/createToken";

const signupRouter = Router();

signupRouter.post(
  "/api/users/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("age").trim().notEmpty().withMessage("Age is required"),
    body("score").trim().notEmpty().withMessage("Score is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, password, score, age } = req.body;

    // check email is not taken
    const existingUser = await User.findOne({ name: name });

    if (existingUser) {
      throw new BadRequestError("Name in use");
    }

    // create a user and save (using our custom build method for type safety)
    // password will be hashed by Mongoose pre hook
    const user = User.build({ name, password, score, age });
    await user.save();

    const userJwt = createToken(user.id, user.name);
    // store jwt in session object
    // @ts-ignore
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { signupRouter };
