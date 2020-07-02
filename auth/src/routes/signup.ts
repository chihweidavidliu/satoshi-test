import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@satoshi-test/common";
import { User } from "../models/user";
import { createToken } from "../services/createToken";
import { UserType } from "../types/UserType";

const signupRouter = Router();

signupRouter.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("type")
      .trim()
      .notEmpty()
      .isIn([UserType.ORIGINATOR, UserType.PRODUCER])
      .withMessage("Invalid User Type"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, name, password, type, originator } = req.body;

    // check email is not taken
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    // create a user and save (using our custom build method for type safety)
    // password will be hashed by Mongoose pre hook
    const user = User.build({ email, name, password, type, originator });
    await user.save();

    const userJwt = createToken(user.id, user.email, user.name, user.type);
    // store jwt in session object
    // @ts-ignore
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { signupRouter };
