import { Program } from "../models/program";
import { COMMODITY } from "@satoshi-test/common";

export const createProgram = async () => {
  const program = Program.build({
    name: "Program",
    currentPrice: 100,
    commodity: COMMODITY.CORN,
  });

  await program.save();

  return program;
};
