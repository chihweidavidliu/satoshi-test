import mongoose, { Schema, Model, Document } from "mongoose";
import { UserType } from "@satoshi-test/common";
import { PasswordManager } from "../services/password-manager";

// describes the attributes needed to construct a user
interface UserAttributes {
  email: string;
  name: string;
  type: UserType;
  password: string;
  originator?: string;
}

// describes the properties that a user document has
interface UserDocument extends UserAttributes, Document {}

// describes properties that a User Model has
interface UserModel extends Model<UserDocument> {
  build(attributes: UserAttributes): UserDocument;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    originator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false, // remove __v property
    },
  }
);

// this method ensures we always provide the correct attributes before passing it to the User constructor
UserSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

// hash password whenever it is set
UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export { User, UserAttributes };
