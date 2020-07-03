import mongoose from "mongoose";
import { createProgramModel } from "@satoshi-test/common";

const Program = createProgramModel(mongoose);

export { Program };
