import { UserType } from "./UserType";

export interface IUser {
  id: string;
  name: string;
  email: string;
  type: UserType;
  originator?: string;
}
