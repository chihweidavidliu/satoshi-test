import mongoose from "mongoose";
import { createUserModel } from "@satoshi-test/common";

const User = createUserModel(mongoose);

export { User };
