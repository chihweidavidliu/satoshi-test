import { Router } from "express";
import { currentUser } from "@satoshi-test/common";
import { User } from "../models/user";

const currentUserRouter = Router();

currentUserRouter.get(
  "/api/users/currentuser",
  currentUser,
  async (req, res) => {
    if (!req.currentUser) {
      return res.send({ currentUser: null });
    }

    // check the user hasn't been deleted (thereby invalidating the token)
    const user = await User.findById(req.currentUser.id);

    if (!user) {
      return res.send({ currentUser: null });
    }

    return res.send({ currentUser: req.currentUser || null });
  }
);

export { currentUserRouter };
