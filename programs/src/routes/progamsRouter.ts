import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { COMMODITY } from "../types/Commodity";
import { validateRequest } from "../middlewares/validate-request";
import { Program } from "../models/Program";
import { NotFoundError } from "../errors/not-found-error";

const programsRouter = Router();

programsRouter.get("/api/programs", async (req, res) => {
  const programs = await Program.find({});
  res.send(programs);
});

programsRouter.post(
  "/api/programs",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("currentPrice").isFloat().withMessage("Current Price is required"),
    body("commodity")
      .trim()
      .notEmpty()
      .isIn([COMMODITY.CORN, COMMODITY.LIVESTOCK, COMMODITY.SOYA])
      .withMessage("Invalid Commodity Type"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, currentPrice, commodity } = req.body;

    const program = Program.build({ name, currentPrice, commodity });
    await program.save();

    res.status(201).send(program);
  }
);

programsRouter.get("/api/programs/:programId", async (req, res) => {
  const { programId } = req.params;
  const program = await Program.findById(programId);
  if (!program) {
    throw new NotFoundError();
  }

  res.send(program);
});

export { programsRouter };
