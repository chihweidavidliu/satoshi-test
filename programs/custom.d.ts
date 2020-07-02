declare enum UserType {
  PRODUCER = "PRODUCER",
  ORIGINATOR = "ORIGINATOR",
}

interface RequestUser {
  id: string;
  email: string;
  name: string;
  type: UserType;
}

// augment Request object
declare namespace Express {
  export interface Request {
    currentUser?: RequestUser;
  }
}
