import mongoose, { Schema, Model, Document } from "mongoose";

interface EnrolmentAttributes {
  producer: string;
  originator: string;
  program: string;
  apv: number;
}

interface EnrolmentDocument extends EnrolmentAttributes, Document {}

interface EnrolmentModel extends Model<EnrolmentDocument> {
  build(attributes: EnrolmentAttributes): EnrolmentDocument;
}

const EnrolmentSchema: Schema = new Schema(
  {
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    apv: { type: Number, required: true },
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

EnrolmentSchema.statics.build = (attributes: EnrolmentAttributes) => {
  return new Enrolment(attributes);
};

const Enrolment = mongoose.model<EnrolmentDocument, EnrolmentModel>(
  "Enrolment",
  EnrolmentSchema
);

export { Enrolment, EnrolmentAttributes };
