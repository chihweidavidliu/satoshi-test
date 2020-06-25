import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.session.jwt", req.session?.jwt);
  if (req.session?.jwt) {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    req.currentUser = payload as RequestUser;
  }

  next();
};
