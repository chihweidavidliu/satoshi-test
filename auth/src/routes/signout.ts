import { Router } from "express";
import { currentUser, requireAuth } from "@satoshi-test/common";

const signoutRouter = Router();

signoutRouter.post(
  "/api/users/signout",
  currentUser,
  requireAuth,
  (req, res) => {
    delete req.currentUser;
    req.session = null;
    res.send({});
  }
);

export { signoutRouter };
