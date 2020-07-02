import { Router } from "express";
import { currentUser } from "@satoshi-test/common";

const currentUserRouter = Router();

currentUserRouter.get("/api/users/currentuser", currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { currentUserRouter };
