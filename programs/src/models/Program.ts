import mongoose, { Schema, Model, Document } from "mongoose";
import { COMMODITY } from "@satoshi-test/common";

interface ProgramAttributes {
  name: string;
  currentPrice: number;
  commodity: COMMODITY;
}

interface ProgramDocument extends ProgramAttributes, Document {}

interface ProgramModel extends Model<ProgramDocument> {
  build(attributes: ProgramAttributes): ProgramDocument;
}

const ProgramSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    commodity: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false, // remove __v property
    },
  }
);

ProgramSchema.statics.build = (attributes: ProgramAttributes) => {
  return new Program(attributes);
};

const Program = mongoose.model<ProgramDocument, ProgramModel>(
  "Program",
  ProgramSchema
);

export { Program, ProgramAttributes };
