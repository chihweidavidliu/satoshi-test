import mongoose from "mongoose";
import { createEnrolmentModel } from "@satoshi-test/common";

const Enrolment = createEnrolmentModel(mongoose);

export { Enrolment };
